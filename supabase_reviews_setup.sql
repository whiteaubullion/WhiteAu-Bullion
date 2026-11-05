-- ==============================================================================
-- WhiteAu Bullion - Database Setup for Customer Reviews & Complaints
-- Run this script in your Supabase Project Dashboard -> SQL Editor -> Run
-- ==============================================================================

-- 1. Create customer_reviews table
CREATE TABLE IF NOT EXISTS public.customer_reviews (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'Verified Customer',
  rating INT DEFAULT 5 NOT NULL,
  title TEXT,
  text TEXT NOT NULL,
  date TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- Drop any conflicting policies if re-running
DROP POLICY IF EXISTS "Public select reviews" ON public.customer_reviews;
DROP POLICY IF EXISTS "Public insert reviews" ON public.customer_reviews;
DROP POLICY IF EXISTS "Allow delete reviews" ON public.customer_reviews;

-- Anyone can read reviews
CREATE POLICY "Public select reviews" ON public.customer_reviews
  FOR SELECT USING (true);

-- Anyone can submit a review
CREATE POLICY "Public insert reviews" ON public.customer_reviews
  FOR INSERT WITH CHECK (true);

-- Deletion policy (managed and verified by server action)
CREATE POLICY "Allow delete reviews" ON public.customer_reviews
  FOR DELETE USING (true);


-- 2. Create customer_complaints table
CREATE TABLE IF NOT EXISTS public.customer_complaints (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  category TEXT NOT NULL,
  branch TEXT DEFAULT 'General',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.customer_complaints ENABLE ROW LEVEL SECURITY;

-- Drop any conflicting policies if re-running
DROP POLICY IF EXISTS "Public select complaints" ON public.customer_complaints;
DROP POLICY IF EXISTS "Public insert complaints" ON public.customer_complaints;
DROP POLICY IF EXISTS "Allow update complaints" ON public.customer_complaints;
DROP POLICY IF EXISTS "Allow delete complaints" ON public.customer_complaints;

-- Anyone can submit a complaint
CREATE POLICY "Public insert complaints" ON public.customer_complaints
  FOR INSERT WITH CHECK (true);

-- Admins / public can read complaints
CREATE POLICY "Public select complaints" ON public.customer_complaints
  FOR SELECT USING (true);

-- Status updates
CREATE POLICY "Allow update complaints" ON public.customer_complaints
  FOR UPDATE USING (true);

-- Deletion policy
CREATE POLICY "Allow delete complaints" ON public.customer_complaints
  FOR DELETE USING (true);

-- 3. Seed initial high-quality reviews if the table is empty
INSERT INTO public.customer_reviews (id, name, role, rating, title, text, date, created_at)
SELECT 'rev-1', 'Rahul M.', 'Verified Customer', 5, 'Extremely transparent and professional!', 'They tested my gold right in front of me and offered the live market rate.', '2 days ago', now() - interval '2 days'
WHERE NOT EXISTS (SELECT 1 FROM public.customer_reviews WHERE id = 'rev-1');

INSERT INTO public.customer_reviews (id, name, role, rating, title, text, date, created_at)
SELECT 'rev-2', 'Sneha K.', 'Local Client', 5, 'The instant payment was a lifesaver.', 'I was skeptical about selling my old jewellery, but the team made it secure and easy.', '4 days ago', now() - interval '4 days'
WHERE NOT EXISTS (SELECT 1 FROM public.customer_reviews WHERE id = 'rev-2');

INSERT INTO public.customer_reviews (id, name, role, rating, title, text, date, created_at)
SELECT 'rev-3', 'David T.', 'Verified Customer', 5, 'Best valuation in Kerala.', 'WhiteAu gave me the most honest and highest return for my pledged gold.', '1 week ago', now() - interval '7 days'
WHERE NOT EXISTS (SELECT 1 FROM public.customer_reviews WHERE id = 'rev-3');

INSERT INTO public.customer_reviews (id, name, role, rating, title, text, date, created_at)
SELECT 'rev-4', 'Anjali S.', 'Local Client', 4, 'Very smooth experience.', 'The staff explained the purity test clearly. Got money transferred in minutes.', '2 weeks ago', now() - interval '14 days'
WHERE NOT EXISTS (SELECT 1 FROM public.customer_reviews WHERE id = 'rev-4');

INSERT INTO public.customer_reviews (id, name, role, rating, title, text, date, created_at)
SELECT 'rev-5', 'Vikram P.', 'Verified Customer', 5, 'Totally hassle-free!', 'Releasing my pledged gold was a headache until I found them. They handled the bank directly.', '3 weeks ago', now() - interval '21 days'
WHERE NOT EXISTS (SELECT 1 FROM public.customer_reviews WHERE id = 'rev-5');

