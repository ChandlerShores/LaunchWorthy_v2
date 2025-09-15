import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply maintenance mode in production
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse("Site offline for maintenance", {
      status: 503,
      headers: { "Retry-After": "3600" },
    });
  }
  
  // Allow requests to pass through in development
  return NextResponse.next();
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
}
