export const ABILITIES = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;

export const ABILITY_NAMES: Record<string, string> = {
    str: 'Strength', dex: 'Dexterity', con: 'Constitution', int: 'Intelligence', wis: 'Wisdom', cha: 'Charisma',
};

/** +2 / -1 / +0 */
export function formatMod(m: number): string {
    return m >= 0 ? `+${m}` : `${m}`;
}
