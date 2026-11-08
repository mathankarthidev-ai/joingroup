-- ====================================================================
-- MIGRATION 0006: Location Metadata: Aliases, Translations, Postcodes
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- ====================================================================

-- 1. Location Aliases (e.g. CBE -> Coimbatore, Bangalore -> Bengaluru, Bombay -> Mumbai)
CREATE TABLE IF NOT EXISTS geo.location_aliases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES geo.administrative_units(id) ON DELETE CASCADE,
    alias VARCHAR(150) NOT NULL,
    is_common_abbreviation BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_location_alias UNIQUE (unit_id, alias)
);

CREATE INDEX IF NOT EXISTS idx_location_alias_search ON geo.location_aliases USING gin (alias gin_trgm_ops);

-- 2. Location Regional Translations (Tamil, Hindi, Kannada, Telugu, Malayalam)
CREATE TABLE IF NOT EXISTS geo.location_translations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES geo.administrative_units(id) ON DELETE CASCADE,
    locale VARCHAR(10) NOT NULL, -- e.g. 'ta-IN', 'hi-IN', 'kn-IN'
    name VARCHAR(200) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_location_translation UNIQUE (unit_id, locale)
);

CREATE INDEX IF NOT EXISTS idx_location_translations_locale ON geo.location_translations(locale, unit_id);

-- 3. Postcodes / Indian 6-Digit PIN Codes
CREATE TABLE IF NOT EXISTS geo.postcodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID NOT NULL REFERENCES geo.countries(id) ON DELETE RESTRICT,
    unit_id UUID NOT NULL REFERENCES geo.administrative_units(id) ON DELETE CASCADE,
    postcode VARCHAR(20) NOT NULL,
    area_name VARCHAR(150),
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_country_postcode UNIQUE (country_id, postcode, area_name)
);

CREATE INDEX IF NOT EXISTS idx_postcodes_lookup ON geo.postcodes(postcode);
CREATE INDEX IF NOT EXISTS idx_postcodes_unit ON geo.postcodes(unit_id);

-- Enable RLS
ALTER TABLE geo.location_aliases ENABLE ROW LEVEL SECURITY;
ALTER TABLE geo.location_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE geo.postcodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read location aliases" ON geo.location_aliases FOR SELECT USING (TRUE);
CREATE POLICY "Public read location translations" ON geo.location_translations FOR SELECT USING (TRUE);
CREATE POLICY "Public read postcodes" ON geo.postcodes FOR SELECT USING (TRUE);
