'use client';
import { useEffect, useState } from 'react';
import { registerServiceWorker } from '@/lib/offline';
import { flushPendingWrites, warmUpServer } from '@/lib/api';
import { FlushResult, pendingWrites, QUEUE_CHANGED, QUEUE_FLUSHED } from '@/lib/offlineQueue';
import { useToast } from '@/app/components/ui';

/** How often queued saves are retried while some are waiting and the device is online. */
const RETRY_MS = 20_000;
/** A server that hasn't answered by now is probably asleep (Render's free tier). */
const WAKE_NOTICE_MS = 2_000;

/** True while the browser reports no network connection. */
export function useOnline(): boolean {
    const [online, setOnline] = useState(true);
    useEffect(() => {
        const update = () => setOnline(navigator.onLine);
        update();
        window.addEventListener('online', update);
        window.addEventListener('offline', update);
        return () => {
            window.removeEventListener('online', update);
            window.removeEventListener('offline', update);
        };
    }, []);
    return online;
}

/** Number of sheet saves waiting to reach the server. */
export function usePendingWrites(): number {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const update = () => setCount(pendingWrites().length);
        update();
        window.addEventListener(QUEUE_CHANGED, update);
        // Another tab changed the queue
        window.addEventListener('storage', update);
        return () => {
            window.removeEventListener(QUEUE_CHANGED, update);
            window.removeEventListener('storage', update);
        };
    }, []);
    return count;
}

function changes(n: number): string {
    return n === 1 ? '1 change' : `${n} changes`;
}

/**
 * Registers the service worker, wakes the server, sends saves made offline once it can,
 * and says so when the app is offline, syncing, or waiting for the server to wake up.
 */
export default function OfflineSupport() {
    const online = useOnline();
    const pending = usePendingWrites();
    const [waking, setWaking] = useState(false);
    const toast = useToast();

    useEffect(() => {
        registerServiceWorker();
        if (!navigator.onLine) return;
        let answered = false;
        const timer = setTimeout(() => {
            if (!answered) setWaking(true);
        }, WAKE_NOTICE_MS);
        void warmUpServer().then(() => {
            answered = true;
            clearTimeout(timer);
            setWaking(false);
        });
        return () => clearTimeout(timer);
    }, []);

    // Send queued saves when back online, and keep retrying while any are waiting
    useEffect(() => {
        if (!online || pending === 0) return;
        void flushPendingWrites();
        const timer = setInterval(() => void flushPendingWrites(), RETRY_MS);
        return () => clearInterval(timer);
    }, [online, pending > 0]); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const onFlushed = (e: Event) => {
            const result = (e as CustomEvent<FlushResult>).detail;
            if (!result) return;
            if (result.failed.length > 0) {
                const reasons = [...new Set(result.failed.map((f) => f.message))].join(' ');
                toast.error(`${result.failed.length === 1 ? 'An offline change' : `${result.failed.length} offline changes`} couldn't be saved: ${reasons}`);
            } else if (result.sent > 0 && result.remaining === 0) {
                toast.success(`Offline ${changes(result.sent)} saved.`);
            }
        };
        window.addEventListener(QUEUE_FLUSHED, onFlushed);
        return () => window.removeEventListener(QUEUE_FLUSHED, onFlushed);
    }, [toast]);

    let message: string | null = null;
    if (!online) {
        message = pending > 0
            ? `You're offline. ${changes(pending)} saved on this device will sync when you reconnect.`
            : "You're offline. Showing what this device saved last time; sheet changes will sync when you reconnect.";
    } else if (pending > 0) {
        message = `Syncing ${changes(pending)} made offline…`;
    } else if (waking) {
        message = 'Waking the server… this can take a little while after it has been idle.';
    }

    if (!message) return null;
    return (
        <div className="offline-banner" role="status">
            {message}
        </div>
    );
}
