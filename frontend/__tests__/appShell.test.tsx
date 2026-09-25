import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppShell from '@/app/components/AppShell';

const replace = jest.fn();
let pathname = '/dashboard';
jest.mock('next/navigation', () => ({
    usePathname: () => pathname,
    useRouter: () => ({ replace, push: jest.fn() }),
}));

describe('AppShell', () => {
    beforeEach(() => {
        localStorage.clear();
        replace.mockClear();
        pathname = '/dashboard';
    });

    it('shows the main nav on signed-in pages', () => {
        render(<AppShell><p>Page</p></AppShell>);
        const nav = screen.getByRole('navigation', { name: 'Main' });
        expect(nav).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'My Characters' })).toHaveAttribute('aria-current', 'page');
        expect(screen.getByRole('link', { name: 'Campaigns' })).not.toHaveAttribute('aria-current');
        expect(screen.queryByRole('link', { name: 'Admin' })).not.toBeInTheDocument();
        expect(screen.getByText('Page')).toBeInTheDocument();
    });

    it('marks My Characters current on a character sheet and shows Admin for admins', () => {
        pathname = '/character/abc';
        localStorage.setItem('user', JSON.stringify({ isAdmin: true }));
        render(<AppShell><p>Sheet</p></AppShell>);
        expect(screen.getByRole('link', { name: 'My Characters' })).toHaveAttribute('aria-current', 'page');
        expect(screen.getByRole('link', { name: 'Admin' })).not.toHaveAttribute('aria-current');
    });

    it('marks Campaigns current on campaign and encounter pages', () => {
        pathname = '/campaigns/abc/encounters/xyz';
        render(<AppShell><p>Encounter</p></AppShell>);
        expect(screen.getByRole('link', { name: 'Campaigns' })).toHaveAttribute('aria-current', 'page');
        expect(screen.getByRole('link', { name: 'My Characters' })).not.toHaveAttribute('aria-current');
    });

    it('hides the nav on public pages', () => {
        pathname = '/login';
        render(<AppShell><p>Login</p></AppShell>);
        expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    });

    it('logs out by clearing the token and stored user', () => {
        localStorage.setItem('token', 't');
        localStorage.setItem('user', '{}');
        render(<AppShell><p>Page</p></AppShell>);
        fireEvent.click(screen.getByRole('button', { name: 'Log out' }));
        expect(localStorage.getItem('token')).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
        expect(replace).toHaveBeenCalledWith('/login');
    });

    it('cycles the theme and remembers the choice', () => {
        render(<AppShell><p>Page</p></AppShell>);
        const toggle = screen.getByRole('button', { name: /^Theme: System/ });
        fireEvent.click(toggle);
        expect(document.documentElement).toHaveAttribute('data-theme', 'light');
        expect(localStorage.getItem('theme')).toBe('light');
        fireEvent.click(screen.getByRole('button', { name: /^Theme: Light/ }));
        expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
        fireEvent.click(screen.getByRole('button', { name: /^Theme: Dark/ }));
        expect(document.documentElement).not.toHaveAttribute('data-theme');
        expect(localStorage.getItem('theme')).toBeNull();
    });
});
