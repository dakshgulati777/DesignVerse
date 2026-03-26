
-- Create blogs table
CREATE TABLE public.blogs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blogs" ON public.blogs FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can create blogs" ON public.blogs FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can update own blogs" ON public.blogs FOR UPDATE TO authenticated USING (auth.uid() = author_id);
CREATE POLICY "Users can delete own blogs" ON public.blogs FOR DELETE TO authenticated USING (auth.uid() = author_id);

-- Create marketplace_assets table
CREATE TABLE public.marketplace_assets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL DEFAULT 0,
  preview_url TEXT,
  download_url TEXT,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category TEXT DEFAULT 'General',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view marketplace assets" ON public.marketplace_assets FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated users can list assets" ON public.marketplace_assets FOR INSERT TO authenticated WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Users can update own assets" ON public.marketplace_assets FOR UPDATE TO authenticated USING (auth.uid() = seller_id);
CREATE POLICY "Users can delete own assets" ON public.marketplace_assets FOR DELETE TO authenticated USING (auth.uid() = seller_id);
