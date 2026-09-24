import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { calculateArmorClass } from '@/lib/armorClass';
import { getSpellcastingSetup } from '@/lib/spellcastingSetup';
import { resolveClassResources } from '@/app/character/[id]/components/sections/ClassResourcesSection';
import SkillsCard from '@/app/character/[id]/components/sections/SkillsCard';
import SavingThrowsCard from '@/app/character/[id]/components/sections/SavingThrowsCard';
import LanguagesCard from '@/app/character/[id]/components/sections/LanguagesCard';
import { RESOURCE_RULES_VERSION } from '@/lib/classResources';

jest.mock('@/lib/api', () => ({ api: { patch: jest.fn().mockResolvedValue({}) } }));

const mods = { dex: 3, con: 2, wis: 1, cha: 0 };
const base = { equipment: [], modifiers: mods, unarmoredMethod: 'standard' as const, traits: [], draconicResilience: false, fightingStyles: [] };

describe('calculateArmorClass', () => {
    it('handles light, medium and heavy armor with a shield and Defense', () => {
        const chain = { name: 'Chain Mail', category: 'armor', armorMethod: 'heavy', baseAC: 16, equipped: true };
        const shield = { name: 'Shield', category: 'shield', baseAC: 2, equipped: true };
        expect(calculateArmorClass({ ...base, equipment: [chain as any, shield as any], fightingStyles: ['defense'] }))
            .toEqual({ value: 19, parts: ['Chain Mail 16', 'Shield +2', 'Defense +1'] });

        const breastplate = { name: 'Breastplate', category: 'armor', armorMethod: 'medium', baseAC: 14, equipped: true };
        expect(calculateArmorClass({ ...base, equipment: [breastplate as any] }))
            .toEqual({ value: 16, parts: ['Breastplate 14', 'DEX +2 (max +2)'] });

        const leather = { name: 'Leather', category: 'armor', armorMethod: 'light', baseAC: 11, equipped: true };
        expect(calculateArmorClass({ ...base, equipment: [leather as any] }).value).toBe(14);
    });

    it('ignores unequipped items and plain strings', () => {
        const chain = { name: 'Chain Mail', category: 'armor', armorMethod: 'heavy', baseAC: 16, equipped: false };
        expect(calculateArmorClass({ ...base, equipment: ['Rope', chain as any] })).toEqual({ value: 13, parts: ['Unarmored 10', 'DEX +3'] });
    });

    it('applies Unarmored Defense, Draconic Resilience and species armor', () => {
        expect(calculateArmorClass({ ...base, unarmoredMethod: 'unarmored-monk' }).value).toBe(14);
        // A shield turns off the Monk's Unarmored Defense
        expect(calculateArmorClass({ ...base, unarmoredMethod: 'unarmored-monk', equipment: [{ name: 'Shield', category: 'shield', equipped: true } as any] }).value).toBe(15);
        expect(calculateArmorClass({ ...base, unarmoredMethod: 'unarmored-barbarian' }).value).toBe(15);
        expect(calculateArmorClass({ ...base, draconicResilience: true }).value).toBe(13);
        expect(calculateArmorClass({ ...base, traits: ['Natural Armor (Shell)'] })).toEqual({ value: 17, parts: ['Shell 17'] });
        expect(calculateArmorClass({ ...base, traits: ['Natural Armor'] })).toEqual({ value: 16, parts: ['Natural Armor 13', 'DEX +3'] });
    });
});

describe('getSpellcastingSetup', () => {
    const gameClasses = [
        { id: 'wizard', spellcaster: true, preparedCaster: true, spellcastingAbility: 'int' },
        { id: 'cleric', spellcaster: true, preparedCaster: true, spellcastingAbility: 'wis' },
        { id: 'fighter', spellcaster: false },
    ];
    const input = { gameClasses, characterSubclasses: [], level: 5, hasSpeciesSpells: false, hasMagicInitiateFeat: false };

    it('uses the highest-level spellcasting class', () => {
        const setup = getSpellcastingSetup({ ...input, characterClasses: [{ id: 'wizard', level: 2 }, { id: 'cleric', level: 3 }] });
        expect(setup?.primary.id).toBe('cleric');
        expect(setup?.ability).toBe('wis');
        expect(setup?.spellcastingClasses.map((c) => c.id)).toEqual(['cleric', 'wizard']);
    });

    it('falls back to a caster subclass, species spells, then Magic Initiate', () => {
        const ek = { classId: 'fighter', classLevel: 3, subclass: { id: 'eldritch_knight', name: 'Eldritch Knight', spellcasting: { spellListClass: 'wizard', spellcastingAbility: 'int', casterLevelDivisor: 3 } } };
        const fighter = [{ id: 'fighter', level: 3 }];
        expect(getSpellcastingSetup({ ...input, characterClasses: fighter, characterSubclasses: [ek] })).toMatchObject({
            primary: { id: 'wizard', name: 'Eldritch Knight' },
            subclassSpellcasting: { subclassId: 'eldritch_knight', casterLevelDivisor: 3, classLevel: 3 },
        });
        expect(getSpellcastingSetup({ ...input, characterClasses: fighter, hasSpeciesSpells: true })).toMatchObject({ primary: { id: 'innate' }, ability: 'cha' });
        expect(getSpellcastingSetup({ ...input, characterClasses: fighter, hasMagicInitiateFeat: true, magicInitiateAbility: 'wis' })).toMatchObject({ primary: { id: 'magic_initiate' }, ability: 'wis' });
        expect(getSpellcastingSetup({ ...input, characterClasses: fighter })).toBeNull();
    });

    it('grants subclass spells only up to that class level', () => {
        const sub = { classId: 'cleric', classLevel: 3, subclass: { id: 'life', spells: [{ level: 3, spellId: 'bless' }, { level: 5, spellId: 'revivify' }] } };
        const setup = getSpellcastingSetup({ ...input, characterClasses: [{ id: 'cleric', level: 3 }], characterSubclasses: [sub] });
        expect(setup?.grantedSubclassSpells).toEqual([{ level: 3, spellId: 'bless' }]);
    });
});

describe('resolveClassResources', () => {
    const input = { classLevels: { fighter: 3 }, subclassMap: {}, abilityScores: { str: 16, dex: 12, con: 14, int: 10, wis: 10, cha: 8 }, racialTraits: [], level: 3, choiceSpellNames: null, hasChoiceSpells: false };

    it('creates resources for a character without any, and asks to save them', () => {
        const result = resolveClassResources({ ...input, data: {} });
        expect(Object.keys(result.resources)).toEqual(expect.arrayContaining(['Second Wind', 'Action Surge']));
        expect(result.needsSave).toBe(true);
    });

    it('leaves up-to-date resources alone', () => {
        const first = resolveClassResources({ ...input, data: {} });
        const again = resolveClassResources({ ...input, data: { classResources: first.resources, classResourcesRules: RESOURCE_RULES_VERSION } });
        expect(again.needsSave).toBe(false);
        expect(again.resources).toEqual(first.resources);
    });

    it('adds Heroic Inspiration for Resourceful species', () => {
        const first = resolveClassResources({ ...input, data: {} });
        const human = resolveClassResources({ ...input, racialTraits: ['Resourceful'], data: { classResources: first.resources, classResourcesRules: RESOURCE_RULES_VERSION } });
        expect(human.resources['Heroic Inspiration']).toBeDefined();
        expect(human.needsSave).toBe(true);
    });
});

describe('sheet cards', () => {
    it('toggles skill proficiency with real buttons', () => {
        const onToggle = jest.fn();
        render(<SkillsCard skills={[
            { name: 'Athletics', stat: 'str', total: 5, isProficient: true, hasExpertise: false },
            { name: 'Stealth', stat: 'dex', total: 7, isProficient: true, hasExpertise: true },
        ]} onToggleProficiency={onToggle} />);
        const athletics = screen.getByRole('button', { name: 'Athletics proficiency' });
        expect(athletics).toHaveAttribute('aria-pressed', 'true');
        fireEvent.click(athletics);
        expect(onToggle).toHaveBeenCalledWith('Athletics');
        expect(screen.getByText('+7')).toBeInTheDocument();
        expect(screen.getByTitle('Expertise (double proficiency bonus)')).toBeInTheDocument();
    });

    it('announces proficient saving throws', () => {
        render(<SavingThrowsCard saves={[{ stat: 'str', total: 5, isProficient: true }, { stat: 'dex', total: 1, isProficient: false }]} />);
        expect(screen.getByText('(proficient)', { exact: false })).toBeInTheDocument();
        expect(screen.getByTitle('Strength')).toHaveTextContent('STR');
    });

    it('adds standard and custom languages and removes them', () => {
        const onAdd = jest.fn();
        const onRemove = jest.fn();
        render(<LanguagesCard languages={['Common']} onAdd={onAdd} onRemove={onRemove} />);

        fireEvent.change(screen.getByLabelText('Add a standard language'), { target: { value: 'Elvish' } });
        expect(onAdd).toHaveBeenCalledWith('Elvish');
        expect(screen.queryByRole('option', { name: 'Common' })).not.toBeInTheDocument();

        const custom = screen.getByLabelText('Custom language');
        expect(screen.getByRole('button', { name: 'Add' })).toBeDisabled();
        fireEvent.change(custom, { target: { value: '  Thieves’ Cant ' } });
        fireEvent.submit(custom.closest('form')!);
        expect(onAdd).toHaveBeenCalledWith('Thieves’ Cant');
        expect(custom).toHaveValue('');

        fireEvent.click(screen.getByRole('button', { name: 'Remove Common' }));
        expect(onRemove).toHaveBeenCalledWith('Common');
    });
});
