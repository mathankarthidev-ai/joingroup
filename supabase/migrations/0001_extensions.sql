-- ====================================================================
-- MIGRATION 0001: PostgreSQL Database Extensions
-- Schema: system / public
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- ====================================================================

-- 1. UUID generation for universally unique IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Cryptographic functions for hashing & security tokens
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 3. Trigram text matching for high-performance fuzzy search & typo tolerance
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- 4. B-tree GiST indexing for composite range and exclusion constraints
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- 5. PostGIS spatial extensions for geo-radius & coordinates filtering
-- Note: Requires PostGIS on the PostgreSQL server (standard in Supabase)
DO $$
BEGIN
    CREATE EXTENSION IF NOT EXISTS "postgis";
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'PostGIS extension not available in this environment; falling back to latitude/longitude numeric indexing.';
END $$;
