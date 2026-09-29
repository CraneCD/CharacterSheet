import type { CharacterItem } from './types';

/** "+1", "+2" or "+3" standing on its own in an item name ("Pistol, +1", "+2 Longbow", "Longsword (+1)"). */
const NAME_BONUS = /(?:^|[\s,(])\+([1-3])(?=$|[\s,)])/g;
/** SRD text of magic weapons: "You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon." */
const TEXT_BONUS = /\+([1-3]) bonus to attack (?:rolls )?and damage rolls made with this (?:magic )?weapon/i;

/**
 * A magic weapon's bonus to attack and damage rolls: the one set on the item, else read from its
 * name or rules text. Generic entries that list several ("Weapon, +1, +2, or +3") count as none.
 */
export function weaponMagicBonus(item: Pick<CharacterItem, 'name' | 'description' | 'magicBonus'>): number {
    if (typeof item.magicBonus === 'number' && Number.isFinite(item.magicBonus)) {
        return Math.max(0, Math.min(3, Math.round(item.magicBonus)));
    }
    return detectedMagicBonus(item);
}

/** The bonus the item's name or text implies, ignoring any set by hand. */
export function detectedMagicBonus(item: Pick<CharacterItem, 'name' | 'description'>): number {
    const inName = Array.from(String(item.name || '').matchAll(NAME_BONUS), (m) => Number(m[1]));
    if (inName.length === 1) return inName[0];
    if (inName.length > 1) return 0;
    return Number(TEXT_BONUS.exec(String(item.description || ''))?.[1] ?? 0);
}
