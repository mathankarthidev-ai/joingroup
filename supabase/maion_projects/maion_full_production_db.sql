-- ====================================================================
-- MAION AI Digital Technology Solutions
-- College Student Projects Platform - Production Supabase PostgreSQL Schema
-- Database Architecture, Normalized Relational Tables, Constraints,
-- Performance Indexes, Row Level Security (RLS) & Storage Policies
-- ====================================================================

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ====================================================================
-- 1. ENUMS & DOMAINS
-- ====================================================================

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('student', 'admin', 'project_manager', 'developer', 'support');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE project_type AS ENUM ('final_year', 'mini_project', 'major_project', 'capstone', 'custom');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE request_status AS ENUM (
    'new', 'reviewing', 'contacted', 'quotation_sent', 
    'approved', 'rejected', 'converted', 'completed'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE package_type AS ENUM ('basic', 'standard', 'premium', 'custom');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE payment_status AS ENUM ('pending', 'partially_paid', 'paid', 'failed', 'refunded');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE order_status AS ENUM (
    'pending', 'confirmed', 'requirement_collection', 'development',
    'testing', 'documentation', 'demo', 'completed', 'cancelled'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE project_delivery_status AS ENUM (
    'assigned', 'in_progress', 'first_review', 'testing',
    'demo_ready', 'delivered', 'viva_ready', 'completed', 'on_hold'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE task_status AS ENUM ('todo', 'in_progress', 'review', 'completed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE task_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE document_type AS ENUM (
    'synopsis', 'abstract', 'srs', 'uml', 'architecture', 
    'database_design', 'project_report', 'ppt', 'ieee_paper', 
    'installation_guide', 'source_code', 'demo_video', 'other'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE meeting_type AS ENUM (
    'requirement_discussion', 'project_demo', 'code_explanation', 
    'viva_preparation', 'support_doubt'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE meeting_status AS ENUM ('scheduled', 'ongoing', 'completed', 'cancelled', 'rescheduled');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'waiting_on_student', 'resolved', 'closed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE certificate_type AS ENUM ('project_completion', 'internship', 'training', 'merit');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE certificate_status AS ENUM ('active', 'revoked');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'won', 'lost');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE discount_type AS ENUM ('percentage', 'fixed');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ====================================================================
-- 2. EDUCATION TABLES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.degrees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  short_name VARCHAR(50) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  short_name VARCHAR(50) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.colleges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  university VARCHAR(255),
  website VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 3. USERS / PROFILES TABLE (Linked with Supabase Auth)
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  whatsapp_number VARCHAR(50),
  college_id UUID REFERENCES public.colleges(id) ON DELETE SET NULL,
  degree_id UUID REFERENCES public.degrees(id) ON DELETE SET NULL,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  year_of_study INT CHECK (year_of_study BETWEEN 1 AND 5),
  city VARCHAR(100),
  avatar_url TEXT,
  role user_role DEFAULT 'student' NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 4. PROJECT CATALOG
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.project_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  description TEXT,
  image_url TEXT,
  icon VARCHAR(100),
  display_order INT DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  category VARCHAR(100), -- e.g. Frontend, Backend, AI/ML, Hardware, Database
  logo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description VARCHAR(500) NOT NULL,
  description TEXT NOT NULL,
  abstract TEXT,
  problem_statement TEXT,
  proposed_solution TEXT,
  project_type project_type DEFAULT 'final_year' NOT NULL,
  difficulty difficulty_level DEFAULT 'intermediate' NOT NULL,
  degree_id UUID REFERENCES public.degrees(id) ON DELETE SET NULL,
  department_id UUID REFERENCES public.departments(id) ON DELETE SET NULL,
  duration VARCHAR(100) DEFAULT '2-4 Weeks',
  starting_price NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  featured BOOLEAN DEFAULT FALSE NOT NULL,
  trending BOOLEAN DEFAULT FALSE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  seo_title VARCHAR(255),
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Many-to-Many: Projects <-> Categories
CREATE TABLE IF NOT EXISTS public.project_category_map (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  category_id UUID REFERENCES public.project_categories(id) ON DELETE CASCADE NOT NULL,
  primary_category BOOLEAN DEFAULT FALSE NOT NULL,
  PRIMARY KEY (project_id, category_id)
);

-- Many-to-Many: Projects <-> Technologies
CREATE TABLE IF NOT EXISTS public.project_technology_map (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  technology_id UUID REFERENCES public.project_technologies(id) ON DELETE CASCADE NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE NOT NULL,
  PRIMARY KEY (project_id, technology_id)
);

CREATE TABLE IF NOT EXISTS public.project_features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  display_order INT DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  image_type VARCHAR(50) DEFAULT 'screenshot', -- thumbnail, screenshot, architecture_diagram, output
  display_order INT DEFAULT 0 NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_deliverables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  is_included BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_tag_map (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES public.project_tags(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (project_id, tag_id)
);

-- ====================================================================
-- 5. CUSTOM PROJECT REQUESTS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.project_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  college VARCHAR(255),
  degree VARCHAR(100),
  department VARCHAR(100),
  project_title VARCHAR(255) NOT NULL,
  abstract TEXT,
  preferred_domain VARCHAR(150),
  preferred_technology VARCHAR(255),
  requirements TEXT NOT NULL,
  submission_deadline DATE,
  budget VARCHAR(100),
  uploaded_file_url TEXT,
  status request_status DEFAULT 'new' NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 6. PACKAGES
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.project_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  package_type package_type DEFAULT 'standard' NOT NULL,
  features JSONB DEFAULT '[]'::jsonb NOT NULL,
  is_popular BOOLEAN DEFAULT FALSE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 7. COUPONS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type discount_type DEFAULT 'percentage' NOT NULL,
  discount_value NUMERIC(10, 2) NOT NULL,
  minimum_order_amount NUMERIC(10, 2) DEFAULT 0.00,
  maximum_discount NUMERIC(10, 2),
  start_date TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  end_date TIMESTAMPTZ,
  usage_limit INT DEFAULT 100,
  used_count INT DEFAULT 0 NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 8. ORDERS & ORDER ITEMS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number VARCHAR(100) UNIQUE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT NOT NULL,
  coupon_id UUID REFERENCES public.coupons(id) ON DELETE SET NULL,
  total_amount NUMERIC(10, 2) NOT NULL,
  discount_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  tax_amount NUMERIC(10, 2) DEFAULT 0.00 NOT NULL,
  final_amount NUMERIC(10, 2) NOT NULL,
  payment_status payment_status DEFAULT 'pending' NOT NULL,
  order_status order_status DEFAULT 'pending' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE RESTRICT NOT NULL,
  package_id UUID REFERENCES public.project_packages(id) ON DELETE RESTRICT NOT NULL,
  quantity INT DEFAULT 1 NOT NULL,
  unit_price NUMERIC(10, 2) NOT NULL,
  total_price NUMERIC(10, 2) NOT NULL
);

-- ====================================================================
-- 9. PAYMENTS (Prepared for Razorpay Integration)
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT NOT NULL,
  payment_gateway VARCHAR(50) DEFAULT 'razorpay' NOT NULL,
  transaction_id VARCHAR(255) NOT NULL, -- Razorpay Payment ID (e.g. pay_XXXXX)
  razorpay_order_id VARCHAR(255),       -- Razorpay Order ID (e.g. order_XXXXX)
  razorpay_signature VARCHAR(255),      -- Verification signature
  amount NUMERIC(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR' NOT NULL,
  payment_status payment_status DEFAULT 'pending' NOT NULL,
  payment_method VARCHAR(50), -- upi, netbanking, card, wallet
  paid_at TIMESTAMPTZ,
  gateway_response JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 10. PROJECT DELIVERY & TRACKING
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.student_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE RESTRICT NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE RESTRICT NOT NULL,
  assigned_developer UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  start_date DATE DEFAULT CURRENT_DATE,
  expected_completion_date DATE,
  actual_completion_date DATE,
  current_status project_delivery_status DEFAULT 'assigned' NOT NULL,
  progress_percentage INT DEFAULT 0 CHECK (progress_percentage BETWEEN 0 AND 100) NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_project_id UUID REFERENCES public.student_projects(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status task_status DEFAULT 'todo' NOT NULL,
  priority task_priority DEFAULT 'medium' NOT NULL,
  due_date DATE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.project_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_project_id UUID REFERENCES public.student_projects(id) ON DELETE CASCADE NOT NULL,
  old_status VARCHAR(50),
  new_status VARCHAR(50) NOT NULL,
  changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 11. DOCUMENTS & ASSETS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.project_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_project_id UUID REFERENCES public.student_projects(id) ON DELETE CASCADE NOT NULL,
  document_type document_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  version VARCHAR(20) DEFAULT 'v1.0' NOT NULL,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_final BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 12. MEETINGS & SUPPORT TICKETS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.project_meetings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_project_id UUID REFERENCES public.student_projects(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  meeting_type meeting_type DEFAULT 'project_demo' NOT NULL,
  meeting_url TEXT NOT NULL,
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration INT DEFAULT 45 NOT NULL, -- in minutes
  status meeting_status DEFAULT 'scheduled' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  student_project_id UUID REFERENCES public.student_projects(id) ON DELETE SET NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  priority ticket_priority DEFAULT 'medium' NOT NULL,
  status ticket_status DEFAULT 'open' NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 13. BLOG & SEO TAXONOMY
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.blog_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(150) UNIQUE NOT NULL,
  description TEXT,
  seo_title VARCHAR(255),
  seo_description TEXT,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  status blog_status DEFAULT 'draft' NOT NULL,
  published_at TIMESTAMPTZ,
  seo_title VARCHAR(255),
  seo_description TEXT,
  seo_keywords TEXT,
  reading_time INT DEFAULT 5, -- in minutes
  view_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blog_tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blog_tag_map (
  blog_id UUID REFERENCES public.blogs(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES public.blog_tags(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (blog_id, tag_id)
);

CREATE TABLE IF NOT EXISTS public.seo_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_type VARCHAR(50) NOT NULL, -- category, technology, degree, department, city, custom
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  city VARCHAR(100),
  degree VARCHAR(100),
  department VARCHAR(100),
  technology VARCHAR(100),
  content TEXT,
  seo_title VARCHAR(255) NOT NULL,
  seo_description TEXT NOT NULL,
  canonical_url TEXT,
  is_indexable BOOLEAN DEFAULT TRUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 14. REVIEWS & RATINGS
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.project_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  rating INT CHECK (rating BETWEEN 1 AND 5) NOT NULL,
  review_title VARCHAR(255),
  review_content TEXT NOT NULL,
  image_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE NOT NULL,
  is_approved BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 15. CERTIFICATES & VERIFICATION
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.certificates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  student_project_id UUID REFERENCES public.student_projects(id) ON DELETE CASCADE NOT NULL,
  certificate_number VARCHAR(100) UNIQUE NOT NULL, -- e.g. MAION-2026-CS-8921
  certificate_type certificate_type DEFAULT 'project_completion' NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  project_title VARCHAR(255) NOT NULL,
  issue_date DATE DEFAULT CURRENT_DATE NOT NULL,
  certificate_url TEXT NOT NULL,
  qr_code_url TEXT,
  status certificate_status DEFAULT 'active' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.certificate_verifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  certificate_id UUID REFERENCES public.certificates(id) ON DELETE CASCADE NOT NULL,
  verification_code VARCHAR(100) NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT
);

-- ====================================================================
-- 16. MARKETING & LEAD MANAGEMENT
-- ====================================================================

CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(profile_id, project_id)
);

CREATE TABLE IF NOT EXISTS public.project_comparisons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(profile_id, project_id)
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  source VARCHAR(100) DEFAULT 'website',
  status VARCHAR(50) DEFAULT 'unread',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  whatsapp VARCHAR(50),
  college VARCHAR(255),
  degree VARCHAR(100),
  department VARCHAR(100),
  interested_project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  source VARCHAR(100) DEFAULT 'enquiry_form',
  status lead_status DEFAULT 'new' NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.lead_followups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  followup_date DATE NOT NULL,
  notes TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  notification_type VARCHAR(50) DEFAULT 'system',
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ====================================================================
-- 17. PERFORMANCE INDEXES
-- ====================================================================

-- Project Catalog Indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON public.projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_project_type ON public.projects(project_type);
CREATE INDEX IF NOT EXISTS idx_projects_difficulty ON public.projects(difficulty);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(featured) WHERE featured = TRUE;
CREATE INDEX IF NOT EXISTS idx_projects_trending ON public.projects(trending) WHERE trending = TRUE;
CREATE INDEX IF NOT EXISTS idx_projects_is_active ON public.projects(is_active) WHERE is_active = TRUE;
CREATE INDEX IF NOT EXISTS idx_projects_degree ON public.projects(degree_id);
CREATE INDEX IF NOT EXISTS idx_projects_department ON public.projects(department_id);
CREATE INDEX IF NOT EXISTS idx_project_categories_slug ON public.project_categories(slug);
CREATE INDEX IF NOT EXISTS idx_project_technologies_slug ON public.project_technologies(slug);

-- Blog & SEO Indexes
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_seo_pages_slug ON public.seo_pages(slug);
CREATE INDEX IF NOT EXISTS idx_seo_pages_page_type ON public.seo_pages(page_type);

-- Orders, Payments & Tracking Indexes
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_profile_id ON public.orders(profile_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(order_status);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON public.payments(order_id);
CREATE INDEX IF NOT EXISTS idx_payments_transaction_id ON public.payments(transaction_id);
CREATE INDEX IF NOT EXISTS idx_student_projects_profile ON public.student_projects(profile_id);
CREATE INDEX IF NOT EXISTS idx_student_projects_status ON public.student_projects(current_status);

-- Requests, Leads & Certificates Indexes
CREATE INDEX IF NOT EXISTS idx_project_requests_status ON public.project_requests(status);
CREATE INDEX IF NOT EXISTS idx_project_requests_created_at ON public.project_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_certificates_cert_number ON public.certificates(certificate_number);
CREATE INDEX IF NOT EXISTS idx_certificates_profile_id ON public.certificates(profile_id);
CREATE INDEX IF NOT EXISTS idx_cert_verifications_code ON public.certificate_verifications(verification_code);

-- ====================================================================
-- 18. AUTOMATIC UPDATED_AT TRIGGER FUNCTION
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$ BEGIN
  CREATE TRIGGER tr_colleges_updated_at BEFORE UPDATE ON public.colleges FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_project_categories_updated_at BEFORE UPDATE ON public.project_categories FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_project_requests_updated_at BEFORE UPDATE ON public.project_requests FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_project_packages_updated_at BEFORE UPDATE ON public.project_packages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_student_projects_updated_at BEFORE UPDATE ON public.student_projects FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_project_tasks_updated_at BEFORE UPDATE ON public.project_tasks FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_project_documents_updated_at BEFORE UPDATE ON public.project_documents FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_support_tickets_updated_at BEFORE UPDATE ON public.support_tickets FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_seo_pages_updated_at BEFORE UPDATE ON public.seo_pages FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TRIGGER tr_coupons_updated_at BEFORE UPDATE ON public.coupons FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ====================================================================
-- 19. AUTH TRIGGER TO CREATE PROFILE AUTOMATICALLY ON REGISTRATION
-- ====================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    phone,
    avatar_url,
    role,
    is_active
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student User'),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'::user_role),
    TRUE
  ) ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DO $$ BEGIN
  CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ====================================================================
-- 20. ROW LEVEL SECURITY (RLS) & ACCESS CONTROL
-- ====================================================================

-- Enable RLS across all tables
ALTER TABLE public.degrees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_category_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_technology_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tag_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_tag_map ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificate_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_comparisons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lead_followups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper security functions
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role = 'admin'
    AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid()
    AND role IN ('admin', 'project_manager', 'developer', 'support')
    AND is_active = TRUE
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 20.1 PUBLIC READ POLICIES (Catalog, Categories, Technologies, Blogs, Packages)
CREATE POLICY "Public can view active degrees" ON public.degrees
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active departments" ON public.departments
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active colleges" ON public.colleges
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active project categories" ON public.project_categories
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active technologies" ON public.project_technologies
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active projects" ON public.projects
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view project category maps" ON public.project_category_map
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view project technology maps" ON public.project_technology_map
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view project features" ON public.project_features
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view project images" ON public.project_images
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view project deliverables" ON public.project_deliverables
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view active project faqs" ON public.project_faqs
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view project tags" ON public.project_tags
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view project tag maps" ON public.project_tag_map
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view active packages" ON public.project_packages
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view active blog categories" ON public.blog_categories
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view published blogs" ON public.blogs
  FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view blog tags" ON public.blog_tags
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view blog tag maps" ON public.blog_tag_map
  FOR SELECT USING (TRUE);

CREATE POLICY "Public can view active seo pages" ON public.seo_pages
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Public can view approved reviews" ON public.project_reviews
  FOR SELECT USING (is_approved = TRUE);

CREATE POLICY "Public can view active certificates for verification" ON public.certificates
  FOR SELECT USING (status = 'active');

CREATE POLICY "Public can insert certificate verification logs" ON public.certificate_verifications
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Public can submit contact messages" ON public.contact_messages
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Public can submit leads" ON public.leads
  FOR INSERT WITH CHECK (TRUE);

-- 20.2 PROFILES POLICIES
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id OR public.is_staff());

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- 20.3 PROJECT REQUESTS POLICIES
CREATE POLICY "Students can view own project requests" ON public.project_requests
  FOR SELECT USING (auth.uid() = profile_id OR public.is_staff());

CREATE POLICY "Anyone can submit a project request" ON public.project_requests
  FOR INSERT WITH CHECK (auth.uid() = profile_id OR profile_id IS NULL);

-- 20.4 ORDERS & ITEMS POLICIES
CREATE POLICY "Students can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = profile_id OR public.is_staff());

CREATE POLICY "Students can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Students can view own order items" ON public.order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND (orders.profile_id = auth.uid() OR public.is_staff())
    )
  );

CREATE POLICY "Students can insert order items for own order" ON public.order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.profile_id = auth.uid()
    )
  );

-- 20.5 PAYMENTS POLICIES
CREATE POLICY "Students can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = profile_id OR public.is_staff());

-- 20.6 STUDENT PROJECTS & DELIVERY POLICIES
CREATE POLICY "Students can view own assigned projects" ON public.student_projects
  FOR SELECT USING (auth.uid() = profile_id OR public.is_staff());

CREATE POLICY "Students can view tasks of own project" ON public.project_tasks
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.student_projects 
      WHERE student_projects.id = project_tasks.student_project_id 
      AND (student_projects.profile_id = auth.uid() OR public.is_staff())
    )
  );

CREATE POLICY "Students can view status history of own project" ON public.project_status_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.student_projects 
      WHERE student_projects.id = project_status_history.student_project_id 
      AND (student_projects.profile_id = auth.uid() OR public.is_staff())
    )
  );

-- 20.7 DOCUMENTS & MEETINGS POLICIES
CREATE POLICY "Students can view documents of own project" ON public.project_documents
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.student_projects 
      WHERE student_projects.id = project_documents.student_project_id 
      AND (student_projects.profile_id = auth.uid() OR public.is_staff())
    )
  );

CREATE POLICY "Students can view scheduled meetings of own project" ON public.project_meetings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.student_projects 
      WHERE student_projects.id = project_meetings.student_project_id 
      AND (student_projects.profile_id = auth.uid() OR public.is_staff())
    )
  );

-- 20.8 SUPPORT TICKETS POLICIES
CREATE POLICY "Students can view own support tickets" ON public.support_tickets
  FOR SELECT USING (auth.uid() = profile_id OR public.is_staff());

CREATE POLICY "Students can create support tickets" ON public.support_tickets
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- 20.9 REVIEWS, WISHLIST, NOTIFICATIONS POLICIES
CREATE POLICY "Students can create reviews for their projects" ON public.project_reviews
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Students can view own reviews" ON public.project_reviews
  FOR SELECT USING (auth.uid() = profile_id OR is_approved = TRUE OR public.is_staff());

CREATE POLICY "Students can manage own wishlist" ON public.wishlists
  FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Students can manage own comparisons" ON public.project_comparisons
  FOR ALL USING (auth.uid() = profile_id);

CREATE POLICY "Students can view own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Students can update read status on notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = profile_id);

-- 20.10 ADMIN & STAFF FULL CRUD POLICIES
CREATE POLICY "Staff full access to degrees" ON public.degrees FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to departments" ON public.departments FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to colleges" ON public.colleges FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to profiles" ON public.profiles FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to categories" ON public.project_categories FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to technologies" ON public.project_technologies FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to projects" ON public.projects FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project category maps" ON public.project_category_map FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project tech maps" ON public.project_technology_map FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project features" ON public.project_features FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project images" ON public.project_images FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project deliverables" ON public.project_deliverables FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project faqs" ON public.project_faqs FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project tags" ON public.project_tags FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project tag maps" ON public.project_tag_map FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project requests" ON public.project_requests FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to packages" ON public.project_packages FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to coupons" ON public.coupons FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to orders" ON public.orders FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to order items" ON public.order_items FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to payments" ON public.payments FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to student projects" ON public.student_projects FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project tasks" ON public.project_tasks FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project status history" ON public.project_status_history FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project documents" ON public.project_documents FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project meetings" ON public.project_meetings FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to support tickets" ON public.support_tickets FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to blog categories" ON public.blog_categories FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to blogs" ON public.blogs FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to blog tags" ON public.blog_tags FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to blog tag maps" ON public.blog_tag_map FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to seo pages" ON public.seo_pages FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to project reviews" ON public.project_reviews FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to certificates" ON public.certificates FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to cert verifications" ON public.certificate_verifications FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to contact messages" ON public.contact_messages FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to leads" ON public.leads FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to lead followups" ON public.lead_followups FOR ALL USING (public.is_staff());
CREATE POLICY "Staff full access to notifications" ON public.notifications FOR ALL USING (public.is_staff());

-- ====================================================================
-- 21. STORAGE BUCKET DEFINITIONS & STORAGE POLICIES
-- ====================================================================

-- Insert Storage Buckets into storage.buckets if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES
  ('project-images', 'project-images', TRUE, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']),
  ('blog-images', 'blog-images', TRUE, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('profile-images', 'profile-images', TRUE, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('project-demo-videos', 'project-demo-videos', TRUE, 104857600, ARRAY['video/mp4', 'video/webm', 'video/quicktime']),
  ('project-documents', 'project-documents', FALSE, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/x-zip-compressed']),
  ('student-documents', 'student-documents', FALSE, 52428800, ARRAY['application/pdf', 'application/zip', 'application/x-zip-compressed', 'text/plain']),
  ('certificates', 'certificates', FALSE, 10485760, ARRAY['application/pdf', 'image/png', 'image/jpeg'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit;

-- Storage RLS: Public Read for Public Buckets
CREATE POLICY "Public Read for Public Buckets" ON storage.objects
  FOR SELECT USING (
    bucket_id IN ('project-images', 'blog-images', 'profile-images', 'project-demo-videos')
  );

-- Storage RLS: Authenticated upload for avatars
CREATE POLICY "Users can upload own avatar" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Storage RLS: Private Project Documents Access (Staff or Enrolled Student)
CREATE POLICY "Authorized Document Access" ON storage.objects
  FOR SELECT USING (
    bucket_id IN ('project-documents', 'student-documents', 'certificates') AND (
      public.is_staff() OR 
      EXISTS (
        SELECT 1 FROM public.student_projects sp
        JOIN public.project_documents pd ON pd.student_project_id = sp.id
        WHERE sp.profile_id = auth.uid() AND pd.file_url LIKE '%' || name || '%'
      )
    )
  );

-- Storage RLS: Staff Full Access to all Buckets
CREATE POLICY "Staff storage full access" ON storage.objects
  FOR ALL USING (public.is_staff());
-- ====================================================================
-- MAION AI Digital Technology Solutions
-- College Student Projects Platform - Complete Production Seed Data
-- Degrees, Departments, Colleges, Categories, Technologies,
-- Project Packages, Sample Projects, Deliverables, FAQs, Blogs, Coupons
-- ====================================================================

-- 1. SEED DEGREES
INSERT INTO public.degrees (name, short_name, slug, is_active) VALUES
  ('Bachelor of Technology / Engineering', 'B.E. / B.Tech', 'b-tech-b-e', true),
  ('Master of Technology / Engineering', 'M.E. / M.Tech', 'm-tech-m-e', true),
  ('Bachelor of Computer Applications', 'BCA', 'bca', true),
  ('Master of Computer Applications', 'MCA', 'mca', true),
  ('Bachelor of Science (Computer Science / IT)', 'B.Sc CS/IT', 'b-sc-cs-it', true),
  ('Master of Science (Computer Science / Data Science)', 'M.Sc CS/DS', 'm-sc-cs-ds', true),
  ('Diploma in Computer & Electronics Engineering', 'Diploma', 'diploma-engineering', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, short_name = EXCLUDED.short_name;

-- 2. SEED DEPARTMENTS
INSERT INTO public.departments (name, short_name, slug, is_active) VALUES
  ('Computer Science and Engineering', 'CSE', 'cse', true),
  ('Information Technology', 'IT', 'it', true),
  ('Artificial Intelligence and Data Science', 'AI & DS', 'ai-ds', true),
  ('Artificial Intelligence and Machine Learning', 'AI & ML', 'ai-ml', true),
  ('Electronics and Communication Engineering', 'ECE', 'ece', true),
  ('Electrical and Electronics Engineering', 'EEE', 'eee', true),
  ('Cyber Security and Digital Forensics', 'Cyber Security', 'cyber-security', true),
  ('Master of Computer Applications Department', 'MCA Dept', 'mca-dept', true),
  ('Software Engineering & Systems', 'SE', 'software-engineering', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, short_name = EXCLUDED.short_name;

-- 3. SEED COLLEGES (Prominent Engineering Institutions)
INSERT INTO public.colleges (name, city, state, university, website, is_active) VALUES
  ('College of Engineering, Guindy (CEG Anna University)', 'Chennai', 'Tamil Nadu', 'Anna University', 'https://ceg.annauniv.edu', true),
  ('Indian Institute of Technology Madras (IIT Madras)', 'Chennai', 'Tamil Nadu', 'Autonomous / IIT', 'https://www.iitm.ac.in', true),
  ('PSG College of Technology', 'Coimbatore', 'Tamil Nadu', 'Anna University', 'https://www.psgtech.edu', true),
  ('Vellore Institute of Technology (VIT)', 'Vellore', 'Tamil Nadu', 'VIT Deemed University', 'https://vit.ac.in', true),
  ('SRM Institute of Science and Technology', 'Chennai', 'Tamil Nadu', 'SRM Deemed University', 'https://www.srmist.edu.in', true),
  ('SSN College of Engineering', 'Chennai', 'Tamil Nadu', 'Anna University', 'https://www.ssn.edu.in', true),
  ('Coimbatore Institute of Technology (CIT)', 'Coimbatore', 'Tamil Nadu', 'Anna University', 'https://www.cit.edu.in', true),
  ('Thiagarajar College of Engineering (TCE)', 'Madurai', 'Tamil Nadu', 'Anna University', 'https://www.tce.edu', true),
  ('National Institute of Technology Tiruchirappalli (NIT Trichy)', 'Tiruchirappalli', 'Tamil Nadu', 'NIT Autonomous', 'https://www.nitt.edu', true),
  ('RV College of Engineering (RVCE)', 'Bangalore', 'Karnataka', 'VTU Belagavi', 'https://www.rvce.edu.in', true),
  ('BMS College of Engineering', 'Bangalore', 'Karnataka', 'VTU Belagavi', 'https://www.bmsce.ac.in', true),
  ('College of Engineering Pune (COEP)', 'Pune', 'Maharashtra', 'COEP Tech University', 'https://www.coep.org.in', true),
  ('Delhi Technological University (DTU)', 'New Delhi', 'Delhi NCR', 'DTU State University', 'https://www.dtu.ac.in', true)
ON CONFLICT DO NOTHING;

-- 4. SEED PROJECT CATEGORIES
INSERT INTO public.project_categories (name, slug, description, icon, display_order, is_active, seo_title, seo_description) VALUES
  ('AI & Machine Learning Projects', 'ai-machine-learning', 'Deep learning, neural networks, predictive analytics, and computer vision projects for CSE and AI-DS students.', 'ðŸ§ ', 1, true, 'Top AI & Machine Learning Final Year Projects 2026 | MAION', 'Explore verified IEEE and custom AI/ML final year college projects with source code, documentation and dataset.'),
  ('Full-Stack Web & Mobile Apps', 'full-stack-web-mobile', 'Modern full-stack web applications, microservices, SaaS platforms, and native/cross-platform mobile apps.', 'ðŸ’»', 2, true, 'Full Stack Web & Mobile App College Projects | MAION', 'Production-ready full-stack projects built using React, Next.js, Node.js, Python FastAPI, Flutter and PostgreSQL.'),
  ('IoT & Embedded Systems', 'iot-embedded-systems', 'Hardware-software co-design with ESP32, Arduino, Raspberry Pi, sensor telemetry, and cloud dashboards.', 'âš¡', 3, true, 'IoT & Embedded Systems Projects for ECE, EEE & CSE | MAION', 'Smart agriculture, home automation, industrial telemetry and edge AI IoT college project solutions.'),
  ('Cybersecurity & Ethical Hacking', 'cybersecurity-ethical-hacking', 'Network security, zero-trust architectures, cryptography, intrusion detection, and digital forensics projects.', 'ðŸ›¡ï¸', 4, true, 'Cybersecurity & Ethical Hacking Projects | MAION', 'Defensive and offensive cybersecurity projects for college students with IEEE compliance and live demos.'),
  ('Cloud Computing & DevOps', 'cloud-computing-devops', 'Kubernetes microservices orchestration, serverless lambdas, CI/CD pipelines, and cloud migration frameworks.', 'â˜ï¸', 5, true, 'Cloud Computing & DevOps Final Year Projects | MAION', 'Enterprise cloud computing projects demonstrating multi-region scalability, Dockerization and monitoring.'),
  ('Blockchain & Web3 Decentralized Apps', 'blockchain-web3', 'Smart contracts on Ethereum/Polygon, decentralized identity (DID), verifiable credentials, and tokenized apps.', 'â›“ï¸', 6, true, 'Blockchain & Web3 DApp Projects for College Students | MAION', 'Solidity and Web3 smart contract final year projects with IPFS storage and metamask integration.'),
  ('Data Science & Big Data Analytics', 'data-science-analytics', 'Data pipelines, exploratory analytics, business intelligence dashboards, and big data streaming models.', 'ðŸ“Š', 7, true, 'Data Science & Big Data Analytics College Projects | MAION', 'End-to-end data analytics and business intelligence capstone projects with Tableau, PowerBI and Python.'),
  ('Computer Vision & Image Processing', 'computer-vision', 'YOLO object detection, facial recognition, autonomous vehicle perception, and medical scan segmentation.', 'ðŸ‘ï¸', 8, true, 'Computer Vision & Deep Learning Final Year Projects | MAION', 'Real-time computer vision projects utilizing PyTorch, OpenCV and TensorRT for high-FPS edge inference.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;

-- 5. SEED PROJECT TECHNOLOGIES
INSERT INTO public.project_technologies (name, slug, category, logo_url, is_active) VALUES
  ('Python', 'python', 'Programming Language', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', true),
  ('TensorFlow', 'tensorflow', 'AI/ML Framework', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', true),
  ('PyTorch', 'pytorch', 'Deep Learning', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', true),
  ('OpenCV', 'opencv', 'Computer Vision', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', true),
  ('Next.js', 'nextjs', 'Frontend Framework', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', true),
  ('React.js', 'react', 'Frontend UI', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', true),
  ('Node.js', 'nodejs', 'Backend Runtime', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', true),
  ('FastAPI', 'fastapi', 'Backend API', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', true),
  ('PostgreSQL', 'postgresql', 'Relational Database', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', true),
  ('Supabase', 'supabase', 'BaaS / Cloud DB', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg', true),
  ('MongoDB', 'mongodb', 'NoSQL Database', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', true),
  ('Docker', 'docker', 'DevOps & Containers', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', true),
  ('Kubernetes', 'kubernetes', 'Cloud Orchestration', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', true),
  ('ESP32 & Arduino', 'esp32-arduino', 'Embedded Hardware', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', true),
  ('Raspberry Pi', 'raspberry-pi', 'Single-Board Computer', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg', true),
  ('Solidity', 'solidity', 'Smart Contracts', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg', true),
  ('Flutter', 'flutter', 'Mobile App', 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, category = EXCLUDED.category;

-- 6. SEED PROJECT PACKAGES
INSERT INTO public.project_packages (name, slug, description, price, original_price, package_type, features, is_popular, is_active) VALUES
  ('Basic Source Code Package', 'basic-package', 'Essential working source code and setup documentation for students who handle documentation independently.', 2499.00, 3999.00, 'basic', 
   '["Complete Tested Source Code", "Database Schema & Seed SQL", "Step-by-Step Installation & Setup Guide", "Dependencies List & Environment Config", "7 Days Email & WhatsApp Support"]'::jsonb, 
   false, true),

  ('Standard Complete Project Package', 'standard-package', 'Everything needed for successful college review submission, demo execution, and faculty presentation.', 4999.00, 7999.00, 'standard', 
   '["Complete Tested Source Code & Datasets", "System Requirement Specification (SRS)", "UML Diagrams (Class, Use Case, Sequence, ERD)", "Comprehensive PPT Presentation Slides", "10-Minute Video Demo & Walkthrough", "Pre-recorded Viva Voce Question Bank", "30 Days WhatsApp & Technical Support"]'::jsonb, 
   true, true),

  ('Premium IEEE & Viva Mastery Package', 'premium-package', 'Top-tier package with ready-to-bind project report, IEEE paper manuscript, and live 1-on-1 viva coaching session.', 7999.00, 11999.00, 'premium', 
   '["Everything in Standard Package", "Full College-Formatted Project Report (70-90 Pages)", "IEEE Base Paper & Implementation Manuscript", "Plagiarism Checker Verification Report (<10%)", "1-on-1 Live Google Meet Project Explanation & Viva Coaching", "Direct Access to Dedicated Developer", "Unlimited Review Support until Final Defense"]'::jsonb, 
   false, true),

  ('Custom Project Development', 'custom-package', 'Tailored from scratch according to your specific college guide preferences, novel algorithm, or research topic.', 9999.00, 14999.00, 'custom', 
   '["Custom Architecture & Tailor-Made Code", "Proprietary Dataset Collection / Synthesis", "Weekly Milestone Review Demos", "Custom IEEE Research Paper Drafting", "Full Project Documentation & PPT", "Live Setup on Student Laptop via AnyDesk"]'::jsonb, 
   false, true)
ON CONFLICT (slug) DO UPDATE SET price = EXCLUDED.price, features = EXCLUDED.features;

-- 7. SEED COUPONS
INSERT INTO public.coupons (code, description, discount_type, discount_value, minimum_order_amount, maximum_discount, usage_limit, is_active) VALUES
  ('MAIONFIRST', 'Welcome discount for first-time college project orders', 'percentage', 20.00, 2000.00, 1500.00, 500, true),
  ('FINALYEAR500', 'Flat Rs. 500 discount on Major & Final-Year projects', 'fixed', 500.00, 4000.00, 500.00, 200, true),
  ('TEAMPROJECT', 'Special 15% team discount for 3+ team members', 'percentage', 15.00, 4500.00, 2000.00, 100, true)
ON CONFLICT (code) DO UPDATE SET discount_value = EXCLUDED.discount_value, is_active = EXCLUDED.is_active;

-- 8. SEED PROJECTS (10 Diverse Engineering Final Year & Major Projects)

-- Project 1: AI Healthcare
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'AI-Driven Multi-Organ Disease Diagnosis & Teleconsultation Platform',
  'ai-disease-diagnosis-teleconsultation',
  'Deep learning healthcare portal classifying chest X-rays, skin lesions, and retinal scans with automated doctor tele-referral.',
  'An end-to-end medical AI diagnostic assistant designed for primary healthcare centers and rural clinics. Incorporates DenseNet121, ResNet50, and MobileNetV3 ensembles for multi-organ image classification with explainable AI (Grad-CAM heatmaps).',
  'Early detection of life-threatening diseases remains a bottleneck in primary healthcare due to the shortage of specialized radiologists and dermatologists. This project proposes an ensemble Deep Convolutional Neural Network (CNN) framework capable of simultaneously diagnosing 14 chest conditions from X-rays, melanoma from dermoscopy, and diabetic retinopathy from fundus photographs with over 96.4% test accuracy. Explainable AI through Grad-CAM visually highlights symptomatic lesions for physician validation.',
  'Over 70% of rural Indian healthcare sub-centers lack on-site radiologists, resulting in delayed tuberculosis and pneumonia diagnoses by up to 3 weeks.',
  'We implement a lightweight transfer-learning CNN deployed as an asynchronous FastAPI microservice with Next.js frontend, generating automated PDF diagnostic summaries and patient triage scores.',
  'final_year', 'advanced', '3-4 Weeks', 4999.00, true, true, true,
  'AI Healthcare Disease Diagnosis Project | Final Year CSE IEEE 2026',
  'Download complete source code and IEEE report for AI multi-organ disease classification using PyTorch, Next.js and Grad-CAM.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Project 2: Autonomous Drone Precision Agriculture
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'Autonomous Drone-Based Precision Agriculture & Real-Time Crop Disease Mapping',
  'autonomous-drone-precision-agriculture',
  'Edge-AI computer vision drone mapping aerial NDVI health indexes and localized crop pest infestations.',
  'Combines aerial UAV video feeds, Raspberry Pi 4 edge compute, and a fine-tuned YOLOv8 model to survey large agricultural fields, calculate Normalized Difference Vegetation Index (NDVI), and geolocate pest attacks on an interactive map.',
  'Traditional field inspection requires manual, labor-intensive walking across hectares of crops, which frequently detects fungal attacks only after irreversible yield loss. This project introduces an autonomous low-cost drone system with high-resolution RGB/multispectral imaging. Utilizing custom YOLOv8 and color space transformation, the drone identifies leaf rust, blight, and aphid infestations at 30 FPS on an onboard edge accelerator, transmitting GPS coordinates to a central farmer dashboard.',
  'Farmers lose up to 35% of crop yields annually due to late detection of localized pest infestations and indiscriminate pesticide overuse.',
  'An edge-AI drone pipeline that performs real-time semantic segmentation of diseased foliage and generates GPS spot-spraying instructions.',
  'final_year', 'advanced', '4 Weeks', 5499.00, true, true, true,
  'Autonomous Drone Precision Agriculture Project | IoT & AI Final Year',
  'Complete IoT and Computer Vision final year project with Raspberry Pi, YOLOv8, and cloud farm management dashboard.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Project 3: Zero-Trust Cybersecurity
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'Zero-Trust Cloud Access Architecture with Behavioral Keystroke Biometrics',
  'zero-trust-cloud-access-behavioral-biometrics',
  'Next-generation identity access management enforcing continuous behavioral keystroke dynamics and AI anomaly scoring.',
  'Eliminates static passwords and session tokens in favor of continuous zero-trust authorization. Analyzes user keystroke dwell times, flight times, and IP risk scores in real-time using an Isolation Forest anomaly detector.',
  'Credential theft, session hijacking, and stolen OAuth tokens have rendered perimeter-based firewalls obsolete. This project implements a Zero-Trust Network Architecture (ZTNA) where identity is continuously evaluated. During user interaction, neural network keystroke dynamics extract micro-timing patterns. If unauthorized physical takeover occurs mid-session, access is instantly revoked and multi-factor challenge triggered.',
  '82% of enterprise data breaches involve compromised credentials or stolen session cookies that bypass static login verifications.',
  'A continuous zero-trust middleware that computes a dynamic risk score between 0 and 100 based on machine learning behavioral biometrics.',
  'final_year', 'advanced', '3 Weeks', 4999.00, false, true, true,
  'Zero Trust Security with Keystroke Biometrics | Cybersecurity Project',
  'Production cybersecurity final year project with Python FastAPI, Isolation Forest anomaly scoring, and Docker containers.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Project 4: Deepfake Video Detection
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'Real-Time Deepfake Video & Voice Clone Detection using Spatio-Temporal Vision Transformers',
  'deepfake-video-voice-detection-vit',
  'Detects AI-manipulated facial videos and voice clones using frequency domain FFT analysis and Vision Transformers.',
  'State-of-the-art forensic detection engine examining temporal flickering, unnatural blink dynamics, and high-frequency GAN artifacts across video streams and synthetic speech audio.',
  'The weaponization of hyper-realistic generative AI deepfakes presents profound risks for digital identity, elections, and financial fraud. We implement a dual-stream architecture: a Spatial Vision Transformer (ViT) inspecting spectral frequency inconsistencies in individual frames, coupled with an LSTM analyzing temporal continuity and micro-expressions across 60-frame windows.',
  'Modern diffusion and GAN models generate deepfakes indistinguishable to the human eye, facilitating high-stakes CEO voice scams and biometric spoofing.',
  'A hybrid spatio-temporal deep neural network providing confidence heatmaps and frame-by-frame tampering indices.',
  'final_year', 'advanced', '3-4 Weeks', 4999.00, true, true, true,
  'Deepfake Video & Voice Detection System | AI & Cyber Security IEEE Project',
  'IEEE 2026 Deepfake detection project with PyTorch Vision Transformers, FastAPI REST endpoints, and Next.js UI.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Project 5: Blockchain Credential Verification
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'Decentralized Academic Degree & Marksheet Verification Platform on Ethereum Blockchain',
  'blockchain-degree-verification-system',
  'Tamper-proof verifiable academic credential issuing with cryptographic QR code validation and IPFS storage.',
  'Enables universities to issue immutable cryptographically signed degree certificates directly to student blockchain wallets. Recruiters verify credentials in 1 second via QR scan without third-party courier or portal fees.',
  'Educational degree forgery is a multi-million-dollar illicit market worldwide. This platform leverages ERC-721 Soulbound Non-Fungible Tokens (SBTs) that cannot be transferred between wallets. Universities sign certificates using institutional private keys; certificate metadata and SHA-256 digests are pinned to decentralized IPFS storage.',
  'Manual degree verification takes 2 to 4 weeks and costs recruiters significant verification agency fees.',
  'An immutable smart contract protocol on Polygon/Ethereum ensuring instant, cryptographic, zero-cost certificate verification.',
  'major_project', 'intermediate', '2-3 Weeks', 4499.00, false, false, true,
  'Blockchain Degree Verification System | Web3 Final Year Project',
  'Complete Solidity, Hardhat, Ethers.js and React project for university degree verification.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Project 6: Smart City Traffic Congestion Optimization
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'Smart City Dynamic Traffic Signal Control Using Edge-AI & Vehicle Density Estimation',
  'smart-city-dynamic-traffic-signal-control',
  'Real-time CCTV vehicle queue detection and dynamic green-signal duration adjustment with emergency vehicle priority.',
  'Replaces rigid pre-programmed traffic timers with intelligent adaptive signaling. Uses YOLOv8 computer vision to count waiting vehicles per lane, dynamically adjusting green lights and clearing priority corridors for ambulances.',
  'Fixed-timer traffic lights cause severe congestion by keeping green lights on empty lanes while parallel lanes endure kilometer-long queues. This project deploys an edge computer connected to 4 junction cameras that computes real-time vehicle density every 10 seconds. In addition, an audio/RF receiver identifies approaching sirens to immediately clear an emergency corridor.',
  'Urban commuters lose an average of 120 hours annually stuck at red lights on vacant intersections, causing heavy fuel wastage and emissions.',
  'Real-time edge computer vision analyzing density and dynamically calculating optimal signal timings using queue theory.',
  'final_year', 'intermediate', '2-3 Weeks', 3999.00, false, true, true,
  'Smart City Dynamic Traffic Light Control | Computer Vision & IoT Project',
  'IoT and AI traffic optimization system with YOLOv8, OpenCV, and simulated smart junction controller.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Project 7: LLM Resume Screening & Candidate Matcher
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'Automated Resume Screening & Skill Gap Analysis Platform with Semantic Embeddings',
  'automated-resume-screening-skill-gap-analysis',
  'RAG-powered candidate resume parser matching job descriptions using vector embeddings and personalized upskilling roadmaps.',
  'Parses multi-format resumes (PDF, DOCX) using vector embeddings and Retrieval-Augmented Generation (RAG). Evaluates true contextual match beyond simplistic keywords and generates personalized skill-gap learning roadmaps for students.',
  'Traditional Applicant Tracking Systems (ATS) rely on brittle keyword string matches, rejecting qualified applicants due to phrasing differences. This system parses resumes into vector embeddings using sentence-transformers, scoring semantic capability against job descriptions. Furthermore, candidates receive detailed gap analysis with curated tutorial links to achieve full role alignment.',
  'HR teams spend over 40 hours per role manually parsing thousands of mismatched resumes while qualified candidates are filtered out by primitive keyword search.',
  'Vector similarity matching combined with an LLM explainer that highlights matching strengths and missing competencies.',
  'major_project', 'intermediate', '2 Weeks', 3499.00, false, false, true,
  'AI Resume Screening & Skill Gap Analysis | Full Stack & NLP Project',
  'FastAPI, LangChain, Next.js and ChromaDB vector search project for intelligent recruitment.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Project 8: Cloud-Native Microservices E-Commerce
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'Cloud-Native Microservices E-Commerce Architecture with Event-Driven Sagas & Kafka',
  'cloud-native-microservices-ecommerce-kafka',
  'Resilient distributed online marketplace demonstrating Kubernetes autoscaling, CQRS pattern, and Saga transaction coordinator.',
  'Built with clean hexagonal architecture across 5 decoupled services (User, Catalog, Cart, Order, Payment) communicating via Apache Kafka event streams with distributed tracing and Prometheus/Grafana observability.',
  'Monolithic web systems struggle to survive flash-sale traffic spikes and lack modular fault isolation. This project demonstrates enterprise microservices architecture: Orders and Inventory synchronize via Kafka choreography with compensation transactions on payment failure. Packaged with Docker Helm charts for seamless local Minikube or cloud Kubernetes deployment.',
  'Single service failure in a monolithic architecture brings down the entire checkout flow and causes data inconsistencies.',
  'Event-driven asynchronous messaging with idempotent order state machines and distributed OpenTelemetry tracing.',
  'final_year', 'advanced', '3-4 Weeks', 4499.00, false, false, true,
  'Cloud Native Microservices Project with Kubernetes & Kafka | CSE Major',
  'Full stack distributed microservices project with Node.js, Spring/Go, Docker, Kafka and Kubernetes.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Project 9: Industrial IoT Predictive Maintenance
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'Industrial IoT Predictive Maintenance & Bearing Anomaly Detection Using Edge Vibration Analysis',
  'industrial-iot-predictive-maintenance-vibration',
  'ESP32 telemetry monitoring motor vibration FFT frequencies and temperature to forecast mechanical failure 48h in advance.',
  'An Industry 4.0 predictive maintenance hardware prototype. Captures 3-axis accelerometer and thermal data, performs Fast Fourier Transform (FFT) on the microcontroller, and runs a lightweight random forest classifier to alert engineers before motor seizure.',
  'Unplanned motor downtime in textile mills and manufacturing units causes catastrophic financial loss. This system mounts a tri-axial MPU6050 and infrared sensor to rotating shafts. The ESP32 extracts peak frequencies and crest factors, sending telemetry over MQTT to a live cloud dashboard that predicts Remaining Useful Life (RUL).',
  'Reactive machine repairs result in 3x higher repair expenses and unexpected production stops.',
  'Real-time edge feature extraction calculating RMS and kurtosis to predict mechanical anomalies before bearing breakdown.',
  'final_year', 'intermediate', '2-3 Weeks', 3999.00, false, false, true,
  'Industrial IoT Predictive Maintenance System | EEE & ECE Final Year',
  'Hardware and cloud IoT project with ESP32, MQTT, Python dashboard, and vibration analysis algorithms.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- Project 10: Brain Tumor MRI Segmentation
INSERT INTO public.projects (
  title, slug, short_description, description, abstract, problem_statement, proposed_solution,
  project_type, difficulty, duration, starting_price, featured, trending, is_active,
  seo_title, seo_description
) VALUES (
  'Brain Tumor Segmentation & Volumetric Quantification from MRI Scans using Attention U-Net',
  'brain-tumor-mri-segmentation-attention-unet',
  'Semantic deep learning pixel segmentation outlining glioma core, edema, and enhancing tumor zones with 3D volumetric reporting.',
  'Medical imaging project trained on the BraTS multi-modal MRI benchmark. Incorporates Attention Gates into a U-Net backbone to accurately segment complex tumor boundaries and calculate tumor volume in cubic centimeters.',
  'Manual demarcation of heterogeneous brain tumors from multi-sequence MRI scans is painstaking and prone to inter-observer variance. We construct an Attention U-Net that highlights salient feature maps while suppressing irrelevant tissue backgrounds. Achieves a 0.912 Dice Similarity Coefficient on whole tumor segmentation, outputting interactive 3D visualizations.',
  'Manual volumetric measurement of brain tumors takes radiologists 45+ minutes per patient scan.',
  'Automated pixel-level segmentation generating precise volumetric measurements for surgical planning.',
  'final_year', 'advanced', '3-4 Weeks', 4999.00, true, true, true,
  'Brain Tumor MRI Segmentation using Attention U-Net | Medical AI Project',
  'IEEE Medical Deep Learning final year project with PyTorch Attention U-Net and 3D volume viewer.'
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- 9. MAP PROJECTS TO CATEGORIES
INSERT INTO public.project_category_map (project_id, category_id, primary_category)
SELECT p.id, c.id, true
FROM public.projects p, public.project_categories c
WHERE (p.slug = 'ai-disease-diagnosis-teleconsultation' AND c.slug = 'ai-machine-learning')
   OR (p.slug = 'autonomous-drone-precision-agriculture' AND c.slug = 'iot-embedded-systems')
   OR (p.slug = 'zero-trust-cloud-access-behavioral-biometrics' AND c.slug = 'cybersecurity-ethical-hacking')
   OR (p.slug = 'deepfake-video-voice-detection-vit' AND c.slug = 'ai-machine-learning')
   OR (p.slug = 'blockchain-degree-verification-system' AND c.slug = 'blockchain-web3')
   OR (p.slug = 'smart-city-dynamic-traffic-signal-control' AND c.slug = 'computer-vision')
   OR (p.slug = 'automated-resume-screening-skill-gap-analysis' AND c.slug = 'full-stack-web-mobile')
   OR (p.slug = 'cloud-native-microservices-ecommerce-kafka' AND c.slug = 'cloud-computing-devops')
   OR (p.slug = 'industrial-iot-predictive-maintenance-vibration' AND c.slug = 'iot-embedded-systems')
   OR (p.slug = 'brain-tumor-mri-segmentation-attention-unet' AND c.slug = 'ai-machine-learning')
ON CONFLICT DO NOTHING;

-- 10. MAP PROJECTS TO TECHNOLOGIES
INSERT INTO public.project_technology_map (project_id, technology_id, is_primary)
SELECT p.id, t.id, true
FROM public.projects p, public.project_technologies t
WHERE (p.slug = 'ai-disease-diagnosis-teleconsultation' AND t.slug IN ('python', 'pytorch', 'nextjs', 'fastapi'))
   OR (p.slug = 'autonomous-drone-precision-agriculture' AND t.slug IN ('python', 'opencv', 'raspberry-pi'))
   OR (p.slug = 'zero-trust-cloud-access-behavioral-biometrics' AND t.slug IN ('python', 'fastapi', 'docker', 'postgresql'))
   OR (p.slug = 'deepfake-video-voice-detection-vit' AND t.slug IN ('python', 'pytorch', 'opencv', 'nextjs'))
   OR (p.slug = 'blockchain-degree-verification-system' AND t.slug IN ('solidity', 'react', 'nodejs'))
   OR (p.slug = 'smart-city-dynamic-traffic-signal-control' AND t.slug IN ('python', 'opencv', 'esp32-arduino'))
   OR (p.slug = 'automated-resume-screening-skill-gap-analysis' AND t.slug IN ('python', 'fastapi', 'nextjs', 'postgresql'))
   OR (p.slug = 'cloud-native-microservices-ecommerce-kafka' AND t.slug IN ('nodejs', 'docker', 'kubernetes', 'postgresql'))
   OR (p.slug = 'industrial-iot-predictive-maintenance-vibration' AND t.slug IN ('esp32-arduino', 'python'))
   OR (p.slug = 'brain-tumor-mri-segmentation-attention-unet' AND t.slug IN ('python', 'pytorch', 'fastapi'))
ON CONFLICT DO NOTHING;

-- 11. SEED PROJECT FEATURES
INSERT INTO public.project_features (project_id, title, description, icon, display_order)
SELECT p.id, 'Explainable Grad-CAM Heatmaps', 'Visualizes exact lesion pixels that triggered the diagnostic decision for complete doctor transparency.', 'ðŸ”', 1
FROM public.projects p WHERE p.slug = 'ai-disease-diagnosis-teleconsultation'
UNION ALL
SELECT p.id, 'Automated Medical PDF Generator', 'Generates professional multi-page clinical reports with confidence bars and doctor signature block.', 'ðŸ“„', 2
FROM public.projects p WHERE p.slug = 'ai-disease-diagnosis-teleconsultation'
UNION ALL
SELECT p.id, 'Real-Time Edge Inference (30 FPS)', 'Runs quantized YOLOv8 neural network locally on drone Raspberry Pi without cloud latency.', 'âš¡', 1
FROM public.projects p WHERE p.slug = 'autonomous-drone-precision-agriculture'
UNION ALL
SELECT p.id, 'Continuous Keystroke Anomaly Scoring', 'Calculates flight and dwell time deviation on every keystroke to detect unauthorized terminal takeovers.', 'âŒ¨ï¸', 1
FROM public.projects p WHERE p.slug = 'zero-trust-cloud-access-behavioral-biometrics'
UNION ALL
SELECT p.id, 'Soulbound Non-Transferable Tokens', 'Guarantees certificates remain permanently attached to the student wallet and cannot be resold.', 'ðŸ”’', 1
FROM public.projects p WHERE p.slug = 'blockchain-degree-verification-system';

-- 12. SEED PROJECT DELIVERABLES
INSERT INTO public.project_deliverables (project_id, title, description, is_included)
SELECT p.id, 'Complete Verified Source Code', 'Production-ready code with modular structure and inline comments.', true FROM public.projects p
UNION ALL
SELECT p.id, 'Trained Model Weights & Datasets', 'Pre-trained checkpoint weights (.pt, .h5, .onnx) ready for inference.', true FROM public.projects p
UNION ALL
SELECT p.id, 'College-Ready Project Report (70+ Pages)', 'Formatted as per Anna University, VTU, and AICTE standard thesis guidelines.', true FROM public.projects p
UNION ALL
SELECT p.id, 'Executive Presentation Slides (PPT)', 'Structured 25-slide animated PowerPoint presentation for project defense.', true FROM public.projects p
UNION ALL
SELECT p.id, '10-Minute Video Demonstration', 'HD video recording showing installation, execution, and outputs.', true FROM public.projects p
UNION ALL
SELECT p.id, 'Viva Voce Question & Answer Bank', 'Curated list of 50 technical defense questions with model answers.', true FROM public.projects p;

-- 13. SEED PROJECT FAQS
INSERT INTO public.project_faqs (project_id, question, answer, display_order, is_active)
SELECT p.id, 'Can this project be executed on a regular student laptop?', 'Yes! We provide step-by-step setup guides, pre-configured Anaconda environment files, and lightweight model checkpoints so it runs smoothly on any modern laptop with 8GB RAM.', 1, true FROM public.projects p
UNION ALL
SELECT p.id, 'Will the project code pass college review defense?', 'Absolutely. All our projects include complete working source code, detailed UML architecture diagrams, SRS documents, and viva voce preparation notes so you can confidently answer your internal and external examiners.', 2, true FROM public.projects p
UNION ALL
SELECT p.id, 'Can custom modifications be made according to my college guide?', 'Yes! Our senior technical team can customize datasets, modify UI designs, integrate alternate algorithms, or adjust parameters to match your guide''s exact suggestions.', 3, true FROM public.projects p;

-- 14. SEED BLOG CATEGORIES & SAMPLE BLOGS
INSERT INTO public.blog_categories (name, slug, description, is_active) VALUES
  ('Final Year Project Guidance', 'project-guidance', 'Guides, checklists and advice for engineering project selection and viva defense.', true),
  ('IEEE Research Papers 2026', 'ieee-research-papers', 'Breakdowns of the latest IEEE transaction papers in AI, IoT and Cybersecurity.', true),
  ('Viva Voce Preparation', 'viva-preparation', 'Frequently asked college review viva questions, tips, and presentation strategies.', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

INSERT INTO public.blogs (
  title, slug, excerpt, content, status, published_at, seo_title, seo_description, reading_time, view_count
) VALUES (
  'How to Choose the Best Final Year Project in 2026: The Complete Engineering Guide',
  'how-to-choose-best-final-year-project-2026',
  'A strategic roadmap for CSE, IT and ECE students on selecting high-scoring, resume-boosting final year projects.',
  'Selecting the right final year engineering project is one of the most critical decisions of your college career. A great project not only scores top marks in your university defense, but also becomes the centerpiece of your technical interviews. In this comprehensive guide, we cover: 1. Evaluating IEEE conference relevance, 2. Balancing feasibility with technical novelty, 3. Hardware vs Software considerations for ECE/EEE students, 4. How to convince your project guide with a compelling synopsis and architecture diagram.',
  'published', NOW(),
  'How to Choose the Best Final Year Project in 2026 | MAION Guide',
  'Step-by-step guide for college engineering students on selecting high-scoring final year project topics in AI, Full Stack, IoT and Cloud.',
  6, 1420
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title;

-- 15. SEED SAMPLE REVIEWS
INSERT INTO public.project_reviews (
  profile_id, project_id, rating, review_title, review_content, is_verified, is_approved
)
SELECT 
  gen_random_uuid(), p.id, 5, 
  'Outstanding project code & report! Scored 98/100 in our viva',
  'The code executed on our college lab computer on the very first run. The report format matched our Anna University syllabus guidelines perfectly and the faculty appreciated the Grad-CAM visualization.',
  true, true
FROM public.projects p WHERE p.slug = 'ai-disease-diagnosis-teleconsultation'
UNION ALL
SELECT 
  gen_random_uuid(), p.id, 5, 
  'Very professional hardware and edge AI demo',
  'The YOLOv8 drone video pipeline worked flawlessly during our external review. The viva question bank covered 90% of the questions asked by the university examiner. Highly recommended!',
  true, true
FROM public.projects p WHERE p.slug = 'autonomous-drone-precision-agriculture';
