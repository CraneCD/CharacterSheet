'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Spell, CharacterSpell, CharacterData } from '@/lib/types';
import { calculateMulticlassSpellcasterLevel, getSpellcastingClasses, calculatePreparedSpellsLimitForClass } from '@/lib/multiclassSpellcasting';
import { ELVEN_LINEAGE_SPELLS, SUBCLASS_BONUS_SPELLS, MAGIC_INITIATE_CLASSES, MAGIC_INITIATE_ABILITIES } from '@/lib/wizardReference';

// Spell Details Modal Component
const SpellDetailsModal = ({ spell, isOpen, onClose }: { spell: Spell | null, isOpen: boolean, onClose: () => void }) => {
    if (!isOpen || !spell) return null;
    
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                        <h3 style={{ margin: 0, color: 'var(--primary)' }}>{spell.name}</h3>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                            Level {spell.level} {spell.school}
                        </div>
                    </div>
                    <button
                        className="button plain"
                        onClick={onClose}
                        style={{ fontSize: '1.5rem', lineHeight: 1, padding: '0.25rem 0.5rem', color: 'var(--text-muted)' }}
                    >
                        &times;
                    </button>
                </div>
                
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                    gap: '0.75rem',
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid var(--border)'
                }}>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Casting Time</div>
                        <div style={{ fontWeight: 'bold' }}>{spell.castingTime}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Range</div>
                        <div style={{ fontWeight: 'bold' }}>{spell.range}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Components</div>
                        <div style={{ fontWeight: 'bold' }}>{spell.components}</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Duration</div>
                        <div style={{ fontWeight: 'bold' }}>{spell.duration}</div>
                    </div>
                    {spell.ritual && (
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Ritual</div>
                            <div style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Yes</div>
                        </div>
                    )}
                </div>
                
                <div style={{ 
                    flex: 1,
                    overflowY: 'auto',
                    lineHeight: '1.6',
                    paddingRight: '0.5rem'
                }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Description</div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{spell.description}</div>
                </div>
                
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <button className="button primary" onClick={onClose} style={{ width: '100%' }}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

/** Magic Initiate config for the modal. */
interface MagicInitiateConfig {
    class: 'cleric' | 'druid' | 'wizard';
    ability: 'int' | 'wis' | 'cha';
    cantrips: string[];
    spell1: string | null;
}

/** Modal to choose Magic Initiate: class (cleric/druid/wizard), ability, 2 cantrips, 1 first-level spell. */
function MagicInitiateConfigModal({
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

/** Subclass spellcasting (Arcane Trickster, Eldritch Knight). */
interface SubclassSpellcasting {
    subclassId: string;
    spellListClass: string;
    spellcastingAbility: string;
    casterLevelDivisor: number;
}

interface SpellManagerProps {
    characterId: string;
    classId: string;
    level: number;
    initialSpells: CharacterSpell[];
    /** Elf lineage (drow, high_elf, wood_elf). Lineage spells are always prepared at the appropriate levels. */
    elvenLineage?: string;
    /** Subclass ID (e.g. gloom_stalker). Subclass bonus spells are always prepared at the appropriate class levels. */
    subclassId?: string;
    /** Level in the class that has the subclass (for subclass bonus spells). Defaults to level if not multiclassed. */
    subclassClassLevel?: number;
    initialSlotsUsed: { [level: number]: number };
    spellcastingAbility: string;
    preparedCaster?: boolean; // If true, class knows all spells and prepares a subset
    /** Wizard only: spell IDs in the spellbook. If set, wizard can only prepare spells in the spellbook. */
    spellbook?: string[];
    abilityScores?: { [key: string]: number }; // For calculating prepared spells limit
    onUpdate: (data: Partial<CharacterData>) => void;
    existingActions?: any[];
    onCreateAction?: (action: any) => Promise<void>;
    onDeleteAction?: (index: number) => Promise<void>;
    classes?: { [classId: string]: number }; // Multiclass support
    allClasses?: any[]; // All available classes for reference
    subclassSpellcasting?: SubclassSpellcasting;
    /** Magic Initiate feat: chosen class, ability, and spell IDs. When set, spells are always prepared and don't count toward limit. */
    magicInitiate?: {
        class: 'cleric' | 'druid' | 'wizard';
        ability: 'int' | 'wis' | 'cha';
        cantrips: string[];
        spell1: string | null;
    };
    onMagicInitiateUpdate?: (magicInitiate: NonNullable<SpellManagerProps['magicInitiate']>) => void;
    /** Magic Initiate: 1st-level spell uses remaining (1 = available, 0 = used). Resets on long rest. */
    magicInitiateSpell1Used?: number;
    /** Called when Magic Initiate level 1 spell is used (marks as used). */
    onMagicInitiateSpell1Use?: () => void;
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

const getSlotsForClass = (classId: string, level: number, casterLevelDivisor?: number) => {
    let effectiveLevel = level;
    if (casterLevelDivisor) {
        effectiveLevel = Math.floor(level / casterLevelDivisor);
    } else if (['ranger', 'paladin'].includes(classId.toLowerCase())) {
        effectiveLevel = Math.floor(level / 2);
    }
    // Warlock logic is unique, ignore for now (treat as full caster or 0 for MVP)

    if (effectiveLevel < 1) return [];

    const slots = SPELL_SLOTS_TABLE[Math.min(effectiveLevel, 20)] || [];
    return slots;
};

/** Third caster (AT/EK) spells known by class level: 3,4,5,6,7,8,9 at levels 3,4,7,10,13,16,19. */
const THIRD_CASTER_SPELLS_KNOWN: number[] = [0, 0, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 9, 9];
const THIRD_CASTER_CANTRIPS: Record<string, number> = { arcane_trickster: 3, eldritch_knight: 2 };

export default function SpellManager({ characterId, classId, level, initialSpells, initialSlotsUsed, spellcastingAbility, preparedCaster = false, abilityScores, onUpdate, existingActions = [], onCreateAction, onDeleteAction, classes: classesData, allClasses: allClassesData, subclassSpellcasting, spellbook: spellbookProp, elvenLineage, subclassId: subclassIdProp, subclassClassLevel, magicInitiate, onMagicInitiateUpdate, magicInitiateSpell1Used = 1, onMagicInitiateSpell1Use }: SpellManagerProps) {
    const [mySpells, setMySpells] = useState<CharacterSpell[]>(Array.isArray(initialSpells) ? initialSpells : []);
    const [slotsUsed, setSlotsUsed] = useState<{ [level: number]: number }>(initialSlotsUsed || {});
    const [allSpells, setAllSpells] = useState<Spell[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isCantripMode, setIsCantripMode] = useState(false); // For prepared casters: true = learn cantrip, false = prepare spell
    const [searchTerm, setSearchTerm] = useState('');
    const [spellToDelete, setSpellToDelete] = useState<string | null>(null);
    const [expandedLevels, setExpandedLevels] = useState<{ [level: number]: boolean }>(() => {
        // Initialize all levels as expanded by default
        const expanded: { [level: number]: boolean } = {};
        for (let i = 0; i <= 9; i++) {
            expanded[i] = true;
        }
        return expanded;
    });
    const [spellDetailsModal, setSpellDetailsModal] = useState<{ isOpen: boolean, spell: Spell | null }>({ isOpen: false, spell: null });
    const [isAddingToSpellbook, setIsAddingToSpellbook] = useState(false);
    const [magicInitiateModalOpen, setMagicInitiateModalOpen] = useState(false);

    const safeMySpells = Array.isArray(mySpells) ? mySpells : [];
    const isWizardSpellbook = classId === 'wizard' && preparedCaster;
    const isInnateOnly = classId === 'innate'; // Elven lineage spells only, no class spellcasting
    const isMagicInitiateOnly = classId === 'magic_initiate';
    const effectiveSpellbook: string[] = Array.isArray(spellbookProp) ? spellbookProp : [];

    const slotsUsedKey = JSON.stringify(initialSlotsUsed && typeof initialSlotsUsed === 'object' && !Array.isArray(initialSlotsUsed) ? initialSlotsUsed : {});
    useEffect(() => {
        setMySpells(Array.isArray(initialSpells) ? initialSpells : []);
        setSlotsUsed(initialSlotsUsed && typeof initialSlotsUsed === 'object' && !Array.isArray(initialSlotsUsed) ? initialSlotsUsed : {});
    }, [initialSpells, slotsUsedKey]);


    useEffect(() => {
        const fetchSpells = async () => {
            try {
                const data = await api.get('/reference/spells');
                setAllSpells(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error('Failed to fetch spells', err);
            }
        };
        fetchSpells();
    }, []);

    const updateParent = (spells: CharacterSpell[], slots: { [level: number]: number }) => {
        onUpdate({ spells, spellSlotsUsed: slots });
    };

    // Helper function to parse casting time and determine action type
    const getActionTypeFromCastingTime = (castingTime: string): 'action' | 'bonus' | 'reaction' | 'other' => {
        const time = castingTime.toLowerCase();
        if (time.includes('bonus action')) {
            return 'bonus';
        } else if (time.includes('reaction')) {
            return 'reaction';
        } else if (time.includes('action') || time === '1 action') {
            return 'action';
        } else {
            return 'other';
        }
    };

    // Helper function to get action name for a spell
    const getActionName = (spellName: string, type: 'action' | 'bonus' | 'reaction' | 'other') => {
        switch (type) {
            case 'bonus':
                return `Cast ${spellName} (Bonus)`;
            case 'reaction':
                return `Cast ${spellName} (Reaction)`;
            case 'other':
                return `Cast ${spellName}`;
            case 'action':
            default:
                return `Cast ${spellName}`;
        }
    };

    const safeExistingActions = Array.isArray(existingActions) ? existingActions : [];
    // Helper function to find action index by name
    const findActionIndex = (actionName: string): number => {
        return safeExistingActions.findIndex(a => a?.name === actionName);
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
    const createSpellAction = async (spell: Spell | CharacterSpell) => {
        if (!onCreateAction) return;
        
        const spellData = 'description' in spell ? spell : safeAllSpells.find(s => s.id === spell.id);
        if (!spellData) return;

        // Determine action type from casting time
        const actionType = getActionTypeFromCastingTime(spellData.castingTime);
        const actionName = getActionName(spell.name, actionType);
        
        // Check if action already exists
        if (findActionIndex(actionName) !== -1) {
            return; // Action already exists
        }

        const description = `**Casting Time:** ${spellData.castingTime}\n**Range:** ${spellData.range}\n**Components:** ${spellData.components}\n**Duration:** ${spellData.duration}\n\n${spellData.description}`;

        try {
            await onCreateAction({
                name: actionName,
                description: description,
                type: actionType
            });
        } catch (err) {
            console.error('Failed to create spell action', err);
        }
    };

    const learnSpell = async (spell: Spell) => {
        try {
            // Check spells known limit for subclass spellcasting (Arcane Trickster, Eldritch Knight)
            if (isSubclassSpellcasting && spellsKnownLimit > 0) {
                const currentCantrips = safeMySpells.filter(s => s.level === 0).length;
                const currentSpells = safeMySpells.filter(s => s.level > 0).length;
                if (spell.level === 0 && currentCantrips >= cantripsKnownLimit) {
                    alert(`You can only know ${cantripsKnownLimit} cantrips. Unlearn a cantrip first.`);
                    return;
                }
                if (spell.level > 0 && currentSpells >= spellsKnownLimit) {
                    alert(`You can only know ${spellsKnownLimit} spells. Unlearn a spell first.`);
                    return;
                }
            }
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
            await createSpellAction(newSpell);
            
            setIsAdding(false);
            setIsCantripMode(false);
            setSearchTerm('');
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
            const spellToRemove = safeMySpells.find(s => s.id === spellId);
            if (!spellToRemove) return;

            console.log('Attempting to delete spell:', `/characters/${characterId}/spells/${spellId}`);
            const response = await api.delete(`/characters/${characterId}/spells/${spellId}`);
            console.log('Delete response:', response);
            const updated = safeMySpells.filter(s => s.id !== spellId);
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

    const addToSpellbook = async (spell: Spell) => {
        if (!isWizardSpellbook || effectiveSpellbook.includes(spell.id)) return;
        try {
            await api.post(`/characters/${characterId}/spellbook`, { spellIds: [spell.id] });
            const newSpellbook = [...effectiveSpellbook, spell.id];
            onUpdate({ spellbook: newSpellbook });
            setIsAddingToSpellbook(false);
        } catch (err) {
            console.error('Failed to add spell to spellbook', err);
            alert('Failed to add spell to spellbook');
        }
    };

    const removeFromSpellbook = async (spellId: string) => {
        if (!isWizardSpellbook || !effectiveSpellbook.includes(spellId)) return;
        try {
            await api.delete(`/characters/${characterId}/spellbook`, { data: { spellIds: [spellId] } });
            const newSpellbook = effectiveSpellbook.filter(id => id !== spellId);
            const updatedSpells = safeMySpells.filter(s => s.id !== spellId);
            setMySpells(updatedSpells);
            onUpdate({ spellbook: newSpellbook, spells: updatedSpells });
            const spellToRemove = safeMySpells.find(s => s.id === spellId);
            if (spellToRemove) {
                const fullSpell = safeAllSpells.find(s => s.id === spellId);
                if (fullSpell) {
                    const actionType = getActionTypeFromCastingTime(fullSpell.castingTime);
                    await removeActionByName(getActionName(spellToRemove.name, actionType));
                }
            }
        } catch (err) {
            console.error('Failed to remove spell from spellbook', err);
            alert('Failed to remove spell from spellbook');
        }
    };

    const prepareSpellDirectly = async (spell: Spell) => {
        // For prepared casters: add spell and prepare it in one action
        try {
            // Check if spell already exists
            const existingSpell = safeMySpells.find(s => s.id === spell.id);
            if (existingSpell) {
                // Just toggle preparation
                await togglePrepared(spell.id, existingSpell.prepared);
                return;
            }

            // Check prepared spells limit (only for non-cantrip spells)
            if (spell.level > 0 && preparedCaster) {
                if (currentPreparedCount >= preparedSpellsLimit) {
                    alert(`You have reached your prepared spells limit (${preparedSpellsLimit}). Unprepare a spell first to prepare a new one.`);
                    return;
                }
            }

            // Add spell and prepare it
            await api.post(`/characters/${characterId}/spells`, {
                spellId: spell.id,
                name: spell.name,
                level: spell.level,
                school: spell.school,
                prepared: true
            });
            const newSpell: CharacterSpell = {
                id: spell.id,
                name: spell.name,
                level: spell.level,
                school: spell.school,
                prepared: true
            };
            const updated = [...mySpells, newSpell];
            setMySpells(updated);
            updateParent(updated, slotsUsed);
            
            // Create action for prepared spell (type determined by casting time)
            await createSpellAction(newSpell);
        } catch (err) {
            console.error('Failed to prepare spell', err);
            alert('Failed to prepare spell');
        }
    };

    const togglePrepared = async (spellId: string, currentStatus: boolean) => {
        try {
            const spell = safeMySpells.find(s => s.id === spellId);
            if (!spell) return;

            // Check prepared spells limit when preparing (only for non-cantrip spells)
            if (!currentStatus && spell.level > 0 && preparedCaster) {
                if (currentPreparedCount >= preparedSpellsLimit) {
                    alert(`You have reached your prepared spells limit (${preparedSpellsLimit}). Unprepare a spell first to prepare a new one.`);
                    return;
                }
            }

            await api.patch(`/characters/${characterId}/spells/${spellId}/prepare`, {
                prepared: !currentStatus
            });
            const updated = safeMySpells.map(s => s.id === spellId ? { ...s, prepared: !currentStatus } : s);
            setMySpells(updated);
            updateParent(updated, slotsUsed);
            
            // Get spell data to determine action type from casting time
            const spellData = safeAllSpells.find(s => s.id === spell.id);
            if (spellData) {
                const actionType = getActionTypeFromCastingTime(spellData.castingTime);
                const actionName = getActionName(spell.name, actionType);
                
                // Remove any existing action with different type (in case it was created incorrectly)
                const allPossibleNames = [
                    getActionName(spell.name, 'action'),
                    getActionName(spell.name, 'bonus'),
                    getActionName(spell.name, 'reaction'),
                    getActionName(spell.name, 'other')
                ];
                
                // Remove all existing actions for this spell
                for (const name of allPossibleNames) {
                    if (name !== actionName) {
                        await removeActionByName(name);
                    }
                }
                
                // Create action with correct type based on casting time
                await createSpellAction(spell);
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

    // Calculate spell slots - handle multiclassing and subclass spellcasting (Arcane Trickster, Eldritch Knight)
    const hasMultipleClasses = classesData && Object.keys(classesData).length > 1;
    const isSubclassSpellcasting = !!subclassSpellcasting;
    let maxSlots: number[];
    let effectiveCasterLevel = level;

    if (classId === 'innate') {
        // Elven lineage spells only: no spell slots from class (spells cast 1/LR for free)
        maxSlots = [];
        effectiveCasterLevel = level;
    } else if (isSubclassSpellcasting && subclassSpellcasting) {
        effectiveCasterLevel = Math.floor(level / subclassSpellcasting.casterLevelDivisor);
        maxSlots = getSlotsForClass(subclassSpellcasting.spellListClass, level, subclassSpellcasting.casterLevelDivisor);
    } else if (hasMultipleClasses && allClassesData) {
        effectiveCasterLevel = calculateMulticlassSpellcasterLevel(classesData, allClassesData);
        maxSlots = getSlotsForClass('wizard', effectiveCasterLevel);
    } else {
        maxSlots = getSlotsForClass(classId, level);
    }

    // Calculate prepared spells limit
    // For multiclassed prepared casters, we need to calculate limit per class
    const getPreparedSpellsLimit = (): number => {
        if (!preparedCaster || !abilityScores || !spellcastingAbility) return 0;
        
        if (hasMultipleClasses && allClassesData) {
            // For multiclassed characters, sum up prepared spells limits from all prepared caster classes
            const spellcastingClasses = getSpellcastingClasses(classesData, allClassesData);
            let totalLimit = 0;
            
            for (const { classId: clsId, level: clsLevel, classInfo } of spellcastingClasses) {
                if (classInfo.preparedCaster && classInfo.spellcastingAbility) {
                    const classLimit = calculatePreparedSpellsLimitForClass(
                        clsId,
                        clsLevel,
                        classInfo.spellcastingAbility,
                        abilityScores
                    );
                    totalLimit += classLimit;
                }
            }
            
            return totalLimit;
        } else {
            // Single class: use shared logic (Ranger uses fixed table; others use level + modifier)
            return calculatePreparedSpellsLimitForClass(
                classId,
                level,
                spellcastingAbility,
                abilityScores
            );
        }
    };

    const preparedSpellsLimit = getPreparedSpellsLimit();
    const currentPreparedCount = safeMySpells.filter(s => s.prepared && s.level > 0).length;

    // Get all spellcasting classes for multiclassed characters, or subclass spellcasting
    const spellcastingClasses = isSubclassSpellcasting && subclassSpellcasting
        ? [{ classId: subclassSpellcasting.spellListClass, level, classInfo: { spellcaster: true, preparedCaster: false, spellcastingAbility: subclassSpellcasting.spellcastingAbility } }]
        : (hasMultipleClasses && allClassesData
            ? getSpellcastingClasses(classesData, allClassesData)
            : [{ classId, level, classInfo: { spellcaster: true, preparedCaster, spellcastingAbility } }]);

    // Get all class IDs that can cast spells (for spell list filtering)
    const availableClassIds = spellcastingClasses.map(sc => sc.classId.toLowerCase());

    // Spells known limits for third casters (Arcane Trickster, Eldritch Knight)
    const spellsKnownLimit = isSubclassSpellcasting && subclassSpellcasting
        ? THIRD_CASTER_SPELLS_KNOWN[Math.min(Math.max(0, level - 1), 19)] ?? 0
        : 0;
    const cantripsKnownLimit = isSubclassSpellcasting && subclassSpellcasting
        ? (THIRD_CASTER_CANTRIPS[subclassSpellcasting.subclassId] ?? 2)
        : 0;
    
    // For prepared casters in cantrip mode: show only cantrips not yet learned
    // For prepared casters in prepare mode: show spells they can prepare (wizard = spellbook only; others = all)
    // For known casters: only show spells not yet learned
    const safeAllSpells = Array.isArray(allSpells) ? allSpells : [];
    const availableSpells = safeAllSpells.filter(s => {
        // Check if spell is available to any of the character's spellcasting classes
        const spellClasses = s.classes || [];
        const spellAvailableToClass = spellClasses.some((spellClass: string) => 
            availableClassIds.includes(spellClass.toLowerCase())
        );
        if (!spellAvailableToClass) return false;
        
        // Check spell level availability based on effective caster level
        const maxSpellLevel = Math.ceil(effectiveCasterLevel / 2);
        if (s.level === 0 || s.level <= maxSpellLevel) {
            if (preparedCaster || spellcastingClasses.some(sc => sc.classInfo.preparedCaster)) {
                if (isCantripMode) {
                    // Cantrip mode: only show unlearned cantrips
                    return s.level === 0 && !safeMySpells.find(ms => ms.id === s.id);
                } else {
                    // Prepare mode: wizard = only spellbook spells; other prepared casters = all non-cantrip
                    if (isWizardSpellbook) {
                        return s.level > 0 && effectiveSpellbook.includes(s.id);
                    }
                    return s.level > 0;
                }
            } else {
                // Known casters: only show unlearned spells
                return !safeMySpells.find(ms => ms.id === s.id);
            }
        }
        return false;
    });

    // For "Add to Spellbook" modal: wizard spells NOT yet in spellbook (level 1+ only)
    const spellsToAddToSpellbook = safeAllSpells.filter(s => {
        if (s.level === 0) return false;
        const spellAvailableToClass = (s.classes || []).some((spellClass: string) => 
            availableClassIds.includes(spellClass.toLowerCase())
        );
        if (!spellAvailableToClass) return false;
        const maxSpellLevel = Math.ceil(effectiveCasterLevel / 2);
        if (s.level > maxSpellLevel) return false;
        return !effectiveSpellbook.includes(s.id);
    });

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

    // Elven lineage spells (2024 PHB): granted at character levels 1, 3, 5. Always prepared.
    const lineageKey = (elvenLineage || '').toLowerCase().replace(/\s+/g, '_');
    const lineageSpellsConfigRaw = lineageKey ? ELVEN_LINEAGE_SPELLS[lineageKey] : null;
    const lineageSpellsConfig = Array.isArray(lineageSpellsConfigRaw) ? lineageSpellsConfigRaw : [];
    const lineageSpellsForLevel = lineageSpellsConfig
        .filter(entry => level >= entry.level)
        .map(entry => ({ ...entry, spell: safeAllSpells.find(s => s.id === entry.spellId) }))
        .filter((x): x is typeof x & { spell: Spell } => !!x.spell);

    // Subclass bonus spells (e.g. Gloom Stalker): granted at class levels 3, 5, 9, 13, 17. Always prepared.
    const subclassKey = (subclassIdProp || '').toLowerCase().replace(/\s+/g, '_');
    const subclassClassLvl = subclassClassLevel ?? level;
    const subclassSpellsConfigRaw = subclassKey ? SUBCLASS_BONUS_SPELLS[subclassKey] : null;
    const subclassSpellsConfig = Array.isArray(subclassSpellsConfigRaw) ? subclassSpellsConfigRaw : [];
    const subclassSpellsForLevel = subclassSpellsConfig
        .filter(entry => subclassClassLvl >= entry.level)
        .map(entry => ({ ...entry, spell: safeAllSpells.find(s => s.id === entry.spellId) }))
        .filter((x): x is typeof x & { spell: Spell } => !!x.spell);

    // Group spells by level
    // For prepared casters: show all available spells EXCEPT cantrips (level 0)
    // Cantrips must be learned one by one even for prepared casters
    // For known casters: only show learned spells
    const spellsByLevel = Array.from({ length: 10 }, (_, i) => i).map(lvl => {
        let spellsAtLevel: any[] = [];
        
        if ((preparedCaster || spellcastingClasses.some(sc => sc.classInfo.preparedCaster) || isInnateOnly) && lvl > 0) {
            // For prepared casters: show spells at this level. Wizard = spellbook only; others = all.
            const maxSpellLevel = Math.ceil(effectiveCasterLevel / 2);
            let availableAtLevel = safeAllSpells.filter(s => 
                (s.classes || []).some((spellClass: string) => availableClassIds.includes(spellClass.toLowerCase())) &&
                s.level === lvl &&
                s.level <= maxSpellLevel
            );
            if (isWizardSpellbook) {
                availableAtLevel = availableAtLevel.filter(s => effectiveSpellbook.includes(s.id));
            }
            
            spellsAtLevel = availableAtLevel.map(spell => {
                const knownSpell = safeMySpells.find(ms => ms.id === spell.id);
                return {
                    id: spell.id,
                    name: spell.name,
                    level: spell.level,
                    school: spell.school,
                    prepared: knownSpell?.prepared || false,
                    isKnown: !!knownSpell,
                    isElvenLineage: false,
                    isSubclassBonus: false
                };
            });

            // Add elven lineage spells for this level (always prepared, from racial trait)
            for (const { spell } of lineageSpellsForLevel) {
                if (spell.level === lvl && !spellsAtLevel.some(s => s.id === spell.id)) {
                    spellsAtLevel.push({
                        id: spell.id,
                        name: spell.name,
                        level: spell.level,
                        school: spell.school,
                        prepared: true,
                        isKnown: true,
                        isElvenLineage: true,
                        isSubclassBonus: false
                    });
                }
            }
            // Add subclass bonus spells for this level (e.g. Gloom Stalker; always prepared)
            for (const { spell } of subclassSpellsForLevel) {
                if (spell.level === lvl && !spellsAtLevel.some(s => s.id === spell.id)) {
                    spellsAtLevel.push({
                        id: spell.id,
                        name: spell.name,
                        level: spell.level,
                        school: spell.school,
                        prepared: true,
                        isKnown: true,
                        isElvenLineage: false,
                        isSubclassBonus: true
                    });
                }
            }
        } else if (lvl === 0) {
            // Cantrips: learned spells + elven lineage cantrip
            spellsAtLevel = safeMySpells.filter(ms => ms.level === 0).map(ms => ({
                id: ms.id,
                name: ms.name,
                level: 0,
                school: ms.school,
                prepared: true,
                isKnown: true,
                isElvenLineage: false
            }));
            const lineageCantrip = lineageSpellsForLevel.find(l => l.spell.level === 0);
            if (lineageCantrip && !spellsAtLevel.some(s => s.id === lineageCantrip.spell.id)) {
                spellsAtLevel.push({
                    id: lineageCantrip.spell.id,
                    name: lineageCantrip.spell.name,
                    level: 0,
                    school: lineageCantrip.spell.school,
                    prepared: true,
                    isKnown: true,
                    isElvenLineage: true
                });
            }
        } else {
            // Known casters (non-cantrip): only show learned spells
            spellsAtLevel = safeMySpells.filter(ms => ms.level === lvl).map(ms => ({
                id: ms.id,
                name: ms.name,
                level: ms.level,
                school: ms.school,
                prepared: ms.prepared,
                isKnown: true,
                isElvenLineage: false
            }));
            // Add elven lineage spells for this level
            for (const { spell } of lineageSpellsForLevel) {
                if (spell.level === lvl && !spellsAtLevel.some(s => s.id === spell.id)) {
                    spellsAtLevel.push({
                        id: spell.id,
                        name: spell.name,
                        level: spell.level,
                        school: spell.school,
                        prepared: true,
                        isKnown: true,
                        isElvenLineage: true,
                        isSubclassBonus: false
                    });
                }
            }
            // Add subclass bonus spells for this level
            for (const { spell } of subclassSpellsForLevel) {
                if (spell.level === lvl && !spellsAtLevel.some(s => s.id === spell.id)) {
                    spellsAtLevel.push({
                        id: spell.id,
                        name: spell.name,
                        level: spell.level,
                        school: spell.school,
                        prepared: true,
                        isKnown: true,
                        isElvenLineage: false,
                        isSubclassBonus: true
                    });
                }
            }
        }

        // Sort spells: prepared spells first, then alphabetically by name
        spellsAtLevel.sort((a, b) => {
            // First sort by prepared status (prepared spells come first)
            if (a.prepared !== b.prepared) {
                return a.prepared ? -1 : 1;
            }
            // Then sort alphabetically by name
            return a.name.localeCompare(b.name);
        });

        return {
            level: lvl,
            spells: spellsAtLevel,
            slots: lvl > 0 ? (maxSlots[lvl - 1] || 0) : 0
        };
    }).filter(group => group.spells.length > 0 || group.slots > 0);

    // Magic Initiate only: show just the feat's spell list and config
    if (isMagicInitiateOnly && onMagicInitiateUpdate) {
        const mi = magicInitiate;
        const safeAllSpellsForMi = Array.isArray(allSpells) ? allSpells : [];
        const miSpells: { id: string; name: string; level: number; school: string }[] = [];
        if (mi?.cantrips) {
            for (const id of mi.cantrips) {
                const s = safeAllSpellsForMi.find(sp => sp.id === id);
                if (s) miSpells.push({ id: s.id, name: s.name, level: 0, school: s.school });
            }
        }
        if (mi?.spell1) {
            const s = safeAllSpellsForMi.find(sp => sp.id === mi.spell1);
            if (s) miSpells.push({ id: s.id, name: s.name, level: 1, school: s.school });
        }
        const classLabel = mi?.class ? (MAGIC_INITIATE_CLASSES.find(c => c.id === mi.class)?.name ?? mi.class) : '';
        return (
            <div className="card">
                <div className="spellbook-header" style={{ marginBottom: '0.75rem' }}>
                    <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', margin: 0 }}>
                        Magic Initiate{classLabel ? ` (${classLabel})` : ''}
                    </h3>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                        {!mi?.class ? (
                            <button className="button primary" onClick={() => setMagicInitiateModalOpen(true)} style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
                                Set up Magic Initiate
                            </button>
                        ) : (
                            <>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    Ability: {(spellcastingAbility || 'int').toUpperCase()} • 1st-level spell: {(magicInitiateSpell1Used ?? 1)}/1 use per long rest
                                </span>
                                <button className="button secondary" onClick={() => setMagicInitiateModalOpen(true)} style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
                                    Change spells
                                </button>
                            </>
                        )}
                    </div>
                </div>
                {mi?.class && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {miSpells.map(spell => (
                            <div key={spell.id} className="spell-item spell-item-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', backgroundColor: 'var(--surface)', borderRadius: '4px' }}>
                                <div>
                                    <span style={{ fontWeight: 'bold' }}>{spell.name}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
                                        {spell.level === 0 ? 'Cantrip' : `1st`} • {spell.school}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                    {spell.level === 1 && (
                                        <button
                                            type="button"
                                            className="button primary"
                                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                if ((magicInitiateSpell1Used ?? 1) <= 0) return;
                                                if (onMagicInitiateSpell1Use) {
                                                    onMagicInitiateSpell1Use();
                                                } else {
                                                    onUpdate({ magicInitiateSpell1Used: 0 });
                                                }
                                            }}
                                            disabled={(magicInitiateSpell1Used ?? 1) <= 0}
                                        >
                                            Use
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="button plain"
                                        style={{ fontSize: '0.75rem' }}
                                        onClick={() => setSpellDetailsModal({ isOpen: true, spell: safeAllSpellsForMi.find(s => s.id === spell.id) || null })}
                                    >
                                        View
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <MagicInitiateConfigModal
                    isOpen={magicInitiateModalOpen}
                    onClose={() => setMagicInitiateModalOpen(false)}
                    allSpells={safeAllSpellsForMi}
                    initial={mi}
                    onSave={(config) => onMagicInitiateUpdate(config)}
                />
                <SpellDetailsModal spell={spellDetailsModal.spell} isOpen={spellDetailsModal.isOpen} onClose={() => setSpellDetailsModal({ isOpen: false, spell: null })} />
            </div>
        );
    }

    return (
        <div className="card">
            <div className="spellbook-header" style={{ marginBottom: '0.75rem' }}>
                <h3 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.875rem', fontWeight: 'bold', margin: 0 }}>
                    {isInnateOnly ? 'Elven Lineage Spells' : preparedCaster ? 'Spellbook (Prepare Spells)' : 'Spellbook'}
                    {preparedCaster && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal', display: 'block', marginTop: '0.25rem' }}>
                            Prepared: {currentPreparedCount} / {preparedSpellsLimit}
                        </span>
                    )}
                    {isSubclassSpellcasting && spellsKnownLimit > 0 && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 'normal', display: 'block', marginTop: '0.25rem' }}>
                            Spells: {safeMySpells.filter(s => s.level > 0).length} / {spellsKnownLimit} • Cantrips: {safeMySpells.filter(s => s.level === 0).length} / {cantripsKnownLimit}
                        </span>
                    )}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'flex-end' }}>
                    {!isInnateOnly && (
                    <button className="button secondary" onClick={() => setSlotsUsed({})} style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>Rest (Reset Slots)</button>
                    )}
                    {!preparedCaster && !isInnateOnly && (
                        <button
                            className="button primary"
                            style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                            onClick={() => setIsAdding(true)}
                        >
                            + Learn Spell
                        </button>
                    )}
                    {preparedCaster && !isInnateOnly && (
                        <>
                            <button
                                className="button primary"
                                style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                                onClick={() => {
                                    setIsCantripMode(true);
                                    setSearchTerm('');
                                    setIsAdding(true);
                                }}
                            >
                                + Learn Cantrip
                            </button>
                            {isWizardSpellbook && (
                                <button
                                    className="button secondary"
                                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                                    onClick={() => {
                                        setSearchTerm('');
                                        setIsAddingToSpellbook(true);
                                    }}
                                >
                                    + Add to Spellbook
                                </button>
                            )}
                            <button
                                className="button primary"
                                style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                                onClick={() => {
                                    setIsCantripMode(false);
                                    setSearchTerm('');
                                    setIsAdding(true);
                                }}
                            >
                                + Prepare Spell
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Spell Details Modal */}
            <SpellDetailsModal 
                spell={spellDetailsModal.spell}
                isOpen={spellDetailsModal.isOpen}
                onClose={() => setSpellDetailsModal({ isOpen: false, spell: null })}
            />

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
                <div className="modal-overlay" onClick={() => {
                    setIsAdding(false);
                    setIsCantripMode(false);
                    setSearchTerm('');
                }}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <h3>
                            {preparedCaster && isCantripMode
                                ? 'Learn Cantrip'
                                : preparedCaster && !isCantripMode
                                ? 'Prepare Spell'
                                : 'Learn New Spell'}
                        </h3>
                        {preparedCaster && !isCantripMode && (
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                {isWizardSpellbook
                                    ? 'Select a spell from your spellbook to prepare it. Add spells via "Add to Spellbook". Prepared: ' + currentPreparedCount + ' / ' + preparedSpellsLimit
                                    : 'You know all spells of your class (except cantrips). Select a spell to prepare it. Prepared: ' + currentPreparedCount + ' / ' + preparedSpellsLimit}
                            </p>
                        )}
                        {preparedCaster && isCantripMode && (
                            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                Cantrips must be learned one by one. Select a cantrip to learn it.
                            </p>
                        )}
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
                            {filteredSpells.map(spell => {
                                const isPrepared = safeMySpells.find(ms => ms.id === spell.id)?.prepared || false;
                                const isKnown = safeMySpells.some(ms => ms.id === spell.id);
                                // For prepared casters: if in cantrip mode, use learn. Otherwise use prepare.
                                const shouldLearn = !preparedCaster || isCantripMode;
                                // Subclass spellcasting (AT/EK): enforce spells known limit
                                const atSpellsLimit = isSubclassSpellcasting && (
                                    (spell.level === 0 && safeMySpells.filter(s => s.level === 0).length >= cantripsKnownLimit && !isKnown) ||
                                    (spell.level > 0 && safeMySpells.filter(s => s.level > 0).length >= spellsKnownLimit && !isKnown)
                                );
                                // Check if spell can be prepared/learned (not at limit)
                                const canPrepare = !atSpellsLimit && (
                                    shouldLearn || spell.level === 0 || isPrepared || currentPreparedCount < preparedSpellsLimit
                                );
                                
                                return (
                                    <div 
                                        key={spell.id} 
                                        className="spell-row" 
                                        style={{ 
                                            cursor: canPrepare ? 'pointer' : 'not-allowed', 
                                            padding: '0.5rem', 
                                            border: '1px solid var(--border)', 
                                            borderRadius: '4px',
                                            backgroundColor: isPrepared ? 'var(--surface)' : 'transparent',
                                            opacity: canPrepare ? 1 : 0.5
                                        }} 
                                        onClick={() => {
                                            if (canPrepare) {
                                                shouldLearn ? learnSpell(spell) : prepareSpellDirectly(spell);
                                            } else if (atSpellsLimit) {
                                                alert(spell.level === 0
                                                    ? `You can only know ${cantripsKnownLimit} cantrips. Unlearn a cantrip first.`
                                                    : `You can only know ${spellsKnownLimit} spells. Unlearn a spell first.`);
                                            } else if (!shouldLearn && spell.level > 0) {
                                                alert(`You have reached your prepared spells limit (${preparedSpellsLimit}). Unprepare a spell first to prepare a new one.`);
                                            }
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontWeight: 'bold' }}>{spell.name}</div>
                                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                                {preparedCaster && !shouldLearn && isPrepared && (
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 'bold' }}>Prepared</span>
                                                )}
                                                <button
                                                    className="button secondary"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSpellDetailsModal({ isOpen: true, spell });
                                                    }}
                                                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                                    title="View spell details"
                                                >
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            Level {spell.level} {spell.school} • {spell.castingTime}
                                        </div>
                                        <div style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{spell.description.substring(0, 100)}...</div>
                                    </div>
                                );
                            })}
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
                                setIsCantripMode(false);
                                setSearchTerm('');
                            }}>Close</button>
                        </div>
                    </div>
                </div>
            )}

            {isAddingToSpellbook && (
                <div className="modal-overlay" onClick={() => setIsAddingToSpellbook(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
                        <h3>Add to Spellbook</h3>
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                            Choose a wizard spell to add to your spellbook (e.g. from copying a scroll or research). You can then prepare it.
                        </p>
                        <input
                            type="text"
                            placeholder="Search spells..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                marginBottom: '1rem',
                                border: '1px solid var(--border)',
                                borderRadius: '4px',
                                backgroundColor: 'var(--surface)',
                                color: 'var(--text)',
                                fontSize: '0.875rem'
                            }}
                        />
                        <div style={{ display: 'grid', gap: '0.5rem', overflowY: 'auto', flex: 1 }}>
                            {spellsToAddToSpellbook
                                .filter(spell => !searchTerm.trim() || spell.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                .map(spell => (
                                    <div
                                        key={spell.id}
                                        className="spell-row"
                                        style={{ cursor: 'pointer', padding: '0.5rem', border: '1px solid var(--border)', borderRadius: '4px' }}
                                        onClick={() => addToSpellbook(spell)}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div style={{ fontWeight: 'bold' }}>{spell.name}</div>
                                            <button
                                                className="button secondary"
                                                onClick={(e) => { e.stopPropagation(); setSpellDetailsModal({ isOpen: true, spell }); }}
                                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                            >
                                                View
                                            </button>
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            Level {spell.level} {spell.school} • {spell.castingTime}
                                        </div>
                                    </div>
                                ))}
                            {spellsToAddToSpellbook.filter(s => !searchTerm.trim() || s.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                    {spellsToAddToSpellbook.length === 0
                                        ? 'All wizard spells at your level are already in your spellbook.'
                                        : 'No spells match your search.'}
                                </p>
                            )}
                        </div>
                        <button
                            className="button secondary"
                            onClick={() => { setIsAddingToSpellbook(false); setSearchTerm(''); }}
                            style={{ marginTop: '1rem' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {spellsByLevel.length === 0 && (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>
                    {preparedCaster ? 'No spells available at your level.' : 'No spells known.'}
                </p>
            )}

            {spellsByLevel.map(group => {
                const isExpanded = expandedLevels[group.level] !== false; // Default to true
                return (
                <div key={group.level} style={{ marginBottom: '1rem' }}>
                    <div 
                        className="spell-level-row"
                        style={{ 
                            borderBottom: '1px solid var(--border)', 
                            paddingBottom: '0.25rem', 
                            marginBottom: '0.5rem', 
                            fontWeight: 'bold', 
                            fontSize: '0.875rem', 
                            color: 'var(--text-muted)',
                            cursor: 'pointer'
                        }}
                        onClick={() => setExpandedLevels({ ...expandedLevels, [group.level]: !isExpanded })}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <span style={{ fontSize: '0.75rem', userSelect: 'none' }}>
                                {isExpanded ? '▼' : '▶'}
                            </span>
                            <span>{group.level === 0 ? 'Cantrips' : `Level ${group.level}`}</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>
                                ({group.spells.length})
                            </span>
                        </div>

                        {/* Spell Slots UI */}
                        {group.level > 0 && group.slots > 0 && (
                            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center', flexWrap: 'wrap' }} onClick={(e) => e.stopPropagation()}>
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

                    {isExpanded && (
                        <div className="spell-level-grid">
                            {group.spells.map(spell => {
                            // For prepared casters, spell might have isKnown property
                            const isKnown = preparedCaster ? (spell as any).isKnown !== false : true;
                            const spellPrepared = spell.prepared || false;
                            
                            // Get full spell data for details modal
                            const fullSpell = safeAllSpells.find(s => s.id === spell.id);
                            
                            const isElvenLineageSpell = (spell as any).isElvenLineage === true;
                            const isSubclassBonusSpell = (spell as any).isSubclassBonus === true;
                            return (
                                <div key={spell.id} className="spell-item spell-item-row" style={{ backgroundColor: 'var(--surface)', padding: '0.5rem', borderRadius: '4px' }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 'bold' }}>
                                            {spell.name}
                                            {isElvenLineageSpell && (
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: '0.35rem' }}>(Elven Lineage)</span>
                                            )}
                                            {isSubclassBonusSpell && (
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: '0.35rem' }}>(Subclass)</span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{spell.school}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        {fullSpell && (
                                            <button
                                                className="button secondary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSpellDetailsModal({ isOpen: true, spell: fullSpell });
                                                }}
                                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                                title="View spell details"
                                            >
                                                View
                                            </button>
                                        )}
                                        {spell.level > 0 && !isElvenLineageSpell && !isSubclassBonusSpell && (
                                            <button
                                                className={`button ${spellPrepared ? 'primary' : 'secondary'}`}
                                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                                onClick={() => {
                                                    if (preparedCaster && !isKnown) {
                                                        const fullSpell = safeAllSpells.find(s => s.id === spell.id);
                                                        if (fullSpell) prepareSpellDirectly(fullSpell);
                                                    } else {
                                                        togglePrepared(spell.id, spellPrepared);
                                                    }
                                                }}
                                                disabled={preparedCaster && !spellPrepared && currentPreparedCount >= preparedSpellsLimit}
                                                title={preparedCaster && !spellPrepared && currentPreparedCount >= preparedSpellsLimit 
                                                    ? `Prepared spells limit reached (${preparedSpellsLimit}). Unprepare a spell first.`
                                                    : spellPrepared ? 'Click to unprepare this spell' : 'Click to prepare this spell'}
                                            >
                                                {spellPrepared ? 'Prepared' : 'Prepare'}
                                            </button>
                                        )}
                                        {(spell.level > 0 && (isElvenLineageSpell || isSubclassBonusSpell)) && (
                                            <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold' }}>Always prepared</span>
                                        )}
                                        {!preparedCaster && !isElvenLineageSpell && !isSubclassBonusSpell && (
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
                                        )}
                                        {isWizardSpellbook && spell.level > 0 && !isElvenLineageSpell && !isSubclassBonusSpell && (
                                            <button
                                                type="button"
                                                className="button plain"
                                                style={{ color: 'var(--error)', fontSize: '1rem', lineHeight: 1 }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    if (confirm(`Remove ${spell.name} from your spellbook? It will also be unprepared if currently prepared.`)) {
                                                        removeFromSpellbook(spell.id);
                                                    }
                                                }}
                                                title="Remove from Spellbook"
                                            >
                                                Remove
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        </div>
                    )}
                </div>
            );
            })}
            {/* Magic Initiate subsection when character has both class spellcasting and the feat */}
            {magicInitiate && onMagicInitiateUpdate && !isMagicInitiateOnly && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h4 style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold', margin: 0 }}>
                            Magic Initiate ({MAGIC_INITIATE_CLASSES.find(c => c.id === magicInitiate.class)?.name ?? magicInitiate.class})
                        </h4>
                        <button className="button secondary" onClick={() => setMagicInitiateModalOpen(true)} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>
                            Change spells
                        </button>
                    </div>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Always prepared; don&apos;t count toward your prepared spell limit. 1st-level spell: {(magicInitiateSpell1Used ?? 1)}/1 use per long rest.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {[...(magicInitiate.cantrips || []), ...(magicInitiate.spell1 ? [magicInitiate.spell1] : [])].map(spellId => {
                            const s = safeAllSpells.find(sp => sp.id === spellId);
                            if (!s) return null;
                            const isLevel1 = s.level === 1;
                            return (
                                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0.5rem', backgroundColor: 'var(--surface)', borderRadius: '4px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{s.name}</span>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                        {isLevel1 && (
                                            <button
                                                type="button"
                                                className="button primary"
                                                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    if ((magicInitiateSpell1Used ?? 1) <= 0) return;
                                                    if (onMagicInitiateSpell1Use) {
                                                        onMagicInitiateSpell1Use();
                                                    } else {
                                                        onUpdate({ magicInitiateSpell1Used: 0 });
                                                    }
                                                }}
                                                disabled={(magicInitiateSpell1Used ?? 1) <= 0}
                                            >
                                                Use
                                            </button>
                                        )}
                                        <button type="button" className="button plain" style={{ fontSize: '0.75rem' }} onClick={() => setSpellDetailsModal({ isOpen: true, spell: s })}>View</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <MagicInitiateConfigModal
                        isOpen={magicInitiateModalOpen}
                        onClose={() => setMagicInitiateModalOpen(false)}
                        allSpells={safeAllSpells}
                        initial={magicInitiate}
                        onSave={(config) => onMagicInitiateUpdate(config)}
                    />
                </div>
            )}
        </div>
    );
}
