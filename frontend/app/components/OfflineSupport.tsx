'use client';
import { useEffect, useState } from 'react';
import { registerServiceWorker } from '@/lib/offline';

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

/** Registers the service worker and says so when the app is showing saved data offline. */
export default function OfflineSupport() {
    const online = useOnline();

    useEffect(() => {
        registerServiceWorker();
    }, []);

    if (online) return null;
    return (
        <div className="offline-banner" role="status">
            You&apos;re offline. Showing what this device saved last time; changes won&apos;t save until you reconnect.
        </div>
    );
}
