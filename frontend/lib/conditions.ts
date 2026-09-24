/** 2024 conditions and exhaustion, and how they change the character's rolls and Speed. */
import type { RollMode } from './dice';

export const CONDITIONS: { name: string; summary: string }[] = [
    { name: 'Blinded', summary: 'You can’t see. Your attack rolls have Disadvantage; attacks against you have Advantage.' },
    { name: 'Charmed', summary: 'You can’t attack the charmer, who has Advantage on social checks against you.' },
    { name: 'Deafened', summary: 'You can’t hear and fail checks that need hearing.' },
    { name: 'Frightened', summary: 'Disadvantage on ability checks and attack rolls while the source is in sight; you can’t move closer to it.' },
    { name: 'Grappled', summary: 'Speed 0. Disadvantage on attacks against anyone but the grappler.' },
    { name: 'Incapacitated', summary: 'No actions, Bonus Actions or Reactions; your Concentration breaks and you can’t speak.' },
    { name: 'Invisible', summary: 'Advantage on Initiative; your attacks have Advantage and attacks against you have Disadvantage.' },
    { name: 'Paralyzed', summary: 'Incapacitated, Speed 0. You fail Strength and Dexterity saves; hits from within 5 feet are critical.' },
    { name: 'Petrified', summary: 'Turned to stone: Incapacitated, Speed 0, Resistance to all damage; you fail Strength and Dexterity saves.' },
    { name: 'Poisoned', summary: 'Disadvantage on attack rolls and ability checks.' },
    { name: 'Prone', summary: 'Your attack rolls have Disadvantage; attackers within 5 feet have Advantage. Standing up costs half your Speed.' },
    { name: 'Restrained', summary: 'Speed 0. Your attack rolls and Dexterity saves have Disadvantage; attacks against you have Advantage.' },
    { name: 'Stunned', summary: 'Incapacitated. You fail Strength and Dexterity saves; attacks against you have Advantage.' },
    { name: 'Unconscious', summary: 'Incapacitated and Prone, Speed 0. You fail Strength and Dexterity saves; hits from within 5 feet are critical.' },
];

export const CONDITION_NAMES = CONDITIONS.map((c) => c.name);
export const MAX_EXHAUSTION = 6;

/** What a d20 roll is for; conditions affect each kind differently. */
export type RollKind = 'check' | 'save' | 'attack' | 'initiative';

export interface ActiveConditions {
    conditions: string[];
    exhaustion: number;
}

export interface RollAdjustment {
    /** Advantage/Disadvantage from conditions (they cancel each other out) */
    mode: RollMode;
    /** Subtracted from the total (Exhaustion: 2 per level) */
    penalty: number;
    /** The condition that makes this roll fail automatically, if any */
    autoFail?: string;
    /** Why the roll changed, for the dice tray */
    reasons: string[];
}

const has = (active: ActiveConditions, name: string) => active.conditions.includes(name);
const first = (active: ActiveConditions, names: string[]) => names.find((n) => has(active, n));

/** Keeps only known conditions (in list order) and clamps exhaustion to 0-6. */
export function normalizeConditions(conditions: unknown, exhaustion: unknown): ActiveConditions {
    const list = Array.isArray(conditions) ? conditions.filter((c): c is string => typeof c === 'string') : [];
    const level = Math.round(Number(exhaustion) || 0);
    return {
        conditions: CONDITION_NAMES.filter((n) => list.includes(n)),
        exhaustion: Math.min(MAX_EXHAUSTION, Math.max(0, level)),
    };
}

export function hasActiveConditions(active: ActiveConditions): boolean {
    return active.conditions.length > 0 || active.exhaustion > 0;
}

/**
 * How active conditions change a d20 roll (2024 rules). Covers what applies to every roll of
 * that kind; situational effects (e.g. Grappled attacking someone else) are left to the player.
 */
export function rollAdjustment(kind: RollKind, ability: string | undefined, active: ActiveConditions): RollAdjustment {
    const disadvantage: string[] = [];
    const advantage: string[] = [];

    if (kind === 'check' || kind === 'initiative') {
        disadvantage.push(...['Poisoned', 'Frightened'].filter((n) => has(active, n)));
    }
    if (kind === 'initiative' && has(active, 'Invisible')) advantage.push('Invisible');
    if (kind === 'attack') {
        disadvantage.push(...['Blinded', 'Frightened', 'Poisoned', 'Prone', 'Restrained'].filter((n) => has(active, n)));
        if (has(active, 'Invisible')) advantage.push('Invisible');
    }
    if (kind === 'save' && ability === 'dex' && has(active, 'Restrained')) disadvantage.push('Restrained');

    const autoFail = kind === 'save' && (ability === 'str' || ability === 'dex')
        ? first(active, ['Paralyzed', 'Petrified', 'Stunned', 'Unconscious'])
        : undefined;

    const mode: RollMode = advantage.length && disadvantage.length ? 'normal'
        : disadvantage.length ? 'disadvantage'
        : advantage.length ? 'advantage' : 'normal';

    const reasons: string[] = [];
    if (autoFail) reasons.push(`Automatic failure (${autoFail})`);
    if (advantage.length && disadvantage.length) {
        reasons.push(`Advantage (${advantage.join(', ')}) and Disadvantage (${disadvantage.join(', ')}) cancel out`);
    } else if (disadvantage.length) {
        reasons.push(`Disadvantage (${disadvantage.join(', ')})`);
    } else if (advantage.length) {
        reasons.push(`Advantage (${advantage.join(', ')})`);
    }
    const penalty = active.exhaustion * 2;
    if (penalty) reasons.push(`−${penalty} Exhaustion ${active.exhaustion}`);

    return { mode, penalty, autoFail, reasons };
}

/** True when conditions change this kind of roll at all (used to flag affected numbers). */
export function isRollAffected(kind: RollKind, ability: string | undefined, active: ActiveConditions): boolean {
    const adj = rollAdjustment(kind, ability, active);
    return adj.mode !== 'normal' || adj.penalty > 0 || !!adj.autoFail;
}

/** Combines a mode the player picked (tray buttons) with the conditions' mode; opposite modes cancel. */
export function combineModes(chosen: RollMode, fromConditions: RollMode): RollMode {
    if (chosen === 'normal') return fromConditions;
    if (fromConditions === 'normal' || fromConditions === chosen) return chosen;
    return 'normal';
}

/** Speed after conditions: 0 while Grappled, Restrained, Paralyzed, Petrified or Unconscious; −5 ft. per Exhaustion level. */
export function speedWithConditions(speed: number, active: ActiveConditions): { speed: number; reason?: string } {
    const stopped = first(active, ['Grappled', 'Restrained', 'Paralyzed', 'Petrified', 'Unconscious']);
    if (stopped) return { speed: 0, reason: stopped };
    if (active.exhaustion > 0) return { speed: Math.max(0, speed - active.exhaustion * 5), reason: `Exhaustion ${active.exhaustion}` };
    return { speed };
}

export function exhaustionSummary(level: number): string {
    if (level <= 0) return 'None';
    if (level >= MAX_EXHAUSTION) return 'Level 6: death';
    return `Level ${level}: −${level * 2} to d20 rolls, −${level * 5} ft. Speed`;
}
