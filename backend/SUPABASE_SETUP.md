# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Sign up or log in
3. Click "New Project"
4. Fill in:
   - **Name**: `character-sheet-db` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your Render backend region
   - **Pricing Plan**: Free
5. Click "Create new project"
6. Wait 2-3 minutes for the project to be created

## Step 2: Get Database Connection String

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string (it looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the password you created in Step 1
6. The final connection string should look like:
   ```
   postgresql://postgres:yourpassword@db.xxxxx.supabase.co:5432/postgres
   ```

## Step 3: Configure Backend

### For Local Development:
1. Create/update `backend/.env`:
   ```
   DATABASE_URL="postgresql://postgres:yourpassword@db.xxxxx.supabase.co:5432/postgres"
   JWT_SECRET="your-random-secret-key-here"
   PORT=3001
   ```

### For Render (Production):
1. Go to your Render service dashboard
2. Go to **Environment** tab
3. Add these environment variables:
   - `DATABASE_URL` = your Supabase connection string
   - `JWT_SECRET` = a random secret (generate with: `openssl rand -base64 32`)
   - `NODE_ENV` = `production`
   - `PORT` = `3001`

## Step 4: Run Database Migrations

### Option A: Local (then push to Supabase)
```bash
cd backend
npx prisma migrate deploy
```

### Option B: Via Render Shell
1. Go to your Render service
2. Click **Shell** tab
3. Run:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```

## Step 5: Verify Connection

Test that your backend can connect:
```bash
cd backend
npx prisma db pull
```

If successful, you should see your schema synced.

## Security Notes

- **Never commit** `.env` files to Git
- Keep your database password secure
- Supabase free tier includes:
  - 500 MB database storage
  - 2 GB bandwidth
  - Unlimited API requests

## Troubleshooting

**Connection refused:**
- Check that your IP is allowed (Supabase allows all by default)
- Verify the connection string is correct
- Make sure you replaced `[YOUR-PASSWORD]` with actual password

**Migration errors:**
- Ensure Prisma client is generated: `npx prisma generate`
- Check that DATABASE_URL is set correctly
- Verify you have the latest migrations

