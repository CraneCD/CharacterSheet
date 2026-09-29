import { baseChoices, lootFieldsFor, lootRarity, lootStats, searchCatalogue, sheetItemFor } from '@/lib/lootCatalogue';
import type { CharacterItem } from '@/lib/types';

const longsword: CharacterItem = { id: 'longsword', name: 'Longsword', category: 'weapon', type: 'weapon', damage: '1d8', damageType: 'slashing', properties: ['versatile (1d10)'], mastery: 'sap' };
const longbow: CharacterItem = { id: 'longbow', name: 'Longbow', category: 'weapon', type: 'weapon', damage: '1d8', damageType: 'piercing', properties: ['ammunition (range 150/600)', 'heavy', 'two-handed'] };
const shortsword: CharacterItem = { id: 'shortsword', name: 'Shortsword', category: 'weapon', type: 'weapon', damage: '1d6', damageType: 'piercing', properties: ['finesse', 'light'] };
const chainMail: CharacterItem = { id: 'chain-mail', name: 'Chain Mail', category: 'armor', type: 'armor', armorMethod: 'heavy', baseAC: 16, stealthDisadvantage: true, strengthRequirement: 13 };
const shield: CharacterItem = { id: 'shield', name: 'Shield', category: 'shield', type: 'shield', armorMethod: 'shield', baseAC: 2 };
const flameTongue: CharacterItem = { id: 'flame-tongue', name: 'Flame Tongue', category: 'magic-item', type: 'weapon', rarity: 'Rare', attunement: true, appliesTo: { kind: 'weapon', melee: true } };
const vorpal: CharacterItem = { id: 'vorpal-sword', name: 'Vorpal Sword', category: 'magic-item', type: 'weapon', rarity: 'Legendary', appliesTo: { kind: 'weapon', names: ['Longsword'] } };
const longswordPlus1: CharacterItem = { id: 'longsword-1', name: 'Longsword, +1', category: 'magic-item', type: 'weapon', damage: '1d8', damageType: 'slashing', magicBonus: 1, baseName: 'Longsword', rarity: 'Uncommon', appliesTo: { kind: 'weapon', names: ['Longsword'] } };
const shieldPlus2: CharacterItem = { id: 'shield-2', name: 'Shield, +2', category: 'magic-item', type: 'shield', armorMethod: 'shield', baseAC: 2, magicBonus: 2, baseName: 'Shield', rarity: 'Rare' };
const potion = { id: 'potion-of-healing', name: 'Potion of Healing', category: 'potion', rarity: 'Common', description: 'Regain 2d4 + 2 HP.', cost: '50 GP' } as CharacterItem;
const generic: CharacterItem = { id: 'weapon-1-2-3', name: 'Weapon, +1, +2, or +3', category: 'magic-item', type: 'weapon', legacy: true };
const catalogue = [longsword, longbow, shortsword, chainMail, shield, flameTongue, vorpal, longswordPlus1, shieldPlus2, potion, generic];

describe('searchCatalogue', () => {
    it('finds items by every word, names that start with the search first, hidden ones never', () => {
        expect(searchCatalogue(catalogue, 'long').map((i) => i.name)).toEqual(['Longbow', 'Longsword', 'Longsword, +1']);
        expect(searchCatalogue(catalogue, 'sword long').map((i) => i.name)).toEqual(['Longsword', 'Longsword, +1']);
        expect(searchCatalogue(catalogue, 'weapon, +1')).toEqual([]);
        expect(searchCatalogue(catalogue, '  ')).toEqual([]);
    });
});

describe('sheetItemFor', () => {
    it('makes magic gear from the chosen base, linked to its entry', () => {
        const item = sheetItemFor(flameTongue, catalogue, longsword);
        expect(item).toMatchObject({ name: 'Flame Tongue (Longsword)', damage: '1d8', mastery: 'sap', baseName: 'Longsword', baseItemId: 'flame-tongue', rarity: 'Rare' });
        expect(item).not.toHaveProperty('id');
    });

    it('leaves the base to the player when none is chosen, and picks the only one there is', () => {
        expect(sheetItemFor(flameTongue, catalogue)).toMatchObject({ name: 'Flame Tongue', appliesTo: { kind: 'weapon', melee: true } });
        expect(sheetItemFor(flameTongue, catalogue)).not.toHaveProperty('damage');
        expect(sheetItemFor(vorpal, catalogue)).toMatchObject({ name: 'Vorpal Sword', damage: '1d8', baseName: 'Longsword' });
        // A base that doesn't fit is ignored
        expect(sheetItemFor(flameTongue, catalogue, longbow)).not.toHaveProperty('damage');
    });

    it('takes other items as they are', () => {
        expect(sheetItemFor(longswordPlus1, catalogue)).toMatchObject({ name: 'Longsword, +1', magicBonus: 1, baseItemId: 'longsword-1' });
        expect(sheetItemFor(potion, catalogue)).toMatchObject({ name: 'Potion of Healing', category: 'potion', baseItemId: 'potion-of-healing' });
    });
});

describe('baseChoices', () => {
    it('lists bases only when there is a choice to make', () => {
        expect(baseChoices(flameTongue, catalogue).map((b) => b.name)).toEqual(['Longsword', 'Shortsword']);
        expect(baseChoices({ ...flameTongue, appliesTo: { kind: 'weapon' } }, catalogue).map((b) => b.name)).toEqual(['Longsword', 'Longbow', 'Shortsword']);
        expect(baseChoices(vorpal, catalogue)).toEqual([]);
        expect(baseChoices(potion, catalogue)).toEqual([]);
    });
});

describe('lootFieldsFor', () => {
    it("fills the loot form from an entry: name, text, rarity, value and the sheet item", () => {
        expect(lootFieldsFor(potion, catalogue)).toEqual({
            name: 'Potion of Healing', description: 'Regain 2d4 + 2 HP.', rarity: 'common', value: '50 GP', item: expect.objectContaining({ baseItemId: 'potion-of-healing' }),
        });
        expect(lootRarity({ rarity: 'Very Rare' })).toBe('very rare');
        expect(lootRarity({ rarity: 'Rarity Varies' })).toBe('');
    });
});

describe('lootStats', () => {
    it('sums up what a linked item does', () => {
        expect(lootStats(longswordPlus1)).toBe('1d8 slashing, +1');
        expect(lootStats(chainMail)).toBe('AC 16');
        expect(lootStats({ ...chainMail, magicBonus: 1 })).toBe('AC 17');
        expect(lootStats(shieldPlus2)).toBe('AC +4');
        expect(lootStats(flameTongue)).toBe("weapon: player's choice, attunement");
        expect(lootStats(potion)).toBe('');
        expect(lootStats(null)).toBe('');
    });
});
