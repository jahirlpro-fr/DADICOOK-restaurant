-- Add is_halal column to menu_items table
ALTER TABLE menu_items ADD COLUMN IF NOT EXISTS is_halal boolean DEFAULT false;

-- Add category_id to gallery_items for categorization
ALTER TABLE gallery_items ADD COLUMN IF NOT EXISTS category_id uuid REFERENCES categories(id) ON DELETE SET NULL;

-- Create index for gallery category
CREATE INDEX IF NOT EXISTS idx_gallery_items_category ON gallery_items(category_id);