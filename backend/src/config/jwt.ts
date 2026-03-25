/**
 * JWT signing secret. In production, JWT_SECRET must be set; there is no insecure default.
 */
export function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (secret) {
        return secret;
    }
    if (process.env.NODE_ENV === 'production') {
        throw new Error('JWT_SECRET must be set in production');
    }
    console.warn(
        '[security] JWT_SECRET is not set; using a development-only default. Set JWT_SECRET for consistent tokens across restarts.'
    );
    return 'dev-only-insecure-jwt-secret';
}
