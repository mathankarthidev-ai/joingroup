import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { edgeRateLimiter } from '@/core/security/rate-limiter';

/**
 * Next.js 16 Request Proxy (Convention replacing legacy Middleware)
 * Purpose: Lightweight request correlation, security headers, and edge rate limiting.
 * Deep authorization is deliberately enforced at Server Actions, Route Handlers & PostgreSQL RLS policies.
 */
export function proxy(request: NextRequest) {
  const requestId = crypto.randomUUID();
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

  // Apply edge rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const rateCheck = edgeRateLimiter.check(ip);
    if (!rateCheck.allowed) {
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please slow down and try again later.',
            requestId,
          },
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': Math.ceil(rateCheck.resetMs / 1000).toString(),
            'x-request-id': requestId,
          },
        }
      );
    }
  }

  const response = NextResponse.next();

  // Attach distributed correlation ID for observability
  response.headers.set('x-request-id', requestId);

  // Essential Edge Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, images, logos
     */
    '/((?!_next/static|_next/image|favicon.ico|images|logos|icons).*)',
  ],
};
