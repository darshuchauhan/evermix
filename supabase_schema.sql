-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  brochure_url TEXT,
  images TEXT[] DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public Read Access" ON products
  FOR SELECT USING (true);

-- Allow authenticated (admin) all access
CREATE POLICY "Admin All Access" ON products
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Create Storage Bucket 'product-assets' if it doesn't exist
-- Note: This requires the storage extension to be enabled
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-assets', 'product-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'product-assets' bucket

-- 1. Allow public to view assets
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-assets' );

-- 2. Allow authenticated users to upload assets
CREATE POLICY "Authenticated Upload Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'product-assets' );

-- 3. Allow authenticated users to manage (Update/Delete) assets
CREATE POLICY "Authenticated Manage Access"
ON storage.objects FOR ALL
TO authenticated
USING ( bucket_id = 'product-assets' );
