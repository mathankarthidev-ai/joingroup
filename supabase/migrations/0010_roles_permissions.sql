-- ====================================================================
-- MIGRATION 0010: RBAC Roles & Permissions
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- Note: A user can be Customer, Merchant, Group Admin, and Moderator simultaneously.
-- ====================================================================

-- 1. System Roles
CREATE TABLE IF NOT EXISTS identity.roles (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_system_role BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO identity.roles (id, name, description) VALUES
('super_admin', 'Super Administrator', 'Full platform access and root configuration'),
('state_moderator', 'State Moderator', 'Scoped community & business verification for an entire state'),
('district_moderator', 'District Moderator', 'Local district lead verification and trust desk'),
('merchant', 'Business Merchant', 'Owns and manages verified listings and service branches'),
('group_admin', 'Community Administrator', 'Manages and submits verified chat groups and channels'),
('customer', 'Verified Customer', 'Standard end-user browsing, reviewing, and contacting merchants')
ON CONFLICT (id) DO NOTHING;

-- 2. System Permissions
CREATE TABLE IF NOT EXISTS identity.permissions (
    id VARCHAR(100) PRIMARY KEY,
    module VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Role-Permission mappings
CREATE TABLE IF NOT EXISTS identity.role_permissions (
    role_id VARCHAR(50) NOT NULL REFERENCES identity.roles(id) ON DELETE CASCADE,
    permission_id VARCHAR(100) NOT NULL REFERENCES identity.permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- 4. User Role Assignments (Multi-Role Support)
CREATE TABLE IF NOT EXISTS identity.user_role_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES identity.profiles(id) ON DELETE CASCADE,
    role_id VARCHAR(50) NOT NULL REFERENCES identity.roles(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES identity.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_user_role UNIQUE (profile_id, role_id)
);

CREATE INDEX IF NOT EXISTS idx_user_role_profile ON identity.user_role_assignments(profile_id);

ALTER TABLE identity.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity.user_role_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read for system roles" ON identity.roles FOR SELECT USING (TRUE);
CREATE POLICY "Users can read their own role assignments" ON identity.user_role_assignments FOR SELECT USING (auth.uid() = profile_id);
