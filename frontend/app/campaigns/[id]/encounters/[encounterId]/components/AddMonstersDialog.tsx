'use client';

import { useState } from 'react';
import { Monster } from '@/lib/monsters';
import { Button, Modal, Skeleton } from '@/app/components/ui';
import MonsterBrowser from '../../../../components/MonsterBrowser';

interface AddMonstersDialogProps {
    monsters: Monster[];
    loading: boolean;
    onAdd: (monster: Monster, count: number, rollHp: boolean) => void;
    onClose: () => void;
}

/** Pick monsters for the encounter; each Add puts that many copies in, numbered. */
export default function AddMonstersDialog({ monsters, loading, onAdd, onClose }: AddMonstersDialogProps) {
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [rollHp, setRollHp] = useState(false);
    const [added, setAdded] = useState<string>('');
    const key = (m: Monster) => `${m.source ?? 'srd'}-${m.id}`;

    return (
        <Modal
            title="Add monsters"
            size="lg"
            onClose={onClose}
            footer={<Button onClick={onClose}>Done</Button>}
        >
            <label className="checkbox-row">
                <input type="checkbox" checked={rollHp} onChange={(e) => setRollHp(e.target.checked)} />
                Roll hit points (instead of the average)
            </label>
            <p className="visually-hidden" aria-live="polite">{added}</p>
            {loading ? (
                <div className="stack" aria-busy="true" aria-label="Loading monsters"><Skeleton height="2.5rem" /><Skeleton height="2.5rem" /></div>
            ) : (
                <MonsterBrowser
                    monsters={monsters}
                    label="Monsters to add"
                    renderActions={(m) => {
                        const count = counts[key(m)] ?? 1;
                        return (
                            <>
                                <label className="visually-hidden" htmlFor={`count-${key(m)}`}>How many {m.name}</label>
                                <input
                                    id={`count-${key(m)}`}
                                    className="input count-input"
                                    type="number"
                                    min={1}
                                    max={20}
                                    value={count}
                                    onChange={(e) => setCounts((c) => ({ ...c, [key(m)]: Math.min(20, Math.max(1, Number(e.target.value) || 1)) }))}
                                />
                                <Button
                                    size="sm"
                                    onClick={() => {
                                        onAdd(m, count, rollHp);
                                        setAdded(`Added ${count} ${m.name}`);
                                    }}
                                    aria-label={`Add ${count} ${m.name}`}
                                >
                                    Add
                                </Button>
                            </>
                        );
                    }}
                />
            )}
        </Modal>
    );
}
