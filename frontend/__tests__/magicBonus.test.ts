import { detectedMagicBonus, weaponMagicBonus } from '@/lib/magicBonus';
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
