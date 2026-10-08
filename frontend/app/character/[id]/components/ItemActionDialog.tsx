'use client';

import { useState } from 'react';
import { CharacterAction, CharacterItem } from '@/lib/types';
import { itemCharges } from '@/lib/itemCharges';
import { Button, Field, Modal, TextField } from '@/app/components/ui';

type Timing = CharacterAction['type'];

const TIMINGS: { id: Timing; label: string }[] = [
    { id: 'action', label: 'Action' },
    { id: 'bonus', label: 'Bonus Action' },
    { id: 'reaction', label: 'Reaction' },
    { id: 'other', label: 'Other' },
];

const key = (name: string) => name.trim().toLowerCase();

/** "Wand of Webs", or "Wand of Webs (Reaction)" when the plain name is taken */
export function defaultActionName(item: string, type: Timing, taken: string[]): string {
    const used = new Set(taken.map(key));
    const label = TIMINGS.find((t) => t.id === type)!.label;
    const candidates = [item, `${item} (${label})`];
    for (let n = 2; n < 20; n++) candidates.push(`${item} (${label} ${n})`);
    return candidates.find((c) => !used.has(key(c))) ?? `${item} (${label})`;
}

interface ItemActionDialogProps {
    item: CharacterItem;
    /** Names already in the Actions card (names must be unique) */
    existingNames: string[];
    onSave: (action: CharacterAction) => Promise<void>;
    onClose: () => void;
}

/**
 * Adds one action for a magic item, as an Action, Bonus Action, Reaction or Other, with its own
 * name and text ("Lightning Bolt" for a Javelin of Lightning) and the charges a use spends.
 * An item can have several (a wand's spell as an Action, its other power as a Reaction).
 */
export default function ItemActionDialog({ item, existingNames, onSave, onClose }: ItemActionDialogProps) {
    const charges = itemCharges(item);
    const [type, setType] = useState<Timing>('action');
    const [name, setName] = useState(() => defaultActionName(item.name, 'action', existingNames));
    const [nameEdited, setNameEdited] = useState(false);
    const [description, setDescription] = useState(item.description || `Use the ${item.name}.`);
    const [cost, setCost] = useState(charges ? 1 : 0);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    const changeType = (next: Timing) => {
        setType(next);
        if (!nameEdited) setName(defaultActionName(item.name, next, existingNames));
    };

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return setError('Give the action a name.');
        if (existingNames.some((n) => key(n) === key(trimmed))) return setError(`"${trimmed}" is already in your actions. Pick another name.`);
        setSaving(true);
        try {
            await onSave({
                name: trimmed,
                type,
                description: description.trim() || `Use the ${item.name}.`,
                item: item.name,
                ...(charges ? { charges: cost } : {}),
            });
            onClose();
        } catch {
            // onSave reports the error; keep the dialog open to retry
        } finally {
            setSaving(false);
        }
    };

    const formId = 'item-action-form';
    return (
        <Modal
            title={`Add an action for ${item.name}`}
            onClose={onClose}
            dismissible={!saving}
            footer={
                <>
                    <Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button>
                    <Button type="submit" form={formId} loading={saving}>Add to Actions</Button>
                </>
            }
        >
            <form id={formId} className="item-action-form" onSubmit={submit}>
                <fieldset className="plain-fieldset">
                    <legend className="field-label">When you use it</legend>
                    <div className="item-action-timings">
                        {TIMINGS.map((t) => (
                            <label key={t.id} className="checkbox-row">
                                <input type="radio" name="item-action-timing" value={t.id} checked={type === t.id} onChange={() => changeType(t.id)} />
                                {t.label}
                            </label>
                        ))}
                    </div>
                </fieldset>
                <TextField
                    label="Name"
                    value={name}
                    maxLength={100}
                    onChange={(e) => { setName(e.target.value); setNameEdited(true); setError(''); }}
                    error={error || undefined}
                    hint="Shown in the Actions card, e.g. the item's name or the power it uses."
                />
                {charges && (
                    <Field label="Charges per use" hint={`${item.name} has ${charges.current}/${charges.max} charges.`}>
                        {(p) => (
                            <select {...p} className="input" value={cost} onChange={(e) => setCost(Number(e.target.value))}>
                                {Array.from({ length: Math.min(charges.max, 10) + 1 }, (_, n) => (
                                    <option key={n} value={n}>{n === 0 ? 'None' : n}</option>
                                ))}
                            </select>
                        )}
                    </Field>
                )}
                <Field label="Description" hint="Markdown works: **bold**, *italic*, - lists, | tables |.">
                    {(p) => (
                        <textarea {...p} className="input" rows={6} value={description} onChange={(e) => setDescription(e.target.value)} />
                    )}
                </Field>
            </form>
        </Modal>
    );
}
