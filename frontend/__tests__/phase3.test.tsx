import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import '@testing-library/jest-dom';
import { displayName, exportFileName, parseCharacterImport } from '@/lib/characterTransfer';
import { clearDraft, describeDraft, hasDraftProgress, loadDraft, saveDraft } from '@/lib/characterDraft';
import { formatRelativeTime } from '@/lib/relativeTime';
import WizardStepper from '@/app/create/components/WizardStepper';
import StepAbilities, { AbilityMethod } from '@/app/create/components/StepAbilities';

describe('parseCharacterImport', () => {
    const valid = { name: ' Regdar ', race: 'human', class: 'fighter', level: 4, data: { hp: { current: 1, max: 2 }, abilityScores: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 } } };

    it('accepts an exported character', () => {
        const result = parseCharacterImport(JSON.stringify(valid));
        expect(result).toEqual({ ok: true, warnings: [], payload: { ...valid, name: 'Regdar' } });
    });

    it('explains what is wrong with a bad file', () => {
        expect(parseCharacterImport('nope')).toEqual({ ok: false, error: expect.stringContaining("isn't valid JSON") });
        expect(parseCharacterImport('42')).toEqual({ ok: false, error: "This file doesn't contain a character." });
        expect(parseCharacterImport(JSON.stringify({ race: 'elf' }))).toEqual({ ok: false, error: 'This character is missing its name, class.' });
    });

    it('warns about fixable problems', () => {
        const result = parseCharacterImport(JSON.stringify([{ ...valid, level: 42, data: {} }, valid]));
        expect(result.ok && result.payload.level).toBe(1);
        expect(result.ok && result.warnings).toEqual([
            'Level 42 is out of range, so level 1 will be used.',
            'No hit points recorded.',
            'Ability scores are incomplete.',
            'The file has 2 characters; only the first will be imported.',
        ]);
    });

    it('accepts raceId/classId aliases and fills in missing data', () => {
        const result = parseCharacterImport(JSON.stringify({ name: 'A', raceId: 'elf', classId: 'wizard' }));
        expect(result.ok && result.payload).toMatchObject({ race: 'elf', class: 'wizard', level: 1, data: {} });
    });
});

describe('export helpers', () => {
    it('makes a safe file name', () => {
        expect(exportFileName('Brienne of Tarth!')).toBe('brienne_of_tarth.json');
        expect(exportFileName('')).toBe('character.json');
    });

    it('turns ids into display names', () => {
        expect(displayName('half-elf')).toBe('Half-Elf');
        expect(displayName('dragonborn')).toBe('Dragonborn');
        expect(displayName('arcane_trickster')).toBe('Arcane Trickster');
    });
});

describe('character drafts', () => {
    beforeEach(() => localStorage.clear());

    const draft = {
        step: 4, maxStepReached: 5,
        formData: { raceId: 'elf', name: 'Mira' },
        selections: { race: { name: 'Elf' }, classInfo: { name: 'Wizard' } },
    };

    it('saves and loads per signed-in user', () => {
        localStorage.setItem('user', JSON.stringify({ id: 'u1' }));
        saveDraft(draft);
        expect(loadDraft()).toMatchObject({ ...draft, savedAt: expect.any(String) });

        localStorage.setItem('user', JSON.stringify({ id: 'u2' }));
        expect(loadDraft()).toBeNull();

        localStorage.setItem('user', JSON.stringify({ id: 'u1' }));
        clearDraft();
        expect(loadDraft()).toBeNull();
    });

    it('ignores corrupt drafts and clamps the step', () => {
        localStorage.setItem('characterDraft:v1:anonymous', '{"step":"x"}');
        expect(loadDraft()).toBeNull();
        localStorage.setItem('characterDraft:v1:anonymous', JSON.stringify({ step: 99, formData: {}, savedAt: 'now' }));
        expect(loadDraft()).toMatchObject({ step: 6, maxStepReached: 6, selections: {} });
    });

    it('survives storage that throws', () => {
        const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('quota'); });
        expect(() => saveDraft(draft)).not.toThrow();
        spy.mockRestore();
    });

    it('describes what the draft is', () => {
        expect(describeDraft({ ...draft, savedAt: '' })).toBe('Mira, Elf Wizard');
        expect(describeDraft({ ...draft, formData: { raceId: 'elf' }, savedAt: '' })).toBe('Elf Wizard');
        expect(describeDraft({ ...draft, formData: {}, selections: {}, savedAt: '' })).toBe('Unnamed character');
        expect(hasDraftProgress({ name: '' })).toBe(false);
        expect(hasDraftProgress({ classId: 'bard' })).toBe(true);
    });
});

describe('formatRelativeTime', () => {
    const now = new Date('2026-09-23T12:00:00Z');
    it('rounds to the largest sensible unit', () => {
        expect(formatRelativeTime('2026-09-23T11:59:30Z', now)).toBe('just now');
        expect(formatRelativeTime('2026-09-23T11:55:00Z', now)).toBe('5 minutes ago');
        expect(formatRelativeTime('2026-09-22T12:00:00Z', now)).toBe('yesterday');
        expect(formatRelativeTime('2026-09-02T12:00:00Z', now)).toBe('3 weeks ago');
        expect(formatRelativeTime('garbage', now)).toBe('');
    });
});

describe('WizardStepper', () => {
    it('labels steps, marks the current one and only allows unlocked steps', () => {
        const onSelect = jest.fn();
        render(
            <WizardStepper
                steps={[{ label: 'Species' }, { label: 'Class' }, { label: 'Abilities' }]}
                current={2}
                isComplete={(s) => s === 1}
                canVisit={(s) => s <= 2}
                onSelect={onSelect}
            />
        );
        expect(screen.getByRole('navigation', { name: 'Character creation steps' })).toBeInTheDocument();
        const current = screen.getByRole('button', { name: 'Step 2: Class' });
        expect(current).toHaveAttribute('aria-current', 'step');
        expect(screen.getByRole('button', { name: 'Step 3: Abilities' })).toBeDisabled();

        fireEvent.click(screen.getByRole('button', { name: 'Step 1: Species (done)' }));
        expect(onSelect).toHaveBeenCalledWith(1);
    });
});

describe('StepAbilities', () => {
    function Harness({ initialMethod }: { initialMethod?: AbilityMethod }) {
        const [scores, setScores] = useState({ str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 });
        const [method, setMethod] = useState<AbilityMethod | undefined>(initialMethod);
        const [visible, setVisible] = useState(true);
        return (
            <>
                <button onClick={() => setVisible(!visible)}>toggle</button>
                <output data-testid="scores">{JSON.stringify(scores)}</output>
                {visible && <StepAbilities initialScores={scores} method={method} onUpdate={setScores} onMethodChange={setMethod} />}
            </>
        );
    }

    it('keeps assigned scores when you leave the step and come back', () => {
        render(<Harness />);
        // First visit starts the standard array fresh
        expect(screen.getByTestId('scores')).toHaveTextContent('"str":0');
        fireEvent.change(screen.getByTestId('standard-str'), { target: { value: '15' } });
        fireEvent.change(screen.getByTestId('standard-dex'), { target: { value: '14' } });

        fireEvent.click(screen.getByText('toggle'));
        fireEvent.click(screen.getByText('toggle'));

        expect(screen.getByTestId('scores')).toHaveTextContent('"str":15,"dex":14');
        expect(screen.getByTestId('standard-str')).toHaveValue('15');
        expect(screen.getByRole('button', { name: 'Standard Array' })).toHaveAttribute('aria-pressed', 'true');
    });

    it('restores point buy with the remaining budget', () => {
        render(<Harness />);
        fireEvent.click(screen.getByRole('button', { name: 'Point Buy' }));
        const plus = screen.getAllByRole('button', { name: '+' });
        fireEvent.click(plus[0]);
        fireEvent.click(plus[0]);
        expect(screen.getByText(/Points Remaining/)).toHaveTextContent('Points Remaining: 25 / 27');

        fireEvent.click(screen.getByText('toggle'));
        fireEvent.click(screen.getByText('toggle'));
        expect(screen.getByText(/Points Remaining/)).toHaveTextContent('Points Remaining: 25 / 27');
        expect(screen.getByTestId('scores')).toHaveTextContent('"str":10');
    });
});
