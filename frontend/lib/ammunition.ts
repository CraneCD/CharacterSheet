import type { CharacterItem } from './types';

/**
 * Ammunition for ranged weapons: a weapon with the Ammunition property shoots a gear item
 * ("Arrows", quantity 20). The weapon stores the item's name in `ammunition`; when unset the
 * sheet finds the usual kind (bows use Arrows, crossbows Bolts, ...). Firing spends one.
 */

export const usesAmmunition = (weapon: Pick<CharacterItem, 'properties'>) =>
    (weapon.properties || []).some((p) => String(p).toLowerCase().startsWith('ammunition'));

/** What each kind of ranged weapon shoots, with the catalogue item to add when you have none. */
const AMMO_KINDS: { weapon: RegExp; ammo: RegExp; item: string; bundle: number }[] = [
    { weapon: /crossbow/i, ammo: /\bbolts?\b/i, item: 'Bolts', bundle: 20 },
    { weapon: /bow\b/i, ammo: /\barrows?\b/i, item: 'Arrows', bundle: 20 },
    { weapon: /\bsling\b/i, ammo: /\bsling bullets?\b|\bbullets?, sling\b/i, item: 'Bullets, Sling', bundle: 20 },
    { weapon: /\bblowgun\b/i, ammo: /\bneedles?\b/i, item: 'Needles', bundle: 50 },
    {
        weapon: /\b(pistol|musket|revolver|pepperbox|blunderbuss|rifle|bad news)\b/i,
        ammo: /\bfirearm bullets?\b|\bbullets?, firearm\b/i,
        item: 'Bullets, Firearm',
        bundle: 10,
    },
];

const AMMO_NAME = /\b(arrows?|bolts?|bullets?|needles?|ammunition)\b/i;

const asItem = (i: string | CharacterItem): CharacterItem => (typeof i === 'string' ? { name: i } : i);
const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

function kindOf(weapon: Pick<CharacterItem, 'name' | 'baseName'>) {
    const names = [weapon.baseName, weapon.name].filter(Boolean).map(String);
    return AMMO_KINDS.find((k) => names.some((n) => k.weapon.test(n)));
}

/** The catalogue ammunition a weapon normally uses and how many come in a bundle ("Arrows", 20). */
export function standardAmmunition(weapon: Pick<CharacterItem, 'name' | 'baseName'>): { item: string; bundle: number } | null {
    const kind = kindOf(weapon);
    return kind ? { item: kind.item, bundle: kind.bundle } : null;
}

/** Gear that can be ammunition (arrows, bolts, bullets, needles), with its index in the equipment list. */
export function ammunitionChoices(equipment: (string | CharacterItem)[]): { index: number; item: CharacterItem }[] {
    return (Array.isArray(equipment) ? equipment : [])
        .map((raw, index) => ({ index, item: asItem(raw) }))
        .filter(({ item }) => item.name && AMMO_NAME.test(item.name) && !usesAmmunition(item));
}

export interface WeaponAmmunition {
    /** Index of the ammunition in the equipment list */
    index: number;
    name: string;
    count: number;
}

/** The ammunition a weapon fires from your gear: the item it names, else the first of its usual kind. */
export function weaponAmmunition(weapon: CharacterItem, equipment: (string | CharacterItem)[]): WeaponAmmunition | null {
    if (!usesAmmunition(weapon) || weapon.ammunition === null) return null;
    const choices = ammunitionChoices(equipment);
    const chosen = weapon.ammunition
        ? choices.find(({ item }) => sameName(item.name, weapon.ammunition!))
        : choices.find(({ item }) => kindOf(weapon)?.ammo.test(item.name));
    if (!chosen) return null;
    return { index: chosen.index, name: chosen.item.name, count: Math.max(0, Number(chosen.item.quantity ?? 1) || 0) };
}
