-- ====================================================================
-- LOCAL BIZ: Complete Seed Data for Production Supabase PostgreSQL
-- 15 Indian Cities, 20 Categories, 20 Subcategories, 30 Verified Businesses,
-- 15 Products, 10 Services, Reviews, and Homepage Promotional Banners
-- ====================================================================

-- 1. SEED CITIES (15 Major Indian Metro Centers)
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Chennai', 'chennai', 'Tamil Nadu', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Bangalore', 'bangalore', 'Karnataka', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Mumbai', 'mumbai', 'Maharashtra', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Delhi', 'delhi', 'Delhi NCR', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Hyderabad', 'hyderabad', 'Telangana', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Pune', 'pune', 'Maharashtra', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Kolkata', 'kolkata', 'West Bengal', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Coimbatore', 'coimbatore', 'Tamil Nadu', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Madurai', 'madurai', 'Tamil Nadu', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Kochi', 'kochi', 'Kerala', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Ahmedabad', 'ahmedabad', 'Gujarat', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Jaipur', 'jaipur', 'Rajasthan', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Surat', 'surat', 'Gujarat', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Lucknow', 'lucknow', 'Uttar Pradesh', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;
INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES ('Chandigarh', 'chandigarh', 'Punjab & Haryana', 'India', true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;

-- 2. SEED CATEGORIES (20 Key Commercial Sectors)
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Restaurants', 'restaurants', 'Fine dining, veg eateries, cafes and multi-cuisine restaurants', '🍽️', true, 1)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Hospitals', 'hospitals', 'Multi-speciality hospitals, clinics and 24x7 emergency medical centers', '🏥', true, 2)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Hotels', 'hotels', 'Luxury hotels, business stays, resorts and budget lodges', '🏨', true, 3)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Education', 'education', 'Schools, colleges, competitive exam academies and skill institutes', '🎓', true, 4)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('IT Services', 'it-services', 'Software companies, cloud computing, cybersecurity and app development', '💻', true, 5)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Electronics', 'electronics', 'Retailers, wholesalers, CCTV security and home automation dealers', '📱', true, 6)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Automobile', 'automobile', 'Authorized car dealers, bike showrooms, service garages and parts', '🚗', true, 7)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Real Estate', 'real-estate', 'Property developers, commercial leasing, residential flats and plots', '🏠', true, 8)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Construction', 'construction', 'Civil contractors, architects, interior designers and building materials', '🏗️', true, 9)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Finance', 'finance', 'Chartered accountants, business loan consultants, GST filing and advisors', '💰', true, 10)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Legal', 'legal', 'Corporate advocates, patent attorneys, property verification lawyers', '⚖️', true, 11)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Beauty', 'beauty', 'Unisex hair salons, bridal makeup artists, luxury spas and skincare', '💆', true, 12)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Furniture', 'furniture', 'Office ergonomics, home modular furniture, wooden craftsmanship', '🪑', true, 13)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Clothing', 'clothing', 'Textile mills, ethnic wear, uniform manufacturers and boutique stores', '👕', true, 14)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Logistics', 'logistics', 'Freight forwarders, packers & movers, cold storage and courier hubs', '🚚', true, 15)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Manufacturers', 'manufacturers', 'Industrial machinery, metal fabrication, precision casting & plastic tools', '🏭', true, 16)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Wholesalers', 'wholesalers', 'Bulk FMCG suppliers, commodity traders and wholesale distributors', '📦', true, 17)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Home Services', 'home-services', 'Electricians, plumbers, AC repair, pest control and home cleaning', '🔧', true, 18)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Travel', 'travel', 'Tour operators, corporate cab rentals, passport consultants and forex', '✈️', true, 19)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;
INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES ('Digital Marketing', 'digital-marketing', 'SEO growth agencies, Google ad specialists, performance social ads', '📈', true, 20)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;

-- 3. SEED SUBCATEGORIES
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'South Indian Veg', 'south-indian-veg', true
FROM public.categories WHERE slug = 'restaurants'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Multi-Cuisine Fine Dining', 'multi-cuisine', true
FROM public.categories WHERE slug = 'restaurants'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Multi-Speciality Hospitals', 'multi-speciality', true
FROM public.categories WHERE slug = 'hospitals'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Diagnostic Labs', 'diagnostic-labs', true
FROM public.categories WHERE slug = 'hospitals'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Custom Software & Mobile Apps', 'custom-software', true
FROM public.categories WHERE slug = 'it-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Cloud & Cyber Security', 'cloud-security', true
FROM public.categories WHERE slug = 'it-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'CCTV & Security Systems', 'cctv-security', true
FROM public.categories WHERE slug = 'electronics'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Car Service Centers', 'car-service', true
FROM public.categories WHERE slug = 'automobile'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Commercial Office Spaces', 'commercial-spaces', true
FROM public.categories WHERE slug = 'real-estate'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Interior Designers', 'interior-designers', true
FROM public.categories WHERE slug = 'construction'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Chartered Accountants', 'chartered-accountants', true
FROM public.categories WHERE slug = 'finance'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Bridal Spas & Salons', 'bridal-salons', true
FROM public.categories WHERE slug = 'beauty'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Ergonomic Office Furniture', 'office-furniture', true
FROM public.categories WHERE slug = 'furniture'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Export Cotton Garments', 'cotton-garments', true
FROM public.categories WHERE slug = 'clothing'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Packers & Movers', 'packers-movers', true
FROM public.categories WHERE slug = 'logistics'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'CNC Precision Engineering', 'cnc-engineering', true
FROM public.categories WHERE slug = 'manufacturers'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Solar Panels & Clean Energy', 'solar-energy', true
FROM public.categories WHERE slug = 'manufacturers'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'FMCG Wholesale Distributors', 'fmcg-wholesale', true
FROM public.categories WHERE slug = 'wholesalers'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'Air Conditioning AMC & Repair', 'ac-repair', true
FROM public.categories WHERE slug = 'home-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;
INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, 'SEO & Performance Lead Generation', 'seo-lead-gen', true
FROM public.categories WHERE slug = 'digital-marketing'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;

-- 4. SEED BUSINESSES (30 Verified Indian Enterprises Across All 15 Cities)
INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Chennai Tech Solutions',
  'chennai-tech-solutions',
  'Premier IT consultancy & software engineering firm delivering custom enterprise ERPs, native mobile applications, React portals, and AWS cloud migrations for Indian and international enterprises since 2012.',
  'Custom web, mobile app, and enterprise cloud solutions.',
  '💻',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
  '+91 98401 23456',
  '+919840123456',
  'info@chennaitechsolutions.com',
  'https://chennaitechsolutions.com',
  '42, Mount Road, Guindy Industrial Estate',
  'Guindy',
  (SELECT id FROM public.cities WHERE slug = 'chennai' LIMIT 1),
  'Tamil Nadu',
  '600032',
  (SELECT id FROM public.categories WHERE slug = 'it-services' LIMIT 1),
  'Private Limited IT Enterprise',
  2012,
  '33AAACC1234F1Z8',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.9,
  248
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Sri Lakshmi Traders & Wholesalers',
  'sri-lakshmi-traders',
  'Direct wholesale FMCG distributor supplying leading retail grocery supermarkets across Tamil Nadu with branded grains, spices, edible oils, packaging consumables, and confectionery at factory prices.',
  'Bulk grocery and FMCG supply partner for retail supermarkets.',
  '📦',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  '+91 94440 98765',
  '+919444098765',
  'sales@srilakshmitraders.in',
  'https://srilakshmitraders.in',
  '15, Kothawal Chavadi Market, George Town',
  'George Town',
  (SELECT id FROM public.cities WHERE slug = 'chennai' LIMIT 1),
  'Tamil Nadu',
  '600001',
  (SELECT id FROM public.categories WHERE slug = 'wholesalers' LIMIT 1),
  'Partnership Firm',
  2004,
  '33AABCS4567G1Z1',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.7,
  184
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Royal Chettinad Spice Restaurant',
  'royal-chettinad-spice-restaurant',
  'Iconic family dining haven serving slow-cooked heritage Chettinad biryanis, seeraga samba delicacies, freshly roasted masala gravies, and traditional filter coffees in an air-conditioned ethnic ambience.',
  'Authentic Chettinad cuisine and seafood specialties.',
  '🍛',
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
  '+91 44 2811 4455',
  '+919884411223',
  'dining@royalchettinadspice.com',
  'https://royalchettinadspice.com',
  '88, Cathedral Road, Gopalapuram',
  'Gopalapuram',
  (SELECT id FROM public.cities WHERE slug = 'chennai' LIMIT 1),
  'Tamil Nadu',
  '600086',
  (SELECT id FROM public.categories WHERE slug = 'restaurants' LIMIT 1),
  'Hospitality Pvt Ltd',
  2010,
  '33AABCR9911H1Z9',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.8,
  642
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Apollo Lifeline Multi-Speciality Clinic',
  'apollo-lifeline-clinic-coimbatore',
  'State-of-the-art medical diagnostic and treatment facility providing cardiology, orthopedics, pediatric care, fully automated pathology diagnostics, and emergency ambulance response 24 hours a day.',
  'Comprehensive 24/7 healthcare, diagnostics, and specialist consultations.',
  '🏥',
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
  '+91 422 255 7799',
  '+919944113355',
  'helpdesk@apollolifeline.org',
  'https://apollolifeline.org',
  '104, Avinashi Road, Peelamedu',
  'Peelamedu',
  (SELECT id FROM public.cities WHERE slug = 'coimbatore' LIMIT 1),
  'Tamil Nadu',
  '641004',
  (SELECT id FROM public.categories WHERE slug = 'hospitals' LIMIT 1),
  'Healthcare Enterprise',
  2015,
  '33AABCA8822J1Z2',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.7,
  312
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Coimbatore Precision Engineering Works',
  'coimbatore-precision-engineering',
  'ISO 9001:2015 certified manufacturer of heavy CNC machined parts, textile machinery spindles, agricultural pump castings, and industrial gearboxes exporting globally.',
  'High-precision CNC machine components and industrial castings.',
  '⚙️',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  '+91 94433 11223',
  '+919443311223',
  'exports@coimbatoreprecision.com',
  'https://coimbatoreprecision.com',
  '8/21, SIDCO Industrial Estate, Kurichi',
  'Kurichi',
  (SELECT id FROM public.cities WHERE slug = 'coimbatore' LIMIT 1),
  'Tamil Nadu',
  '641021',
  (SELECT id FROM public.categories WHERE slug = 'manufacturers' LIMIT 1),
  'Manufacturer & Exporter',
  1998,
  '33AABCW7733K1Z3',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.9,
  165
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'SunGrid Solar Power Systems',
  'sungrid-solar-power-bangalore',
  'Tier-1 rooftop solar installer delivering on-grid & hybrid solar PV power stations for commercial factories, villas, educational campuses, and corporate tech parks across Karnataka.',
  'Turnkey rooftop solar solutions with net-metering & subsidies.',
  '☀️',
  'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
  '+91 80 4123 8899',
  '+919740112244',
  'contact@sungridenergy.in',
  'https://sungridenergy.in',
  '74, 100 Feet Road, Indiranagar',
  'Indiranagar',
  (SELECT id FROM public.cities WHERE slug = 'bangalore' LIMIT 1),
  'Karnataka',
  '560038',
  (SELECT id FROM public.categories WHERE slug = 'manufacturers' LIMIT 1),
  'CleanTech Renewable Energy',
  2016,
  '29AABCS6644L1Z4',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.8,
  220
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Deccan Luxury Office Furniture',
  'deccan-luxury-office-furniture-hyderabad',
  'Architectural ergonomic furniture showroom manufacturing height-adjustable executive desks, breathable mesh conference chairs, breakout modular booths, and collaborative workstation suites.',
  'Modern corporate workstations & high-grade executive seating.',
  '🪑',
  'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
  '+91 40 6677 8899',
  '+919988776655',
  'info@deccanfurniture.com',
  'https://deccanfurniture.com',
  'Plot 12, Hitec City Main Road, Madhapur',
  'Madhapur',
  (SELECT id FROM public.cities WHERE slug = 'hyderabad' LIMIT 1),
  'Telangana',
  '500081',
  (SELECT id FROM public.categories WHERE slug = 'furniture' LIMIT 1),
  'Corporate Furniture Solutions',
  2011,
  '36AABCD5533M1Z5',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.6,
  140
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'PackWell Eco Packaging Industries',
  'packwell-eco-packaging-pune',
  'Leading packaging engineering company manufacturing recyclable corrugated shipping boxes, biodegradable honeycomb pallets, tamper-evident mailers, and automated carton sealing systems.',
  'Custom corrugated boxes, cartons, and eco packaging materials.',
  '📦',
  'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=1200&q=80',
  '+91 20 2712 3456',
  '+919822012345',
  'orders@packwellindustries.in',
  'https://packwellindustries.in',
  'Plot 45, MIDC Industrial Area, Bhosari',
  'Bhosari',
  (SELECT id FROM public.cities WHERE slug = 'pune' LIMIT 1),
  'Maharashtra',
  '411026',
  (SELECT id FROM public.categories WHERE slug = 'manufacturers' LIMIT 1),
  'Industrial Manufacturer',
  2008,
  '27AABCP4422N1Z6',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.7,
  98
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Tiruppur Export Cotton Garments',
  'tiruppur-export-cotton-garments',
  '100% combed organic cotton knitwear apparel manufacturer specializing in customized bio-washed round neck tees, polo shirts, sports jerseys, and babywear for corporate gifting and international brands.',
  'Bio-washed combed cotton t-shirts, hoodies, and uniforms.',
  '👕',
  'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
  '+91 94422 55667',
  '+919442255667',
  'exports@tiruppurgarments.com',
  'https://tiruppurgarments.com',
  '124, Rayapuram Main Road',
  'Rayapuram',
  (SELECT id FROM public.cities WHERE slug = 'chennai' LIMIT 1),
  'Tamil Nadu',
  '641601',
  (SELECT id FROM public.categories WHERE slug = 'clothing' LIMIT 1),
  'Garment Manufacturer & Exporter',
  2002,
  '33AABCT3311P1Z7',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.8,
  276
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Delhi Electro Safe & Automation',
  'delhi-electro-safe-automation',
  'Comprehensive wholesale stockist of heavy-duty industrial switchgear, flame-proof LED luminaires, armored cables, smart CCTV biometrics, and automated motor control panels (MCC).',
  'Wholesale electrical components, wires, and industrial switchgears.',
  '🔌',
  'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80',
  '+91 11 2386 1122',
  '+919811099887',
  'sales@delhielectro.com',
  'https://delhielectro.com',
  '52, Bhagirath Palace, Chandni Chowk',
  'Chandni Chowk',
  (SELECT id FROM public.cities WHERE slug = 'delhi' LIMIT 1),
  'Delhi NCR',
  '110006',
  (SELECT id FROM public.categories WHERE slug = 'electronics' LIMIT 1),
  'Wholesale Electrical Distributor',
  1995,
  '07AABCD2211Q1Z8',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.7,
  195
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Madurai Traditional Gold & Diamonds',
  'madurai-traditional-gold-jewellers',
  'Heritage BIS 916 hallmarked jewelry palace celebrated for authentic Temple jewelry designs, antique bridal chokers, uncut Polki sets, and GIA certified diamond solitaires crafted by hereditary master goldsmiths.',
  'BIS 916 hallmarked bridal jewelry, antique gold, and diamond collections.',
  '💍',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80',
  '+91 452 234 5678',
  '+919443188990',
  'contact@maduraijewels.in',
  'https://maduraijewels.in',
  '14, South Masi Street',
  'South Masi Street',
  (SELECT id FROM public.cities WHERE slug = 'madurai' LIMIT 1),
  'Tamil Nadu',
  '625001',
  (SELECT id FROM public.categories WHERE slug = 'clothing' LIMIT 1),
  'Retail & Wholesale Jeweller',
  1978,
  '33AABCM1122R1Z9',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.9,
  320
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Kochi Digital Performance Growth Hub',
  'kochi-digital-performance-hub',
  'Results-driven performance marketing agency generating qualified B2B leads, programmatic advertising, local SEO map dominance, and high-converting Shopify web architectures for businesses across Kerala & UAE.',
  'Performance SEO, Meta & Google Ads, and e-commerce scaling.',
  '📈',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  '+91 484 404 1122',
  '+919847055443',
  'growth@kochidigitalhub.com',
  'https://kochidigitalhub.com',
  '5th Floor, Infopark Phase 2, Kakkanad',
  'Kakkanad',
  (SELECT id FROM public.cities WHERE slug = 'kochi' LIMIT 1),
  'Kerala',
  '682042',
  (SELECT id FROM public.categories WHERE slug = 'digital-marketing' LIMIT 1),
  'Digital Marketing Agency',
  2017,
  '32AABCK9988S1Z0',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.8,
  188
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'BuildMax ReadyMix & Construction Supplies',
  'buildmax-readymix-construction-chennai',
  'Premier supplier of high-grade M20 to M45 ready-mix concrete, Tata Tiscon TMT rebars, Ultratech cement, aggregate sand, and waterproofing chemicals with certified lab test reports.',
  'Certified Ready-Mix Concrete (RMC), TMT bars, and building materials.',
  '🏗️',
  'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1200&q=80',
  '+91 44 2656 7788',
  '+919840911223',
  'quotes@buildmaxsupplies.in',
  'https://buildmaxsupplies.in',
  '22, Ambattur Industrial Estate',
  'Ambattur',
  (SELECT id FROM public.cities WHERE slug = 'chennai' LIMIT 1),
  'Tamil Nadu',
  '600058',
  (SELECT id FROM public.categories WHERE slug = 'construction' LIMIT 1),
  'Building Material Supplier',
  2006,
  '33AABCB8877T1Z1',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.6,
  130
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Bright Electricals & LED Lights',
  'bright-electricals-led-chennai',
  'Factory direct distributor of commercial architectural recessed LED downlights, high-bay factory fixtures, magnetic track lighting, and street light poles with 3-year replacement warranty.',
  'Energy-saving commercial LED lighting solutions and fixtures.',
  '💡',
  'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=1200&q=80',
  '+91 44 2535 9988',
  '+919444155667',
  'info@brightledlights.com',
  'https://brightledlights.com',
  '91, Govindappa Naicken Street',
  'Parrys',
  (SELECT id FROM public.cities WHERE slug = 'chennai' LIMIT 1),
  'Tamil Nadu',
  '600001',
  (SELECT id FROM public.categories WHERE slug = 'electronics' LIMIT 1),
  'Commercial Lighting Manufacturer',
  2013,
  '33AABCB7766U1Z2',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.8,
  245
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Ahmedabad Fabric & Textile Mills',
  'ahmedabad-fabric-textile-mills',
  'Major spinning & weaving composite mill manufacturing 100% pure cotton shirting fabrics, denim twills, printed rayon, and export-grade cambric textiles with sustainable zero-liquid discharge.',
  'Pure cotton shirting, denim, and woven fabric manufacturing.',
  '🧵',
  'https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=1200&q=80',
  '+91 79 2213 4455',
  '+919825011223',
  'contact@ahmedabadtextiles.com',
  'https://ahmedabadtextiles.com',
  'Plot 102, Naroda Industrial Estate',
  'Naroda',
  (SELECT id FROM public.cities WHERE slug = 'ahmedabad' LIMIT 1),
  'Gujarat',
  '382330',
  (SELECT id FROM public.categories WHERE slug = 'clothing' LIMIT 1),
  'Composite Textile Mill',
  1989,
  '24AABCA6655V1Z3',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.7,
  156
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Jaipur Royal Heritage Haveli Hotel',
  'jaipur-royal-heritage-haveli-hotel',
  '4-star boutique heritage hotel set inside an 18th-century Rajput palace offering regal courtyard dining, Ayurvedic spa therapies, marble swimming pool, and luxury banquet lawns.',
  'Royal palace stay, heritage dining, and luxury banquet venue.',
  '🏨',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
  '+91 141 236 8899',
  '+919829011223',
  'reservations@jaipurhavelihotel.com',
  'https://jaipurhavelihotel.com',
  'Near Jal Mahal, Amer Road',
  'Amer Road',
  (SELECT id FROM public.cities WHERE slug = 'jaipur' LIMIT 1),
  'Rajasthan',
  '302002',
  (SELECT id FROM public.categories WHERE slug = 'hotels' LIMIT 1),
  'Heritage Hospitality',
  2005,
  '08AABCJ5544W1Z4',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.8,
  410
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Surat Diamond Cutting & Jewelry',
  'surat-diamond-cutting-jewelry',
  'World-class diamond cutting and wholesale manufacturing company providing natural polished diamonds, lab-grown CVD diamonds, and micro-pave eternity rings for high-end jewelers worldwide.',
  'Certified natural & lab-grown polished diamonds at wholesale factory rates.',
  '💎',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
  '+91 261 245 6677',
  '+919824155667',
  'sales@suratdiamonds.in',
  'https://suratdiamonds.in',
  'Tower B, Surat Diamond Bourse, Khajod',
  'Khajod',
  (SELECT id FROM public.cities WHERE slug = 'surat' LIMIT 1),
  'Gujarat',
  '395007',
  (SELECT id FROM public.categories WHERE slug = 'manufacturers' LIMIT 1),
  'Diamond Manufacturer & Exporter',
  1999,
  '24AABCS4433X1Z5',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.9,
  280
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Mumbai Marine Logistics & Shipping',
  'mumbai-marine-logistics-shipping',
  'International multimodal logistics, bonded warehousing, customs house clearance, and refrigerated reefers for pharmaceutical and perishables shipping across JNPT Port.',
  'Multimodal freight forwarding, customs clearance, and cold-chain cargo.',
  '🚢',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80',
  '+91 22 2261 4455',
  '+919820011223',
  'operations@mumbaimarinelogistics.com',
  'https://mumbaimarinelogistics.com',
  '601, Nariman Point Commercial Tower',
  'Nariman Point',
  (SELECT id FROM public.cities WHERE slug = 'mumbai' LIMIT 1),
  'Maharashtra',
  '400021',
  (SELECT id FROM public.categories WHERE slug = 'logistics' LIMIT 1),
  'International Shipping & Logistics',
  2003,
  '27AABCM3322Y1Z6',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.7,
  142
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Kolkata Heritage Sweets & Confectionery',
  'kolkata-heritage-sweets-confectionery',
  'World-famous Bengali sweet makers crafting original Nolen Gur Sandesh, sponge Rasgullas, baked Mishti Doi, and festive gift hampers with vacuum-sealed domestic and international flight packaging.',
  'Original Bengali Rasgulla, Sandesh, and handcrafted sweets.',
  '🍯',
  'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=1200&q=80',
  '+91 33 2244 5566',
  '+919830022334',
  'orders@kolkatasweets.com',
  'https://kolkatasweets.com',
  '16, College Street, Bowbazar',
  'College Street',
  (SELECT id FROM public.cities WHERE slug = 'kolkata' LIMIT 1),
  'West Bengal',
  '700012',
  (SELECT id FROM public.categories WHERE slug = 'restaurants' LIMIT 1),
  'Heritage Food Manufacturer',
  1952,
  '19AABCK2211Z1Z7',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.9,
  780
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Chandigarh Premier IELTS & Study Abroad Academy',
  'chandigarh-premier-ielts-study-abroad',
  'Leading international education visa consultancy and British Council accredited IELTS coaching institute helping students secure admissions in Canada, UK, Australia, and Germany.',
  'IELTS coaching, overseas university admissions, and student visas.',
  '🎓',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
  '+91 172 270 4455',
  '+919876011223',
  'admissions@chandigarhstudyabroad.in',
  'https://chandigarhstudyabroad.in',
  'SCO 84-85, Sector 34-A',
  'Sector 34-A',
  (SELECT id FROM public.cities WHERE slug = 'chandigarh' LIMIT 1),
  'Punjab & Haryana',
  '160022',
  (SELECT id FROM public.categories WHERE slug = 'education' LIMIT 1),
  'Educational Academy',
  2010,
  '04AABCC1100A1Z8',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.8,
  295
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Lucknow Chikankari Handloom Emporium',
  'lucknow-chikankari-handloom-emporium',
  'Government recognized artisan society manufacturing genuine GI-tagged hand-embroidered Chikan kurtis, georgette sarees, bridal anarkalis, and pure cotton shirts for domestic and export boutiques.',
  'Authentic handcrafted GI-tagged Lucknowi Chikankari apparel.',
  '🥻',
  'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
  '+91 522 228 3344',
  '+919415011223',
  'craft@lucknowchikankari.com',
  'https://lucknowchikankari.com',
  '45, Hazratganj Main Market',
  'Hazratganj',
  (SELECT id FROM public.cities WHERE slug = 'lucknow' LIMIT 1),
  'Uttar Pradesh',
  '226001',
  (SELECT id FROM public.categories WHERE slug = 'clothing' LIMIT 1),
  'Artisan Cooperative & Manufacturer',
  1985,
  '09AABCL9900B1Z9',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.9,
  360
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Bangalore Elite Chartered Accountants & Tax Advisory',
  'bangalore-elite-chartered-accountants',
  'Corporate financial auditing, statutory GST filing, transfer pricing, VC fundraising due diligence, and startup company incorporation services backed by certified FCA partners.',
  'Statutory audit, GST compliance, startup fundraising & financial advisory.',
  '💼',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  '+91 80 2558 3322',
  '+919845011223',
  'partners@bangaloreeliteca.in',
  'https://bangaloreeliteca.in',
  '204, Brigade Road, Ashok Nagar',
  'Brigade Road',
  (SELECT id FROM public.cities WHERE slug = 'bangalore' LIMIT 1),
  'Karnataka',
  '560001',
  (SELECT id FROM public.categories WHERE slug = 'finance' LIMIT 1),
  'Chartered Accountancy Firm',
  2008,
  '29AABCB8899C1Z0',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.8,
  165
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Mumbai Glamour Bridal Studio & Luxury Spa',
  'mumbai-glamour-bridal-studio-spa',
  'Celebrity bridal hair & HD airbrush makeup studio, organic Moroccan hair spas, advanced collagen skin facials, and personalized bridal grooming packages in South Mumbai.',
  'HD bridal makeup, hair styling, skin aesthetics & luxury spa.',
  '💄',
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80',
  '+91 22 2640 5566',
  '+919820144332',
  'bookings@mumbaiglamourspa.com',
  'https://mumbaiglamourspa.com',
  '12, Turner Road, Bandra West',
  'Bandra West',
  (SELECT id FROM public.cities WHERE slug = 'mumbai' LIMIT 1),
  'Maharashtra',
  '400050',
  (SELECT id FROM public.categories WHERE slug = 'beauty' LIMIT 1),
  'Luxury Salon & Spa',
  2014,
  '27AABCG7788D1Z1',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.9,
  310
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Hyderabad Prime Commercial Realty & Spaces',
  'hyderabad-prime-commercial-realty',
  'Specialist commercial real estate agency negotiating Grade-A plug-and-play IT office floors, coworking space leases, retail high-street shops, and warehouse logistics parks in Financial District & Gachibowli.',
  'Grade-A IT office leasing, corporate coworking, and commercial plots.',
  '🏢',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  '+91 40 4011 2233',
  '+919849011223',
  'deals@hyderabadprimerealty.com',
  'https://hyderabadprimerealty.com',
  '8th Floor, Cyber Towers, Hitec City',
  'Hitec City',
  (SELECT id FROM public.cities WHERE slug = 'hyderabad' LIMIT 1),
  'Telangana',
  '500081',
  (SELECT id FROM public.categories WHERE slug = 'real-estate' LIMIT 1),
  'Commercial Real Estate Brokerage',
  2011,
  '36AABCH6677E1Z2',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.8,
  175
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Pune SafeMove Relocations & Packers',
  'pune-safemove-packers-movers',
  'IBA approved professional packers and movers providing 5-layer bubble packing, closed container car carriers, domestic household shifting, and corporate IT asset relocation across India.',
  'IBA approved household shifting, vehicle transport & storage.',
  '📦',
  'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=1200&q=80',
  '+91 20 2745 6677',
  '+919822155443',
  'support@punesafemove.in',
  'https://punesafemove.in',
  'Plot 18, Hinjewadi Phase 1, Wakad Road',
  'Wakad',
  (SELECT id FROM public.cities WHERE slug = 'pune' LIMIT 1),
  'Maharashtra',
  '411057',
  (SELECT id FROM public.categories WHERE slug = 'logistics' LIMIT 1),
  'Relocation & Logistics',
  2009,
  '27AABCP5544F1Z3',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.7,
  210
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Chennai FastCool AC Service & HVAC Engineering',
  'chennai-fastcool-ac-service-hvac',
  'Authorized Daikin, Voltas & Mitsubishi commercial VRV/VRF central air conditioning installers, industrial duct cleaning, annual maintenance contracts (AMC), and emergency same-day gas refilling.',
  'Commercial HVAC chillers, VRF installation, and home AC repair.',
  '❄️',
  'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80',
  '+91 44 2489 1122',
  '+919841022334',
  'service@chennaifastcool.com',
  'https://chennaifastcool.com',
  '15, 100 Feet Road, Vadapalani',
  'Vadapalani',
  (SELECT id FROM public.cities WHERE slug = 'chennai' LIMIT 1),
  'Tamil Nadu',
  '600026',
  (SELECT id FROM public.categories WHERE slug = 'home-services' LIMIT 1),
  'HVAC Engineering & Maintenance',
  2012,
  '33AABCF4433G1Z4',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.6,
  198
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Delhi Supreme Law Chambers & Corporate Advocates',
  'delhi-supreme-law-chambers',
  'High Court and Supreme Court advocates specializing in commercial arbitration, trademark patent registrations, NCLT insolvency proceedings, and builder-buyer RERA consumer protection litigation.',
  'Corporate law, commercial arbitration, IPR patents & NCLT litigation.',
  '⚖️',
  'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
  '+91 11 2338 5566',
  '+919810011223',
  'counsel@delhisupremelaw.in',
  'https://delhisupremelaw.in',
  'Chamber 402, Lawyers Chambers Block, Patiala House',
  'India Gate',
  (SELECT id FROM public.cities WHERE slug = 'delhi' LIMIT 1),
  'Delhi NCR',
  '110001',
  (SELECT id FROM public.categories WHERE slug = 'legal' LIMIT 1),
  'Advocates & Legal Firm',
  1996,
  '07AABCD3322H1Z5',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.9,
  182
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Coimbatore Master Auto Works & Collision Repair',
  'coimbatore-master-auto-works',
  'Bosch-authorized multi-brand premium car service center equipped with laser chassis straightening, infrared computerized paint baking booths, and automated diagnostic scanners for Mercedes, BMW, Audi & Honda.',
  'Multi-brand cashless insurance claim service, detailing & engine overhaul.',
  '🚗',
  'https://images.unsplash.com/photo-1613214149922-f1809c99b414?auto=format&fit=crop&w=1200&q=80',
  '+91 422 247 1122',
  '+919442166778',
  'service@masterautocoimbatore.com',
  'https://masterautocoimbatore.com',
  '18, Mettupalayam Road, Thudiyalur',
  'Thudiyalur',
  (SELECT id FROM public.cities WHERE slug = 'coimbatore' LIMIT 1),
  'Tamil Nadu',
  '641034',
  (SELECT id FROM public.categories WHERE slug = 'automobile' LIMIT 1),
  'Automotive Workshop',
  2007,
  '33AABCM2211J1Z6',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.7,
  230
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Kolkata Horizon Corporate Travel & Cab Fleet',
  'kolkata-horizon-corporate-travel',
  'Corporate employee transportation, premium luxury chauffeur-driven airport transfers, outstation holiday tour packages, and chartered bus coaches for conferences across East India.',
  'Corporate employee cabs, airport transfers, and outstation car rentals.',
  '🚖',
  'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80',
  '+91 33 4005 8899',
  '+919831044332',
  'bookings@kolkatahorizontravel.com',
  'https://kolkatahorizontravel.com',
  '8, Camac Street, Park Street Area',
  'Park Street',
  (SELECT id FROM public.cities WHERE slug = 'kolkata' LIMIT 1),
  'West Bengal',
  '700017',
  (SELECT id FROM public.categories WHERE slug = 'travel' LIMIT 1),
  'Travel & Fleet Management',
  2013,
  '19AABCK1100K1Z7',
  'approved'::business_status,
  'verified'::verification_status,
  false,
  true,
  4.6,
  145
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;

INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  'Bangalore Habitat Interior Architecture & Design',
  'bangalore-habitat-interior-design',
  'Award-winning turnkey interior design studio delivering bespoke Italian kitchens, false ceiling acoustic treatments, walk-in luxury wardrobes, and automated smart-home lighting for luxury villas.',
  'Bespoke modular kitchens, luxury villa interiors, and 3D turnkey fit-outs.',
  '🏡',
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  '+91 80 4955 6677',
  '+919739011223',
  'design@habitatinteriors.in',
  'https://habitatinteriors.in',
  '42, 80 Feet Road, Koramangala 4th Block',
  'Koramangala',
  (SELECT id FROM public.cities WHERE slug = 'bangalore' LIMIT 1),
  'Karnataka',
  '560034',
  (SELECT id FROM public.categories WHERE slug = 'construction' LIMIT 1),
  'Interior Architecture Studio',
  2015,
  '29AABCH0099L1Z8',
  'approved'::business_status,
  'verified'::verification_status,
  true,
  true,
  4.9,
  285
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;


-- 5. SEED PRODUCTS (B2B Marketplace Items)
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'tiruppur-export-cotton-garments' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'clothing' LIMIT 1),
  '100% Bio-Washed Combed Cotton T-Shirts',
  'cotton-t-shirts-bulk',
  'Export quality 180 GSM pre-shrunk cotton fabric with Lycra rib collar. Suitable for corporate printing and fashion labels.',
  199,
  100,
  'Pieces',
  '👕',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'coimbatore-precision-engineering' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'manufacturers' LIMIT 1),
  'Heavy Duty CNC Lathe Machined Flanges',
  'cnc-machined-flanges',
  'High precision forged stainless steel and carbon steel industrial pipe flanges conforming to ANSI B16.5 standards.',
  1450,
  25,
  'Units',
  '⚙️',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'bright-electricals-led-chennai' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'electronics' LIMIT 1),
  'Commercial 36W Recessed LED Panel Lights',
  'commercial-36w-led-panel',
  'Flicker-free edge-lit 2x2 LED modular panels delivering 120 lm/Watt with surge protected BIS approved drivers.',
  499,
  50,
  'Boxes',
  '💡',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'packwell-eco-packaging-pune' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'manufacturers' LIMIT 1),
  'Heavy 5-Ply Recyclable Corrugated Shipping Boxes',
  '5-ply-corrugated-boxes',
  'Bursting factor 24+ heavy kraft paper shipping cartons designed for safe e-commerce logistics and exports.',
  45,
  500,
  'Cartons',
  '📦',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'deccan-luxury-office-furniture-hyderabad' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'furniture' LIMIT 1),
  'High-Back Ergonomic Mesh Executive Office Chair',
  'high-back-ergonomic-office-chair',
  'German tilt-lock synchronized mechanism, adjustable 3D armrests, pneumatic class-4 gas lift, and breathable Korean mesh.',
  8499,
  5,
  'Sets',
  '🪑',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'sungrid-solar-power-bangalore' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'manufacturers' LIMIT 1),
  '540W Mono PERC Half-Cut Tier-1 Solar PV Modules',
  '540w-mono-perc-solar-panels',
  'High-efficiency 21.3% conversion monocrystalline photovoltaic panels engineered for harsh Indian tropical weather.',
  14500,
  10,
  'Panels',
  '☀️',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'delhi-electro-safe-automation' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'electronics' LIMIT 1),
  'Industrial Heavy Duty 63A 4-Pole MCB & Enclosure',
  '63a-4-pole-mcb-switchgear',
  '10kA breaking capacity miniature circuit breaker engineered for factory distribution boards and motor protection.',
  1250,
  20,
  'Units',
  '🔌',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'buildmax-readymix-construction-chennai' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'construction' LIMIT 1),
  'M25 Grade Certified Ready-Mix Concrete (RMC)',
  'm25-grade-ready-mix-concrete',
  'Factory batch-mixed concrete tested for 28-day 25 N/mm² compressive strength with automated transit mixer delivery.',
  3800,
  6,
  'Cubic Meters',
  '🧱',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'sri-lakshmi-traders' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'wholesalers' LIMIT 1),
  'Premium Aged 2-Year Seeraga Samba Rice',
  'aged-seeraga-samba-rice-bulk',
  'Traditional aromatic small-grain biryani rice directly sourced from Thanjavur delta farmers with zero polishing chemicals.',
  135,
  50,
  'Kg Bags',
  '🌾',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'surat-diamond-cutting-jewelry' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'manufacturers' LIMIT 1),
  '1.00 Carat IGI Certified CVD Round Brilliant Diamond',
  '1-carat-igi-cvd-diamond',
  'E Color, VVS1 Clarity, Ideal cut lab-grown diamond verified with laser inscription and international IGI certificate.',
  28500,
  1,
  'Piece',
  '💎',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'ahmedabad-fabric-textile-mills' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'clothing' LIMIT 1),
  '100% Giza Cotton Dyed Twill Shirting Fabric',
  'giza-cotton-shirting-fabric',
  '60s count double ply mercerized Egyptian cotton shirting textiles in over 50 classic yarn-dyed corporate patterns.',
  280,
  100,
  'Meters',
  '🧵',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'lucknow-chikankari-handloom-emporium' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'clothing' LIMIT 1),
  'Handcrafted Lucknowi Chikan Silk Kurta Set',
  'handcrafted-lucknowi-chikan-kurta',
  'Exquisite shadow-work and Bakhiya stitch embroidery by master artisans with matching silk churidar and dupatta.',
  3499,
  10,
  'Sets',
  '🥻',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'kolkata-heritage-sweets-confectionery' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'restaurants' LIMIT 1),
  'Traditional Nolen Gur Baked Rasgulla Gift Box',
  'nolen-gur-rasgulla-gift-box',
  'Fresh cottage cheese dumplings poached in seasonal date-palm jaggery syrup. Shipped in airtight travel tins.',
  420,
  5,
  'Boxes',
  '🍯',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'madurai-traditional-gold-jewellers' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'clothing' LIMIT 1),
  '22K Traditional Temple Gold Nakshi Bridal Necklace',
  '22k-temple-gold-necklace',
  'Intricate handmade goddess motif jewelry embedded with natural uncut Burmese rubies and emerald drops.',
  285000,
  1,
  'Set',
  '💍',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'bangalore-habitat-interior-design' LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = 'furniture' LIMIT 1),
  'Custom Acrylic Gloss Modular Kitchen Island Suite',
  'custom-acrylic-modular-kitchen',
  'Marine-grade BWP plywood carcass fitted with Blum soft-close tandem drawers and quartz antibacterial countertops.',
  185000,
  1,
  'Kitchen',
  '🏡',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;

-- 6. SEED SERVICES (Professional & Consumer Packages)
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'chennai-tech-solutions' LIMIT 1),
  'Full-Stack Web & Mobile App Development',
  'full-stack-web-mobile-app',
  'End-to-end agile product engineering using Next.js, React Native, Node.js, and PostgreSQL with CI/CD deployment.',
  45000,
  'starting_from'::price_type,
  '💻',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'chennai-tech-solutions' LIMIT 1),
  'Enterprise Cloud Infrastructure & DevOps Migration',
  'enterprise-cloud-devops-migration',
  'Zero-downtime AWS & Google Cloud migrations, Kubernetes container orchestration, and 24x7 infrastructure monitoring.',
  35000,
  'starting_from'::price_type,
  '☁️',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'kochi-digital-performance-hub' LIMIT 1),
  'Omnichannel B2B Lead Generation & SEO Retainer',
  'b2b-lead-generation-seo',
  'Guaranteed top 3 Google local map rankings, high-intent Google Search PPC ad campaigns, and LinkedIn B2B funnels.',
  25000,
  'starting_from'::price_type,
  '📈',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'sungrid-solar-power-bangalore' LIMIT 1),
  'Turnkey Rooftop Solar Net-Metering Installation',
  'turnkey-rooftop-solar-installation',
  'Site shadow engineering, government subsidy processing, DISCOM net-meter inspection, and 25-year performance monitoring.',
  85000,
  'starting_from'::price_type,
  '☀️',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'apollo-lifeline-clinic-coimbatore' LIMIT 1),
  'Comprehensive Executive Health Checkup & Diagnostics',
  'executive-health-checkup-diagnostics',
  '65 vital parameters including 2D Echo, Treadmill TMT, full body ultrasound, liver profile, and specialist cardiologist review.',
  3999,
  'fixed'::price_type,
  '🏥',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'bangalore-elite-chartered-accountants' LIMIT 1),
  'Corporate Startup Incorporation & Statutory Tax Filing',
  'startup-incorporation-tax-filing',
  'Private limited incorporation, DPIIT recognition, GST filing, ROC annual compliance, and payroll accounting advisory.',
  14999,
  'fixed'::price_type,
  '💼',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'pune-safemove-packers-movers' LIMIT 1),
  'Interstate 5-Layer Household Moving & Vehicle Transport',
  'interstate-household-moving',
  'Door-to-door packing with dedicated bubble wrap, wooden crating for appliances, transit insurance, and GPS tracking.',
  12000,
  'starting_from'::price_type,
  '🚚',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'chennai-fastcool-ac-service-hvac' LIMIT 1),
  'Commercial Central AC VRV/VRF Annual Maintenance (AMC)',
  'commercial-ac-vrf-amc',
  'Comprehensive quarterly coil chemical wash, refrigerant pressure optimization, motor lubrication, and 2-hour breakdown support.',
  8500,
  'starting_from'::price_type,
  '❄️',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'mumbai-glamour-bridal-studio-spa' LIMIT 1),
  'Luxury Bridal HD Airbrush Makeup & Hair Design',
  'luxury-bridal-hd-airbrush-makeup',
  'International premium cosmetics (Huda, Dior, MAC), personalized trial makeup, hair extensions, and bridal saree draping.',
  22000,
  'fixed'::price_type,
  '💄',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;
INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = 'bangalore-habitat-interior-design' LIMIT 1),
  'Turnkey 3D Architectural Villa Interior Design Fit-out',
  'turnkey-villa-interior-fitout',
  'Complete 3D photorealistic visualization, custom carpentry, lighting automation, Italian marble flooring, and handover in 45 days.',
  150000,
  'starting_from'::price_type,
  '🏡',
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;

-- 7. SEED REVIEWS
INSERT INTO public.reviews (
  customer_id, business_id, rating, title, comment, status
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM public.businesses WHERE slug = 'chennai-tech-solutions' LIMIT 1),
  5,
  'Exceptional Cloud & Web Engineering Team',
  'Chennai Tech Solutions engineered our SaaS portal from scratch in Next.js and delivered two weeks ahead of schedule. Outstanding code quality, responsive bug fixes, and seamless communication.',
  'approved'::review_status
);
INSERT INTO public.reviews (
  customer_id, business_id, rating, title, comment, status
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM public.businesses WHERE slug = 'chennai-tech-solutions' LIMIT 1),
  5,
  'Flawless AWS Cloud Migration',
  'Migrated our legacy database with zero customer downtime. Their DevOps architects are top notch.',
  'approved'::review_status
);
INSERT INTO public.reviews (
  customer_id, business_id, rating, title, comment, status
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM public.businesses WHERE slug = 'sri-lakshmi-traders' LIMIT 1),
  5,
  'Reliable Bulk FMCG Supplier',
  'We run 4 grocery supermarkets in Chennai. Sri Lakshmi Traders consistently gives the most transparent pricing and prompt doorstep deliveries.',
  'approved'::review_status
);
INSERT INTO public.reviews (
  customer_id, business_id, rating, title, comment, status
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM public.businesses WHERE slug = 'royal-chettinad-spice-restaurant' LIMIT 1),
  5,
  'Best Chettinad Biryani in Tamil Nadu',
  'Unbelievable aroma and authentic spice balance. The mutton sukka and filter coffee were world class. Must visit with family!',
  'approved'::review_status
);
INSERT INTO public.reviews (
  customer_id, business_id, rating, title, comment, status
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM public.businesses WHERE slug = 'apollo-lifeline-clinic-coimbatore' LIMIT 1),
  5,
  'Superb Medical Care & Fast Diagnostics',
  'Brought my mother for a cardiac checkup. The doctors took time to explain test reports in detail. Very clean hospital and polite nurses.',
  'approved'::review_status
);
INSERT INTO public.reviews (
  customer_id, business_id, rating, title, comment, status
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM public.businesses WHERE slug = 'sungrid-solar-power-bangalore' LIMIT 1),
  5,
  'Cut our factory electricity bill by 75%',
  'SunGrid installed a 120kW rooftop solar plant on our Peenya factory. Net-metering approval was handled end-to-end smoothly.',
  'approved'::review_status
);
INSERT INTO public.reviews (
  customer_id, business_id, rating, title, comment, status
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM public.businesses WHERE slug = 'tiruppur-export-cotton-garments' LIMIT 1),
  5,
  'Best Quality Export Cotton Tees',
  'Ordered 600 custom branded round neck t-shirts for our annual tech summit. Soft combed fabric and vibrant screen printing.',
  'approved'::review_status
);
INSERT INTO public.reviews (
  customer_id, business_id, rating, title, comment, status
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM public.businesses WHERE slug = 'kochi-digital-performance-hub' LIMIT 1),
  5,
  'Doubled our inbound organic leads',
  'Kochi Digital Hub took us from page 4 to #1 on Google maps for commercial kitchen equipment in 90 days. Phenomenal ROI!',
  'approved'::review_status
);

-- 8. SEED HOMEPAGE PROMOTIONAL BANNERS
INSERT INTO public.banners (
  title, subtitle, image_url, button_text, button_url, is_active, sort_order
) VALUES (
  'Grow Your Business with India''s Most Trusted Local Directory',
  'Connect directly with verified manufacturers, retail customers, and commercial partners across 15+ major cities.',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
  'List Your Business Free',
  '/local-biz/add-business',
  true,
  1
);
INSERT INTO public.banners (
  title, subtitle, image_url, button_text, button_url, is_active, sort_order
) VALUES (
  'Looking for Bulk Wholesale Suppliers?',
  'Submit your requirement once and get competitive quotes directly from verified GST registered suppliers.',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  'Post Requirement',
  '/local-biz/enquiry',
  true,
  2
);
