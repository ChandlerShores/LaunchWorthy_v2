import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';
export const maxDuration = 120;

type RewriteParams = {
  target_tense?: 'present' | 'past' | 'auto';
  max_words_per_bullet?: number;
  seniority_hint?: 'IC mid' | 'Manager' | 'Director';
  request_id?: string;
  prompt_version?: string;
  api_version?: string;
};

const ATS_API_BASE_URL = process.env.ATS_API_BASE_URL!;
const TIMEOUT_MS = Number(process.env.ATS_API_TIMEOUT_MS ?? 120000);

export async function POST(req: NextRequest) {
  const proxyStartedAt = Date.now();
  let requestId = randomUUID();
  let retryAttempts = 0;

  if (!ATS_API_BASE_URL) {
    console.error(
      JSON.stringify({
        kind: 'rewrite_proxy',
        event: 'config_error',
        error: 'ATS_API_BASE_URL environment variable is not set',
        hint: 'Add ATS_API_BASE_URL=http://localhost:8000 to .env.local and restart the Next.js server',
      })
    );
    return NextResponse.json(
      {
        error: 'Server misconfiguration: ATS_API_BASE_URL is not set. Please add ATS_API_BASE_URL to .env.local and restart the server.',
        request_id: requestId,
      },
      { status: 500 }
    );
  }

  try {
    const body = await req.json().catch(() => ({} as any));
    const { job_description, resume_bullets, params = {} as RewriteParams } = body ?? {};

    // Basic required validation
    if (typeof job_description !== 'string' || !Array.isArray(resume_bullets) || resume_bullets.length === 0) {
      return NextResponse.json(
        { error: 'job_description (string) and non-empty resume_bullets[] are required' },
        { status: 400 }
      );
    }

    // Payload limits
    if (job_description.length > 10_000) {
      return NextResponse.json(
        { error: 'job_description exceeds 10KB limit' },
        { status: 400 }
      );
    }
    if (resume_bullets.length > 50) {
      return NextResponse.json(
        { error: 'Too many bullets: max 50' },
        { status: 400 }
      );
    }

    // Clean bullets: non-empty strings
    const cleanBullets = resume_bullets
      .map((b: unknown) => (typeof b === 'string' ? b.trim() : ''))
      .filter((b: string) => b.length > 0);

    if (cleanBullets.length === 0) {
      return NextResponse.json(
        { error: 'resume_bullets must contain at least one non-empty string' },
        { status: 400 }
      );
    }

    // Params validation
    if (params) {
      if (params.max_words_per_bullet !== undefined) {
        if (
          typeof params.max_words_per_bullet !== 'number' ||
          params.max_words_per_bullet < 6 ||
          params.max_words_per_bullet > 60
        ) {
          return NextResponse.json(
            { error: 'max_words_per_bullet must be a number between 6 and 60' },
            { status: 400 }
          );
        }
      }
      if (params.target_tense && !['present', 'past', 'auto'].includes(params.target_tense)) {
        return NextResponse.json(
          { error: 'target_tense must be "present", "past", or "auto"' },
          { status: 400 }
        );
      }
      if (params.seniority_hint && !['IC mid', 'Manager', 'Director'].includes(params.seniority_hint)) {
        return NextResponse.json(
          { error: 'seniority_hint must be "IC mid", "Manager", or "Director"' },
          { status: 400 }
        );
      }
    }

    // Request ID propagation
    requestId = params.request_id || requestId;

    // Timeout controller
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    // Attempt function
    const attempt = async () => {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      
      // Optionally include API key if configured (some services require it, others don't)
      const apiKey = process.env.ATS_API_KEY;
      if (apiKey) {
        headers['X-API-Key'] = apiKey;
      }
      
      const res = await fetch(`${ATS_API_BASE_URL}/api/rewrite`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          job_description,
          resume_bullets: cleanBullets,
          params: { ...params, request_id: requestId },
        }),
        signal: controller.signal,
      });
      return res;
    };

    let res = await attempt();

    // 429: Do not retry
    if (res.status === 429) {
      clearTimeout(timeout);
      const payload = await res.json().catch(() => ({}));
      const detail = payload?.detail;
      const errorMsg =
        typeof detail === 'string' ? detail : 'Rate limit exceeded. Please try again later.';
      const upstreamReqId = typeof detail === 'object' ? detail?.request_id : payload?.request_id;

      const latencyMs = Date.now() - proxyStartedAt;
      console.log(
        JSON.stringify({
          kind: 'rewrite_proxy',
          event: 'rate_limited',
          request_id: upstreamReqId || requestId,
          status_code: 429,
          latency_ms: latencyMs,
          retry_attempts: retryAttempts,
        })
      );

      return NextResponse.json(
        { error: errorMsg, request_id: upstreamReqId || requestId, latency_ms: latencyMs },
        { status: 429 }
      );
    }

    // Retry once on 502/504
    if ((res.status === 502 || res.status === 504) && !res.ok) {
      retryAttempts = 1;
      res = await attempt();
    }

    clearTimeout(timeout);

    const payload = await res.json().catch(() => ({}));
    const latencyMs = Date.now() - proxyStartedAt;

    if (!res.ok) {
      // FastAPI wraps error details under "detail"
      const detail = payload?.detail;
      const errorMsg =
        typeof detail === 'string'
          ? detail
          : detail?.error || payload?.error || 'Rewrite failed';
      const upstreamReqId = typeof detail === 'object' ? detail?.request_id : payload?.request_id;

      console.error(
        JSON.stringify({
          kind: 'rewrite_proxy',
          event: 'upstream_error',
          request_id: upstreamReqId || requestId,
          status_code: res.status,
          latency_ms: latencyMs,
          retry_attempts: retryAttempts,
          error: errorMsg,
        })
      );

      return NextResponse.json(
        { error: errorMsg, request_id: upstreamReqId || requestId, latency_ms: latencyMs },
        { status: res.status }
      );
    }

    console.log(
      JSON.stringify({
        kind: 'rewrite_proxy',
        event: 'success',
        request_id: requestId,
        status_code: res.status,
        latency_ms: latencyMs,
        retry_attempts: retryAttempts,
      })
    );

    return NextResponse.json({ ...payload, request_id: requestId, latency_ms: latencyMs });
  } catch (err: any) {
    const latencyMs = Date.now() - proxyStartedAt;
    const status = err?.name === 'AbortError' ? 504 : 500;

    console.error(
      JSON.stringify({
        kind: 'rewrite_proxy',
        event: 'exception',
        request_id: requestId,
        status_code: status,
        latency_ms: latencyMs,
        retry_attempts: retryAttempts,
        error: err?.message || 'Internal error',
      })
    );

    return NextResponse.json(
      { error: err?.message || 'Internal error', request_id: requestId, latency_ms: latencyMs },
      { status }
    );
  }
}


