import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useState } from 'react';
import Modal from '@/app/components/ui/Modal';
import { APP_ROUTING_SCRIPT, handleBackButton, isNativeApp, saveJsonFile } from '@/lib/nativeApp';
import { adminEditHref, campaignHref, characterHref, encounterHref } from '@/lib/routes';

describe('links carry ids in the query string', () => {
    it('builds page links the static app build can serve', () => {
        expect(characterHref('c 1')).toBe('/character?id=c+1');
        expect(campaignHref('k1')).toBe('/campaigns/view?id=k1');
        expect(campaignHref('k1', 'encounters')).toBe('/campaigns/view?id=k1#encounters');
        expect(encounterHref('k1', 'e1')).toBe('/campaigns/encounter?campaign=k1&id=e1');
        expect(adminEditHref('spells', 'fire bolt')).toBe('/admin/type/edit?type=spells&key=fire+bolt');
    });
});

describe('app page loads', () => {
    // The app's web server answers every extensionless path with index.html
    function load(url: string) {
        const u = new URL(url, 'https://localhost');
        const location = { pathname: u.pathname, search: u.search, hash: u.hash, replace: jest.fn() };
        const history = { state: null, replaceState: jest.fn() };
        new Function('location', 'history', APP_ROUTING_SCRIPT)(location, history);
        return { replace: location.replace, replaceState: history.replaceState };
    }

    it('opens the dashboard on start', () => {
        expect(load('/').replace).toHaveBeenCalledWith('/dashboard.html');
    });

    it('sends a page load on to that page’s file, keeping the query', () => {
        expect(load('/character?id=abc').replace).toHaveBeenCalledWith('/character.html?id=abc');
        expect(load('/campaigns/view/?id=k#loot').replace).toHaveBeenCalledWith('/campaigns/view.html?id=k#loot');
    });

    it('puts the clean address back once the page file loads', () => {
        const { replace, replaceState } = load('/character.html?id=abc');
        expect(replace).not.toHaveBeenCalled();
        expect(replaceState).toHaveBeenCalledWith(null, '', '/character?id=abc');
    });
});

describe('Android back button', () => {
    function Dialog() {
        const [open, setOpen] = useState(true);
        return open ? <Modal title="Long Rest" onClose={() => setOpen(false)}><p>Rest?</p></Modal> : <p>closed</p>;
    }

    it('closes an open dialog before leaving the page', async () => {
        const back = jest.spyOn(window.history, 'back').mockImplementation(() => {});
        render(<Dialog />);
        await handleBackButton(true);
        expect(screen.getByText('closed')).toBeInTheDocument();
        expect(back).not.toHaveBeenCalled();
        await handleBackButton(true);
        expect(back).toHaveBeenCalled();
        back.mockRestore();
    });
});

describe('saving files', () => {
    it('downloads in the browser', async () => {
        expect(isNativeApp()).toBe(false);
        const createObjectURL = jest.fn(() => 'blob:x');
        Object.assign(URL, { createObjectURL, revokeObjectURL: jest.fn() });
        const click = jest.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
            expect(this.download).toBe('thorin.json');
        });
        await saveJsonFile('thorin.json', { name: 'Thorin' });
        expect(click).toHaveBeenCalled();
        click.mockRestore();
    });

    it('shares the file from the app', async () => {
        jest.resetModules();
        const writeFile = jest.fn().mockResolvedValue({ uri: 'file:///cache/thorin.json' });
        const share = jest.fn().mockRejectedValue(new Error('Share canceled'));
        jest.doMock('@capacitor/filesystem', () => ({ Filesystem: { writeFile }, Directory: { Cache: 'CACHE' }, Encoding: { UTF8: 'utf8' } }));
        jest.doMock('@capacitor/share', () => ({ Share: { share } }));
        (window as { Capacitor?: unknown }).Capacitor = { isNativePlatform: () => true };
        const native = await import('@/lib/nativeApp');
        // Closing the share sheet isn't an error
        await expect(native.saveJsonFile('thorin.json', { name: 'Thorin' })).resolves.toBeUndefined();
        expect(writeFile).toHaveBeenCalledWith(expect.objectContaining({ path: 'thorin.json', directory: 'CACHE', data: expect.stringContaining('"Thorin"') }));
        expect(share).toHaveBeenCalledWith({ title: 'thorin.json', files: ['file:///cache/thorin.json'] });
        delete (window as { Capacitor?: unknown }).Capacitor;
    });
});
