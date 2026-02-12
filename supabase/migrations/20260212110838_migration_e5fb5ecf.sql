-- Create restaurants table (single restaurant for this project)
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for restaurants
CREATE POLICY "Anyone can view restaurant" ON restaurants FOR SELECT USING (true);
CREATE POLICY "Authenticated users can update restaurant" ON restaurants FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Insert the DADICOOK restaurant
INSERT INTO restaurants (name, description) VALUES (
  'DADICOOK',
  'Restaurant bistronomique proposant une cuisine du monde dans une ambiance chaleureuse et conviviale.'
);