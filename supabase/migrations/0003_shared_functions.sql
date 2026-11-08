-- ====================================================================
-- MIGRATION 0003: Shared Functions & Triggers
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- ====================================================================

-- 1. Automatic updated_at column maintenance trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. URL slug generator function (slugifies text with alphanumeric and hyphens)
CREATE OR REPLACE FUNCTION public.slugify(value text)
RETURNS text AS $$
DECLARE
    clean_value text;
BEGIN
    clean_value := lower(trim(value));
    clean_value := regexp_replace(clean_value, '[^a-z0-9\s-]', '', 'g');
    clean_value := regexp_replace(clean_value, '[\s-]+', '-', 'g');
    clean_value := trim(both '-' from clean_value);
    RETURN clean_value;
END;
$$ LANGUAGE plpgsql IMMUTABLE STRICT;

-- 3. Cursor pagination helper: Encodes created_at + UUID into an opaque base64 string
CREATE OR REPLACE FUNCTION public.encode_cursor(created_at timestamptz, id uuid)
RETURNS text AS $$
BEGIN
    RETURN encode(format('%s::%s', to_char(created_at, 'YYYY-MM-DD"T"HH24:MI:SS.USOF'), id)::bytea, 'base64');
END;
$$ LANGUAGE plpgsql IMMUTABLE;
