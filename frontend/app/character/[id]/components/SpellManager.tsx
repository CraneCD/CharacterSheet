'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Spell, CharacterSpell, CharacterData } from '@/lib/types';

interface SpellManagerProps {
    characterId: string;
    classId: string;
    level: number;
    initialSpells: CharacterSpell[];
    initialSlotsUsed: { [level: number]: number };
    spellcastingAbility: string;
    onUpdate: (data: Partial<CharacterData>) => void;
    existingActions?: any[];
    onCreateAction?: (action: any) => Promise<void>;
    onDeleteAction?: (index: number) => Promise<void>;
}

// 5e Standard Spell Slots Table (Wizard, Cleric, Druid, Sorcerer, Bard)
// Ranger/Paladin use half level (rounded up? No, 2nd level acts as 1st caster level usually).
// For MVP we use the Standard Full Caster table.
const SPELL_SLOTS_TABLE: { [level: number]: number[] } = {
    1: [2],
    2: [3],
    3: [4, 2],
    4: [4, 3],
    5: [4, 3, 2],
    6: [4, 3, 3],
    7: [4, 3, 3, 1],
    8: [4, 3, 3, 2],
    9: [4, 3, 3, 3, 1],
    10: [4, 3, 3, 3, 2],
    11: [4, 3, 3, 3, 2, 1],
    12: [4, 3, 3, 3, 2, 1],
    13: [4, 3, 3, 3, 2, 1, 1],
    14: [4, 3, 3, 3, 2, 1, 1],
    15: [4, 3, 3, 3, 2, 1, 1, 1],
    16: [4, 3, 3, 3, 2, 1, 1, 1],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

const getSlotsForClass = (classId: string, level: number) => {
    let effectiveLevel = level;
    if (['ranger', 'paladin'].includes(classId.toLowerCase())) {
        effectiveLevel = Math.floor(level / 2);
    }
    // Warlock logic is unique, ignore for now (treat as full caster or 0 for MVP)

    if (effectiveLevel < 1) return [];

    // safe fallback
    const slots = SPELL_SLOTS_TABLE[Math.min(effectiveLevel, 20)] || [];
    return slots;
};

export default function SpellManager({ characterId, classId, level, initialSpells, initialSlotsUsed, spellcastingAbility, onUpdate, existingActions = [], onCreateAction, onDeleteAction }: SpellManagerProps) {
    const [mySpells, setMySpells] = useState<CharacterSpell[]>(initialSpells || []);
    const [slotsUsed, setSlotsUsed] = useState<{ [level: number]: number }>(initialSlotsUsed || {});
    const [allSpells, setAllSpells] = useState<Spell[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [spellToDelete, setSpellToDelete] = useState<string | null>(null);

    useEffect(() => {
        setMySpells(initialSpells || []);
        setSlotsUsed(initialSlotsUsed || {});
    }, [initialSpells, initialSlotsUsed]);


    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const data = await api.get('/reference/spells');
                setAllSpells(data);
            } catch (err) {
                console.error('Failed to fetch spells', err);
            }
        };
        fetchSpells();
    }, []);

    const updateParent = (spells: CharacterSpell[], slots: { [level: number]: number }) => {
        onUpdate({ spells, spellSlotsUsed: slots });
    };

    // Helper function to get action name for a spell
    const getActionName = (spellName: string, type: 'action' | 'bonus') => {
        return type === 'action' ? `Cast ${spellName}` : `Cast ${spellName} (Bonus)`;
    };

    // Helper function to find action index by name
    const findActionIndex = (actionName: string): number => {
        return existingActions.findIndex(a => a.name === actionName);
    };

    // Helper function to remove action by name
    const removeActionByName = async (actionName: string) => {
        if (!onDeleteAction) return;
        const index = findActionIndex(actionName);
        if (index !== -1) {
            try {
                await onDeleteAction(index);
            } catch (err) {
                console.error('Failed to remove action', err);
            }
        }
    };

    // Helper function to create action for spell
    const createSpellAction = async (spell: Spell | CharacterSpell, type: 'action' | 'bonus') => {
        if (!onCreateAction) return;
        
        const spellData = 'description' in spell ? spell : allSpells.find(s => s.id === spell.id);
        if (!spellData) return;

        const actionName = getActionName(spell.name, type);
        
        // Check if action already exists
        if (findActionIndex(actionName) !== -1) {
            return; // Action already exists
        }

        const description = `**Casting Time:** ${spellData.castingTime}\n**Range:** ${spellData.range}\n**Components:** ${spellData.components}\n**Duration:** ${spellData.duration}\n\n${spellData.description}`;

        try {
            await onCreateAction({
                name: actionName,
                description: description,
                type: type
            });
        } catch (err) {
            console.error('Failed to create spell action', err);
        }
    };

    const learnSpell = async (spell: Spell) => {
        try {
            await api.post(`/characters/${characterId}/spells`, {
                spellId: spell.id,
                name: spell.name,
                level: spell.level,
                school: spell.school,
                prepared: false
            });
            const newSpell: CharacterSpell = {
                id: spell.id,
                name: spell.name,
                level: spell.level,
                school: spell.school,
                prepared: false
            };
            const updated = [...mySpells, newSpell];
            setMySpells(updated);
            updateParent(updated, slotsUsed);
            
            // Create action for learned spell
            await createSpellAction(newSpell, 'action');
            
            setIsAdding(false);
        } catch (err) {
            console.error('Failed to learn spell', err);
            alert('Failed to learn spell');
        }
    };

    const removeSpell = async (spellId: string) => {
        setSpellToDelete(spellId);
    };

    const confirmDeleteSpell = async () => {
        if (!spellToDelete) return;
        const spellId = spellToDelete;
        setSpellToDelete(null);
        
        try {
            const spellToRemove = mySpells.find(s => s.id === spellId);
            if (!spellToRemove) return;

            console.log('Attempting to delete spell:', `/characters/${characterId}/spells/${spellId}`);
            const response = await api.delete(`/characters/${characterId}/spells/${spellId}`);
            console.log('Delete response:', response);
            const updated = mySpells.filter(s => s.id !== spellId);
            setMySpells(updated);
            updateParent(updated, slotsUsed);
            
            // Remove corresponding action and bonus action
            await removeActionByName(getActionName(spellToRemove.name, 'action'));
            await removeActionByName(getActionName(spellToRemove.name, 'bonus'));
            
            console.log('Spell removed successfully');
        } catch (err: any) {
            console.error('Failed to remove spell', err);
            const errorMessage = err?.message || 'Failed to remove spell';
            alert(`Failed to remove spell: ${errorMessage}`);
        }
    };

    const cancelDeleteSpell = () => {
        setSpellToDelete(null);
    };

    const togglePrepared = async (spellId: string, currentStatus: boolean) => {
        try {
            const spell = mySpells.find(s => s.id === spellId);
            if (!spell) return;

            await api.patch(`/characters/${characterId}/spells/${spellId}/prepare`, {
                prepared: !currentStatus
            });
            const updated = mySpells.map(s => s.id === spellId ? { ...s, prepared: !currentStatus } : s);
            setMySpells(updated);
            updateParent(updated, slotsUsed);
            
            // Handle action/bonus action creation/removal
            const actionName = getActionName(spell.name, 'action');
            const bonusActionName = getActionName(spell.name, 'bonus');
            
            if (!currentStatus) {
                // Spell is being prepared - remove regular action, create bonus action
                await removeActionByName(actionName);
                await createSpellAction(spell, 'bonus');
            } else {
                // Spell is being unprepared - remove bonus action, create regular action
                await removeActionByName(bonusActionName);
                await createSpellAction(spell, 'action');
            }
        } catch (err) {
            console.error('Failed to update preparation', err);
        }
    };

    const handleSlotChange = (level: number, used: number) => {
        const newSlots = { ...slotsUsed, [level]: used };
        setSlotsUsed(newSlots);
        updateParent(mySpells, newSlots);
    };

    // Calculation
    const maxSlots = getSlotsForClass(classId, level);

    // Filter spells available to adding
    const availableSpells = allSpells.filter(s =>
        s.classes.includes(classId) &&
        (s.level === 0 || s.level <= Math.ceil(level / 2)) &&
        !mySpells.find(ms => ms.id === s.id)
    );

    // Filter available spells by search term
    const filteredSpells = availableSpells.filter(spell => {
        if (!searchTerm.trim()) return true;
        const search = searchTerm.toLowerCase();
        return (
            spell.name.toLowerCase().includes(search) ||
            spell.school.toLowerCase().includes(search) ||
            spell.description.toLowerCase().includes(search) ||
            spell.castingTime.toLowerCase().includes(search) ||
            spell.range.toLowerCase().includes(search) ||
            spell.components.toLowerCase().includes(search) ||
            spell.duration.toLowerCase().includes(search)
        );
    });

    // Group my spells by level
    const spellsByLevel = Array.from({ length: 10 }, (_, i) => i).map(lvl => ({
        level: lvl,
        spells: mySpells.filter(s => s.level === lvl),
        slots: lvl > 0 ? (maxSlots[lvl - 1] || 0) : 0
    })).filter(group => group.spells.length > 0 || group.slots > 0);

    return (
        <div className="card">
            <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Spellbook
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="button secondary" onClick={() => setSlotsUsed({})} style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>Rest (Reset Slots)</button>
                    <button
                        className="button primary"
                        style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                        onClick={() => setIsAdding(true)}
                    >
                        + Learn Spell
                    </button>
                </div>
            </h3>

            {spellToDelete && (
                <div className="modal-overlay" onClick={cancelDeleteSpell}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h3>Remove Spell</h3>
                        <p>Are you sure you want to remove this spell? This action cannot be undone.</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', justifyContent: 'flex-end' }}>
                            <button className="button secondary" onClick={cancelDeleteSpell}>Cancel</button>
                            <button className="button primary" onClick={confirmDeleteSpell}>Remove</button>
                        </div>
                    </div>
                </div>
            )}

            {isAdding && (
                <div className="modal-overlay" onClick={() => setIsAdding(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <h3>Learn New Spell</h3>
                        <input
                            type="text"
                            placeholder="Search spells by name, school, description, casting time, range, components, or duration..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                marginTop: '1rem',
                                marginBottom: '1rem',
                                border: '1px solid var(--border)',
                                borderRadius: '4px',
                                backgroundColor: 'var(--surface)',
                                color: 'var(--text)',
                                fontSize: '0.875rem'
                            }}
                            autoFocus
                        />
                        <div style={{ display: 'grid', gap: '0.5rem', marginTop: '0.5rem', overflowY: 'auto', flex: 1 }}>
                            {filteredSpells.map(spell => (
                                <div key={spell.id} className="spell-row" style={{ cursor: 'pointer', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }} onClick={() => learnSpell(spell)}>
                                    <div style={{ fontWeight: 'bold' }}>{spell.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        Level {spell.level} {spell.school} • {spell.castingTime}
                                    </div>
                                    <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{spell.description.substring(0, 100)}...</div>
                                </div>
                            ))}
                            {filteredSpells.length === 0 && availableSpells.length > 0 && (
                                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No spells match your search.</p>
                            )}
                            {availableSpells.length === 0 && (
                                <p>No spells available to learn at this level.</p>
                            )}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                {filteredSpells.length} of {availableSpells.length} spells
                            </span>
                            <button className="button secondary" onClick={() => {
                                setIsAdding(false);
                                setSearchTerm('');
                            }}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {spellsByLevel.length === 0 && (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>No spells known.</p>
            )}

            {spellsByLevel.map(group => (
                <div key={group.level} style={{ marginBottom: '1rem' }}>
                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '0.25rem', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{group.level === 0 ? 'Cantrips' : `Level ${group.level}`}</span>

                        {/* Spell Slots UI */}
                        {group.level > 0 && group.slots > 0 && (
                            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                <span style={{ marginRight: '0.5rem', fontSize: '0.75rem' }}>Slots:</span>
                                {Array.from({ length: group.slots }).map((_, slotIdx) => {
                                    const isUsed = slotIdx < (slotsUsed[group.level] || 0);
                                    return (
                                        <div
                                            key={slotIdx}
                                            onClick={() => {
                                                // Toggle slot logic: click to set used/unused
                                                const currentUsed = slotsUsed[group.level] || 0;
                                                const newUsed = isUsed ? slotIdx : slotIdx + 1; // Simplify: click Nth slot sets usage to N+1
                                                // Actually click to toggle specific one? No, slots are pool.
                                                // Click 3rd slot: if 3 used, make 2 used? 
                                                // Simple logic: Click empty -> fill. Click full -> empty (from right).
                                                // Let's just use click to set exact amount for now or simple +/-

                                                // Better UX: Click a circle. If it's filled and it's the last filled one, unfill it. If it's empty, fill it (and all before it).
                                                let nextVal = slotIdx + 1;
                                                if (isUsed && slotIdx === (slotsUsed[group.level] || 0) - 1) {
                                                    nextVal = slotIdx; // Uncheck this one
                                                }
                                                handleSlotChange(group.level, nextVal);
                                            }}
                                            style={{
                                                width: '12px', height: '12px', borderRadius: '50%',
                                                border: '1px solid var(--primary)',
                                                backgroundColor: isUsed ? 'var(--primary)' : 'transparent',
                                                cursor: 'pointer'
                                            }}
                                            title="Toggle Spell Slot"
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.5rem' }}>
                        {group.spells.map(spell => (
                            <div key={spell.id} className="spell-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--surface)', padding: '0.5rem', borderRadius: '4px' }}>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>{spell.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{spell.school}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    {spell.level > 0 && (
                                        <button
                                            className={`button ${spell.prepared ? 'primary' : 'secondary'}`}
                                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                            onClick={() => togglePrepared(spell.id, spell.prepared)}
                                        >
                                            {spell.prepared ? 'Prepared' : 'Prepare'}
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="button plain"
                                        style={{ color: 'var(--error)', fontSize: '1.25rem', lineHeight: 1 }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            console.log('Remove button clicked for spell:', spell.id);
                                            removeSpell(spell.id);
                                        }}
                                        title="Remove Spell"
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
