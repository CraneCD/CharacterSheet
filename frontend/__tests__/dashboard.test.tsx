import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '@/app/dashboard/page';
import { ToastProvider } from '@/app/components/ui/Toast';
import { api } from '@/lib/api';
import { saveDraft } from '@/lib/characterDraft';

jest.mock('@/lib/api', () => ({
    api: { get: jest.fn(), post: jest.fn(), delete: jest.fn() },
}));

const mockedApi = api as jest.Mocked<typeof api>;

const tordek = {
    id: '1', name: 'Tordek', race: 'dwarf', class: 'fighter', level: 3,
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    data: { hp: { current: 12, max: 31, temp: 0 } },
};

function renderDashboard() {
    return render(<ToastProvider><Dashboard /></ToastProvider>);
}

function deleteViaMenu(name: string) {
    fireEvent.click(screen.getByRole('button', { name: `Actions for ${name}` }));
    fireEvent.click(screen.getByRole('menuitem', { name: 'Delete…' }));
}

function chooseFile(contents: string, name = 'hero.json') {
    const input = screen.getByTestId('import-file-input');
    const file = new File([contents], name, { type: 'application/json' });
    // jsdom's File lacks text() in some versions
    Object.defineProperty(file, 'text', { value: () => Promise.resolve(contents) });
    fireEvent.change(input, { target: { files: [file] } });
}

describe('Dashboard', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        localStorage.clear();
    });

    it('shows a summary card: species/class, HP and when it was edited', async () => {
        mockedApi.get.mockResolvedValue([tordek]);
        renderDashboard();
        const card = (await screen.findByRole('heading', { name: 'Tordek' })).closest('article')!;
        expect(within(card).getByText('Level 3 Dwarf Fighter')).toBeInTheDocument();
        expect(within(card).getByText('12/31 HP')).toBeInTheDocument();
        expect(within(card).getByText('Edited 2 days ago')).toBeInTheDocument();
        expect(within(card).getByRole('link')).toHaveAttribute('href', '/character/1');
    });

    it('asks before deleting and confirms with a toast', async () => {
        mockedApi.get.mockResolvedValue([tordek]);
        mockedApi.delete.mockResolvedValue({});
        renderDashboard();

        await screen.findByText('Tordek');
        deleteViaMenu('Tordek');
        expect(screen.getByRole('alertdialog', { name: 'Delete character?' })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

        await waitFor(() => expect(screen.queryByText('Level 3 Dwarf Fighter')).not.toBeInTheDocument());
        expect(mockedApi.delete).toHaveBeenCalledWith('/characters/1');
        expect(screen.getByRole('status')).toHaveTextContent('Deleted "Tordek".');
    });

    it('keeps the character and shows why when deleting fails', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        mockedApi.get.mockResolvedValue([tordek]);
        mockedApi.delete.mockRejectedValue(new Error('Not found'));
        renderDashboard();

        await screen.findByText('Tordek');
        deleteViaMenu('Tordek');
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

        expect(await screen.findByText(`Couldn't delete "Tordek": Not found`)).toBeInTheDocument();
        expect(screen.getByText('Level 3 Dwarf Fighter')).toBeInTheDocument();
    });

    it('offers a retry when characters fail to load', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        mockedApi.get.mockRejectedValueOnce(new TypeError('Failed to fetch')).mockResolvedValueOnce([]);
        renderDashboard();

        expect(await screen.findByText("Couldn't load your characters: couldn't reach the server")).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Try again' }));
        expect(await screen.findByText(/haven.t created any characters yet/)).toBeInTheDocument();
    });

    it('offers to continue or discard an unfinished character', async () => {
        mockedApi.get.mockResolvedValue([]);
        saveDraft({
            step: 3, maxStepReached: 3,
            formData: { raceId: 'elf', classId: 'wizard', name: 'Mira' },
            selections: { race: { name: 'Elf' }, classInfo: { name: 'Wizard' } },
        });
        renderDashboard();

        const draft = await screen.findByRole('region', { name: 'Unfinished character' });
        expect(draft).toHaveTextContent('Unfinished: Mira, Elf Wizard');
        expect(draft).toHaveTextContent('Step 3 of 6: Abilities');
        expect(within(draft).getByRole('link', { name: 'Continue' })).toHaveAttribute('href', '/create');

        fireEvent.click(within(draft).getByRole('button', { name: 'Discard' }));
        fireEvent.click(within(screen.getByRole('alertdialog', { name: 'Discard unfinished character?' })).getByRole('button', { name: 'Discard' }));
        expect(screen.queryByRole('region', { name: 'Unfinished character' })).not.toBeInTheDocument();
        expect(Object.keys(localStorage).filter((k) => k.startsWith('characterDraft'))).toHaveLength(0);
    });

    it('previews an import before saving it', async () => {
        mockedApi.get.mockResolvedValue([]);
        mockedApi.post.mockResolvedValue({ ...tordek, id: '2', name: 'Regdar' });
        renderDashboard();
        await screen.findByText(/haven.t created any characters yet/);

        chooseFile(JSON.stringify({ name: 'Regdar', race: 'human', class: 'fighter', level: 4, data: { hp: { current: 30, max: 36 }, abilityScores: { str: 16, dex: 12, con: 14, int: 10, wis: 10, cha: 8 }, spells: [] } }));

        const dialog = await screen.findByRole('dialog', { name: 'Import character' });
        expect(dialog).toHaveTextContent('Level 4 Human Fighter');
        expect(dialog).toHaveTextContent('30/36');
        expect(mockedApi.post).not.toHaveBeenCalled();

        fireEvent.click(within(dialog).getByRole('button', { name: 'Import Regdar' }));
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
        expect(mockedApi.post).toHaveBeenCalledWith('/characters', expect.objectContaining({ name: 'Regdar', level: 4 }));
        expect(screen.getByText('Regdar')).toBeInTheDocument();
    });

    it('explains a bad import file without saving anything', async () => {
        mockedApi.get.mockResolvedValue([]);
        renderDashboard();
        await screen.findByText(/haven.t created any characters yet/);

        chooseFile('{ not json', 'broken.json');
        const dialog = await screen.findByRole('dialog', { name: "Can't import this file" });
        expect(dialog).toHaveTextContent('broken.json');
        expect(within(dialog).getByRole('alert')).toHaveTextContent("isn't valid JSON");
        expect(mockedApi.post).not.toHaveBeenCalled();
    });

    it('adds search and sort once there are more than six characters', async () => {
        const many = ['Aria', 'Bram', 'Cora', 'Dain', 'Esk', 'Fen', 'Gwyn'].map((name, i) => ({
            id: String(i), name, race: 'human', class: i === 3 ? 'wizard' : 'fighter', level: i + 1,
            updatedAt: new Date(2026, 0, i + 1).toISOString(), data: {},
        }));
        mockedApi.get.mockResolvedValue(many);
        renderDashboard();
        await screen.findByText('Aria');

        const names = () => screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
        expect(names()[0]).toBe('Gwyn'); // most recently edited first

        fireEvent.change(screen.getByRole('combobox', { name: 'Sort' }), { target: { value: 'name' } });
        expect(names()[0]).toBe('Aria');

        fireEvent.change(screen.getByRole('searchbox', { name: 'Search characters' }), { target: { value: 'wizard' } });
        expect(names()).toEqual(['Dain']);

        fireEvent.change(screen.getByRole('searchbox', { name: 'Search characters' }), { target: { value: 'zzz' } });
        expect(screen.getByText(/No characters match/)).toBeInTheDocument();
    });

    it('hides search and sort for short lists', async () => {
        mockedApi.get.mockResolvedValue([tordek]);
        renderDashboard();
        await screen.findByText('Tordek');
        expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
    });
});
