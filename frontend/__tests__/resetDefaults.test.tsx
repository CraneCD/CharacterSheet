import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { defaultSpeed, overrideToStore, resolveOverride } from '@/lib/sheetDefaults';
import { EditableStat } from '@/app/components/ui';
import ClassResourcesManager from '@/app/character/[id]/components/ClassResourcesManager';
import { defaultResourceMaximums } from '@/app/character/[id]/components/sections/ClassResourcesSection';
import { api } from '@/lib/api';

expect.extend(toHaveNoViolations);

jest.mock('@/lib/api', () => ({ api: { patch: jest.fn().mockResolvedValue({}) } }));

describe('sheet overrides', () => {
    it('uses the calculated value unless a different number is stored', () => {
        expect(resolveOverride(undefined, 13)).toEqual({ value: 13, calculated: 13, overridden: false });
        expect(resolveOverride(null, 13)).toEqual({ value: 13, calculated: 13, overridden: false });
        expect(resolveOverride(16, 13)).toEqual({ value: 16, calculated: 13, overridden: true });
        // An older save that stored the calculated value isn't an override
        expect(resolveOverride(13, 13).overridden).toBe(false);
        expect(resolveOverride('16', 13).value).toBe(13);
    });

    it('clears the override when the calculated value is entered', () => {
        expect(overrideToStore(13, 13)).toBeNull();
        expect(overrideToStore(15, 13)).toBe(15);
    });

    it('defaults speed to the species, with Wood Elves at 35', () => {
        expect(defaultSpeed(25)).toBe(25);
        expect(defaultSpeed(undefined)).toBe(30);
        expect(defaultSpeed(30, 'wood_elf')).toBe(35);
        expect(defaultSpeed(30, 'Wood Elf')).toBe(35);
        expect(defaultSpeed(30, 'drow')).toBe(30);
    });
});

describe('EditableStat reset', () => {
    it('shows a labelled reset button only when given onReset', async () => {
        const onReset = jest.fn();
        const { container, rerender } = render(
            <main><EditableStat label="AC" value={16} min={0} max={50} onSave={() => {}} onReset={onReset} resetLabel="Reset AC to calculated 13" /></main>
        );
        fireEvent.click(screen.getByRole('button', { name: 'Reset AC to calculated 13' }));
        expect(onReset).toHaveBeenCalledTimes(1);
        expect(await axe(container)).toHaveNoViolations();

        rerender(<main><EditableStat label="AC" value={13} min={0} max={50} onSave={() => {}} /></main>);
        expect(screen.queryByRole('button', { name: /Reset/ })).not.toBeInTheDocument();
    });
});

describe('class resource maximum reset', () => {
    const resources = {
        'Second Wind': { name: 'Second Wind', current: 2, max: 5, resetType: 'long' as const },
        'Action Surge': { name: 'Action Surge', current: 1, max: 1, resetType: 'short' as const },
    };

    it('offers reset for edited maximums and saves the calculated one', async () => {
        const onUpdate = jest.fn();
        render(<ClassResourcesManager characterId="c1" initialResources={resources} onUpdate={onUpdate} defaultMax={{ 'Second Wind': 2, 'Action Surge': 1 }} />);

        expect(screen.queryByRole('button', { name: /Reset Action Surge/ })).not.toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Reset Second Wind maximum to 2' }));

        await waitFor(() => expect(onUpdate).toHaveBeenCalled());
        expect(api.patch).toHaveBeenCalledWith('/characters/c1/class-resources', {
            resources: { ...resources, 'Second Wind': { ...resources['Second Wind'], max: 2, current: 2 } },
        });
        expect(screen.getByText('2 / 2')).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: /Reset Second Wind/ })).not.toBeInTheDocument();
    });

    it('calculates default maximums ignoring stored edits', () => {
        const input = { classLevels: { fighter: 3 }, subclassMap: {}, abilityScores: { str: 16, dex: 12, con: 14, int: 10, wis: 10, cha: 8 }, racialTraits: [], level: 3, choiceSpellNames: null, hasChoiceSpells: false };
        const defaults = defaultResourceMaximums({ ...input, data: {} });
        const edited = defaultResourceMaximums({ ...input, data: { classResources: { 'Second Wind': { name: 'Second Wind', current: 9, max: 9, resetType: 'long' } } } });
        expect(defaults['Second Wind']).toBeGreaterThan(0);
        expect(edited).toEqual(defaults);
    });
});
