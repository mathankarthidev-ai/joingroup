import ts from 'typescript';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('======================================================');
console.log('  MAION AI: Automated Test Suite Verification');
console.log('======================================================\n');

const testFiles = [
  'tests/unit/api-contract.test.ts',
  'tests/unit/rate-limiter.test.ts',
  'tests/unit/playzone-games.test.ts',
  'tests/unit/playzone-scoring.test.ts',
  'tests/security/authorization.test.ts',
  'tests/performance/latency-budget.test.ts',
  'tests/integration/health-check.test.ts',
];

let passed = 0;
let failed = 0;

for (const tf of testFiles) {
  const fullPath = path.join(rootDir, tf);
  try {
    const rawTs = fs.readFileSync(fullPath, 'utf8');
    const transpiled = ts.transpileModule(rawTs, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    });

    const moduleMock = { exports: {} };
    const createCustomRequire = (currentDir) => (modPath) => {
      if (modPath.startsWith('.')) {
        let resolved = path.resolve(currentDir, modPath);
        if (!fs.existsSync(resolved)) {
          if (fs.existsSync(resolved + '.ts')) resolved += '.ts';
          else if (fs.existsSync(resolved + '.tsx')) resolved += '.tsx';
          else if (fs.existsSync(resolved + '.js')) resolved += '.js';
        }
        const code = fs.readFileSync(resolved, 'utf8');
        const resTrans = ts.transpileModule(code, {
          compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
        });
        const subMock = { exports: {} };
        const subFn = new Function('exports', 'module', 'require', resTrans.outputText);
        subFn(subMock.exports, subMock, createCustomRequire(path.dirname(resolved)));
        return subMock.exports;
      }
      return require(modPath);
    };

    const fn = new Function('exports', 'module', 'require', transpiled.outputText);
    fn(moduleMock.exports, moduleMock, createCustomRequire(path.dirname(fullPath)));

    // Execute exported test runner functions
    for (const key of Object.keys(moduleMock.exports)) {
      if (typeof moduleMock.exports[key] === 'function') {
        moduleMock.exports[key]();
      }
    }

    console.log(`✅ PASS: ${tf}`);
    passed++;
  } catch (err) {
    console.error(`❌ FAIL: ${tf}`, err.message);
    failed++;
  }
}

console.log(`\nResults: ${passed} passed, ${failed} failed.`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('🎉 All automated test suites passed successfully!\n');
}
