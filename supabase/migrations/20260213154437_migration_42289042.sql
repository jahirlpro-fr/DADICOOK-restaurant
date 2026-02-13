-- Fix storage policies (Postgres < 14 compatible)
DROP POLICY IF EXISTS "Public read access for gallery images" ON storage.objects;
CREATE POLICY "Public read access for gallery images"
ON storage.objects FOR SELECT
USING (bucket_id = 'gallery-images');

DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can upload gallery images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can update gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can update gallery images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Authenticated users can delete gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can delete gallery images"
ON storage.objects FOR DELETE
USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');