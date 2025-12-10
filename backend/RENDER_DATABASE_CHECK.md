# Render Database Setup Check

## Issue: 500 Internal Server Error on Registration/Login

If you're getting "Internal server error" when trying to register or login, the most likely cause is that **database migrations haven't been run** on Render.

## Step 1: Check Render Logs

1. Go to your Render dashboard: https://dashboard.render.com
2. Click on your backend service (`character-sheet-backend`)
3. Click on the **"Logs"** tab
4. Look for error messages when you try to register
5. Common errors you might see:
   - `relation "User" does not exist` - Database migrations not run
   - `Can't reach database server` - Database connection issue
   - `Prisma Client not generated` - Build issue

## Step 2: Verify Database Connection

1. In Render dashboard → Your backend service → **Environment** tab
2. Verify `DATABASE_URL` is set correctly:
   - Should be your Supabase connection string
   - Format: `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
3. Make sure there are no extra quotes or spaces

## Step 3: Run Database Migrations

The database tables need to be created. Run migrations via Render Shell:

1. Go to your Render backend service
2. Click on the **"Shell"** tab
3. Run:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```
4. You should see output like:
   ```
   Applying migration `20231210_init`
   The following migration(s) have been applied:
   ...
   ```

## Step 4: Verify Tables Exist

After running migrations, verify the tables were created:

1. In Render Shell, run:
   ```bash
   cd backend
   npx prisma db pull
   ```
2. This should complete without errors

## Step 5: Test Again

1. Try registering a new account
2. Check the Logs tab for any new errors
3. The improved error logging will now show the actual error message

## Common Issues

### Issue: "relation User does not exist"
**Solution**: Run `npx prisma migrate deploy` in Render Shell

### Issue: "Can't reach database server"
**Solution**: 
- Check `DATABASE_URL` is correct in Render Environment variables
- Verify Supabase database is running
- Check if your IP needs to be whitelisted (usually not needed for Supabase)

### Issue: Migrations say "already applied" but tables don't exist
**Solution**: 
- Check if you're connected to the right database
- Verify `DATABASE_URL` points to your Supabase instance
- You may need to reset: `npx prisma migrate reset` (⚠️ This deletes all data!)

## Quick Test

After running migrations, test the database connection:

```bash
# In Render Shell
cd backend
npx prisma studio
```

This will open Prisma Studio where you can see your tables (if migrations worked).
