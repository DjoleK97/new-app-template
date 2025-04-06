-- Add unique constraint to product_id in cart_items table
ALTER TABLE cart_items ADD CONSTRAINT unique_product_per_cart UNIQUE (product_id, session_id);

-- Enable RLS for cart_items table
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

-- Create policy for cart_items table
DROP POLICY IF EXISTS "Users can only see their own cart items" ON cart_items;
CREATE POLICY "Users can only see their own cart items"
ON cart_items FOR ALL
USING (
  (auth.uid() = user_id) OR 
  (session_id = current_setting('request.headers')::json->>'x-session-id')
);

-- Add this table to realtime
alter publication supabase_realtime add table cart_items;
