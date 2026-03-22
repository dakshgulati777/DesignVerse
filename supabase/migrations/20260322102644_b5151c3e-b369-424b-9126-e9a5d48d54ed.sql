
INSERT INTO storage.buckets (id, name, public) VALUES ('brand-assets', 'brand-assets', true);

CREATE POLICY "Auth users can upload brand assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'brand-assets' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Auth users can view brand assets"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'brand-assets' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Anon can view brand assets"
ON storage.objects FOR SELECT TO anon
USING (bucket_id = 'brand-assets');

CREATE POLICY "Auth users can delete brand assets"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'brand-assets' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE TABLE public.brand_kits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  brand_name text NOT NULL,
  brand_colors jsonb NOT NULL DEFAULT '[]',
  logo_url text,
  tagline text,
  tone text DEFAULT 'professional',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.brand_kits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own brand kits" ON public.brand_kits FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own brand kits" ON public.brand_kits FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own brand kits" ON public.brand_kits FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users delete own brand kits" ON public.brand_kits FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.generated_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_kit_id uuid NOT NULL REFERENCES public.brand_kits(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_image_url text NOT NULL,
  content_type text NOT NULL,
  caption text,
  hashtags text[],
  image_url text,
  schedule_day text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own content" ON public.generated_content FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own content" ON public.generated_content FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own content" ON public.generated_content FOR DELETE TO authenticated USING (auth.uid() = user_id);
