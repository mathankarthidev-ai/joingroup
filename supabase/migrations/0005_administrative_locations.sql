-- ====================================================================
-- MIGRATION 0005: Administrative Location Hierarchy
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- Supports: State -> District -> Taluk -> Village hierarchy for India & Global
-- ====================================================================

-- 1. Administrative Levels (Level 1 = State/UT, Level 2 = District, Level 3 = Taluk, Level 4 = Village/Ward)
CREATE TABLE IF NOT EXISTS geo.administrative_levels (
    id SMALLINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

INSERT INTO geo.administrative_levels (id, name, description) VALUES
(1, 'State / Union Territory', 'Primary sub-national territorial division (e.g. Tamil Nadu, Karnataka)'),
(2, 'District / County', 'Primary administrative district (e.g. Coimbatore, Madurai, Bengaluru Urban)'),
(3, 'Taluk / Subdistrict', 'Sub-district revenue division (e.g. Gandhipuram, OMR, Indiranagar)'),
(4, 'Village / Ward / Locality', 'Local neighborhood or municipal village unit')
ON CONFLICT (id) DO NOTHING;

-- 2. Flexible Administrative Units with self-referencing parent_id
CREATE TABLE IF NOT EXISTS geo.administrative_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID NOT NULL REFERENCES geo.countries(id) ON DELETE RESTRICT,
    parent_id UUID REFERENCES geo.administrative_units(id) ON DELETE CASCADE,
    level_id SMALLINT NOT NULL REFERENCES geo.administrative_levels(id),
    official_code VARCHAR(50),
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL,
    type VARCHAR(50) NOT NULL DEFAULT 'state', -- 'state', 'ut', 'district', 'taluk', 'village'
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    display_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_admin_unit_slug UNIQUE (country_id, level_id, slug)
);

-- Indices for rapid filtering across 20L records
CREATE INDEX IF NOT EXISTS idx_admin_units_parent ON geo.administrative_units(parent_id);
CREATE INDEX IF NOT EXISTS idx_admin_units_level ON geo.administrative_units(level_id);
CREATE INDEX IF NOT EXISTS idx_admin_units_name_trgm ON geo.administrative_units USING gin (name gin_trgm_ops);
CREATE INDEX IF NOT EXISTS idx_admin_units_country_active ON geo.administrative_units(country_id, is_active);

-- Trigger for updated_at
CREATE TRIGGER trg_admin_units_updated_at
BEFORE UPDATE ON geo.administrative_units
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS: Read-only for public, management for service_role
ALTER TABLE geo.administrative_units ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access for active administrative units"
ON geo.administrative_units FOR SELECT
USING (is_active = TRUE);

CREATE POLICY "Service role full access on administrative units"
ON geo.administrative_units FOR ALL
TO service_role
USING (TRUE)
WITH CHECK (TRUE);
