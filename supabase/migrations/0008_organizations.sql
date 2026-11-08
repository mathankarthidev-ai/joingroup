-- ====================================================================
-- MIGRATION 0008: Merchant & Business Organizations
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- ====================================================================

CREATE TABLE IF NOT EXISTS identity.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    legal_name VARCHAR(255),
    slug VARCHAR(220) NOT NULL UNIQUE,
    gstin VARCHAR(20),
    pan VARCHAR(15),
    website_url TEXT,
    support_email VARCHAR(255),
    support_phone VARCHAR(20),
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    verification_tier VARCHAR(50) NOT NULL DEFAULT 'standard', -- 'standard', 'gold_verified', 'enterprise'
    created_by UUID REFERENCES identity.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_organizations_slug ON identity.organizations(slug);

CREATE TRIGGER trg_organizations_updated_at
BEFORE UPDATE ON identity.organizations
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE identity.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for verified organizations"
ON identity.organizations FOR SELECT
USING (TRUE);
