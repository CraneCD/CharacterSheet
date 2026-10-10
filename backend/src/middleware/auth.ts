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

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    let verified: unknown;
    try {
        verified = jwt.verify(token, getJwtSecret());
    } catch (err) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
    // Ensure the payload actually carries the claims routes rely on,
    // rather than blindly casting an arbitrary decoded object.
    if (
        typeof verified !== 'object' ||
        verified === null ||
        typeof (verified as any).id !== 'string' ||
        typeof (verified as any).email !== 'string'
    ) {
        return res.status(403).json({ error: 'Invalid token.' });
    }
    const claims = verified as { id: string; email: string; isAdmin?: boolean; tv?: unknown };
    req.user = { id: claims.id, email: claims.email, isAdmin: claims.isAdmin === true };

    // Tokens carry the account's tokenVersion (app tokens never expire, so this is what
    // ends them): "sign out everywhere" and password changes bump it. Tokens signed before
    // versions existed have no `tv` and simply run out after their day.
    if (claims.tv !== undefined) {
        try {
            const user = await prisma.user.findUnique({ where: { id: claims.id }, select: { tokenVersion: true, isAdmin: true } });
            if (!user || user.tokenVersion !== claims.tv) {
                return res.status(401).json({ error: 'Signed out. Please sign in again.' });
            }
            req.user.isAdmin = user.isAdmin;
        } catch (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
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
