-- Enable row level security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to insert their own records
DROP POLICY IF EXISTS "Users can insert their own records" ON public.users;
CREATE POLICY "Users can insert their own records"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

-- Create policy to allow users to select their own records
DROP POLICY IF EXISTS "Users can view their own records" ON public.users;
CREATE POLICY "Users can view their own records"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Create policy to allow users to update their own records
DROP POLICY IF EXISTS "Users can update their own records" ON public.users;
CREATE POLICY "Users can update their own records"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- Create policy for public access to users table (for initial signup)
DROP POLICY IF EXISTS "Public insert access" ON public.users;
CREATE POLICY "Public insert access"
ON public.users
FOR INSERT
TO anon
WITH CHECK (true);

-- Add realtime support
alter publication supabase_realtime add table public.users;
