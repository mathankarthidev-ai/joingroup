-- ====================================================================
-- MIGRATION 0007: Identity User Profiles
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- ====================================================================

CREATE TABLE IF NOT EXISTS identity.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    full_name VARCHAR(150),
    phone VARCHAR(20),
    phone_verified BOOLEAN NOT NULL DEFAULT FALSE,
    avatar_url TEXT,
    preferred_locale VARCHAR(10) NOT NULL DEFAULT 'en-IN',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    last_login_at TIMESTAMPTZ,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON identity.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON identity.profiles(phone);

CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON identity.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE identity.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
ON identity.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON identity.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Public can view limited profile metadata"
ON identity.profiles FOR SELECT
USING (is_active = TRUE);
