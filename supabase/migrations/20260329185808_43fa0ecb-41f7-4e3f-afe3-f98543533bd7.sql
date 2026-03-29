
-- Create blog-images storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create marketplace-images storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('marketplace-images', 'marketplace-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS for blog-images
CREATE POLICY "Anyone can view blog images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'blog-images');
CREATE POLICY "Authenticated users can upload blog images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'blog-images');
CREATE POLICY "Users can delete own blog images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'blog-images' AND (storage.foldername(name))[1] = auth.uid()::text);

-- RLS for marketplace-images
CREATE POLICY "Anyone can view marketplace images" ON storage.objects FOR SELECT TO public USING (bucket_id = 'marketplace-images');
CREATE POLICY "Authenticated users can upload marketplace images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'marketplace-images');
CREATE POLICY "Users can delete own marketplace images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'marketplace-images' AND (storage.foldername(name))[1] = auth.uid()::text);
