# Vercel Environment Variable Troubleshooting

## Issue: Still connecting to localhost after setting environment variable

If you've set `NEXT_PUBLIC_API_URL` in Vercel but it's still trying to connect to `localhost:3001`, follow these steps:

## Step 1: Verify Environment Variable is Set Correctly

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**
2. Verify `NEXT_PUBLIC_API_URL` exists and has the correct value:
   - **Name**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://character-sheet-backend-6g9t.onrender.com/api` (your Render URL + `/api`)
   - **Environment**: Make sure it's checked for **Production** (and Preview if you want)

## Step 2: Trigger a NEW Deployment (Not Just Redeploy)

**Important**: Environment variables are embedded at BUILD TIME. If you set the variable after a build, redeploying the same build won't help.

### Option A: Push a New Commit (Recommended)
```bash
# Make a small change to trigger a new build
git commit --allow-empty -m "Trigger Vercel rebuild with env vars"
git push origin main
```

### Option B: Create a New Deployment in Vercel
1. Go to **Deployments** tab
2. Click **"Redeploy"** on the latest deployment
3. **IMPORTANT**: Make sure to check **"Use existing Build Cache"** is **UNCHECKED**
4. This forces a fresh build that will include the environment variable

## Step 3: Verify It's Working

After the new deployment completes:

1. Open your Vercel app: `https://character-sheet-frontend.vercel.app`
2. Open Browser DevTools (F12) → **Console** tab
3. You should see logs like:
   ```
   🔗 API_URL: https://character-sheet-backend-6g9t.onrender.com/api
   🔗 NEXT_PUBLIC_API_URL env var: https://character-sheet-backend-6g9t.onrender.com/api
   ```
4. If you see a warning about the env var not being set, the variable wasn't included in the build
5. Check the **Network** tab - requests should go to your Render URL, not `localhost:3001`

## Common Issues

### Issue: Variable set but still using localhost
**Solution**: You need a **NEW BUILD**, not just a redeploy. Push a commit or create a new deployment without build cache.

### Issue: Variable shows in Vercel but console shows undefined
**Solution**: 
- Check that the variable is set for **Production** environment
- Make sure you're viewing the Production deployment, not Preview
- The variable must start with `NEXT_PUBLIC_` to be available in the browser

### Issue: Variable works locally but not on Vercel
**Solution**: 
- Vercel environment variables are separate from your local `.env` file
- Make sure the variable is set in Vercel's dashboard, not just locally

## Quick Test

After deployment, open browser console and run:
```javascript
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

If it shows `undefined`, the variable wasn't included in the build. Trigger a new deployment.
