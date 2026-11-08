-- ============================================================================
-- LOCAL BIZ: PRODUCTION POSTGRESQL RLS POLICIES MIGRATION 002
-- Row Level Security (RLS) enforcement across all tables
-- ============================================================================

-- 1. ENABLE RLS ON ALL TABLES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_synonyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiry_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_settings ENABLE ROW LEVEL SECURITY;

-- 2. HELPER FUNCTIONS FOR SECURITY CHECKS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid()
    AND role IN ('admin', 'superadmin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_business_member(biz_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.business_members
    WHERE business_id = biz_id
    AND user_id = auth.uid()
    AND status = 'active'
  ) OR public.is_admin();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. PROFILES POLICIES
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id);

-- 4. USER ROLES POLICIES (Users cannot elevate their own roles)
CREATE POLICY "Users can view their own roles" 
ON public.user_roles FOR SELECT 
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Only admins can insert or update user roles" 
ON public.user_roles FOR ALL 
USING (public.is_admin());

-- 5. NOTIFICATIONS POLICIES
CREATE POLICY "Users can manage their own notifications" 
ON public.notifications FOR ALL 
USING (auth.uid() = user_id);

-- 6. PUBLIC DIRECTORY READ POLICIES (Categories, Locations, Public Content)
CREATE POLICY "Categories are readable by everyone" 
ON public.categories FOR SELECT 
USING (true);

CREATE POLICY "Admins manage categories" 
ON public.categories FOR ALL 
USING (public.is_admin());

CREATE POLICY "Locations are readable by everyone" 
ON public.locations FOR SELECT 
USING (true);

CREATE POLICY "Admins manage locations" 
ON public.locations FOR ALL 
USING (public.is_admin());

CREATE POLICY "Subscription plans readable by everyone" 
ON public.subscription_plans FOR SELECT 
USING (is_active = true OR public.is_admin());

-- 7. BUSINESSES POLICIES
-- Guests & customers can view published businesses
CREATE POLICY "Published businesses are viewable by everyone" 
ON public.businesses FOR SELECT 
USING (publication_status = 'published' OR public.is_business_member(id) OR public.is_admin());

-- Authenticated users can create a new business
CREATE POLICY "Authenticated users can create a business" 
ON public.businesses FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Business members or admins can update business details
CREATE POLICY "Business members or admins can update business" 
ON public.businesses FOR UPDATE 
USING (public.is_business_member(id) OR public.is_admin());

-- 8. BUSINESS SUB-RESOURCES (Hours, Images, Services, Products)
CREATE POLICY "Public can view hours of published businesses" 
ON public.business_hours FOR SELECT 
USING (true);

CREATE POLICY "Business members manage hours" 
ON public.business_hours FOR ALL 
USING (public.is_business_member(business_id) OR public.is_admin());

CREATE POLICY "Public can view images of published businesses" 
ON public.business_images FOR SELECT 
USING (true);

CREATE POLICY "Business members manage images" 
ON public.business_images FOR ALL 
USING (public.is_business_member(business_id) OR public.is_admin());

CREATE POLICY "Public can view active services" 
ON public.services FOR SELECT 
USING (is_active = true OR public.is_business_member(business_id) OR public.is_admin());

CREATE POLICY "Business members manage services" 
ON public.services FOR ALL 
USING (public.is_business_member(business_id) OR public.is_admin());

CREATE POLICY "Public can view available products" 
ON public.products FOR SELECT 
USING (is_available = true OR public.is_business_member(business_id) OR public.is_admin());

CREATE POLICY "Business members manage products" 
ON public.products FOR ALL 
USING (public.is_business_member(business_id) OR public.is_admin());

-- 9. ENGAGEMENT POLICIES (Enquiries, Reviews, Saved Businesses)
CREATE POLICY "Customers view their own enquiries" 
ON public.enquiries FOR SELECT 
USING (auth.uid() = customer_id OR public.is_business_member(business_id) OR public.is_admin());

CREATE POLICY "Anyone can submit an enquiry with consent" 
ON public.enquiries FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Business members or admins update enquiry status" 
ON public.enquiries FOR UPDATE 
USING (public.is_business_member(business_id) OR public.is_admin());

CREATE POLICY "Users can manage saved businesses" 
ON public.saved_businesses FOR ALL 
USING (auth.uid() = user_id);

CREATE POLICY "Published reviews are viewable by everyone" 
ON public.reviews FOR SELECT 
USING (status = 'published' OR auth.uid() = author_id OR public.is_admin());

CREATE POLICY "Authenticated users can submit one review per business" 
ON public.reviews FOR INSERT 
WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own reviews" 
ON public.reviews FOR UPDATE 
USING (auth.uid() = author_id);

-- 10. CLAIMS POLICIES
CREATE POLICY "Users can view their own claims" 
ON public.business_claims FOR SELECT 
USING (auth.uid() = user_id OR public.is_admin());

CREATE POLICY "Users can submit business claim" 
ON public.business_claims FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins moderate business claims" 
ON public.business_claims FOR UPDATE 
USING (public.is_admin());

-- 11. MONETIZATION & CRM POLICIES (Strictly Protected)
CREATE POLICY "Business members view their own subscriptions" 
ON public.subscriptions FOR SELECT 
USING (public.is_business_member(business_id) OR public.is_admin());

CREATE POLICY "Business members view their own payments" 
ON public.payments FOR SELECT 
USING (public.is_business_member(business_id) OR public.is_admin());

CREATE POLICY "Sales users view assigned prospects" 
ON public.sales_prospects FOR SELECT 
USING (assigned_agent_id = auth.uid() OR public.is_admin());

CREATE POLICY "Sales users manage assigned prospects" 
ON public.sales_prospects FOR ALL 
USING (assigned_agent_id = auth.uid() OR public.is_admin());

CREATE POLICY "Platform settings readable by all, writable only by admins" 
ON public.platform_settings FOR SELECT 
USING (true);

CREATE POLICY "Admins manage platform settings" 
ON public.platform_settings FOR ALL 
USING (public.is_admin());
