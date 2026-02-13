-- Create gallery_items table for photo gallery (separate from menu)
CREATE TABLE IF NOT EXISTS gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  allergens TEXT[],
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view published gallery items"
  ON gallery_items FOR SELECT
  USING (status = 'published' OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert gallery items"
  ON gallery_items FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can update gallery items"
  ON gallery_items FOR UPDATE
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can delete gallery items"
  ON gallery_items FOR DELETE
  USING (auth.uid() IS NOT NULL);

-- Create indexes
CREATE INDEX idx_gallery_items_restaurant ON gallery_items(restaurant_id);
CREATE INDEX idx_gallery_items_status ON gallery_items(status);
CREATE INDEX idx_gallery_items_order ON gallery_items(display_order);