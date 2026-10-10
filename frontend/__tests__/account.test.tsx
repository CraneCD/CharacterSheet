import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import AccountPage from '@/app/account/page';
import LoginPage from '@/app/(auth)/login/page';
import AppShell from '@/app/components/AppShell';
import { ToastProvider } from '@/app/components/ui/Toast';
import { isProtectedPath } from '@/app/components/AuthGuard';
import { api, ApiError } from '@/lib/api';

expect.extend(toHaveNoViolations);

jest.mock('@/lib/api', () => {
    const actual = jest.requireActual('@/lib/api');
    return { ...actual, api: { post: jest.fn() } };
});
const mockReplace = jest.fn();
jest.mock('next/navigation', () => ({
    usePathname: () => '/account',
    useRouter: () => ({ replace: mockReplace, push: jest.fn() }),
}));

const fill = (current: string, next: string, confirm = next) => {
    fireEvent.change(screen.getByLabelText('Current password'), { target: { value: current } });
    fireEvent.change(screen.getByLabelText('New password'), { target: { value: next } });
    fireEvent.change(screen.getByLabelText('Confirm new password'), { target: { value: confirm } });
};
const submit = () => fireEvent.click(screen.getByRole('button', { name: 'Change password' }));

beforeEach(() => {
    jest.clearAllMocks();
    localStorage.setItem('user', JSON.stringify({ id: 'u1', email: 'illia@example.com' }));
});

describe('Account page', () => {
    it('shows who is signed in and changes the password', async () => {
        (api.post as jest.Mock).mockResolvedValue({ message: 'Password changed.' });
        const { container } = render(<ToastProvider><AccountPage /></ToastProvider>);
        expect(screen.getByText('illia@example.com')).toBeInTheDocument();
        expect(await axe(container)).toHaveNoViolations();

        fill('old-password', 'new-password');
        submit();
        await waitFor(() => expect(api.post).toHaveBeenCalledWith('/auth/change-password', { currentPassword: 'old-password', newPassword: 'new-password' }));
        expect(await screen.findByText(/Password changed/)).toBeInTheDocument();
        expect(screen.getByLabelText('Current password')).toHaveValue('');
    });

    it('keeps this device signed in with the new token a password change sends', async () => {
        localStorage.setItem('token', 'old-token');
        (api.post as jest.Mock).mockResolvedValue({ message: 'Password changed.', token: 'new-token' });
        render(<ToastProvider><AccountPage /></ToastProvider>);
        fill('old-password', 'new-password');
        submit();
        await waitFor(() => expect(localStorage.getItem('token')).toBe('new-token'));
    });

    it('signs out every device after confirming', async () => {
        localStorage.setItem('token', 'device-token');
        (api.post as jest.Mock).mockResolvedValue({ message: 'Signed out everywhere.' });
        render(<ToastProvider><AccountPage /></ToastProvider>);
        fireEvent.click(screen.getByRole('button', { name: 'Sign out everywhere' }));
        const dialog = screen.getByRole('alertdialog', { name: 'Sign out on every device?' });
        expect(api.post).not.toHaveBeenCalled();
        fireEvent.click(within(dialog).getByRole('button', { name: 'Sign out everywhere' }));
        await waitFor(() => expect(mockReplace).toHaveBeenCalledWith('/login'));
        expect(api.post).toHaveBeenCalledWith('/auth/logout-all', {});
        expect(localStorage.getItem('token')).toBeNull();
    });

    it('catches mismatched, short and unchanged passwords before sending', () => {
        render(<ToastProvider><AccountPage /></ToastProvider>);
        fill('old-password', 'new-password', 'new-passwrd');
        submit();
        expect(screen.getByRole('alert')).toHaveTextContent("The new passwords don't match.");
        fill('old-password', '123');
        submit();
        expect(screen.getByRole('alert')).toHaveTextContent('6 to 72 characters');
        fill('old-password', 'old-password');
        submit();
        expect(screen.getByRole('alert')).toHaveTextContent('must be different');
        expect(api.post).not.toHaveBeenCalled();
    });

    it("shows the server's reason when the current password is wrong, and keeps the fields", async () => {
        (api.post as jest.Mock).mockRejectedValue(new ApiError('Your current password is incorrect.', 400));
        render(<ToastProvider><AccountPage /></ToastProvider>);
        fill('wrong', 'new-password');
        submit();
        expect(await screen.findByRole('alert')).toHaveTextContent('Your current password is incorrect.');
        expect(screen.getByLabelText('New password')).toHaveValue('new-password');
    });

    it('never shows a raw server error page', async () => {
        (api.post as jest.Mock).mockRejectedValue(new ApiError('<!DOCTYPE html><pre>Cannot POST /api/auth/change-password</pre>', 404));
        render(<ToastProvider><AccountPage /></ToastProvider>);
        fill('old-password', 'new-password');
        submit();
        expect(await screen.findByRole('alert')).toHaveTextContent('Something went wrong on our side.');
    });

    it('is a signed-in page linked from the main nav', () => {
        expect(isProtectedPath('/account')).toBe(true);
        render(<AppShell><p>Page</p></AppShell>);
        expect(screen.getByRole('link', { name: 'Account' })).toHaveAttribute('aria-current', 'page');
    });
});

describe('Log in', () => {
    const login = () => {
        render(<ToastProvider><LoginPage /></ToastProvider>);
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'illia@example.com' } });
        fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'secret-password' } });
        fireEvent.click(screen.getByRole('button', { name: /log in/i }));
    };
    const standalone = (matches: boolean) => Object.defineProperty(window, 'matchMedia', {
        configurable: true,
        value: (query: string) => ({ matches: matches && query === '(display-mode: standalone)', addEventListener: () => {}, removeEventListener: () => {} }),
    });
    afterEach(() => delete (window as { matchMedia?: unknown }).matchMedia);

    it('asks for a token that stays signed in only from the installed app', async () => {
        (api.post as jest.Mock).mockResolvedValue({ token: 'tok', user: { id: 'u1', email: 'illia@example.com' } });
        standalone(true);
        login();
        await waitFor(() => expect(api.post).toHaveBeenCalledWith('/auth/login', { email: 'illia@example.com', password: 'secret-password', device: true }));
        expect(localStorage.getItem('token')).toBe('tok');
    });

    it('asks for a day-long session in a browser tab', async () => {
        (api.post as jest.Mock).mockResolvedValue({ token: 'tok', user: { id: 'u1' } });
        standalone(false);
        login();
        await waitFor(() => expect(api.post).toHaveBeenCalledWith('/auth/login', expect.objectContaining({ device: false })));
    });
});
