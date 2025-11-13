# How to Enable Realtime for the Rooms Table

## Method 1: Using Supabase Dashboard (Easiest)

1. **Go to your Supabase project dashboard**
   - Navigate to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Open Database → Replication**
   - In the left sidebar, click **Database**
   - Click **Replication** in the submenu

3. **Enable Realtime for `rooms` table**
   - You'll see a list of all tables in your database
   - Find the **`rooms`** table in the list
   - Toggle the switch to **ON** (it should turn green/blue)
   - The table should now show as "Enabled" or have a checkmark

4. **Verify it's enabled**
   - The `rooms` table should appear in the enabled list
   - You may see a green indicator or checkmark next to it

## Method 2: Using SQL Editor

1. **Go to SQL Editor**
   - In the left sidebar, click **SQL Editor**
   - Click **New query**

2. **Run the Realtime command**
   ```sql
   ALTER PUBLICATION supabase_realtime ADD TABLE rooms;
   ```

3. **Verify it worked**
   ```sql
   SELECT * FROM pg_publication_tables 
   WHERE pubname = 'supabase_realtime' AND tablename = 'rooms';
   ```
   - If you see a row returned, Realtime is enabled!

## Troubleshooting

### If the table doesn't appear in Replication:
- Make sure you've created the `rooms` table first (run `supabase-schema.sql`)
- Refresh the Replication page
- Check that the table exists: `SELECT * FROM rooms LIMIT 1;`

### If you get an error "relation does not exist":
- The `rooms` table hasn't been created yet
- Run the full `supabase-schema.sql` file first

### If Realtime still doesn't work:
- Make sure your Supabase project has Realtime enabled (it's enabled by default)
- Check your project settings → API → Realtime settings
- Verify your environment variables are set correctly

## Quick Check Command

Run this in SQL Editor to verify everything is set up:

```sql
-- Check if table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'rooms'
);

-- Check if Realtime is enabled
SELECT * FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' AND tablename = 'rooms';
```

Both queries should return `true` or a row respectively.

