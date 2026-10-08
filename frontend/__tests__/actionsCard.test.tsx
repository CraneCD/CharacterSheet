import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import ActionsCard from '@/app/character/[id]/components/ActionsCard';
import { DiceProvider } from '@/app/components/dice/DiceTray';
import { getWeaponAttacks } from '@/lib/attacks';
import { api } from '@/lib/api';

expect.extend(toHaveNoViolations);

jest.mock('@/lib/api', () => ({
    api: { get: jest.fn(), post: jest.fn().mockResolvedValue({}), patch: jest.fn().mockResolvedValue({}), delete: jest.fn().mockResolvedValue({}) },
}));

const SPELLS = [
    { id: 'cure-wounds', name: 'Cure Wounds', level: 1, castingTime: '1 action', range: 'Touch', components: 'V, S', duration: 'Instantaneous', description: 'A creature you touch regains a number of Hit Points equal to 2d8 plus your spellcasting ability modifier.' },
    { id: 'divine-smite', name: 'Divine Smite', level: 1, castingTime: '1 bonus action, which you take immediately after hitting a target with a Melee weapon or an Unarmed Strike', range: 'Self', components: 'V', duration: 'Instantaneous', description: 'The target takes an extra 2d8 Radiant damage from the attack.' },
];

const attacks = getWeaponAttacks({
    equipment: [{ name: 'Longsword', category: 'weapon', equipped: true, damage: '1d8', damageType: 'slashing', properties: ['Versatile (1d10)'] } as any],
    strMod: 3, dexMod: 0, profBonus: 3,
});

function renderCard(overrides: Partial<React.ComponentProps<typeof ActionsCard>> = {}) {
    const onUpdate = jest.fn();
    const utils = render(
        <DiceProvider>
            <main>
                <ActionsCard
                    characterId="c1"
                    attacks={attacks}
                    hasWeaponMastery
                    masteryWeapons={['longsword']}
                    castable={{ spells: [{ id: 'cure-wounds' }, { id: 'divine-smite' }], maxSlots: [4, 2], slotsUsed: { 1: 1 }, pact: null }}
                    spellcasting={{ attack: 6, dc: 14, modifier: 3 }}
                    characterLevel={5}
                    resources={{ 'Lay on Hands': { name: 'Lay on Hands', current: 25, max: 25, resetType: 'long', description: 'Restore Hit Points from a pool.' } }}
                    primaryClass="paladin"
                    storedActions={[
                        { name: 'Cast Cure Wounds', type: 'action', description: '**Casting Time:** 1 action\n\nold', spellId: 'cure-wounds' },
                        { name: 'Grapple', type: 'action', description: 'Replace one attack.' },
                    ]}
                    extraAttacks={1}
                    onUpdate={onUpdate}
                    {...overrides}
                />
            </main>
        </DiceProvider>
    );
    return { ...utils, onUpdate };
}

beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockResolvedValue(SPELLS);
});

describe('ActionsCard', () => {
    it('shows a ranged weapon\'s ammunition and spends one per attack roll', async () => {
        const shortbow = { name: 'Shortbow', category: 'weapon', equipped: true, damage: '1d6', damageType: 'piercing', properties: ['ammunition (range 80/320)', 'two-handed'] } as any;
        const equipment = [shortbow, { name: 'Arrows', category: 'miscellaneous', quantity: 2 } as any];
        const { container, onUpdate } = renderCard({
            attacks: getWeaponAttacks({ equipment, strMod: 0, dexMod: 3, profBonus: 2 }),
            equipment,
        });
        await screen.findByText('Cure Wounds');
        expect(screen.getByText('Arrows 2')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Roll Shortbow attack, +5' }));
        expect(onUpdate).toHaveBeenLastCalledWith({ equipment: [shortbow, { name: 'Arrows', category: 'miscellaneous', quantity: 1 }] });
        await waitFor(() => expect(api.patch).toHaveBeenCalledWith('/characters/c1/equipment', { index: 1, item: { quantity: 1 } }));

        fireEvent.click(screen.getByRole('button', { name: 'Add one to your Arrows' }));
        expect(api.patch).toHaveBeenLastCalledWith('/characters/c1/equipment', { index: 1, item: { quantity: 3 } });
        expect(await axe(container)).toHaveNoViolations();
    });

    it('groups weapons, spells, features and custom actions by timing', async () => {
        const { container } = renderCard();
        await screen.findByText('Cure Wounds');

        expect(screen.getByRole('tab', { name: 'Action 3' })).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('tab', { name: 'Bonus 2' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'Reaction 1' })).toBeInTheDocument();
        expect(screen.getByText(/lets you make 2 attacks/)).toBeInTheDocument();

        // Weapon row: mastery label, rollable to-hit and damage; the old saved spell copy is not shown twice
        const panel = screen.getByRole('tabpanel');
        expect(within(panel).getByRole('button', { name: 'Roll Longsword attack, +6' })).toBeInTheDocument();
        expect(within(panel).getByRole('button', { name: 'Roll Longsword damage, 1d8+3' })).toBeInTheDocument();
        expect(within(panel).getAllByText('Cure Wounds')).toHaveLength(1);
        expect(within(panel).getByRole('img', { name: 'Level 1 slots: 3 of 4 left' })).toBeInTheDocument();
        expect(within(panel).getByRole('button', { name: 'Roll Cure Wounds healing, 2d8+3' })).toBeInTheDocument();

        expect(await axe(container)).toHaveNoViolations();
    });

    it('switches tabs by click and arrow keys', async () => {
        renderCard();
        await screen.findByText('Cure Wounds');
        fireEvent.click(screen.getByRole('tab', { name: /^Bonus/ }));
        const bonus = screen.getByRole('tabpanel');
        expect(within(bonus).getByText('Divine Smite')).toBeInTheDocument();
        expect(within(bonus).getByText(/Immediately after hitting a target/)).toBeInTheDocument();
        expect(within(bonus).getByText('25 / 25')).toBeInTheDocument();

        fireEvent.keyDown(screen.getByRole('tab', { name: /^Bonus/ }), { key: 'ArrowRight' });
        expect(screen.getByRole('tab', { name: /^Reaction/ })).toHaveFocus();
        expect(within(screen.getByRole('tabpanel')).getByText('Opportunity Attack')).toBeInTheDocument();
    });

    it('opens a row, the mastery rule and a basic action', async () => {
        renderCard();
        await screen.findByText('Cure Wounds');
        const toggle = screen.getByRole('button', { name: 'Show details for Longsword' });
        fireEvent.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        expect(screen.getByText(/Sap \(mastery\)\./)).toBeVisible();

        fireEvent.click(screen.getByRole('button', { name: 'Dodge' }));
        expect(screen.getByText(/attack rolls against you have Disadvantage/)).toBeInTheDocument();
    });

    it("spends an item action's charges", async () => {
        const equipment = [{ name: 'Wand of Webs', category: 'magic-item', charges: { current: 3, max: 7, regain: '1d6+1' } } as any];
        const { onUpdate } = renderCard({
            equipment,
            storedActions: [{ name: 'Web', type: 'action', description: 'Cast Web.', item: 'Wand of Webs', charges: 2 }],
        });
        await screen.findByText('Cure Wounds');
        expect(screen.getByText('3/7 charges')).toBeInTheDocument();
        expect(screen.getByText('Uses 2 charges.')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Spend 2 charges of Wand of Webs' }));
        expect(onUpdate).toHaveBeenLastCalledWith({ equipment: [{ ...equipment[0], charges: { current: 1, max: 7, regain: '1d6+1' } }] });
        await waitFor(() => expect(api.patch).toHaveBeenCalledWith('/characters/c1/equipment', { index: 0, item: { charges: { current: 1, max: 7, regain: '1d6+1' } } }));
    });

    it('shows Markdown in item and spell text', async () => {
        renderCard({
            storedActions: [{ name: 'Use Javelin of Lightning', type: 'action', description: 'Weapon (Javelin)\n**Lightning Bolt.** Turn the weapon into a bolt of lightning.\n- 4d6 Lightning damage' }],
        });
        await screen.findByText('Cure Wounds');
        fireEvent.click(screen.getByRole('button', { name: 'Show details for Javelin of Lightning' }));
        const bolt = screen.getByText('Lightning Bolt.');
        expect(bolt.tagName).toBe('STRONG');
        expect(bolt).toBeVisible();
        expect(screen.getByText('4d6 Lightning damage').tagName).toBe('LI');
        expect(screen.queryByText(/\*\*/)).toBeNull();
    });

    it('adds and removes custom actions', async () => {
        const { onUpdate } = renderCard();
        await screen.findByText('Cure Wounds');
        fireEvent.click(screen.getByRole('button', { name: '+ Custom' }));
        fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Shove' } });
        fireEvent.change(screen.getByLabelText('When'), { target: { value: 'bonus' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Push a creature 5 feet.' } });
        await act(async () => { fireEvent.click(screen.getByRole('button', { name: 'Add action' })); });

        expect(api.post).toHaveBeenCalledWith('/characters/c1/actions', { action: { name: 'Shove', type: 'bonus', description: 'Push a creature 5 feet.' } });
        expect(onUpdate).toHaveBeenCalledWith({ actions: expect.arrayContaining([expect.objectContaining({ name: 'Shove' })]) });
        expect(screen.getByRole('tab', { name: /^Bonus/ })).toHaveAttribute('aria-selected', 'true');

        fireEvent.click(screen.getByRole('tab', { name: /^Action/ }));
        fireEvent.click(screen.getByRole('button', { name: 'Show details for Grapple' }));
        fireEvent.click(screen.getByRole('button', { name: 'Remove Grapple' }));
        await waitFor(() => expect(api.delete).toHaveBeenCalledWith('/characters/c1/actions', { data: { index: 1, name: 'Grapple' } }));
    });

    it('rolls from a row into the dice tray', async () => {
        jest.spyOn(Math, 'random').mockReturnValue(0.5);
        renderCard();
        await screen.findByText('Cure Wounds');
        fireEvent.click(screen.getByRole('button', { name: 'Roll Cure Wounds healing, 2d8+3' }));
        await waitFor(() => expect(screen.getByRole('region', { name: 'Dice tray' })).toHaveTextContent('Cure Wounds healing'));
        jest.restoreAllMocks();
    });
});
