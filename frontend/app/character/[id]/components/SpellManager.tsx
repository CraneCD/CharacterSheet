'use client';

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Spell, CharacterSpell, CharacterData } from '@/lib/types';
import { calculateMulticlassSpellcasterLevel, getSpellcastingClasses, calculatePreparedSpellsLimitForClass, getCantripsKnown, getKnownSpellsLimit } from '@/lib/multiclassSpellcasting';
import { ELVEN_LINEAGE_SPELLS, SUBCLASS_BONUS_SPELLS, MAGIC_INITIATE_CLASSES } from '@/lib/wizardReference';
import { getSlotsForClass, getPactMagic, THIRD_CASTER_SPELLS_KNOWN, getThirdCasterCantrips } from '@/lib/spellSlots';
import SpellDetailsModal from './SpellDetailsModal';
import MagicInitiateConfigModal from './MagicInitiateConfigModal';
import { ConfirmDialog, describeError, Modal, useToast } from '@/app/components/ui';
import SpellFilterBar from './SpellFilterBar';
import SlotPips from './SlotPips';
import type { CastableSummary } from '@/lib/actionRows';
import { EMPTY_SPELL_FILTERS, hasActiveSpellFilters, schoolsOf, SpellFilters, spellMatches } from '@/lib/spellFilters';

/** Subclass spellcasting (Arcane Trickster, Eldritch Knight). */
interface SubclassSpellcasting {
    subclassId: string;
    spellListClass: string;
    spellcastingAbility: string;
    casterLevelDivisor: number;
    /** Level in the class the subclass belongs to (defaults to the character level). */
    classLevel?: number;
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
    /** Always-prepared subclass spells from the subclass record (class level -> spell). Falls back to SUBCLASS_BONUS_SPELLS. */
    subclassSpells?: { level: number; spellId: string }[];
    /** Always-prepared spells from class feature choices (Mystic Arcanum, Spell Mastery, Signature Spells). */
    classFeatureSpells?: string[];
    /** Extra cantrips known (Divine Order: Thaumaturge, Primal Order: Magician). */
    bonusCantrips?: number;
    /** Spells from the species / lineage choice (character level -> spell). Falls back to the elven lineage table. */
    speciesSpells?: { level: number; spellId: string }[];
    /** Level in the class that has the subclass (for subclass bonus spells). Defaults to level if not multiclassed. */
    subclassClassLevel?: number;
    initialSlotsUsed: { [level: number]: number };
    /** Multiclassed Warlocks: Pact Magic slots expended (kept apart from the shared slots). */
    initialPactSlotsUsed?: number;
    spellcastingAbility: string;
    preparedCaster?: boolean; // If true, class knows all spells and prepares a subset
    /** Wizard only: spell IDs in the spellbook. If set, wizard can only prepare spells in the spellbook. */
    spellbook?: string[];
    abilityScores?: { [key: string]: number }; // For calculating prepared spells limit
    onUpdate: (data: Partial<CharacterData>) => void;
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
    /** Called with the spells you can cast now and the slots left (the sheet's Actions card lists them). */
    onCastableChange?: (summary: CastableSummary) => void;
    /** Magic Initiate: 1st-level spell uses remaining (1 = available, 0 = used). Resets on long rest. */
    magicInitiateSpell1Used?: number;
    /** Called when Magic Initiate 1st-level slot is toggled. used: 0 = used, 1 = available. */
    onMagicInitiateSlotChange?: (used: number) => void;
}

export default function SpellManager({ characterId, classId, level, initialSpells, initialSlotsUsed, initialPactSlotsUsed = 0, spellcastingAbility, preparedCaster = false, abilityScores, onUpdate, classes: classesData, allClasses: allClassesData, subclassSpellcasting, spellbook: spellbookProp, elvenLineage, subclassId: subclassIdProp, subclassClassLevel, subclassSpells, classFeatureSpells = [], bonusCantrips = 0, speciesSpells, magicInitiate, onMagicInitiateUpdate, magicInitiateSpell1Used = 1, onMagicInitiateSlotChange, onCastableChange }: SpellManagerProps) {
    const toast = useToast();
    const [mySpells, setMySpells] = useState<CharacterSpell[]>(Array.isArray(initialSpells) ? initialSpells : []);
    const [slotsUsed, setSlotsUsed] = useState<{ [level: number]: number }>(initialSlotsUsed || {});
    const [pactSlotsUsed, setPactSlotsUsed] = useState<number>(initialPactSlotsUsed);
    const [allSpells, setAllSpells] = useState<Spell[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const [isCantripMode, setIsCantripMode] = useState(false); // For prepared casters: true = learn cantrip, false = prepare spell
    const [searchTerm, setSearchTerm] = useState('');
    // Filters for the spell list on the sheet and for the learn/prepare picker
    const [listFilters, setListFilters] = useState<SpellFilters>(EMPTY_SPELL_FILTERS);
    const [pickerFilters, setPickerFilters] = useState<SpellFilters>(EMPTY_SPELL_FILTERS);
    const [spellToDelete, setSpellToDelete] = useState<string | null>(null);
    const [spellbookSpellToRemove, setSpellbookSpellToRemove] = useState<{ id: string; name: string } | null>(null);
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
    useEffect(() => setPactSlotsUsed(initialPactSlotsUsed), [initialPactSlotsUsed]);


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

    const learnSpell = async (spell: Spell) => {
        try {
            // Check spells known limit for subclass spellcasting (Arcane Trickster, Eldritch Knight)
            if (isSubclassSpellcasting && spellsKnownLimit > 0) {
                const currentCantrips = safeMySpells.filter(s => s.level === 0).length;
                const currentSpells = safeMySpells.filter(s => s.level > 0).length;
                if (spell.level === 0 && currentCantrips >= cantripsKnownLimit) {
                    toast.error(`You can only know ${cantripsKnownLimit} cantrips. Unlearn a cantrip first.`);
                    return;
                }
                if (spell.level > 0 && currentSpells >= spellsKnownLimit) {
                    toast.error(`You can only know ${spellsKnownLimit} spells. Unlearn a spell first.`);
                    return;
                }
            }
            // 2024: cantrip counts and (for Bard, Sorcerer, Warlock) spell counts come from the class table
            if (!isSubclassSpellcasting && !hasMultipleClasses) {
                const currentCantrips = safeMySpells.filter(s => s.level === 0).length;
                const currentSpells = safeMySpells.filter(s => s.level > 0).length;
                const cantripLimit = getCantripsKnown(classId, level) + bonusCantrips;
                if (spell.level === 0 && cantripLimit > 0 && currentCantrips >= cantripLimit) {
                    toast.error(`You can only know ${cantripLimit} cantrips at this level. Unlearn a cantrip first.`);
                    return;
                }
                const knownLimit = getKnownSpellsLimit(classId, level);
                if (spell.level > 0 && knownLimit > 0 && currentSpells >= knownLimit) {
                    toast.error(`You can only have ${knownLimit} spells at this level. Remove a spell first.`);
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

            setIsAdding(false);
            setIsCantripMode(false);
            setSearchTerm('');
        } catch (err) {
            console.error('Failed to learn spell', err);
            toast.error(describeError("Couldn't learn spell", err));
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

            await api.delete(`/characters/${characterId}/spells/${spellId}`);
            const updated = safeMySpells.filter(s => s.id !== spellId);
            setMySpells(updated);
            updateParent(updated, slotsUsed);
        } catch (err: any) {
            console.error('Failed to remove spell', err);
            toast.error(describeError("Couldn't remove spell", err));
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
            toast.error(describeError("Couldn't add spell to spellbook", err));
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
        } catch (err) {
            console.error('Failed to remove spell from spellbook', err);
            toast.error(describeError("Couldn't remove spell from spellbook", err));
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
                    toast.error(`You have reached your prepared spells limit (${preparedSpellsLimit}). Unprepare a spell first to prepare a new one.`);
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
        } catch (err) {
            console.error('Failed to prepare spell', err);
            toast.error(describeError("Couldn't prepare spell", err));
        }
    };

    const togglePrepared = async (spellId: string, currentStatus: boolean) => {
        try {
            const spell = safeMySpells.find(s => s.id === spellId);
            if (!spell) return;

            // Check prepared spells limit when preparing (only for non-cantrip spells)
            if (!currentStatus && spell.level > 0 && preparedCaster) {
                if (currentPreparedCount >= preparedSpellsLimit) {
                    toast.error(`You have reached your prepared spells limit (${preparedSpellsLimit}). Unprepare a spell first to prepare a new one.`);
                    return;
                }
            }

            await api.patch(`/characters/${characterId}/spells/${spellId}/prepare`, {
                prepared: !currentStatus
            });
            const updated = safeMySpells.map(s => s.id === spellId ? { ...s, prepared: !currentStatus } : s);
            setMySpells(updated);
            updateParent(updated, slotsUsed);
        } catch (err) {
            console.error('Failed to update preparation', err);
        }
    };

    const handleSlotChange = (level: number, used: number) => {
        const newSlots = { ...slotsUsed, [level]: used };
        setSlotsUsed(newSlots);
        updateParent(mySpells, newSlots);
    };

    const handlePactSlotChange = (used: number) => {
        setPactSlotsUsed(used);
        onUpdate({ pactSlotsUsed: used });
    };

    // Calculate spell slots - handle multiclassing and subclass spellcasting (Arcane Trickster, Eldritch Knight)
    const hasMultipleClasses = classesData && Object.keys(classesData).length > 1;
    const isSubclassSpellcasting = !!subclassSpellcasting;
    // Third casters scale with their own class's level, not the character level
    const subclassCasterLevel = subclassSpellcasting?.classLevel ?? level;
    let maxSlots: number[];
    let effectiveCasterLevel = level;

    if (classId === 'innate') {
        // Elven lineage spells only: no spell slots from class (spells cast 1/LR for free)
        maxSlots = [];
        effectiveCasterLevel = level;
    } else if (isSubclassSpellcasting && subclassSpellcasting) {
        effectiveCasterLevel = Math.floor(subclassCasterLevel / subclassSpellcasting.casterLevelDivisor);
        maxSlots = getSlotsForClass(subclassSpellcasting.spellListClass, subclassCasterLevel, subclassSpellcasting.casterLevelDivisor);
    } else if (hasMultipleClasses && allClassesData) {
        effectiveCasterLevel = calculateMulticlassSpellcasterLevel(classesData, allClassesData);
        maxSlots = getSlotsForClass('wizard', effectiveCasterLevel);
    } else {
        maxSlots = getSlotsForClass(classId, level);
    }

    // Multiclassed Warlocks keep Pact Magic slots apart from the shared Spellcasting slots;
    // either kind can cast spells from any of the character's classes (2024 multiclassing).
    const warlockLevel = hasMultipleClasses ? Number(classesData?.warlock || 0) : 0;
    const pact = warlockLevel > 0 ? getPactMagic(warlockLevel) : null;

    // Highest spell level we can prepare/cast (based on actual slots, not caster level formula)
    const maxSpellLevel = Math.max(maxSlots.length, pact?.slotLevel ?? 0);

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
        ? [{ classId: subclassSpellcasting.spellListClass, level: subclassCasterLevel, classInfo: { spellcaster: true, preparedCaster: false, spellcastingAbility: subclassSpellcasting.spellcastingAbility } }]
        : (hasMultipleClasses && allClassesData
            ? getSpellcastingClasses(classesData, allClassesData)
            : [{ classId, level, classInfo: { spellcaster: true, preparedCaster, spellcastingAbility } }]);

    // Get all class IDs that can cast spells (for spell list filtering)
    const availableClassIds = spellcastingClasses.map(sc => sc.classId.toLowerCase());

    // Highest spell level usable for this spell: Warlock spells go up to the Pact Magic slot
    // level, other classes' spells up to the shared slots.
    const withinSpellLevel = (s: { level: number; classes?: string[] }): boolean => {
        if (!pact) return s.level <= maxSpellLevel;
        return (s.classes || []).some(c => {
            const cid = c.toLowerCase();
            if (!availableClassIds.includes(cid)) return false;
            return s.level <= (cid === 'warlock' ? pact.slotLevel : maxSlots.length);
        });
    };

    // Spells known limits for third casters (Arcane Trickster, Eldritch Knight)
    const spellsKnownLimit = isSubclassSpellcasting && subclassSpellcasting
        ? THIRD_CASTER_SPELLS_KNOWN[Math.min(Math.max(0, subclassCasterLevel - 1), 19)] ?? 0
        : 0;
    const cantripsKnownLimit = isSubclassSpellcasting && subclassSpellcasting
        ? getThirdCasterCantrips(subclassSpellcasting.subclassId, subclassCasterLevel)
        : 0;
    
    // For prepared casters in cantrip mode: show only cantrips not yet learned
    // For prepared casters in prepare mode: show spells they can prepare (wizard = spellbook only; others = all)
    // For known casters: only show spells not yet learned
    const safeAllSpells = Array.isArray(allSpells) ? allSpells : [];
    const availableSpells = safeAllSpells.filter(s => {
        if (s.legacy && !safeMySpells.find(ms => ms.id === s.id)) return false;
        // Check if spell is available to any of the character's spellcasting classes
        const spellClasses = s.classes || [];
        const spellAvailableToClass = spellClasses.some((spellClass: string) => 
            availableClassIds.includes(spellClass.toLowerCase())
        );
        if (!spellAvailableToClass) return false;
        
        // Check spell level availability based on actual spell slots
        if (s.level === 0 || withinSpellLevel(s)) {
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
        if (!withinSpellLevel(s)) return false;
        return !effectiveSpellbook.includes(s.id);
    });

    // Filter the learn/prepare picker (search covers name, school, text, casting time, range, components and duration)
    const filteredSpells = availableSpells.filter(spell => spellMatches(spell, spell, pickerFilters));

    // Elven lineage spells (2024 PHB): granted at character levels 1, 3, 5. Always prepared.
    const lineageKey = (elvenLineage || '').toLowerCase().replace(/\s+/g, '_');
    const lineageSpellsConfigRaw = speciesSpells ?? (lineageKey ? ELVEN_LINEAGE_SPELLS[lineageKey] : null);
    const lineageSpellsConfig = Array.isArray(lineageSpellsConfigRaw) ? lineageSpellsConfigRaw : [];
    const lineageSpellsForLevel = lineageSpellsConfig
        .filter(entry => level >= entry.level)
        .map(entry => ({ ...entry, spell: safeAllSpells.find(s => s.id === entry.spellId) }))
        .filter((x): x is typeof x & { spell: Spell } => !!x.spell);

    // Subclass bonus spells (e.g. Gloom Stalker): granted at class levels 3, 5, 9, 13, 17. Always prepared.
    const subclassKey = (subclassIdProp || '').toLowerCase().replace(/\s+/g, '_');
    const subclassClassLvl = subclassClassLevel ?? level;
    const subclassSpellsConfigRaw = (subclassSpells && subclassSpells.length > 0) ? subclassSpells : (subclassKey ? SUBCLASS_BONUS_SPELLS[subclassKey] : null);
    const subclassSpellsConfig = Array.isArray(subclassSpellsConfigRaw) ? subclassSpellsConfigRaw : [];
    const subclassSpellsForLevel = [
        ...subclassSpellsConfig
            .filter(entry => subclassClassLvl >= entry.level)
            .map(entry => ({ ...entry, bonusLabel: 'Subclass' })),
        ...classFeatureSpells.map(spellId => ({ level: 0, spellId, bonusLabel: 'Class feature' })),
    ]
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
            let availableAtLevel = safeAllSpells.filter(s => 
                (!s.legacy || !!safeMySpells.find(ms => ms.id === s.id)) &&
                (s.classes || []).some((spellClass: string) => availableClassIds.includes(spellClass.toLowerCase())) &&
                s.level === lvl &&
                withinSpellLevel(s)
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
            for (const { spell, bonusLabel } of subclassSpellsForLevel) {
                if (spell.level === lvl && !spellsAtLevel.some(s => s.id === spell.id)) {
                    spellsAtLevel.push({
                        id: spell.id,
                        name: spell.name,
                        level: spell.level,
                        school: spell.school,
                        prepared: true,
                        isKnown: true,
                        isElvenLineage: false,
                        isSubclassBonus: true,
                        bonusLabel
                    });
                }
            }
        } else if (lvl === 0) {
            // Cantrips: learned spells + elven lineage cantrip. Name/school are
            // pulled live from the reference spell list (falling back to the
            // stored copy if it was removed) so admin edits show up here too.
            spellsAtLevel = safeMySpells.filter(ms => ms.level === 0).map(ms => {
                const live = safeAllSpells.find(s => s.id === ms.id);
                return {
                    id: ms.id,
                    name: live?.name ?? ms.name,
                    level: 0,
                    school: live?.school ?? ms.school,
                    prepared: true,
                    isKnown: true,
                    isElvenLineage: false
                };
            });
            // Species/lineage cantrips and subclass cantrips (e.g. Starry Wisp, Elementalism) are always known
            for (const [entries, fromLineage] of [[lineageSpellsForLevel, true], [subclassSpellsForLevel, false]] as const) {
                for (const entry of entries) {
                    const { spell } = entry;
                    const bonusLabel = 'bonusLabel' in entry ? entry.bonusLabel : undefined;
                    if (spell.level === 0 && !spellsAtLevel.some(s => s.id === spell.id)) {
                        spellsAtLevel.push({
                            id: spell.id,
                            name: spell.name,
                            level: 0,
                            school: spell.school,
                            prepared: true,
                            isKnown: true,
                            isElvenLineage: fromLineage,
                            isSubclassBonus: !fromLineage,
                            bonusLabel
                        });
                    }
                }
            }
        } else {
            // Known casters (non-cantrip): only show learned spells. Name/school
            // come live from the reference spell list so admin edits reflect here.
            spellsAtLevel = safeMySpells.filter(ms => ms.level === lvl).map(ms => {
                const live = safeAllSpells.find(s => s.id === ms.id);
                return {
                    id: ms.id,
                    name: live?.name ?? ms.name,
                    level: ms.level,
                    school: live?.school ?? ms.school,
                    prepared: ms.prepared,
                    isKnown: true,
                    isElvenLineage: false
                };
            });
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
            for (const { spell, bonusLabel } of subclassSpellsForLevel) {
                if (spell.level === lvl && !spellsAtLevel.some(s => s.id === spell.id)) {
                    spellsAtLevel.push({
                        id: spell.id,
                        name: spell.name,
                        level: spell.level,
                        school: spell.school,
                        prepared: true,
                        isKnown: true,
                        isElvenLineage: false,
                        isSubclassBonus: true,
                        bonusLabel
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

    // Spell list filters: hide non-matching spells, and empty levels while a filter is on
    const spellById = new Map(safeAllSpells.map(sp => [sp.id, sp]));
    const listFiltersActive = hasActiveSpellFilters(listFilters);
    const listTotal = spellsByLevel.reduce((n, g) => n + g.spells.length, 0);
    const visibleGroups = spellsByLevel
        .map(group => ({ ...group, spells: group.spells.filter(sp => spellMatches(sp, spellById.get(sp.id), listFilters)) }))
        .filter(group => !listFiltersActive || group.spells.length > 0);
    const listShown = visibleGroups.reduce((n, g) => n + g.spells.length, 0);

    // Spells castable right now: cantrips, prepared spells (known spells for known casters) and granted
    // spells, plus Magic Initiate's. Reported to the sheet so the Actions card can list them.
    const preparesSpells = preparedCaster || spellcastingClasses.some(sc => sc.classInfo.preparedCaster) || isInnateOnly;
    const castableKey = JSON.stringify({
        spells: [
            ...spellsByLevel.flatMap(group => group.spells
                .filter((sp: any) => sp.level === 0 || (preparesSpells ? sp.prepared : sp.isKnown))
                .map((sp: any) => ({
                    id: sp.id,
                    ...(sp.isElvenLineage ? { grantedBy: 'Species' } : sp.isSubclassBonus ? { grantedBy: sp.bonusLabel || 'Subclass' } : {}),
                }))),
            ...[...(magicInitiate?.cantrips || []), ...(magicInitiate?.spell1 ? [magicInitiate.spell1] : [])]
                .map(id => ({ id, grantedBy: 'Magic Initiate' })),
        ],
        maxSlots,
        slotsUsed,
        pact: pact ? { ...pact, used: pactSlotsUsed } : null,
    } satisfies CastableSummary);
    useEffect(() => {
        onCastableChange?.(JSON.parse(castableKey));
        // Report once per distinct change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [castableKey]);

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
                            <button className="btn" onClick={() => setMagicInitiateModalOpen(true)} style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
                                Set up Magic Initiate
                            </button>
                        ) : (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                        Ability: {(spellcastingAbility || 'int').toUpperCase()}
                                    </span>
                                    {mi?.spell1 && onMagicInitiateSlotChange && (
                                        <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem' }}>1st-level slot:</span>
                                            <div
                                                onClick={() => {
                                                    const current = magicInitiateSpell1Used ?? 1;
                                                    const next = current === 1 ? 0 : 1;
                                                    onMagicInitiateSlotChange(next);
                                                }}
                                                style={{
                                                    width: '12px', height: '12px', borderRadius: '50%',
                                                    border: '1px solid var(--primary)',
                                                    backgroundColor: (magicInitiateSpell1Used ?? 1) === 0 ? 'var(--primary)' : 'transparent',
                                                    cursor: 'pointer'
                                                }}
                                                title="Toggle Magic Initiate 1st-level spell slot"
                                            />
                                        </div>
                                    )}
                                </div>
                                <button className="btn btn-secondary" onClick={() => setMagicInitiateModalOpen(true)} style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>
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
                                    <button
                                        type="button"
                                        className="btn btn-ghost"
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
                    {isInnateOnly ? 'Species Spells' : preparedCaster ? 'Spellbook (Prepare Spells)' : 'Spellbook'}
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
                    {!preparedCaster && !isInnateOnly && (
                        <button
                            className="btn"
                            style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                            onClick={() => setIsAdding(true)}
                        >
                            + Learn Spell
                        </button>
                    )}
                    {preparedCaster && !isInnateOnly && (
                        <>
                            <button
                                className="btn"
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
                                    className="btn btn-secondary"
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
                                className="btn"
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
                <ConfirmDialog
                    title="Remove spell?"
                    confirmLabel="Remove"
                    danger
                    onConfirm={confirmDeleteSpell}
                    onCancel={cancelDeleteSpell}
                >
                    <strong style={{ color: 'var(--text)' }}>{safeMySpells.find(s => s.id === spellToDelete)?.name ?? 'This spell'}</strong>{' '}will be removed from your known spells.
                </ConfirmDialog>
            )}

            {spellbookSpellToRemove && (
                <ConfirmDialog
                    title="Remove from spellbook?"
                    confirmLabel="Remove"
                    danger
                    onConfirm={() => {
                        removeFromSpellbook(spellbookSpellToRemove.id);
                        setSpellbookSpellToRemove(null);
                    }}
                    onCancel={() => setSpellbookSpellToRemove(null)}
                >
                    <strong style={{ color: 'var(--text)' }}>{spellbookSpellToRemove.name}</strong>{' '}will be removed from your spellbook, and unprepared if it is currently prepared.
                </ConfirmDialog>
            )}

            {isAdding && (
                <Modal onClose={() => {
                    setIsAdding(false);
                    setIsCantripMode(false);
                    setSearchTerm('');
                    setPickerFilters(EMPTY_SPELL_FILTERS);
                }} ariaLabel={preparedCaster && isCantripMode ? 'Learn Cantrip' : preparedCaster ? 'Prepare Spell' : 'Learn New Spell'} contentStyle={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
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
                    <div style={{ marginTop: 'var(--space-4)' }}>
                        <SpellFilterBar
                            filters={pickerFilters}
                            onChange={setPickerFilters}
                            levels={Array.from(new Set(availableSpells.map(sp => sp.level))).sort((a, b) => a - b)}
                            schools={schoolsOf(availableSpells)}
                            showPrepared={false}
                            shown={filteredSpells.length}
                            total={availableSpells.length}
                            searchPlaceholder="Search by name, school, text, range…"
                            autoFocus
                        />
                    </div>
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

                            const runPickerAction = () => {
                                if (canPrepare) {
                                    shouldLearn ? learnSpell(spell) : prepareSpellDirectly(spell);
                                } else if (atSpellsLimit) {
                                    toast.error(spell.level === 0
                                        ? `You can only know ${cantripsKnownLimit} cantrips. Unlearn a cantrip first.`
                                        : `You can only know ${spellsKnownLimit} spells. Unlearn a spell first.`);
                                } else if (!shouldLearn && spell.level > 0) {
                                    toast.error(`You have reached your prepared spells limit (${preparedSpellsLimit}). Unprepare a spell first to prepare a new one.`);
                                }
                            };

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
                                    // Mouse shortcut; the row's Learn/Prepare button is the accessible control
                                    onClick={runPickerAction}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ fontWeight: 'bold' }}>{spell.name}</div>
                                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                            <button
                                                type="button"
                                                className={`btn btn-sm ${isPrepared && !shouldLearn ? '' : 'btn-secondary'}`}
                                                aria-disabled={!canPrepare || undefined}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    runPickerAction();
                                                }}
                                            >
                                                {shouldLearn ? (isKnown ? 'Known' : 'Learn') : (isPrepared ? 'Prepared' : 'Prepare')}
                                            </button>
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSpellDetailsModal({ isOpen: true, spell });
                                                }}
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
                            <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No spells match these filters.</p>
                        )}
                        {availableSpells.length === 0 && (
                            <p>No spells available to learn at this level.</p>
                        )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                        <button className="btn btn-secondary" onClick={() => {
                            setIsAdding(false);
                            setIsCantripMode(false);
                            setSearchTerm('');
                            setPickerFilters(EMPTY_SPELL_FILTERS);
                        }}>Close</button>
                    </div>
                </Modal>
            )}

            {isAddingToSpellbook && (
                <Modal onClose={() => setIsAddingToSpellbook(false)} ariaLabel="Add to Spellbook" contentStyle={{ maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
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
                                            className="btn btn-secondary btn-sm"
                                            onClick={(e) => { e.stopPropagation(); setSpellDetailsModal({ isOpen: true, spell }); }}
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
                        className="btn btn-secondary"
                        onClick={() => { setIsAddingToSpellbook(false); setSearchTerm(''); }}
                        style={{ marginTop: '1rem' }}
                    >
                        Close
                    </button>
                </Modal>
            )}

            {spellsByLevel.length === 0 && (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.875rem' }}>
                    {preparedCaster ? 'No spells available at your level.' : 'No spells known.'}
                </p>
            )}

            {pact && (
                <div data-testid="pact-magic-slots" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem', padding: '0.5rem 0.75rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.875rem' }}>
                    <strong>Pact Magic</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        {pact.count} level {pact.slotLevel} slot{pact.count === 1 ? '' : 's'} (Warlock {warlockLevel}) · regain on a Short or Long Rest · usable for any of your spells
                    </span>
                    <div style={{ marginLeft: 'auto' }}>
                        <SlotPips
                            label="Pact Magic slots"
                            total={pact.count}
                            used={pactSlotsUsed}
                            onChange={handlePactSlotChange}
                            testIdPrefix="pact-slot"
                        />
                    </div>
                </div>
            )}

            {listTotal > 0 && (
                <SpellFilterBar
                    filters={listFilters}
                    onChange={setListFilters}
                    levels={spellsByLevel.filter(g => g.spells.length > 0).map(g => g.level)}
                    schools={schoolsOf(spellsByLevel.flatMap(g => g.spells))}
                    shown={listShown}
                    total={listTotal}
                />
            )}
            {listFiltersActive && visibleGroups.length === 0 && (
                <p className="empty-note" style={{ marginBottom: 'var(--space-4)' }}>
                    No spells match these filters.{' '}
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setListFilters(EMPTY_SPELL_FILTERS)}>Clear filters</button>
                </p>
            )}

            {visibleGroups.map(group => {
                // Filtering shows matches even inside collapsed levels
                const isExpanded = listFiltersActive || expandedLevels[group.level] !== false; // Default to true
                const groupListId = `spell-level-${group.level}`;
                return (
                <div key={group.level} style={{ marginBottom: '1rem' }}>
                    <div
                        className="spell-level-row"
                        style={{ borderBottom: '1px solid var(--border)', paddingBottom: 'var(--space-1)', marginBottom: 'var(--space-2)' }}
                    >
                        <button
                            type="button"
                            className="spell-level-toggle"
                            aria-expanded={isExpanded}
                            aria-controls={groupListId}
                            onClick={() => setExpandedLevels({ ...expandedLevels, [group.level]: !isExpanded })}
                        >
                            <span aria-hidden="true">{isExpanded ? '▼' : '▶'}</span>
                            <span>{group.level === 0 ? 'Cantrips' : `Level ${group.level}`}</span>
                            <span className="spell-level-count">({group.spells.length})</span>
                        </button>

                        {/* Spell Slots UI */}
                        {group.level > 0 && group.slots > 0 && (
                            <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }} aria-hidden="true">Slots:</span>
                                <SlotPips
                                    label={`Level ${group.level} spell slots`}
                                    total={group.slots}
                                    used={slotsUsed[group.level] || 0}
                                    onChange={(used) => handleSlotChange(group.level, used)}
                                />
                            </div>
                        )}
                    </div>

                    {isExpanded && (
                        <div className="spell-level-grid" id={groupListId}>
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
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: '0.35rem' }}>(Species)</span>
                                            )}
                                            {isSubclassBonusSpell && (
                                                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 'normal', marginLeft: '0.35rem' }}>({(spell as any).bonusLabel || 'Subclass'})</span>
                                            )}
                                        </div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{spell.school}</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        {fullSpell && (
                                            <button
                                                className="btn btn-secondary btn-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSpellDetailsModal({ isOpen: true, spell: fullSpell });
                                                }}
                                                title="View spell details"
                                            >
                                                View
                                            </button>
                                        )}
                                        {spell.level > 0 && !isElvenLineageSpell && !isSubclassBonusSpell && (
                                            <button
                                                className={`btn ${spellPrepared ? '' : 'btn-secondary'} btn-sm`}
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
                                                className="btn btn-ghost btn-sm btn-text-danger"
                                                style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1 }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    removeSpell(spell.id);
                                                }}
                                                title="Remove Spell"
                                                aria-label={`Remove ${spell.name}`}
                                            >
                                                &times;
                                            </button>
                                        )}
                                        {isWizardSpellbook && spell.level > 0 && !isElvenLineageSpell && !isSubclassBonusSpell && (
                                            <button
                                                type="button"
                                                className="btn btn-ghost btn-sm btn-text-danger"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setSpellbookSpellToRemove({ id: spell.id, name: spell.name });
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
                        <button className="btn btn-secondary btn-sm" onClick={() => setMagicInitiateModalOpen(true)}>
                            Change spells
                        </button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                            Always prepared; don&apos;t count toward your prepared spell limit.
                        </p>
                        {magicInitiate.spell1 && onMagicInitiateSlotChange && (
                            <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem' }}>1st-level slot:</span>
                                <div
                                    onClick={() => {
                                        const current = magicInitiateSpell1Used ?? 1;
                                        const next = current === 1 ? 0 : 1;
                                        onMagicInitiateSlotChange(next);
                                    }}
                                    style={{
                                        width: '12px', height: '12px', borderRadius: '50%',
                                        border: '1px solid var(--primary)',
                                        backgroundColor: (magicInitiateSpell1Used ?? 1) === 0 ? 'var(--primary)' : 'transparent',
                                        cursor: 'pointer'
                                    }}
                                    title="Toggle Magic Initiate 1st-level spell slot"
                                />
                            </div>
                        )}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {[...(magicInitiate.cantrips || []), ...(magicInitiate.spell1 ? [magicInitiate.spell1] : [])].map(spellId => {
                            const s = safeAllSpells.find(sp => sp.id === spellId);
                            if (!s) return null;
                            return (
                                <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.35rem 0.5rem', backgroundColor: 'var(--surface)', borderRadius: '4px' }}>
                                    <span style={{ fontWeight: 'bold', fontSize: '0.875rem' }}>{s.name}</span>
                                    <button type="button" className="btn btn-ghost" style={{ fontSize: '0.75rem' }} onClick={() => setSpellDetailsModal({ isOpen: true, spell: s })}>View</button>
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
