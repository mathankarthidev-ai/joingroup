import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import ts from 'typescript';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const indiaTsPath = path.resolve(__dirname, '../src/lib/india.ts');
const rawTs = fs.readFileSync(indiaTsPath, 'utf8');

// Transpile with official TypeScript compiler
const transpiled = ts.transpileModule(rawTs, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});

const moduleMock = { exports: {} };
const fn = new Function('exports', 'module', transpiled.outputText);
fn(moduleMock.exports, moduleMock);

const { STATES, UNION_TERRITORIES } = moduleMock.exports;
const allLocations = [...STATES, ...UNION_TERRITORIES];
const INDIA_ID = '00000000-0000-0000-0000-000000000091';

let sql = `-- ====================================================================
-- SEED 03: Indian Districts (All 28 States & 8 UTs)
-- Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
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
console.log(`✅ Generated seed file with ${allLocations.reduce((acc, l) => acc + l.districts.length, 0)} districts: ${outputPath}`);
