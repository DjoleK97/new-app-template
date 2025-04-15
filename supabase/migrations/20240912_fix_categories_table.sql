-- First check if the description column exists, if not add it
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'categories' AND column_name = 'description'
    ) THEN
        ALTER TABLE categories ADD COLUMN description TEXT;
    END IF;
END
$$;

-- Re-run the category inserts with proper error handling
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

-- Make sure realtime is enabled for categories table
alter publication supabase_realtime add table categories;
