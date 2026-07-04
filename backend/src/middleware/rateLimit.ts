import rateLimit from 'express-rate-limit';

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
