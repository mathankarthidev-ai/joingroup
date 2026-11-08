-- ====================================================================
-- SEED 01: Countries Foundation (India Primary)
-- ====================================================================

INSERT INTO geo.countries (
    id, iso_alpha2, iso_alpha3, iso_numeric, name, official_name, currency_code, currency_symbol, phone_prefix, primary_language, latitude, longitude
) VALUES (
    '00000000-0000-0000-0000-000000000091',
    'IN',
    'IND',
    '356',
    'India',
    'Republic of India',
    'INR',
    '₹',
    '+91',
    'en-IN',
    20.5936840,
    78.9628800
) ON CONFLICT (iso_alpha2) DO UPDATE SET
    currency_code = EXCLUDED.currency_code,
    currency_symbol = EXCLUDED.currency_symbol,
    phone_prefix = EXCLUDED.phone_prefix;
