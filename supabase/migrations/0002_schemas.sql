-- ====================================================================
-- MIGRATION 0002: Domain Database Schemas
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- Defines 11 logically separated domain schemas for Modular Monolith
-- ====================================================================

-- 1. Identity: Users, organizations, memberships, RBAC & permissions
CREATE SCHEMA IF NOT EXISTS identity;

-- 2. Geography: Global countries, administrative hierarchy, aliases & postcodes
CREATE SCHEMA IF NOT EXISTS geo;

-- 3. Catalog: Industry taxonomy, categories, subcategories & standard services
CREATE SCHEMA IF NOT EXISTS catalog;

-- 4. Directory: Businesses, branches, operating hours, media, verified professionals
CREATE SCHEMA IF NOT EXISTS directory;

-- 5. Community: JoinGroupLinks community groups, platforms, lifecycle & link checks
CREATE SCHEMA IF NOT EXISTS community;

-- 6. Commerce: B2B wholesale enquiries, leads, plans, subscriptions, immutable financial ledger
CREATE SCHEMA IF NOT EXISTS commerce;

-- 7. Marketing: Advertising campaigns, placements, ad impressions & click events
CREATE SCHEMA IF NOT EXISTS marketing;

-- 8. Trust: Ratings, customer reviews, moderation cases, fraud reports & safety desk
CREATE SCHEMA IF NOT EXISTS trust;

-- 9. Intelligence: AI prompt logs, token usage, search analytics & recommendations
CREATE SCHEMA IF NOT EXISTS intelligence;

-- 10. Operations: System settings, administrative audit trails, health monitors
CREATE SCHEMA IF NOT EXISTS operations;

-- Grants for standard Supabase application roles
DO $$
DECLARE
    s text;
    schemas text[] := ARRAY['identity', 'geo', 'catalog', 'directory', 'community', 'commerce', 'marketing', 'trust', 'intelligence', 'operations'];
BEGIN
    FOREACH s IN ARRAY schemas LOOP
        EXECUTE format('GRANT USAGE ON SCHEMA %I TO anon, authenticated, service_role;', s);
        EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT ALL ON TABLES TO postgres, service_role;', s);
        EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO authenticated;', s);
        EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT SELECT ON TABLES TO anon;', s);
    END LOOP;
END $$;
