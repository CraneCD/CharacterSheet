import type { CharacterItem } from './types';

/** "+1", "+2" or "+3" standing on its own in an item name ("Pistol, +1", "+2 Longbow", "Longsword (+1)"). */
const NAME_BONUS = /(?:^|[\s,(])\+([1-3])(?=$|[\s,)])/g;
/** SRD text of magic weapons: "You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon." */
const WEAPON_TEXT_BONUS = /\+([1-3]) bonus to attack (?:rolls )?and damage rolls made with this (?:magic )?weapon/i;
/** Magic armor and shields: "+1 bonus to AC while wearing this armor" / "... while holding this shield" */
const ARMOR_TEXT_BONUS = /\+([1-3]) bonus to (?:your )?(?:AC|Armor Class) while (?:you're |you are )?(?:wearing|holding|wielding) this (?:armor|shield)/i;

type BonusItem = Pick<CharacterItem, 'name' | 'description' | 'magicBonus'>;

function setBonus(item: BonusItem): number | undefined {
    return typeof item.magicBonus === 'number' && Number.isFinite(item.magicBonus)
        ? Math.max(0, Math.min(3, Math.round(item.magicBonus)))
        : undefined;
}

function bonusFrom(item: Pick<CharacterItem, 'name' | 'description'>, text: RegExp): number {
    const inName = Array.from(String(item.name || '').matchAll(NAME_BONUS), (m) => Number(m[1]));
    if (inName.length === 1) return inName[0];
    if (inName.length > 1) return 0;
    return Number(text.exec(String(item.description || ''))?.[1] ?? 0);
}

/**
 * A magic weapon's bonus to attack and damage rolls: the one set on the item, else read from its
 * name or rules text. Generic entries that list several ("Weapon, +1, +2, or +3") count as none.
 */
export function weaponMagicBonus(item: BonusItem): number {
    return setBonus(item) ?? detectedMagicBonus(item);
}

/** Magic armor or shield's bonus to AC ("Chain Mail, +1", "Shield +2"): set on the item, else from its name or text. */
export function armorMagicBonus(item: BonusItem): number {
    return setBonus(item) ?? detectedMagicBonus(item, 'armor');
}

/** The bonus the item's name or text implies, ignoring any set by hand. */
export function detectedMagicBonus(item: Pick<CharacterItem, 'name' | 'description'>, kind: 'weapon' | 'armor' = 'weapon'): number {
    return bonusFrom(item, kind === 'armor' ? ARMOR_TEXT_BONUS : WEAPON_TEXT_BONUS);
}
