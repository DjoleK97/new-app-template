-- Create a function to force delete a product and all its references
CREATE OR REPLACE FUNCTION delete_product_force(product_id text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete from cart_items first
  DELETE FROM cart_items WHERE product_id = $1;
  
  -- Delete the product itself
  DELETE FROM products WHERE id = $1;
  
  -- Add more DELETE statements here if other tables reference products
  -- For example:
  -- DELETE FROM order_items WHERE product_id = $1;
  -- DELETE FROM wishlist_items WHERE product_id = $1;
  -- etc.
  
  RETURN;
END;
$$;