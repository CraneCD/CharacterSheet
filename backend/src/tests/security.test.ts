import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';

jest.mock('../lib/prisma', () => ({
    prisma: {
        user: { findUnique: jest.fn(async () => ({ tokenVersion: 0, isAdmin: false })) },
        campaign: { findUnique: jest.fn(async () => null) },
    },
}));

import { authenticateToken, AuthRequest } from '../middleware/auth';
import { asyncRouter } from '../utils/asyncRouter';
import campaignRoutes from '../routes/campaigns';

process.env.JWT_SECRET = 'test-secret';

const signed = (claims: object, options?: jwt.SignOptions) => `Bearer ${jwt.sign(claims, 'test-secret', options)}`;

describe('authenticateToken', () => {
    const app = express();
    app.get('/me', authenticateToken, (req: AuthRequest, res) => res.json(req.user));

    it('accepts a current token', async () => {
        const res = await request(app).get('/me').set('Authorization', signed({ id: 'u1', email: 'u1@example.com', tv: 0 }));
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id: 'u1', email: 'u1@example.com', isAdmin: false });
    });

    it('answers 401 to missing, expired, forged and versionless tokens', async () => {
        const expired = signed({ id: 'u1', email: 'u1@example.com', tv: 0, exp: Math.floor(Date.now() / 1000) - 60 });
        const forged = `Bearer ${jwt.sign({ id: 'u1', email: 'u1@example.com', tv: 0 }, 'wrong-secret')}`;
        // Only revocable tokens are accepted: one without `tv` couldn't be signed out
        const versionless = signed({ id: 'u1', email: 'u1@example.com', isAdmin: true });
        for (const auth of [undefined, expired, forged, versionless]) {
            const req = request(app).get('/me');
            const res = await (auth ? req.set('Authorization', auth) : req);
            expect(res.status).toBe(401);
        }
    });
});

describe('campaign join codes', () => {
    const app = express();
    app.use(express.json());
    app.use('/campaigns', campaignRoutes);

    it('stop being checked after 10 wrong codes', async () => {
        const auth = signed({ id: 'guesser', email: 'g@example.com', tv: 0 });
        for (let i = 0; i < 10; i++) {
            expect((await request(app).post('/campaigns/join').set('Authorization', auth).send({ joinCode: `WRONG${i}` })).status).toBe(404);
        }
        const res = await request(app).post('/campaigns/join').set('Authorization', auth).send({ joinCode: 'ABC234' });
        expect(res.status).toBe(429);
        // Someone else still can
        const other = signed({ id: 'someone-else', email: 's@example.com', tv: 0 });
        expect((await request(app).post('/campaigns/join').set('Authorization', other).send({ joinCode: 'ABC234' })).status).toBe(404);
    });
});

describe('asyncRouter', () => {
    it('sends a failed async handler to the error handler instead of leaving it unhandled', async () => {
        const router = asyncRouter();
        router.get('/boom', async () => {
            throw new Error('database unreachable');
        });
        const app = express();
        app.use(router);
        app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
            res.status(500).json({ error: err.message });
        });
        const res = await request(app).get('/boom');
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'database unreachable' });
    });
});
