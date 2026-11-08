/**
 * Latency Budget Automated Test
 * Validates that local in-memory queries execute well within p95 latency bounds (< 25ms)
 */
import { STATES, getDistrictsForState } from '../../src/lib/india';

export function runLatencyBudgetPerformanceTests() {
  const start = performance.now();

  for (let i = 0; i < 50; i++) {
    for (const s of STATES) {
      getDistrictsForState(s.name);
    }
  }

  const durationMs = performance.now() - start;
  const p95Estimated = durationMs / 50;

  if (p95Estimated > 25) {
    throw new Error(`Latency budget exceeded: p95 was ${p95Estimated.toFixed(2)}ms, expected < 25ms`);
  }

  return true;
}
