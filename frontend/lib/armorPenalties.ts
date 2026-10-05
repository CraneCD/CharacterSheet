/** What worn armor costs you (2024 rules): Disadvantage on Stealth, and Speed when you lack its Strength. */
import { CharacterItem } from './types';

/** 2024 armor with Stealth Disadvantage, for items saved without the flag (custom or older entries). */
const STEALTH_DISADVANTAGE_ARMOR = ['padded armor', 'scale mail', 'half plate', 'half plate armor', 'ring mail', 'chain mail', 'splint armor', 'plate armor'];

/** Strength requirements of the 2024 armor table, for items saved without one. */
const STRENGTH_REQUIREMENT: Record<string, number> = { 'chain mail': 13, 'splint armor': 15, 'plate armor': 15 };

const isArmor = (item: CharacterItem) => item.category === 'armor' || item.type === 'armor';

/** True when this armor imposes Disadvantage on Dexterity (Stealth) checks; the item's own flag wins. */
export function hasStealthDisadvantage(item: CharacterItem): boolean {
    if (typeof item.stealthDisadvantage === 'boolean') return item.stealthDisadvantage;
    return isArmor(item) && STEALTH_DISADVANTAGE_ARMOR.includes((item.name || '').trim().toLowerCase());
}

/** The Strength score this armor needs to not slow you down, if any. */
export function strengthRequirement(item: CharacterItem): number | null {
    if (item.strengthRequirement !== undefined) return item.strengthRequirement || null;
    if (item.overrides?.strengthRequirement === null) return null;
    return isArmor(item) ? STRENGTH_REQUIREMENT[(item.name || '').trim().toLowerCase()] ?? null : null;
}

export interface ArmorPenalties {
    /** Equipped armor giving Disadvantage on Stealth checks (names, for the roll's reasons) */
    stealthDisadvantage: string[];
    /** Feet of Speed lost to armor you aren't strong enough for (0 or 10) */
    speedPenalty: number;
    /** e.g. "Plate Armor needs Str 15" */
    speedReason?: string;
}

/** Penalties from the character's equipped armor, given their Strength score. */
export function armorPenalties(equipment: (string | CharacterItem)[], strengthScore: number): ArmorPenalties {
    const worn = equipment.filter((i): i is CharacterItem => typeof i === 'object' && !!i && !!i.equipped && isArmor(i));
    const stealthDisadvantage = worn.filter(hasStealthDisadvantage).map((i) => i.name || 'Armor');
    const heavy = worn.find((i) => {
        const needed = strengthRequirement(i);
        return needed !== null && strengthScore < needed;
    });
    return heavy
        ? { stealthDisadvantage, speedPenalty: 10, speedReason: `${heavy.name || 'Armor'} needs Str ${strengthRequirement(heavy)}` }
        : { stealthDisadvantage, speedPenalty: 0 };
}
