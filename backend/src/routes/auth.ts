import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { getJwtSecret } from '../config/jwt';
import { prisma } from '../lib/prisma';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional(),
});

// New passwords follow the sign-up rule (at least 6 characters); bcrypt only reads the first 72 bytes
const changePasswordSchema = z.object({
    currentPassword: z.string().min(1).max(200),
    newPassword: z.string().min(6).max(72),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
    /** The installed app asks for a token that doesn't expire (revoked through tokenVersion) */
    device: z.boolean().optional(),
});

type TokenUser = { id: string; email: string; isAdmin: boolean; tokenVersion: number };

/**
 * Browser sessions last a day; app tokens don't expire. Both carry the account's
 * tokenVersion (`tv`), so bumping it ("Sign out everywhere", a new password) ends them all.
 */
function signToken(user: TokenUser, device: boolean): string {
    const claims = { id: user.id, email: user.email, isAdmin: user.isAdmin, tv: user.tokenVersion };
    return device ? jwt.sign(claims, getJwtSecret()) : jwt.sign(claims, getJwtSecret(), { expiresIn: '1d' });
}

/** True when the request was made with an app (non-expiring) token. */
function usesDeviceToken(req: AuthRequest): boolean {
    const token = String(req.headers['authorization'] || '').split(' ')[1];
    const payload = token ? jwt.decode(token) : null;
    return !!payload && typeof payload === 'object' && payload.exp === undefined;
}

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
        console.error('Registration error:', error);
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: error.errors });
        }
        // Log the full error for debugging
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : String(error);
        console.error('Registration error details:', { errorMessage, errorStack });
        res.status(500).json({ error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? errorMessage : undefined });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password, device } = loginSchema.parse(req.body);

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const validPass = await bcrypt.compare(password, user.passwordHash);
        if (!validPass) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }

        const token = signToken(user, device === true);

        res.json({ token, user: { id: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin } });
    } catch (error) {
        // Malformed/missing credentials → uniform response (no format leakage)
        if (error instanceof z.ZodError) {
            return res.status(400).json({ error: 'Invalid email or password.' });
        }
        console.error('Login error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error('Login error details:', { errorMessage, stack: error instanceof Error ? error.stack : undefined });
        res.status(500).json({ error: 'Internal server error', details: process.env.NODE_ENV === 'development' ? errorMessage : undefined });
    }
});

// Change the signed-in user's password (needs the current one). Rate-limited with the other /api/auth routes.
router.post('/change-password', authenticateToken, async (req: AuthRequest, res) => {
    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Enter your current password and a new password of 6 to 72 characters.' });
    }
    const { currentPassword, newPassword } = parsed.data;
    try {
        const user = await prisma.user.findUnique({ where: { id: req.user!.id } });
        if (!user) return res.status(404).json({ error: 'Account not found.' });

        if (!(await bcrypt.compare(currentPassword, user.passwordHash))) {
            return res.status(400).json({ error: 'Your current password is incorrect.' });
        }
        if (currentPassword === newPassword) {
            return res.status(400).json({ error: 'The new password must be different from your current one.' });
        }

        // A new password signs the app out on every other device; this one gets a fresh token
        const passwordHash = await bcrypt.hash(newPassword, await bcrypt.genSalt(10));
        const updated = await prisma.user.update({
            where: { id: user.id },
            data: { passwordHash, tokenVersion: { increment: 1 } },
        });
        res.json({ message: 'Password changed.', token: signToken(updated, usesDeviceToken(req)) });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Sign out every device, including app installs whose tokens don't expire
router.post('/logout-all', authenticateToken, async (req: AuthRequest, res) => {
    try {
        await prisma.user.update({ where: { id: req.user!.id }, data: { tokenVersion: { increment: 1 } } });
        res.json({ message: 'Signed out everywhere.' });
    } catch (error) {
        console.error('Sign out everywhere error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
