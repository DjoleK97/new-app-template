-- Add is_featured column to products table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'products' AND column_name = 'is_featured') THEN
        ALTER TABLE products ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;
END$$;

-- Update existing products to be featured (for testing)
UPDATE products SET is_featured = true WHERE id IN (SELECT id FROM products LIMIT 3);
