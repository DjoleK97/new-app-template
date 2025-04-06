-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial settings
INSERT INTO settings (key, value)
VALUES ('orders_enabled', 'true')
ON CONFLICT (key) DO NOTHING;

-- Enable realtime for the settings table
ALTER PUBLICATION supabase_realtime ADD TABLE settings;
