import { allowedOrigins, isAllowedOrigin } from '../config/cors';

describe('CORS origins', () => {
    const allowed = allowedOrigins('');

    it('allows the website, the Android app and local dev', () => {
        for (const origin of ['https://rollsheet.party', 'https://www.rollsheet.party', 'https://localhost', 'http://localhost:3000', 'https://character-sheet-frontend.vercel.app']) {
            expect(isAllowedOrigin(origin, allowed)).toBe(true);
        }
    });

    it('matches exactly, not by prefix', () => {
        expect(isAllowedOrigin('https://rollsheet.party.evil.com', allowed)).toBe(false);
        expect(isAllowedOrigin('http://rollsheet.party', allowed)).toBe(false);
        expect(isAllowedOrigin('https://evil.com', allowed)).toBe(false);
    });

    it('adds every origin listed in FRONTEND_URL', () => {
        const withEnv = allowedOrigins('https://a.example/, https://b.example');
        expect(isAllowedOrigin('https://a.example', withEnv)).toBe(true);
        expect(isAllowedOrigin('https://b.example', withEnv)).toBe(true);
    });
});
