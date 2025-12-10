# Vercel Environment Variable Setup

## Issue
The frontend is trying to connect to `localhost:3001` instead of your deployed Render backend, causing CORS errors.

## Solution: Set Environment Variable in Vercel

### Step 1: Find Your Render Backend URL

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your backend service (e.g., `character-sheet-backend`)
3. Look at the top of the page - you'll see your service URL, something like:
   - `https://character-sheet-backend.onrender.com`
   - or `https://character-sheet-backend-xxxx.onrender.com`

### Step 2: Set Environment Variable in Vercel

1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Click on your project (`character-sheet-frontend` or similar)
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add the following:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://your-backend-url.onrender.com/api` (replace with your actual Render URL)
   - **Environment**: Select all (Production, Preview, Development)
6. Click **Save**

### Step 3: Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**
4. Or push a new commit to trigger automatic redeploy

### Important Notes

- The URL must end with `/api` (e.g., `https://character-sheet-backend.onrender.com/api`)
- Make sure your Render backend is running and accessible
- The backend CORS is already configured to allow `https://character-sheet-frontend.vercel.app`

## Verify It's Working

After redeploying, check the browser console:
- Open your Vercel app
- Open Developer Tools (F12) → Network tab
- Try to log in
- The requests should now go to your Render backend URL, not `localhost:3001`
