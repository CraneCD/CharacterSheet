# Render Deployment Setup

## Render Configuration

When setting up your backend on Render, use these settings:

### Basic Settings
- **Name**: `character-sheet-backend` (or your preferred name)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `backend` ⚠️ **IMPORTANT**

### Build & Deploy
- **Build Command**: `cd .. && npm install && cd backend && npm run build`
- **Start Command**: `npm start`

### Environment Variables
Add these in Render's Environment tab:

```
NODE_ENV=production
DATABASE_URL=postgresql://... (from Supabase/Neon)
JWT_SECRET=your-random-secret-key-here
PORT=3001
```

### Important Notes

1. **Root Directory**: Make sure Root Directory is set to `backend` in Render settings
2. **Build Command**: The build command will:
   - Install dependencies
   - Generate Prisma client
   - Compile TypeScript to JavaScript
3. **Start Command**: Runs the compiled JavaScript from `dist/index.js`

### Troubleshooting

If you get "dist folder not found" error:
- Check that Root Directory is set to `backend`
- Verify Build Command includes `npm run build`
- Check build logs to see if TypeScript compilation succeeded

### Database Migrations

After first deployment, you may need to run migrations:

**Option 1: Via Render Shell**
1. Go to your service in Render
2. Click "Shell" tab
3. Run: `npx prisma migrate deploy`

**Option 2: Add to build script**
You can add migration to the build process (not recommended for production):
```json
"build": "prisma generate && prisma migrate deploy && tsc"
```

