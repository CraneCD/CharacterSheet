import { useState } from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import FeaturesCard from '@/app/character/components/sections/FeaturesCard';
import LimitedUsesCard from '@/app/character/components/LimitedUsesCard';
import { LimitedUsesProvider } from '@/app/character/components/sections/ClassResourcesSection';
import { SheetReadOnlyProvider } from '@/app/character/SheetReadOnly';
import { buildFeatureGroups } from '@/lib/featureList';
import { RESOURCE_RULES_VERSION } from '@/lib/classResources';
import { api } from '@/lib/api';

expect.extend(toHaveNoViolations);

jest.mock('@/lib/api', () => ({
    api: {
        get: jest.fn().mockResolvedValue([]),
        post: jest.fn().mockResolvedValue({}),
        put: jest.fn().mockResolvedValue({}),
        patch: jest.fn().mockResolvedValue({}),
        delete: jest.fn().mockResolvedValue({}),
    },
}));

const scores = { str: 16, dex: 12, con: 14, int: 10, wis: 14, cha: 8 };
const classFeatures = [
    { name: 'Second Wind', description: 'Regain Hit Points as a Bonus Action. Uses reset on a rest.', source: 'Class: Fighter', level: 1 },
    { name: 'Action Surge', description: 'Take one additional action.', source: 'Class: Fighter', level: 2 },
];

function Sheet({ initial, readOnly = false }: { initial: Record<string, any>; readOnly?: boolean }) {
    const [data, setData] = useState(initial);
    const features = Array.isArray(data.features) ? data.features : [];
    const groups = buildFeatureGroups({
        stored: features,
        racialTraits: [{ name: 'Breath Weapon', description: 'Exhale destructive energy. More text.' }],
        speciesName: 'Dragonborn',
        classFeatures,
        subclassFeatures: [],
    });
    return (
        <SheetReadOnlyProvider value={readOnly}>
            <LimitedUsesProvider
                characterId="c1"
                data={data}
                classLevels={{ fighter: 3 }}
                subclassMap={{}}
                abilityScores={scores}
                racialTraits={['Breath Weapon']}
                level={3}
                choiceSpellNames={null}
                hasChoiceSpells={false}
                features={[...features, ...classFeatures]}
                readOnly={readOnly}
                onUpdate={(u) => setData((d) => ({ ...d, ...u }))}
            >
                <main>
                    <LimitedUsesCard />
                    <FeaturesCard characterId="c1" groups={groups} storedFeatures={features} onFeaturesChange={(f) => setData((d) => ({ ...d, features: f }))} />
                </main>
            </LimitedUsesProvider>
        </SheetReadOnlyProvider>
    );
}

const initial = {
    classResourcesRules: RESOURCE_RULES_VERSION,
    features: [
        { name: 'Action Surge', source: 'Class: Fighter', description: 'Stored at level-up' },
        { name: 'Lucky Charm', source: 'Custom', description: 'Reroll a 1 once a day.' },
    ],
};

const featuresCard = () => screen.getByRole('heading', { name: 'Features & Traits' }).closest('.card') as HTMLElement;

beforeEach(() => jest.clearAllMocks());

describe('Features & Traits card', () => {
    it('groups features, expands a row and tracks its uses', async () => {
        const { container } = render(<Sheet initial={initial} />);
        const card = featuresCard();
        expect(within(card).getByRole('heading', { name: /Species: Dragonborn/ })).toBeInTheDocument();
        expect(within(card).getByRole('heading', { name: /Custom/ })).toBeInTheDocument();

        const toggle = within(card).getByRole('button', { name: /Breath Weapon/ });
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        expect(within(card).getByText('Exhale destructive energy. More text.')).toBeVisible();

        // Breath Weapon: Proficiency Bonus (2) uses, shown on the row and in Limited Uses
        const pips = within(card).getByRole('group', { name: 'Breath Weapon uses: 2 of 2 left' });
        fireEvent.click(within(pips).getByRole('button', { name: 'Use 1' }));
        await waitFor(() => expect(screen.getAllByRole('group', { name: 'Breath Weapon uses: 1 of 2 left' })).toHaveLength(2));
        expect(api.patch).toHaveBeenCalledWith('/characters/c1/class-resources', { resourceName: 'Breath Weapon', current: 1 }, { offline: true });

        expect(await axe(container)).toHaveNoViolations();
    });

    it('filters by search text and by limited uses', () => {
        render(<Sheet initial={initial} />);
        const card = featuresCard();
        fireEvent.change(within(card).getByLabelText('Search features'), { target: { value: 'reroll' } });
        expect(within(card).getByRole('button', { name: /Lucky Charm/ })).toBeInTheDocument();
        expect(within(card).queryByRole('button', { name: /Breath Weapon/ })).not.toBeInTheDocument();

        fireEvent.change(within(card).getByLabelText('Search features'), { target: { value: '' } });
        fireEvent.click(within(card).getByRole('button', { name: 'Limited use' }));
        const names = within(card).getAllByRole('button', { expanded: false }).map((b) => b.textContent);
        expect(names.some((n) => n?.includes('Second Wind'))).toBe(true);
        expect(names.some((n) => n?.includes('Lucky Charm'))).toBe(false);
    });

    it('adds a custom feature with limited uses', async () => {
        render(<Sheet initial={initial} />);
        fireEvent.click(within(featuresCard()).getByRole('button', { name: '+ Add feature' }));
        const dialog = screen.getByRole('dialog', { name: 'Add a feature' });
        fireEvent.change(within(dialog).getByLabelText('Name'), { target: { value: 'Wand of Sparks' } });
        fireEvent.change(within(dialog).getByLabelText('Description'), { target: { value: 'Shoot sparks.' } });
        fireEvent.click(within(dialog).getByLabelText('Has limited uses'));
        fireEvent.change(within(dialog).getByLabelText('Uses'), { target: { value: '3' } });
        fireEvent.change(within(dialog).getByLabelText('Regain'), { target: { value: 'short' } });
        fireEvent.click(within(dialog).getByRole('button', { name: 'Add feature' }));

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        expect(api.post).toHaveBeenCalledWith('/characters/c1/features', {
            feature: { name: 'Wand of Sparks', source: 'Custom', description: 'Shoot sparks.', custom: true },
        });
        expect(api.patch).toHaveBeenCalledWith('/characters/c1/class-resources', {
            resourceName: 'Wand of Sparks',
            resource: { name: 'Wand of Sparks', current: 3, max: 3, resetType: 'short', source: 'custom', feature: 'Wand of Sparks', description: 'Shoot sparks.' },
        }, { offline: true });
        expect(within(featuresCard()).getByRole('group', { name: 'Wand of Sparks uses: 3 of 3 left' })).toBeInTheDocument();
    });

    it('renames a custom feature and moves its uses to the new name', async () => {
        const charm = { name: 'Lucky Charm', current: 0, max: 2, resetType: 'long' as const, source: 'custom' as const, feature: 'Lucky Charm' };
        render(<Sheet initial={{ ...initial, classResources: { 'Lucky Charm': charm } }} />);
        fireEvent.click(within(featuresCard()).getByRole('button', { name: /Lucky Charm/ }));
        fireEvent.click(within(featuresCard()).getByRole('button', { name: 'Edit' }));
        const dialog = screen.getByRole('dialog', { name: 'Edit Lucky Charm' });
        expect(within(dialog).getByLabelText('Has limited uses')).toBeChecked();
        fireEvent.change(within(dialog).getByLabelText('Name'), { target: { value: 'Rabbit Foot' } });
        fireEvent.click(within(dialog).getByRole('button', { name: 'Save' }));

        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        expect(api.put).toHaveBeenCalledWith('/characters/c1/features', {
            index: 1, name: 'Lucky Charm', feature: { name: 'Rabbit Foot', source: 'Custom', description: 'Reroll a 1 once a day.', custom: true },
        });
        expect(api.patch).toHaveBeenCalledWith('/characters/c1/class-resources', { resourceName: 'Lucky Charm', remove: true }, { offline: true });
        const card = featuresCard();
        expect(within(card).getByRole('group', { name: 'Rabbit Foot uses: 0 of 2 left' })).toBeInTheDocument();
        expect(within(card).queryByRole('group', { name: /Lucky Charm uses/ })).not.toBeInTheDocument();
    });

    it('removes a custom feature by its stored position and name after confirming', async () => {
        render(<Sheet initial={initial} />);
        const card = featuresCard();
        fireEvent.click(within(card).getByRole('button', { name: /Lucky Charm/ }));
        fireEvent.click(within(card).getByRole('button', { name: 'Remove' }));
        const confirm = screen.getByRole('alertdialog', { name: 'Remove Lucky Charm?' });
        fireEvent.click(within(confirm).getByRole('button', { name: 'Remove' }));

        await waitFor(() => expect(within(featuresCard()).queryByRole('button', { name: /Lucky Charm/ })).not.toBeInTheDocument());
        // Index 1 in storage, although it's the first stored entry the card shows
        expect(api.delete).toHaveBeenCalledWith('/characters/c1/features', { data: { index: 1, name: 'Lucky Charm' } });
    });

    it('shows uses but no edit controls to the DM', () => {
        render(<Sheet initial={initial} readOnly />);
        const card = featuresCard();
        expect(within(card).queryByRole('button', { name: '+ Add feature' })).not.toBeInTheDocument();
        fireEvent.click(within(card).getByRole('button', { name: /Lucky Charm/ }));
        expect(within(card).queryByRole('button', { name: 'Remove' })).not.toBeInTheDocument();
        expect(within(card).getByRole('group', { name: 'Breath Weapon uses: 2 of 2 left' })).toBeInTheDocument();
        // Nothing is saved from the DM's view
        expect(api.patch).not.toHaveBeenCalled();
    });
});
