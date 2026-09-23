import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '@/app/dashboard/page';
import { ToastProvider } from '@/app/components/ui/Toast';
import { api } from '@/lib/api';

jest.mock('@/lib/api', () => ({
    api: { get: jest.fn(), post: jest.fn(), delete: jest.fn() },
}));

const mockedApi = api as jest.Mocked<typeof api>;

function renderDashboard() {
    return render(<ToastProvider><Dashboard /></ToastProvider>);
}

describe('Dashboard', () => {
    beforeEach(() => jest.resetAllMocks());

    it('asks before deleting and confirms with a toast', async () => {
        mockedApi.get.mockResolvedValue([{ id: '1', name: 'Tordek', race: 'Dwarf', class: 'Fighter', level: 3 }]);
        mockedApi.delete.mockResolvedValue({});
        renderDashboard();

        fireEvent.click(await screen.findByRole('button', { name: 'Delete Tordek' }));
        expect(screen.getByRole('alertdialog', { name: 'Delete character?' })).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

        await waitFor(() => expect(screen.queryByText('Level 3 Dwarf Fighter')).not.toBeInTheDocument());
        expect(mockedApi.delete).toHaveBeenCalledWith('/characters/1');
        expect(screen.getByRole('status')).toHaveTextContent('Deleted "Tordek".');
    });

    it('keeps the character and shows why when deleting fails', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        mockedApi.get.mockResolvedValue([{ id: '1', name: 'Tordek', race: 'Dwarf', class: 'Fighter', level: 3 }]);
        mockedApi.delete.mockRejectedValue(new Error('Not found'));
        renderDashboard();

        fireEvent.click(await screen.findByRole('button', { name: 'Delete Tordek' }));
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
});
