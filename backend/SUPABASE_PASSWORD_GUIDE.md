# Finding Your Supabase Database Password

## If You Signed Up with GitHub

When you create a Supabase project, you're required to set a database password. Here's how to find or reset it:

## Option 1: Check Your Project Creation

When you created your Supabase project, you should have been prompted to set a database password. Check:
- Your notes/password manager
- The email confirmation from Supabase (if any)
- Any documentation you saved

## Option 2: Reset the Database Password (Recommended)

If you don't remember the password, you can reset it:

### Steps:

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Log in with GitHub
   - Select your project

2. **Navigate to Database Settings**
   - Click on **Settings** (gear icon in the left sidebar)
   - Click on **Database** in the settings menu

3. **Reset Database Password**
   - Scroll down to find **Database Password** section
   - Click **"Reset Database Password"** or **"Change Database Password"**
   - Enter a new strong password (save this!)
   - Confirm the password
   - Click **"Save"** or **"Update"**

4. **Important**: After resetting, you'll need to:
   - Update the `DATABASE_URL` in Render with the new password
   - Wait a few minutes for the change to propagate

## Option 3: Check Connection String in Supabase

1. Go to **Settings** → **Database**
2. Scroll to **Connection string** section
3. Select **URI** tab
4. You'll see a connection string like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. The `[YOUR-PASSWORD]` is a placeholder - you need to replace it with your actual password

## Getting the Connection String

After you have/reset your password:

1. Go to **Settings** → **Database**
2. Scroll to **Connection string**
3. Select **URI** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your actual password
6. Example:
   ```
   postgresql://postgres:MySecurePassword123!@db.zowurcekczkdpfaocphs.supabase.co:5432/postgres
   ```

## Update Render

1. Go to Render dashboard → Your backend service → **Environment** tab
2. Find or create `DATABASE_URL`
3. Paste the complete connection string (with your actual password)
4. **No quotes** around the value
5. Save
6. Redeploy your service

## Security Note

- Never share your database password
- Don't commit passwords to Git
- Use a strong, unique password
- Consider using a password manager

## If You Still Can't Find/Reset It

If the reset option isn't available or you're having issues:

1. **Contact Supabase Support**: They can help reset it
2. **Create a New Project**: As a last resort, create a new Supabase project with a password you'll remember
3. **Check Supabase Docs**: https://supabase.com/docs/guides/database/connecting-to-postgres
