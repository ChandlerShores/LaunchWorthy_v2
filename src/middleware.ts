import { NextResponse } from 'next/server';

export function middleware() {
  return new NextResponse("Site offline for maintenance", {
    status: 503,
    headers: { "Retry-After": "3600" },
  });
}
