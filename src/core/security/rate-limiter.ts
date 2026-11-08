/**
 * High-Performance Sliding Window Rate Limiter
 * Architecture: MAION AI Technologies — Nammabus & JoinGroupLinks
 * Provides in-memory sliding window rate limiting with pluggable Redis adapter
 */

interface RateLimitRecord {
  timestamps: number[];
}

export class SlidingWindowRateLimiter {
  private cache: Map<string, RateLimitRecord> = new Map();
  private maxRequests: number;
  private windowMs: number;

  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  public check(identifier: string): { allowed: boolean; remaining: number; resetMs: number } {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    let record = this.cache.get(identifier);
    if (!record) {
      record = { timestamps: [] };
      this.cache.set(identifier, record);
    }

    // Filter out timestamps outside the active sliding window
    record.timestamps = record.timestamps.filter((t) => t > windowStart);

    if (record.timestamps.length >= this.maxRequests) {
      const oldestInWindow = record.timestamps[0];
      const resetMs = oldestInWindow + this.windowMs - now;
      return { allowed: false, remaining: 0, resetMs };
    }

    record.timestamps.push(now);
    const remaining = this.maxRequests - record.timestamps.length;
    return { allowed: true, remaining, resetMs: this.windowMs };
  }

  public reset(identifier: string) {
    this.cache.delete(identifier);
  }
}

// Global default edge limiter instance (120 req / min per IP)
export const edgeRateLimiter = new SlidingWindowRateLimiter(120, 60000);
