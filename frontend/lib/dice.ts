/** Dice for the sheet's tap-to-roll: d20 tests (with advantage/disadvantage) and damage expressions. */

export type Random = () => number;
export type RollMode = 'normal' | 'advantage' | 'disadvantage';

export function rollDie(sides: number, random: Random = Math.random): number {
    return Math.min(sides, Math.floor(random() * sides) + 1);
}

export interface D20Result {
    kind: 'd20';
    label: string;
    mode: RollMode;
    /** Both dice with advantage/disadvantage, otherwise one. */
    rolls: number[];
    /** The die that counts. */
    natural: number;
    modifier: number;
    total: number;
}

export interface DamageResult {
    kind: 'damage';
    label: string;
    /** e.g. "1d8+3" (dice doubled on a critical hit) */
    expression: string;
    rolls: number[];
    modifier: number;
    total: number;
    critical: boolean;
}

export type RollResult = D20Result | DamageResult;

export function rollD20(label: string, modifier: number, mode: RollMode = 'normal', random: Random = Math.random): D20Result {
    const rolls = mode === 'normal' ? [rollDie(20, random)] : [rollDie(20, random), rollDie(20, random)];
    const natural = mode === 'advantage' ? Math.max(...rolls) : mode === 'disadvantage' ? Math.min(...rolls) : rolls[0];
    return { kind: 'd20', label, mode, rolls, natural, modifier, total: natural + modifier };
}

export interface DiceTerm {
    count: number;
    sides: number;
}

/** Parses "1d8", "2d6 + 1d4", "1d10+3" or a flat "1"; bonuses in the expression add to the modifier. Null if unreadable. */
export function parseDice(expression: string): { dice: DiceTerm[]; bonus: number } | null {
    const compact = expression.replace(/\s+/g, '').toLowerCase();
    if (!compact || !/^[+-]?(\d*d\d+|\d+)([+-](\d*d\d+|\d+))*$/.test(compact)) return null;
    const dice: DiceTerm[] = [];
    let bonus = 0;
    for (const [, sign, term] of compact.matchAll(/([+-]?)(\d*d\d+|\d+)/g)) {
        const negative = sign === '-';
        if (term.includes('d')) {
            const [count, sides] = term.split('d').map((n) => (n === '' ? 1 : Number(n)));
            if (negative || count < 1 || count > 100 || sides < 1 || sides > 1000) return null;
            dice.push({ count, sides });
        } else {
            bonus += negative ? -Number(term) : Number(term);
        }
    }
    return dice.length > 0 || bonus !== 0 ? { dice, bonus } : null;
}

/** Rolls a damage expression plus a modifier. A critical hit doubles the dice, not the modifier. */
export function rollDamage(label: string, expression: string, modifier = 0, critical = false, random: Random = Math.random): DamageResult | null {
    const parsed = parseDice(expression);
    if (!parsed) return null;
    const dice = parsed.dice.map((d) => ({ ...d, count: critical ? d.count * 2 : d.count }));
    const rolls = dice.flatMap((d) => Array.from({ length: d.count }, () => rollDie(d.sides, random)));
    const totalModifier = parsed.bonus + modifier;
    const diceText = dice.map((d) => `${d.count}d${d.sides}`).join('+');
    return {
        kind: 'damage',
        label,
        expression: `${diceText}${formatBonus(totalModifier)}`,
        rolls,
        modifier: totalModifier,
        total: Math.max(0, rolls.reduce((a, b) => a + b, 0) + totalModifier),
        critical,
    };
}

/** "+3", "−1" (a real minus sign), or "" for zero. */
export function formatBonus(n: number): string {
    if (n === 0) return '';
    return n > 0 ? `+${n}` : `−${Math.abs(n)}`;
}

/** The working shown under the total, e.g. "d20 14 + 4", "d20 (7, 16) + 4", "1d8+3: 5 + 3". */
export function describeRoll(result: RollResult): string {
    const mod = result.modifier === 0 ? '' : ` ${result.modifier > 0 ? '+' : '−'} ${Math.abs(result.modifier)}`;
    if (result.kind === 'd20') {
        const dice = result.rolls.length > 1 ? `d20 (${result.rolls.join(', ')})` : `d20 ${result.natural}`;
        return `${dice}${mod}`;
    }
    return `${result.expression}: ${result.rolls.join(' + ') || '0'}${mod}`;
}

/** One line for screen readers and the roll log. */
export function announceRoll(result: RollResult): string {
    if (result.kind === 'd20') {
        const mode = result.mode === 'normal' ? '' : ` with ${result.mode}`;
        const note = result.natural === 20 ? ', natural 20' : result.natural === 1 ? ', natural 1' : '';
        return `${result.label}${mode}: ${result.total}${note}`;
    }
    return `${result.label}${result.critical ? ' (critical)' : ''}: ${result.total}`;
}
