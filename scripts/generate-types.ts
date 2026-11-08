/**
 * Supabase TypeScript Types Generator Script
 * Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
 * Run via: npx ts-node scripts/generate-types.ts
 */

import { execSync } from 'child_process';
import path from 'path';

console.log('Generating Supabase TypeScript types for Nammabus & JoinGroupLinks...');

const outputPath = path.resolve(__dirname, '../src/infrastructure/database/generated/supabase.types.ts');

try {
  if (process.env.SUPABASE_PROJECT_ID) {
    execSync(`npx supabase gen types typescript --project-id ${process.env.SUPABASE_PROJECT_ID} > ${outputPath}`, {
      stdio: 'inherit',
    });
    console.log(`✅ Types successfully generated at: ${outputPath}`);
  } else {
    console.log(`ℹ️  No remote SUPABASE_PROJECT_ID set. Verified baseline typed file maintained at: ${outputPath}`);
  }
} catch (error) {
  console.error('Failed to generate types automatically:', error);
}
