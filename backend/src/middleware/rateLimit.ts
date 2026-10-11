import rateLimit from 'express-rate-limit';
import { AuthRequest } from './auth';

/**
 * Throttle authentication endpoints to slow down brute-force and
 * credential-stuffing attacks. Keyed by client IP.
 */
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,                   // max attempts per window per IP
    standardHeaders: true,     // expose RateLimit-* headers
    legacyHeaders: false,
    message: { error: 'Too many attempts. Please try again later.' },
});

/**
 * Throttle wrong campaign join codes, so codes can't be guessed. Keyed by the
 * signed-in user (runs after authenticateToken); only failed attempts count.
 */
export const joinCodeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    skipSuccessfulRequests: true,
    keyGenerator: (req) => (req as AuthRequest).user!.id,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: 'Too many wrong codes. Try again in a few minutes.' },
});
