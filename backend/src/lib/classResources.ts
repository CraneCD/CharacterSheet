// 2024 (5.5e) class resource tables. Mirrors frontend/lib/classResources.ts
// (calculateClassResources) so characters initialised or levelled up by the
// API get the same resources the sheet would compute.

export interface ClassResource {
    name: string;
    current: number;
    max: number;
    resetType: 'short' | 'long' | 'none';
    shortRestRegain?: number;
    description?: string;
}

export type ClassResources = Record<string, ClassResource>;

/** Look up a 1-indexed per-level table (levels above 20 clamp to 20). */
const atLevel = (table: number[], level: number): number => table[Math.min(Math.max(level, 1), 20) - 1] ?? 0;

// 2024 PHB class tables (SRD 5.2), indexed by class level 1-20.
export const RAGES_BY_LEVEL = [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6];
export const CLERIC_CHANNEL_DIVINITY_BY_LEVEL = [0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4];
export const PALADIN_CHANNEL_DIVINITY_BY_LEVEL = [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
export const WILD_SHAPE_BY_LEVEL = [0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4];
/** Psi Warrior / Soulknife Psionic Energy Dice (count). */
export const PSIONIC_DICE_BY_LEVEL = [0, 0, 4, 4, 6, 6, 6, 6, 8, 8, 8, 8, 10, 10, 10, 10, 12, 12, 12, 12];

const psionicDieSize = (level: number) => (level >= 17 ? 'd12' : level >= 11 ? 'd10' : level >= 5 ? 'd8' : 'd6');
const abilityMod = (score: number | undefined) => (score != null ? Math.floor((score - 10) / 2) : 0);

/**
 * Calculate class resources based on class ID, level, and optionally subclass (2024 rules).
 * Resources that regain one use on a Short Rest and all on a Long Rest use
 * resetType 'short' with shortRestRegain: 1 (the rest handlers treat that as partial).
 */
export function calculateClassResources(
    classId: string,
    level: number,
    abilityScores?: { [key: string]: number },
    subclassId?: string
): ClassResources {
    const resources: ClassResources = {};
    const pb = Math.ceil(level / 4) + 1;
    const sub = (subclassId || '').toLowerCase().replace(/\s+/g, '_');

    switch (classId.toLowerCase()) {
        case 'sorcerer':
            // Font of Magic (level 2): Sorcery Points = Sorcerer level
            if (level >= 2) {
                resources['Sorcery Points'] = {
                    name: 'Sorcery Points',
                    current: level,
                    max: level,
                    resetType: 'long',
                    description: 'Font of Magic: convert spell slots into Sorcery Points and back, and fuel Metamagic. Regain all on a Long Rest.'
                };
            }
            resources['Innate Sorcery'] = {
                name: 'Innate Sorcery',
                current: 2,
                max: 2,
                resetType: 'long',
                description: 'Bonus Action: for 1 minute, +1 to your Sorcerer spell save DC and Advantage on Sorcerer spell attack rolls.'
            };
            break;

        case 'monk':
            // Monk's Focus (level 2): Focus Points = Monk level, regain on Short or Long Rest
            if (level >= 2) {
                resources['Focus Points'] = {
                    name: 'Focus Points',
                    current: level,
                    max: level,
                    resetType: 'short',
                    description: 'Spend Focus Points on Flurry of Blows, Patient Defense, Step of the Wind, and other Monk features. Regain all on a Short or Long Rest.'
                };
            }
            break;

        case 'fighter': {
            resources['Action Surge'] = {
                name: 'Action Surge',
                current: level >= 17 ? 2 : level >= 2 ? 1 : 0,
                max: level >= 17 ? 2 : level >= 2 ? 1 : 0,
                resetType: 'short',
                description: 'On your turn, take one additional action (except the Magic action). Regain on a Short or Long Rest.'
            };
            if (level < 2) delete resources['Action Surge'];
            // Second Wind: 2 uses (1-3), 3 uses (4-9), 4 uses (10+). Regain 1 on short rest, all on long rest (5.5e)
            const secondWindMax = level >= 10 ? 4 : level >= 4 ? 3 : 2;
            resources['Second Wind'] = {
                name: 'Second Wind',
                current: secondWindMax,
                max: secondWindMax,
                resetType: 'short',
                shortRestRegain: 1,
                description: 'Bonus action: regain 1d10 + fighter level HP. Also fuels Tactical Mind and Tactical Shift. Regain 1 use on a Short Rest, all on a Long Rest.'
            };
            if (level >= 9) {
                const indomitableMax = level >= 17 ? 3 : level >= 13 ? 2 : 1;
                resources['Indomitable'] = {
                    name: 'Indomitable',
                    current: indomitableMax,
                    max: indomitableMax,
                    resetType: 'long',
                    description: 'Reroll a failed saving throw with a bonus equal to your Fighter level.'
                };
            }
            // Gunslinger (legacy Fighter subclass): Grit Points (level 3+)
            if (sub === 'gunslinger' && level >= 3) {
                const gritMax = abilityScores?.wis != null ? Math.max(1, abilityMod(abilityScores.wis)) : 1;
                resources['Grit Points'] = {
                    name: 'Grit Points',
                    current: gritMax,
                    max: gritMax,
                    resetType: 'short',
                    description: 'You spend grit to perform trick shots with firearms. Regain grit on a short rest, when you score a critical hit with a firearm, or when you reduce a creature to 0 HP with a firearm attack.'
                };
            }
            if (sub === 'battle_master' && level >= 3) {
                const dice = level >= 15 ? 6 : level >= 7 ? 5 : 4;
                const size = level >= 18 ? 'd12' : level >= 10 ? 'd10' : 'd8';
                resources['Superiority Dice'] = {
                    name: 'Superiority Dice',
                    current: dice,
                    max: dice,
                    resetType: 'short',
                    description: `${dice} Superiority Dice (${size}) fuel your maneuvers. Regain all on a Short or Long Rest.`
                };
            }
            // Psi Warrior: Psionic Energy Dice (level 3+). Regain one on a Short Rest, all on a Long Rest.
            if ((sub === 'psi_warrior') && level >= 3) {
                const diceMax = atLevel(PSIONIC_DICE_BY_LEVEL, level);
                resources['Psionic Energy Dice'] = {
                    name: 'Psionic Energy Dice',
                    current: diceMax,
                    max: diceMax,
                    resetType: 'short',
                    shortRestRegain: 1,
                    description: `You have ${diceMax} Psionic Energy Dice (${psionicDieSize(level)}). They fuel Protective Field, Psionic Strike, Telekinetic Movement, and other psionic powers. Regain one on a Short Rest and all on a Long Rest.`
                };
            }
            break;
        }

        case 'barbarian': {
            const rageUses = atLevel(RAGES_BY_LEVEL, level);
            resources['Rage'] = {
                name: 'Rage',
                current: rageUses,
                max: rageUses,
                resetType: 'short',
                shortRestRegain: 1,
                description: 'Enter a Rage as a Bonus Action (no Heavy armor): Resistance to Bludgeoning, Piercing, and Slashing damage, bonus Rage Damage on Strength attacks, and Advantage on Strength checks and saves. Regain one use on a Short Rest, all on a Long Rest.'
            };
            break;
        }

        case 'cleric': {
            const channelUses = atLevel(CLERIC_CHANNEL_DIVINITY_BY_LEVEL, level);
            if (channelUses > 0) {
                resources['Channel Divinity'] = {
                    name: 'Channel Divinity',
                    current: channelUses,
                    max: channelUses,
                    resetType: 'short',
                    shortRestRegain: 1,
                    description: 'Divine Spark, Turn Undead, and your domain options. Regain one use on a Short Rest, all on a Long Rest.'
                };
            }
            if (sub === 'war' && level >= 3) {
                const uses = Math.max(1, abilityMod(abilityScores?.wis));
                resources['War Priest'] = { name: 'War Priest', current: uses, max: uses, resetType: 'short', description: 'Bonus Action weapon attack or Unarmed Strike.' };
            }
            if (sub === 'light' && level >= 3) {
                const uses = Math.max(1, abilityMod(abilityScores?.wis));
                resources['Warding Flare'] = { name: 'Warding Flare', current: uses, max: uses, resetType: level >= 6 ? 'short' : 'long', description: 'Reaction: impose Disadvantage on an attack roll within 30 feet.' };
            }
            break;
        }

        case 'paladin': {
            const channelUses = atLevel(PALADIN_CHANNEL_DIVINITY_BY_LEVEL, level);
            if (channelUses > 0) {
                resources['Channel Divinity'] = {
                    name: 'Channel Divinity',
                    current: channelUses,
                    max: channelUses,
                    resetType: 'short',
                    shortRestRegain: 1,
                    description: 'Divine Sense and your oath options. Regain one use on a Short Rest, all on a Long Rest.'
                };
            }
            // Lay on Hands: Level × 5 HP pool
            resources['Lay on Hands'] = {
                name: 'Lay on Hands',
                current: level * 5,
                max: level * 5,
                resetType: 'long',
                description: `Pool of healing power. Restore a total of ${level * 5} hit points.`
            };
            break;
        }

        case 'bard': {
            // Bardic Inspiration: Charisma modifier uses (minimum 1); Font of Inspiration (5) regains on Short Rest
            const chaMod = Math.max(1, abilityMod(abilityScores?.cha));
            const die = level >= 15 ? 'd12' : level >= 10 ? 'd10' : level >= 5 ? 'd8' : 'd6';
            resources['Bardic Inspiration'] = {
                name: 'Bardic Inspiration',
                current: chaMod,
                max: chaMod,
                resetType: level >= 5 ? 'short' : 'long',
                description: `Bonus Action: give a creature within 60 feet a Bardic Inspiration die (${die}) to add to a failed D20 Test.`
            };
            break;
        }

        case 'druid': {
            const wildShapeUses = atLevel(WILD_SHAPE_BY_LEVEL, level);
            if (wildShapeUses > 0) {
                resources['Wild Shape'] = {
                    name: 'Wild Shape',
                    current: wildShapeUses,
                    max: wildShapeUses,
                    resetType: 'short',
                    shortRestRegain: 1,
                    description: 'Bonus Action: shape-shift into a Beast form you know. Regain one use on a Short Rest, all on a Long Rest.'
                };
            }
            break;
        }

        case 'warlock':
            // Pact Magic slots are tracked by the spell manager. Magical Cunning (level 2) restores slots once per Long Rest.
            if (level >= 2) {
                resources['Magical Cunning'] = {
                    name: 'Magical Cunning',
                    current: 1,
                    max: 1,
                    resetType: 'long',
                    description: level >= 20
                        ? 'Eldritch Master: perform a 1-minute rite to regain all expended Pact Magic spell slots.'
                        : 'Perform a 1-minute rite to regain expended Pact Magic spell slots, up to half your maximum (round up).'
                };
            }
            break;

        case 'rogue':
            if (sub === 'soulknife' && level >= 3) {
                const diceMax = atLevel(PSIONIC_DICE_BY_LEVEL, level);
                resources['Psionic Energy Dice'] = {
                    name: 'Psionic Energy Dice',
                    current: diceMax,
                    max: diceMax,
                    resetType: 'short',
                    shortRestRegain: 1,
                    description: `You have ${diceMax} Psionic Energy Dice (${psionicDieSize(level)}) for Psi-Bolstered Knack, Psychic Whispers, and Soul Blades. Regain one on a Short Rest and all on a Long Rest.`
                };
            }
            // Stroke of Luck at level 20
            if (level >= 20) {
                resources['Stroke of Luck'] = {
                    name: 'Stroke of Luck',
                    current: 1,
                    max: 1,
                    resetType: 'short',
                    description: 'If you fail a D20 Test, you can turn the roll into a 20. Regain on a Short or Long Rest.'
                };
            }
            break;

        case 'ranger':
            // Favored Enemy: cast Hunter's Mark without a slot; 2/3/4/5/6 uses at levels 1/5/9/13/17 (= Proficiency Bonus)
            resources['Favored Enemy'] = {
                name: 'Favored Enemy',
                current: pb,
                max: pb,
                resetType: 'long',
                description: 'You always have the Hunter\'s Mark spell prepared. You can cast it without expending a spell slot this many times, and you regain all expended uses when you finish a Long Rest.'
            };
            break;

        case 'wizard':
            resources['Arcane Recovery'] = {
                name: 'Arcane Recovery',
                current: 1,
                max: 1,
                resetType: 'long',
                description: 'Once per day when you finish a Short Rest, recover expended spell slots with a combined level up to half your Wizard level (round up), none of level 6 or higher.'
            };
            break;
    }

    return resources;
}

