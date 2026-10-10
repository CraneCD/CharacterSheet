/*
 * Grulla D&D service worker: makes the app installable and lets it open offline.
 *
 * - Built assets (/_next/static, hashed): cache first.
 * - Pages: network first; offline, the copy saved the last time this device opened
 *   that page, else offline.html.
 * - API reads (GET .../api/...): network first; offline, the last response saved.
 *   The page clears this cache on log in and log out (lib/offline.ts), since
 *   responses belong to the signed-in user.
 * - Everything else (API writes, Next's client navigation requests) goes straight
 *   to the network.
 *
 * Bump VERSION to drop old caches when this file's strategy changes.
 */
const VERSION = 'v1';
const STATIC_CACHE = `grulla-static-${VERSION}`;
const PAGE_CACHE = `grulla-pages-${VERSION}`;
// Must match API_CACHE in lib/offline.ts
const API_CACHE = 'grulla-api-v1';
const OFFLINE_PAGE = '/offline.html';
const PRECACHE = [OFFLINE_PAGE, '/dashboard', '/campaigns', '/icons/icon-192.png'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(PAGE_CACHE)
            .then((cache) => Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => undefined))))
            .then(() => self.skipWaiting()),
    );
});

self.addEventListener('activate', (event) => {
    const keep = new Set([STATIC_CACHE, PAGE_CACHE, API_CACHE]);
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(keys.filter((k) => k.startsWith('grulla-') && !keep.has(k)).map((k) => caches.delete(k))))
            .then(() => self.clients.claim()),
    );
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) {
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, response.clone());
    }
    return response;
}

async function networkFirst(request, cacheName, fallback) {
    try {
        const response = await fetch(request);
        if (response.ok) {
            const cache = await caches.open(cacheName);
            await cache.put(request, response.clone());
        }
        return response;
    } catch (err) {
        const cached = await caches.match(request, { cacheName });
        if (cached) return cached;
        if (fallback) {
            const page = await caches.match(fallback);
            if (page) return page;
        }
        throw err;
    }
}

self.addEventListener('fetch', (event) => {
    const { request } = event;
    if (request.method !== 'GET') return;
    const url = new URL(request.url);

    if (url.origin === self.location.origin) {
        if (url.pathname.startsWith('/_next/static/') || url.pathname.startsWith('/icons/')) {
            event.respondWith(cacheFirst(request));
            return;
        }
        // Client-side navigation data: when it fails, Next falls back to a full page load,
        // which the navigate branch below answers from the cache
        if (request.headers.get('RSC') || url.searchParams.has('_rsc')) return;
        if (request.mode === 'navigate') {
            event.respondWith(networkFirst(request, PAGE_CACHE, OFFLINE_PAGE));
        }
        return;
    }

    // The API lives on another origin (Render); only its reads are cached
    if (url.pathname.includes('/api/')) {
        event.respondWith(networkFirst(request, API_CACHE));
    }
});
