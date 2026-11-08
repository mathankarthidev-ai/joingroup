-- ====================================================================
-- MIGRATION 0009: Organization Membership
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- ====================================================================

CREATE TABLE IF NOT EXISTS identity.organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES identity.organizations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES identity.profiles(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'manager', -- 'owner', 'manager', 'editor', 'billing'
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_org_member UNIQUE (organization_id, profile_id)
);

CREATE INDEX IF NOT EXISTS idx_org_members_profile ON identity.organization_members(profile_id);
CREATE INDEX IF NOT EXISTS idx_org_members_org ON identity.organization_members(organization_id);

ALTER TABLE identity.organization_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Members can view their own organization membership"
ON identity.organization_members FOR SELECT
USING (auth.uid() = profile_id);
