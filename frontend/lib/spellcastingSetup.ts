import { SUBCLASS_BONUS_SPELLS } from './wizardReference';

export interface SpellcastingClass {
    id: string;
    name: string;
    level: number;
    classInfo: { spellcaster?: boolean; preparedCaster?: boolean; spellcastingAbility?: string; [key: string]: any };
}

export interface SubclassSpellcasting {
    subclassId: string;
    spellListClass: string;
    spellcastingAbility: string;
    casterLevelDivisor: number;
    classLevel?: number;
}

export interface SpellcastingSetup {
    /** Spellcasting classes, highest level first. */
    spellcastingClasses: SpellcastingClass[];
    /** The class whose list and slots drive the spell manager (may be virtual: a subclass, species spells or Magic Initiate). */
    primary: SpellcastingClass;
    ability: string;
    subclassSpellcasting?: SubclassSpellcasting;
    /** Always-prepared subclass spells the character has reached. */
    grantedSubclassSpells: { level: number; spellId: string }[];
}

interface SetupInput {
    characterClasses: { id: string; name?: string; level: number }[];
    gameClasses: any[];
    characterSubclasses: { classId: string; classLevel: number; subclass: any }[];
    level: number;
    hasSpeciesSpells: boolean;
    hasMagicInitiateFeat: boolean;
    magicInitiateAbility?: string;
}

const SUBCLASS_CASTERS = ['arcane_trickster', 'eldritch_knight'];

/** Eldritch Knight / Arcane Trickster: spellcasting from a subclass, keyed to that class's level. */
export function findCasterSubclass(characterSubclasses: SetupInput['characterSubclasses']) {
    return characterSubclasses.find((s) => s.subclass?.spellcasting && s.classLevel >= 3 && SUBCLASS_CASTERS.includes(s.subclass.id));
}

/**
 * Who casts, with what ability, and which list — from class spellcasting, else a caster
 * subclass, else species spells, else Magic Initiate. Null when the character has no spells.
 */
export function getSpellcastingSetup(input: SetupInput): SpellcastingSetup | null {
    const { characterClasses, gameClasses, characterSubclasses, level, hasSpeciesSpells, hasMagicInitiateFeat, magicInitiateAbility } = input;

    const spellcastingClasses: SpellcastingClass[] = characterClasses
        .map((c) => ({
            ...c,
            name: c.name ?? c.id,
            classInfo: (gameClasses || []).find((gc: any) => (gc.id || '').toLowerCase() === (c.id || '').toLowerCase()),
        }))
        // A multiclassed Warlock keeps its spells; SpellManager shows its Pact Magic slots separately.
        .filter((c) => c.classInfo?.spellcaster)
        .sort((a, b) => b.level - a.level);

    let primary: SpellcastingClass | undefined = spellcastingClasses[0];
    let ability = primary?.classInfo?.spellcastingAbility || 'int';
    let subclassSpellcasting: SubclassSpellcasting | undefined;
    const casterSubclass = findCasterSubclass(characterSubclasses);

    if (!primary && casterSubclass) {
        const { subclass, classLevel } = casterSubclass;
        subclassSpellcasting = {
            subclassId: subclass.id,
            spellListClass: subclass.spellcasting.spellListClass,
            spellcastingAbility: subclass.spellcasting.spellcastingAbility,
            casterLevelDivisor: subclass.spellcasting.casterLevelDivisor,
            classLevel,
        };
        primary = {
            id: subclass.spellcasting.spellListClass,
            name: subclass.name,
            level: classLevel,
            classInfo: { spellcaster: true, preparedCaster: false, spellcastingAbility: subclass.spellcasting.spellcastingAbility },
        };
        ability = subclass.spellcasting.spellcastingAbility;
    } else if (!primary && hasSpeciesSpells) {
        primary = { id: 'innate', name: 'Species Spells', level, classInfo: { spellcaster: true, preparedCaster: false, spellcastingAbility: 'cha' } };
        ability = 'cha';
    } else if (!primary && hasMagicInitiateFeat) {
        ability = magicInitiateAbility || 'int';
        primary = { id: 'magic_initiate', name: 'Magic Initiate', level, classInfo: { spellcaster: true, preparedCaster: false, spellcastingAbility: ability } };
    }
    if (!primary) return null;

    // Each subclass's always-prepared spells, gated by that class's own level
    const grantedSubclassSpells = characterSubclasses.flatMap(({ subclass, classLevel }) => {
        const entries: { level: number; spellId: string }[] = subclass?.spells?.length
            ? subclass.spells
            : (SUBCLASS_BONUS_SPELLS[String(subclass?.id).toLowerCase().replace(/\s+/g, '_')] || []);
        return entries.filter((e) => classLevel >= e.level);
    });

    return { spellcastingClasses, primary, ability, subclassSpellcasting, grantedSubclassSpells };
}
