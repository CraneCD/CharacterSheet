# Render Build Fix Instructions

## Issue
Render build is failing with TypeScript errors about missing types (`process`, `console`, Express types).

## Solution Applied
1. Added `global.d.ts` with explicit type declarations
2. Made `AuthRequest` interface more explicit
3. Updated `tsconfig.json` to look for types in both local and parent node_modules

## IMPORTANT: Update Render Dashboard

**You must manually update the Build Command in Render's dashboard:**

1. Go to your Render service dashboard
2. Navigate to **Settings** → **Build & Deploy**
3. Update the **Build Command** to:
   ```
   cd .. && npm install && cd backend && npm run build
   ```
4. Save and trigger a new deployment

## Why This Is Needed

This is a workspace monorepo. When Render runs `npm install` from the `backend` directory, dependencies might be hoisted to the root `node_modules`. The updated build command ensures:
- All workspace dependencies are installed from the root
- TypeScript can find type definitions in both locations
- The build completes successfully

## Alternative: If Root Directory Can't Be Changed

If you can't change the build command, ensure Render's **Root Directory** is set to the repository root (not `backend`), and use:
- **Build Command**: `cd backend && npm install && npm run build`
- **Start Command**: `cd backend && npm start`
