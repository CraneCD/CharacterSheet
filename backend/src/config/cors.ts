// Browser origins allowed to call the API (exact match only: prefix matching
// would allow e.g. https://trusted.example.evil.com).
const BUILT_IN_ORIGINS = [
    'http://localhost:3000',
    'https://rollsheet.party',
    'https://www.rollsheet.party',
    'https://character-sheet-frontend.vercel.app',
    // The Android app (Capacitor serves its bundled pages from this origin)
    'https://localhost',
];

const normalize = (origin: string) => origin.trim().replace(/\/+$/, '');

/** Built-in origins plus FRONTEND_URL, which may list several, comma-separated. */
export function allowedOrigins(frontendUrl = process.env.FRONTEND_URL): string[] {
    const extra = (frontendUrl ?? '').split(',').map(normalize).filter(Boolean);
    return Array.from(new Set([...BUILT_IN_ORIGINS, ...extra]));
}

export function isAllowedOrigin(origin: string, allowed: string[]): boolean {
    return allowed.includes(normalize(origin));
}
