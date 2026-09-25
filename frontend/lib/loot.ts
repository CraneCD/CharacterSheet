/**
 * Campaign loot helpers: coin piles and splitting loot between characters.
 * The server checks and applies every hand-out (backend/src/lib/lootDelivery.ts);
 * these fill in the dialog and describe what happened.
 */

export const DENOMINATIONS = ['pp', 'gp', 'ep', 'sp', 'cp'] as const;
export type Denomination = typeof DENOMINATIONS[number];
export type Coins = Partial<Record<Denomination, number>>;

/** Positive whole amounts only; null when there are no coins at all. */
export function normalizeCoins(value: unknown): Coins | null {
    if (!value || typeof value !== 'object') return null;
    const out: Coins = {};
    for (const d of DENOMINATIONS) {
        const n = Math.floor(Number((value as Record<string, unknown>)[d]) || 0);
        if (n > 0) out[d] = n;
    }
    return Object.keys(out).length ? out : null;
}

/** "56 pp, 350 gp, 189 sp" */
export function formatCoins(coins: Coins | null | undefined): string {
    const c = normalizeCoins(coins);
    if (!c) return '';
    return DENOMINATIONS.filter((d) => c[d]).map((d) => `${c[d]!.toLocaleString('en-US')} ${d}`).join(', ');
}

/** `total` split between `ways` people: equal whole shares, and what's left over. */
export function splitEvenly(total: number, ways: number): { share: number; left: number } {
    if (ways <= 0) return { share: 0, left: total };
    const share = Math.floor(total / ways);
    return { share, left: total - share * ways };
}

/** An equal share of each denomination for `ways` people (leftover coins stay in the pile). */
export function evenCoinShare(coins: Coins, ways: number): Coins {
    const out: Coins = {};
    for (const d of DENOMINATIONS) {
        const { share } = splitEvenly(coins[d] ?? 0, ways);
        if (share > 0) out[d] = share;
    }
    return out;
}

/** What's left of a pile after giving `given` out (negative when over-given). */
export function coinsLeft(pile: Coins, given: Coins[]): Record<Denomination, number> {
    const out = {} as Record<Denomination, number>;
    for (const d of DENOMINATIONS) out[d] = (pile[d] ?? 0) - given.reduce((n, g) => n + (g[d] ?? 0), 0);
    return out;
}

/** "Aria", "Aria and Borin", "Aria, Borin and Cade" */
export function listNames(names: string[]): string {
    if (names.length <= 1) return names[0] ?? '';
    return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}
