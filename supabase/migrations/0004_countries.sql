-- ====================================================================
-- MIGRATION 0004: Global Countries Reference Table
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- ====================================================================

CREATE TABLE IF NOT EXISTS geo.countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    iso_alpha2 VARCHAR(2) NOT NULL UNIQUE,
    iso_alpha3 VARCHAR(3) NOT NULL UNIQUE,
    iso_numeric VARCHAR(3) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    official_name VARCHAR(255),
    currency_code VARCHAR(3) NOT NULL DEFAULT 'INR',
    currency_symbol VARCHAR(10) NOT NULL DEFAULT '₹',
    phone_prefix VARCHAR(10) NOT NULL DEFAULT '+91',
    primary_language VARCHAR(10) NOT NULL DEFAULT 'en-IN',
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexing for fast lookups
CREATE INDEX IF NOT EXISTS idx_countries_alpha2 ON geo.countries(iso_alpha2);
CREATE INDEX IF NOT EXISTS idx_countries_is_active ON geo.countries(is_active);

-- Trigger for updated_at
CREATE TRIGGER trg_countries_updated_at
BEFORE UPDATE ON geo.countries
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS: Read-only for public/anon, management for service_role
ALTER TABLE geo.countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read-only access for countries"
ON geo.countries FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "Service role full access on countries"
ON geo.countries FOR ALL
TO service_role
USING (TRUE)
WITH CHECK (TRUE);
