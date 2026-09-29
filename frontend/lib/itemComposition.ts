/**
 * Magic weapons, armor and shields on top of a mundane base item: "Flame Tongue" + Longsword attacks
 * like a longsword; "Mithral Armor" + Chain Mail gives chain mail's AC without Stealth Disadvantage.
 * The chosen base's stats are copied onto the owned item, so attacks and AC read it like any weapon
 * or armor; the magic item keeps its name, text, rarity and bonus.
 */
import type { AppliesTo, CharacterItem } from './types';

type Kind = AppliesTo['kind'];

/** Base-item stats a magic item takes from what it's made from. */
const STAT_FIELDS = [
    'type', 'damage', 'damageType', 'properties', 'mastery', 'weaponCategory',
    'armorMethod', 'baseAC', 'strengthRequirement', 'stealthDisadvantage', 'weight',
] as const;

const kindOf = (item: Pick<CharacterItem, 'type' | 'category'>): Kind | undefined => {
    const t = item.type || item.category;
    return t === 'weapon' || t === 'armor' || t === 'shield' ? t : undefined;
};

/** A magic weapon, armor or shield (as opposed to a mundane one or other magic items). */
export function isMagicGear(item: Pick<CharacterItem, 'category' | 'type'>): boolean {
    return item.category === 'magic-item' && !!kindOf(item);
}

/** Mundane weapons, armor and shields in the catalogue: what magic items are made from. */
export function mundaneBases(catalogue: CharacterItem[]): CharacterItem[] {
    return catalogue.filter((i) => (i.category === 'weapon' || i.category === 'armor' || i.category === 'shield') && !i.legacy);
}

const isRangedWeapon = (item: CharacterItem) => (item.properties || []).some((p) => String(p).toLowerCase().includes('ammunition'));

function fits(base: CharacterItem, applies: AppliesTo): boolean {
    if (base.category !== applies.kind) return false;
    if (applies.names?.length && !applies.names.includes(base.name)) return false;
    if (applies.melee && isRangedWeapon(base)) return false;
    if (applies.ranged && !isRangedWeapon(base)) return false;
    if (applies.armorMethods?.length && !applies.armorMethods.includes(base.armorMethod as 'light')) return false;
    if (applies.except?.includes(base.name)) return false;
    return true;
}

/** The base items a magic item can be made from (any of its kind when the catalogue doesn't say). */
export function baseCandidates(item: CharacterItem, catalogue: CharacterItem[]): CharacterItem[] {
    const kind = item.appliesTo?.kind ?? kindOf(item);
    if (!kind) return [];
    return mundaneBases(catalogue).filter((b) => fits(b, item.appliesTo ?? { kind }));
}

const hasOwnStats = (item: CharacterItem) => (kindOf(item) === 'weapon' ? !!item.damage : kindOf(item) === 'armor' ? item.baseAC != null : true);

/**
 * Whether adding this catalogue item means choosing what it's made from: magic weapons, armor and
 * shields that aren't already a specific item (like "Longsword, +1"), unless the catalogue gives an
 * item its own stats and no base list.
 */
export function needsBase(item: CharacterItem): boolean {
    if (!isMagicGear(item) || item.baseName) return false;
    if (/^ammunition/i.test(item.name)) return false;
    return !(hasOwnStats(item) && !item.appliesTo?.names?.length);
}

/** "Flame Tongue" + Longsword → "Flame Tongue (Longsword)"; items that can only be one thing keep their name. */
export function composedName(magicName: string, baseName: string, onlyOption: boolean): string {
    return onlyOption || magicName.toLowerCase().includes(baseName.toLowerCase()) ? magicName : `${magicName} (${baseName})`;
}

/** The magic item made from `base`: the base's stats, the magic item's name, text, rarity, bonus and changes. */
export function composeMagicItem(magic: CharacterItem, base: CharacterItem, onlyOption: boolean): CharacterItem {
    const stats: Partial<CharacterItem> = {};
    for (const field of STAT_FIELDS) {
        if (base[field] !== undefined) (stats as Record<string, unknown>)[field] = base[field];
    }
    const out: CharacterItem = {
        ...magic,
        ...stats,
        name: composedName(magic.name, base.name, onlyOption),
        baseName: base.name,
    };
    if (magic.overrides?.stealthDisadvantage === false) out.stealthDisadvantage = false;
    if (magic.overrides?.strengthRequirement === null) delete out.strengthRequirement;
    delete (out as { id?: string }).id;
    return out;
}

/**
 * Fields to save when an owned magic item is (re)made from another base ("Made from" in the Gear
 * tab): the new base's stats and name, keeping everything the player set (equipped, quantity, bonus).
 */
export function remakeFrom(item: CharacterItem, base: CharacterItem, liveMagic?: CharacterItem): Partial<CharacterItem> {
    const magicName = liveMagic?.name ?? (item.baseName && item.name.endsWith(` (${item.baseName})`)
        ? item.name.slice(0, -` (${item.baseName})`.length)
        : item.name);
    const composed = composeMagicItem({ ...item, name: magicName, overrides: liveMagic?.overrides ?? item.overrides }, base, false);
    const updates: Partial<CharacterItem> = { name: composed.name, baseName: base.name };
    for (const field of STAT_FIELDS) {
        (updates as Record<string, unknown>)[field] = composed[field] ?? null;
    }
    return updates;
}

/** The name to show for an owned item whose catalogue entry was renamed: keeps "(Longsword)" on made-from items. */
export function liveName(item: CharacterItem, live: CharacterItem): string {
    if (item.baseName && !live.baseName && item.name.endsWith(` (${item.baseName})`)) return `${live.name} (${item.baseName})`;
    return live.name;
}
