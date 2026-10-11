import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../config/jwt';
import { prisma } from '../lib/prisma';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        isAdmin: boolean;
    };
    headers: any;
    params: any;
    body: any;
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // 401 for every way of not being signed in (no token, a bad or expired one, a revoked one),
    // so the client signs out; 403 is kept for signed-in users who aren't allowed something.
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    let verified: unknown;
    try {
        verified = jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] });
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    // Ensure the payload actually carries the claims routes rely on, including the account's
    // tokenVersion (`tv`): app tokens never expire, so it's what ends them ("sign out everywhere"
    // and password changes bump it). Every token signed without one has run out by now.
    if (
        typeof verified !== 'object' ||
        verified === null ||
        typeof (verified as any).id !== 'string' ||
        typeof (verified as any).email !== 'string' ||
        typeof (verified as any).tv !== 'number'
    ) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    const claims = verified as { id: string; email: string; tv: number };

    try {
        const user = await prisma.user.findUnique({ where: { id: claims.id }, select: { tokenVersion: true, isAdmin: true } });
        if (!user || user.tokenVersion !== claims.tv) {
            return res.status(401).json({ error: 'Signed out. Please sign in again.' });
        }
        req.user = { id: claims.id, email: claims.email, isAdmin: user.isAdmin };
    } catch (err) {
        return res.status(500).json({ error: 'Internal server error' });
    }
    next();
};

/** Must run after authenticateToken. Rejects non-admin users with 403. */
export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ error: 'Admin access required.' });
    }
    next();
};
