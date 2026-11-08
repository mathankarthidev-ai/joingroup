-- ====================================================================
-- SEED 03: Indian Districts (All 28 States & 8 UTs)
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
-- ====================================================================

DO $$
DECLARE
    india_id UUID := '00000000-0000-0000-0000-000000000091';
    state_parent_id UUID;
BEGIN

    -- State/UT: Andhra Pradesh
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'andhra-pradesh';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Alluri Sitharama Raju', 'andhra-pradesh-alluri-sitharama-raju', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Anakapalli', 'andhra-pradesh-anakapalli', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ananthapuramu', 'andhra-pradesh-ananthapuramu', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Annamayya', 'andhra-pradesh-annamayya', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bapatla', 'andhra-pradesh-bapatla', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chittoor', 'andhra-pradesh-chittoor', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'East Godavari', 'andhra-pradesh-east-godavari', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Eluru', 'andhra-pradesh-eluru', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Guntur', 'andhra-pradesh-guntur', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kakinada', 'andhra-pradesh-kakinada', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Konaseema', 'andhra-pradesh-konaseema', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Krishna', 'andhra-pradesh-krishna', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kurnool', 'andhra-pradesh-kurnool', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Manyam', 'andhra-pradesh-manyam', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nandyal', 'andhra-pradesh-nandyal', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'NTR', 'andhra-pradesh-ntr', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Palnadu', 'andhra-pradesh-palnadu', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Prakasam', 'andhra-pradesh-prakasam', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sri Potti Sriramulu Nellore', 'andhra-pradesh-sri-potti-sriramulu-nellore', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sri Sathya Sai', 'andhra-pradesh-sri-sathya-sai', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Srikakulam', 'andhra-pradesh-srikakulam', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tirupati', 'andhra-pradesh-tirupati', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Visakhapatnam', 'andhra-pradesh-visakhapatnam', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Vizianagaram', 'andhra-pradesh-vizianagaram', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Godavari', 'andhra-pradesh-west-godavari', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'YSR Kadapa', 'andhra-pradesh-ysr-kadapa', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Arunachal Pradesh
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'arunachal-pradesh';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Anjaw', 'arunachal-pradesh-anjaw', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Changlang', 'arunachal-pradesh-changlang', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dibang Valley', 'arunachal-pradesh-dibang-valley', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'East Kameng', 'arunachal-pradesh-east-kameng', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'East Siang', 'arunachal-pradesh-east-siang', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kamle', 'arunachal-pradesh-kamle', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kra Daadi', 'arunachal-pradesh-kra-daadi', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kurung Kumey', 'arunachal-pradesh-kurung-kumey', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lepa Rada', 'arunachal-pradesh-lepa-rada', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lohit', 'arunachal-pradesh-lohit', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Longding', 'arunachal-pradesh-longding', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lower Dibang Valley', 'arunachal-pradesh-lower-dibang-valley', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lower Siang', 'arunachal-pradesh-lower-siang', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lower Subansiri', 'arunachal-pradesh-lower-subansiri', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Namsai', 'arunachal-pradesh-namsai', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pakke Kessang', 'arunachal-pradesh-pakke-kessang', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Papum Pare', 'arunachal-pradesh-papum-pare', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shi Yomi', 'arunachal-pradesh-shi-yomi', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Siang', 'arunachal-pradesh-siang', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tawang', 'arunachal-pradesh-tawang', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tirap', 'arunachal-pradesh-tirap', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Upper Siang', 'arunachal-pradesh-upper-siang', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Upper Subansiri', 'arunachal-pradesh-upper-subansiri', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Kameng', 'arunachal-pradesh-west-kameng', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Siang', 'arunachal-pradesh-west-siang', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Assam
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'assam';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Baksa', 'assam-baksa', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Barpeta', 'assam-barpeta', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Biswanath', 'assam-biswanath', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bongaigaon', 'assam-bongaigaon', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Cachar', 'assam-cachar', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Charaideo', 'assam-charaideo', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chirang', 'assam-chirang', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Darrang', 'assam-darrang', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dhemaji', 'assam-dhemaji', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dhubri', 'assam-dhubri', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dibrugarh', 'assam-dibrugarh', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dima Hasao', 'assam-dima-hasao', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Goalpara', 'assam-goalpara', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Golaghat', 'assam-golaghat', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hailakandi', 'assam-hailakandi', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hojai', 'assam-hojai', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jorhat', 'assam-jorhat', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kamrup', 'assam-kamrup', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kamrup Metropolitan', 'assam-kamrup-metropolitan', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Karbi Anglong', 'assam-karbi-anglong', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Karimganj', 'assam-karimganj', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kokrajhar', 'assam-kokrajhar', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lakhimpur', 'assam-lakhimpur', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Majuli', 'assam-majuli', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Morigaon', 'assam-morigaon', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nagaon', 'assam-nagaon', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nalbari', 'assam-nalbari', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sivasagar', 'assam-sivasagar', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sonitpur', 'assam-sonitpur', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South Salmara-Mankachar', 'assam-south-salmara-mankachar', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tinsukia', 'assam-tinsukia', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Udalguri', 'assam-udalguri', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Karbi Anglong', 'assam-west-karbi-anglong', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Bihar
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'bihar';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Araria', 'bihar-araria', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Arwal', 'bihar-arwal', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Aurangabad', 'bihar-aurangabad', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Banka', 'bihar-banka', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Begusarai', 'bihar-begusarai', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhagalpur', 'bihar-bhagalpur', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhojpur', 'bihar-bhojpur', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Buxar', 'bihar-buxar', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Darbhanga', 'bihar-darbhanga', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'East Champaran', 'bihar-east-champaran', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gaya', 'bihar-gaya', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gopalganj', 'bihar-gopalganj', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jamui', 'bihar-jamui', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jehanabad', 'bihar-jehanabad', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kaimur', 'bihar-kaimur', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Katihar', 'bihar-katihar', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khagaria', 'bihar-khagaria', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kishanganj', 'bihar-kishanganj', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lakhisarai', 'bihar-lakhisarai', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Madhepura', 'bihar-madhepura', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Madhubani', 'bihar-madhubani', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Munger', 'bihar-munger', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Muzaffarpur', 'bihar-muzaffarpur', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nalanda', 'bihar-nalanda', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nawada', 'bihar-nawada', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Patna', 'bihar-patna', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Purnia', 'bihar-purnia', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rohtas', 'bihar-rohtas', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Saharsa', 'bihar-saharsa', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Samastipur', 'bihar-samastipur', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Saran', 'bihar-saran', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sheikhpura', 'bihar-sheikhpura', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sheohar', 'bihar-sheohar', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sitamarhi', 'bihar-sitamarhi', 'district', 34)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Siwan', 'bihar-siwan', 'district', 35)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Supaul', 'bihar-supaul', 'district', 36)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Vaishali', 'bihar-vaishali', 'district', 37)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Champaran', 'bihar-west-champaran', 'district', 38)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Chhattisgarh
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'chhattisgarh';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Balod', 'chhattisgarh-balod', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Baloda Bazar', 'chhattisgarh-baloda-bazar', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Balrampur', 'chhattisgarh-balrampur', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bastar', 'chhattisgarh-bastar', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bemetara', 'chhattisgarh-bemetara', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bijapur', 'chhattisgarh-bijapur', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bilaspur', 'chhattisgarh-bilaspur', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dantewada', 'chhattisgarh-dantewada', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dhamtari', 'chhattisgarh-dhamtari', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Durg', 'chhattisgarh-durg', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gariaband', 'chhattisgarh-gariaband', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gaurela-Pendra-Marwahi', 'chhattisgarh-gaurela-pendra-marwahi', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Janjgir-Champa', 'chhattisgarh-janjgir-champa', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jashpur', 'chhattisgarh-jashpur', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kabirdham', 'chhattisgarh-kabirdham', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kanker', 'chhattisgarh-kanker', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khairagarh-Chhuikhadan-Gandai', 'chhattisgarh-khairagarh-chhuikhadan-gandai', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kondagaon', 'chhattisgarh-kondagaon', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Korba', 'chhattisgarh-korba', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Koriya', 'chhattisgarh-koriya', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mahasamund', 'chhattisgarh-mahasamund', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Manendragarh-Chirmiri-Bharatpur', 'chhattisgarh-manendragarh-chirmiri-bharatpur', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mohla-Manpur-Ambagarh Chowki', 'chhattisgarh-mohla-manpur-ambagarh-chowki', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mungeli', 'chhattisgarh-mungeli', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Narayanpur', 'chhattisgarh-narayanpur', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Raigarh', 'chhattisgarh-raigarh', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Raipur', 'chhattisgarh-raipur', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rajnandgaon', 'chhattisgarh-rajnandgaon', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sakti', 'chhattisgarh-sakti', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sarangarh-Bilaigarh', 'chhattisgarh-sarangarh-bilaigarh', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sukma', 'chhattisgarh-sukma', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Surajpur', 'chhattisgarh-surajpur', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Surguja', 'chhattisgarh-surguja', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Goa
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'goa';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'North Goa', 'goa-north-goa', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South Goa', 'goa-south-goa', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Gujarat
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'gujarat';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ahmedabad', 'gujarat-ahmedabad', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Amreli', 'gujarat-amreli', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Anand', 'gujarat-anand', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Aravalli', 'gujarat-aravalli', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Banaskantha', 'gujarat-banaskantha', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bharuch', 'gujarat-bharuch', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhavnagar', 'gujarat-bhavnagar', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Botad', 'gujarat-botad', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chhota Udaipur', 'gujarat-chhota-udaipur', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dahod', 'gujarat-dahod', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dang', 'gujarat-dang', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Devbhoomi Dwarka', 'gujarat-devbhoomi-dwarka', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gandhinagar', 'gujarat-gandhinagar', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gir Somnath', 'gujarat-gir-somnath', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jamnagar', 'gujarat-jamnagar', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Junagadh', 'gujarat-junagadh', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kheda', 'gujarat-kheda', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kutch', 'gujarat-kutch', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mahisagar', 'gujarat-mahisagar', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mehsana', 'gujarat-mehsana', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Morbi', 'gujarat-morbi', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Narmada', 'gujarat-narmada', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Navsari', 'gujarat-navsari', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Panchmahal', 'gujarat-panchmahal', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Patan', 'gujarat-patan', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Porbandar', 'gujarat-porbandar', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rajkot', 'gujarat-rajkot', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sabarkantha', 'gujarat-sabarkantha', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Surat', 'gujarat-surat', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Surendranagar', 'gujarat-surendranagar', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tapi', 'gujarat-tapi', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Vadodara', 'gujarat-vadodara', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Valsad', 'gujarat-valsad', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Haryana
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'haryana';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ambala', 'haryana-ambala', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhiwani', 'haryana-bhiwani', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Charkhi Dadri', 'haryana-charkhi-dadri', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Faridabad', 'haryana-faridabad', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Fatehabad', 'haryana-fatehabad', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gurugram', 'haryana-gurugram', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hisar', 'haryana-hisar', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jhajjar', 'haryana-jhajjar', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jind', 'haryana-jind', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kaithal', 'haryana-kaithal', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Karnal', 'haryana-karnal', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kurukshetra', 'haryana-kurukshetra', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mahendragarh', 'haryana-mahendragarh', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nuh', 'haryana-nuh', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Palwal', 'haryana-palwal', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Panchkula', 'haryana-panchkula', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Panipat', 'haryana-panipat', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rewari', 'haryana-rewari', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rohtak', 'haryana-rohtak', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sirsa', 'haryana-sirsa', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sonipat', 'haryana-sonipat', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Yamunanagar', 'haryana-yamunanagar', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Himachal Pradesh
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'himachal-pradesh';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bilaspur', 'himachal-pradesh-bilaspur', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chamba', 'himachal-pradesh-chamba', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hamirpur', 'himachal-pradesh-hamirpur', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kangra', 'himachal-pradesh-kangra', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kinnaur', 'himachal-pradesh-kinnaur', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kullu', 'himachal-pradesh-kullu', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lahaul and Spiti', 'himachal-pradesh-lahaul-and-spiti', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mandi', 'himachal-pradesh-mandi', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shimla', 'himachal-pradesh-shimla', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sirmaur', 'himachal-pradesh-sirmaur', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Solan', 'himachal-pradesh-solan', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Una', 'himachal-pradesh-una', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Jharkhand
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'jharkhand';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bokaro', 'jharkhand-bokaro', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chatra', 'jharkhand-chatra', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Deoghar', 'jharkhand-deoghar', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dhanbad', 'jharkhand-dhanbad', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dumka', 'jharkhand-dumka', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'East Singhbhum', 'jharkhand-east-singhbhum', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Garhwa', 'jharkhand-garhwa', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Giridih', 'jharkhand-giridih', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Godda', 'jharkhand-godda', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gumla', 'jharkhand-gumla', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hazaribagh', 'jharkhand-hazaribagh', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jamtara', 'jharkhand-jamtara', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khunti', 'jharkhand-khunti', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Koderma', 'jharkhand-koderma', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Latehar', 'jharkhand-latehar', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lohardaga', 'jharkhand-lohardaga', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pakur', 'jharkhand-pakur', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Palamu', 'jharkhand-palamu', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ramgarh', 'jharkhand-ramgarh', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ranchi', 'jharkhand-ranchi', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sahibganj', 'jharkhand-sahibganj', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Saraikela Kharsawan', 'jharkhand-saraikela-kharsawan', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Simdega', 'jharkhand-simdega', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Singhbhum', 'jharkhand-west-singhbhum', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Karnataka
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'karnataka';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bagalkot', 'karnataka-bagalkot', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ballari', 'karnataka-ballari', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Belagavi', 'karnataka-belagavi', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bengaluru Rural', 'karnataka-bengaluru-rural', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bengaluru Urban', 'karnataka-bengaluru-urban', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bidar', 'karnataka-bidar', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chamarajanagar', 'karnataka-chamarajanagar', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chikkaballapura', 'karnataka-chikkaballapura', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chikkamagaluru', 'karnataka-chikkamagaluru', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chitradurga', 'karnataka-chitradurga', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dakshina Kannada', 'karnataka-dakshina-kannada', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Davanagere', 'karnataka-davanagere', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dharwad', 'karnataka-dharwad', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gadag', 'karnataka-gadag', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hassan', 'karnataka-hassan', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Haveri', 'karnataka-haveri', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kalaburagi', 'karnataka-kalaburagi', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kodagu', 'karnataka-kodagu', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kolar', 'karnataka-kolar', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Koppal', 'karnataka-koppal', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mandya', 'karnataka-mandya', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mysuru', 'karnataka-mysuru', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Raichur', 'karnataka-raichur', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ramanagara', 'karnataka-ramanagara', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shivamogga', 'karnataka-shivamogga', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tumakuru', 'karnataka-tumakuru', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Udupi', 'karnataka-udupi', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Uttara Kannada', 'karnataka-uttara-kannada', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Vijayapura', 'karnataka-vijayapura', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Vijayanagara', 'karnataka-vijayanagara', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Yadgir', 'karnataka-yadgir', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Kerala
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'kerala';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Alappuzha', 'kerala-alappuzha', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ernakulam', 'kerala-ernakulam', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Idukki', 'kerala-idukki', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kannur', 'kerala-kannur', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kasaragod', 'kerala-kasaragod', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kollam', 'kerala-kollam', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kottayam', 'kerala-kottayam', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kozhikode', 'kerala-kozhikode', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Malappuram', 'kerala-malappuram', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Palakkad', 'kerala-palakkad', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pathanamthitta', 'kerala-pathanamthitta', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Thiruvananthapuram', 'kerala-thiruvananthapuram', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Thrissur', 'kerala-thrissur', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Wayanad', 'kerala-wayanad', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Madhya Pradesh
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'madhya-pradesh';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Agar Malwa', 'madhya-pradesh-agar-malwa', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Alirajpur', 'madhya-pradesh-alirajpur', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Anuppur', 'madhya-pradesh-anuppur', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ashoknagar', 'madhya-pradesh-ashoknagar', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Balaghat', 'madhya-pradesh-balaghat', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Barwani', 'madhya-pradesh-barwani', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Betul', 'madhya-pradesh-betul', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhind', 'madhya-pradesh-bhind', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhopal', 'madhya-pradesh-bhopal', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Burhanpur', 'madhya-pradesh-burhanpur', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chhatarpur', 'madhya-pradesh-chhatarpur', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chhindwara', 'madhya-pradesh-chhindwara', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Damoh', 'madhya-pradesh-damoh', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Datia', 'madhya-pradesh-datia', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dewas', 'madhya-pradesh-dewas', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dhar', 'madhya-pradesh-dhar', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dindori', 'madhya-pradesh-dindori', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Guna', 'madhya-pradesh-guna', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gwalior', 'madhya-pradesh-gwalior', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Harda', 'madhya-pradesh-harda', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hoshangabad', 'madhya-pradesh-hoshangabad', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Indore', 'madhya-pradesh-indore', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jabalpur', 'madhya-pradesh-jabalpur', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jhabua', 'madhya-pradesh-jhabua', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Katni', 'madhya-pradesh-katni', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khandwa', 'madhya-pradesh-khandwa', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khargone', 'madhya-pradesh-khargone', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mandla', 'madhya-pradesh-mandla', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mandsaur', 'madhya-pradesh-mandsaur', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Morena', 'madhya-pradesh-morena', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Narsinghpur', 'madhya-pradesh-narsinghpur', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Neemuch', 'madhya-pradesh-neemuch', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Niwari', 'madhya-pradesh-niwari', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Panna', 'madhya-pradesh-panna', 'district', 34)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Raisen', 'madhya-pradesh-raisen', 'district', 35)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rajgarh', 'madhya-pradesh-rajgarh', 'district', 36)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ratlam', 'madhya-pradesh-ratlam', 'district', 37)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rewa', 'madhya-pradesh-rewa', 'district', 38)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sagar', 'madhya-pradesh-sagar', 'district', 39)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Satna', 'madhya-pradesh-satna', 'district', 40)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sehore', 'madhya-pradesh-sehore', 'district', 41)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Seoni', 'madhya-pradesh-seoni', 'district', 42)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shahdol', 'madhya-pradesh-shahdol', 'district', 43)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shajapur', 'madhya-pradesh-shajapur', 'district', 44)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sheopur', 'madhya-pradesh-sheopur', 'district', 45)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shivpuri', 'madhya-pradesh-shivpuri', 'district', 46)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sidhi', 'madhya-pradesh-sidhi', 'district', 47)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Singrauli', 'madhya-pradesh-singrauli', 'district', 48)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tikamgarh', 'madhya-pradesh-tikamgarh', 'district', 49)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ujjain', 'madhya-pradesh-ujjain', 'district', 50)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Umaria', 'madhya-pradesh-umaria', 'district', 51)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Vidisha', 'madhya-pradesh-vidisha', 'district', 52)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Maharashtra
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'maharashtra';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ahmednagar', 'maharashtra-ahmednagar', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Akola', 'maharashtra-akola', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Amravati', 'maharashtra-amravati', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Beed', 'maharashtra-beed', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhandara', 'maharashtra-bhandara', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Buldhana', 'maharashtra-buldhana', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chandrapur', 'maharashtra-chandrapur', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chhatrapati Sambhajinagar', 'maharashtra-chhatrapati-sambhajinagar', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dhule', 'maharashtra-dhule', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gadchiroli', 'maharashtra-gadchiroli', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gondia', 'maharashtra-gondia', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hingoli', 'maharashtra-hingoli', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jalgaon', 'maharashtra-jalgaon', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jalna', 'maharashtra-jalna', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kolhapur', 'maharashtra-kolhapur', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Latur', 'maharashtra-latur', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mumbai City', 'maharashtra-mumbai-city', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mumbai Suburban', 'maharashtra-mumbai-suburban', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nagpur', 'maharashtra-nagpur', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nanded', 'maharashtra-nanded', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nandurbar', 'maharashtra-nandurbar', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nashik', 'maharashtra-nashik', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Osmanabad', 'maharashtra-osmanabad', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Palghar', 'maharashtra-palghar', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Parbhani', 'maharashtra-parbhani', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pune', 'maharashtra-pune', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Raigad', 'maharashtra-raigad', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ratnagiri', 'maharashtra-ratnagiri', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sangli', 'maharashtra-sangli', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Satara', 'maharashtra-satara', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sindhudurg', 'maharashtra-sindhudurg', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Solapur', 'maharashtra-solapur', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Thane', 'maharashtra-thane', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Wardha', 'maharashtra-wardha', 'district', 34)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Washim', 'maharashtra-washim', 'district', 35)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Yavatmal', 'maharashtra-yavatmal', 'district', 36)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Manipur
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'manipur';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bishnupur', 'manipur-bishnupur', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chandel', 'manipur-chandel', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Churachandpur', 'manipur-churachandpur', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Imphal East', 'manipur-imphal-east', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Imphal West', 'manipur-imphal-west', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jiribam', 'manipur-jiribam', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kakching', 'manipur-kakching', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kamjong', 'manipur-kamjong', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kangpokpi', 'manipur-kangpokpi', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Noney', 'manipur-noney', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pherzawl', 'manipur-pherzawl', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Senapati', 'manipur-senapati', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tamenglong', 'manipur-tamenglong', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tengnoupal', 'manipur-tengnoupal', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Thoubal', 'manipur-thoubal', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ukhrul', 'manipur-ukhrul', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Meghalaya
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'meghalaya';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'East Garo Hills', 'meghalaya-east-garo-hills', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'East Jaintia Hills', 'meghalaya-east-jaintia-hills', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'East Khasi Hills', 'meghalaya-east-khasi-hills', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Eastern West Khasi Hills', 'meghalaya-eastern-west-khasi-hills', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'North Garo Hills', 'meghalaya-north-garo-hills', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ri Bhoi', 'meghalaya-ri-bhoi', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South Garo Hills', 'meghalaya-south-garo-hills', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South West Garo Hills', 'meghalaya-south-west-garo-hills', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South West Khasi Hills', 'meghalaya-south-west-khasi-hills', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Garo Hills', 'meghalaya-west-garo-hills', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Jaintia Hills', 'meghalaya-west-jaintia-hills', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Khasi Hills', 'meghalaya-west-khasi-hills', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Mizoram
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'mizoram';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Aizawl', 'mizoram-aizawl', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Champhai', 'mizoram-champhai', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hnahthial', 'mizoram-hnahthial', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khawzawl', 'mizoram-khawzawl', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kolasib', 'mizoram-kolasib', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lawngtlai', 'mizoram-lawngtlai', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lunglei', 'mizoram-lunglei', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mamit', 'mizoram-mamit', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Saitual', 'mizoram-saitual', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Serchhip', 'mizoram-serchhip', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Siaha', 'mizoram-siaha', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Nagaland
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'nagaland';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chümoukedima', 'nagaland-ch-moukedima', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dimapur', 'nagaland-dimapur', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kiphire', 'nagaland-kiphire', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kohima', 'nagaland-kohima', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Longleng', 'nagaland-longleng', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mokokchung', 'nagaland-mokokchung', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mon', 'nagaland-mon', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Niuland', 'nagaland-niuland', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Noklak', 'nagaland-noklak', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Peren', 'nagaland-peren', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Phek', 'nagaland-phek', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shamator', 'nagaland-shamator', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tseminyü', 'nagaland-tseminy-', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tuensang', 'nagaland-tuensang', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Wokha', 'nagaland-wokha', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Zünheboto', 'nagaland-z-nheboto', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Odisha
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'odisha';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Angul', 'odisha-angul', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Balangir', 'odisha-balangir', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Balasore', 'odisha-balasore', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bargarh', 'odisha-bargarh', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhadrak', 'odisha-bhadrak', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Boudh', 'odisha-boudh', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Cuttack', 'odisha-cuttack', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Deogarh', 'odisha-deogarh', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dhenkanal', 'odisha-dhenkanal', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gajapati', 'odisha-gajapati', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ganjam', 'odisha-ganjam', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jagatsinghpur', 'odisha-jagatsinghpur', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jajpur', 'odisha-jajpur', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jharsuguda', 'odisha-jharsuguda', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kalahandi', 'odisha-kalahandi', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kandhamal', 'odisha-kandhamal', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kendrapara', 'odisha-kendrapara', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kendujhar', 'odisha-kendujhar', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khordha', 'odisha-khordha', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Koraput', 'odisha-koraput', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Malkangiri', 'odisha-malkangiri', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mayurbhanj', 'odisha-mayurbhanj', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nabarangpur', 'odisha-nabarangpur', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nayagarh', 'odisha-nayagarh', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nuapada', 'odisha-nuapada', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Puri', 'odisha-puri', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rayagada', 'odisha-rayagada', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sambalpur', 'odisha-sambalpur', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Subarnapur', 'odisha-subarnapur', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sundergarh', 'odisha-sundergarh', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Punjab
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'punjab';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Amritsar', 'punjab-amritsar', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Barnala', 'punjab-barnala', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bathinda', 'punjab-bathinda', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Faridkot', 'punjab-faridkot', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Fatehgarh Sahib', 'punjab-fatehgarh-sahib', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Fazilka', 'punjab-fazilka', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ferozepur', 'punjab-ferozepur', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gurdaspur', 'punjab-gurdaspur', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hoshiarpur', 'punjab-hoshiarpur', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jalandhar', 'punjab-jalandhar', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kapurthala', 'punjab-kapurthala', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ludhiana', 'punjab-ludhiana', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Malerkotla', 'punjab-malerkotla', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mansa', 'punjab-mansa', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Moga', 'punjab-moga', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Muktsar', 'punjab-muktsar', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pathankot', 'punjab-pathankot', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Patiala', 'punjab-patiala', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rupnagar', 'punjab-rupnagar', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sahibzada Ajit Singh Nagar', 'punjab-sahibzada-ajit-singh-nagar', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sangrur', 'punjab-sangrur', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shahid Bhagat Singh Nagar', 'punjab-shahid-bhagat-singh-nagar', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sri Muktsar Sahib', 'punjab-sri-muktsar-sahib', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tarn Taran', 'punjab-tarn-taran', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Rajasthan
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'rajasthan';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ajmer', 'rajasthan-ajmer', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Alwar', 'rajasthan-alwar', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Anupgarh', 'rajasthan-anupgarh', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Balotra', 'rajasthan-balotra', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Banswara', 'rajasthan-banswara', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Baran', 'rajasthan-baran', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Barmer', 'rajasthan-barmer', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Beawar', 'rajasthan-beawar', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bharatpur', 'rajasthan-bharatpur', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhilwara', 'rajasthan-bhilwara', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bikaner', 'rajasthan-bikaner', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bundi', 'rajasthan-bundi', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chittorgarh', 'rajasthan-chittorgarh', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Churu', 'rajasthan-churu', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dausa', 'rajasthan-dausa', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Deeg', 'rajasthan-deeg', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dholpur', 'rajasthan-dholpur', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Didwana-Kuchaman', 'rajasthan-didwana-kuchaman', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dudu', 'rajasthan-dudu', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dungarpur', 'rajasthan-dungarpur', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gangapur City', 'rajasthan-gangapur-city', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hanumangarh', 'rajasthan-hanumangarh', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jaipur', 'rajasthan-jaipur', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jaipur Rural', 'rajasthan-jaipur-rural', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jaisalmer', 'rajasthan-jaisalmer', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jalore', 'rajasthan-jalore', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jhalawar', 'rajasthan-jhalawar', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jhunjhunu', 'rajasthan-jhunjhunu', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jodhpur', 'rajasthan-jodhpur', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jodhpur Rural', 'rajasthan-jodhpur-rural', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Karauli', 'rajasthan-karauli', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kekri', 'rajasthan-kekri', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khairthal-Tijara', 'rajasthan-khairthal-tijara', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kota', 'rajasthan-kota', 'district', 34)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kotputli-Behror', 'rajasthan-kotputli-behror', 'district', 35)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nagaur', 'rajasthan-nagaur', 'district', 36)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Neem Ka Thana', 'rajasthan-neem-ka-thana', 'district', 37)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pali', 'rajasthan-pali', 'district', 38)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Phalodi', 'rajasthan-phalodi', 'district', 39)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pratapgarh', 'rajasthan-pratapgarh', 'district', 40)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rajsamand', 'rajasthan-rajsamand', 'district', 41)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Salumbar', 'rajasthan-salumbar', 'district', 42)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sanchore', 'rajasthan-sanchore', 'district', 43)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sawai Madhopur', 'rajasthan-sawai-madhopur', 'district', 44)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shahpura', 'rajasthan-shahpura', 'district', 45)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sikar', 'rajasthan-sikar', 'district', 46)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sirohi', 'rajasthan-sirohi', 'district', 47)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sri Ganganagar', 'rajasthan-sri-ganganagar', 'district', 48)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tonk', 'rajasthan-tonk', 'district', 49)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Udaipur', 'rajasthan-udaipur', 'district', 50)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Sikkim
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'sikkim';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gangtok', 'sikkim-gangtok', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gyalshing', 'sikkim-gyalshing', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mangan', 'sikkim-mangan', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Namchi', 'sikkim-namchi', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pakyong', 'sikkim-pakyong', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Soreng', 'sikkim-soreng', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Tamil Nadu
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'tamil-nadu';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ariyalur', 'tamil-nadu-ariyalur', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chengalpattu', 'tamil-nadu-chengalpattu', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chennai', 'tamil-nadu-chennai', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Coimbatore', 'tamil-nadu-coimbatore', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Cuddalore', 'tamil-nadu-cuddalore', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dharmapuri', 'tamil-nadu-dharmapuri', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dindigul', 'tamil-nadu-dindigul', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Erode', 'tamil-nadu-erode', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kallakurichi', 'tamil-nadu-kallakurichi', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kanchipuram', 'tamil-nadu-kanchipuram', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kanyakumari', 'tamil-nadu-kanyakumari', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Karur', 'tamil-nadu-karur', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Krishnagiri', 'tamil-nadu-krishnagiri', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Madurai', 'tamil-nadu-madurai', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mayiladuthurai', 'tamil-nadu-mayiladuthurai', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nagapattinam', 'tamil-nadu-nagapattinam', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Namakkal', 'tamil-nadu-namakkal', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nilgiris', 'tamil-nadu-nilgiris', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Perambalur', 'tamil-nadu-perambalur', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pudukkottai', 'tamil-nadu-pudukkottai', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ramanathapuram', 'tamil-nadu-ramanathapuram', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ranipet', 'tamil-nadu-ranipet', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Salem', 'tamil-nadu-salem', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sivaganga', 'tamil-nadu-sivaganga', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tenkasi', 'tamil-nadu-tenkasi', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Thanjavur', 'tamil-nadu-thanjavur', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Theni', 'tamil-nadu-theni', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Thoothukudi', 'tamil-nadu-thoothukudi', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tiruchirappalli', 'tamil-nadu-tiruchirappalli', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tirunelveli', 'tamil-nadu-tirunelveli', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tirupathur', 'tamil-nadu-tirupathur', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tiruppur', 'tamil-nadu-tiruppur', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tiruvallur', 'tamil-nadu-tiruvallur', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tiruvannamalai', 'tamil-nadu-tiruvannamalai', 'district', 34)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tiruvarur', 'tamil-nadu-tiruvarur', 'district', 35)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Vellore', 'tamil-nadu-vellore', 'district', 36)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Viluppuram', 'tamil-nadu-viluppuram', 'district', 37)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Virudhunagar', 'tamil-nadu-virudhunagar', 'district', 38)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Telangana
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'telangana';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Adilabad', 'telangana-adilabad', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhadradri Kothagudem', 'telangana-bhadradri-kothagudem', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hanumakonda', 'telangana-hanumakonda', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hyderabad', 'telangana-hyderabad', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jagtial', 'telangana-jagtial', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jangaon', 'telangana-jangaon', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jayashankar Bhupalpally', 'telangana-jayashankar-bhupalpally', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jogulamba Gadwal', 'telangana-jogulamba-gadwal', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kamareddy', 'telangana-kamareddy', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Karimnagar', 'telangana-karimnagar', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khammam', 'telangana-khammam', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kumuram Bheem Asifabad', 'telangana-kumuram-bheem-asifabad', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mahabubabad', 'telangana-mahabubabad', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mahabubnagar', 'telangana-mahabubnagar', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mancherial', 'telangana-mancherial', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Medak', 'telangana-medak', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Medchal-Malkajgiri', 'telangana-medchal-malkajgiri', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mulugu', 'telangana-mulugu', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nagarkurnool', 'telangana-nagarkurnool', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nalgonda', 'telangana-nalgonda', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Narayanpet', 'telangana-narayanpet', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nirmal', 'telangana-nirmal', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nizamabad', 'telangana-nizamabad', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Peddapalli', 'telangana-peddapalli', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rajanna Sircilla', 'telangana-rajanna-sircilla', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ranga Reddy', 'telangana-ranga-reddy', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sangareddy', 'telangana-sangareddy', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Siddipet', 'telangana-siddipet', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Suryapet', 'telangana-suryapet', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Vikarabad', 'telangana-vikarabad', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Wanaparthy', 'telangana-wanaparthy', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Warangal', 'telangana-warangal', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Yadadri Bhuvanagiri', 'telangana-yadadri-bhuvanagiri', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Tripura
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'tripura';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dhalai', 'tripura-dhalai', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gomati', 'tripura-gomati', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Khowai', 'tripura-khowai', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'North Tripura', 'tripura-north-tripura', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sepahijala', 'tripura-sepahijala', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South Tripura', 'tripura-south-tripura', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Unakoti', 'tripura-unakoti', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Tripura', 'tripura-west-tripura', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Uttar Pradesh
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'uttar-pradesh';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Agra', 'uttar-pradesh-agra', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Aligarh', 'uttar-pradesh-aligarh', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ambedkar Nagar', 'uttar-pradesh-ambedkar-nagar', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Amethi', 'uttar-pradesh-amethi', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Amroha', 'uttar-pradesh-amroha', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Auraiya', 'uttar-pradesh-auraiya', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ayodhya', 'uttar-pradesh-ayodhya', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Azamgarh', 'uttar-pradesh-azamgarh', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Baghpat', 'uttar-pradesh-baghpat', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bahraich', 'uttar-pradesh-bahraich', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ballia', 'uttar-pradesh-ballia', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Balrampur', 'uttar-pradesh-balrampur', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Banda', 'uttar-pradesh-banda', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Barabanki', 'uttar-pradesh-barabanki', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bareilly', 'uttar-pradesh-bareilly', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Basti', 'uttar-pradesh-basti', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bhadohi', 'uttar-pradesh-bhadohi', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bijnor', 'uttar-pradesh-bijnor', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Budaun', 'uttar-pradesh-budaun', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bulandshahr', 'uttar-pradesh-bulandshahr', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chandauli', 'uttar-pradesh-chandauli', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chitrakoot', 'uttar-pradesh-chitrakoot', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Deoria', 'uttar-pradesh-deoria', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Etah', 'uttar-pradesh-etah', 'district', 24)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Etawah', 'uttar-pradesh-etawah', 'district', 25)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Farrukhabad', 'uttar-pradesh-farrukhabad', 'district', 26)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Fatehpur', 'uttar-pradesh-fatehpur', 'district', 27)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Firozabad', 'uttar-pradesh-firozabad', 'district', 28)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gautam Buddha Nagar', 'uttar-pradesh-gautam-buddha-nagar', 'district', 29)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ghaziabad', 'uttar-pradesh-ghaziabad', 'district', 30)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ghazipur', 'uttar-pradesh-ghazipur', 'district', 31)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gonda', 'uttar-pradesh-gonda', 'district', 32)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Gorakhpur', 'uttar-pradesh-gorakhpur', 'district', 33)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hamirpur', 'uttar-pradesh-hamirpur', 'district', 34)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hapur', 'uttar-pradesh-hapur', 'district', 35)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hardoi', 'uttar-pradesh-hardoi', 'district', 36)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hathras', 'uttar-pradesh-hathras', 'district', 37)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jalaun', 'uttar-pradesh-jalaun', 'district', 38)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jaunpur', 'uttar-pradesh-jaunpur', 'district', 39)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jhansi', 'uttar-pradesh-jhansi', 'district', 40)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kannauj', 'uttar-pradesh-kannauj', 'district', 41)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kanpur Dehat', 'uttar-pradesh-kanpur-dehat', 'district', 42)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kanpur Nagar', 'uttar-pradesh-kanpur-nagar', 'district', 43)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kasganj', 'uttar-pradesh-kasganj', 'district', 44)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kaushambi', 'uttar-pradesh-kaushambi', 'district', 45)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kheri', 'uttar-pradesh-kheri', 'district', 46)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kushinagar', 'uttar-pradesh-kushinagar', 'district', 47)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lalitpur', 'uttar-pradesh-lalitpur', 'district', 48)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lucknow', 'uttar-pradesh-lucknow', 'district', 49)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Maharajganj', 'uttar-pradesh-maharajganj', 'district', 50)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mahoba', 'uttar-pradesh-mahoba', 'district', 51)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mainpuri', 'uttar-pradesh-mainpuri', 'district', 52)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mathura', 'uttar-pradesh-mathura', 'district', 53)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mau', 'uttar-pradesh-mau', 'district', 54)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Meerut', 'uttar-pradesh-meerut', 'district', 55)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mirzapur', 'uttar-pradesh-mirzapur', 'district', 56)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Moradabad', 'uttar-pradesh-moradabad', 'district', 57)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Muzaffarnagar', 'uttar-pradesh-muzaffarnagar', 'district', 58)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pilibhit', 'uttar-pradesh-pilibhit', 'district', 59)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pratapgarh', 'uttar-pradesh-pratapgarh', 'district', 60)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Prayagraj', 'uttar-pradesh-prayagraj', 'district', 61)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Raebareli', 'uttar-pradesh-raebareli', 'district', 62)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rampur', 'uttar-pradesh-rampur', 'district', 63)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Saharanpur', 'uttar-pradesh-saharanpur', 'district', 64)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sambhal', 'uttar-pradesh-sambhal', 'district', 65)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sant Kabir Nagar', 'uttar-pradesh-sant-kabir-nagar', 'district', 66)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shahjahanpur', 'uttar-pradesh-shahjahanpur', 'district', 67)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shamli', 'uttar-pradesh-shamli', 'district', 68)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shravasti', 'uttar-pradesh-shravasti', 'district', 69)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Siddharthnagar', 'uttar-pradesh-siddharthnagar', 'district', 70)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sitapur', 'uttar-pradesh-sitapur', 'district', 71)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sonbhadra', 'uttar-pradesh-sonbhadra', 'district', 72)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Sultanpur', 'uttar-pradesh-sultanpur', 'district', 73)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Unnao', 'uttar-pradesh-unnao', 'district', 74)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Varanasi', 'uttar-pradesh-varanasi', 'district', 75)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Uttarakhand
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'uttarakhand';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Almora', 'uttarakhand-almora', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bageshwar', 'uttarakhand-bageshwar', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chamoli', 'uttarakhand-chamoli', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Champawat', 'uttarakhand-champawat', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dehradun', 'uttarakhand-dehradun', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Haridwar', 'uttarakhand-haridwar', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nainital', 'uttarakhand-nainital', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pauri Garhwal', 'uttarakhand-pauri-garhwal', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pithoragarh', 'uttarakhand-pithoragarh', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rudraprayag', 'uttarakhand-rudraprayag', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Tehri Garhwal', 'uttarakhand-tehri-garhwal', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Udham Singh Nagar', 'uttarakhand-udham-singh-nagar', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Uttarkashi', 'uttarakhand-uttarkashi', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: West Bengal
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'west-bengal';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Alipurduar', 'west-bengal-alipurduar', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bankura', 'west-bengal-bankura', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Birbhum', 'west-bengal-birbhum', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Cooch Behar', 'west-bengal-cooch-behar', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dakshin Dinajpur', 'west-bengal-dakshin-dinajpur', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Darjeeling', 'west-bengal-darjeeling', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Hooghly', 'west-bengal-hooghly', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Howrah', 'west-bengal-howrah', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jalpaiguri', 'west-bengal-jalpaiguri', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jhargram', 'west-bengal-jhargram', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kalimpong', 'west-bengal-kalimpong', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kolkata', 'west-bengal-kolkata', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Malda', 'west-bengal-malda', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Murshidabad', 'west-bengal-murshidabad', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nadia', 'west-bengal-nadia', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'North 24 Parganas', 'west-bengal-north-24-parganas', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Paschim Bardhaman', 'west-bengal-paschim-bardhaman', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Paschim Medinipur', 'west-bengal-paschim-medinipur', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Purba Bardhaman', 'west-bengal-purba-bardhaman', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Purba Medinipur', 'west-bengal-purba-medinipur', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Purulia', 'west-bengal-purulia', 'district', 21)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South 24 Parganas', 'west-bengal-south-24-parganas', 'district', 22)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Uttar Dinajpur', 'west-bengal-uttar-dinajpur', 'district', 23)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Andaman and Nicobar Islands
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'andaman-and-nicobar-islands';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Nicobar', 'andaman-and-nicobar-islands-nicobar', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'North and Middle Andaman', 'andaman-and-nicobar-islands-north-and-middle-andaman', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South Andaman', 'andaman-and-nicobar-islands-south-andaman', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Chandigarh
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'chandigarh';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Chandigarh', 'chandigarh-chandigarh', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Dadra and Nagar Haveli and Daman and Diu
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'dadra-and-nagar-haveli-and-daman-and-diu';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Dadra and Nagar Haveli', 'dadra-and-nagar-haveli-and-daman-and-diu-dadra-and-nagar-haveli', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Daman', 'dadra-and-nagar-haveli-and-daman-and-diu-daman', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Diu', 'dadra-and-nagar-haveli-and-daman-and-diu-diu', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Delhi
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'delhi';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Central Delhi', 'delhi-central-delhi', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'East Delhi', 'delhi-east-delhi', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'New Delhi', 'delhi-new-delhi', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'North Delhi', 'delhi-north-delhi', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'North East Delhi', 'delhi-north-east-delhi', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'North West Delhi', 'delhi-north-west-delhi', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shahdara', 'delhi-shahdara', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South Delhi', 'delhi-south-delhi', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South East Delhi', 'delhi-south-east-delhi', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'South West Delhi', 'delhi-south-west-delhi', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'West Delhi', 'delhi-west-delhi', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Jammu and Kashmir
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'jammu-and-kashmir';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Anantnag', 'jammu-and-kashmir-anantnag', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Bandipora', 'jammu-and-kashmir-bandipora', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Baramulla', 'jammu-and-kashmir-baramulla', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Budgam', 'jammu-and-kashmir-budgam', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Doda', 'jammu-and-kashmir-doda', 'district', 5)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ganderbal', 'jammu-and-kashmir-ganderbal', 'district', 6)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Jammu', 'jammu-and-kashmir-jammu', 'district', 7)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kathua', 'jammu-and-kashmir-kathua', 'district', 8)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kishtwar', 'jammu-and-kashmir-kishtwar', 'district', 9)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kulgam', 'jammu-and-kashmir-kulgam', 'district', 10)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kupwara', 'jammu-and-kashmir-kupwara', 'district', 11)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Poonch', 'jammu-and-kashmir-poonch', 'district', 12)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Pulwama', 'jammu-and-kashmir-pulwama', 'district', 13)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Rajouri', 'jammu-and-kashmir-rajouri', 'district', 14)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Ramban', 'jammu-and-kashmir-ramban', 'district', 15)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Reasi', 'jammu-and-kashmir-reasi', 'district', 16)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Samba', 'jammu-and-kashmir-samba', 'district', 17)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Shopian', 'jammu-and-kashmir-shopian', 'district', 18)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Srinagar', 'jammu-and-kashmir-srinagar', 'district', 19)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Udhampur', 'jammu-and-kashmir-udhampur', 'district', 20)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Ladakh
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'ladakh';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Kargil', 'ladakh-kargil', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Leh', 'ladakh-leh', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Lakshadweep
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'lakshadweep';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Lakshadweep', 'lakshadweep-lakshadweep', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;

    -- State/UT: Puducherry
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = 'puducherry';
    IF state_parent_id IS NOT NULL THEN
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Karaikal', 'puducherry-karaikal', 'district', 1)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Mahe', 'puducherry-mahe', 'district', 2)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Puducherry', 'puducherry-puducherry', 'district', 3)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, 'Yanam', 'puducherry-yanam', 'district', 4)
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;
    END IF;
END $$;
