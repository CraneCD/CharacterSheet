'use client';

import { useState, useEffect } from 'react';
import { Spell } from '@/lib/types';
import { MAGIC_INITIATE_CLASSES, MAGIC_INITIATE_ABILITIES } from '@/lib/wizardReference';

/** Magic Initiate config for the modal. */
export interface MagicInitiateConfig {
    class: 'cleric' | 'druid' | 'wizard';
    ability: 'int' | 'wis' | 'cha';
    cantrips: string[];
    spell1: string | null;
}

/** Modal to choose Magic Initiate: class (cleric/druid/wizard), ability, 2 cantrips, 1 first-level spell. */
export default function MagicInitiateConfigModal({
    isOpen,
    onClose,
    allSpells,
    initial,
    onSave
}: {
    isOpen: boolean;
    onClose: () => void;
    allSpells: Spell[];
    initial: MagicInitiateConfig | undefined;
    onSave: (config: MagicInitiateConfig) => void;
}) {
    const [miClass, setMiClass] = useState<MagicInitiateConfig['class']>(initial?.class ?? 'wizard');
    const [ability, setAbility] = useState<MagicInitiateConfig['ability']>(initial?.ability ?? 'int');
    const [cantrip1, setCantrip1] = useState(initial?.cantrips?.[0] ?? '');
    const [cantrip2, setCantrip2] = useState(initial?.cantrips?.[1] ?? '');
    const [spell1, setSpell1] = useState(initial?.spell1 ?? '');

    useEffect(() => {
        if (!isOpen) return;
        setMiClass(initial?.class ?? 'wizard');
        setAbility(initial?.ability ?? 'int');
        setCantrip1(initial?.cantrips?.[0] ?? '');
        setCantrip2(initial?.cantrips?.[1] ?? '');
        setSpell1(initial?.spell1 ?? '');
    }, [isOpen, initial]);

    const classSpells = allSpells.filter(s => (s.classes || []).map((c: string) => c.toLowerCase()).includes(miClass));
    const cantrips = classSpells.filter(s => s.level === 0);
    const level1Spells = classSpells.filter(s => s.level === 1);

    const handleSave = () => {
        const c1 = cantrip1?.trim();
        const c2 = cantrip2?.trim();
        if (!c1 || !c2) {
            alert('Please select two cantrips.');
            return;
        }
        if (c1 === c2) {
            alert('Please select two different cantrips.');
            return;
        }
        const s1 = spell1?.trim() || null;
        if (!s1) {
            alert('Please select one 1st-level spell.');
            return;
        }
        onSave({
            class: miClass,
            ability,
            cantrips: [c1, c2],
            spell1: s1
        });
        onClose();
    };

    if (!isOpen) return null;
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ margin: 0, marginBottom: '1rem' }}>Magic Initiate</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    Choose a spell list (Cleric, Druid, or Wizard), your spellcasting ability, two cantrips, and one 1st-level spell. These are always prepared and don&apos;t count toward your prepared spell limit.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, overflowY: 'auto' }}>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Spell list</label>
                        <select className="input" value={miClass} onChange={e => setMiClass(e.target.value as MagicInitiateConfig['class'])}>
                            {MAGIC_INITIATE_CLASSES.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Spellcasting ability</label>
                        <select className="input" value={ability} onChange={e => setAbility(e.target.value as MagicInitiateConfig['ability'])}>
                            {MAGIC_INITIATE_ABILITIES.map(a => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Cantrip 1</label>
                        <select className="input" value={cantrip1} onChange={e => setCantrip1(e.target.value)}>
                            <option value="">Select...</option>
                            {cantrips.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Cantrip 2</label>
                        <select className="input" value={cantrip2} onChange={e => setCantrip2(e.target.value)}>
                            <option value="">Select...</option>
                            {cantrips.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontWeight: 'bold', fontSize: '0.875rem', marginBottom: '0.25rem' }}>1st-level spell</label>
                        <select className="input" value={spell1} onChange={e => setSpell1(e.target.value)}>
                            <option value="">Select a 1st-level spell...</option>
                            {level1Spells.map(s => (
                                <option key={s.id} value={s.id}>{s.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                    <button className="button secondary" onClick={onClose}>Cancel</button>
                    <button className="button primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}
