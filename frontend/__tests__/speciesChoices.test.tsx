import { useState } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import SpeciesSpellSettings from '@/app/character/[id]/components/sections/SpeciesSpellSettings';
import { LimitedUsesProvider, resolveClassResources } from '@/app/character/[id]/components/sections/ClassResourcesSection';
import { SheetReadOnlyProvider } from '@/app/character/[id]/SheetReadOnly';
import StepReview from '@/app/create/components/StepReview';
import { canChooseSpeciesCantrip, getSpeciesSpellEntries, speciesSpellAbility } from '@/lib/wizardReference';
import { getSpellcastingSetup } from '@/lib/spellcastingSetup';
import { buildActionRows } from '@/lib/actionRows';
import { computeMagicInitiateUses } from '@/lib/featureUses';
import { RESOURCE_RULES_VERSION } from '@/lib/classResources';
import { api } from '@/lib/api';

expect.extend(toHaveNoViolations);

jest.mock('@/lib/api', () => ({
    api: {
        get: jest.fn(),
        post: jest.fn().mockResolvedValue({}),
        patch: jest.fn().mockResolvedValue({}),
        put: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
    },
}));

const summary = [
    { id: 'fire-bolt', name: 'Fire Bolt', level: 0, classes: ['sorcerer', 'wizard'] },
    { id: 'guidance', name: 'Guidance', level: 0, classes: ['cleric'] },
    { id: 'mage-hand', name: 'Mage Hand', level: 0, classes: ['sorcerer'] },
    { id: 'shield', name: 'Shield', level: 1, classes: ['sorcerer'] },
];

beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockResolvedValue(summary);
});

describe('species spellcasting ability', () => {
    it('defaults to Charisma and drives species-only spellcasting', () => {
        expect(speciesSpellAbility(undefined)).toBe('cha');
        expect(speciesSpellAbility('str')).toBe('cha');
        expect(speciesSpellAbility('wis')).toBe('wis');
        const setup = getSpellcastingSetup({
            characterClasses: [{ id: 'fighter', level: 5 }], gameClasses: [{ id: 'fighter', spellcaster: false }],
            characterSubclasses: [], level: 5, hasSpeciesSpells: true, speciesSpellAbility: 'int', hasMagicInitiateFeat: false,
        });
        expect(setup?.ability).toBe('int');
    });

    it('rolls species and Magic Initiate spells with their own numbers in the Actions card', () => {
        const spell = (id: string) => ({ id, name: id, level: 1, castingTime: 'Action', range: '60 feet', duration: 'Instantaneous', components: 'V', description: 'Make a ranged spell attack. On a hit, the target takes 1d10 Fire damage.' });
        const rows = buildActionRows({
            attacks: [], hasWeaponMastery: false, masteryWeapons: null, characterLevel: 5, primaryClass: 'wizard', storedActions: [],
            spellcasting: { attack: 7, dc: 15, modifier: 4 },
            spellcastingBySource: { Species: { attack: 4, dc: 12, modifier: 1 }, 'Magic Initiate': { attack: 5, dc: 13, modifier: 2 } },
            castable: [{ id: 'class-spell' }, { id: 'species-spell', grantedBy: 'Species' }, { id: 'mi-spell', grantedBy: 'Magic Initiate' }],
            spells: [spell('class-spell'), spell('species-spell'), spell('mi-spell')],
        });
        expect(rows.find((r) => r.name === 'class-spell')?.toHit).toBe(7);
        expect(rows.find((r) => r.name === 'species-spell')?.toHit).toBe(4);
        expect(rows.find((r) => r.name === 'mi-spell')?.toHit).toBe(5);
    });

    it('is chosen on the Spells tab, with the save DC and attack it gives', async () => {
        const persist = jest.fn().mockResolvedValue({});
        const { container } = render(
            <main>
                <SpeciesSpellSettings
                    speciesSpells={getSpeciesSpellEntries('githyanki')} ability="cha" choosesCantrip={false}
                    proficiencyBonus={3} modifiers={{ int: 2, wis: 0, cha: -1 }} persistData={persist}
                />
            </main>,
        );
        expect(screen.getByText('Githyanki Psionics')).toBeInTheDocument();
        expect(screen.getByText('10')).toBeInTheDocument(); // 8 + 3 - 1
        fireEvent.change(screen.getByLabelText('Ability'), { target: { value: 'int' } });
        expect(persist).toHaveBeenCalledWith({ speciesSpellAbility: 'int' }, expect.any(String));
        expect(await axe(container)).toHaveNoViolations();
    });
});

describe('Kobold Draconic Sorcery', () => {
    it('adds the chosen cantrip as a species spell', () => {
        expect(getSpeciesSpellEntries('kobold', 'draconic_sorcery', 'fire-bolt')).toEqual([{ level: 1, spellId: 'fire-bolt', trait: 'Kobold Legacy' }]);
        expect(getSpeciesSpellEntries('kobold', 'craftiness', 'fire-bolt')).toEqual([]);
        expect(canChooseSpeciesCantrip('kobold')).toBe(true);
        expect(canChooseSpeciesCantrip('kobold', 'draconic_sorcery')).toBe(true);
        expect(canChooseSpeciesCantrip('kobold', 'draconic_defiance')).toBe(false);
        expect(canChooseSpeciesCantrip('elf', 'drow')).toBe(false);
    });

    it('picks a Sorcerer cantrip on the sheet, which also sets the legacy', async () => {
        const persist = jest.fn().mockResolvedValue({});
        render(
            <SpeciesSpellSettings speciesSpells={[]} ability="cha" choosesCantrip proficiencyBonus={2} modifiers={{ cha: 1 }} persistData={persist} />,
        );
        const select = screen.getByLabelText('Draconic Sorcery cantrip');
        await waitFor(() => expect(select).not.toBeDisabled());
        expect(within(select).getAllByRole('option').map((o) => o.textContent)).toEqual(['Choose a Sorcerer cantrip', 'Fire Bolt', 'Mage Hand']);
        fireEvent.change(select, { target: { value: 'mage-hand' } });
        expect(persist).toHaveBeenCalledWith({ speciesCantrip: 'mage-hand', speciesLineage: 'draconic_sorcery' }, expect.any(String));
    });

    it('shows the DM the choices without controls', async () => {
        render(
            <SheetReadOnlyProvider value>
                <SpeciesSpellSettings speciesSpells={getSpeciesSpellEntries('kobold', 'draconic_sorcery', 'fire-bolt')} ability="wis" choosesCantrip cantrip="fire-bolt" proficiencyBonus={2} modifiers={{ wis: 1 }} persistData={jest.fn()} />
            </SheetReadOnlyProvider>,
        );
        expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
        expect(screen.getByText('Wisdom')).toBeInTheDocument();
        expect(await screen.findByText('Fire Bolt')).toBeInTheDocument();
    });

    it('asks for the cantrip and the ability during character creation', async () => {
        const onUpdate = jest.fn();
        const race = { id: 'kobold', name: 'Kobold', traits: ['Kobold Legacy'], lineageOptions: { trait: 'Kobold Legacy', label: 'Kobold Legacy', options: [
            { id: 'craftiness', name: 'Craftiness', description: 'x' },
            { id: 'draconic_sorcery', name: 'Draconic Sorcery', description: 'y' },
        ] } };
        render(<StepReview data={{ speciesLineageChoice: 'draconic_sorcery' }} onUpdate={onUpdate} raceId="kobold" race={race as any} />);
        const cantrip = screen.getByLabelText('Draconic Sorcery — choose a Sorcerer cantrip');
        await waitFor(() => expect(cantrip).not.toBeDisabled());
        fireEvent.change(cantrip, { target: { value: 'fire-bolt' } });
        expect(onUpdate).toHaveBeenCalledWith({ speciesCantripChoice: 'fire-bolt' });
        fireEvent.change(screen.getByLabelText('Spellcasting ability for species spells'), { target: { value: 'wis' } });
        expect(onUpdate).toHaveBeenCalledWith({ speciesSpellAbilityChoice: 'wis' });
    });
});

describe('Magic Initiate free cast', () => {
    const names = { bless: 'Bless' };

    it('becomes a feat counter that keeps a cast spent before counters', () => {
        expect(computeMagicInitiateUses('bless', names)['Bless (Magic Initiate)']).toMatchObject({ current: 1, max: 1, source: 'feat', feature: 'Magic Initiate', spellId: 'bless' });
        expect(computeMagicInitiateUses('bless', names, 0)['Bless (Magic Initiate)'].current).toBe(0);
        expect(computeMagicInitiateUses(null, names)).toEqual({});
    });

    it('follows a changed spell and waits for spell names before touching it', () => {
        const input = { classLevels: { fighter: 1 }, subclassMap: {}, abilityScores: {}, racialTraits: [], level: 1, hasChoiceSpells: false };
        const first = resolveClassResources({ ...input, data: {}, choiceSpellNames: names, magicInitiateSpell: 'bless' });
        expect(first.resources['Bless (Magic Initiate)']).toBeDefined();
        const data = { classResources: { ...first.resources, 'Bless (Magic Initiate)': { ...first.resources['Bless (Magic Initiate)'], current: 0 } }, classResourcesRules: RESOURCE_RULES_VERSION };

        const loading = resolveClassResources({ ...input, data, choiceSpellNames: null, magicInitiateSpell: 'bless' });
        expect(loading.resources['Bless (Magic Initiate)'].current).toBe(0);

        const changed = resolveClassResources({ ...input, data, choiceSpellNames: { ...names, 'cure-wounds': 'Cure Wounds' }, magicInitiateSpell: 'cure-wounds' });
        expect(changed.resources['Bless (Magic Initiate)']).toBeUndefined();
        expect(changed.resources['Cure Wounds (Magic Initiate)'].current).toBe(1);
    });

    it('clears the old used flag once the counter is saved', async () => {
        function Sheet() {
            const [data, setData] = useState<Record<string, any>>({ classResourcesRules: RESOURCE_RULES_VERSION, magicInitiateSpell1Used: 0 });
            return (
                <LimitedUsesProvider
                    characterId="c1" data={data} classLevels={{ fighter: 1 }} subclassMap={{}} abilityScores={{}} racialTraits={[]} level={1}
                    choiceSpellNames={names} hasChoiceSpells={false} magicInitiateSpell="bless"
                    onUpdate={(u) => setData((d) => ({ ...d, ...u }))}
                >
                    <span data-testid="flag">{String(data.magicInitiateSpell1Used)}</span>
                </LimitedUsesProvider>
            );
        }
        render(<Sheet />);
        await waitFor(() => expect(screen.getByTestId('flag')).toHaveTextContent('null'));
        const saved = (api.patch as jest.Mock).mock.calls.find(([url]) => url === '/characters/c1/data')[1];
        expect(saved.magicInitiateSpell1Used).toBeNull();
        expect(saved.classResources['Bless (Magic Initiate)'].current).toBe(0);
    });
});
