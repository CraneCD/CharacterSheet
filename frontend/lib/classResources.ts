import { ClassResources, ClassResource } from './types';

/**
 * Calculate class resources based on class ID, level, and optionally subclass.
 */
export function calculateClassResources(
    classId: string,
    level: number,
    abilityScores?: { [key: string]: number },
    subclassId?: string
): ClassResources {
    const resources: ClassResources = {};

    switch (classId.toLowerCase()) {
        case 'sorcerer':
            // Sorcery Points = Sorcerer Level
            resources['Sorcery Points'] = {
                name: 'Sorcery Points',
                current: level,
                max: level,
                resetType: 'long',
                description: 'You can use sorcery points to create spell slots or use Metamagic.'
            };
            break;

        case 'monk':
            // Ki Points = Monk Level
            resources['Ki Points'] = {
                name: 'Ki Points',
                current: level,
                max: level,
                resetType: 'short',
                description: 'You can spend ki points to fuel various ki features.'
            };
            break;

        case 'fighter':
            // Action Surge: 1 use (2 uses at level 17+)
            resources['Action Surge'] = {
                name: 'Action Surge',
                current: level >= 17 ? 2 : 1,
                max: level >= 17 ? 2 : 1,
                resetType: 'short',
                description: 'On your turn, you can take one additional action.'
            };
            // Second Wind: 1 use per short rest
            resources['Second Wind'] = {
                name: 'Second Wind',
                current: 1,
                max: 1,
                resetType: 'short',
                description: 'Use a bonus action to regain 1d10 + fighter level hit points.'
            };
            // Gunslinger (Fighter subclass): Grit Points from Adept Marksman (level 3+)
            if (subclassId === 'gunslinger' && level >= 3) {
                const gritMax = abilityScores?.wis != null
                    ? Math.max(1, Math.floor((abilityScores.wis - 10) / 2))
                    : 1;
                resources['Grit Points'] = {
                    name: 'Grit Points',
                    current: gritMax,
                    max: gritMax,
                    resetType: 'short',
                    description: 'You spend grit to perform trick shots with firearms. Regain grit on a short rest, when you score a critical hit with a firearm, or when you reduce a creature to 0 HP with a firearm attack.'
                };
            }
            break;

        case 'barbarian':
            // Rage: 2 uses (increases with level)
            let rageUses = 2;
            if (level >= 3) rageUses = 3;
            if (level >= 6) rageUses = 4;
            if (level >= 12) rageUses = 5;
            if (level >= 17) rageUses = 6;
            if (level >= 20) rageUses = 999; // Unlimited at level 20
            
            resources['Rage'] = {
                name: 'Rage',
                current: rageUses === 999 ? 999 : rageUses,
                max: rageUses === 999 ? 999 : rageUses,
                resetType: 'long',
                description: 'Enter a rage as a bonus action. Gain advantage on Strength checks and saves, bonus damage, and resistance to bludgeoning, piercing, and slashing damage.'
            };
            break;

        case 'cleric':
            // Channel Divinity: 1 use (2 uses at level 6, 3 uses at level 18)
            let channelUses = 1;
            if (level >= 6) channelUses = 2;
            if (level >= 18) channelUses = 3;
            
            resources['Channel Divinity'] = {
                name: 'Channel Divinity',
                current: channelUses,
                max: channelUses,
                resetType: 'short',
                description: 'Channel divine energy to fuel magical effects. You start with Turn Undead and an effect determined by your domain.'
            };
            break;

        case 'paladin':
            // Channel Divinity: 1 use (2 uses at level 6)
            resources['Channel Divinity'] = {
                name: 'Channel Divinity',
                current: level >= 6 ? 2 : 1,
                max: level >= 6 ? 2 : 1,
                resetType: 'short',
                description: 'Channel divine energy to fuel magical effects.'
            };
            // Lay on Hands: Level × 5 HP pool
            resources['Lay on Hands'] = {
                name: 'Lay on Hands',
                current: level * 5,
                max: level * 5,
                resetType: 'long',
                description: `Pool of healing power. Restore a total of ${level * 5} hit points.`
            };
            break;

        case 'bard':
            // Bardic Inspiration: Charisma modifier uses (minimum 1)
            const chaMod = abilityScores?.cha ? Math.max(1, Math.floor((abilityScores.cha - 10) / 2)) : 1;
            resources['Bardic Inspiration'] = {
                name: 'Bardic Inspiration',
                current: chaMod,
                max: chaMod,
                resetType: level >= 5 ? 'short' : 'long',
                description: 'Inspire others through stirring words or music. Target gains a Bardic Inspiration die.'
            };
            break;

        case 'druid':
            // Wild Shape: 2 uses
            resources['Wild Shape'] = {
                name: 'Wild Shape',
                current: 2,
                max: 2,
                resetType: 'short',
                description: 'Use your action to magically assume the shape of a beast you have seen before.'
            };
            break;

        case 'warlock':
            // Warlock spell slots are already tracked separately, but we could add Eldritch Master here
            if (level >= 20) {
                resources['Eldritch Master'] = {
                    name: 'Eldritch Master',
                    current: 1,
                    max: 1,
                    resetType: 'long',
                    description: 'Spend 1 minute to regain all expended spell slots from Pact Magic.'
                };
            }
            break;

        case 'rogue':
            // Stroke of Luck at level 20
            if (level >= 20) {
                resources['Stroke of Luck'] = {
                    name: 'Stroke of Luck',
                    current: 1,
                    max: 1,
                    resetType: 'short',
                    description: 'Turn a miss into a hit, or treat a failed ability check as a 20.'
                };
            }
            break;

        case 'ranger':
            // No major resources that need tracking beyond spell slots
            break;

        case 'wizard':
            // Arcane Recovery is once per day, could track it
            resources['Arcane Recovery'] = {
                name: 'Arcane Recovery',
                current: 1,
                max: 1,
                resetType: 'long',
                description: 'Once per day when you finish a short rest, you can recover spell slots with combined level equal to or less than half your wizard level (rounded up).'
            };
            break;
    }

    return resources;
}

/**
 * Update class resources when leveling up
 */
export function updateClassResourcesForLevel(
    classId: string,
    newLevel: number,
    existingResources: ClassResources | undefined,
    abilityScores?: { [key: string]: number },
    subclassId?: string
): ClassResources {
    // Recalculate all resources for the new level (including subclass resources like Grit)
    const newResources = calculateClassResources(classId, newLevel, abilityScores, subclassId);
    
    // Preserve current values where possible (don't reset to max automatically)
    // Only update max values, keep current if it's still valid
    for (const [key, resource] of Object.entries(newResources)) {
        if (existingResources?.[key]) {
            // If max increased, increase current proportionally or keep current if it's still valid
            if (resource.max > existingResources[key].max) {
                const increase = resource.max - existingResources[key].max;
                resource.current = Math.min(resource.max, existingResources[key].current + increase);
            } else if (resource.max < existingResources[key].max) {
                // Max decreased (shouldn't happen, but handle it)
                resource.current = Math.min(resource.current, resource.max);
            } else {
                // Max stayed same, keep current
                resource.current = existingResources[key].current;
            }
        }
    }
    
    return newResources;
}

