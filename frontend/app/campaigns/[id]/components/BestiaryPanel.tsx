'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Monster } from '@/lib/monsters';
import { Button, ConfirmDialog, describeError, Menu, Modal, SectionHeader, Skeleton, useToast } from '@/app/components/ui';
import { DiceProvider } from '@/app/components/dice/DiceTray';
import MonsterBrowser from '../../components/MonsterBrowser';
import MonsterForm from '../../components/MonsterForm';
import StatBlock from '../../components/StatBlock';
import { useMonsters } from '../../useMonsters';

/** Browse SRD stat blocks and manage your own monsters (shared by all the campaigns you run). */
export default function BestiaryPanel() {
    const monsters = useMonsters();
    const [viewing, setViewing] = useState<Monster | null>(null);
    const [editing, setEditing] = useState<Partial<Monster> | null>(null);
    const [deleting, setDeleting] = useState<Monster | null>(null);
    const [busy, setBusy] = useState(false);
    const toast = useToast();

    const remove = async () => {
        if (!deleting) return;
        setBusy(true);
        try {
            await api.delete(`/monsters/${deleting.id}`);
            monsters.removeCustom(deleting.id);
            toast.success(`Deleted ${deleting.name}.`);
            setDeleting(null);
        } catch (err) {
            toast.error(describeError(`Couldn't delete ${deleting.name}`, err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <section className="card" aria-labelledby="bestiary-title">
            <SectionHeader
                title="Bestiary"
                id="bestiary-title"
                as="h2"
                actions={<Button size="sm" onClick={() => setEditing({})}>+ New monster</Button>}
            />
            <p className="field-hint" style={{ marginTop: 0 }}>SRD 5.2 stat blocks plus your own monsters. Yours work in every campaign you run.</p>
            {monsters.error && (
                <div className="form-error" role="alert">{monsters.error} <Button variant="secondary" size="sm" onClick={monsters.reload}>Try again</Button></div>
            )}
            {monsters.loading ? (
                <div className="stack" aria-busy="true" aria-label="Loading monsters"><Skeleton height="2.5rem" /><Skeleton height="2.5rem" /><Skeleton height="2.5rem" /></div>
            ) : (
                <MonsterBrowser
                    monsters={monsters.all}
                    label="Monsters"
                    renderActions={(m) => (
                        <>
                            <Button variant="secondary" size="sm" onClick={() => setViewing(m)} aria-label={`View ${m.name}`}>View</Button>
                            <Menu
                                label="⋯"
                                ariaLabel={`More for ${m.name}`}
                                variant="ghost"
                                items={m.source === 'custom'
                                    ? [
                                        { label: 'Edit', onSelect: () => setEditing(m) },
                                        { label: 'Duplicate', onSelect: () => setEditing({ ...m, id: undefined, source: undefined, name: `${m.name} (copy)` }) },
                                        { label: 'Delete…', onSelect: () => setDeleting(m), danger: true, separatorBefore: true },
                                    ]
                                    : [{ label: 'Copy to my monsters', onSelect: () => setEditing({ ...m, id: undefined, source: undefined }) }]}
                            />
                        </>
                    )}
                />
            )}

            {viewing && (
                <Modal ariaLabel={viewing.name} size="lg" onClose={() => setViewing(null)}>
                    <DiceProvider>
                        <StatBlock monster={viewing} headingLevel={2} />
                    </DiceProvider>
                    <div className="modal-footer">
                        <Button variant="secondary" onClick={() => setViewing(null)}>Close</Button>
                    </div>
                </Modal>
            )}
            {editing && (
                <MonsterForm
                    initial={editing}
                    onClose={() => setEditing(null)}
                    onSaved={(saved) => {
                        monsters.upsertCustom(saved);
                        setEditing(null);
                        toast.success(`Saved ${saved.name}.`);
                    }}
                />
            )}
            {deleting && (
                <ConfirmDialog title={`Delete ${deleting.name}?`} confirmLabel="Delete" danger busy={busy} onConfirm={remove} onCancel={() => setDeleting(null)}>
                    Encounters that already have it keep their copy of its HP and AC, but its stat block won&apos;t show there any more.
                </ConfirmDialog>
            )}
        </section>
    );
}
