-- ============================================================================
-- LOCAL BIZ: PRODUCTION SEED DATA MIGRATION 003
-- Locations, 60+ English/Tamil Categories, Subscription Plans, Platform Settings
-- ============================================================================

-- 1. LOCATIONS: India -> Tamil Nadu -> Chennai -> Localities
INSERT INTO public.locations (id, name, name_ta, slug, type, parent_id, pincode)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', 'India', 'இந்தியா', 'india', 'country', NULL, NULL),
  ('a0000000-0000-0000-0000-000000000002', 'Tamil Nadu', 'தமிழ்நாடு', 'tamil-nadu', 'state', 'a0000000-0000-0000-0000-000000000001', NULL),
  ('a0000000-0000-0000-0000-000000000003', 'Chennai', 'சென்னை', 'chennai', 'city', 'a0000000-0000-0000-0000-000000000002', '600001')
ON CONFLICT (slug, type) DO NOTHING;

-- Key Chennai Localities & PIN Codes
INSERT INTO public.locations (name, name_ta, slug, type, parent_id, pincode)
VALUES
  ('T. Nagar', 'தி. நகர்', 't-nagar', 'locality', 'a0000000-0000-0000-0000-000000000003', '600017'),
  ('Adyar', 'அடையாறு', 'adyar', 'locality', 'a0000000-0000-0000-0000-000000000003', '600020'),
  ('Velachery', 'வேளச்சேரி', 'velachery', 'locality', 'a0000000-0000-0000-0000-000000000003', '600042'),
  ('Anna Nagar', 'அண்ணா நகர்', 'anna-nagar', 'locality', 'a0000000-0000-0000-0000-000000000003', '600040'),
  ('Mylapore', 'மயிலாப்பூர்', 'mylapore', 'locality', 'a0000000-0000-0000-0000-000000000003', '600004'),
  ('Guindy', 'கிண்டி', 'guindy', 'locality', 'a0000000-0000-0000-0000-000000000003', '600032'),
  ('Nungambakkam', 'நுங்கம்பாக்கம்', 'nungambakkam', 'locality', 'a0000000-0000-0000-0000-000000000003', '600034'),
  ('Tambaram', 'தாம்பரம்', 'tambaram', 'locality', 'a0000000-0000-0000-0000-000000000003', '600045'),
  ('Porur', 'போரூர்', 'porur', 'locality', 'a0000000-0000-0000-0000-000000000003', '600116'),
  ('Vadapalani', 'வடபழனி', 'vadapalani', 'locality', 'a0000000-0000-0000-0000-000000000003', '600026'),
  ('Sholinganallur', 'சோழிங்கநல்லூர்', 'sholinganallur', 'locality', 'a0000000-0000-0000-0000-000000000003', '600119'),
  ('OMR (Old Mahabalipuram Rd)', 'ஓஎம்ஆர்', 'omr', 'locality', 'a0000000-0000-0000-0000-000000000003', '600096'),
  ('Perambur', 'பெரம்பூர்', 'perambur', 'locality', 'a0000000-0000-0000-0000-000000000003', '600011'),
  ('Chromepet', 'குரோம்பேட்டை', 'chromepet', 'locality', 'a0000000-0000-0000-0000-000000000003', '600044'),
  ('Alwarpet', 'ஆழ்வார்பேட்டை', 'alwarpet', 'locality', 'a0000000-0000-0000-0000-000000000003', '600018'),
  ('Thiruvanmiyur', 'திருவான்மியூர்', 'thiruvanmiyur', 'locality', 'a0000000-0000-0000-0000-000000000003', '600041')
ON CONFLICT (slug, type) DO NOTHING;

-- 2. SUBSCRIPTION PLANS (stored in integer paise: ₹999 = 99900 paise)
INSERT INTO public.subscription_plans (name, slug, price_paise, billing_interval, features, limits, sort_order)
VALUES 
  (
    'Free',
    'free',
    0,
    'month',
    '["Basic public listing", "Up to 3 photo uploads", "Single category listing", "Direct contact & call button", "Basic views counter"]'::jsonb,
    '{"photos": 3, "categories": 1, "products": 0, "services": 3, "featured_placement": false, "analytics_level": "basic"}'::jsonb,
    1
  ),
  (
    'Basic',
    'basic',
    99900,
    'month',
    '["Verified business badge", "Up to 10 photo uploads", "Up to 3 categories", "Customer enquiry dashboard", "SMS & email lead alerts", "30-day view analytics"]'::jsonb,
    '{"photos": 10, "categories": 3, "products": 5, "services": 10, "featured_placement": false, "analytics_level": "basic"}'::jsonb,
    2
  ),
  (
    'Growth',
    'growth',
    199900,
    'month',
    '["Everything in Basic", "Priority local search placement", "Up to 25 products & services catalogue", "Instant WhatsApp lead routing", "Eligible featured carousel showcase", "90-day comprehensive analytics"]'::jsonb,
    '{"photos": 25, "categories": 6, "products": 25, "services": 25, "featured_placement": true, "analytics_level": "advanced"}'::jsonb,
    3
  ),
  (
    'Professional',
    'professional',
    299900,
    'month',
    '["Top-ranked sponsor placement in locality", "Unlimited photo & catalogue showcase", "Dedicated local account manager", "Advanced competitor & keyword insights", "Full API lead export & CRM integration", "Guaranteed priority support"]'::jsonb,
    '{"photos": 100, "categories": 12, "products": 100, "services": 100, "featured_placement": true, "analytics_level": "enterprise"}'::jsonb,
    4
  )
ON CONFLICT (slug) DO UPDATE SET
  price_paise = EXCLUDED.price_paise,
  features = EXCLUDED.features,
  limits = EXCLUDED.limits;

-- 3. 60+ CORE CATEGORIES WITH ENGLISH & TAMIL NAMES
INSERT INTO public.categories (name, name_en, name_ta, slug, icon, sort_order, description)
VALUES
  -- Home & Living
  ('Electricians', 'Electricians', 'மின்சார பணியாளர்கள்', 'electricians', 'Zap', 10, 'Wiring, lighting repair, MCB installation and emergency electrical fixes.'),
  ('Plumbers', 'Plumbers', 'குழாய் பழுதுபார்ப்பவர்கள்', 'plumbers', 'Wrench', 11, 'Water pipe fixing, drain cleaning, tap fitting and bathroom plumbing.'),
  ('Carpenters', 'Carpenters', 'தச்சர்கள்', 'carpenters', 'Hammer', 12, 'Custom furniture, door repairs, modular kitchen woodwork.'),
  ('AC Repair & Service', 'AC Repair & Service', 'ஏசி பழுதுபார்த்தல்', 'ac-repair-service', 'Wind', 13, 'Split & window AC installation, gas filling, and deep cleaning.'),
  ('Painters', 'Painters', 'வண்ணப்பூசுபவர்கள்', 'painters', 'Paintbrush', 14, 'Interior and exterior home and commercial painting.'),
  ('Pest Control', 'Pest Control', 'பூச்சி கட்டுப்பாடு', 'pest-control', 'ShieldAlert', 15, 'Termite, cockroach, rodent and mosquito treatment.'),
  ('Home Cleaning', 'Home Cleaning', 'வீடு சுத்தம் செய்தல்', 'home-cleaning', 'Sparkles', 16, 'Deep house cleaning, sofa washing and sanitization.'),
  ('Packers & Movers', 'Packers & Movers', 'பேக்கர்ஸ் மற்றும் மூவர்ஸ்', 'packers-movers', 'Truck', 17, 'Local and intercity household and office shifting.'),
  ('Interior Designers', 'Interior Designers', 'உட்புற வடிவமைப்பாளர்கள்', 'interior-designers', 'LayoutGrid', 18, 'Residential and commercial turnkey interior architecture.'),
  ('CCTV & Security', 'CCTV & Security', 'சிசிடிவி கேமரா', 'cctv-security', 'Camera', 19, 'Surveillance camera setup, biometric locks and alarm systems.'),

  -- Healthcare & Wellness
  ('General Physicians', 'General Physicians', 'பொது மருத்துவர்கள்', 'general-physicians', 'Stethoscope', 20, 'Consultation for common illnesses and chronic care.'),
  ('Dental Clinics', 'Dental Clinics', 'பல் மருத்துவமனைகள்', 'dental-clinics', 'Smile', 21, 'Teeth cleaning, root canal, braces and cosmetic dentistry.'),
  ('Diagnostic Labs', 'Diagnostic Labs', 'பரிசோதனை கூடங்கள்', 'diagnostic-labs', 'Activity', 22, 'Blood tests, X-rays, MRI scans and full health checkups.'),
  ('Pharmacies', 'Pharmacies', 'மருந்தகங்கள்', 'pharmacies', 'Pill', 23, 'Prescription medicines, surgical supplies and wellness goods.'),
  ('Physiotherapists', 'Physiotherapists', 'உடற்பயிற்சி சிகிச்சை', 'physiotherapists', 'HeartPulse', 24, 'Rehabilitation, muscle therapy and sports injury treatment.'),
  ('Eye Care Clinics', 'Eye Care Clinics', 'கண் மருத்துவமனைகள்', 'eye-care-clinics', 'Eye', 25, 'Vision testing, cataract evaluation and prescription glasses.'),
  ('Ayurveda & Siddha', 'Ayurveda & Siddha', 'ஆயுர்வேதம் மற்றும் சித்தா', 'ayurveda-siddha', 'Leaf', 26, 'Traditional Tamil herbal remedies and holistic health.'),
  ('Gyms & Fitness', 'Gyms & Fitness', 'உடற்பயிற்சி நிலையங்கள்', 'gyms-fitness', 'Dumbbell', 27, 'Weight training, cardio, personal coaches and CrossFit.'),
  ('Yoga Centers', 'Yoga Centers', 'யோகா மையங்கள்', 'yoga-centers', 'Sun', 28, 'Pranayama, hatha yoga, meditation and stress reduction.'),
  ('Veterinary Clinics', 'Veterinary Clinics', 'கால்நடை மருத்துவர்கள்', 'veterinary-clinics', 'Dog', 29, 'Pet care, vaccinations and animal healthcare.'),

  -- Education & Training
  ('Schools', 'Schools', 'பள்ளிகள்', 'schools', 'GraduationCap', 30, 'State board, CBSE, ICSE and international schools.'),
  ('Colleges & Universities', 'Colleges & Universities', 'கல்லூரிகள்', 'colleges-universities', 'Building', 31, 'Engineering, arts, science, and medical institutions.'),
  ('Tuition Centers', 'Tuition Centers', 'டியூஷன் மையங்கள்', 'tuition-centers', 'BookOpen', 32, 'School tutoring for all subjects and competitive board exams.'),
  ('IT & Coding Institutes', 'IT & Coding Institutes', 'ஐடி பயிற்சி நிலையங்கள்', 'it-coding-institutes', 'Code', 33, 'Python, Full-Stack, Cloud Computing, and AI training.'),
  ('Spoken English & Languages', 'Spoken English & Languages', 'ஆங்கில பயிற்சி', 'spoken-english-languages', 'Languages', 34, 'Communication skills, IELTS, TOEFL and foreign languages.'),
  ('Music & Dance Schools', 'Music & Dance Schools', 'இசை மற்றும் நடனம்', 'music-dance-schools', 'Music', 35, 'Carnatic vocal, Bharatanatyam, guitar and western dance.'),
  ('Driving Schools', 'Driving Schools', 'டிரைவிங் பள்ளிகள்', 'driving-schools', 'Car', 36, 'Four-wheeler and two-wheeler motor driving training.'),

  -- Food & Dining
  ('Restaurants', 'Restaurants', 'உணவகங்கள்', 'restaurants', 'Utensils', 40, 'South Indian, Chettinad, North Indian and Multi-cuisine dining.'),
  ('Cafes & Bakeries', 'Cafes & Bakeries', 'பேக்கரிகள்', 'cafes-bakeries', 'Coffee', 41, 'Coffee shops, artisanal breads, cakes and pastries.'),
  ('Catering Services', 'Catering Services', 'கேட்டரிங் சேவைகள்', 'catering-services', 'Users', 42, 'Wedding feasts, corporate lunches and party catering.'),
  ('Sweet Stalls & Snacks', 'Sweet Stalls & Snacks', 'இனிப்பு கடைகள்', 'sweet-stalls-snacks', 'Cake', 43, 'Traditional Tamil sweets, savouries and snacks.'),
  ('Organic Grocery Stores', 'Organic Grocery Stores', 'இயற்கை அங்காடிகள்', 'organic-grocery-stores', 'ShoppingBag', 44, 'Natural grains, cold-pressed oils and organic produce.'),

  -- Automotive
  ('Car Repair & Service', 'Car Repair & Service', 'கார் பழுதுபார்ப்பு', 'car-repair-service', 'CarFront', 50, 'Periodic car maintenance, wheel alignment and engine repairs.'),
  ('Two-Wheeler Service', 'Two-Wheeler Service', 'இருசக்கர வாகனம் பழுது', 'two-wheeler-service', 'Bike', 51, 'Bike servicing, water wash, oil change and tyre puncture.'),
  ('Car Wash & Detailing', 'Car Wash & Detailing', 'கார் வாஷ் மற்றும் மெருகூட்டல்', 'car-wash-detailing', 'Droplets', 52, 'Foam wash, ceramic coating and interior deep cleaning.'),
  ('Tyre & Battery Shops', 'Tyre & Battery Shops', 'டயர் மற்றும் பேட்டரி', 'tyre-battery-shops', 'Disc', 53, 'Automobile tyres, tubular inverter batteries and replacement.'),

  -- Professional & Legal
  ('Chartered Accountants', 'Chartered Accountants', 'பட்டய கணக்காளர்கள்', 'chartered-accountants', 'FileSpreadsheet', 60, 'GST filing, income tax returns, audits and company incorporation.'),
  ('Advocates & Legal', 'Advocates & Legal', 'வழக்கறிஞர்கள்', 'advocates-legal', 'Scale', 61, 'Property registration, civil documentation and corporate law.'),
  ('Real Estate Agents', 'Real Estate Agents', 'ரியல் எஸ்டேட்', 'real-estate-agents', 'Home', 62, 'Flats, plots, commercial space rental and property sales.'),
  ('Insurance Advisors', 'Insurance Advisors', 'காப்பீட்டு ஆலோசகர்கள்', 'insurance-advisors', 'ShieldCheck', 63, 'Health, term life, vehicle and business insurance policies.'),
  ('Digital Marketing Agencies', 'Digital Marketing Agencies', 'டிஜிட்டல் மார்க்கெட்டிங்', 'digital-marketing-agencies', 'Globe', 64, 'SEO, Google Ads, social media handling and brand promotion.'),
  ('Graphic Designers & Printers', 'Graphic Designers & Printers', 'வடிவமைப்பு மற்றும் அச்சிடுதல்', 'graphic-designers-printers', 'Printer', 65, 'Brochures, flex printing, business cards and brand kits.'),

  -- B2B & Industrial Manufacturers
  ('CNC Machining & Fabricators', 'CNC Machining & Fabricators', 'இயந்திர பாகங்கள் தயாரிப்பு', 'cnc-machining-fabricators', 'Cog', 70, 'Precision lathe components, sheet metal cutting and fabrication.'),
  ('Corrugated Box Makers', 'Corrugated Box Makers', 'அட்டைப்பெட்டி தயாரிப்பாளர்கள்', 'corrugated-box-makers', 'Package', 71, 'Custom carton packaging, industrial corrugated boxes.'),
  ('Plastic Molding & Dies', 'Plastic Molding & Dies', 'பிளாஸ்டிக் பொருட்கள் தயாரிப்பு', 'plastic-molding-dies', 'Box', 72, 'Injection molding, blow molding and plastic component tooling.'),
  ('Industrial Chemical Suppliers', 'Industrial Chemical Suppliers', 'தொழில்துறை இரசாயனங்கள்', 'industrial-chemical-suppliers', 'FlaskConical', 73, 'Solvents, resins, laboratory reagents and industrial acids.'),
  ('Electrical Panels & Transformers', 'Electrical Panels & Transformers', 'மின் பேனல்கள்', 'electrical-panels-transformers', 'Server', 74, 'HT/LT distribution panels, distribution transformers and switchgear.'),
  ('Textile & Garment Makers', 'Textile & Garment Makers', 'ஜவுளி மற்றும் ஆடை உற்பத்தியாளர்கள்', 'textile-garment-makers', 'Scissors', 75, 'Uniform stitching, cotton fabrics and knitted garments.'),
  ('Hardware & Building Materials', 'Hardware & Building Materials', 'கட்டிட பொருட்கள்', 'hardware-building-materials', 'Boxes', 76, 'Cement, TMT steel bars, sanitaryware and building hardware.')
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_ta = EXCLUDED.name_ta,
  description = EXCLUDED.description,
  icon = EXCLUDED.icon;

-- 4. PLATFORM SETTINGS
INSERT INTO public.platform_settings (key, value, description)
VALUES
  ('general', '{"platform_name": "Local Biz", "tagline": "Find Local. Connect Better.", "support_phone": "+91 44 2828 0000", "support_email": "support@localbiz.in", "default_city": "Chennai", "default_state": "Tamil Nadu"}'::jsonb, 'Platform general configuration'),
  ('payments', '{"razorpay_enabled": true, "test_mode": true, "currency": "INR", "gst_rate_percent": 18}'::jsonb, 'Monetization and payment settings'),
  ('moderation', '{"auto_approve_claims": false, "require_enquiry_consent": true, "allow_guest_enquiries": true}'::jsonb, 'Trust and moderation rules')
ON CONFLICT (key) DO UPDATE SET
  value = EXCLUDED.value,
  updated_at = timezone('utc'::text, now());
