import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedDataPath = path.resolve(__dirname, '../src/lib/local-biz/seed-data.ts');
const rawTs = fs.readFileSync(seedDataPath, 'utf8');

// Helper to escape SQL single quotes
function esc(str) {
  if (str === null || str === undefined) return 'NULL';
  return `'${String(str).replace(/'/g, "''")}'`;
}

// Extract objects using simple evaluations
// Since seed-data.ts has TypeScript types, we can strip the types and evaluate in a VM or parse
const jsCode = rawTs
  .replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '')
  .replace(/export\s+const\s+/g, 'const ')
  .replace(/:\s*City\[\]/g, '')
  .replace(/:\s*Category\[\]/g, '')
  .replace(/:\s*Subcategory\[\]/g, '')
  .replace(/:\s*Business\[\]/g, '')
  .replace(/:\s*Product\[\]/g, '')
  .replace(/:\s*Service\[\]/g, '')
  .replace(/:\s*Review\[\]/g, '')
  .replace(/:\s*Banner\[\]/g, '');

const sandbox = {};
const fn = new Function('exports', jsCode + '; return { SEED_CITIES, SEED_CATEGORIES, SEED_SUBCATEGORIES, SEED_BUSINESSES, SEED_PRODUCTS, SEED_SERVICES, SEED_REVIEWS, SEED_BANNERS };');
const data = fn(sandbox);

const {
  SEED_CITIES,
  SEED_CATEGORIES,
  SEED_SUBCATEGORIES,
  SEED_BUSINESSES,
  SEED_PRODUCTS,
  SEED_SERVICES,
  SEED_REVIEWS,
  SEED_BANNERS,
} = data;

console.log(`Parsed ${SEED_CITIES.length} cities, ${SEED_CATEGORIES.length} categories, ${SEED_BUSINESSES.length} businesses, ${SEED_PRODUCTS.length} products, ${SEED_SERVICES.length} services`);

let sql = `-- ====================================================================
-- LOCAL BIZ: Complete Seed Data for Production Supabase PostgreSQL
-- 15 Indian Cities, 20 Categories, 20 Subcategories, 30 Verified Businesses,
-- 15 Products, 10 Services, Reviews, and Homepage Promotional Banners
-- ====================================================================

-- 1. SEED CITIES (15 Major Indian Metro Centers)
`;

for (const c of SEED_CITIES) {
  sql += `INSERT INTO public.cities (name, slug, state, country, is_active)
VALUES (${esc(c.name)}, ${esc(c.slug)}, ${esc(c.state)}, ${esc(c.country)}, true)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, state = EXCLUDED.state;\n`;
}

sql += `\n-- 2. SEED CATEGORIES (20 Key Commercial Sectors)\n`;
for (const cat of SEED_CATEGORIES) {
  sql += `INSERT INTO public.categories (name, slug, description, icon, is_active, sort_order)
VALUES (${esc(cat.name)}, ${esc(cat.slug)}, ${esc(cat.description)}, ${esc(cat.icon)}, true, ${cat.sort_order || 0})
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, icon = EXCLUDED.icon;\n`;
}

sql += `\n-- 3. SEED SUBCATEGORIES\n`;
for (const sub of SEED_SUBCATEGORIES) {
  const catSlug = sub.category_id.replace('cat-', '');
  // Map category id to slug
  const cat = SEED_CATEGORIES.find(c => c.id === sub.category_id);
  const matchedSlug = cat ? cat.slug : 'restaurants';
  sql += `INSERT INTO public.subcategories (category_id, name, slug, is_active)
SELECT id, ${esc(sub.name)}, ${esc(sub.slug)}, true
FROM public.categories WHERE slug = ${esc(matchedSlug)}
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name;\n`;
}

sql += `\n-- 4. SEED BUSINESSES (30 Verified Indian Enterprises Across All 15 Cities)\n`;
for (const b of SEED_BUSINESSES) {
  const city = SEED_CITIES.find(c => c.id === b.city_id);
  const citySlug = city ? city.slug : 'chennai';
  const cat = SEED_CATEGORIES.find(c => c.id === b.category_id);
  const catSlug = cat ? cat.slug : 'it-services';

  sql += `INSERT INTO public.businesses (
  name, slug, description, short_description, logo_url, cover_image_url,
  phone, whatsapp, email, website, address, area,
  city_id, state, pincode, category_id, business_type,
  year_established, gst_number, status, verification_status, is_featured, is_active,
  rating, reviews_count
) VALUES (
  ${esc(b.name)},
  ${esc(b.slug)},
  ${esc(b.description)},
  ${esc(b.short_description)},
  ${esc(b.logo_url)},
  ${esc(b.cover_image_url)},
  ${esc(b.phone)},
  ${esc(b.whatsapp)},
  ${esc(b.email)},
  ${esc(b.website)},
  ${esc(b.address)},
  ${esc(b.area)},
  (SELECT id FROM public.cities WHERE slug = ${esc(citySlug)} LIMIT 1),
  ${esc(b.state)},
  ${esc(b.pincode)},
  (SELECT id FROM public.categories WHERE slug = ${esc(catSlug)} LIMIT 1),
  ${esc(b.business_type)},
  ${b.year_established || 2020},
  ${esc(b.gst_number)},
  ${esc(b.status || 'approved')}::business_status,
  ${esc(b.verification_status || 'verified')}::verification_status,
  ${b.is_featured ? 'true' : 'false'},
  true,
  ${b.rating || 4.8},
  ${b.reviews_count || 42}
) ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  whatsapp = EXCLUDED.whatsapp,
  address = EXCLUDED.address,
  rating = EXCLUDED.rating;\n\n`;
}

sql += `\n-- 5. SEED PRODUCTS (B2B Marketplace Items)\n`;
for (const p of SEED_PRODUCTS) {
  const b = SEED_BUSINESSES.find(biz => biz.id === p.business_id);
  const bSlug = b ? b.slug : 'chennai-tech-solutions';
  const cat = SEED_CATEGORIES.find(c => c.id === p.category_id);
  const catSlug = cat ? cat.slug : 'clothing';

  sql += `INSERT INTO public.products (
  business_id, category_id, name, slug, description, price, min_order_quantity, unit, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = ${esc(bSlug)} LIMIT 1),
  (SELECT id FROM public.categories WHERE slug = ${esc(catSlug)} LIMIT 1),
  ${esc(p.name)},
  ${esc(p.slug)},
  ${esc(p.description)},
  ${p.price || 0},
  ${p.min_order_quantity || 1},
  ${esc(p.unit || 'Piece')},
  ${esc(p.image_url)},
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;\n`;
}

sql += `\n-- 6. SEED SERVICES (Professional & Consumer Packages)\n`;
for (const s of SEED_SERVICES) {
  const b = SEED_BUSINESSES.find(biz => biz.id === s.business_id);
  const bSlug = b ? b.slug : 'chennai-tech-solutions';

  sql += `INSERT INTO public.services (
  business_id, name, slug, description, price, price_type, image_url, is_active
) VALUES (
  (SELECT id FROM public.businesses WHERE slug = ${esc(bSlug)} LIMIT 1),
  ${esc(s.name)},
  ${esc(s.slug)},
  ${esc(s.description)},
  ${s.price || 0},
  ${esc(s.price_type || 'fixed')}::price_type,
  ${esc(s.image_url)},
  true
) ON CONFLICT (business_id, slug) DO UPDATE SET price = EXCLUDED.price, description = EXCLUDED.description;\n`;
}

sql += `\n-- 7. SEED REVIEWS\n`;
for (const r of SEED_REVIEWS) {
  const b = SEED_BUSINESSES.find(biz => biz.id === r.business_id);
  const bSlug = b ? b.slug : 'chennai-tech-solutions';

  sql += `INSERT INTO public.reviews (
  customer_id, business_id, rating, title, comment, status
) VALUES (
  uuid_generate_v4(),
  (SELECT id FROM public.businesses WHERE slug = ${esc(bSlug)} LIMIT 1),
  ${r.rating || 5},
  ${esc(r.title)},
  ${esc(r.comment)},
  'approved'::review_status
);\n`;
}

sql += `\n-- 8. SEED HOMEPAGE PROMOTIONAL BANNERS\n`;
for (const ban of SEED_BANNERS) {
  sql += `INSERT INTO public.banners (
  title, subtitle, image_url, button_text, button_url, is_active, sort_order
) VALUES (
  ${esc(ban.title)},
  ${esc(ban.subtitle)},
  ${esc(ban.image_url)},
  ${esc(ban.button_text)},
  ${esc(ban.button_url)},
  true,
  ${ban.sort_order || 1}
);\n`;
}

fs.writeFileSync(path.resolve(__dirname, '../supabase/seed.sql'), sql, 'utf8');
console.log('Successfully wrote supabase/seed.sql');

// Also generate full schema + seed combined file
const schemaPath = path.resolve(__dirname, '../supabase/migrations/20261005_init_local_biz.sql');
const schemaSql = fs.readFileSync(schemaPath, 'utf8');
const fullSql = schemaSql + '\n\n-- ====================================================================\n-- SEED DATA SECTION\n-- ====================================================================\n\n' + sql;

fs.writeFileSync(path.resolve(__dirname, '../supabase/full_schema_and_seed.sql'), fullSql, 'utf8');
console.log('Successfully wrote supabase/full_schema_and_seed.sql');
