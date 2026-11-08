-- ====================================================================
-- SEED 02: 28 States & 8 Union Territories of India
-- ====================================================================

DO $$
DECLARE
    india_id UUID := '00000000-0000-0000-0000-000000000091';
BEGIN

-- 28 States
INSERT INTO geo.administrative_units (country_id, parent_id, level_id, official_code, name, slug, type, display_order)
VALUES
(india_id, NULL, 1, 'IN-AP', 'Andhra Pradesh', 'andhra-pradesh', 'state', 1),
(india_id, NULL, 1, 'IN-AR', 'Arunachal Pradesh', 'arunachal-pradesh', 'state', 2),
(india_id, NULL, 1, 'IN-AS', 'Assam', 'assam', 'state', 3),
(india_id, NULL, 1, 'IN-BR', 'Bihar', 'bihar', 'state', 4),
(india_id, NULL, 1, 'IN-CT', 'Chhattisgarh', 'chhattisgarh', 'state', 5),
(india_id, NULL, 1, 'IN-GA', 'Goa', 'goa', 'state', 6),
(india_id, NULL, 1, 'IN-GJ', 'Gujarat', 'gujarat', 'state', 7),
(india_id, NULL, 1, 'IN-HR', 'Haryana', 'haryana', 'state', 8),
(india_id, NULL, 1, 'IN-HP', 'Himachal Pradesh', 'himachal-pradesh', 'state', 9),
(india_id, NULL, 1, 'IN-JH', 'Jharkhand', 'jharkhand', 'state', 10),
(india_id, NULL, 1, 'IN-KA', 'Karnataka', 'karnataka', 'state', 11),
(india_id, NULL, 1, 'IN-KL', 'Kerala', 'kerala', 'state', 12),
(india_id, NULL, 1, 'IN-MP', 'Madhya Pradesh', 'madhya-pradesh', 'state', 13),
(india_id, NULL, 1, 'IN-MH', 'Maharashtra', 'maharashtra', 'state', 14),
(india_id, NULL, 1, 'IN-MN', 'Manipur', 'manipur', 'state', 15),
(india_id, NULL, 1, 'IN-ML', 'Meghalaya', 'meghalaya', 'state', 16),
(india_id, NULL, 1, 'IN-MZ', 'Mizoram', 'mizoram', 'state', 17),
(india_id, NULL, 1, 'IN-NL', 'Nagaland', 'nagaland', 'state', 18),
(india_id, NULL, 1, 'IN-OR', 'Odisha', 'odisha', 'state', 19),
(india_id, NULL, 1, 'IN-PB', 'Punjab', 'punjab', 'state', 20),
(india_id, NULL, 1, 'IN-RJ', 'Rajasthan', 'rajasthan', 'state', 21),
(india_id, NULL, 1, 'IN-SK', 'Sikkim', 'sikkim', 'state', 22),
(india_id, NULL, 1, 'IN-TN', 'Tamil Nadu', 'tamil-nadu', 'state', 23),
(india_id, NULL, 1, 'IN-TG', 'Telangana', 'telangana', 'state', 24),
(india_id, NULL, 1, 'IN-TR', 'Tripura', 'tripura', 'state', 25),
(india_id, NULL, 1, 'IN-UP', 'Uttar Pradesh', 'uttar-pradesh', 'state', 26),
(india_id, NULL, 1, 'IN-UT', 'Uttarakhand', 'uttarakhand', 'state', 27),
(india_id, NULL, 1, 'IN-WB', 'West Bengal', 'west-bengal', 'state', 28),

-- 8 Union Territories
(india_id, NULL, 1, 'IN-AN', 'Andaman and Nicobar Islands', 'andaman-and-nicobar-islands', 'ut', 29),
(india_id, NULL, 1, 'IN-CH', 'Chandigarh', 'chandigarh', 'ut', 30),
(india_id, NULL, 1, 'IN-DH', 'Dadra and Nagar Haveli and Daman and Diu', 'dadra-and-nagar-haveli-and-daman-and-diu', 'ut', 31),
(india_id, NULL, 1, 'IN-DL', 'Delhi', 'delhi', 'ut', 32),
(india_id, NULL, 1, 'IN-JK', 'Jammu and Kashmir', 'jammu-and-kashmir', 'ut', 33),
(india_id, NULL, 1, 'IN-LA', 'Ladakh', 'ladakh', 'ut', 34),
(india_id, NULL, 1, 'IN-LD', 'Lakshadweep', 'lakshadweep', 'ut', 35),
(india_id, NULL, 1, 'IN-PY', 'Puducherry', 'puducherry', 'ut', 36)
ON CONFLICT (country_id, level_id, slug) DO UPDATE SET
    name = EXCLUDED.name,
    official_code = EXCLUDED.official_code,
    type = EXCLUDED.type;

END $$;
