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

    for (const [classId, level] of Object.entries(classes)) {
        const classInfo = allClasses.find(c => c.id.toLowerCase() === classId.toLowerCase());
        if (classInfo && classInfo.spellcaster && classId.toLowerCase() !== 'warlock') {
            spellcastingClasses.push({ classId, level, classInfo });
        }
    }

    return spellcastingClasses;
}

/**
 * Calculate prepared spells limit for a specific class in a multiclassed character
 */
export function calculatePreparedSpellsLimitForClass(
    classId: string,
    classLevel: number,
    spellcastingAbility: string,
    abilityScores: { [key: string]: number }
): number {
    const abilityScore = abilityScores[spellcastingAbility] || 10;
    const modifier = Math.floor((abilityScore - 10) / 2);
    const limit = classLevel + modifier;
    return Math.max(1, limit); // Minimum of 1 prepared spell
}

