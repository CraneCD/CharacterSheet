/** 2024 encounter building: XP budget per character by level and difficulty (no group-size multipliers). */

export type Difficulty = 'low' | 'moderate' | 'high';

/** XP budget per character, by character level. */
const BUDGET_BY_LEVEL: Record<number, Record<Difficulty, number>> = {
    1: { low: 50, moderate: 75, high: 100 },
    2: { low: 100, moderate: 150, high: 200 },
    3: { low: 150, moderate: 225, high: 400 },
    4: { low: 250, moderate: 375, high: 500 },
    5: { low: 500, moderate: 750, high: 1100 },
    6: { low: 600, moderate: 1000, high: 1400 },
    7: { low: 750, moderate: 1300, high: 1700 },
    8: { low: 1000, moderate: 1700, high: 2100 },
    9: { low: 1300, moderate: 2000, high: 2600 },
    10: { low: 1600, moderate: 2300, high: 3100 },
    11: { low: 1900, moderate: 2900, high: 4100 },
    12: { low: 2200, moderate: 3700, high: 4700 },
    13: { low: 2600, moderate: 4200, high: 5400 },
    14: { low: 2900, moderate: 4900, high: 6200 },
    15: { low: 3300, moderate: 5400, high: 7800 },
    16: { low: 3800, moderate: 6100, high: 9800 },
    17: { low: 4500, moderate: 7200, high: 11700 },
    18: { low: 5000, moderate: 8700, high: 14200 },
    19: { low: 5500, moderate: 10700, high: 17200 },
    20: { low: 6400, moderate: 13200, high: 22000 },
};

export type PartyBudget = Record<Difficulty, number>;

/** The party's XP budget: the sum of each character's budget. */
export function partyBudget(levels: number[]): PartyBudget {
    const total: PartyBudget = { low: 0, moderate: 0, high: 0 };
    for (const raw of levels) {
        const level = Math.min(20, Math.max(1, Math.round(raw) || 1));
        const row = BUDGET_BY_LEVEL[level];
        total.low += row.low;
        total.moderate += row.moderate;
        total.high += row.high;
    }
    return total;
}

export type EncounterRating = 'none' | 'low' | 'moderate' | 'high' | 'beyond';

export const RATING_LABELS: Record<EncounterRating, string> = {
    none: 'No monsters yet',
    low: 'Low',
    moderate: 'Moderate',
    high: 'High',
    beyond: 'Beyond High',
};

export const RATING_HINTS: Record<EncounterRating, string> = {
    none: 'Add monsters to see how hard the fight is.',
    low: 'A few tough moments; unlikely to cost the party a character.',
    moderate: 'Could go badly without healing or a plan.',
    high: 'Could be deadly for one or more characters.',
    beyond: 'Over the High budget: expect characters to fall.',
};

/** Which budget the monsters' total XP fits within. */
export function rateEncounter(monsterXp: number, budget: PartyBudget): EncounterRating {
    if (monsterXp <= 0) return 'none';
    if (monsterXp <= budget.low) return 'low';
    if (monsterXp <= budget.moderate) return 'moderate';
    if (monsterXp <= budget.high) return 'high';
    return 'beyond';
}

/** XP each character earns when the party overcomes monsters worth `totalXp`. */
export function xpPerCharacter(totalXp: number, partySize: number): number {
    return partySize > 0 ? Math.floor(totalXp / partySize) : 0;
}
