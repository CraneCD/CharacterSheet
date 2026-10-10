'use client';

import { useState } from 'react';
import { Button, Field, Modal, TextField } from '@/app/components/ui';

interface AddCustomDialogProps {
    onAdd: (input: { name: string; hp: number; ac: number; initiativeBonus: number; kind: 'npc' | 'monster' }) => void;
    onClose: () => void;
}

/** A quick combatant without a stat block: an ally NPC, a hazard, a monster you'll improvise. */
export default function AddCustomDialog({ onAdd, onClose }: AddCustomDialogProps) {
    const [name, setName] = useState('');
    const [hp, setHp] = useState('10');
    const [ac, setAc] = useState('12');
    const [bonus, setBonus] = useState('0');
    const [kind, setKind] = useState<'npc' | 'monster'>('npc');
    const [error, setError] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
            setError('Give it a name');
            return;
        }
        onAdd({ name: name.trim(), hp: Number(hp) || 1, ac: Number(ac) || 10, initiativeBonus: Number(bonus) || 0, kind });
    };

    return (
        <Modal title="Add a combatant" size="sm" onClose={onClose}>
            <form onSubmit={submit} className="stack">
                <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} autoFocus />
                <Field label="Side">
                    {(p) => (
                        <select {...p} className="input" value={kind} onChange={(e) => setKind(e.target.value as 'npc' | 'monster')}>
                            <option value="npc">NPC (ally or bystander)</option>
                            <option value="monster">Enemy</option>
                        </select>
                    )}
                </Field>
                <div className="form-row">
                    <TextField label="HP" inputMode="numeric" value={hp} onChange={(e) => setHp(e.target.value.replace(/[^\d]/g, ''))} />
                    <TextField label="AC" inputMode="numeric" value={ac} onChange={(e) => setAc(e.target.value.replace(/[^\d]/g, ''))} />
                    <TextField label="Initiative bonus" inputMode="numeric" value={bonus} onChange={(e) => setBonus(e.target.value.replace(/[^\d-]/g, ''))} />
                </div>
                {error && <div className="form-error" role="alert">{error}</div>}
                <div className="modal-footer">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </div>
            </form>
        </Modal>
    );
}
