import { useState } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import SpellManager from '@/app/character/[id]/components/SpellManager';
import { LimitedUsesProvider, resolveClassResources } from '@/app/character/[id]/components/sections/ClassResourcesSection';
import { computeSpeciesSpellUses, countersForFeature, freeCastCounter } from '@/lib/featureUses';
import { getSpeciesSpellEntries, SPECIES_LINEAGE_SPELLS } from '@/lib/wizardReference';
import { buildActionRows } from '@/lib/actionRows';
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

const names = { 'faerie-fire': 'Faerie Fire', 'darkness': 'Darkness', 'speak-with-animals': 'Speak with Animals' };

describe('species spells', () => {
    it('finds spells by species id, name or lineage', () => {
        expect(getSpeciesSpellEntries('Deep Gnome').map((e) => e.spellId)).toEqual(['disguise-self', 'nondetection']);
        expect(getSpeciesSpellEntries('elf', 'drow').map((e) => [e.spellId, e.free])).toEqual([
            ['dancing-lights', undefined], ['faerie-fire', 'once'], ['darkness', 'once'],
        ]);
        // Every species spell names the trait that grants it
        for (const entries of Object.values(SPECIES_LINEAGE_SPELLS)) {
            for (const e of entries) expect(e.trait).toBeTruthy();
        }
    });

    it('gives one free cast per spell reached, or Proficiency Bonus casts for Forest Gnomes', () => {
        const drow = getSpeciesSpellEntries('elf', 'drow');
        expect(Object.keys(computeSpeciesSpellUses(drow, 3, 2, names))).toEqual(['Faerie Fire']);
        const at5 = computeSpeciesSpellUses(drow, 5, 3, names);
        expect(at5['Darkness']).toMatchObject({ current: 1, max: 1, resetType: 'long', source: 'species', feature: 'Elven Lineage', spellId: 'darkness' });

        const gnome = computeSpeciesSpellUses(getSpeciesSpellEntries('gnome', 'forest_gnome'), 5, 3, names);
        expect(gnome['Speak with Animals']).toMatchObject({ max: 3, feature: 'Gnomish Lineage' });
        // Without the spell list, names come from the id
        expect(Object.keys(computeSpeciesSpellUses(getSpeciesSpellEntries('genasi-water'), 5, 3, {}))).toEqual(['Create or Destroy Water', 'Water Walk']);
    });

    it('keeps stored free casts while spell names load, then adds new ones', () => {
        const input = {
            classLevels: { wizard: 5 }, subclassMap: {}, abilityScores: { int: 16 }, racialTraits: [], level: 5,
            hasChoiceSpells: false, speciesSpells: getSpeciesSpellEntries('elf', 'drow'),
        };
        const stored = { 'Faerie Fire': { name: 'Faerie Fire', current: 0, max: 1, resetType: 'long' as const, source: 'species' as const, feature: 'Elven Lineage', spellId: 'faerie-fire' } };
        const data = { classResources: stored, classResourcesRules: RESOURCE_RULES_VERSION };

        const loading = resolveClassResources({ ...input, data, choiceSpellNames: null });
        expect(loading.resources['Faerie Fire']).toEqual(stored['Faerie Fire']);
        expect(loading.resources['Darkness']).toBeUndefined();

        const loaded = resolveClassResources({ ...input, data, choiceSpellNames: names });
        expect(loaded.resources['Faerie Fire'].current).toBe(0);
        expect(loaded.resources['Darkness']).toMatchObject({ current: 1, max: 1 });
        expect(loaded.needsSave).toBe(true);
        expect(countersForFeature(loaded.resources, 'Elven Lineage (Drow)').map(([n]) => n)).toEqual(['Faerie Fire', 'Darkness']);
    });

    it('shows free casts left on the spell in the Actions card', () => {
        const resources = computeSpeciesSpellUses(getSpeciesSpellEntries('elf', 'drow'), 5, 3, names);
        resources['Darkness'].current = 0;
        const rows = buildActionRows({
            attacks: [], hasWeaponMastery: false, masteryWeapons: null, characterLevel: 5, primaryClass: 'fighter', storedActions: [],
            spellcasting: null, resources,
            castable: [{ id: 'darkness', grantedBy: 'Species' }],
            spells: [{ id: 'darkness', name: 'Darkness', level: 2, castingTime: 'Action', range: '60 feet', duration: 'Concentration, up to 10 minutes', components: 'V, M', description: 'Magical Darkness spreads.' }],
        });
        expect(rows.find((r) => r.name === 'Darkness')?.uses).toBe('0 / 1 free');
        expect(rows.filter((r) => r.name === 'Darkness')).toHaveLength(1);
        expect(freeCastCounter(resources, 'faerie-fire')?.[0]).toBe('Faerie Fire');
    });
});

describe('Spells tab free casts', () => {
    const spells = [
        { id: 'dancing-lights', name: 'Dancing Lights', level: 0, school: 'Illusion', classes: ['wizard'] },
        { id: 'faerie-fire', name: 'Faerie Fire', level: 1, school: 'Evocation', classes: ['druid'] },
        { id: 'darkness', name: 'Darkness', level: 2, school: 'Evocation', classes: ['wizard'] },
    ];

    function Sheet() {
        const [data, setData] = useState<Record<string, any>>({ classResourcesRules: RESOURCE_RULES_VERSION });
        const speciesSpells = getSpeciesSpellEntries('elf', 'drow');
        return (
            <LimitedUsesProvider
                characterId="c1" data={data} classLevels={{ fighter: 5 }} subclassMap={{}} abilityScores={{ cha: 12 }}
                racialTraits={[]} level={5} choiceSpellNames={names} hasChoiceSpells={false} speciesSpells={speciesSpells}
                onUpdate={(u) => setData((d) => ({ ...d, ...u }))}
            >
                <main>
                    <SpellManager
                        characterId="c1" classId="innate" level={5} initialSpells={[]} initialSlotsUsed={{}}
                        spellcastingAbility="cha" speciesSpells={speciesSpells} onUpdate={() => {}}
                    />
                </main>
            </LimitedUsesProvider>
        );
    }

    it('tracks each species spell cast without a slot', async () => {
        (api.get as jest.Mock).mockResolvedValue(spells);
        const { container } = render(<Sheet />);
        const pips = await screen.findByRole('group', { name: 'Faerie Fire uses: 1 of 1 left' });
        expect(screen.getByRole('group', { name: 'Darkness uses: 1 of 1 left' })).toBeInTheDocument();

        fireEvent.click(within(pips).getByRole('button', { name: 'Use 1' }));
        await waitFor(() => expect(screen.getByRole('group', { name: 'Faerie Fire uses: 0 of 1 left' })).toBeInTheDocument());
        expect(api.patch).toHaveBeenCalledWith('/characters/c1/class-resources', { resourceName: 'Faerie Fire', current: 0 });
        expect(await axe(container)).toHaveNoViolations();
    });
});
