-- This migration checks if the unique constraint already exists before trying to create it
-- This makes the migration idempotent (can be run multiple times without error)

DO $$ 
BEGIN
    -- Check if the constraint already exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint 
        WHERE conname = 'cart_items_product_id_session_id_unique'
    ) THEN
        -- Create the unique constraint only if it doesn't exist
        ALTER TABLE cart_items ADD CONSTRAINT cart_items_product_id_session_id_unique UNIQUE (product_id, session_id);
    ELSE
        RAISE NOTICE 'Constraint cart_items_product_id_session_id_unique already exists, skipping creation';
    END IF;
END $$;
