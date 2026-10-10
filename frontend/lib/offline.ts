/**
 * Offline support: the service worker (public/sw.js) caches pages, built assets and
 * API reads so a sheet opened before can be opened again without a connection.
 */

/** Cache holding API responses; must match API_CACHE in public/sw.js. */
export const API_CACHE = 'grulla-api-v1';

/** Register the service worker. Production only: in dev it would serve stale bundles over hot reload. */
export function registerServiceWorker(): void {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV !== 'production') return;
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((err) => {
        console.error('Service worker registration failed', err);
    });
}

/** Forget the signed-in user's cached API responses (on log in and log out). */
export function clearOfflineData(): void {
    if (typeof window === 'undefined' || !('caches' in window)) return;
    window.caches.delete(API_CACHE).catch(() => undefined);
}
