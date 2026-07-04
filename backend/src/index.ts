import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { prisma } from './lib/prisma';
import authRoutes from './routes/auth';
import characterRoutes from './routes/characters';
import campaignRoutes from './routes/campaigns';
import referenceRoutes from './routes/reference';
import { getJwtSecret } from './config/jwt';
import { authLimiter } from './middleware/rateLimit';

dotenv.config();
// Validate JWT configuration after env is loaded
getJwtSecret();

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Trust the reverse proxy (Render/Vercel) so req.ip reflects the real client,
// which the rate limiter keys on. '1' = trust one proxy hop.
app.set('trust proxy', 1);

// Verbose startup diagnostics are noisy and can leak infra details in logs;
// keep them out of production.
const isProduction = process.env.NODE_ENV === 'production';
if (!isProduction) {
    // Render expects the app to listen on PORT (default 10000). Do NOT set PORT in Render env.
    console.log('PORT from env:', process.env.PORT ?? '(unset, using 3001)');

    // Debug: Log database connection info (without password)
    if (process.env.DATABASE_URL) {
        const dbUrl = process.env.DATABASE_URL;
        const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':****@'); // Mask password
        console.log('DATABASE_URL is set:', maskedUrl);
        console.log('Database host:', dbUrl.match(/@([^:]+):/)?.[1] || 'unknown');
    } else {
        console.error('⚠️ DATABASE_URL is NOT set!');
    }
}

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://character-sheet-frontend.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

// Log allowed origins once at startup for debugging
if (!isProduction) {
    console.log('Allowed CORS origins:', allowedOrigins);
}

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            return callback(null, true);
        }

        // Normalize origin (remove trailing slash)
        const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;

        // Check exact match or if origin starts with any allowed origin
        // Exact match only — prefix matching would allow e.g. https://trusted.example.evil.com
        const isAllowed = allowedOrigins.some(allowed => {
            const normalizedAllowed = allowed.endsWith('/') ? allowed.slice(0, -1) : allowed;
            return normalizedOrigin === normalizedAllowed;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            if (!isProduction) {
                console.log('CORS: Origin blocked:', normalizedOrigin, 'Allowed origins:', allowedOrigins);
            }
            // For OPTIONS preflight, we still need to send CORS headers
            callback(null, false);
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400 // Cache preflight for 24 hours
}));
// Baseline security headers (X-Content-Type-Options, etc.). Defaults are
// safe for a JSON API consumed cross-origin via fetch+CORS.
app.use(helmet());

// Gzip responses. The reference dataset (spells alone is ~600KB of JSON)
// compresses ~85%, which dominates page-load time on the character sheet.
app.use(compression());

// Explicit body-size limit: character sheets (with a resized base64 portrait)
// stay well under 1mb; this bounds memory and rejects oversized payloads.
app.use(express.json({ limit: '1mb' }));

// Routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/reference', referenceRoutes);

app.get('/', (req, res) => {
    res.send('D&D Character Sheet API is running');
});

app.get('/health', async (req, res) => {
    try {
        // Verify the database is actually reachable, not just the process.
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({ status: 'ok' });
    } catch {
        res.status(503).json({ status: 'degraded', database: 'unreachable' });
    }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Error:', err.message);
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
