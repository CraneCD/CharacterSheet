import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import CharacterName, { cleanCharacterName } from '@/app/character/[id]/components/sections/CharacterName';

expect.extend(toHaveNoViolations);

describe('CharacterName', () => {
    it('cleans up spacing', () => {
        expect(cleanCharacterName('  Mira   Thornwood \n')).toBe('Mira Thornwood');
        expect(cleanCharacterName('   ')).toBe('');
    });

    it('renames in place with Enter and returns focus to the pencil', async () => {
        const onRename = jest.fn();
        const { container } = render(<CharacterName name="Mira" onRename={onRename} />);
        expect(screen.getByRole('heading', { level: 1, name: 'Mira' })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Rename character' }));
        const input = screen.getByLabelText('Character name');
        expect(input).toHaveValue('Mira');
        expect(input).toHaveFocus();
        expect(await axe(container)).toHaveNoViolations();

        fireEvent.change(input, { target: { value: '  Mira   Thornwood ' } });
        fireEvent.submit(input);
        expect(onRename).toHaveBeenCalledWith('Mira Thornwood');
        expect(screen.queryByLabelText('Character name')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Rename character' })).toHaveFocus();
    });

    it('cancels with Escape or Cancel and ignores empty or unchanged names', () => {
        const onRename = jest.fn();
        render(<CharacterName name="Mira" onRename={onRename} />);

        fireEvent.click(screen.getByRole('button', { name: 'Rename character' }));
        fireEvent.change(screen.getByLabelText('Character name'), { target: { value: 'Someone else' } });
        fireEvent.keyDown(screen.getByLabelText('Character name'), { key: 'Escape' });
        expect(screen.getByRole('heading', { name: 'Mira' })).toBeInTheDocument();

        fireEvent.click(screen.getByRole('button', { name: 'Rename character' }));
        fireEvent.change(screen.getByLabelText('Character name'), { target: { value: '   ' } });
        expect(screen.getByRole('button', { name: 'Save' })).toBeDisabled();
        fireEvent.submit(screen.getByLabelText('Character name'));
        expect(screen.getByLabelText('Character name')).toBeInTheDocument();

        fireEvent.change(screen.getByLabelText('Character name'), { target: { value: ' Mira ' } });
        fireEvent.click(screen.getByRole('button', { name: 'Save' }));
        fireEvent.click(screen.getByRole('button', { name: 'Rename character' }));
        fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
        expect(onRename).not.toHaveBeenCalled();
    });
});
