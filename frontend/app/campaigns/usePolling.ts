'use client';

import { useEffect, useRef } from 'react';

/**
 * Call `refresh` every `intervalMs` while the tab is visible, and right away
 * when the tab comes back into view. Campaign pages use it to pick up party
 * HP and turn order without websockets.
 */
export function usePolling(refresh: () => void, intervalMs: number, enabled = true) {
    const refreshRef = useRef(refresh);
    useEffect(() => {
        refreshRef.current = refresh;
    }, [refresh]);

    useEffect(() => {
        if (!enabled || typeof document === 'undefined') return;
        let timer: ReturnType<typeof setInterval> | null = null;
        const start = () => {
            if (timer === null) timer = setInterval(() => refreshRef.current(), intervalMs);
        };
        const stop = () => {
            if (timer !== null) clearInterval(timer);
            timer = null;
        };
        const onVisibility = () => {
            if (document.visibilityState === 'visible') {
                refreshRef.current();
                start();
            } else {
                stop();
            }
        };
        if (document.visibilityState === 'visible') start();
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            stop();
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [intervalMs, enabled]);
}
