-- First, ensure we have at least one category to reference
INSERT INTO categories (id, name, created_at)
SELECT gen_random_uuid(), 'Test Category', NOW()
WHERE NOT EXISTS (SELECT 1 FROM categories LIMIT 1);

-- Create a test product in the products table
INSERT INTO products (id, name, description, price, unit, category_id, available, image_url, created_at)
VALUES 
('12345678-1234-4321-abcd-1234567890ab', 'Test Product', 'A test product for development', 100, 'kom', 
 (SELECT id FROM categories ORDER BY created_at LIMIT 1), true, NULL, NOW())
ON CONFLICT (id) DO NOTHING;