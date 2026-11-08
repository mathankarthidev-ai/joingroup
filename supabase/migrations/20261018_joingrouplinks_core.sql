-- ============================================================================
-- JOINGROUPLINKS: PRODUCTION POSTGRESQL SCHEMA MIGRATION 20261018
-- Core Tables: Platforms, Categories, Groups, Publishing Queue, Reports, Orders
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 1. SOCIAL PLATFORMS TAXONOMY (Arattai, WhatsApp, Telegram, etc.)
CREATE TABLE IF NOT EXISTS public.platforms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT,
  bg_color TEXT NOT NULL DEFAULT 'bg-slate-700',
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_platforms_slug ON public.platforms(slug);

-- 2. GROUP CATEGORIES
CREATE TABLE IF NOT EXISTS public.group_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  is_auto_approved BOOLEAN NOT NULL DEFAULT true,
  badge_tag TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_group_categories_slug ON public.group_categories(slug);

-- 3. MAIN DIRECTORY GROUPS & CHANNELS
CREATE TABLE IF NOT EXISTS public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  platform_id UUID REFERENCES public.platforms(id) ON DELETE RESTRICT,
  platform_slug TEXT NOT NULL,
  category_id UUID REFERENCES public.group_categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL,
  invite_url TEXT NOT NULL UNIQUE,
  country TEXT NOT NULL DEFAULT 'India',
  country_code TEXT NOT NULL DEFAULT 'IN',
  state TEXT,
  city TEXT,
  area TEXT,
  language TEXT NOT NULL DEFAULT 'English',
  member_count INT NOT NULL DEFAULT 0,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  is_verified BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  reports_count INT NOT NULL DEFAULT 0,
  views_count INT NOT NULL DEFAULT 0,
  clicks_count INT NOT NULL DEFAULT 0,
  admin_email TEXT,
  owner_email TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_groups_platform_status ON public.groups(platform_slug, status);
CREATE INDEX IF NOT EXISTS idx_groups_country_state_city ON public.groups(country, state, city);
CREATE INDEX IF NOT EXISTS idx_groups_category ON public.groups(category_name);
CREATE INDEX IF NOT EXISTS idx_groups_search_trgm ON public.groups USING gin (name gin_trgm_ops);

-- 4. WEEKLY PUBLISHING QUEUE & MULTI-TIER BATCH SCHEDULER
CREATE TABLE IF NOT EXISTS public.publishing_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  group_name TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('TIER_A_UNREGISTERED', 'TIER_B_REGISTERED', 'TIER_C_PRIORITY_PAID', 'TIER_D_VIP')),
  batch_week TEXT NOT NULL, -- e.g. '2026-W42'
  scheduled_publish_date TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'published', 'held', 'rejected')),
  submitter_email TEXT,
  priority_score INT NOT NULL DEFAULT 20,
  moderation_notes TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  published_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_queue_scheduled_status ON public.publishing_queue(scheduled_publish_date, status);
CREATE INDEX IF NOT EXISTS idx_queue_tier ON public.publishing_queue(tier);

-- 5. TRUST, SAFETY & COMMUNITY ABUSE REPORTS
CREATE TABLE IF NOT EXISTS public.group_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  group_name TEXT NOT NULL,
  reporter_email TEXT,
  reason TEXT NOT NULL CHECK (reason IN ('dead_link', 'spam', 'adult_content', 'misleading', 'other')),
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  reviewed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  resolved_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_group_reports_status ON public.group_reports(status);
CREATE INDEX IF NOT EXISTS idx_group_reports_group ON public.group_reports(group_id);

-- 6. PAYMENT ORDERS & RAZORPAY BILLING TRANSACTIONS
CREATE TABLE IF NOT EXISTS public.payment_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id TEXT NOT NULL UNIQUE,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  customer_name TEXT,
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'INR',
  status TEXT NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'paid', 'failed', 'refunded')),
  razorpay_payment_id TEXT,
  razorpay_signature TEXT,
  promo_code TEXT,
  discount_amount NUMERIC(10, 2) DEFAULT 0.00,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_payment_orders_order ON public.payment_orders(order_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_email ON public.payment_orders(customer_email);

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publishing_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;

-- Public can read platforms & categories
CREATE POLICY "Public can view active platforms" ON public.platforms
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public can view categories" ON public.group_categories
  FOR SELECT USING (true);

-- Public can view approved groups
CREATE POLICY "Public can view approved groups" ON public.groups
  FOR SELECT USING (status = 'approved');

-- Anyone can submit group report
CREATE POLICY "Anyone can file group report" ON public.group_reports
  FOR INSERT WITH CHECK (true);

-- Service role / Admin has full privileges on all tables
CREATE POLICY "Admin full access on groups" ON public.groups
  FOR ALL USING (auth.role() = 'service_role' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access on publishing_queue" ON public.publishing_queue
  FOR ALL USING (auth.role() = 'service_role' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access on group_reports" ON public.group_reports
  FOR ALL USING (auth.role() = 'service_role' OR auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access on payment_orders" ON public.payment_orders
  FOR ALL USING (auth.role() = 'service_role' OR auth.jwt() ->> 'role' = 'admin');
