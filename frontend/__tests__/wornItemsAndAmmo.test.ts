import { appliesToWeapon, describeWornBonus, detectedWornBonus, isWearable, wornBonus, wornSaveBonus } from '@/lib/wornItems';
import { ammunitionChoices, standardAmmunition, usesAmmunition, weaponAmmunition } from '@/lib/ammunition';
import { calculateArmorClass } from '@/lib/armorClass';
import { getWeaponAttacks } from '@/lib/attacks';
import { weaponRow } from '@/lib/actionRows';
import { planLongRest } from '@/lib/rest';
import type { CharacterItem } from '@/lib/types';

const SRD = {
    archery: 'Wondrous Item\nWhile wearing these bracers, you have proficiency with the Longbow and Shortbow, and you gain a +2 bonus to damage rolls made with such weapons.',
    cloak: 'Wondrous Item\nYou gain a +1 bonus to Armor Class and saving throws while you wear this cloak.',
    ring: 'Ring\nYou gain a +1 bonus to Armor Class and saving throws while wearing this ring.',
    defense: 'Wondrous Item\nWhile wearing these bracers, you gain a +2 bonus to Armor Class if you are wearing no armor and using no Shield.',
    luckstone: 'Wondrous Item\nWhile this polished agate is on your person, you gain a +1 bonus to ability checks and saving throws.',
};

const worn = (name: string, description: string, extra: Partial<CharacterItem> = {}): CharacterItem =>
    ({ name, description, category: 'magic-item', type: 'other', equipped: true, ...extra });

const longbow: CharacterItem = { name: 'Longbow', category: 'weapon', type: 'weapon', equipped: true, damage: '1d8', damageType: 'piercing', properties: ['ammunition (range 150/600)', 'heavy', 'two-handed'] };
const rapier: CharacterItem = { name: 'Rapier', category: 'weapon', type: 'weapon', equipped: true, damage: '1d8', damageType: 'piercing', properties: ['finesse'] };

describe('worn magic items', () => {
    it('reads bonuses from SRD item text', () => {
        expect(detectedWornBonus({ description: SRD.archery })).toEqual({ damage: 2, weapons: ['longbow', 'shortbow'] });
        expect(detectedWornBonus({ description: SRD.cloak })).toEqual({ ac: 1, saves: 1 });
        expect(detectedWornBonus({ description: SRD.ring })).toEqual({ ac: 1, saves: 1 });
        expect(detectedWornBonus({ description: SRD.defense })).toEqual({ ac: 2, unarmored: true });
        expect(detectedWornBonus({ description: SRD.luckstone })).toEqual({ saves: 1 });
        expect(detectedWornBonus({ description: 'While holding this wand, you gain a bonus to spell attack rolls.' })).toEqual({});
    });

    it('uses bonuses set by hand over the text', () => {
        expect(wornBonus(worn('Bracers of Archery', SRD.archery, { wornBonus: { attack: 1, damage: 2 } }))).toEqual({ attack: 1, damage: 2 });
        expect(wornBonus(worn('Bracers of Archery', SRD.archery, { wornBonus: null }))).toEqual({ damage: 2, weapons: ['longbow', 'shortbow'] });
        expect(describeWornBonus({ damage: 2, weapons: ['longbow', 'shortbow'] })).toBe('+2 damage with Longbow, Shortbow');
        expect(describeWornBonus({ ac: 1, saves: 1 })).toBe('+1 AC, +1 saving throws');
    });

    it('only magic items that are not weapons, armor or shields are worn for a bonus', () => {
        expect(isWearable(worn('Ring of Protection', SRD.ring))).toBe(true);
        expect(isWearable({ ...longbow, category: 'magic-item' })).toBe(false);
        expect(isWearable({ name: 'Rope', category: 'miscellaneous' })).toBe(false);
    });

    it('Bracers of Archery add damage to bows only, while worn', () => {
        const bracers = worn('Bracers of Archery', SRD.archery);
        const [bow, sword] = getWeaponAttacks({ equipment: [longbow, rapier, bracers], strMod: 0, dexMod: 3, profBonus: 2 });
        expect(bow.toHit).toBe(5);
        expect(bow.damageMod).toBe(3 + 2);
        expect(bow.itemBonuses).toEqual([{ name: 'Bracers of Archery', attack: 0, damage: 2 }]);
        expect(sword.damageMod).toBe(3);
        expect(weaponRow(bow, 0, false, null).facts).toContainEqual(['Bracers of Archery', '+2 damage (included)']);

        const [unworn] = getWeaponAttacks({ equipment: [longbow, { ...bracers, equipped: false }], strMod: 0, dexMod: 3, profBonus: 2 });
        expect(unworn.damageMod).toBe(3);
    });

    it('matches magic bows by name or what they are made from', () => {
        const bonus = { damage: 2, weapons: ['longbow', 'shortbow'] };
        expect(appliesToWeapon(bonus, { name: 'Longbow, +1' })).toBe(true);
        expect(appliesToWeapon(bonus, { name: 'Oathbow', baseName: 'Longbow' })).toBe(true);
        expect(appliesToWeapon(bonus, { name: 'Crossbow, Light' })).toBe(false);
        expect(appliesToWeapon({ attack: 1 }, { name: 'Club' })).toBe(true);
    });

    it('adds AC and saving throw bonuses; Bracers of Defense only without armor or shield', () => {
        const base = { modifiers: { dex: 2, con: 0, wis: 0, cha: 0 }, unarmoredMethod: 'standard' as const, traits: [], draconicResilience: false, fightingStyles: [] };
        const ring = worn('Ring of Protection', SRD.ring);
        const bracers = worn('Bracers of Defense', SRD.defense);
        const shield: CharacterItem = { name: 'Shield', type: 'shield', baseAC: 2, equipped: true };

        const unarmored = calculateArmorClass({ ...base, equipment: [ring, bracers] });
        expect(unarmored.value).toBe(12 + 1 + 2);
        expect(unarmored.parts).toEqual(['Unarmored 10', 'DEX +2', 'Ring of Protection +1', 'Bracers of Defense +2']);
        expect(calculateArmorClass({ ...base, equipment: [ring, bracers, shield] }).value).toBe(12 + 2 + 1);

        expect(wornSaveBonus([ring, worn('Cloak of Protection', SRD.cloak), { ...ring, equipped: false }]))
            .toEqual({ total: 2, sources: ['Ring of Protection +1', 'Cloak of Protection +1'] });
    });
});

describe('Mage Armor', () => {
    const base = { modifiers: { dex: 3, con: 0, wis: 2, cha: 0 }, unarmoredMethod: 'standard' as const, traits: [], draconicResilience: false, fightingStyles: [] };

    it('makes base AC 13 + DEX while unarmored, and still allows a shield', () => {
        expect(calculateArmorClass({ ...base, equipment: [], mageArmor: true })).toEqual({ value: 16, parts: ['Mage Armor 13', 'DEX +3'] });
        const shield: CharacterItem = { name: 'Shield', type: 'shield', baseAC: 2, equipped: true };
        expect(calculateArmorClass({ ...base, equipment: [shield], mageArmor: true }).value).toBe(18);
    });

    it('does nothing while wearing armor, or when another base AC is better', () => {
        const leather: CharacterItem = { name: 'Leather Armor', type: 'armor', armorMethod: 'light', baseAC: 11, equipped: true };
        expect(calculateArmorClass({ ...base, equipment: [leather], mageArmor: true }).value).toBe(14);
        // Monk: 10 + 3 + 2 = 15 vs 13 + 3 = 16 -> Mage Armor; with WIS +4, Unarmored Defense wins
        expect(calculateArmorClass({ ...base, unarmoredMethod: 'unarmored-monk', equipment: [], mageArmor: true }).value).toBe(16);
        const wiseMonk = { ...base, modifiers: { ...base.modifiers, wis: 4 }, unarmoredMethod: 'unarmored-monk' as const };
        expect(calculateArmorClass({ ...wiseMonk, equipment: [], mageArmor: true }).parts[0]).toBe('Unarmored Defense 10');
    });

    it('ends on a Long Rest', () => {
        const plan = planLongRest({ hp: { current: 5, max: 5, temp: 0 }, mageArmor: true }, { warlockLevel: 0, multiclass: false });
        expect(plan.updates.mageArmor).toBe(false);
        expect(plan.summary).toContain('Mage Armor ended');
        expect(planLongRest({ hp: { current: 5, max: 5, temp: 0 } }, { warlockLevel: 0, multiclass: false }).updates).not.toHaveProperty('mageArmor');
    });
});

describe('ammunition', () => {
    const arrows: CharacterItem = { name: 'Arrows', category: 'miscellaneous', type: 'other', quantity: 20 };
    const bolts: CharacterItem = { name: 'Bolts', category: 'miscellaneous', type: 'other', quantity: 10 };
    const crossbow: CharacterItem = { name: 'Crossbow, Light', category: 'weapon', type: 'weapon', equipped: true, damage: '1d8', properties: ['ammunition (range 80/320)', 'loading', 'two-handed'] };

    it('knows which weapons use ammunition and what they normally shoot', () => {
        expect(usesAmmunition(longbow)).toBe(true);
        expect(usesAmmunition(rapier)).toBe(false);
        expect(standardAmmunition(longbow)).toEqual({ item: 'Arrows', bundle: 20 });
        expect(standardAmmunition(crossbow)).toEqual({ item: 'Bolts', bundle: 20 });
        expect(standardAmmunition({ name: 'Sling' })).toEqual({ item: 'Bullets, Sling', bundle: 20 });
        expect(standardAmmunition({ name: 'Flame Bow', baseName: 'Shortbow' })).toEqual({ item: 'Arrows', bundle: 20 });
    });

    it('finds the usual ammunition in your gear, or the one chosen', () => {
        const gear = [longbow, crossbow, 'Rope', arrows, bolts, { name: 'Arrows of Slaying', category: 'magic-item' as const, quantity: 2 }];
        expect(ammunitionChoices(gear).map((c) => c.item.name)).toEqual(['Arrows', 'Bolts', 'Arrows of Slaying']);
        expect(weaponAmmunition(longbow, gear)).toEqual({ index: 3, name: 'Arrows', count: 20 });
        expect(weaponAmmunition(crossbow, gear)).toEqual({ index: 4, name: 'Bolts', count: 10 });
        expect(weaponAmmunition({ ...longbow, ammunition: 'arrows of slaying' }, gear)).toEqual({ index: 5, name: 'Arrows of Slaying', count: 2 });
        expect(weaponAmmunition({ ...longbow, ammunition: null }, gear)).toBeNull();
        expect(weaponAmmunition({ ...longbow, ammunition: '' }, gear)?.name).toBe('Arrows');
        expect(weaponAmmunition(rapier, gear)).toBeNull();
        expect(weaponAmmunition(longbow, [longbow, bolts])).toBeNull();
    });

    it('puts the ammunition on the weapon row', () => {
        const [bow] = getWeaponAttacks({ equipment: [longbow, { ...arrows, quantity: 0 }], strMod: 0, dexMod: 3, profBonus: 2 });
        expect(bow.ammo).toEqual({ index: 1, name: 'Arrows', count: 0 });
        expect(weaponRow(bow, 0, false, null).ammo).toEqual({ index: 1, name: 'Arrows', count: 0 });
    });
});
