import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import { DiceProvider, RollButton } from '@/app/components/dice/DiceTray';
import { ToastProvider } from '@/app/components/ui/Toast';
import { ActiveConditions } from '@/lib/conditions';
import ConditionsCard from '@/app/character/[id]/components/sections/ConditionsCard';
import NotesCard from '@/app/character/[id]/components/sections/NotesCard';
import SensesCard from '@/app/character/[id]/components/sections/SensesCard';
import { CoreCardId, useCoreColumnFit } from '@/app/character/[id]/useCoreColumnFit';

const collapse = { collapsed: false, onToggle: () => {} };

describe('conditions in the dice tray', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.spyOn(Math, 'random').mockReturnValue(0.5); // every d20 shows 11
    });
    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('rolls with Disadvantage and the Exhaustion penalty, and says why', () => {
        render(
            <DiceProvider conditions={{ conditions: ['Poisoned'], exhaustion: 2 }}>
                <RollButton label="Stealth" modifier={5} kind="check" ability="dex">+5</RollButton>
                <RollButton label="Constitution save" modifier={2} kind="save" ability="con">+2</RollButton>
            </DiceProvider>
        );
        const stealth = screen.getByRole('button', { name: 'Roll Stealth, +5 (Disadvantage (Poisoned), −4 Exhaustion 2)' });
        expect(stealth).toHaveClass('is-affected');
        fireEvent.click(stealth);
        act(() => { jest.advanceTimersByTime(700); });
        // 11 + 5 − 4
        expect(screen.getByRole('status')).toHaveTextContent('Stealth with disadvantage: 12');
        expect(screen.getByRole('region', { name: 'Dice tray' })).toHaveTextContent('Disadvantage (Poisoned)');
    });

    it('lets the player cancel a condition with their own Advantage', () => {
        render(
            <DiceProvider conditions={{ conditions: ['Poisoned'], exhaustion: 0 }}>
                <RollButton label="Stealth" modifier={5} kind="check" ability="dex">+5</RollButton>
            </DiceProvider>
        );
        fireEvent.click(screen.getByRole('button', { name: /Roll Stealth/ }));
        fireEvent.click(screen.getByRole('button', { name: 'Advantage' }));
        act(() => { jest.advanceTimersByTime(700); });
        expect(screen.getByRole('status')).toHaveTextContent('Stealth: 16');
        expect(screen.getByRole('region', { name: 'Dice tray' })).toHaveTextContent("Your advantage cancels the conditions' disadvantage");
    });

    it('fails Strength and Dexterity saves automatically while Paralyzed', () => {
        render(
            <DiceProvider conditions={{ conditions: ['Paralyzed'], exhaustion: 0 }}>
                <RollButton label="Dexterity save" modifier={3} kind="save" ability="dex">+3</RollButton>
                <RollButton label="Wisdom save" modifier={1} kind="save" ability="wis">+1</RollButton>
            </DiceProvider>
        );
        expect(screen.getByRole('button', { name: /Roll Wisdom save/ })).not.toHaveClass('is-affected');
        fireEvent.click(screen.getByRole('button', { name: /Roll Dexterity save/ }));
        act(() => { jest.advanceTimersByTime(700); });
        expect(screen.getByRole('region', { name: 'Dice tray' })).toHaveTextContent('Automatic failure');
        expect(screen.getByRole('status')).toHaveTextContent('Dexterity save: automatic failure (Paralyzed)');
    });
});

describe('ConditionsCard', () => {
    function Harness({ initial, onChange }: { initial: ActiveConditions; onChange?: (next: ActiveConditions) => void }) {
        const [active, setActive] = useState(initial);
        return <ConditionsCard active={active} onChange={(next) => { setActive(next); onChange?.(next); }} {...collapse} />;
    }

    it('toggles conditions in list order and explains them', () => {
        const onChange = jest.fn();
        render(<Harness initial={{ conditions: [], exhaustion: 0 }} onChange={onChange} />);
        fireEvent.click(screen.getByRole('button', { name: 'Prone' }));
        fireEvent.click(screen.getByRole('button', { name: 'Blinded' }));
        expect(onChange).toHaveBeenLastCalledWith({ conditions: ['Blinded', 'Prone'], exhaustion: 0 });
        expect(screen.getByRole('button', { name: 'Prone' })).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByText('Prone:', { exact: false }).closest('ul')).toHaveClass('condition-effects');

        fireEvent.click(screen.getByRole('button', { name: 'Prone' }));
        expect(onChange).toHaveBeenLastCalledWith({ conditions: ['Blinded'], exhaustion: 0 });
    });

    it('steps Exhaustion up and down and clears everything', () => {
        const onChange = jest.fn();
        render(<Harness initial={{ conditions: ['Poisoned'], exhaustion: 0 }} onChange={onChange} />);
        fireEvent.click(screen.getByRole('button', { name: 'Exhaustion level 3' }));
        expect(onChange).toHaveBeenLastCalledWith({ conditions: ['Poisoned'], exhaustion: 3 });
        expect(screen.getByText('Level 3: −6 to d20 rolls, −15 ft. Speed')).toBeInTheDocument();
        // Tapping the top level lowers it by one
        fireEvent.click(screen.getByRole('button', { name: 'Exhaustion level 3' }));
        expect(onChange).toHaveBeenLastCalledWith({ conditions: ['Poisoned'], exhaustion: 2 });

        fireEvent.click(screen.getByRole('button', { name: 'Clear all' }));
        expect(onChange).toHaveBeenLastCalledWith({ conditions: [], exhaustion: 0 });
        expect(screen.queryByRole('button', { name: 'Clear all' })).not.toBeInTheDocument();
    });

    it('shows a one-line summary while collapsed', () => {
        render(<ConditionsCard active={{ conditions: ['Grappled'], exhaustion: 1 }} onChange={() => {}} collapsed autoCollapsed onToggle={() => {}} />);
        expect(screen.getByRole('button', { name: 'Conditions' })).toHaveAttribute('aria-expanded', 'false');
        expect(screen.queryByRole('button', { name: 'Grappled' })).not.toBeInTheDocument();
        expect(screen.getByText('Exhaustion 1')).toBeVisible();
        expect(screen.getByText('collapsed to fit')).toBeInTheDocument();
    });
});

describe('SensesCard', () => {
    it('shows passive scores, Darkvision and resistances', () => {
        render(
            <SensesCard
                passives={{ perception: 14, investigation: 11, insight: 12 }}
                darkvision={120}
                resistances={[{ type: 'Poison', source: 'Dwarven Resilience' }]}
                {...collapse}
            />
        );
        expect(screen.getByRole('group', { name: 'Passive' })).toHaveTextContent('14Perception11Investigation12Insight');
        expect(screen.getByText('120 ft.')).toBeInTheDocument();
        expect(screen.getByText('(Dwarven Resilience)')).toBeInTheDocument();
    });
});

describe('NotesCard', () => {
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => jest.useRealTimers());

    const renderNotes = (onSave: (pages: string[]) => Promise<boolean>, pages = ['Met Durnan']) =>
        render(<ToastProvider><NotesCard pages={pages} onSave={onSave} {...collapse} /></ToastProvider>);

    it('saves after typing pauses and adds pages', async () => {
        const onSave = jest.fn().mockResolvedValue(true);
        renderNotes(onSave);
        const text = screen.getByLabelText('Notes, page 1');
        expect(text).toHaveValue('Met Durnan');
        fireEvent.change(text, { target: { value: 'Met Durnan at the Yawning Portal' } });
        expect(screen.getByText('Unsaved changes')).toBeInTheDocument();
        expect(onSave).not.toHaveBeenCalled();
        await act(async () => { jest.advanceTimersByTime(800); });
        expect(onSave).toHaveBeenCalledWith(['Met Durnan at the Yawning Portal']);
        expect(screen.getByText('Saved')).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Add a page' }));
        expect(screen.getByRole('tab', { name: 'Page 2' })).toHaveAttribute('aria-selected', 'true');
        expect(screen.getByLabelText('Notes, page 2')).toHaveValue('');
        fireEvent.blur(screen.getByLabelText('Notes, page 2'));
        await act(async () => {});
        expect(onSave).toHaveBeenLastCalledWith(['Met Durnan at the Yawning Portal', '']);
    });

    it('keeps changes pending when a save fails', async () => {
        const onSave = jest.fn().mockResolvedValueOnce(false).mockResolvedValue(true);
        renderNotes(onSave);
        fireEvent.change(screen.getByLabelText('Notes, page 1'), { target: { value: 'Lost?' } });
        await act(async () => { jest.advanceTimersByTime(800); });
        expect(screen.getByText('Unsaved changes')).toBeInTheDocument();
        fireEvent.blur(screen.getByLabelText('Notes, page 1'));
        await act(async () => {});
        expect(onSave).toHaveBeenLastCalledWith(['Lost?']);
        expect(screen.getByText('Saved')).toBeInTheDocument();
    });

    it('asks before deleting a page with text', () => {
        renderNotes(jest.fn().mockResolvedValue(true), ['One', 'Two']);
        fireEvent.click(screen.getByRole('tab', { name: 'Page 2' }));
        fireEvent.click(screen.getByRole('button', { name: 'Delete page' }));
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));
        expect(screen.queryByRole('tab', { name: 'Page 2' })).not.toBeInTheDocument();
        expect(screen.getByLabelText('Notes, page 1')).toHaveValue('One');
    });
});

describe('useCoreColumnFit', () => {
    // jsdom has no layout: a column's height is the sum of its cards' heights, a collapsed card is 40px
    const CARD_HEIGHTS: Record<string, number> = { skills: 300, senses: 150, proficiencies: 200, conditions: 180, notes: 160 };
    beforeEach(() => {
        localStorage.clear();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => { cb(0); return 0; });
        jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
            const cardHeight = (el: Element) => (el.classList.contains('is-collapsed') ? 40 : CARD_HEIGHTS[(el as HTMLElement).dataset.card ?? ''] ?? 0);
            let height = 0;
            if (this.dataset.column === 'left') this.querySelectorAll('[data-card]').forEach((el) => { height += cardHeight(el); });
            else if (this.dataset.column) height = Number(this.dataset.height ?? 0);
            return { height, width: 0, top: 0, left: 0, right: 0, bottom: height, x: 0, y: 0, toJSON: () => ({}) } as DOMRect;
        });
    });
    afterEach(() => jest.restoreAllMocks());

    function Sheet({ middle }: { middle: number }) {
        const { gridRef, isCollapsed, isAutoCollapsed, toggle } = useCoreColumnFit('char-1');
        const card = (id: CoreCardId) => (
            <section data-card={id} data-core-card={id} className={isCollapsed(id) ? 'card is-collapsed' : 'card'}>
                <button type="button" aria-label={id} aria-expanded={!isCollapsed(id)} onClick={() => toggle(id)} />
                {isAutoCollapsed(id) && <span>{id} auto</span>}
            </section>
        );
        return (
            <div ref={gridRef} style={{ display: 'grid', gridTemplateColumns: '260px 1fr 1fr' }}>
                <div className="sheet-column" data-column="left">
                    <section data-card="skills" className="card" />
                    {card('senses')}{card('proficiencies')}{card('conditions')}{card('notes')}
                </div>
                <div className="sheet-column" data-column="middle" data-height={middle} />
                <div className="sheet-column" data-column="right" />
            </div>
        );
    }
    const expanded = (id: string) => screen.getByRole('button', { name: id }).getAttribute('aria-expanded');

    it('keeps every card open when the other columns are long', async () => {
        render(<Sheet middle={1200} />);
        await waitFor(() => expect(expanded('notes')).toBe('true'));
        expect(['senses', 'proficiencies', 'conditions'].map(expanded)).toEqual(['true', 'true', 'true']);
    });

    it('collapses Proficiencies before Senses and keeps Notes open when it then fits', async () => {
        // Open: 300 + 150 + 200 + 180 + 160 = 990. Without Proficiencies (and Notes): 710; Notes back: 830
        render(<Sheet middle={850} />);
        await waitFor(() => expect(expanded('proficiencies')).toBe('false'));
        expect(screen.getByText('proficiencies auto')).toBeInTheDocument();
        expect(['notes', 'senses', 'conditions'].map(expanded)).toEqual(['true', 'true', 'true']);
    });

    it('collapses in order down to Conditions when the columns are short', async () => {
        render(<Sheet middle={500} />);
        await waitFor(() => expect(expanded('conditions')).toBe('false'));
        expect(['notes', 'proficiencies', 'senses'].map(expanded)).toEqual(['false', 'false', 'false']);
    });

    it("remembers the player's choice over the fitting", async () => {
        const { unmount } = render(<Sheet middle={500} />);
        await waitFor(() => expect(expanded('senses')).toBe('false'));
        fireEvent.click(screen.getByRole('button', { name: 'senses' }));
        await waitFor(() => expect(expanded('senses')).toBe('true'));
        expect(screen.queryByText('senses auto')).not.toBeInTheDocument();
        expect(JSON.parse(localStorage.getItem('sheetCards:v1:char-1')!)).toEqual({ senses: true });

        unmount();
        render(<Sheet middle={500} />);
        await waitFor(() => expect(expanded('conditions')).toBe('false'));
        expect(expanded('senses')).toBe('true');
    });
});
