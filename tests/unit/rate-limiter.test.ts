import { SlidingWindowRateLimiter } from '../../src/core/security/rate-limiter';

export function runRateLimiterUnitTests() {
  const limiter = new SlidingWindowRateLimiter(2, 1000); // 2 requests per 1000ms

  const r1 = limiter.check('ip-test-1');
  const r2 = limiter.check('ip-test-1');
  const r3 = limiter.check('ip-test-1');

  if (!r1.allowed || !r2.allowed) {
    throw new Error('RateLimiter should allow first 2 requests');
  }

  if (r3.allowed) {
    throw new Error('RateLimiter should block 3rd request in same window');
  }

  return true;
}
