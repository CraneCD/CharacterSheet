import { armorPenalties, hasStealthDisadvantage, strengthRequirement } from '@/lib/armorPenalties';
import { composeMagicItem } from '@/lib/itemComposition';
import { CharacterItem } from '@/lib/types';

const chainMail: CharacterItem = {
    name: 'Chain Mail', category: 'armor', armorMethod: 'heavy', baseAC: 16, strengthRequirement: 13, stealthDisadvantage: true,
};
const leather: CharacterItem = { name: 'Leather Armor', category: 'armor', armorMethod: 'light', baseAC: 11 };

describe('armor penalties', () => {
    it('gives Disadvantage on Stealth only while the armor is worn', () => {
        expect(armorPenalties([{ ...chainMail, equipped: true }], 16).stealthDisadvantage).toEqual(['Chain Mail']);
        expect(armorPenalties([chainMail], 16).stealthDisadvantage).toEqual([]);
        expect(armorPenalties([{ ...leather, equipped: true }, 'Rope'], 10).stealthDisadvantage).toEqual([]);
    });

    it('reads the 2024 armor table for items saved without the flag, but the flag wins', () => {
        expect(hasStealthDisadvantage({ name: 'Plate Armor', category: 'armor' })).toBe(true);
        expect(hasStealthDisadvantage({ name: 'plate armor', type: 'armor' })).toBe(true);
        expect(hasStealthDisadvantage({ name: 'Plate Armor', category: 'armor', stealthDisadvantage: false })).toBe(false);
        expect(hasStealthDisadvantage({ name: 'Studded Leather Armor', category: 'armor' })).toBe(false);
        expect(strengthRequirement({ name: 'Splint Armor', category: 'armor' })).toBe(15);
        expect(strengthRequirement({ name: 'Shield', category: 'shield' })).toBeNull();
    });

    it('slows you by 10 ft. when you lack the Strength for your armor', () => {
        expect(armorPenalties([{ ...chainMail, equipped: true }], 12)).toMatchObject({ speedPenalty: 10, speedReason: 'Chain Mail needs Str 13' });
        expect(armorPenalties([{ ...chainMail, equipped: true }], 13).speedPenalty).toBe(0);
        expect(armorPenalties([chainMail], 8).speedPenalty).toBe(0);
    });

    it("drops both for Mithral armor", () => {
        const mithral: CharacterItem = {
            name: 'Mithral Armor', category: 'armor', overrides: { stealthDisadvantage: false, strengthRequirement: null },
        };
        const plate = composeMagicItem(mithral, { name: 'Plate Armor', category: 'armor', armorMethod: 'heavy', baseAC: 18, strengthRequirement: 15, stealthDisadvantage: true }, true);
        expect(armorPenalties([{ ...plate, equipped: true }], 8)).toEqual({ stealthDisadvantage: [], speedPenalty: 0 });
    });
});
