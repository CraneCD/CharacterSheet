/** Monster stat blocks (SRD reference data or a DM's custom monsters) and the numbers derived from them. */
import { parseDice, Random, rollDie } from './dice';

export type Ability = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';
export const ABILITY_KEYS: Ability[] = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

export interface StatBlockEntry {
    name: string;
    description: string;
    attackBonus?: number;
    /** Damage dice with modifier, e.g. "1d6+2" */
    damage?: string;
    damageType?: string;
    saveDc?: number;
    saveAbility?: Ability;
}

/** Same shape as backend/src/lib/monsterSchema.ts. */
export interface Monster {
    id: string;
    /** 'custom' for the DM's own monsters; SRD monsters have no source. */
    source?: 'custom';
    name: string;
    size: string;
    type: string;
    alignment?: string;
    ac: number;
    acNote?: string;
    hp: number;
    hitDice?: string;
    speed: string;
    initiative?: number;
    abilities: Record<Ability, number>;
    saves?: Partial<Record<Ability, number>>;
    skills?: Record<string, number>;
    vulnerabilities?: string;
    resistances?: string;
    immunities?: string;
    senses?: string;
    passivePerception?: number;
    languages?: string;
    cr: string;
    xp?: number;
    traits?: StatBlockEntry[];
    actions?: StatBlockEntry[];
    bonusActions?: StatBlockEntry[];
    reactions?: StatBlockEntry[];
    legendaryActions?: StatBlockEntry[];
    legendaryActionUses?: number;
    description?: string;
    legacy?: boolean;
}

export const CR_OPTIONS = ['0', '1/8', '1/4', '1/2', ...Array.from({ length: 30 }, (_, i) => String(i + 1))];

/** XP by Challenge Rating (2024 rules). */
const XP_BY_CR: Record<string, number> = {
    '0': 10, '1/8': 25, '1/4': 50, '1/2': 100,
    '1': 200, '2': 450, '3': 700, '4': 1100, '5': 1800, '6': 2300, '7': 2900, '8': 3900, '9': 5000, '10': 5900,
    '11': 7200, '12': 8400, '13': 10000, '14': 11500, '15': 13000, '16': 15000, '17': 18000, '18': 20000, '19': 22000, '20': 25000,
    '21': 33000, '22': 41000, '23': 50000, '24': 62000, '25': 75000, '26': 90000, '27': 105000, '28': 120000, '29': 135000, '30': 155000,
};

/** "1/4" -> 0.25; unknown -> 0. For sorting and filtering. */
export function crValue(cr: string): number {
    if (cr.includes('/')) {
        const [a, b] = cr.split('/').map(Number);
        return b ? a / b : 0;
    }
    const n = Number(cr);
    return Number.isFinite(n) ? n : 0;
}

export function xpForCr(cr: string): number {
    return XP_BY_CR[cr] ?? 0;
}

/** A stat block's XP: its own value if it has one (e.g. a CR 0 creature worth 0), else the CR table. */
export function monsterXp(monster: Pick<Monster, 'cr' | 'xp'>): number {
    return typeof monster.xp === 'number' ? monster.xp : xpForCr(monster.cr);
}

export function abilityModifier(score: number): number {
    return Math.floor((score - 10) / 2);
}

export function monsterInitiative(monster: Pick<Monster, 'initiative' | 'abilities'>): number {
    return typeof monster.initiative === 'number' ? monster.initiative : abilityModifier(monster.abilities?.dex ?? 10);
}

export function formatModifier(n: number): string {
    return n >= 0 ? `+${n}` : `−${Math.abs(n)}`;
}

/** Average of a dice expression ("2d8+2" -> 11), rounded down like a stat block. */
export function averageRoll(expression: string): number | null {
    const parsed = parseDice(expression);
    if (!parsed) return null;
    const dice = parsed.dice.reduce((sum, d) => sum + d.count * (d.sides + 1) / 2, 0);
    return Math.floor(dice + parsed.bonus);
}

/** Roll a monster's hit dice (at least 1 HP); falls back to its average HP. */
export function rollMonsterHp(monster: Pick<Monster, 'hp' | 'hitDice'>, random: Random = Math.random): number {
    const parsed = monster.hitDice ? parseDice(monster.hitDice) : null;
    if (!parsed || parsed.dice.length === 0) return monster.hp;
    let total = parsed.bonus;
    for (const d of parsed.dice) for (let i = 0; i < d.count; i++) total += rollDie(d.sides, random);
    return Math.max(1, total);
}

export interface MonsterFilter {
    query?: string;
    minCr?: number;
    maxCr?: number;
    type?: string;
}

/** Search by name or type, within a CR range; sorted by CR then name. Legacy entries are left out. */
export function filterMonsters(monsters: Monster[], filter: MonsterFilter = {}): Monster[] {
    const q = (filter.query || '').trim().toLowerCase();
    const type = (filter.type || '').toLowerCase();
    return monsters
        .filter((m) => !m.legacy)
        .filter((m) => !q || m.name.toLowerCase().includes(q) || m.type.toLowerCase().includes(q))
        .filter((m) => !type || m.type.toLowerCase().startsWith(type))
        .filter((m) => filter.minCr === undefined || crValue(m.cr) >= filter.minCr)
        .filter((m) => filter.maxCr === undefined || crValue(m.cr) <= filter.maxCr)
        .sort((a, b) => crValue(a.cr) - crValue(b.cr) || a.name.localeCompare(b.name));
}

/** Creature types present in a list ("Fey (Goblinoid)" counts as Fey), for a filter menu. */
export function monsterTypes(monsters: Monster[]): string[] {
    return Array.from(new Set(monsters.map((m) => m.type.split(' (')[0].trim()))).sort();
}

/** An empty stat block for the custom monster form. */
export function blankMonster(): Omit<Monster, 'id'> {
    return {
        name: '',
        size: 'Medium',
        type: 'Humanoid',
        alignment: 'Neutral',
        ac: 12,
        hp: 10,
        hitDice: '3d8',
        speed: '30 ft.',
        abilities: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 },
        senses: '',
        passivePerception: 10,
        languages: '',
        cr: '1/2',
        traits: [],
        actions: [{ name: 'Attack', description: 'Melee Attack Roll: +4, reach 5 ft. Hit: 5 (1d6 + 2) damage.', attackBonus: 4, damage: '1d6+2' }],
    };
}

/** "Perception +4, Stealth +6" -> { Perception: 4, Stealth: 6 }; unreadable parts are skipped. */
export function parseBonusList(text: string): Record<string, number> {
    const result: Record<string, number> = {};
    for (const part of text.split(',')) {
        const m = /^\s*(.+?)\s*([+\-−]\s*\d+)\s*$/.exec(part);
        if (!m) continue;
        result[m[1]] = Number(m[2].replace('−', '-').replace(/\s/g, ''));
    }
    return result;
}

export function formatBonusList(values: Record<string, number> | undefined): string {
    return Object.entries(values ?? {}).map(([name, v]) => `${name} ${v >= 0 ? '+' : '-'}${Math.abs(v)}`).join(', ');
}

const SAVE_NAMES: Record<string, Ability> = { str: 'str', strength: 'str', dex: 'dex', dexterity: 'dex', con: 'con', constitution: 'con', int: 'int', intelligence: 'int', wis: 'wis', wisdom: 'wis', cha: 'cha', charisma: 'cha' };

/** "Dex +5, Wis +2" -> { dex: 5, wis: 2 } (ability names or abbreviations). */
export function parseSaves(text: string): Partial<Record<Ability, number>> {
    const saves: Partial<Record<Ability, number>> = {};
    for (const [name, value] of Object.entries(parseBonusList(text))) {
        const ability = SAVE_NAMES[name.toLowerCase()];
        if (ability) saves[ability] = value;
    }
    return saves;
}

export function formatSaves(saves: Partial<Record<Ability, number>> | undefined): string {
    return formatBonusList(Object.fromEntries(Object.entries(saves ?? {}).map(([a, v]) => [a.charAt(0).toUpperCase() + a.slice(1), v as number])));
}
