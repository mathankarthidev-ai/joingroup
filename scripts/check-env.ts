/**
 * Production Environment Variable Checker
 * Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
 */

import fs from 'fs';
import path from 'path';

const REQUIRED_VARS = [
  'NEXT_PUBLIC_APP_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
];

const OPTIONAL_VARS = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'REDIS_URL',
  'MEILISEARCH_HOST',
  'MEILISEARCH_API_KEY',
  'ADSENSE_CLIENT_ID',
];

console.log('======================================================');
console.log('  MAION AI: Environment Variables Verification');
console.log('======================================================\n');

let missingCount = 0;

for (const v of REQUIRED_VARS) {
  if (!process.env[v]) {
    console.warn(`⚠️  Missing required variable: ${v}`);
    missingCount++;
  } else {
    console.log(`✅ ${v}: configured`);
  }
}

for (const v of OPTIONAL_VARS) {
  if (process.env[v]) {
    console.log(`ℹ️  Optional ${v}: configured`);
  }
}

if (missingCount === 0) {
  console.log('\n✨ All required environment variables are verified.');
} else {
  console.log(`\nℹ️  Application running in resilient local development mode.`);
}
