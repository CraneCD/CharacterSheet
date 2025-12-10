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
});
