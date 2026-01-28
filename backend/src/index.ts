import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import characterRoutes from './routes/characters';
import campaignRoutes from './routes/campaigns';
import referenceRoutes from './routes/reference';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Debug: Log database connection info (without password)
if (process.env.DATABASE_URL) {
    const dbUrl = process.env.DATABASE_URL;
    const maskedUrl = dbUrl.replace(/:[^:@]+@/, ':****@'); // Mask password
    console.log('DATABASE_URL is set:', maskedUrl);
    console.log('Database host:', dbUrl.match(/@([^:]+):/)?.[1] || 'unknown');
} else {
    console.error('⚠️ DATABASE_URL is NOT set!');
}

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000',
    'https://character-sheet-frontend.vercel.app',
    process.env.FRONTEND_URL
].filter(Boolean); // Remove undefined values

// Log allowed origins for debugging
console.log('Allowed CORS origins:', allowedOrigins);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            console.log('CORS: Request with no origin, allowing');
            return callback(null, true);
        }
        
        // Normalize origin (remove trailing slash)
        const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
        
        console.log('CORS: Checking origin:', normalizedOrigin);
        
        // Check exact match or if origin starts with any allowed origin
        const isAllowed = allowedOrigins.some(allowed => {
            const normalizedAllowed = allowed.endsWith('/') ? allowed.slice(0, -1) : allowed;
            return normalizedOrigin === normalizedAllowed || normalizedOrigin.startsWith(normalizedAllowed);
        });
        
        if (isAllowed) {
            console.log('CORS: Origin allowed');
            callback(null, true);
        } else {
            console.log('CORS: Origin blocked:', normalizedOrigin, 'Allowed origins:', allowedOrigins);
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
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/reference', referenceRoutes);

app.get('/', (req, res) => {
    res.send('D&D Character Sheet API is running');
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
