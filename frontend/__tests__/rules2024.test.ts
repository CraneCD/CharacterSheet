import { calculateClassResources, reconcileClassResources } from '@/lib/classResources';
import { getSlotsForClass, getPactMagicSlots } from '@/lib/spellSlots';
import { calculatePreparedSpellsLimitForClass, getCantripsKnown, getKnownSpellsLimit, calculateMulticlassSpellcasterLevel } from '@/lib/multiclassSpellcasting';
import { isValidBackgroundAsi, getRaceTraits, getBackgroundSkills, getRaceLanguageChoices, getSpeciesSpellEntries } from '@/lib/wizardReference';
import { itemNameToCharacterItem, optionsFromLine, parseCurrency, splitEquipmentChoice } from '@/lib/equipmentMapping';
import { getSkillProficienciesFromTraits, hasKeenSensesChoice } from '@/lib/racialTraitBonuses';
import { getAbilityScoreIncreasesFromFeatures, getSavingThrowProficienciesFromFeatures, calculateSpeedBonusFromFeatures, getACCalculationFromFeatures } from '@/lib/featureStatModifiers';
import { getMasteryForWeapon } from '@/lib/weaponMastery';
import { isFeatAvailable, getFightingStyleForLevel } from '@/app/character/[id]/components/LevelUpWizard';

const lv = (fn: (level: number) => number) => Array.from({ length: 20 }, (_, i) => fn(i + 1));

describe('2024 class resources', () => {
    it('uses the Rage table (no unlimited rages at 20)', () => {
        expect(lv(l => calculateClassResources('barbarian', l).Rage.max)).toEqual(
            [2, 2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 6, 6, 6, 6]
        );
        expect(calculateClassResources('barbarian', 1).Rage.shortRestRegain).toBe(1);
    });

    it('starts Channel Divinity at cleric 2 / paladin 3', () => {
        expect(calculateClassResources('cleric', 1)['Channel Divinity']).toBeUndefined();
        expect(lv(l => calculateClassResources('cleric', l)['Channel Divinity']?.max ?? 0)).toEqual(
            [0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4]
        );
        expect(lv(l => calculateClassResources('paladin', l)['Channel Divinity']?.max ?? 0)).toEqual(
            [0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
        );
    });

    it('scales Wild Shape, Focus Points, and Sorcery Points from level 2', () => {
        expect(lv(l => calculateClassResources('druid', l)['Wild Shape']?.max ?? 0)).toEqual(
            [0, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4]
        );
        expect(calculateClassResources('monk', 1)['Focus Points']).toBeUndefined();
        expect(calculateClassResources('monk', 5)['Focus Points'].max).toBe(5);
        expect(calculateClassResources('monk', 5)['Ki Points']).toBeUndefined();
        expect(calculateClassResources('sorcerer', 1)['Sorcery Points']).toBeUndefined();
        expect(calculateClassResources('sorcerer', 2)['Sorcery Points'].max).toBe(2);
    });

    it('migrates stored 2014 resources once', () => {
        const stored = {
            'Ki Points': { name: 'Ki Points', current: 3, max: 5, resetType: 'short' as const },
            'Heroic Inspiration': { name: 'Heroic Inspiration', current: 0, max: 1, resetType: 'long' as const },
        };
        const out = reconcileClassResources(stored, calculateClassResources('monk', 5));
        expect(out['Ki Points']).toBeUndefined();
        expect(out['Focus Points']).toMatchObject({ current: 3, max: 5 });
        expect(out['Heroic Inspiration'].current).toBe(0);

        const rage = reconcileClassResources(
            { Rage: { name: 'Rage', current: 999, max: 999, resetType: 'long' } },
            calculateClassResources('barbarian', 20)
        );
        expect(rage.Rage).toMatchObject({ current: 6, max: 6, shortRestRegain: 1 });
    });
});

describe('2024 spellcasting tables', () => {
    it('lets Paladins cast from level 1 on the Ranger table', () => {
        expect(getSlotsForClass('paladin', 1)).toEqual([2]);
        expect(getSlotsForClass('paladin', 5)).toEqual([4, 2]);
        expect(getSlotsForClass('ranger', 17)).toEqual([4, 3, 3, 3, 1]);
    });

    it('gives Warlocks Pact Magic slots', () => {
        expect(getPactMagicSlots(1)).toEqual([1]);
        expect(getSlotsForClass('warlock', 5)).toEqual([0, 0, 2]);
        expect(getSlotsForClass('warlock', 11)).toEqual([0, 0, 0, 0, 3]);
        expect(getSlotsForClass('warlock', 20)).toEqual([0, 0, 0, 0, 4]);
    });

    it('uses the Eldritch Knight / Arcane Trickster slot table', () => {
        expect(getSlotsForClass('wizard', 2, 3)).toEqual([]);
        expect(getSlotsForClass('wizard', 3, 3)).toEqual([2]);
        expect(getSlotsForClass('wizard', 7, 3)).toEqual([4, 2]);
        expect(getSlotsForClass('wizard', 19, 3)).toEqual([4, 3, 3, 1]);
    });

    it('uses the 2024 prepared/known tables', () => {
        expect(calculatePreparedSpellsLimitForClass('paladin', 9, 'cha', {})).toBe(9);
        expect(calculatePreparedSpellsLimitForClass('ranger', 20, 'wis', {})).toBe(15);
        expect(calculatePreparedSpellsLimitForClass('sorcerer', 1, 'cha', {})).toBe(2);
        expect(getKnownSpellsLimit('sorcerer', 20)).toBe(22);
        expect(getKnownSpellsLimit('warlock', 20)).toBe(15);
        expect(getKnownSpellsLimit('bard', 1)).toBe(4);
        expect(getKnownSpellsLimit('cleric', 5)).toBe(0);
        expect(getCantripsKnown('sorcerer', 1)).toBe(4);
        expect(getCantripsKnown('cleric', 10)).toBe(5);
        expect(getCantripsKnown('fighter', 5)).toBe(0);
    });

    it('rounds half-caster levels up when multiclassing', () => {
        const all = [
            { id: 'paladin', spellcaster: true }, { id: 'wizard', spellcaster: true },
        ] as any;
        expect(calculateMulticlassSpellcasterLevel({ paladin: 3, wizard: 1 }, all)).toBe(3);
    });
});

describe('2024 origins', () => {
    it('validates background ability increases', () => {
        const opts = ['str', 'dex', 'con'];
        expect(isValidBackgroundAsi({ str: 2, con: 1 }, opts)).toBe(true);
        expect(isValidBackgroundAsi({ str: 1, dex: 1, con: 1 }, opts)).toBe(true);
        expect(isValidBackgroundAsi({ str: 2, cha: 1 }, opts)).toBe(false);
        expect(isValidBackgroundAsi({ str: 2 }, opts)).toBe(false);
        expect(isValidBackgroundAsi({ str: 2, dex: 2 }, opts)).toBe(false);
    });

    it('folds lineage choices into species traits', () => {
        const gnome = { traits: ['Darkvision', 'Gnomish Cunning', 'Gnomish Lineage'], lineageOptions: { trait: 'Gnomish Lineage', options: [{ id: 'forest_gnome', name: 'Forest Gnome' }] } };
        expect(getRaceTraits('gnome', undefined, gnome, 'forest_gnome')).toContain('Gnomish Lineage (Forest Gnome)');
        expect(getRaceTraits('elf', 'wood_elf')).toContain('Fleet of Foot');
        expect(getRaceTraits('dwarf')).toContain('Darkvision (120 ft.)');
    });

    it('prefers API background skills, with the 2024 table as fallback', () => {
        expect(getBackgroundSkills('criminal')).toEqual(['Sleight of Hand', 'Stealth']);
        expect(getBackgroundSkills('criminal', { skillProficiencies: ['Arcana', 'History'] })).toEqual(['Arcana', 'History']);
    });

    it('gives everyone Common plus two languages', () => {
        expect(getRaceLanguageChoices('dwarf')).toBe(2);
        expect(getRaceLanguageChoices('aarakocra')).toBe(2);
    });

    it('lists species spells for lineages', () => {
        expect(getSpeciesSpellEntries('tiefling', 'infernal').map(s => s.spellId)).toEqual(['fire-bolt', 'hellish-rebuke', 'darkness']);
        expect(getSpeciesSpellEntries('aasimar').map(s => s.spellId)).toEqual(['light']);
    });

    it('treats 2024 Keen Senses as a choice, keeping Perception for older elves', () => {
        expect(hasKeenSensesChoice(['Keen Senses'])).toBe(true);
        expect(getSkillProficienciesFromTraits(['Keen Senses'])).toEqual([]);
        expect(getSkillProficienciesFromTraits(['Keen Senses'], { legacyKeenSenses: true })).toEqual(['Perception']);
        expect(getSkillProficienciesFromTraits(['Keen Senses (Perception)'])).toEqual(['Perception']);
    });
});

describe('starting equipment parsing', () => {
    const base = [
        { name: 'Javelin', category: 'weapon', type: 'weapon', damage: '1d6' },
        { name: 'Arrows', category: 'miscellaneous', type: 'other' },
        { name: 'Book', category: 'miscellaneous', type: 'other' },
        { name: 'Quarterstaff', category: 'weapon', type: 'weapon', damage: '1d6' },
    ];

    it('splits A/B/C options and items', () => {
        expect(optionsFromLine('Chain Mail, 4 GP or Scimitar, 11 GP or 155 GP')).toEqual(['Chain Mail, 4 GP', 'Scimitar, 11 GP', '155 GP']);
        expect(splitEquipmentChoice('Chain Mail, 8 Javelins, 4 GP')).toEqual(['Chain Mail', '8 Javelins', '4 GP']);
        expect(parseCurrency('155 GP')).toEqual({ key: 'gp', amount: 155 });
        expect(parseCurrency('Chain Mail')).toBeNull();
    });

    it('resolves plurals, focus aliases, and descriptive names to base items', () => {
        expect(itemNameToCharacterItem('8 Javelins', base as any)).toMatchObject({ name: 'Javelin', quantity: 8, isBaseItem: true });
        expect(itemNameToCharacterItem('20 Arrows', base as any)).toMatchObject({ name: 'Arrows', quantity: 20 });
        expect(itemNameToCharacterItem('Arcane Focus (Quarterstaff)', base as any)).toMatchObject({ name: 'Quarterstaff', category: 'weapon' });
        expect(itemNameToCharacterItem('Book (prayers)', base as any)).toMatchObject({ name: 'Book (prayers)', isBaseItem: true });
    });
});

describe('2024 features on the sheet', () => {
    it('applies Body and Mind, Slippery Mind, and Disciplined Survivor', () => {
        expect(getAbilityScoreIncreasesFromFeatures([{ name: 'Body and Mind' }])).toEqual({ dex: 4, wis: 4 });
        expect(getSavingThrowProficienciesFromFeatures([{ name: 'Slippery Mind' }], ['dex', 'int']).sort()).toEqual(['cha', 'dex', 'int', 'wis']);
        expect(getSavingThrowProficienciesFromFeatures([{ name: 'Disciplined Survivor' }], []).length).toBe(6);
    });

    it('recognises Unarmored Defense and speed features', () => {
        expect(getACCalculationFromFeatures([{ name: 'Unarmored Defense' }], 'barbarian')).toBe('unarmored-barbarian');
        expect(calculateSpeedBonusFromFeatures([{ name: 'Roving' }], 'ranger', 6)).toBe(10);
        expect(calculateSpeedBonusFromFeatures([{ name: 'Unarmored Movement' }], 'monk', 18)).toBe(30);
    });

    it('knows every PHB weapon mastery', () => {
        expect(getMasteryForWeapon('Greataxe')).toBe('cleave');
        expect(getMasteryForWeapon('Hand Crossbow')).toBe('vex');
        expect(getMasteryForWeapon('Custom Blade', 'topple')).toBe('topple');
    });
});

describe('level-up rules', () => {
    const ctx = {
        characterLevel: 4,
        classLevels: { fighter: 4 },
        abilityScores: { str: 16, dex: 12, con: 14, int: 10, wis: 10, cha: 8 },
        race: 'human',
        armorTraining: ['Light armor', 'Medium armor', 'Heavy armor', 'Shields'],
        takenFeatIds: ['alert'],
    };

    it('filters feats by category, level, and prerequisites', () => {
        const feat = (f: any) => ({ id: 'x', name: 'X', description: '', ...f });
        expect(isFeatAvailable(feat({ category: 'epic-boon', prerequisites: { level: 19 } }), ctx)).toBe(false);
        expect(isFeatAvailable(feat({ category: 'epic-boon', prerequisites: { level: 19 } }), { ...ctx, characterLevel: 19 })).toBe(true);
        expect(isFeatAvailable(feat({ category: 'general', prerequisites: { level: 4, abilityScoreAny: { str: 13, dex: 13 } } }), ctx)).toBe(true);
        expect(isFeatAvailable(feat({ category: 'general', prerequisites: { level: 4, abilityScore: { cha: 13 } } }), ctx)).toBe(false);
        expect(isFeatAvailable(feat({ category: 'fighting-style' }), ctx)).toBe(true);
        expect(isFeatAvailable(feat({ category: 'fighting-style' }), { ...ctx, classLevels: { wizard: 4 } })).toBe(false);
        expect(isFeatAvailable(feat({ id: 'alert', category: 'origin' }), ctx)).toBe(false);
        expect(isFeatAvailable(feat({ category: 'general', legacy: true }), ctx)).toBe(false);
        expect(isFeatAvailable(feat({ category: 'general', prerequisites: { level: 4, proficiency: ['Heavy Armor'] } }), { ...ctx, armorTraining: ['Light armor'] })).toBe(false);
        expect(isFeatAvailable(feat({ id: 'ability-score-improvement', category: 'general' }), ctx)).toBe(false);
    });

    it('grants Fighting Styles at 2024 levels', () => {
        expect(getFightingStyleForLevel('fighter', 7, 'champion').needed).toBe(true);
        expect(getFightingStyleForLevel('fighter', 10, 'champion').needed).toBe(false);
        expect(getFightingStyleForLevel('paladin', 2, undefined).needed).toBe(true);
        expect(getFightingStyleForLevel('rogue', 3, 'soulknife').needed).toBe(false);
        expect(getFightingStyleForLevel('bard', 3, 'swords')).toEqual({ needed: true, options: ['dueling', 'two-weapon-fighting'] });
    });
});
