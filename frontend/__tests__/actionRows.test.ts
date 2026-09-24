import { getWeaponAttacks } from '@/lib/attacks';
import {
    buildActionRows, castingTimeToTiming, featureRows, isGeneratedAction, opportunityAttackRow, readSpellEffect, spellRow, storedRows, weaponRow,
} from '@/lib/actionRows';

const spell = (over: Partial<Parameters<typeof spellRow>[0]>) => ({
    id: 'x', name: 'X', level: 1, castingTime: '1 action', range: '60 feet', components: 'V, S', duration: 'Instantaneous', description: '', ...over,
});

const FIRE_BOLT = spell({
    id: 'fire-bolt', name: 'Fire Bolt', level: 0, range: '120 feet',
    description: 'Make a ranged spell attack against the target. On a hit, the target takes 1d10 Fire damage.\nCantrip Upgrade. The damage increases by 1d10 when you reach levels 5 (2d10), 11 (3d10), and 17 (4d10).',
});
const FIREBALL = spell({ id: 'fireball', name: 'Fireball', level: 3, description: 'Each creature in a 20-foot-radius Sphere makes a Dexterity saving throw, taking 8d6 Fire damage on a failed save or half as much damage on a successful one.' });
const CURE = spell({ id: 'cure-wounds', name: 'Cure Wounds', range: 'Touch', description: 'A creature you touch regains a number of Hit Points equal to 2d8 plus your spellcasting ability modifier.' });
const SHIELD = spell({ id: 'shield', name: 'Shield', castingTime: '1 reaction, which you take when you are hit by an attack roll or targeted by the Magic Missile spell', range: 'Self', duration: '1 round', description: 'You have a +5 bonus to AC.' });
const BLESS = spell({ id: 'bless', name: 'Bless', duration: 'Concentration, up to 1 minute', description: 'Each target adds 1d4 to attack rolls.' });
const MAGIC_MISSILE = spell({ id: 'magic-missile', name: 'Magic Missile', description: 'A dart deals 1d4 + 1 Force damage to its target.' });
const RITUAL = spell({ id: 'find-familiar', name: 'Find Familiar', castingTime: '1 hour or Ritual', description: 'You gain the service of a familiar.' });

const numbers = { attack: 7, dc: 15, modifier: 4 };

describe('spell rows', () => {
    it('sorts spells by casting time and explains reaction triggers', () => {
        expect(castingTimeToTiming('1 bonus action')).toBe('bonus');
        expect(castingTimeToTiming('1 minute')).toBe('other');
        const shield = spellRow(SHIELD, { id: 'shield' }, 5, numbers);
        expect(shield).toMatchObject({ timing: 'reaction', note: 'When you are hit by an attack roll or targeted by the Magic Missile spell.' });
        const ritual = spellRow(RITUAL, { id: 'find-familiar' }, 5, numbers);
        expect(ritual.timing).toBe('other');
        expect(ritual.facts?.[0]).toEqual(['Casting time', '1 hour or Ritual']);
    });

    it('reads spell attacks, saves, damage, healing and cantrip dice', () => {
        expect(spellRow(FIRE_BOLT, { id: 'fire-bolt' }, 5, numbers)).toMatchObject({
            sourceLabel: 'Cantrip', toHit: 7, effect: { dice: '2d10', modifier: 0, kind: 'damage', type: 'fire' },
        });
        expect(readSpellEffect(FIRE_BOLT.description, 0, 17, 4).effect?.dice).toBe('4d10');
        expect(spellRow(FIREBALL, { id: 'fireball' }, 5, numbers)).toMatchObject({ save: { dc: 15, ability: 'DEX' }, effect: { dice: '8d6' } });
        expect(spellRow(CURE, { id: 'cure-wounds' }, 5, numbers).effect).toEqual({ dice: '2d8', modifier: 4, kind: 'healing' });
        expect(spellRow(MAGIC_MISSILE, { id: 'magic-missile' }, 5, numbers).effect).toMatchObject({ dice: '1d4', modifier: 1 });
        const bless = spellRow(BLESS, { id: 'bless', grantedBy: 'Subclass' }, 5, numbers);
        expect(bless).toMatchObject({ concentration: true, effect: undefined, toHit: undefined });
        expect(bless.facts).toContainEqual(['From', 'Subclass']);
    });
});

describe('weapon rows', () => {
    const longsword = { name: 'Longsword', category: 'weapon', equipped: true, damage: '1d8', damageType: 'slashing', properties: ['Versatile (1d10)'] };
    const shortbow = { name: 'Shortbow', category: 'weapon', equipped: true, damage: '1d6', properties: ['Ammunition', 'Two-Handed'] };
    const dagger = { name: 'Dagger', category: 'weapon', equipped: true, damage: '1d4', properties: ['Finesse', 'Light'] };

    it('carries mastery, sneak attack and fighting styles', () => {
        const attacks = getWeaponAttacks({ equipment: [longsword as any, shortbow as any], strMod: 3, dexMod: 2, profBonus: 3, fightingStyles: ['archery'] });
        expect(attacks.map((a) => a.toHit)).toEqual([6, 7]);
        expect(weaponRow(attacks[0], 0, true, ['longsword'])).toMatchObject({ mastery: { name: 'Sap' }, effect: { dice: '1d8', modifier: 3, type: 'slashing' } });
        // Mastery only for weapons chosen for it
        expect(weaponRow(attacks[1], 1, true, ['longsword']).mastery).toBeUndefined();
        expect(weaponRow(attacks[0], 0, false, null).mastery).toBeUndefined();

        const rogue = getWeaponAttacks({ equipment: [dagger as any, longsword as any], strMod: 0, dexMod: 3, profBonus: 2, rogueLevel: 3 });
        expect(weaponRow(rogue[0], 0, false, null).note).toMatch(/^\+2d6 Sneak Attack/);
        expect(weaponRow(rogue[1], 1, false, null).note).toBeUndefined();
    });

    it('builds an Opportunity Attack from the first melee weapon', () => {
        const attacks = getWeaponAttacks({ equipment: [shortbow as any, longsword as any], strMod: 3, dexMod: 2, profBonus: 3 });
        expect(opportunityAttackRow(attacks)).toMatchObject({ timing: 'reaction', sourceLabel: 'Longsword', toHit: 6 });
        expect(opportunityAttackRow(getWeaponAttacks({ equipment: [shortbow as any], strMod: 3, dexMod: 2, profBonus: 3 }))).toBeNull();
    });
});

describe('feature rows', () => {
    it('lists turn resources with their uses and skips the rest', () => {
        const rows = featureRows({
            'Second Wind': { name: 'Second Wind', current: 1, max: 2, resetType: 'short' },
            'Action Surge': { name: 'Action Surge', current: 1, max: 1, resetType: 'short' },
            'Arcane Recovery': { name: 'Arcane Recovery', current: 1, max: 1, resetType: 'long' },
            'Channel Divinity': { name: 'Channel Divinity', current: 2, max: 2, resetType: 'short' },
        }, 'paladin');
        expect(rows.map((r) => [r.name, r.timing, r.uses])).toEqual([
            ['Second Wind', 'bonus', '1 / 2'], ['Action Surge', 'other', '1 / 1'], ['Channel Divinity', 'bonus', '2 / 2'],
        ]);
    });
});

describe('stored actions', () => {
    const spells = [{ ...CURE }];
    const actions = [
        { name: 'Cast Cure Wounds', type: 'action' as const, description: '**Casting Time:** 1 action\n\nheal', spellId: 'cure-wounds' },
        { name: 'Longsword (Sap)', type: 'other' as const, description: 'When you hit a creature, that creature has disadvantage on its next attack roll before the start of your next turn.' },
        { name: 'Longsword Attack', type: 'action' as const, description: 'old' },
        { name: 'Use Wand of Webs (Bonus)', type: 'bonus' as const, description: 'Cast Web from the wand.' },
        { name: 'Grapple', type: 'action' as const, description: 'Replace one attack.' },
    ];

    it('hides the copies the app used to store and keeps items and custom actions', () => {
        expect(actions.map((a) => isGeneratedAction(a, spells))).toEqual([true, true, true, false, false]);
        expect(storedRows(actions, spells)).toMatchObject([
            { name: 'Wand of Webs', source: 'item', timing: 'bonus', storedIndex: 3 },
            { name: 'Grapple', source: 'custom', timing: 'action', storedIndex: 4 },
        ]);
    });

    it('builds the whole card in a stable order without duplicates', () => {
        const rows = buildActionRows({
            attacks: getWeaponAttacks({ equipment: [{ name: 'Longsword', category: 'weapon', equipped: true, damage: '1d8' } as any], strMod: 3, dexMod: 0, profBonus: 3 }),
            hasWeaponMastery: true,
            masteryWeapons: null,
            castable: [{ id: 'fireball' }, { id: 'cure-wounds' }, { id: 'cure-wounds' }, { id: 'unknown' }],
            spells: [FIREBALL, CURE],
            spellcasting: numbers,
            characterLevel: 5,
            primaryClass: 'wizard',
            storedActions: actions,
        });
        expect(rows.map((r) => r.name)).toEqual(['Longsword', 'Opportunity Attack', 'Cure Wounds', 'Fireball', 'Wand of Webs', 'Grapple']);
    });
});
