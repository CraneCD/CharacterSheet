# Fix Database Connection Issue on Render

## Error
```
Can't reach database server at `db.zowurcekczkdpfaocphs.supabase.co:5432`
```

## Possible Causes

### 1. Supabase Database is Paused (Most Common)
Supabase free tier pauses databases after 1 week of inactivity.

**Solution:**
1. Go to https://supabase.com/dashboard
2. Click on your project
3. If you see a "Paused" status, click **"Restore"** or **"Resume"**
4. Wait 1-2 minutes for the database to start
5. Try registering again

### 2. DATABASE_URL Not Set in Render
The connection string might not be configured in Render.

**Solution:**
1. Go to Render dashboard → Your backend service → **Environment** tab
2. Check if `DATABASE_URL` exists
3. If not, add it with your Supabase connection string:
   ```
   postgresql://postgres:[YOUR_PASSWORD]@db.zowurcekczkdpfaocphs.supabase.co:5432/postgres
   ```
4. Replace `[YOUR_PASSWORD]` with your actual Supabase database password
5. **Important**: No quotes around the value
6. Save and redeploy

### 3. Wrong Password in DATABASE_URL
The password in the connection string might be incorrect.

**Solution:**
1. In Supabase dashboard → **Settings** → **Database**
2. Scroll to **Connection string** → **URI** tab
3. Copy the connection string
4. Replace `[YOUR-PASSWORD]` with your actual password
5. Update `DATABASE_URL` in Render with the complete string
6. Redeploy

### 4. Connection String Format Issue
The connection string might have extra characters or be malformed.

**Correct Format:**
```
postgresql://postgres:yourpassword@db.zowurcekczkdpfaocphs.supabase.co:5432/postgres
```

**Common Mistakes:**
- ❌ Extra quotes: `"postgresql://..."`
- ❌ Spaces: `postgresql://postgres: password@...`
- ❌ Wrong password placeholder: `[YOUR-PASSWORD]` instead of actual password
- ❌ Missing `postgresql://` prefix

## Step-by-Step Fix

### Step 1: Verify Supabase Database is Running
1. Go to https://supabase.com/dashboard
2. Open your project
3. Check if it says "Active" or "Paused"
4. If paused, click "Restore"

### Step 2: Get Correct Connection String
1. In Supabase → **Settings** → **Database**
2. Scroll to **Connection string**
3. Select **URI** tab
4. Copy the connection string
5. It should look like:
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-1.pooler.supabase.com:6543/postgres
   ```
   OR
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```

### Step 3: Update Render Environment Variable
1. Go to Render → Your backend service → **Environment** tab
2. Find `DATABASE_URL` or click **"Add Environment Variable"**
3. **Name**: `DATABASE_URL`
4. **Value**: Paste your complete connection string (with actual password)
5. **Important**: 
   - No quotes
   - Replace `[YOUR-PASSWORD]` with actual password
   - Use the **direct connection** (port 5432) not the pooler (port 6543) for Prisma
6. Click **Save Changes**

### Step 4: Redeploy
1. Go to **Deployments** tab
2. Click **"Manual Deploy"** → **"Deploy latest commit"**
3. Or wait for auto-deploy (if you just pushed)

### Step 5: Test Connection
After deployment, check the logs:
1. Go to **Logs** tab
2. Look for startup messages
3. Try registering again
4. Check for connection errors

## Quick Test: Verify Connection String Locally

You can test if your connection string works:

```bash
# Test connection (replace with your actual connection string)
psql "postgresql://postgres:yourpassword@db.zowurcekczkdpfaocphs.supabase.co:5432/postgres" -c "SELECT 1;"
```

If this works, the connection string is correct. If it fails, check:
- Password is correct
- Database is not paused
- Network/firewall allows connections

## Alternative: Use Connection Pooling

If direct connection doesn't work, try Supabase's connection pooler:

1. In Supabase → **Settings** → **Database**
2. Use the **Connection pooling** string (port 6543)
3. Format: `postgresql://postgres.xxxxx:password@aws-0-us-west-1.pooler.supabase.com:6543/postgres`
4. Update `DATABASE_URL` in Render
5. Note: Pooler uses a different format with `postgres.xxxxx` instead of `postgres`

## Still Not Working?

1. **Check Supabase Status**: Go to https://status.supabase.com
2. **Check Render Logs**: Look for more detailed error messages
3. **Verify Password**: Reset your Supabase database password if needed
4. **Test Locally**: Try connecting from your local machine to verify the connection string works
