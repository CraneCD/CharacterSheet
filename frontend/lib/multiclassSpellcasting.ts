import { ClassInfo } from '@/lib/types';

/**
 * Calculate the effective spellcaster level for multiclassed characters
 * According to D&D 5e multiclassing rules:
 * - Full casters (Bard, Cleric, Druid, Sorcerer, Wizard): Count all levels
 * - Half casters (Paladin, Ranger): Count half (rounded down)
 * - Third casters (Eldritch Knight, Arcane Trickster): Count one-third (rounded down)
 * - Warlock: Uses Pact Magic, doesn't combine with Spellcasting
 */
export function calculateMulticlassSpellcasterLevel(
    classes: { [classId: string]: number },
    allClasses: ClassInfo[]
): number {
    let totalCasterLevel = 0;

    for (const [classId, level] of Object.entries(classes)) {
        const classInfo = allClasses.find(c => c.id.toLowerCase() === classId.toLowerCase());
        if (!classInfo || !classInfo.spellcaster) continue;

        // Warlock uses Pact Magic, not Spellcasting, so it doesn't combine
        if (classId.toLowerCase() === 'warlock') continue;

        // Full casters
        if (['bard', 'cleric', 'druid', 'sorcerer', 'wizard'].includes(classId.toLowerCase())) {
            totalCasterLevel += level;
        }
        // Half casters
        else if (['paladin', 'ranger'].includes(classId.toLowerCase())) {
            totalCasterLevel += Math.floor(level / 2);
        }
        // Third casters (Eldritch Knight, Arcane Trickster)
        // Note: This would require checking subclasses, which we'll handle separately
        // For now, we'll assume base classes only
    }

    return Math.min(totalCasterLevel, 20);
}

/**
 * Get all spellcasting classes from a multiclassed character
 */
export function getSpellcastingClasses(
    classes: { [classId: string]: number },
    allClasses: ClassInfo[]
): Array<{ classId: string; level: number; classInfo: ClassInfo }> {
    const spellcastingClasses: Array<{ classId: string; level: number; classInfo: ClassInfo }> = [];
    const safeClasses = classes && typeof classes === 'object' && !Array.isArray(classes) ? classes : {};
    const safeAllClasses = Array.isArray(allClasses) ? allClasses : [];

    for (const [classId, level] of Object.entries(safeClasses)) {
        const classInfo = safeAllClasses.find(c => c?.id?.toLowerCase() === classId?.toLowerCase());
        if (classInfo && classInfo.spellcaster && classId.toLowerCase() !== 'warlock') {
            spellcastingClasses.push({ classId, level, classInfo });
        }
    }

    return spellcastingClasses;
}

/** 2024 PHB: fixed prepared spells by level for Cleric and Druid (does NOT depend on ability modifier). */
const CLERIC_DRUID_PREPARED_SPELLS_BY_LEVEL: number[] = [
    4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 17, 18, 18, 19, 20, 21, 22
];

/** 2024 PHB: fixed prepared spells by level for Paladin and Ranger (does NOT depend on ability modifier). */
const PALADIN_RANGER_PREPARED_SPELLS_BY_LEVEL: number[] = [
    2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 10, 10, 11, 11, 12, 12, 14, 14, 15, 15
];

/** 2024 PHB: fixed prepared spells by level for Wizard (does NOT depend on ability modifier). */
const WIZARD_PREPARED_SPELLS_BY_LEVEL: number[] = [
    4, 5, 6, 7, 9, 10, 11, 12, 14, 15, 16, 16, 17, 18, 19, 21, 22, 23, 24, 25
];

/**
 * Calculate prepared spells limit for a specific class.
 * All classes use fixed tables or level-only; ability scores do NOT affect prepared spell count.
 */
export function calculatePreparedSpellsLimitForClass(
    classId: string,
    classLevel: number,
    _spellcastingAbility: string,
    _abilityScores: { [key: string]: number }
): number {
    const cid = classId.toLowerCase();
    const idx = Math.min(Math.max(0, classLevel - 1), 19);
    if (cid === 'cleric' || cid === 'druid') {
        return CLERIC_DRUID_PREPARED_SPELLS_BY_LEVEL[idx] ?? 4;
    }
    if (cid === 'paladin' || cid === 'ranger') {
        return PALADIN_RANGER_PREPARED_SPELLS_BY_LEVEL[idx] ?? 2;
    }
    if (cid === 'wizard') {
        return WIZARD_PREPARED_SPELLS_BY_LEVEL[idx] ?? 4;
    }
    // Fallback for other prepared casters: use level only (no ability modifier)
    return Math.max(1, classLevel);
}

