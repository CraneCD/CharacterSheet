'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { CampaignItemEntry, PartyMemberBasic } from '@/lib/campaigns';
import { RARITIES } from '@/lib/campaignPrep';
import { Button, ConfirmDialog, describeError, Field, Menu, Modal, SectionHeader, Skeleton, TextField, useOptimisticSave, useToast } from '@/app/components/ui';

interface LootPanelProps {
    campaignId: string;
    isDm: boolean;
    party: PartyMemberBasic[];
}

type ItemDraft = Omit<CampaignItemEntry, 'id' | 'campaignId' | 'createdAt' | 'updatedAt'> & { id?: string };

const BLANK: ItemDraft = { name: '', description: '', rarity: '', quantity: 1, value: '', revealed: false, heldBy: null, dmNotes: '' };

function ItemForm({ draft, party, campaignId, onClose, onSaved }: {
    draft: ItemDraft;
    party: PartyMemberBasic[];
    campaignId: string;
    onClose: () => void;
    onSaved: (item: CampaignItemEntry) => void;
}) {
    const [value, setValue] = useState(draft);
    const [quantity, setQuantity] = useState(String(draft.quantity));
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const set = (patch: Partial<ItemDraft>) => setValue((v) => ({ ...v, ...patch }));

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!value.name.trim()) {
            setError('Give the item a name');
            return;
        }
        setSaving(true);
        setError('');
        const { id, ...fields } = value;
        const body = { ...fields, name: value.name.trim(), quantity: Math.min(9999, Math.max(1, Number(quantity) || 1)) };
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
                <Field label="Description" hint="Players see this once the item is found.">
                    {(p) => <textarea {...p} className="input" rows={4} maxLength={4000} value={value.description} onChange={(e) => set({ description: e.target.value })} />}
                </Field>
                <Field label="Held by">
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

function ItemRow({ item, holder, isDm, onEdit, onToggleRevealed, onDelete }: {
    item: CampaignItemEntry;
    holder?: string;
    isDm: boolean;
    onEdit: () => void;
    onToggleRevealed: () => void;
    onDelete: () => void;
}) {
    const meta = [item.rarity && item.rarity[0].toUpperCase() + item.rarity.slice(1), item.value, holder ? `Held by ${holder}` : null].filter(Boolean).join(' · ');
    return (
        <li className="loot-row">
            <div className="loot-row-head">
                <span className="loot-row-name">
                    {item.name}{item.quantity > 1 && <span className="loot-qty"> ×{item.quantity}</span>}
                </span>
                {meta && <span className="loot-row-meta">{meta}</span>}
                {isDm && (
                    <span className="loot-row-actions">
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

    const found = (items ?? []).filter((i) => i.revealed);
    const hidden = (items ?? []).filter((i) => !i.revealed);
    const row = (item: CampaignItemEntry) => (
        <ItemRow
            key={item.id}
            item={item}
            holder={holderName(item.heldBy)}
            isDm={isDm}
            onEdit={() => setEditing({ ...item })}
            onToggleRevealed={() => toggleRevealed(item)}
            onDelete={() => setDeleting(item)}
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
            {deleting && (
                <ConfirmDialog title={`Delete ${deleting.name}?`} confirmLabel="Delete" danger busy={busy} onConfirm={remove} onCancel={() => setDeleting(null)}>
                    It&apos;s removed for everyone, including players who can see it.
                </ConfirmDialog>
            )}
        </section>
    );
}
