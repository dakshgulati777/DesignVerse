-- Create blogs table
CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    cover_image TEXT,
    author_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS for blogs
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read blogs" ON public.blogs
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create blogs" ON public.blogs
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

CREATE POLICY "Users can update their own blogs" ON public.blogs
    FOR UPDATE USING (auth.uid() = author_id);

-- Create marketplace_assets table
CREATE TABLE IF NOT EXISTS public.marketplace_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC DEFAULT 0,
    preview_url TEXT,
    download_url TEXT,
    seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS for marketplace_assets
ALTER TABLE public.marketplace_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read assets" ON public.marketplace_assets
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can add assets" ON public.marketplace_assets
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = seller_id);
