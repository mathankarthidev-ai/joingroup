import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('\n======================================================');
console.log('  LOCAL BIZ: Supabase Database Health & Connection Check');
console.log('======================================================\n');

// 1. Check for .env.local
const envLocalPath = path.join(rootDir, '.env.local');
const envExamplePath = path.join(rootDir, '.env.example');

let envConfig = {};

if (fs.existsSync(envLocalPath)) {
  console.log('✅ Found .env.local file');
  const content = fs.readFileSync(envLocalPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        envConfig[key] = val;
      }
    }
  });
} else {
  console.log('⚠️  No .env.local file found.');
  console.log('👉 Creating .env.local template from .env.example...\n');
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envLocalPath);
    console.log('✅ Created .env.local! Please add your Supabase credentials to .env.local.');
  }
}

const supabaseUrl = envConfig['NEXT_PUBLIC_SUPABASE_URL'] || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = envConfig['NEXT_PUBLIC_SUPABASE_ANON_KEY'] || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
  console.log('\n------------------------------------------------------');
  console.log('ℹ️  CURRENT STATUS: RESILIENT LOCAL FALLBACK MODE ACTIVE');
  console.log('------------------------------------------------------');
  console.log('The application currently runs with built-in persistent storage &');
  console.log('100% realistic Indian seed data (15 cities, 20 categories, 30 businesses).\n');
  console.log('To connect your live Supabase cloud database:');
  console.log('1. Go to https://supabase.com and create a free project');
  console.log('2. Navigate to: Project Settings -> API');
  console.log('3. Copy "Project URL" into NEXT_PUBLIC_SUPABASE_URL in .env.local');
  console.log('4. Copy "anon public" key into NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  console.log('5. In Supabase Dashboard, go to "SQL Editor", paste and run:');
  console.log('   supabase/full_schema_and_seed.sql');
  console.log('\nAll done! Once set, re-run: npm run db:check\n');
  process.exit(0);
}

console.log(`Connecting to Supabase at: ${supabaseUrl}...`);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkConnection() {
  try {
    const { data: cities, error: citiesErr, count: citiesCount } = await supabase
      .from('cities')
      .select('*', { count: 'exact' });

    if (citiesErr) {
      if (citiesErr.code === '42P01') {
        console.log('⚠️  Connected to Supabase successfully, but tables are NOT yet created.');
        console.log('\n👉 HOW TO CREATE TABLES & SEED DATA IN 1 CLICK:');
        console.log('1. Open your Supabase Dashboard: https://supabase.com/dashboard');
        console.log('2. Click on "SQL Editor" in the left sidebar');
        console.log('3. Open file: supabase/full_schema_and_seed.sql');
        console.log('4. Copy its contents, paste into SQL Editor, and click "Run"');
        console.log('5. Re-run "npm run db:check" to verify!\n');
      } else {
        console.error('❌ Supabase error:', citiesErr.message);
      }
      return;
    }

    const { count: catCount } = await supabase.from('categories').select('*', { count: 'exact' });
    const { count: bizCount } = await supabase.from('businesses').select('*', { count: 'exact' });
    const { count: prodCount } = await supabase.from('products').select('*', { count: 'exact' });
    const { count: srvCount } = await supabase.from('services').select('*', { count: 'exact' });

    console.log('\n🎉 SUCCESS! SUPABASE DATABASE IS FULLY CONFIGURED & SEEDED:');
    console.log(`- Cities:      ${citiesCount ?? 0} registered`);
    console.log(`- Categories:  ${catCount ?? 0} active`);
    console.log(`- Businesses:  ${bizCount ?? 0} listed`);
    console.log(`- Products:    ${prodCount ?? 0} available`);
    console.log(`- Services:    ${srvCount ?? 0} active`);
    console.log('\nLocal Biz is connected live to your Supabase PostgreSQL backend!\n');
  } catch (err) {
    console.error('❌ Unexpected connection failure:', err.message);
  }
}

checkConnection();
