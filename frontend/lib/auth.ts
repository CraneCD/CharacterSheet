/** Client-side JWT payload parse (exp check only; not cryptographic verification). */
function parseJwtPayload(token: string): { exp?: number } | null {
    try {
        const parts = token.split('.');
        if (parts.length !== 3) return null;
        const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
        const pad = base64.length % 4;
        const padded = pad ? base64 + '='.repeat(4 - pad) : base64;
        return JSON.parse(atob(padded));
    } catch {
        return null;
    }
}

/** True if a non-empty token exists and is not expired (by `exp` claim). */
export function isStoredTokenValid(token: string | null): boolean {
    if (!token || typeof token !== 'string') return false;
    const payload = parseJwtPayload(token);
    if (!payload) return false;
    if (payload.exp == null) return true;
    return payload.exp * 1000 > Date.now();
}

export function clearAuthStorage(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

/** True if the locally stored user (set at login) has admin access. Client-side only, for UI gating — the server enforces this independently on every /api/admin request. */
export function isStoredUserAdmin(): boolean {
    if (typeof window === 'undefined') return false;
    try {
        const raw = localStorage.getItem('user');
        if (!raw) return false;
        const user = JSON.parse(raw);
        return user?.isAdmin === true;
    } catch {
        return false;
    }
}

/** The signed-in user's id, from the user stored at login (for "You" labels; the server decides access). */
export function getStoredUserId(): string | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem('user');
        const user = raw ? JSON.parse(raw) : null;
        return typeof user?.id === 'string' ? user.id : null;
    } catch {
        return null;
    }
}
