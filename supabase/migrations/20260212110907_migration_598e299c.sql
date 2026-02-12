-- Create menu_du_jour table for daily specials
CREATE TABLE menu_du_jour (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE menu_du_jour ENABLE ROW LEVEL SECURITY;

-- RLS Policies for menu_du_jour
CREATE POLICY "Anyone can view active menu du jour" ON menu_du_jour FOR SELECT USING (is_active = true OR auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can insert menu du jour" ON menu_du_jour FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update menu du jour" ON menu_du_jour FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete menu du jour" ON menu_du_jour FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create index
CREATE INDEX idx_menu_du_jour_restaurant ON menu_du_jour(restaurant_id);
CREATE INDEX idx_menu_du_jour_active ON menu_du_jour(is_active);