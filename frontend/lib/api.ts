import { clearAuthStorage } from './auth';
import { API_CACHE } from './offline';
import { enqueueWrite, flushQueue, pendingWrites, QUEUED, QueuedMethod, QueuedWrite, SendOutcome } from './offlineQueue';

function redirectIfUnauthorized(res: Response): void {
    if (res.status !== 401 || typeof window === 'undefined') return;
    clearAuthStorage();
    const p = window.location.pathname;
    if (p !== '/login' && p !== '/register') {
        window.location.assign('/login');
    }
}

// Get API URL - check both build-time and runtime
const getApiUrl = () => {
    // In browser, check if we have a runtime override
    if (typeof window !== 'undefined') {
        // Check for runtime config (useful for debugging)
        const runtimeUrl = (window as any).__API_URL__;
        if (runtimeUrl) return runtimeUrl;
    }
    
    // Use environment variable (set at build time in Vercel)
    const envUrl = process.env.NEXT_PUBLIC_API_URL;
    if (envUrl) return envUrl;
    
    // Fallback to localhost for local development
    return 'http://localhost:3001/api';
};

const API_URL = getApiUrl();

if (typeof window !== 'undefined' && !process.env.NEXT_PUBLIC_API_URL) {
    console.warn('NEXT_PUBLIC_API_URL is not set; using fallback:', API_URL);
}

/** Error thrown for a non-2xx response; `message` is the server's error text, readable enough for a toast. */
export class ApiError extends Error {
    constructor(message: string, readonly status: number) {
        super(message);
        this.name = 'ApiError';
    }
}

async function toApiError(res: Response): Promise<ApiError> {
    const text = await res.text().catch(() => '');
    let message = text;
    try {
        const body = JSON.parse(text);
        if (body && typeof body === 'object') {
            if (typeof body.error === 'string') message = body.error;
            else if (typeof body.message === 'string') message = body.message;
            else if (Array.isArray(body.error)) {
                // Validation issues ({ message }[]), e.g. from zod
                message = body.error.map((issue: any) => issue?.message).filter(Boolean).join('. ') || text;
            }
        }
    } catch {
        // Not JSON: use the text as-is
    }
    return new ApiError(message.trim() || `Request failed (HTTP ${res.status})`, res.status);
}

async function getJson(endpoint: string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    redirectIfUnauthorized(res);
    if (!res.ok) throw await toApiError(res);
    return res.json();
}

export interface WriteOptions {
    /**
     * In-play sheet saves: without a connection the save is queued and sent when the
     * server can be reached again (lib/offlineQueue.ts), resolving to QUEUED instead of
     * the server's response. Saves made while others are queued join the queue, so
     * they reach the server in the order they were made.
     */
    offline?: boolean;
}

async function sendRequest(method: QueuedMethod, endpoint: string, data?: unknown): Promise<Response> {
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = { 'Authorization': `Bearer ${token}` };
    if (data !== undefined) headers['Content-Type'] = 'application/json';
    return fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: data !== undefined ? JSON.stringify(data) : undefined,
    });
}

async function readBody(res: Response) {
    // Handle empty responses (204 No Content)
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) return res.json();
    return {};
}

async function write(method: QueuedMethod, endpoint: string, data: unknown, options?: WriteOptions) {
    if (options?.offline) {
        const offline = typeof navigator !== 'undefined' && navigator.onLine === false;
        if (offline || pendingWrites().length > 0) {
            enqueueWrite(method, endpoint, data);
            if (!offline) void flushPendingWrites();
            return QUEUED;
        }
    }
    let res: Response;
    try {
        res = await sendRequest(method, endpoint, data);
    } catch (err) {
        // fetch() rejects with a TypeError when the server can't be reached at all
        if (options?.offline && err instanceof TypeError) {
            enqueueWrite(method, endpoint, data);
            return QUEUED;
        }
        throw err;
    }
    redirectIfUnauthorized(res);
    if (!res.ok) throw await toApiError(res);
    return readBody(res);
}

/** Send one queued save, sorting the answer into sent / try later / refused. */
export async function sendQueuedWrite(entry: QueuedWrite): Promise<SendOutcome> {
    let res: Response;
    try {
        res = await sendRequest(entry.method, entry.endpoint, entry.body);
    } catch {
        return { ok: false, retry: true };
    }
    if (res.ok) return { ok: true };
    // A server error or rate limit: try again later. Signed out (401): signing out
    // clears this device's offline data, unsent saves included
    if (res.status === 401 || res.status === 403 || res.status === 429 || res.status >= 500) {
        redirectIfUnauthorized(res);
        return { ok: false, retry: true };
    }
    return { ok: false, retry: false, message: (await toApiError(res)).message };
}

/**
 * Store the sheet as the app last showed it where the service worker keeps API reads,
 * so reopening it offline shows saves still waiting in the queue.
 */
export async function saveOfflineCopy(endpoint: string, body: unknown): Promise<void> {
    if (typeof window === 'undefined' || !('caches' in window)) return;
    try {
        const cache = await window.caches.open(API_CACHE);
        await cache.put(`${API_URL}${endpoint}`, new Response(JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } }));
    } catch {
        // Storage full or unavailable: the copy is a convenience
    }
}

/**
 * Ping the server so a sleeping Render instance starts booting while the app opens.
 * Resolves true once it answers (any status), false if it can't be reached.
 */
export async function warmUpServer(timeoutMs = 60_000): Promise<boolean> {
    const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
    try {
        await fetch(`${API_URL.replace(/\/api\/?$/, '')}/health`, { cache: 'no-store', signal: controller?.signal });
        return true;
    } catch {
        return false;
    } finally {
        if (timer) clearTimeout(timer);
    }
}

/** Send any queued offline saves now. */
export function flushPendingWrites() {
    return flushQueue(sendQueuedWrite);
}

// In-memory cache for reference data (spells, classes, races, …). The
// character page requests several of these on every mount (the spell list
// alone is large), and caching the promise also dedupes concurrent requests
// for the same endpoint. Reference data is admin-editable, though, so this
// can't cache forever — entries expire after REFERENCE_CACHE_TTL_MS so an
// edit shows up on the next fetch without requiring a hard page reload.
const REFERENCE_CACHE_TTL_MS = 60_000;
const referenceCache = new Map<string, { promise: Promise<any>; expiresAt: number }>();

export const api = {
    async get(endpoint: string) {
        if (endpoint.startsWith('/reference/')) {
            const cached = referenceCache.get(endpoint);
            if (cached && cached.expiresAt > Date.now()) return cached.promise;
            const promise = getJson(endpoint).catch((err) => {
                // Don't cache failures — allow retry on next call
                referenceCache.delete(endpoint);
                throw err;
            });
            referenceCache.set(endpoint, { promise, expiresAt: Date.now() + REFERENCE_CACHE_TTL_MS });
            return promise;
        }
        return getJson(endpoint);
    },

    async post(endpoint: string, data: any, options?: WriteOptions) {
        return write('POST', endpoint, data, options);
    },

    async put(endpoint: string, data: any, options?: WriteOptions) {
        return write('PUT', endpoint, data, options);
    },

    async patch(endpoint: string, data: any, options?: WriteOptions) {
        return write('PATCH', endpoint, data, options);
    },

    async delete(endpoint: string, options?: { data?: any } & WriteOptions) {
        return write('DELETE', endpoint, options?.data, options);
    }
};
