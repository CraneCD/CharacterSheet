import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';
import Menu from '@/app/components/ui/Menu';
import { ToastProvider } from '@/app/components/ui/Toast';
import HPManager from '@/app/character/[id]/components/HPManager';
import { LongRestDialog, ShortRestDialog } from '@/app/character/[id]/components/RestDialogs';
import SheetTabs, { SheetTabId } from '@/app/character/[id]/components/SheetTabs';
import { api } from '@/lib/api';

jest.mock('@/lib/api', () => ({
    api: { get: jest.fn(), post: jest.fn(), patch: jest.fn(), delete: jest.fn() },
}));
const mockedApi = api as jest.Mocked<typeof api>;

describe('Menu', () => {
    function renderMenu() {
        const onNotes = jest.fn();
        const onLevelDown = jest.fn();
        render(
            <>
                <Menu
                    label="⋯"
                    ariaLabel="More actions"
                    items={[
                        { label: 'Notepad', onSelect: onNotes },
                        { label: 'Print', onSelect: () => {}, disabled: true },
                        { label: 'Level Down…', onSelect: onLevelDown, danger: true, separatorBefore: true },
                    ]}
                />
                <p>Outside</p>
            </>
        );
        return { onNotes, onLevelDown, trigger: screen.getByRole('button', { name: 'More actions' }) };
    }

    it('opens on click, focuses the first item and skips disabled items with the arrow keys', () => {
        const { trigger } = renderMenu();
        expect(trigger).toHaveAttribute('aria-expanded', 'false');
        fireEvent.click(trigger);
        expect(trigger).toHaveAttribute('aria-expanded', 'true');
        const notepad = screen.getByRole('menuitem', { name: 'Notepad' });
        expect(notepad).toHaveFocus();
        fireEvent.keyDown(notepad, { key: 'ArrowDown' });
        expect(screen.getByRole('menuitem', { name: 'Level Down…' })).toHaveFocus();
        fireEvent.keyDown(document.activeElement!, { key: 'ArrowDown' });
        expect(notepad).toHaveFocus();
        fireEvent.keyDown(notepad, { key: 'End' });
        expect(screen.getByRole('menuitem', { name: 'Level Down…' })).toHaveClass('menu-item-danger');
    });

    it('runs the chosen item, closes and returns focus to the trigger', () => {
        const { trigger, onLevelDown } = renderMenu();
        fireEvent.click(trigger);
        fireEvent.click(screen.getByRole('menuitem', { name: 'Level Down…' }));
        expect(onLevelDown).toHaveBeenCalled();
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();
    });

    it('closes on Escape and on an outside click', () => {
        const { trigger } = renderMenu();
        fireEvent.click(trigger);
        fireEvent.keyDown(screen.getByRole('menuitem', { name: 'Notepad' }), { key: 'Escape' });
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
        expect(trigger).toHaveFocus();

        fireEvent.click(trigger);
        fireEvent.mouseDown(screen.getByText('Outside'));
        expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    });
});

describe('HPManager', () => {
    beforeEach(() => jest.resetAllMocks());

    function renderHP(hp = { current: 20, max: 30, temp: 5 }) {
        const onUpdate = jest.fn();
        render(<ToastProvider><HPManager characterId="c1" initialHP={hp} onUpdate={onUpdate} /></ToastProvider>);
        return onUpdate;
    }

    it('applies damage to temp HP first and saves it', async () => {
        mockedApi.patch.mockResolvedValue({});
        const onUpdate = renderHP();
        fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '8' } });
        fireEvent.click(screen.getByRole('button', { name: 'Damage' }));

        expect(screen.getByRole('progressbar', { name: 'Hit points' })).toHaveAttribute('aria-valuenow', '17');
        expect(screen.getByText('Took 8 damage · 5 absorbed by temp HP')).toBeInTheDocument();
        expect(onUpdate).toHaveBeenCalledWith(expect.objectContaining({ current: 17, temp: 0 }));
        expect(mockedApi.patch).toHaveBeenCalledWith('/characters/c1/hp', expect.objectContaining({ current: 17, temp: 0 }));
        expect(screen.getByLabelText('Amount')).toHaveValue('');
    });

    it('heals up to max, and the buttons need an amount', () => {
        mockedApi.patch.mockResolvedValue({});
        renderHP({ current: 25, max: 30, temp: 0 });
        expect(screen.getByRole('button', { name: 'Heal' })).toBeDisabled();
        fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '10' } });
        fireEvent.click(screen.getByRole('button', { name: 'Heal' }));
        expect(screen.getByText('Healed 5 HP')).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '30');
    });

    it('rolls back and explains when saving fails', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        mockedApi.patch.mockRejectedValue(new Error('Server down'));
        renderHP({ current: 20, max: 30, temp: 0 });
        fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '4' } });
        fireEvent.click(screen.getByRole('button', { name: 'Damage' }));
        expect(await screen.findByText("Couldn't update HP: Server down")).toBeInTheDocument();
        expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '20');
    });

    it('shows the unconscious state with death saves at 0 HP', () => {
        mockedApi.patch.mockResolvedValue({});
        renderHP({ current: 0, max: 30, temp: 0 });
        expect(screen.getByText('Unconscious')).toBeInTheDocument();
        expect(screen.getByRole('group', { name: 'Death saves' })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('checkbox', { name: /Critical hit/ }));
        fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '3' } });
        fireEvent.click(screen.getByRole('button', { name: 'Damage' }));
        expect(screen.getByRole('button', { name: 'Failure 2' })).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('button', { name: 'Failure 3' })).toHaveAttribute('aria-pressed', 'false');
    });

    it('hides death saves while conscious', () => {
        renderHP();
        expect(screen.queryByRole('group', { name: 'Death saves' })).not.toBeInTheDocument();
    });
});

const restCtx = { warlockLevel: 0, multiclass: false, hasMagicInitiateSpell: false };

describe('Rest dialogs', () => {
    it('previews a long rest and confirms it', () => {
        const onConfirm = jest.fn();
        render(
            <LongRestDialog
                data={{ hp: { current: 10, max: 30, temp: 0 }, hitDice: { total: 3, spent: 1, dieType: 10 } }}
                context={restCtx}
                busy={false}
                onConfirm={onConfirm}
                onCancel={() => {}}
            />
        );
        expect(screen.getByRole('dialog', { name: 'Long Rest' })).toBeInTheDocument();
        expect(screen.getByText('HP restored to 30 (+20)')).toBeInTheDocument();
        expect(screen.getByText('Regained 1 Hit Die')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Take Long Rest' }));
        expect(onConfirm).toHaveBeenCalled();
    });

    it('says when there is nothing to recover', () => {
        render(<LongRestDialog data={{ hp: { current: 30, max: 30, temp: 0 } }} context={restCtx} busy={false} onConfirm={() => {}} onCancel={() => {}} />);
        expect(screen.getByText(/already fully rested/)).toBeInTheDocument();
    });

    it('rolls hit dice, lets you type your own roll and previews the healing', () => {
        const random = jest.spyOn(Math, 'random').mockReturnValue(0.5); // d10 -> 6
        const onConfirm = jest.fn();
        render(
            <ShortRestDialog
                data={{ hp: { current: 10, max: 30, temp: 0 }, hitDice: { total: 3, spent: 1, dieType: 10 } }}
                context={restCtx}
                conModifier={2}
                busy={false}
                onConfirm={onConfirm}
                onCancel={() => {}}
            />
        );
        const roll = screen.getByRole('button', { name: 'Roll a d10' });
        fireEvent.click(roll);
        fireEvent.click(roll);
        expect(roll).toBeDisabled(); // only 2 dice available
        expect(screen.getByText('HP 10 →', { exact: false })).toHaveTextContent('HP 10 → 26 / 30');

        fireEvent.change(screen.getByLabelText('Die 2'), { target: { value: '1' } });
        expect(screen.getByText('HP 10 →', { exact: false })).toHaveTextContent('HP 10 → 21 / 30');

        fireEvent.click(screen.getByRole('button', { name: 'Remove die 1' }));
        fireEvent.click(screen.getByRole('button', { name: 'Finish Short Rest' }));
        expect(onConfirm).toHaveBeenCalledWith([1]);
        random.mockRestore();
    });
});

describe('SheetTabs', () => {
    it('selects tabs by click and arrow keys', () => {
        function Harness() {
            const [active, setActive] = useState<SheetTabId>('combat');
            return (
                <SheetTabs
                    tabs={[{ id: 'core', label: 'Core' }, { id: 'combat', label: 'Combat' }, { id: 'gear', label: 'Gear' }]}
                    active={active}
                    onChange={setActive}
                />
            );
        }
        render(<Harness />);
        expect(screen.getByRole('tab', { name: 'Combat' })).toHaveAttribute('aria-selected', 'true');
        fireEvent.keyDown(screen.getByRole('tab', { name: 'Combat' }), { key: 'ArrowRight' });
        expect(screen.getByRole('tab', { name: 'Gear' })).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByRole('tab', { name: 'Gear' })).toHaveFocus();
        fireEvent.keyDown(screen.getByRole('tab', { name: 'Gear' }), { key: 'ArrowRight' });
        expect(screen.getByRole('tab', { name: 'Core' })).toHaveAttribute('aria-selected', 'true');
        fireEvent.click(screen.getByRole('tab', { name: 'Gear' }));
        expect(screen.getByRole('tab', { name: 'Gear' })).toHaveAttribute('aria-selected', 'true');
    });
});
