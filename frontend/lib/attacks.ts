import { CharacterItem } from './types';

/** One equipped weapon's attack: to-hit, damage and the notes that go with it. */
export interface WeaponAttack {
    name: string;
    toHit: number;
    /** Damage dice, e.g. "1d8" */
    damage: string;
    damageMod: number;
    damageType?: string;
    properties: string[];
    ranged: boolean;
    /** Great Weapon Fighting: reroll 1s and 2s on damage */
    gwf: boolean;
    /** Sneak Attack dice this weapon qualifies for (finesse or ranged), else 0 */
    sneakAttackDice: number;
    /** The item's own mastery property id, if it names one */
    mastery?: string;
}

export interface WeaponAttackInput {
    equipment: (string | CharacterItem)[];
    strMod: number;
    dexMod: number;
    profBonus: number;
    fightingStyles?: string[];
    rogueLevel?: number;
}

const prop = (w: CharacterItem, test: (p: string) => boolean) => (w.properties || []).some((p) => test(String(p).toLowerCase()));
const isRanged = (w: CharacterItem) => prop(w, (p) => p.includes('ammunition'));
const isFinesse = (w: CharacterItem) => prop(w, (p) => p === 'finesse');
const isLight = (w: CharacterItem) => prop(w, (p) => p === 'light');
const isTwoHandedOrVersatile = (w: CharacterItem) => prop(w, (p) => p === 'two-handed' || p.startsWith('versatile'));

/** Sneak Attack: 1d6 at Rogue 1-2, 2d6 at 3-4, 3d6 at 5-6, ... */
export const sneakAttackDice = (rogueLevel: number) => Math.ceil(rogueLevel / 2);

/** Equipped weapons as attacks, with fighting styles (Archery, Dueling, Two-Weapon, Great Weapon) applied. */
export function getWeaponAttacks({ equipment, strMod, dexMod, profBonus, fightingStyles = [], rogueLevel }: WeaponAttackInput): WeaponAttack[] {
    const weapons = (Array.isArray(equipment) ? equipment : [])
        .map((item) => (typeof item === 'string' ? { name: item } : item))
        .filter((item) => item.equipped && (item.type === 'weapon' || item.category === 'weapon')) as CharacterItem[];

    const has = (style: string) => fightingStyles.includes(style);
    const oneMeleeNoOther = weapons.length === 1 && !isRanged(weapons[0]);
    const twoLightMelee = weapons.length === 2 && weapons.every((w) => !isRanged(w) && isLight(w));
    const sneak = rogueLevel ? sneakAttackDice(rogueLevel) : 0;

    return weapons.map((weapon, index) => {
        const ranged = isRanged(weapon);
        const mod = isFinesse(weapon) ? Math.max(strMod, dexMod) : ranged ? dexMod : strMod;

        let toHit = mod + profBonus;
        if (has('archery') && ranged) toHit += 2;

        let damageMod = mod;
        if (has('dueling') && oneMeleeNoOther && !ranged) damageMod += 2;
        // The off-hand light weapon adds its modifier only with Two-Weapon Fighting
        if (twoLightMelee && index === 1) damageMod = has('two-weapon-fighting') ? mod : 0;

        return {
            name: weapon.name,
            toHit,
            damage: weapon.damage || '1d4',
            damageMod,
            damageType: weapon.damageType,
            properties: (weapon.properties || []).map(String),
            ranged,
            gwf: has('great-weapon-fighting') && isTwoHandedOrVersatile(weapon),
            sneakAttackDice: sneak > 0 && (isFinesse(weapon) || ranged) ? sneak : 0,
            mastery: weapon.mastery,
        };
    });
}
