-- Create menu_du_jour_items table for multiple daily specials
CREATE TABLE IF NOT EXISTS menu_du_jour_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE menu_du_jour_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published menu du jour items"
  ON menu_du_jour_items FOR SELECT
  USING (status = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert menu du jour items"
  ON menu_du_jour_items FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update menu du jour items"
  ON menu_du_jour_items FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete menu du jour items"
  ON menu_du_jour_items FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_menu_du_jour_items_restaurant ON menu_du_jour_items(restaurant_id);
CREATE INDEX IF NOT EXISTS idx_menu_du_jour_items_order ON menu_du_jour_items(display_order);
CREATE INDEX IF NOT EXISTS idx_menu_du_jour_items_status ON menu_du_jour_items(status);