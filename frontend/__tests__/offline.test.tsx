import { act, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import manifest from '@/app/manifest';
import OfflineSupport from '@/app/components/OfflineSupport';
import { clearAuthStorage } from '@/lib/auth';
import { API_CACHE } from '@/lib/offline';

describe('installable app', () => {
    it('describes Grulla D&D with regular and maskable icons', () => {
        const m = manifest();
        expect(m.name).toBe('Grulla D&D');
        expect(m.display).toBe('standalone');
        expect(m.start_url).toBe('/dashboard');
        const purposes = (m.icons ?? []).map((i) => `${i.sizes} ${i.purpose}`);
        expect(purposes).toEqual(expect.arrayContaining(['192x192 any', '512x512 any', '512x512 maskable']));
    });
});

describe('offline support', () => {
    const setOnline = (value: boolean) => Object.defineProperty(window.navigator, 'onLine', { configurable: true, value });

    afterEach(() => setOnline(true));

    it('shows a banner only while offline', () => {
        setOnline(true);
        render(<OfflineSupport />);
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
        act(() => {
            setOnline(false);
            window.dispatchEvent(new Event('offline'));
        });
        expect(screen.getByRole('status')).toHaveTextContent(/offline/i);
        act(() => {
            setOnline(true);
            window.dispatchEvent(new Event('online'));
        });
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it("drops the signed-in user's cached API responses on log out", () => {
        const del = jest.fn().mockResolvedValue(true);
        Object.defineProperty(window, 'caches', { configurable: true, value: { delete: del } });
        localStorage.setItem('token', 't');
        clearAuthStorage();
        expect(localStorage.getItem('token')).toBeNull();
        expect(del).toHaveBeenCalledWith(API_CACHE);
        delete (window as { caches?: unknown }).caches;
    });
});
