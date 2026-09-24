import { act, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { announceRoll, describeRoll, formatBonus, parseDice, rollD20, rollDamage, rollDie } from '@/lib/dice';
import { DiceProvider, RollButton } from '@/app/components/dice/DiceTray';
import SkillsCard from '@/app/character/[id]/components/sections/SkillsCard';

expect.extend(toHaveNoViolations);

/** Returns a random() that yields each die face in turn (1-based) for d`sides`. */
function faces(sides: number, ...values: number[]) {
    let i = 0;
    return () => (values[i++ % values.length] - 1) / sides;
}

describe('dice rules', () => {
    it('rolls every face of a die', () => {
        expect(rollDie(20, () => 0)).toBe(1);
        expect(rollDie(20, () => 0.9999)).toBe(20);
        expect(rollDie(6, faces(6, 4))).toBe(4);
    });

    it('keeps the higher die with advantage and the lower with disadvantage', () => {
        expect(rollD20('Stealth', 3, 'normal', faces(20, 12))).toMatchObject({ rolls: [12], natural: 12, total: 15 });
        expect(rollD20('Stealth', 3, 'advantage', faces(20, 5, 17))).toMatchObject({ rolls: [5, 17], natural: 17, total: 20 });
        expect(rollD20('Stealth', -1, 'disadvantage', faces(20, 5, 17))).toMatchObject({ natural: 5, total: 4 });
    });

    it('parses damage expressions', () => {
        expect(parseDice('1d8')).toEqual({ dice: [{ count: 1, sides: 8 }], bonus: 0 });
        expect(parseDice('2d6 + 1d4 - 1')).toEqual({ dice: [{ count: 2, sides: 6 }, { count: 1, sides: 4 }], bonus: -1 });
        expect(parseDice('d12+3')).toEqual({ dice: [{ count: 1, sides: 12 }], bonus: 3 });
        expect(parseDice('1')).toEqual({ dice: [], bonus: 1 });
        expect(parseDice('')).toBeNull();
        expect(parseDice('fire')).toBeNull();
        expect(parseDice('-1d6')).toBeNull();
    });

    it('rolls damage and doubles the dice (not the modifier) on a crit', () => {
        expect(rollDamage('Longsword damage', '1d8', 3, false, faces(8, 5))).toMatchObject({ rolls: [5], total: 8, expression: '1d8+3' });
        expect(rollDamage('Longsword damage', '1d8', 3, true, faces(8, 5, 2))).toMatchObject({ rolls: [5, 2], total: 10, expression: '2d8+3', critical: true });
        expect(rollDamage('Dagger damage', '1d4', -3, false, faces(4, 1))?.total).toBe(0);
        expect(rollDamage('Nothing', 'lots')).toBeNull();
    });

    it('describes rolls for the tray and screen readers', () => {
        const adv = rollD20('Perception', 4, 'advantage', faces(20, 20, 3));
        expect(describeRoll(adv)).toBe('d20 (20, 3) + 4');
        expect(announceRoll(adv)).toBe('Perception with advantage: 24, natural 20');
        expect(describeRoll(rollD20('Strength check', -1, 'normal', faces(20, 1)))).toBe('d20 1 − 1');
        expect(describeRoll(rollDamage('Club damage', '1d4', 2, false, faces(4, 3))!)).toBe('1d4+2: 3 + 2');
        expect(formatBonus(-2)).toBe('−2');
        expect(formatBonus(0)).toBe('');
    });
});

describe('DiceTray', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(Math, 'random').mockReturnValue(0.5); // every die shows its middle face (d20: 11)
    });
    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('rolls a tapped modifier, announces it and keeps a log', async () => {
        const { container } = render(
            <DiceProvider>
                <main>
                    <SkillsCard skills={[{ name: 'Stealth', stat: 'dex', total: 5, isProficient: true, hasExpertise: false }]} onToggleProficiency={() => {}} />
                </main>
            </DiceProvider>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Roll Stealth, +5' }));
        act(() => { jest.advanceTimersByTime(700); });
        expect(screen.getByRole('status')).toHaveTextContent('Stealth: 16');
        expect(screen.getByRole('region', { name: 'Dice tray' })).toHaveTextContent('d20 11 + 5');

        fireEvent.click(screen.getByRole('button', { name: 'Advantage' }));
        act(() => { jest.advanceTimersByTime(700); });
        expect(screen.getByRole('status')).toHaveTextContent('Stealth with advantage: 16');
        expect(screen.getByRole('list', { name: 'Earlier rolls' })).toHaveTextContent('Stealth: 16');

        jest.useRealTimers();
        expect(await axe(container)).toHaveNoViolations();
    });

    it('offers damage after an attack roll', () => {
        render(
            <DiceProvider>
                <RollButton label="Longsword attack" modifier={5} damage={{ expression: '1d8', modifier: 3 }}>+5</RollButton>
            </DiceProvider>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Roll Longsword attack, +5' }));
        fireEvent.click(screen.getByRole('button', { name: 'Damage 1d8+3' }));
        act(() => { jest.advanceTimersByTime(700); });
        expect(screen.getByRole('status')).toHaveTextContent('Longsword damage: 8');

        fireEvent.click(screen.getByRole('button', { name: 'Close dice tray' }));
        expect(screen.queryByRole('region', { name: 'Dice tray' })).not.toBeInTheDocument();
    });

    it('is plain text without a provider', () => {
        render(<RollButton label="Stealth" modifier={5}>+5</RollButton>);
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.getByText('+5')).toBeInTheDocument();
    });
});
