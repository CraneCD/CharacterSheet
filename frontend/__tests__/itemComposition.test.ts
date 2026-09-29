import { baseCandidates, composeMagicItem, liveName, needsBase, remakeFrom } from '@/lib/itemComposition';
import { getWeaponAttacks } from '@/lib/attacks';
import { calculateArmorClass } from '@/lib/armorClass';
import { weaponRow } from '@/lib/actionRows';
import type { CharacterItem } from '@/lib/types';

const catalogue: CharacterItem[] = [
    { name: 'Longsword', category: 'weapon', type: 'weapon', damage: '1d8', damageType: 'slashing', properties: ['versatile (1d10)'], mastery: 'sap', weight: 3 },
    { name: 'Dagger', category: 'weapon', type: 'weapon', damage: '1d4', damageType: 'piercing', properties: ['finesse', 'light', 'thrown (range 20/60)'], mastery: 'nick' },
    { name: 'Longbow', category: 'weapon', type: 'weapon', damage: '1d8', damageType: 'piercing', properties: ['ammunition (range 150/600)', 'heavy', 'two-handed'], mastery: 'slow' },
    { name: 'Hide Armor', category: 'armor', type: 'armor', armorMethod: 'medium', baseAC: 12 },
    { name: 'Chain Mail', category: 'armor', type: 'armor', armorMethod: 'heavy', baseAC: 16, strengthRequirement: 13, stealthDisadvantage: true },
    { name: 'Leather Armor', category: 'armor', type: 'armor', armorMethod: 'light', baseAC: 11 },
    { name: 'Shield', category: 'shield', type: 'shield', armorMethod: 'shield', baseAC: 2 },
    { name: 'Old Duplicate', category: 'weapon', type: 'weapon', damage: '1d6', legacy: true },
];
const flameTongue: CharacterItem = { name: 'Flame Tongue', category: 'magic-item', type: 'weapon', rarity: 'Rare', attunement: true, description: 'Weapon (Any Melee Weapon)', appliesTo: { kind: 'weapon', melee: true } };
const mithral: CharacterItem = { name: 'Mithral Armor', category: 'magic-item', type: 'armor', appliesTo: { kind: 'armor', armorMethods: ['medium', 'heavy'], except: ['Hide Armor'] }, overrides: { stealthDisadvantage: false, strengthRequirement: null } };
const daggerOfVenom: CharacterItem = { name: 'Dagger of Venom', category: 'magic-item', type: 'weapon', magicBonus: 1, appliesTo: { kind: 'weapon', names: ['Dagger'] } };

describe('magic items made from a base item', () => {
    it('offers only the base items a magic item can be', () => {
        expect(baseCandidates(flameTongue, catalogue).map((c) => c.name)).toEqual(['Longsword', 'Dagger']);
        expect(baseCandidates(mithral, catalogue).map((c) => c.name)).toEqual(['Chain Mail']);
        // Old items without catalogue data fit any item of their kind (never hidden duplicates)
        expect(baseCandidates({ name: 'Mystery Blade', category: 'magic-item', type: 'weapon' }, catalogue)).toHaveLength(3);
    });

    it('asks for a base only for magic gear that isn’t already a specific item', () => {
        expect(needsBase(flameTongue)).toBe(true);
        expect(needsBase({ ...catalogue[0], name: 'Longsword, +1', category: 'magic-item', baseName: 'Longsword', magicBonus: 1 })).toBe(false);
        expect(needsBase({ name: 'Ammunition, +1, +2, or +3', category: 'magic-item', type: 'weapon' })).toBe(false);
        expect(needsBase({ name: 'Homebrew Blade', category: 'magic-item', type: 'weapon', damage: '2d6' })).toBe(false);
        expect(needsBase(catalogue[0])).toBe(false);
    });

    it('copies the base stats and keeps the magic item’s name, rarity and bonus', () => {
        const blade = composeMagicItem({ ...flameTongue, id: 'flame-tongue' } as CharacterItem, catalogue[0], false);
        expect(blade).toMatchObject({ name: 'Flame Tongue (Longsword)', baseName: 'Longsword', damage: '1d8', mastery: 'sap', rarity: 'Rare', attunement: true, category: 'magic-item' });
        expect(blade).not.toHaveProperty('id');
        expect(composeMagicItem(daggerOfVenom, catalogue[1], true)).toMatchObject({ name: 'Dagger of Venom', magicBonus: 1, damage: '1d4' });
        const armor = composeMagicItem(mithral, catalogue[4], true);
        expect(armor).toMatchObject({ name: 'Mithral Armor', baseAC: 16, armorMethod: 'heavy', stealthDisadvantage: false });
        expect(armor).not.toHaveProperty('strengthRequirement');
    });

    it('attacks like its base, with mastery chosen by the base weapon’s name', () => {
        const venom = { ...composeMagicItem(daggerOfVenom, catalogue[1], true), equipped: true };
        const [attack] = getWeaponAttacks({ equipment: [venom], strMod: 0, dexMod: 3, profBonus: 2 });
        expect([attack.toHit, attack.damage, attack.damageMod]).toEqual([6, '1d4', 4]);
        const blade = { ...composeMagicItem(flameTongue, catalogue[0], false), equipped: true };
        const [swing] = getWeaponAttacks({ equipment: [blade], strMod: 3, dexMod: 0, profBonus: 2 });
        expect(weaponRow(swing, 0, true, ['longsword']).mastery?.name).toBe('Sap');
        expect(weaponRow(swing, 0, true, ['dagger']).mastery).toBeUndefined();
    });

    it('gives AC like its base', () => {
        const ac = calculateArmorClass({
            equipment: [{ ...composeMagicItem(mithral, catalogue[4], true), equipped: true }],
            modifiers: { dex: 2, con: 0, wis: 0, cha: 0 }, unarmoredMethod: 'standard', traits: [], draconicResilience: false, fightingStyles: [],
        });
        expect(ac.value).toBe(16);
    });

    it('can be remade from another base, keeping what the player set', () => {
        const owned = { ...composeMagicItem(flameTongue, catalogue[0], false), equipped: true, magicBonus: 1 };
        const updates = remakeFrom(owned, catalogue[1], flameTongue);
        expect(updates).toMatchObject({ name: 'Flame Tongue (Dagger)', baseName: 'Dagger', damage: '1d4', mastery: 'nick' });
        expect(updates).not.toHaveProperty('equipped');
        expect(updates).not.toHaveProperty('magicBonus');
        // An old magic item without stats gets them from the chosen base
        expect(remakeFrom({ name: 'Mystery Blade', category: 'magic-item', type: 'weapon' }, catalogue[0])).toMatchObject({ name: 'Mystery Blade (Longsword)', damage: '1d8' });
    });

    it('keeps "(Longsword)" when the catalogue renames the magic item', () => {
        const owned = composeMagicItem(flameTongue, catalogue[0], false);
        expect(liveName(owned, { ...flameTongue, name: 'Flametongue' })).toBe('Flametongue (Longsword)');
        expect(liveName({ name: 'Longsword, +1', baseName: 'Longsword' }, { name: 'Longsword, +1', baseName: 'Longsword' })).toBe('Longsword, +1');
    });
});
