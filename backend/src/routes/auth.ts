import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, name } = registerSchema.parse(req.body);

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use.' });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
                name,
            },
        });

        res.status(201).json({ message: 'User registered successfully', userId: user.id });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const validPass = await bcrypt.compare(password, user.passwordHash);
        if (!validPass) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || 'supersecretkey',
            { expiresIn: '1d' }
        );

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
