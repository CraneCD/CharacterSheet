import {
    buildChoicePayload,
    getBonusCantrips,
    getChoiceResources,
    getChoiceSkillBonuses,
    getChoiceSpellIds,
    getClassChoices,
    getWeaponMasteries,
    isOptionAvailable,
    ELDRITCH_INVOCATIONS,
    INVOCATIONS_BY_LEVEL,
} from '@/lib/classChoices';
import { getPactMagic } from '@/lib/spellSlots';
import { getSpellcastingClasses, calculateMulticlassSpellcasterLevel } from '@/lib/multiclassSpellcasting';
import { choicesComplete, getChoiceCandidates } from '@/app/character/[id]/components/ClassChoicesPicker';
import { ClassInfo } from '@/lib/types';

const kinds = (classId: string, level: number, sub?: string) => getClassChoices(classId, level, sub).map(c => `${c.key}x${c.count}`);

describe('2024 class choice schedule', () => {
    it('asks for Expertise at Bard 2/9, Rogue 1/6 and Ranger 2 (Deft Explorer) / 9', () => {
        expect(kinds('bard', 2)).toEqual(['bard:expertisex2']);
        expect(kinds('bard', 9)).toEqual(['bard:expertisex2']);
        expect(kinds('bard', 3)).toEqual([]);
        expect(kinds('rogue', 6)).toEqual(['rogue:expertisex2']);
        expect(kinds('ranger', 2)).toEqual(['ranger:expertisex1', 'ranger:languagesx2']);
        expect(kinds('ranger', 9)).toEqual(['ranger:expertisex2']);
    });

    it('gains invocations as the Warlock table grows', () => {
        const gained = Array.from({ length: 20 }, (_, i) => getClassChoices('warlock', i + 1).find(c => c.key === 'warlock:invocations')?.count ?? 0);
        expect(gained).toEqual([1, 2, 0, 0, 2, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0]);
        expect(gained.reduce((a, b) => a + b, 0)).toBe(INVOCATIONS_BY_LEVEL[19]);
    });

    it('asks for Mystic Arcanum spells at Warlock 11/13/15/17', () => {
        for (const [lvl, spellLevel] of [[11, 6], [13, 7], [15, 8], [17, 9]]) {
            expect(getClassChoices('warlock', lvl).find(c => c.kind === 'spell')?.spell?.level).toBe(spellLevel);
        }
    });

    it('adds Weapon Mastery weapons only when the count goes up', () => {
        expect(kinds('fighter', 1)).toEqual(['fighter:weapon-masteryx3']);
        expect(kinds('fighter', 4)).toEqual(['fighter:weapon-masteryx1']);
        expect(kinds('fighter', 5)).toEqual([]);
        expect(kinds('barbarian', 10)).toEqual(['barbarian:weapon-masteryx1']);
        expect(kinds('paladin', 2)).toEqual([]);
    });

    it('covers orders, strikes, metamagic and subclass choices', () => {
        expect(kinds('cleric', 1)).toEqual(['cleric:divine-orderx1']);
        expect(kinds('cleric', 7)).toEqual(['cleric:blessed-strikesx1']);
        expect(kinds('druid', 1)).toEqual(['druid:primal-orderx1']);
        expect(kinds('druid', 7)).toEqual(['druid:elemental-furyx1']);
        expect(kinds('sorcerer', 2)).toEqual(['sorcerer:metamagicx2']);
        expect(kinds('sorcerer', 17)).toEqual(['sorcerer:metamagicx2']);
        expect(kinds('barbarian', 3)).toEqual(['barbarian:primal-knowledgex1']);
        expect(kinds('fighter', 3, 'battle_master')).toEqual(['fighter:maneuversx3']);
        expect(kinds('fighter', 3, 'champion')).toEqual([]);
        expect(kinds('ranger', 3, 'hunter')).toEqual(['ranger:hunters-preyx1']);
        expect(kinds('wizard', 18)).toEqual(['wizard:spell-mastery-1x1', 'wizard:spell-mastery-2x1']);
        expect(kinds('wizard', 20)).toEqual(['wizard:signature-spellsx2']);
    });
});

describe('invocation prerequisites', () => {
    const choice = getClassChoices('warlock', 5).find(c => c.key === 'warlock:invocations')!;
    const opt = (id: string) => ELDRITCH_INVOCATIONS.find(o => o.id === id)!;

    it('checks Warlock level and required invocations (including ones picked this level)', () => {
        const ctx = { warlockLevel: 5, existing: {} };
        expect(isOptionAvailable(choice, opt('thirsting-blade'), ctx)).toBe(false);
        expect(isOptionAvailable(choice, opt('thirsting-blade'), ctx, ['pact-of-the-blade'])).toBe(true);
        expect(isOptionAvailable(choice, opt('witch-sight'), ctx)).toBe(false);
        expect(isOptionAvailable(choice, opt('witch-sight'), { ...ctx, warlockLevel: 15 })).toBe(true);
    });

    it('hides known invocations unless repeatable', () => {
        const ctx = { warlockLevel: 5, existing: { 'warlock:invocations': ['eldritch-mind', 'agonizing-blast'] } };
        expect(isOptionAvailable(choice, opt('eldritch-mind'), ctx)).toBe(false);
        expect(isOptionAvailable(choice, opt('agonizing-blast'), ctx)).toBe(true);
    });
});

describe('choice picker candidates', () => {
    const base = {
        ctx: { warlockLevel: 0, existing: {} }, proficientSkills: ['Stealth', 'Arcana', 'Athletics'], expertiseSkills: ['Stealth'],
        knownLanguages: ['Common'], languageOptions: ['Common', 'Elvish', 'Giant'], spells: [
            { id: 'magic-missile', name: 'Magic Missile', level: 1, classes: ['Wizard'], castingTime: 'Action' },
            { id: 'shield', name: 'Shield', level: 1, classes: ['Wizard'], castingTime: 'Reaction' },
            { id: 'sleep', name: 'Sleep', level: 1, classes: ['Wizard'], castingTime: 'Action' },
        ], spellbook: ['magic-missile', 'shield'], value: {},
    };

    it('offers Expertise only for proficient skills without it, and new languages', () => {
        const [expertise, languages] = getClassChoices('ranger', 2);
        expect(getChoiceCandidates(expertise, base).map(c => c.value)).toEqual(['Arcana', 'Athletics']);
        expect(getChoiceCandidates(languages, base).map(c => c.value)).toEqual(['Elvish', 'Giant']);
    });

    it('offers Spell Mastery from the spellbook with an action casting time', () => {
        const mastery = getClassChoices('wizard', 18)[0];
        expect(getChoiceCandidates(mastery, base).map(c => c.value)).toEqual(['magic-missile']);
    });

    it('needs fewer picks when there are not enough candidates', () => {
        const choices = getClassChoices('bard', 2);
        const props = { ...base, proficientSkills: ['Stealth', 'Arcana'] };
        expect(choicesComplete(choices, { 'bard:expertise': ['Arcana'] }, props)).toBe(true);
        expect(choicesComplete(choices, {}, props)).toBe(false);
    });
});

describe('choice payload and effects', () => {
    it('turns picks into expertise, languages, stored choices and features', () => {
        const choices = [...getClassChoices('ranger', 2), ...getClassChoices('sorcerer', 2)];
        const payload = buildChoicePayload(choices, {
            'ranger:expertise': ['Survival'], 'ranger:languages': ['Elvish', 'Giant'], 'sorcerer:metamagic': ['quickened-spell', 'twinned-spell'],
        }, {}, 4);
        expect(payload.expertise).toEqual(['Survival']);
        expect(payload.languages).toEqual(['Elvish', 'Giant']);
        expect(payload.classChoices).toEqual({ 'sorcerer:metamagic': ['quickened-spell', 'twinned-spell'] });
        expect(payload.features.map(f => f.name)).toEqual(['Metamagic: Quickened Spell', 'Metamagic: Twinned Spell']);
        expect(payload.features[0]).toMatchObject({ source: 'Class: Sorcerer', level: 4 });
    });

    it('derives weapon masteries, bonus cantrips, skill bonuses, spells and resources', () => {
        const choices = {
            'fighter:weapon-mastery': ['Longsword', 'Greataxe'], 'barbarian:weapon-mastery': ['Longsword'],
            'cleric:divine-order': ['thaumaturge'], 'warlock:mystic-arcanum-6': ['circle-of-death'], 'wizard:signature-spells': ['fireball'],
        };
        expect(getWeaponMasteries(choices)).toEqual(['longsword', 'greataxe']);
        expect(getWeaponMasteries({})).toBeNull();
        expect(getBonusCantrips(choices, 'cleric')).toBe(1);
        expect(getBonusCantrips(choices, 'wizard')).toBe(0);
        expect(getChoiceSkillBonuses(choices, -1)).toEqual({ Arcana: 1, Religion: 1 });
        expect(getChoiceSpellIds(choices)).toEqual(['circle-of-death', 'fireball']);
        const res = getChoiceResources(choices, { 'circle-of-death': 'Circle of Death', fireball: 'Fireball' });
        expect(res['Mystic Arcanum: Circle of Death']).toMatchObject({ max: 1, resetType: 'long' });
        expect(res['Signature Spell: Fireball']).toMatchObject({ max: 1, resetType: 'short' });
    });
});

describe('Warlock Pact Magic when multiclassed', () => {
    const all = [
        { id: 'warlock', spellcaster: true, preparedCaster: false, spellcastingAbility: 'cha' },
        { id: 'paladin', spellcaster: true, preparedCaster: true, spellcastingAbility: 'cha' },
        { id: 'fighter', spellcaster: false },
    ] as unknown as ClassInfo[];

    it('keeps Warlock as a spellcasting class but out of the shared slot level', () => {
        expect(getSpellcastingClasses({ paladin: 4, warlock: 3 }, all).map(c => c.classId)).toEqual(['paladin', 'warlock']);
        expect(getSpellcastingClasses({ fighter: 3, warlock: 2 }, all).map(c => c.classId)).toEqual(['warlock']);
        expect(calculateMulticlassSpellcasterLevel({ paladin: 4, warlock: 3 }, all)).toBe(2);
    });

    it('gives Pact Magic slots by Warlock level', () => {
        expect(getPactMagic(0)).toBeNull();
        expect(getPactMagic(1)).toEqual({ count: 1, slotLevel: 1 });
        expect(getPactMagic(3)).toEqual({ count: 2, slotLevel: 2 });
        expect(getPactMagic(11)).toEqual({ count: 3, slotLevel: 5 });
    });
});
