import { CharacterItem } from './types';

export type UnarmoredMethod = 'standard' | 'unarmored-monk' | 'unarmored-barbarian';

export interface ArmorClassInput {
    equipment: (string | CharacterItem)[];
    modifiers: { dex: number; con: number; wis: number; cha: number };
    /** From class features (Unarmored Defense). */
    unarmoredMethod: UnarmoredMethod;
    /** Species traits: Natural Armor (Lizardfolk), Natural Armor (Shell) (Tortle). */
    traits: string[];
    /** Draconic Sorcery level 3+: 10 + DEX + CHA without armor. */
    draconicResilience: boolean;
    fightingStyles: string[];
}

export interface ArmorClassResult {
    value: number;
    /** Human-readable parts, e.g. ["Chain Mail 16", "Shield +2", "Defense +1"]. */
    parts: string[];
}

function formatMod(m: number): string {
    return m >= 0 ? `+${m}` : `${m}`;
}

/** Armor Class from equipped armor/shield, Unarmored Defense, species traits and Defense (2024 rules). */
export function calculateArmorClass(input: ArmorClassInput): ArmorClassResult {
    const { modifiers, unarmoredMethod, traits, draconicResilience, fightingStyles } = input;
    const dexPart = (cap?: number) => {
        const dex = cap === undefined ? modifiers.dex : Math.min(modifiers.dex, cap);
        return `DEX ${formatMod(dex)}${cap !== undefined && modifiers.dex > cap ? ` (max ${formatMod(cap)})` : ''}`;
    };

    const equipped = input.equipment
        .map((item) => (typeof item === 'string' ? { name: item } as CharacterItem : item))
        .filter((item) => item.equipped);
    const armor = equipped.find((i) => i.category === 'armor' || (i as any).type === 'armor');
    const shield = equipped.find((i) => i.category === 'shield' || (i as any).type === 'shield');

    let value: number;
    let parts: string[];

    if (armor) {
        const base = armor.baseAC ?? 11;
        const name = armor.name || 'Armor';
        if (armor.armorMethod === 'heavy') {
            value = base;
            parts = [`${name} ${base}`];
        } else if (armor.armorMethod === 'medium') {
            value = base + Math.min(modifiers.dex, 2);
            parts = [`${name} ${base}`, dexPart(2)];
        } else {
            value = base + modifiers.dex;
            parts = [`${name} ${base}`, dexPart()];
        }
    } else if (traits.includes('Natural Armor (Shell)')) {
        // Tortle shell: base 17, Dexterity doesn't apply
        value = 17;
        parts = ['Shell 17'];
    } else if (unarmoredMethod === 'unarmored-monk' && !shield) {
        value = 10 + modifiers.dex + modifiers.wis;
        parts = ['Unarmored Defense 10', dexPart(), `WIS ${formatMod(modifiers.wis)}`];
    } else if (unarmoredMethod === 'unarmored-barbarian') {
        value = 10 + modifiers.dex + modifiers.con;
        parts = ['Unarmored Defense 10', dexPart(), `CON ${formatMod(modifiers.con)}`];
    } else if (draconicResilience) {
        value = 10 + modifiers.dex + modifiers.cha;
        parts = ['Draconic Resilience 10', dexPart(), `CHA ${formatMod(modifiers.cha)}`];
    } else {
        value = 10 + modifiers.dex;
        parts = ['Unarmored 10', dexPart()];
    }

    // Lizardfolk: 13 + DEX when that's better than the unarmored options
    if (!armor && traits.includes('Natural Armor') && 13 + modifiers.dex > value) {
        value = 13 + modifiers.dex;
        parts = ['Natural Armor 13', dexPart()];
    }

    if (shield) {
        value += shield.baseAC ?? 2;
        parts.push(`${shield.name || 'Shield'} +${shield.baseAC ?? 2}`);
    }

    // Defense fighting style: +1 while wearing armor
    if (armor && fightingStyles.includes('defense')) {
        value += 1;
        parts.push('Defense +1');
    }

    return { value, parts };
}
