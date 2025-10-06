import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Security headers
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  // Content Security Policy
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://assets.calendly.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.stripe.com https://formspree.io https://calendly.com",
    "frame-src https://js.stripe.com https://calendly.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  
  // Rate limiting headers (basic implementation)
  const rateLimitKey = request.ip || 'anonymous';
  const rateLimitValue = request.headers.get('x-rate-limit') || '0';
  
  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', '100');
  response.headers.set('X-RateLimit-Remaining', Math.max(0, 100 - parseInt(rateLimitValue)).toString());
  
  // Maintenance mode check (only in production)
  if (process.env.NODE_ENV === 'production' && process.env.MAINTENANCE_MODE === 'true') {
    // Allow API routes and static files
    if (request.nextUrl.pathname.startsWith('/api/') || 
        request.nextUrl.pathname.startsWith('/_next/') ||
        request.nextUrl.pathname.startsWith('/favicon')) {
      return response;
    }
    
    return new NextResponse('Site offline for maintenance', { status: 503 });
  }
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
