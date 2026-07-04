import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getJwtSecret } from '../config/jwt';

export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
    headers: any;
    params: any;
    body: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const verified = jwt.verify(token, getJwtSecret());
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
        req.user = { id: (verified as any).id, email: (verified as any).email };
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid token.' });
    }
};
