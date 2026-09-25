'use client';

import { useMemo, useState } from 'react';
import { api } from '@/lib/api';
import { CampaignItemEntry } from '@/lib/campaigns';
import { Coins, coinsLeft, DENOMINATIONS, evenCoinShare, formatCoins, listNames, normalizeCoins, splitEvenly } from '@/lib/loot';
import { Button, describeError, Modal } from '@/app/components/ui';

interface Recipient {
    id: string;
    name: string;
}

interface GiveLootDialogProps {
    campaignId: string;
    item: CampaignItemEntry;
    /** Who can receive it: the whole party for the DM, a player's own characters otherwise */
    recipients: Recipient[];
    /** How many characters share the loot (the party), for a fair default share */
    partySize: number;
    isDm: boolean;
    onClose: () => void;
    onGiven: (names: string[]) => void;
}

type Share = { characterId: string; quantity?: number; coins?: Coins };

const whole = (v: string) => v.replace(/[^\d]/g, '');

/**
 * Hand out loot: one item to one character, a stack split between several,
 * or a pile of coins divided by denomination. What isn't given stays in the
 * party's pool. The server puts each share on the character's sheet.
 */
export default function GiveLootDialog({ campaignId, item, recipients, partySize, isDm, onClose, onGiven }: GiveLootDialogProps) {
    const pile = useMemo(() => normalizeCoins(item.coins), [item.coins]);
    const denominations = useMemo(() => (pile ? DENOMINATIONS.filter((d) => pile[d]) : []), [pile]);
    const single = !pile && item.quantity === 1;
    const ways = Math.max(1, partySize);

    // A player's default is their fair share; the DM starts from nothing (or Split evenly)
    const [amounts, setAmounts] = useState<Record<string, Record<string, string>>>(() => {
        const start: Record<string, Record<string, string>> = {};
        for (const r of recipients) {
            if (isDm) start[r.id] = {};
            else if (pile) start[r.id] = Object.fromEntries(Object.entries(evenCoinShare(pile, ways)).map(([d, n]) => [d, String(n)]));
            else start[r.id] = { quantity: String(Math.max(1, splitEvenly(item.quantity, ways).share)) };
        }
        return start;
    });
    const [chosen, setChosen] = useState(recipients.length === 1 ? recipients[0].id : '');
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const set = (id: string, key: string, value: string) =>
        setAmounts((a) => ({ ...a, [id]: { ...a[id], [key]: whole(value) } }));

    const splitAll = () => {
        if (pile) {
            const share = evenCoinShare(pile, recipients.length);
            setAmounts(Object.fromEntries(recipients.map((r) => [r.id, Object.fromEntries(denominations.map((d) => [d, share[d] ? String(share[d]) : '']))])));
        } else {
            const { share } = splitEvenly(item.quantity, recipients.length);
            setAmounts(Object.fromEntries(recipients.map((r) => [r.id, { quantity: share ? String(share) : '' }])));
        }
    };

    const shares = useMemo((): Share[] => {
        if (single) return chosen ? [{ characterId: chosen, quantity: 1 }] : [];
        return recipients.flatMap((r): Share[] => {
            const a = amounts[r.id] ?? {};
            if (pile) {
                const coins = normalizeCoins(Object.fromEntries(denominations.map((d) => [d, Number(a[d]) || 0])));
                return coins ? [{ characterId: r.id, coins }] : [];
            }
            const quantity = Number(a.quantity) || 0;
            return quantity > 0 ? [{ characterId: r.id, quantity }] : [];
        });
    }, [single, chosen, recipients, amounts, pile, denominations]);

    // What stays in the pool, and whether anyone asked for more than there is
    let leftText = '';
    let overGiven = false;
    if (pile) {
        const left = coinsLeft(pile, shares.map((s) => s.coins ?? {}));
        overGiven = denominations.some((d) => left[d] < 0);
        leftText = formatCoins(left) || 'nothing';
    } else if (!single) {
        const left = item.quantity - shares.reduce((n, s) => n + (s.quantity ?? 0), 0);
        overGiven = left < 0;
        leftText = left > 0 ? String(left) : 'nothing';
    }

    const submit = async () => {
        if (shares.length === 0) {
            setError(single ? 'Choose who gets it' : 'Give someone a share');
            return;
        }
        if (overGiven) {
            setError("That's more than there is");
            return;
        }
        setSaving(true);
        setError('');
        try {
            const result: { given: { name: string }[] } = await api.post(`/campaigns/${campaignId}/items/${item.id}/distribute`, { shares });
            onGiven(result.given.map((g) => g.name));
        } catch (err) {
            setError(describeError("Couldn't hand this out", err));
            setSaving(false);
        }
    };

    const title = isDm ? `Give ${item.name}` : `Take ${item.name}`;
    const available = pile ? formatCoins(pile) : `${item.quantity}`;

    return (
        <Modal
            title={title}
            onClose={onClose}
            dismissible={!saving}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button onClick={submit} loading={saving}>{isDm ? 'Give' : 'Take'}</Button>
                </>
            }
        >
            {single ? (
                <fieldset className="give-loot-choices">
                    <legend>{isDm ? 'Who gets it?' : 'Which character takes it?'}</legend>
                    {recipients.map((r) => (
                        <label key={r.id} className="checkbox-row">
                            <input type="radio" name="loot-recipient" value={r.id} checked={chosen === r.id} onChange={() => setChosen(r.id)} />
                            {r.name}
                        </label>
                    ))}
                </fieldset>
            ) : (
                <>
                    <p style={{ marginTop: 0 }}>
                        In the pool: <strong>{available}</strong>.{' '}
                        {isDm ? 'Enter each share, or split it evenly.' : `An even share for a party of ${ways} is filled in.`}
                    </p>
                    <div className="give-loot-table-wrap">
                    <table className="give-loot-table">
                        <thead>
                            <tr>
                                <th scope="col">Character</th>
                                {pile ? denominations.map((d) => <th key={d} scope="col">{d}</th>) : <th scope="col">How many</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {recipients.map((r) => (
                                <tr key={r.id}>
                                    <th scope="row">{r.name}</th>
                                    {(pile ? denominations : ['quantity']).map((key) => (
                                        <td key={key}>
                                            <input
                                                className="input"
                                                inputMode="numeric"
                                                aria-label={`${r.name}: ${pile ? key : 'how many'}`}
                                                value={amounts[r.id]?.[key] ?? ''}
                                                onChange={(e) => set(r.id, key, e.target.value)}
                                                placeholder="0"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                    <div className="give-loot-footer">
                        <span className={overGiven ? 'form-error' : 'field-hint'} role={overGiven ? 'alert' : undefined}>
                            {overGiven ? "That's more than there is." : `Left in the pool: ${leftText}`}
                        </span>
                        {isDm && recipients.length > 1 && <Button size="sm" variant="secondary" onClick={splitAll}>Split evenly</Button>}
                    </div>
                </>
            )}
            <p className="field-hint">
                {pile ? 'The coins are added to each character’s currency.' : 'It’s added to the equipment on each character’s sheet.'}
            </p>
            {error && <div className="form-error" role="alert">{error}</div>}
        </Modal>
    );
}

/** "Potion of Healing is on Aria's sheet" / "Gave … to Aria and Borin" */
export function describeGiven(item: CampaignItemEntry, names: string[], isDm: boolean): string {
    if (!isDm && names.length === 1) return `${item.name} is on ${names[0]}’s sheet.`;
    return `Gave ${item.name} to ${listNames(names)}. It’s on their sheet${names.length > 1 ? 's' : ''}.`;
}
