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
