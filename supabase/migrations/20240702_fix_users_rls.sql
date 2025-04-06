-- Drop existing RLS policies on users table if they exist
DROP POLICY IF EXISTS "Users can view their own data." ON users;
DROP POLICY IF EXISTS "Users can insert their own data." ON users;
DROP POLICY IF EXISTS "Users can update own data." ON users;

-- Enable RLS on users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data."
ON users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data."
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own data."
ON users FOR UPDATE
USING (auth.uid() = id);

-- Add public access policy for users table
CREATE POLICY "Public access"
ON users FOR SELECT
USING (true);
