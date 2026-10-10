import request from 'supertest';
import express from 'express';
import authRoutes from '../routes/auth';
import { PrismaClient } from '@prisma/client';

// Mock Prisma
jest.mock('@prisma/client', () => {
    const mPrisma = {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
    };
    return { PrismaClient: jest.fn(() => mPrisma) };
});

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

describe('Auth Routes', () => {
    it('should register a new user', async () => {
        const prisma = new PrismaClient();
        (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        (prisma.user.create as jest.Mock).mockResolvedValue({
            id: '123',
            email: 'test@example.com',
        });

        const res = await request(app)
            .post('/auth/register')
            .send({
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('userId');
    });

    it('rejects login with a missing password without a 500', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: 'test@example.com' });

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid email or password.' });
    });

    it('rejects login with a non-string email without a 500', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({ email: { $ne: null }, password: 'x' });

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid email or password.' });
    });
});

describe('POST /auth/change-password', () => {
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');
    const secret = 'test-secret';
    let token: string;
    let prisma: any;

    beforeAll(() => {
        process.env.JWT_SECRET = secret;
        token = jwt.sign({ id: 'user-1', email: 'u@example.com' }, secret);
    });

    beforeEach(async () => {
        prisma = new PrismaClient();
        prisma.user.update = jest.fn().mockResolvedValue({});
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 'user-1', email: 'u@example.com', passwordHash: await bcrypt.hash('old-password', 4) });
    });

    const send = (body: object, auth = true) => {
        const req = request(app).post('/auth/change-password');
        return (auth ? req.set('Authorization', `Bearer ${token}`) : req).send(body);
    };

    it('changes the password when the current one is right', async () => {
        const res = await send({ currentPassword: 'old-password', newPassword: 'new-password' });
        expect(res.status).toBe(200);
        const saved = prisma.user.update.mock.calls[0][0];
        expect(saved.where).toEqual({ id: 'user-1' });
        expect(await bcrypt.compare('new-password', saved.data.passwordHash)).toBe(true);
    });

    it('rejects a wrong current password, a reused or short new one, and anonymous requests', async () => {
        expect((await send({ currentPassword: 'nope', newPassword: 'new-password' })).body.error).toBe('Your current password is incorrect.');
        expect((await send({ currentPassword: 'old-password', newPassword: 'old-password' })).status).toBe(400);
        expect((await send({ currentPassword: 'old-password', newPassword: '123' })).status).toBe(400);
        expect((await send({ currentPassword: 'old-password', newPassword: 'new-password' }, false)).status).toBe(401);
        expect(prisma.user.update).not.toHaveBeenCalled();
    });
});

describe('app tokens that never expire', () => {
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');
    const secret = 'test-secret';
    let prisma: any;
    const user = { id: 'user-1', email: 'u@example.com', name: 'U', isAdmin: false, tokenVersion: 3 };

    beforeAll(() => {
        process.env.JWT_SECRET = secret;
    });

    beforeEach(async () => {
        prisma = new PrismaClient();
        prisma.user.update = jest.fn().mockResolvedValue({ ...user, tokenVersion: 4 });
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({ ...user, passwordHash: await bcrypt.hash('pw-123456', 4) });
    });

    it('gives the app a token that never expires; browsers still get a day; both carry the account version', async () => {
        const app1 = await request(app).post('/auth/login').send({ email: user.email, password: 'pw-123456', device: true });
        const appClaims = jwt.decode(app1.body.token);
        expect(appClaims.tv).toBe(3);
        expect(appClaims.exp).toBeUndefined();

        const web = await request(app).post('/auth/login').send({ email: user.email, password: 'pw-123456' });
        const webClaims = jwt.decode(web.body.token);
        expect(webClaims.tv).toBe(3);
        expect(webClaims.exp - webClaims.iat).toBe(24 * 60 * 60);
    });

    it('signs every device out by bumping the account version', async () => {
        const token = jwt.sign({ id: user.id, email: user.email, tv: 3 }, secret);
        const res = await request(app).post('/auth/logout-all').set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(prisma.user.update).toHaveBeenCalledWith({ where: { id: user.id }, data: { tokenVersion: { increment: 1 } } });
    });

    it('rejects an app token from before the last sign-out', async () => {
        const stale = jwt.sign({ id: user.id, email: user.email, tv: 2 }, secret);
        const res = await request(app).post('/auth/logout-all').set('Authorization', `Bearer ${stale}`);
        expect(res.status).toBe(401);
        expect(prisma.user.update).not.toHaveBeenCalled();
    });

    it('hands the app a fresh token when its password changes', async () => {
        const token = jwt.sign({ id: user.id, email: user.email, tv: 3 }, secret);
        const res = await request(app).post('/auth/change-password').set('Authorization', `Bearer ${token}`)
            .send({ currentPassword: 'pw-123456', newPassword: 'new-pw-123' });
        expect(res.status).toBe(200);
        expect(prisma.user.update.mock.calls[0][0].data.tokenVersion).toEqual({ increment: 1 });
        const claims = jwt.decode(res.body.token);
        expect(claims.tv).toBe(4);
        expect(claims.exp).toBeUndefined();
    });
});
