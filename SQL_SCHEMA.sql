-- WAIN Database Schema for Supabase
-- This SQL creates all necessary tables and security policies

-- ========================================
-- 1. PROFILES TABLE (User Profiles)
-- ========================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone_number TEXT,
  avatar TEXT,
  language TEXT DEFAULT 'ar' CHECK (language IN ('ar', 'en')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- ========================================
-- 2. ITEMS TABLE (User Items/Storage)
-- ========================================

CREATE TABLE IF NOT EXISTS items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  location TEXT,
  category TEXT NOT NULL CHECK (category IN ('documents', 'electronics', 'clothing', 'furniture', 'valuables', 'miscellaneous')),
  image_url TEXT,
  tags TEXT[],
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE TRIGGER update_items_updated_at
    BEFORE UPDATE ON items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own items"
    ON items FOR SELECT
    USING (auth.uid() = user_id AND deleted_at IS NULL);

CREATE POLICY "Users can create items"
    ON items FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own items"
    ON items FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 3. DOCUMENTS TABLE (Receipts, Invoices, etc.)
-- ========================================

CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(id) ON DELETE SET NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('receipt', 'warranty', 'invoice', 'certificate', 'contract', 'identification', 'other')),
  image_url TEXT NOT NULL,
  extracted_data JSONB,
  original_data JSONB,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_documents_updated_at
    BEFORE UPDATE ON documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documents"
    ON documents FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create documents"
    ON documents FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
    ON documents FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 4. WARRANTIES TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS warranties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES items(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  warranty_start_date DATE NOT NULL,
  warranty_end_date DATE NOT NULL,
  duration_months INTEGER,
  provider TEXT,
  document_url TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_warranties_updated_at
    BEFORE UPDATE ON warranties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE warranties ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own warranties"
    ON warranties FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create warranties"
    ON warranties FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own warranties"
    ON warranties FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 5. SUBSCRIPTIONS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  provider TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'SAR',
  frequency TEXT NOT NULL CHECK (frequency IN ('monthly', 'quarterly', 'semi_annual', 'annual')),
  next_billing_date DATE NOT NULL,
  last_billing_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own subscriptions"
    ON subscriptions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create subscriptions"
    ON subscriptions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscriptions"
    ON subscriptions FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 6. LOANS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS loans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_name TEXT NOT NULL,
  borrower_name TEXT NOT NULL,
  loan_date DATE NOT NULL,
  expected_return_date DATE,
  actual_return_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'returned', 'overdue')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_loans_updated_at
    BEFORE UPDATE ON loans
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE loans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own loans"
    ON loans FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create loans"
    ON loans FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own loans"
    ON loans FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 7. REMINDERS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('warranty_expiry', 'loan_overdue', 'subscription_renewal', 'custom')),
  related_id UUID,
  due_date TIMESTAMP WITH TIME ZONE NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  notification_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_reminders_updated_at
    BEFORE UPDATE ON reminders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own reminders"
    ON reminders FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create reminders"
    ON reminders FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reminders"
    ON reminders FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 8. NOTIFICATIONS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('warranty', 'loan', 'subscription', 'system', 'custom')),
  related_id UUID,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications"
    ON notifications FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create notifications"
    ON notifications FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- ========================================
-- 9. AI_USAGE TABLE (Track API calls)
-- ========================================

CREATE TABLE IF NOT EXISTS ai_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  token_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER update_ai_usage_updated_at
    BEFORE UPDATE ON ai_usage
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own usage"
    ON ai_usage FOR SELECT
    USING (auth.uid() = user_id);

-- ========================================
-- 10. INDEXES (For Performance)
-- ========================================

CREATE INDEX IF NOT EXISTS idx_items_user_id ON items(user_id);
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_items_deleted_at ON items(deleted_at);

CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_item_id ON documents(item_id);
CREATE INDEX IF NOT EXISTS idx_documents_type ON documents(document_type);

CREATE INDEX IF NOT EXISTS idx_warranties_user_id ON warranties(user_id);
CREATE INDEX IF NOT EXISTS idx_warranties_end_date ON warranties(warranty_end_date);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_active ON subscriptions(is_active);

CREATE INDEX IF NOT EXISTS idx_loans_user_id ON loans(user_id);
CREATE INDEX IF NOT EXISTS idx_loans_status ON loans(status);

CREATE INDEX IF NOT EXISTS idx_reminders_user_id ON reminders(user_id);
CREATE INDEX IF NOT EXISTS idx_reminders_due_date ON reminders(due_date);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(is_read);

-- ========================================
-- 11. SETUP INSTRUCTIONS
-- ========================================

/*
SETUP INSTRUCTIONS:

1. Copy all SQL above (from CREATE TABLE to CREATE INDEX)

2. Go to Supabase Dashboard
   - Select your WAIN project
   - Go to SQL Editor
   - Create new query
   - Paste all SQL code
   - Click "Run"

3. Verify tables created:
   - profiles ✓
   - items ✓
   - documents ✓
   - warranties ✓
   - subscriptions ✓
   - loans ✓
   - reminders ✓
   - notifications ✓
   - ai_usage ✓

4. Check RLS is enabled:
   - All tables should have RLS enabled
   - All policies should be in place

5. Storage Configuration:
   - Create storage bucket: "items-images"
   - Create storage bucket: "documents"
   - Set RLS policies for buckets

6. Auth Configuration:
   - Email/Password auth should be enabled (default)
   - Email templates configured
   - SMTP settings configured

7. Test Connection:
   - Get SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY
   - Add to .env.local
   - Run app and test auth

NOTES:
- All RLS policies ensure users can only access their own data
- Soft delete implemented with deleted_at column for items
- Timestamps automatically updated with triggers
- Indexes added for frequently queried columns
- No passwords stored in app - all handled by Supabase Auth
*/
