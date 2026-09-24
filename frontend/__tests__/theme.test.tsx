import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { classColorStyle, classColorVar } from '@/lib/classColors';
import CharacterToken from '@/app/components/ui/CharacterToken';
import PortraitUpload from '@/app/character/[id]/components/PortraitUpload';
import AbilityScoresCard from '@/app/character/[id]/components/sections/AbilityScoresCard';

expect.extend(toHaveNoViolations);

describe('class colours', () => {
    it('maps class ids and names to their hue, and anything else to the accent', () => {
        expect(classColorVar('wizard')).toBe('var(--class-wizard)');
        expect(classColorVar('Warlock')).toBe('var(--class-warlock)');
        expect(classColorVar('blood hunter')).toBe('var(--primary)');
        expect(classColorVar(undefined)).toBe('var(--primary)');
        expect(classColorStyle('rogue')).toEqual({ '--class-color': 'var(--class-rogue)' });
    });
});

describe('CharacterToken', () => {
    it('shows the portrait when there is one, otherwise the initial', () => {
        const { container, rerender } = render(<CharacterToken name="mira" classId="wizard" level={5} />);
        expect(container.querySelector('.token-initial')).toHaveTextContent('M');
        expect(container.querySelector('.token-level')).toHaveTextContent('Lv 5');

        rerender(<CharacterToken name="Mira" portrait="data:image/png;base64,AAAA" ring={0.5} />);
        expect(container.querySelector('img')).toHaveAttribute('src', 'data:image/png;base64,AAAA');
        expect(container.querySelector('.token')).toHaveStyle({ '--ring': '50%' });
    });
});

describe('PortraitUpload', () => {
    it('is a labelled button that says whether it adds or changes the portrait', async () => {
        const { container, rerender } = render(<main><PortraitUpload name="Mira" classId="wizard" level={5} portrait={undefined} onUpdate={() => {}} /></main>);
        expect(screen.getByRole('button', { name: 'Upload a portrait' })).toBeInTheDocument();
        expect(await axe(container)).toHaveNoViolations();

        rerender(<main><PortraitUpload name="Mira" portrait="data:image/png;base64,AAAA" onUpdate={() => {}} /></main>);
        expect(screen.getByRole('button', { name: 'Change portrait' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
    });
});

describe('AbilityScoresCard', () => {
    it('marks the best modifier', () => {
        const { container } = render(
            <AbilityScoresCard
                scores={{ str: 8, dex: 14, con: 14, int: 18, wis: 12, cha: 10 }}
                modifiers={{ str: -1, dex: 2, con: 2, int: 4, wis: 1, cha: 0 }}
                onChange={() => {}}
            />
        );
        expect(container.querySelector('.ability-gem.is-best')).toHaveTextContent('int+418');
    });
});
