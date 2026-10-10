import { act, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import OfflineSupport from '@/app/components/OfflineSupport';
import { ToastProvider } from '@/app/components/ui/Toast';
import { api, sendQueuedWrite } from '@/lib/api';
import { clearOfflineData } from '@/lib/offline';
import {
    characterIdOf, clearQueue, enqueueWrite, FlushResult, flushQueue, isQueued, pendingWrites, QUEUE_FLUSHED, QueuedWrite, SendOutcome,
} from '@/lib/offlineQueue';

const setOnline = (value: boolean) => Object.defineProperty(window.navigator, 'onLine', { configurable: true, value });

function response(status: number, body: unknown = {}) {
    return {
        ok: status < 400,
        status,
        text: () => Promise.resolve(JSON.stringify(body)),
        json: () => Promise.resolve(body),
        headers: { get: () => 'application/json' },
    };
}

const originalFetch = global.fetch;
beforeEach(() => {
    clearQueue();
    setOnline(true);
    localStorage.setItem('token', 't');
});
afterEach(() => {
    global.fetch = originalFetch;
    setOnline(true);
});

describe('offline queue', () => {
    it('sends saves oldest first and reports the characters they touched', async () => {
        enqueueWrite('PATCH', '/characters/c1/hp', { current: 5 }, 1);
        enqueueWrite('POST', '/characters/c2/currency', { change: { gp: 3 } }, 2);
        const sent: string[] = [];
        const flushed = jest.fn();
        window.addEventListener(QUEUE_FLUSHED, flushed);
        const result = await flushQueue(async (w) => {
            sent.push(w.endpoint);
            return { ok: true };
        });
        window.removeEventListener(QUEUE_FLUSHED, flushed);
        expect(sent).toEqual(['/characters/c1/hp', '/characters/c2/currency']);
        expect(result).toEqual(expect.objectContaining({ sent: 2, failed: [], characterIds: ['c1', 'c2'], remaining: 0 }));
        expect(pendingWrites()).toEqual([]);
        expect(flushed).toHaveBeenCalledTimes(1);
    });

    it('stops at a save that has to wait and keeps it and everything after it', async () => {
        enqueueWrite('PATCH', '/characters/c1/data', { notes: 'a' }, 1);
        enqueueWrite('PATCH', '/characters/c1/data', { notes: 'b' }, 2);
        const send = jest.fn<Promise<SendOutcome>, [QueuedWrite]>().mockResolvedValue({ ok: false, retry: true });
        const result = await flushQueue(send);
        expect(send).toHaveBeenCalledTimes(1);
        expect(result.remaining).toBe(2);
        expect(pendingWrites().map((w) => (w.body as { notes: string }).notes)).toEqual(['a', 'b']);
    });

    it('drops a save the server refuses, says why, and carries on', async () => {
        enqueueWrite('PATCH', '/characters/gone/hp', { current: 1 }, 1);
        enqueueWrite('PATCH', '/characters/c1/hp', { current: 2 }, 2);
        const result = await flushQueue(async (w) =>
            w.endpoint.includes('gone') ? { ok: false, retry: false, message: 'Character not found' } : { ok: true });
        expect(result.sent).toBe(1);
        expect(result.failed.map((f) => f.message)).toEqual(['Character not found']);
        expect(pendingWrites()).toEqual([]);
    });

    it('shares one run between calls made at the same time', async () => {
        enqueueWrite('PATCH', '/characters/c1/hp', { current: 5 });
        const send = jest.fn().mockResolvedValue({ ok: true });
        const [a, b] = await Promise.all([flushQueue(send), flushQueue(send)]);
        expect(a).toBe(b);
        expect(send).toHaveBeenCalledTimes(1);
    });

    it('reads the character out of an endpoint', () => {
        expect(characterIdOf('/characters/abc/equipment')).toBe('abc');
        expect(characterIdOf('/campaigns/x')).toBeNull();
    });

    it('is cleared with the offline data on log in and log out', () => {
        enqueueWrite('PATCH', '/characters/c1/hp', { current: 5 });
        clearOfflineData();
        expect(pendingWrites()).toEqual([]);
    });
});

describe('saves made offline', () => {
    it('are queued instead of failing, and only when the caller opts in', async () => {
        setOnline(false);
        global.fetch = jest.fn() as unknown as typeof fetch;
        const result = await api.patch('/characters/c1/hp', { current: 5 }, { offline: true });
        expect(isQueued(result)).toBe(true);
        expect(global.fetch).not.toHaveBeenCalled();
        expect(pendingWrites()).toEqual([expect.objectContaining({ method: 'PATCH', endpoint: '/characters/c1/hp', body: { current: 5 } })]);

        (global.fetch as jest.Mock).mockRejectedValue(new TypeError('Failed to fetch'));
        await expect(api.post('/characters/c1/rest', { type: 'long' })).rejects.toThrow('Failed to fetch');
        expect(pendingWrites()).toHaveLength(1);
    });

    it('are queued when the server cannot be reached even though the device thinks it is online', async () => {
        global.fetch = jest.fn().mockRejectedValue(new TypeError('Failed to fetch')) as unknown as typeof fetch;
        const result = await api.delete('/characters/c1/equipment', { data: { index: 2 }, offline: true });
        expect(isQueued(result)).toBe(true);
        expect(pendingWrites()).toEqual([expect.objectContaining({ method: 'DELETE', body: { index: 2 } })]);
    });

    it('wait behind earlier queued saves so they reach the server in order', async () => {
        enqueueWrite('PATCH', '/characters/c1/hp', { current: 5 }, 1);
        const calls: string[] = [];
        global.fetch = jest.fn((url: string, init: RequestInit) => {
            calls.push(`${init.method} ${url.replace(/^.*\/api/, '')} ${init.body}`);
            return Promise.resolve(response(200));
        }) as unknown as typeof fetch;
        const result = await api.patch('/characters/c1/hp', { current: 3 }, { offline: true });
        expect(isQueued(result)).toBe(true);
        await waitFor(() => expect(pendingWrites()).toEqual([]));
        expect(calls).toEqual([
            'PATCH /characters/c1/hp {"current":5}',
            'PATCH /characters/c1/hp {"current":3}',
        ]);
    });

    it('go straight to the server when nothing is waiting', async () => {
        global.fetch = jest.fn().mockResolvedValue(response(200, { id: 'c1' })) as unknown as typeof fetch;
        await expect(api.patch('/characters/c1/hp', { current: 3 }, { offline: true })).resolves.toEqual({ id: 'c1' });
        expect(pendingWrites()).toEqual([]);
    });

    it('are retried later after a server error or sign-out, and dropped when refused', async () => {
        const entry = enqueueWrite('PATCH', '/characters/c1/hp', { current: 3 });
        global.fetch = jest.fn().mockResolvedValue(response(503)) as unknown as typeof fetch;
        await expect(sendQueuedWrite(entry)).resolves.toEqual({ ok: false, retry: true });
        global.fetch = jest.fn().mockResolvedValue(response(404, { error: 'Character not found' })) as unknown as typeof fetch;
        await expect(sendQueuedWrite(entry)).resolves.toEqual({ ok: false, retry: false, message: 'Character not found' });
        global.fetch = jest.fn().mockRejectedValue(new TypeError('offline')) as unknown as typeof fetch;
        await expect(sendQueuedWrite(entry)).resolves.toEqual({ ok: false, retry: true });
    });
});

describe('offline banner and sync', () => {
    it('counts saves waiting while offline, and syncs them on reconnect', async () => {
        global.fetch = jest.fn().mockResolvedValue(response(200)) as unknown as typeof fetch;
        setOnline(false);
        render(<ToastProvider><OfflineSupport /></ToastProvider>);
        act(() => {
            enqueueWrite('PATCH', '/characters/c1/hp', { current: 5 });
            enqueueWrite('PATCH', '/characters/c1/data', { notes: 'x' });
        });
        expect(screen.getByRole('status')).toHaveTextContent("You're offline. 2 changes saved on this device will sync when you reconnect.");

        act(() => {
            setOnline(true);
            window.dispatchEvent(new Event('online'));
        });
        expect(await screen.findByText('Offline 2 changes saved.')).toBeInTheDocument();
        expect(pendingWrites()).toEqual([]);
        expect(screen.queryByText(/offline\./i)).not.toBeInTheDocument();
    });

    it("says when an offline change couldn't be saved", async () => {
        render(<ToastProvider><OfflineSupport /></ToastProvider>);
        const result: FlushResult = {
            sent: 0, remaining: 0, characterIds: ['c1'],
            failed: [{ write: { id: '1', method: 'PATCH', endpoint: '/characters/c1/hp', queuedAt: 0 }, message: 'Character not found' }],
        };
        act(() => {
            window.dispatchEvent(new CustomEvent(QUEUE_FLUSHED, { detail: result }));
        });
        expect(await screen.findByText("An offline change couldn't be saved: Character not found")).toBeInTheDocument();
    });

    it('says the server is waking up when it is slow to answer', async () => {
        jest.useFakeTimers();
        let answer: (value: unknown) => void = () => {};
        global.fetch = jest.fn(() => new Promise((resolve) => { answer = resolve; })) as unknown as typeof fetch;
        render(<ToastProvider><OfflineSupport /></ToastProvider>);
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/health', expect.anything());
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
        act(() => {
            jest.advanceTimersByTime(2500);
        });
        expect(screen.getByRole('status')).toHaveTextContent('Waking the server');
        await act(async () => {
            answer(response(200));
        });
        expect(screen.queryByRole('status')).not.toBeInTheDocument();
        jest.useRealTimers();
    });
});
