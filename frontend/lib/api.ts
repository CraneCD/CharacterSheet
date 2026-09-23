import { clearAuthStorage } from './auth';

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

    async post(endpoint: string, data: any) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        redirectIfUnauthorized(res);
        if (!res.ok) throw await toApiError(res);
        return res.json();
    },

    async put(endpoint: string, data: any) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        redirectIfUnauthorized(res);
        if (!res.ok) throw await toApiError(res);
        return res.json();
    },

    async patch(endpoint: string, data: any) {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        redirectIfUnauthorized(res);
        if (!res.ok) throw await toApiError(res);
        return res.json();
    },

    async delete(endpoint: string, options?: { data?: any }) {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {
            'Authorization': `Bearer ${token}`,
        };
        
        if (options?.data) {
            headers['Content-Type'] = 'application/json';
        }
        
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
            body: options?.data ? JSON.stringify(options.data) : undefined,
        });

        redirectIfUnauthorized(res);
        if (!res.ok) throw await toApiError(res);
        // Handle empty responses (204 No Content)
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return res.json();
        }
        // Return empty object for successful DELETE with no body
        return {};
    }
};
