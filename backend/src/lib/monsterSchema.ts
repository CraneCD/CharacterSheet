import { z } from 'zod';

// Shape of a monster stat block (2024 layout). Used for SRD monsters in the
// ReferenceItem table (type "monster", admin-editable) and for DMs' custom
// monsters (Monster table), so encounters treat both the same way.
// .passthrough() keeps extra fields an admin adds.

const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;

const score = z.number().int().min(1).max(30);
const bonus = z.number().int().min(-10).max(30);
const shortText = z.string().max(300);

/** CR as written in a stat block: "0", "1/8", "1/4", "1/2" or 1-30. */
export const CR_PATTERN = /^(0|1\/8|1\/4|1\/2|[1-9]|[12][0-9]|30)$/;

const statBlockEntry = z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(4000),
    /** Attack roll bonus, when the entry is an attack (makes it rollable). */
    attackBonus: bonus.optional(),
    /** Damage dice with modifier, e.g. "1d6+2" or "2d8". */
    damage: z.string().max(40).optional(),
    damageType: z.string().max(40).optional(),
    /** Saving throw DC and ability, when the entry forces a save. */
    saveDc: z.number().int().min(1).max(40).optional(),
    saveAbility: z.enum(ABILITIES).optional(),
}).passthrough();

export const monsterSchema = z.object({
    name: z.string().min(1).max(100),
    size: z.string().min(1).max(40),
    type: z.string().min(1).max(80),
    alignment: z.string().max(60).optional(),
    ac: z.number().int().min(0).max(40),
    acNote: z.string().max(80).optional(),
    hp: z.number().int().min(1).max(2000),
    /** Hit dice with modifier, e.g. "3d6" or "10d10+30"; rolled for varied HP. */
    hitDice: z.string().max(40).optional(),
    speed: shortText,
    /** Initiative modifier; defaults to the Dexterity modifier. */
    initiative: bonus.optional(),
    abilities: z.object({ str: score, dex: score, con: score, int: score, wis: score, cha: score }),
    saves: z.record(z.enum(ABILITIES), bonus).optional(),
    skills: z.record(z.string().max(40), bonus).optional(),
    vulnerabilities: shortText.optional(),
    resistances: shortText.optional(),
    immunities: shortText.optional(),
    senses: shortText.optional(),
    passivePerception: z.number().int().min(0).max(50).optional(),
    languages: shortText.optional(),
    cr: z.string().regex(CR_PATTERN, 'CR must be 0, 1/8, 1/4, 1/2 or 1-30'),
    /** XP when it differs from the CR table (e.g. CR 0 creatures worth 0). */
    xp: z.number().int().min(0).max(200000).optional(),
    traits: z.array(statBlockEntry).max(30).optional(),
    actions: z.array(statBlockEntry).max(30).optional(),
    bonusActions: z.array(statBlockEntry).max(30).optional(),
    reactions: z.array(statBlockEntry).max(30).optional(),
    legendaryActions: z.array(statBlockEntry).max(30).optional(),
    legendaryActionUses: z.number().int().min(0).max(10).optional(),
    description: z.string().max(4000).optional(),
    legacy: z.boolean().optional(),
}).passthrough();

export type MonsterData = z.infer<typeof monsterSchema>;
