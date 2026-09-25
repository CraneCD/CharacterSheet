'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { CampaignItemEntry, PartyMemberBasic } from '@/lib/campaigns';
import { RARITIES } from '@/lib/campaignPrep';
import { DENOMINATIONS, formatCoins, normalizeCoins } from '@/lib/loot';
import { Button, ConfirmDialog, describeError, Field, Menu, Modal, SectionHeader, Skeleton, TextField, useOptimisticSave, useToast } from '@/app/components/ui';
import GiveLootDialog, { describeGiven } from './GiveLootDialog';

interface LootPanelProps {
    campaignId: string;
    isDm: boolean;
    party: PartyMemberBasic[];
}

type ItemDraft = Omit<CampaignItemEntry, 'id' | 'campaignId' | 'createdAt' | 'updatedAt'> & { id?: string };

const BLANK: ItemDraft = { name: '', description: '', rarity: '', quantity: 1, value: '', revealed: false, heldBy: null, coins: null, dmNotes: '' };

function ItemForm({ draft, party, campaignId, onClose, onSaved }: {
    draft: ItemDraft;
    party: PartyMemberBasic[];
    campaignId: string;
    onClose: () => void;
    onSaved: (item: CampaignItemEntry) => void;
}) {
    const [value, setValue] = useState(draft);
    const [quantity, setQuantity] = useState(String(draft.quantity));
    const [isCoins, setIsCoins] = useState(!!normalizeCoins(draft.coins));
    const [coins, setCoins] = useState<Record<string, string>>(() =>
        Object.fromEntries(DENOMINATIONS.map((d) => [d, draft.coins?.[d] ? String(draft.coins[d]) : ''])));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const set = (patch: Partial<ItemDraft>) => setValue((v) => ({ ...v, ...patch }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.name.trim()) {
            setError('Give the item a name');
            return;
        }
        const pile = isCoins ? normalizeCoins(Object.fromEntries(DENOMINATIONS.map((d) => [d, Number(coins[d]) || 0]))) : null;
        if (isCoins && !pile) {
            setError('Enter how many coins are in the pile');
            return;
        }
        setSaving(true);
        setError('');
        const { id, ...fields } = value;
        const body = {
            ...fields,
            name: value.name.trim(),
            quantity: isCoins ? 1 : Math.min(9999, Math.max(1, Number(quantity) || 1)),
            coins: pile,
            ...(isCoins ? { rarity: '' } : {}),
        };
        try {
            const saved = id
                ? await api.put(`/campaigns/${campaignId}/items/${id}`, body)
                : await api.post(`/campaigns/${campaignId}/items`, body);
            onSaved(saved);
        } catch (err) {
            setError(describeError("Couldn't save the item", err));
            setSaving(false);
        }
    };

    return (
        <Modal title={value.id ? `Edit ${draft.name}` : 'New item'} onClose={onClose} dismissible={!saving}>
            <form onSubmit={submit} className="stack">
                <TextField label="Name" value={value.name} onChange={(e) => set({ name: e.target.value })} maxLength={150} autoFocus />
                <label className="checkbox-row">
                    <input type="checkbox" checked={isCoins} onChange={(e) => setIsCoins(e.target.checked)} />
                    It&apos;s coins (players can split it; it goes into their currency)
                </label>
                {isCoins ? (
                    <div className="form-row loot-coin-inputs">
                        {DENOMINATIONS.map((d) => (
                            <TextField key={d} label={d} inputMode="numeric" value={coins[d]} placeholder="0"
                                onChange={(e) => setCoins((c) => ({ ...c, [d]: e.target.value.replace(/[^\d]/g, '') }))} />
                        ))}
                    </div>
                ) : (
                <div className="form-row">
                    <Field label="Rarity">
                        {(p) => (
                            <select {...p} className="input" value={value.rarity} onChange={(e) => set({ rarity: e.target.value })}>
                                <option value="">—</option>
                                {RARITIES.map((r) => <option key={r} value={r}>{r[0].toUpperCase() + r.slice(1)}</option>)}
                                {value.rarity && !RARITIES.includes(value.rarity) && <option value={value.rarity}>{value.rarity}</option>}
                            </select>
                        )}
                    </Field>
                    <TextField label="Quantity" inputMode="numeric" value={quantity} onChange={(e) => setQuantity(e.target.value.replace(/[^\d]/g, ''))} />
                    <TextField label="Value" hint="e.g. 50 gp" value={value.value} onChange={(e) => set({ value: e.target.value })} maxLength={60} />
                </div>
                )}
                <Field label="Description" hint="Players see this once the item is found.">
                    {(p) => <textarea {...p} className="input" rows={4} maxLength={4000} value={value.description} onChange={(e) => set({ description: e.target.value })} />}
                </Field>
                <Field label="Held by" hint="Just a record. Use Give… to put it on a character's sheet.">
                    {(p) => (
                        <select {...p} className="input" value={value.heldBy ?? ''} onChange={(e) => set({ heldBy: e.target.value || null })}>
                            <option value="">The party / nobody yet</option>
                            {party.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    )}
                </Field>
                <Field label="DM notes" hint="Only you see these: where it's hidden, curses, who's after it.">
                    {(p) => <textarea {...p} className="input" rows={2} maxLength={4000} value={value.dmNotes ?? ''} onChange={(e) => set({ dmNotes: e.target.value })} />}
                </Field>
                <label className="checkbox-row">
                    <input type="checkbox" checked={value.revealed} onChange={(e) => set({ revealed: e.target.checked })} />
                    The party has found it (players can see it)
                </label>
                {error && <div className="form-error" role="alert">{error}</div>}
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button type="submit" loading={saving}>Save item</Button>
                </div>
            </form>
        </Modal>
    );
}

function ItemRow({ item, holder, isDm, canTake, claiming, onEdit, onToggleRevealed, onDelete, onGive }: {
    item: CampaignItemEntry;
    holder?: string;
    isDm: boolean;
    /** A player can take this for their character (found, and nobody has it) */
    canTake: boolean;
    claiming: boolean;
    onEdit: () => void;
    onToggleRevealed: () => void;
    onDelete: () => void;
    onGive: () => void;
}) {
    const pile = formatCoins(item.coins);
    const meta = [pile, !pile && item.rarity && item.rarity[0].toUpperCase() + item.rarity.slice(1), item.value, holder ? `Held by ${holder}` : null].filter(Boolean).join(' · ');
    const splittable = !!pile || item.quantity > 1;
    return (
        <li className="loot-row">
            <div className="loot-row-head">
                <span className="loot-row-name">
                    {item.name}{!pile && item.quantity > 1 && <span className="loot-qty"> ×{item.quantity}</span>}
                </span>
                {meta && <span className="loot-row-meta">{meta}</span>}
                {!isDm && canTake && (
                    <span className="loot-row-actions">
                        <Button size="sm" onClick={onGive} loading={claiming} aria-label={`${splittable ? 'Take a share of' : 'Claim'} ${item.name}`}>
                            {splittable ? 'Take…' : 'Claim'}
                        </Button>
                    </span>
                )}
                {isDm && (
                    <span className="loot-row-actions">
                        {!item.heldBy && <Button size="sm" variant="secondary" onClick={onGive} aria-label={`Give ${item.name}`}>Give…</Button>}
                        <Button size="sm" variant={item.revealed ? 'ghost' : 'secondary'} onClick={onToggleRevealed}>
                            {item.revealed ? 'Hide' : 'Reveal'}
                        </Button>
                        <Menu
                            label="⋯"
                            ariaLabel={`More for ${item.name}`}
                            variant="ghost"
                            items={[
                                { label: 'Edit', onSelect: onEdit },
                                { label: 'Delete…', onSelect: onDelete, danger: true, separatorBefore: true },
                            ]}
                        />
                    </span>
                )}
            </div>
            {item.description && <p className="loot-row-description">{item.description}</p>}
            {isDm && item.dmNotes && <p className="session-dm-notes"><strong>DM notes:</strong> {item.dmNotes}</p>}
        </li>
    );
}

/** The campaign's treasure: the DM plans it and reveals it as it's found; players see what they've found. */
export default function LootPanel({ campaignId, isDm, party }: LootPanelProps) {
    const [items, setItems] = useState<CampaignItemEntry[] | null>(null);
    const [loadError, setLoadError] = useState('');
    const [editing, setEditing] = useState<ItemDraft | null>(null);
    const [deleting, setDeleting] = useState<CampaignItemEntry | null>(null);
    const [giving, setGiving] = useState<CampaignItemEntry | null>(null);
    const [claiming, setClaiming] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const toast = useToast();
    const optimisticSave = useOptimisticSave();

    const load = () => {
        setLoadError('');
        api.get(`/campaigns/${campaignId}/items`)
            .then(setItems)
            .catch((err) => setLoadError(describeError("Couldn't load the loot", err)));
    };
    useEffect(load, [campaignId]);

    const holderName = (id: string | null) => (id ? party.find((c) => c.id === id)?.name : undefined);
    const replace = (item: CampaignItemEntry) =>
        setItems((list) => [...(list ?? []).filter((i) => i.id !== item.id), item].sort((a, b) => a.name.localeCompare(b.name)));

    const toggleRevealed = (item: CampaignItemEntry) => {
        const revealed = !item.revealed;
        void optimisticSave({
            apply: () => replace({ ...item, revealed }),
            rollback: () => replace(item),
            request: () => api.put(`/campaigns/${campaignId}/items/${item.id}`, { revealed }),
            errorMessage: `Couldn't update ${item.name}`,
        });
    };

    const remove = async () => {
        if (!deleting) return;
        setBusy(true);
        try {
            await api.delete(`/campaigns/${campaignId}/items/${deleting.id}`);
            setItems((list) => (list ?? []).filter((i) => i.id !== deleting.id));
            setDeleting(null);
        } catch (err) {
            toast.error(describeError(`Couldn't delete ${deleting.name}`, err));
        } finally {
            setBusy(false);
        }
    };

    // Players take loot for their own characters; the DM gives it to anyone in the party
    const mine = party.filter((c) => c.isMine);
    const recipients = isDm ? party : mine;

    const given = (item: CampaignItemEntry, names: string[]) => {
        setGiving(null);
        toast.success(describeGiven(item, names, isDm));
        load();
    };

    // One item and one character of your own: no questions, it's yours
    const give = async (item: CampaignItemEntry) => {
        if (recipients.length === 0) {
            toast.error('Nobody in the party has a character in this campaign yet.');
            return;
        }
        const single = !normalizeCoins(item.coins) && item.quantity === 1;
        if (isDm || !single || mine.length !== 1) {
            setGiving(item);
            return;
        }
        setClaiming(item.id);
        try {
            const result: { given: { name: string }[] } = await api.post(`/campaigns/${campaignId}/items/${item.id}/distribute`, { shares: [{ characterId: mine[0].id, quantity: 1 }] });
            given(item, result.given.map((g) => g.name));
        } catch (err) {
            toast.error(describeError(`Couldn't claim ${item.name}`, err));
            load();
        } finally {
            setClaiming(null);
        }
    };

    const found = (items ?? []).filter((i) => i.revealed);
    const hidden = (items ?? []).filter((i) => !i.revealed);
    const row = (item: CampaignItemEntry) => (
        <ItemRow
            key={item.id}
            item={item}
            holder={holderName(item.heldBy)}
            isDm={isDm}
            canTake={!isDm && !item.heldBy && mine.length > 0}
            claiming={claiming === item.id}
            onEdit={() => setEditing({ ...item })}
            onToggleRevealed={() => toggleRevealed(item)}
            onDelete={() => setDeleting(item)}
            onGive={() => give(item)}
        />
    );

    return (
        <section className="card" aria-labelledby="loot-title">
            <SectionHeader title="Loot" id="loot-title" as="h2" actions={isDm ? <Button size="sm" onClick={() => setEditing({ ...BLANK })}>+ Add item</Button> : undefined} />
            {loadError && <div className="form-error" role="alert">{loadError} <Button variant="secondary" size="sm" onClick={load}>Try again</Button></div>}
            {items === null && !loadError ? (
                <div className="stack" aria-busy="true" aria-label="Loading loot"><Skeleton height="2.5rem" /><Skeleton height="2.5rem" /></div>
            ) : items && items.length === 0 ? (
                <p className="empty-note">{isDm ? 'No loot yet. Plan treasure here and reveal it when the party finds it.' : 'Nothing found yet.'}</p>
            ) : (
                <>
                    {isDm && <h3 className="loot-group-title">Found by the party</h3>}
                    {found.length > 0 ? <ul className="loot-list">{found.map(row)}</ul> : isDm && <p className="empty-note">Nothing revealed yet.</p>}
                    {isDm && hidden.length > 0 && (
                        <>
                            <h3 className="loot-group-title">Not found yet <span className="kind-badge">Hidden from players</span></h3>
                            <ul className="loot-list">{hidden.map(row)}</ul>
                        </>
                    )}
                </>
            )}
            {editing && (
                <ItemForm
                    draft={editing}
                    party={party}
                    campaignId={campaignId}
                    onClose={() => setEditing(null)}
                    onSaved={(saved) => {
                        replace(saved);
                        setEditing(null);
                    }}
                />
            )}
            {giving && (
                <GiveLootDialog
                    campaignId={campaignId}
                    item={giving}
                    recipients={recipients}
                    partySize={party.length}
                    isDm={isDm}
                    onClose={() => setGiving(null)}
                    onGiven={(names) => given(giving, names)}
                />
            )}
            {deleting && (
                <ConfirmDialog title={`Delete ${deleting.name}?`} confirmLabel="Delete" danger busy={busy} onConfirm={remove} onCancel={() => setDeleting(null)}>
                    It&apos;s removed for everyone, including players who can see it.
                </ConfirmDialog>
            )}
        </section>
    );
}
