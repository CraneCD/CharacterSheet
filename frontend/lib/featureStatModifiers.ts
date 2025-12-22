/**
 * Feature Stat Modifiers
 * Maps class features to stat modifications they provide
 */

export interface StatModifier {
    type: 'speed' | 'ac' | 'abilityScore' | 'savingThrow' | 'skill';
    value: number | { [key: string]: number }; // For ability scores, can be an object
    condition?: string; // Optional condition (e.g., "not wearing heavy armor")
    description?: string;
}

export interface FeatureStatModifiers {
    [featureName: string]: StatModifier[];
}

/**
 * Mapping of feature names to their stat modifications
 */
export const featureStatModifiers: FeatureStatModifiers = {
    // Monk Features
    'Unarmored Movement': [
        {
            type: 'speed',
            value: 10,
            condition: 'not wearing armor or wielding a shield',
            description: 'Speed increases by 10 feet'
        }
    ],
    'Unarmored Movement Improvement': [
        // This doesn't modify speed further, but adds movement capabilities
        // Speed bonus is cumulative with base Unarmored Movement
    ],
    'Unarmored Defense (Monk)': [
        {
            type: 'ac',
            value: 0, // AC calculation changes to 10 + Dex + Wis (handled in calculation)
            condition: 'not wearing armor or wielding a shield',
            description: 'AC = 10 + Dexterity modifier + Wisdom modifier'
        }
    ],

    // Barbarian Features
    'Fast Movement': [
        {
            type: 'speed',
            value: 10,
            condition: 'not wearing heavy armor',
            description: 'Speed increases by 10 feet'
        }
    ],
    'Unarmored Defense (Barbarian)': [
        {
            type: 'ac',
            value: 0, // AC calculation changes to 10 + Dex + Con (handled in calculation)
            condition: 'not wearing armor',
            description: 'AC = 10 + Dexterity modifier + Constitution modifier'
        }
    ],
    'Primal Champion': [
        {
            type: 'abilityScore',
            value: { str: 4, con: 4 },
            description: 'Strength and Constitution scores increase by 4 (max 24)'
        }
    ],

    // Rogue Features
    'Slippery Mind': [
        {
            type: 'savingThrow',
            value: 0, // Grants proficiency in Wisdom saving throws
            description: 'Gain proficiency in Wisdom saving throws'
        }
    ],

    // Paladin Features
    'Aura Improvements': [
        {
            type: 'savingThrow',
            value: 0, // Aura range increases (not a direct stat mod, but affects gameplay)
            description: 'Aura range increases to 30 feet'
        }
    ],
};

/**
 * Calculate speed bonus from features
 */
export function calculateSpeedBonusFromFeatures(
    features: Array<{ name: string; source?: string }>,
    classId: string,
    level: number
): number {
    let bonus = 0;

    // Check for Unarmored Movement (Monk)
    const hasUnarmoredMovement = features.some(f => f.name === 'Unarmored Movement');
    if (hasUnarmoredMovement && classId === 'monk') {
        bonus += 10;
        // Additional speed increases at higher levels
        if (level >= 6) bonus += 5; // +15 total at level 6
        if (level >= 10) bonus += 5; // +20 total at level 10
        if (level >= 14) bonus += 5; // +25 total at level 14
        if (level >= 18) bonus += 5; // +30 total at level 18
    }

    // Check for Fast Movement (Barbarian)
    const hasFastMovement = features.some(f => f.name === 'Fast Movement');
    if (hasFastMovement && classId === 'barbarian') {
        bonus += 10;
    }

    return bonus;
}

/**
 * Get AC calculation method from features
 */
export function getACCalculationFromFeatures(
    features: Array<{ name: string; source?: string }>,
    classId: string
): 'standard' | 'unarmored-monk' | 'unarmored-barbarian' {
    const hasUnarmoredDefense = features.some(f => f.name === 'Unarmored Defense');
    
    if (hasUnarmoredDefense) {
        if (classId === 'monk') {
            return 'unarmored-monk';
        } else if (classId === 'barbarian') {
            return 'unarmored-barbarian';
        }
    }
    
    return 'standard';
}

/**
 * Get ability score increases from features
 */
export function getAbilityScoreIncreasesFromFeatures(
    features: Array<{ name: string; source?: string }>
): { [ability: string]: number } {
    const increases: { [ability: string]: number } = {};

    // Check for Primal Champion (Barbarian level 20)
    const hasPrimalChampion = features.some(f => f.name === 'Primal Champion');
    if (hasPrimalChampion) {
        increases.str = (increases.str || 0) + 4;
        increases.con = (increases.con || 0) + 4;
    }

    return increases;
}

/**
 * Get saving throw proficiencies from features
 */
export function getSavingThrowProficienciesFromFeatures(
    features: Array<{ name: string; source?: string }>,
    baseProficiencies: string[]
): string[] {
    const proficiencies = [...baseProficiencies];

    // Check for Slippery Mind (Rogue level 15)
    const hasSlipperyMind = features.some(f => f.name === 'Slippery Mind');
    if (hasSlipperyMind && !proficiencies.includes('wis')) {
        proficiencies.push('wis');
    }

    // Check for Diamond Soul (Monk level 14)
    const hasDiamondSoul = features.some(f => f.name === 'Diamond Soul');
    if (hasDiamondSoul) {
        // Diamond Soul grants proficiency in all saving throws
        const allSaves = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        allSaves.forEach(save => {
            if (!proficiencies.includes(save)) {
                proficiencies.push(save);
            }
        });
    }

    return proficiencies;
}

