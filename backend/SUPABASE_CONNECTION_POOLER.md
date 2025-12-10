# Using Supabase Connection Pooler (Recommended for Render)

## Why Use Connection Pooler?

Render's free tier can have connection limits, and Supabase's connection pooler is designed for serverless/server environments. It's more reliable than direct connections.

## Get Connection Pooler String

1. Go to Supabase Dashboard → Your Project
2. Go to **Settings** → **Database**
3. Scroll to **Connection string**
4. Select **Connection pooling** tab (NOT "URI")
5. Select **Session mode** (recommended for Prisma)
6. Copy the connection string

It will look like:
```
postgresql://postgres.zowurcekczkdpfaocphs:[YOUR-PASSWORD]@aws-0-us-west-2.pooler.supabase.com:5432/postgres
```

Or:
```
postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-us-west-X.pooler.supabase.com:5432/postgres
```

## Differences from Direct Connection

| Direct Connection | Connection Pooler |
|-------------------|-------------------|
| Port: `5432` | Port: `5432` (same) |
| Host: `db.xxxxx.supabase.co` | Host: `aws-0-us-west-X.pooler.supabase.com` |
| Username: `postgres` | Username: `postgres.xxxxx` (with project ref) |

## Update Render

1. Go to Render → Your backend service → **Environment** tab
2. Update `DATABASE_URL` with the pooler connection string
3. Replace `[YOUR-PASSWORD]` with your actual password: `Henaolemos890`
4. Save and redeploy

## Example Connection String

With your password `Henaolemos890`, it should look like:
```
postgresql://postgres.zowurcekczkdpfaocphs:Henaolemos890@aws-0-us-west-2.pooler.supabase.com:5432/postgres
```

**Note**: The exact pooler host and username format may vary. Use what Supabase shows you in the dashboard.

## Test Connection

After updating, test the connection:
```bash
psql "postgresql://postgres.zowurcekczkdpfaocphs:Henaolemos890@aws-0-us-west-2.pooler.supabase.com:5432/postgres" -c "SELECT 1;"
```

## If Pooler Doesn't Work

If you still have issues, try:
1. **Transaction mode** instead of Session mode (in Supabase connection string settings)
2. **Direct connection** but ensure database is not paused
3. Check Render logs for the debug output showing if DATABASE_URL is being read
