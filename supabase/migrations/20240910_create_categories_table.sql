-- Create categories table if it doesn't exist
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some default categories if the table is empty
INSERT INTO categories (name, description)
SELECT 'Povrće', 'Sveže povrće iz naše bašte'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Povrće');

INSERT INTO categories (name, description)
SELECT 'Voće', 'Sveže voće iz naše bašte'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Voće');

INSERT INTO categories (name, description)
SELECT 'Mlečni proizvodi', 'Domaći mlečni proizvodi'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Mlečni proizvodi');

INSERT INTO categories (name, description)
SELECT 'Jaja', 'Sveža domaća jaja'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Jaja');

-- Enable realtime for categories table
alter publication supabase_realtime add table categories;
