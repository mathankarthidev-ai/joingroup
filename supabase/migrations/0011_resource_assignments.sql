-- ====================================================================
-- MIGRATION 0011: Resource Scope Assignments
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- Scopes moderation & management to specific states, districts, or categories
-- ====================================================================

CREATE TABLE IF NOT EXISTS identity.resource_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES identity.profiles(id) ON DELETE CASCADE,
    role_id VARCHAR(50) NOT NULL REFERENCES identity.roles(id) ON DELETE CASCADE,
    scope_type VARCHAR(50) NOT NULL, -- 'country', 'state', 'district', 'category'
    scope_id UUID, -- References administrative_unit.id or category.id
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    CONSTRAINT uq_resource_assignment UNIQUE (profile_id, role_id, scope_type, scope_id)
);

CREATE INDEX IF NOT EXISTS idx_resource_scope ON identity.resource_assignments(profile_id, scope_type, scope_id);

ALTER TABLE identity.resource_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Moderators can view their own resource scope"
ON identity.resource_assignments FOR SELECT
USING (auth.uid() = profile_id);
