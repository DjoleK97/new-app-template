-- Create cart_items table if it doesn't exist
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id),
  session_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(product_id, user_id),
  UNIQUE(product_id, session_id)
);

-- Enable RLS on cart_items table
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Create policy for authenticated users
DROP POLICY IF EXISTS "Users can view their own cart items" ON cart_items;
CREATE POLICY "Users can view their own cart items"
  ON cart_items FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own cart items" ON cart_items;
CREATE POLICY "Users can insert their own cart items"
  ON cart_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own cart items" ON cart_items;
CREATE POLICY "Users can update their own cart items"
  ON cart_items FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own cart items" ON cart_items;
CREATE POLICY "Users can delete their own cart items"
  ON cart_items FOR DELETE
  USING (auth.uid() = user_id);

-- Create policies for guest users (using session_id)
DROP POLICY IF EXISTS "Guest users can view their own cart items" ON cart_items;
CREATE POLICY "Guest users can view their own cart items"
  ON cart_items FOR SELECT
  USING (
    session_id::text = current_setting('request.headers')::json->>'x-session-id'
    AND user_id IS NULL
  );

DROP POLICY IF EXISTS "Guest users can insert their own cart items" ON cart_items;
CREATE POLICY "Guest users can insert their own cart items"
  ON cart_items FOR INSERT
  WITH CHECK (
    session_id::text = current_setting('request.headers')::json->>'x-session-id'
    AND user_id IS NULL
  );

DROP POLICY IF EXISTS "Guest users can update their own cart items" ON cart_items;
CREATE POLICY "Guest users can update their own cart items"
  ON cart_items FOR UPDATE
  USING (
    session_id::text = current_setting('request.headers')::json->>'x-session-id'
    AND user_id IS NULL
  );

DROP POLICY IF EXISTS "Guest users can delete their own cart items" ON cart_items;
CREATE POLICY "Guest users can delete their own cart items"
  ON cart_items FOR DELETE
  USING (
    session_id::text = current_setting('request.headers')::json->>'x-session-id'
    AND user_id IS NULL
  );

-- Create function to merge guest cart with user cart
CREATE OR REPLACE FUNCTION merge_guest_cart_with_user_cart()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_session_id uuid;
  v_user_id uuid;
BEGIN
  -- Get the session ID from the request header
  v_session_id := (current_setting('request.headers')::json->>'x-session-id')::uuid;
  
  -- Get the authenticated user ID
  v_user_id := auth.uid();
  
  -- Exit if no user is authenticated
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'No authenticated user found';
  END IF;
  
  -- Merge guest cart items into user cart
  -- For each product in the guest cart:
  -- If the user already has the product, update the quantity
  -- If the user doesn't have the product, add it to their cart
  INSERT INTO cart_items (product_id, quantity, unit, user_id)
  SELECT 
    guest.product_id,
    guest.quantity,
    guest.unit,
    v_user_id
  FROM 
    cart_items guest
  WHERE 
    guest.session_id = v_session_id
    AND guest.user_id IS NULL
  ON CONFLICT (product_id, user_id) 
  DO UPDATE SET
    quantity = cart_items.quantity + EXCLUDED.quantity,
    updated_at = NOW();
  
  -- Delete the guest cart items
  DELETE FROM cart_items
  WHERE session_id = v_session_id AND user_id IS NULL;
  
END;
$$;

-- Enable realtime for cart_items
alter publication supabase_realtime add table cart_items;
