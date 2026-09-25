-- 1. Create Profiles Table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'pending', 'blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Gold Rates Table
CREATE TABLE gold_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gold_type TEXT NOT NULL,
  purity TEXT,
  rate_per_gram NUMERIC NOT NULL CHECK (rate_per_gram > 0),
  rate_per_10_grams NUMERIC NOT NULL CHECK (rate_per_10_grams > 0),
  rate_per_sovereign NUMERIC CHECK (rate_per_sovereign > 0),
  currency TEXT DEFAULT 'INR',
  is_active BOOLEAN DEFAULT true,
  updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Gold Rate History Table
CREATE TABLE gold_rate_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  gold_rate_id UUID REFERENCES gold_rates(id) ON DELETE CASCADE,
  gold_type TEXT NOT NULL,
  previous_rate NUMERIC,
  new_rate NUMERIC NOT NULL,
  updated_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Login Activity Table
CREATE TABLE login_activity (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  login_method TEXT NOT NULL,
  login_status TEXT NOT NULL,
  login_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  event_reference TEXT
);

-- 5. Create Admin Audit Logs Table
CREATE TABLE admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profiles_updated
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER on_gold_rates_updated
  BEFORE UPDATE ON gold_rates
  FOR EACH ROW EXECUTE PROCEDURE handle_updated_at();

-- Trigger for gold rate history
CREATE OR REPLACE FUNCTION handle_gold_rate_history()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'UPDATE' AND (NEW.rate_per_gram IS DISTINCT FROM OLD.rate_per_gram OR NEW.rate_per_10_grams IS DISTINCT FROM OLD.rate_per_10_grams) THEN
    INSERT INTO gold_rate_history (gold_rate_id, gold_type, previous_rate, new_rate, updated_by)
    VALUES (NEW.id, NEW.gold_type, OLD.rate_per_10_grams, NEW.rate_per_10_grams, NEW.updated_by);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_gold_rate_updated
  AFTER UPDATE ON gold_rates
  FOR EACH ROW EXECUTE PROCEDURE handle_gold_rate_history();

-- RLS POLICIES --

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gold_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE gold_rate_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_activity ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
-- Users can insert their own profile
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
-- Users can update own profile (but not role/status)
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id AND 
    role = (SELECT role FROM profiles WHERE id = auth.uid()) AND
    account_status = (SELECT account_status FROM profiles WHERE id = auth.uid())
  );
-- Admins can view and manage all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update all profiles" ON profiles
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 2. Gold Rates Policies
-- Anyone authenticated can view active rates
CREATE POLICY "Authenticated users can view active rates" ON gold_rates
  FOR SELECT USING (auth.role() = 'authenticated' AND is_active = true);
-- Admins can view all rates
CREATE POLICY "Admins can view all rates" ON gold_rates
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
-- Admins can insert/update rates
CREATE POLICY "Admins can insert rates" ON gold_rates
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update rates" ON gold_rates
  FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

-- 3. Gold Rate History Policies
-- Admins can view rate history
CREATE POLICY "Admins can view rate history" ON gold_rate_history
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
-- (History is inserted via trigger, bypassing RLS typically, but can be restricted from direct inserts)

-- 4. Login Activity Policies
-- Admins can view all login activity
CREATE POLICY "Admins can view login activity" ON login_activity
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
-- Users can view their own login activity
CREATE POLICY "Users can view own login activity" ON login_activity
  FOR SELECT USING (auth.uid() = user_id);

-- 5. Admin Audit Logs Policies
-- Admins can view audit logs
CREATE POLICY "Admins can view audit logs" ON admin_audit_logs
  FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));
