import type { CharacterItem, ItemCharges } from './types';
import { parseDice, Random, rollDie } from './dice';

/**
 * Charges on magic items (wands, staffs, rings): how many are left, the most it holds and
 * what it regains at dawn ("1d6 + 1", "all"), which the sheet applies on a Long Rest.
 * Stored on the item as `charges`; until then they're read from its text ("This wand has
 * 7 charges ... regains 1d6 + 1 expended charges daily at dawn") and start full.
 * `charges: null` means the player stopped tracking them.
 */

/** "1d6 + 1" -> "1d6+1"; "all" stays; anything unreadable -> '' */
export function normalizeRegain(text: string | null | undefined): string {
    const t = String(text ?? '').trim().toLowerCase().replace(/\s+/g, '').replace(/−/g, '-');
    if (!t) return '';
    if (t === 'all' || t === 'full') return 'all';
    return parseDice(t) ? t : '';
}

/** What the item's rules text says about charges, or null. */
export function detectedCharges(item: Pick<CharacterItem, 'description'>): { max: number; regain: string } | null {
    const text = String(item.description || '').replace(/\s+/g, ' ');
    const max = /\b(?:has|starts with|holds|contains) (\d{1,3}) charges\b/i.exec(text);
    if (!max) return null;
    const dice = /\bregains? (\d+d\d+(?:\s*[+−-]\s*\d+)?|\d+) (?:expended )?charges?\b/i.exec(text);
    const amount = dice ? normalizeRegain(dice[1]) : /\bregains? all\b/i.test(text) ? 'all' : '';
    return { max: Number(max[1]), regain: amount };
}

/** The item's charges: stored, else from its text (full); null when it has none or they're not tracked. */
export function itemCharges(item: CharacterItem): ItemCharges | null {
    if (item.charges === null) return null;
    if (item.charges && typeof item.charges === 'object') {
        const max = Math.max(0, Math.floor(Number(item.charges.max) || 0));
        const current = Math.min(max, Math.max(0, Math.floor(Number(item.charges.current) || 0)));
        return { current, max, regain: normalizeRegain(item.charges.regain) };
    }
    const detected = detectedCharges(item);
    return detected ? { current: detected.max, max: detected.max, regain: detected.regain } : null;
}

/** Charges after spending (positive) or regaining (negative) some, kept between 0 and the maximum. */
export function withCharges(charges: ItemCharges, current: number): ItemCharges {
    return { ...charges, current: Math.min(charges.max, Math.max(0, Math.round(current))) };
}

/** "1d6+1" -> "1d6 + 1" for reading */
export const describeRegain = (regain: string) => (regain === 'all' ? 'all its charges' : `${regain.replace(/([+-])/g, ' $1 ')} charges`);

/**
 * Dawn (applied on a Long Rest): items regain charges. Without `random` it only describes
 * it (the rest preview); with it, the dice are rolled.
 */
export function rechargeAtDawn(equipment: (string | CharacterItem)[], random?: Random): {
    equipment: (string | CharacterItem)[];
    summary: string[];
    changed: boolean;
} {
    const summary: string[] = [];
    let changed = false;
    const next = (Array.isArray(equipment) ? equipment : []).map((entry) => {
        if (!entry || typeof entry !== 'object' || !entry.charges) return entry;
        const charges = itemCharges(entry);
        if (!charges || !charges.regain || charges.current >= charges.max) return entry;
        if (!random) {
            summary.push(charges.regain === 'all'
                ? `${entry.name} regains all its charges`
                : `${entry.name} regains ${describeRegain(charges.regain)} (${charges.current}/${charges.max} now)`);
            return entry;
        }
        let gained = charges.max - charges.current;
        if (charges.regain !== 'all') {
            const dice = parseDice(charges.regain)!;
            gained = dice.dice.reduce((sum, d) => sum + Array.from({ length: d.count }, () => rollDie(d.sides, random)).reduce((a, b) => a + b, 0), dice.bonus);
        }
        const after = withCharges(charges, charges.current + Math.max(0, gained));
        changed = true;
        summary.push(`${entry.name} regained ${after.current - charges.current} charge${after.current - charges.current === 1 ? '' : 's'} (${after.current}/${after.max})`);
        return { ...entry, charges: after };
    });
    return { equipment: next, summary, changed };
}
