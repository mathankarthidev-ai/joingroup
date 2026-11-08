/**
 * Location Reference Data Importer
 * Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
 * Imports 28 States, 8 Union Territories, and 750+ Districts from india.ts into SQL statements
 */

import fs from 'fs';
import path from 'path';
import { STATES, UNION_TERRITORIES } from '../src/lib/india';

console.log('Generating production SQL migration for all Indian Districts...');

const INDIA_ID = '00000000-0000-0000-0000-000000000091';
const allLocations = [...STATES, ...UNION_TERRITORIES];

let sql = `-- ====================================================================
-- SEED 03: Indian Districts (All 28 States & 8 UTs)
-- Generated from verified territorial reference data
-- ====================================================================

DO $$
DECLARE
    india_id UUID := '${INDIA_ID}';
    state_parent_id UUID;
BEGIN
`;

for (const loc of allLocations) {
  const stateSlug = loc.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  sql += `
    -- State/UT: ${loc.name}
    SELECT id INTO state_parent_id FROM geo.administrative_units WHERE country_id = india_id AND slug = '${stateSlug}';
    IF state_parent_id IS NOT NULL THEN
`;

  for (let i = 0; i < loc.districts.length; i++) {
    const d = loc.districts[i];
    const distSlug = d.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const safeName = d.replace(/'/g, "''");
    sql += `        INSERT INTO geo.administrative_units (country_id, parent_id, level_id, name, slug, type, display_order)
        VALUES (india_id, state_parent_id, 2, '${safeName}', '${stateSlug}-${distSlug}', 'district', ${i + 1})
        ON CONFLICT (country_id, level_id, slug) DO NOTHING;\n`;
  }

  sql += `    END IF;\n`;
}

sql += `END $$;\n`;

const outputPath = path.resolve(__dirname, '../supabase/seed/03_india_districts.sql');
fs.writeFileSync(outputPath, sql, 'utf8');
console.log(`✅ Successfully generated seed file with 750+ districts: ${outputPath}`);
