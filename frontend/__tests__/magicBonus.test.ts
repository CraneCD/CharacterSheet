import { armorMagicBonus, detectedMagicBonus, shieldBaseAC, weaponMagicBonus } from '@/lib/magicBonus';
import { calculateArmorClass } from '@/lib/armorClass';
import { getWeaponAttacks } from '@/lib/attacks';
import { weaponRow } from '@/lib/actionRows';

const pistol = { name: 'Pistol', type: 'weapon' as const, equipped: true, damage: '1d10', damageType: 'piercing', properties: ['ammunition (range 30/90)', 'loading'] };

describe('magic weapon bonus', () => {
    it('reads the bonus from the name or the rules text', () => {
        expect(detectedMagicBonus({ name: 'Pistol, +1' })).toBe(1);
        expect(detectedMagicBonus({ name: '+2 Longbow' })).toBe(2);
        expect(detectedMagicBonus({ name: 'Longsword (+3)' })).toBe(3);
        expect(detectedMagicBonus({ name: 'Dagger of Venom', description: 'Weapon (Dagger)\nYou gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.' })).toBe(1);
        expect(detectedMagicBonus({ name: 'Weapon, +1, +2, or +3' })).toBe(0);
        expect(detectedMagicBonus({ name: 'Longsword' })).toBe(0);
        expect(detectedMagicBonus({ name: 'Rod +10' })).toBe(0);
    });

    it('uses the bonus set on the item over the name, including None', () => {
        expect(weaponMagicBonus({ name: 'Pistol, +1', magicBonus: 2 })).toBe(2);
        expect(weaponMagicBonus({ name: 'Pistol, +1', magicBonus: 0 })).toBe(0);
        expect(weaponMagicBonus({ name: 'Pistol, +1', magicBonus: null })).toBe(1);
        expect(weaponMagicBonus({ name: 'Club', magicBonus: 9 })).toBe(3);
    });

    it('adds to attack and damage rolls, with Archery on top', () => {
        const [plain, magic] = getWeaponAttacks({
            equipment: [pistol, { ...pistol, name: 'Pistol, +1' }],
            strMod: 1, dexMod: 4, profBonus: 3, fightingStyles: ['archery'],
        });
        expect([plain.toHit, plain.damageMod, plain.magicBonus]).toEqual([9, 4, 0]);
        expect([magic.toHit, magic.damageMod, magic.magicBonus]).toEqual([10, 5, 1]);
        expect(weaponRow(magic, 1, false, null).facts).toContainEqual(['Magic weapon', '+1 to attack and damage rolls (included)']);
    });

    it('keeps an off-hand weapon’s magic bonus on damage without Two-Weapon Fighting', () => {
        const dagger = { name: 'Dagger', type: 'weapon' as const, equipped: true, damage: '1d4', properties: ['finesse', 'light'] };
        const [, offHand] = getWeaponAttacks({ equipment: [dagger, { ...dagger, name: 'Dagger +2' }], strMod: 0, dexMod: 3, profBonus: 2 });
        expect([offHand.toHit, offHand.damageMod]).toEqual([7, 2]);
    });
});

describe('magic armor and shields', () => {
    const base = { modifiers: { dex: 3, con: 0, wis: 0, cha: 0 }, unarmoredMethod: 'standard' as const, traits: [], draconicResilience: false, fightingStyles: [] };
    const chain = { name: 'Chain Mail', type: 'armor' as const, armorMethod: 'heavy' as const, baseAC: 16, equipped: true };
    const shield = { name: 'Shield', type: 'shield' as const, baseAC: 2, equipped: true };

    it('reads armor bonuses from names and text, not weapon text', () => {
        expect(armorMagicBonus({ name: 'Chain Mail, +1' })).toBe(1);
        expect(armorMagicBonus({ name: 'Shield +2' })).toBe(2);
        expect(armorMagicBonus({ name: 'Armor, +1, +2, or +3' })).toBe(0);
        expect(armorMagicBonus({ name: 'Warded Plate', description: 'You gain a +1 bonus to AC while wearing this armor.' })).toBe(1);
        expect(armorMagicBonus({ name: 'Odd Shield', description: 'You gain a +1 bonus to attack rolls and damage rolls made with this magic weapon.' })).toBe(0);
        expect(detectedMagicBonus({ name: 'Warded Plate', description: 'You gain a +1 bonus to AC while wearing this armor.' })).toBe(0);
    });

    it('adds magic armor and shield bonuses to AC, and shows them in the breakdown', () => {
        const ac = calculateArmorClass({ ...base, equipment: [{ ...chain, name: 'Chain Mail, +1' }, { ...shield, name: 'Shield, +2' }] });
        expect(ac.value).toBe(16 + 1 + 2 + 2);
        expect(ac.parts).toEqual(['Chain Mail, +1 16', 'Magic armor +1', 'Shield, +2 +2', 'Magic shield +2']);
    });

    it('uses the bonus set on the item, and ignores unequipped magic armor', () => {
        expect(calculateArmorClass({ ...base, equipment: [{ ...chain, name: 'Chain Mail, +1', magicBonus: 0 }] }).value).toBe(16);
        expect(calculateArmorClass({ ...base, equipment: [{ ...chain, magicBonus: 3 }] }).value).toBe(19);
        expect(calculateArmorClass({ ...base, equipment: [{ ...chain, name: 'Plate, +3', equipped: false }] }).value).toBe(13);
    });

    it('adds a magic shield to unarmored AC', () => {
        const ac = calculateArmorClass({ ...base, unarmoredMethod: 'unarmored-barbarian', equipment: [{ ...shield, name: 'Shield +1' }] });
        expect(ac.value).toBe(10 + 3 + 0 + 2 + 1);
    });
});

describe('the generic magic shield', () => {
    const base = { modifiers: { dex: 2, con: 0, wis: 0, cha: 0 }, unarmoredMethod: 'standard' as const, traits: [], draconicResilience: false, fightingStyles: [] };
    const generic = { name: 'Shield, +1, +2, +3', type: 'shield' as const, equipped: true };

    it('is a plain shield until a bonus is picked', () => {
        expect(calculateArmorClass({ ...base, equipment: [{ ...generic, baseAC: 2 }] }).value).toBe(12 + 2);
        expect(calculateArmorClass({ ...base, equipment: [{ ...generic, baseAC: 2, magicBonus: 2 }] }).value).toBe(12 + 2 + 2);
    });

    it('keeps an old copy’s 3 AC, and doesn’t count its built-in +1 twice once a bonus is picked', () => {
        const old = { ...generic, baseAC: 3 };
        expect(calculateArmorClass({ ...base, equipment: [old] }).value).toBe(12 + 3);
        const picked = calculateArmorClass({ ...base, equipment: [{ ...old, magicBonus: 1 }] });
        expect(picked.value).toBe(12 + 2 + 1);
        expect(picked.parts).toEqual(['Unarmored 10', 'DEX +2', 'Shield, +1, +2, +3 +2', 'Magic shield +1']);
        expect(shieldBaseAC({ name: 'Tower Shield', baseAC: 3, magicBonus: 1 })).toBe(3);
    });
});
