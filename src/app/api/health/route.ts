import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const ATS_API_BASE_URL = process.env.ATS_API_BASE_URL!;
const HEALTH_TIMEOUT_MS = 5000;

export async function GET() {
  const controller = new AbortController();
  const to = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);
  const started = Date.now();

  if (!ATS_API_BASE_URL) {
    console.error(
      JSON.stringify({
        kind: 'health_proxy',
        event: 'config_error',
        error: 'ATS_API_BASE_URL environment variable is not set',
        hint: 'Add ATS_API_BASE_URL=http://localhost:8000 to .env.local and restart the Next.js server',
      })
    );
    return NextResponse.json(
      {
        upstream_status_code: 0,
        upstream: null,
        status: 'down',
        error: 'Server misconfiguration: ATS_API_BASE_URL is not set. Please add ATS_API_BASE_URL to .env.local and restart the server.',
        checked_at: new Date().toISOString(),
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${ATS_API_BASE_URL}/health`, { signal: controller.signal });
    const upstream = await res.json().catch(() => ({}));
    clearTimeout(to);

    const status = res.ok && upstream?.status === 'ok' ? 'ok' : 'degraded';
    const latency_ms = Date.now() - started;

    return NextResponse.json({
      upstream_status_code: res.status,
      upstream,
      status,
      checked_at: new Date().toISOString(),
      latency_ms,
    });
  } catch (e: any) {
    clearTimeout(to);
    const latency_ms = Date.now() - started;
    return NextResponse.json(
      {
        upstream_status_code: 0,
        upstream: null,
        status: 'down',
        error: e?.message || 'health check failed',
        checked_at: new Date().toISOString(),
        latency_ms,
      },
      { status: 503 }
    );
  }
}


