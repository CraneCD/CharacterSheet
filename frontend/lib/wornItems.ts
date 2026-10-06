import type { CharacterItem, WornBonus } from './types';

/**
 * Bonuses from worn or held magic items (Ring of Protection, Bracers of Archery, ...): to AC,
 * saving throws, and attack or damage rolls with some or all weapons. Weapons, armor and shields
 * have their own magic bonus (lib/magicBonus); these are the other items you equip.
 */

const isGear = (i: CharacterItem) =>
    i.category === 'weapon' || i.category === 'armor' || i.category === 'shield'
    || i.type === 'weapon' || i.type === 'armor' || i.type === 'shield';

/** Items that can be worn for a bonus: magic items that aren't weapons, armor or shields. */
export function isWearable(item: CharacterItem): boolean {
    return item.category === 'magic-item' && !isGear(item);
}

const num = (m: RegExpExecArray | null) => (m ? Number(m[1]) : 0);

/** "the Longbow and Shortbow" / "Longbows, Shortbows, and Slings" -> ["longbow", "shortbow"] */
function weaponList(text: string): string[] {
    return text
        .replace(/^the\s+/i, '')
        .split(/,\s*(?:and\s+)?|\s+and\s+/)
        .map((w) => w.trim().toLowerCase().replace(/^the\s+/, ''))
        .filter(Boolean);
}

/**
 * The bonuses an item's rules text describes (SRD 5.2 wording):
 * "+1 bonus to Armor Class and saving throws while you wear this cloak",
 * "+2 bonus to Armor Class if you are wearing no armor and using no Shield",
 * "proficiency with the Longbow and Shortbow, and you gain a +2 bonus to damage rolls made with such weapons".
 */
export function detectedWornBonus(item: Pick<CharacterItem, 'description'>): WornBonus {
    const text = String(item.description || '').replace(/\s+/g, ' ');
    const bonus: WornBonus = {};

    const ac = num(/\+([1-5]) bonus to (?:your )?(?:Armor Class|AC)\b/i.exec(text));
    if (ac) {
        bonus.ac = ac;
        if (/wearing no armor and using no shield/i.test(text)) bonus.unarmored = true;
    }
    const saves = num(/\+([1-5]) bonus to (?:(?:your )?(?:Armor Class|AC|ability checks) and )?saving throws/i.exec(text));
    if (saves) bonus.saves = saves;

    const weapon = /\+([1-5]) bonus to (attack and damage|attack|damage) rolls made with (such weapons|(?:a |any )?weapons?)/i.exec(text);
    if (weapon) {
        const n = Number(weapon[1]);
        if (weapon[2].toLowerCase() !== 'damage') bonus.attack = n;
        if (weapon[2].toLowerCase() !== 'attack') bonus.damage = n;
        if (/^such/i.test(weapon[3])) {
            const proficient = /proficiency with ((?:the )?[A-Z][\w ,]*?)(?:,? and you gain|\.)/.exec(text);
            if (proficient) bonus.weapons = weaponList(proficient[1]);
        }
    }
    return bonus;
}

/** The bonuses the item gives: set by hand in the Gear tab, else read from its text. */
export function wornBonus(item: CharacterItem): WornBonus {
    return item.wornBonus ?? detectedWornBonus(item);
}

export const hasWornBonus = (b: WornBonus) => !!(b.ac || b.saves || b.attack || b.damage);

const signed = (n: number) => (n >= 0 ? `+${n}` : `${n}`);
const titleCase = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());

/** "+1 AC, +1 saves" / "+2 damage with Longbow, Shortbow" */
export function describeWornBonus(b: WornBonus): string {
    const parts: string[] = [];
    if (b.ac) parts.push(`${signed(b.ac)} AC${b.unarmored ? ' (no armor or shield)' : ''}`);
    if (b.saves) parts.push(`${signed(b.saves)} saving throws`);
    const weaponParts: string[] = [];
    if (b.attack) weaponParts.push(`${signed(b.attack)} attack`);
    if (b.damage) weaponParts.push(`${signed(b.damage)} damage`);
    if (weaponParts.length > 0) {
        const only = b.weapons && b.weapons.length > 0 ? ` with ${b.weapons.map(titleCase).join(', ')}` : ' with weapons';
        parts.push(`${weaponParts.join(' and ')}${only}`);
    }
    return parts.join(', ');
}

export interface WornEffect {
    name: string;
    bonus: WornBonus;
}

/** Equipped items that give a bonus while worn, with what they give. */
export function wornEffects(equipment: (string | CharacterItem)[]): WornEffect[] {
    return (Array.isArray(equipment) ? equipment : [])
        .filter((i): i is CharacterItem => typeof i === 'object' && !!i && !!i.equipped && isWearable(i))
        .map((i) => ({ name: i.name, bonus: wornBonus(i) }))
        .filter((e) => hasWornBonus(e.bonus));
}

/** Total bonus to saving throws from worn items, and where it comes from. */
export function wornSaveBonus(equipment: (string | CharacterItem)[]): { total: number; sources: string[] } {
    const effects = wornEffects(equipment).filter((e) => e.bonus.saves);
    return {
        total: effects.reduce((sum, e) => sum + (e.bonus.saves || 0), 0),
        sources: effects.map((e) => `${e.name} ${signed(e.bonus.saves!)}`),
    };
}

/** Whether a worn item's weapon bonus applies to this weapon (by its name or what it's made from). */
export function appliesToWeapon(bonus: WornBonus, weapon: Pick<CharacterItem, 'name' | 'baseName'>): boolean {
    if (!bonus.weapons || bonus.weapons.length === 0) return true;
    const kinds = [weapon.name, weapon.baseName].filter(Boolean).map((n) => String(n).toLowerCase());
    // "Longbow" matches "Longbow", "Longbow, +1" and "Oathbow (Longbow)"
    return bonus.weapons.some((w) => kinds.some((k) => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(k)));
}
