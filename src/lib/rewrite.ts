import { RateLimitError, RewriteApiResponse } from '@/types/rewrite';

export type RewriteInput = {
  job_description: string;
  resume_bullets: string[];
  params?: {
    target_tense?: 'present' | 'past' | 'auto';
    max_words_per_bullet?: number;
    seniority_hint?: 'IC mid' | 'Manager' | 'Director';
    prompt_version?: string;
    api_version?: string;
  };
};

export function validateRewriteInput(input: RewriteInput) {
  if (typeof input.job_description !== 'string' || input.job_description.length === 0) {
    throw new Error('Job description is required');
  }
  if (input.job_description.length > 10_000) {
    throw new Error('Job description exceeds 10KB limit');
  }
  if (!Array.isArray(input.resume_bullets) || input.resume_bullets.length === 0) {
    throw new Error('Provide at least one resume bullet');
  }
  if (input.resume_bullets.length > 50) {
    throw new Error('Too many bullets: max 50');
  }
  const { params } = input;
  if (params) {
    if (
      params.max_words_per_bullet !== undefined &&
      (typeof params.max_words_per_bullet !== 'number' ||
        params.max_words_per_bullet < 6 ||
        params.max_words_per_bullet > 60)
    ) {
      throw new Error('max_words_per_bullet must be between 6 and 60');
    }
    if (params.target_tense && !['present', 'past', 'auto'].includes(params.target_tense)) {
      throw new Error('target_tense must be "present", "past", or "auto"');
    }
    if (params.seniority_hint && !['IC mid', 'Manager', 'Director'].includes(params.seniority_hint)) {
      throw new Error('seniority_hint must be "IC mid", "Manager", or "Director"');
    }
  }
}

export async function rewriteBullets(input: RewriteInput) {
  validateRewriteInput(input);

  const res = await fetch('/api/rewrite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  const data = (await res.json().catch(() => ({}))) as RewriteApiResponse & {
    detail?: string | { error?: string; request_id?: string };
  };

  // Surface rate limit with clear error type
  if (res.status === 429) {
    // FastAPI returns { detail: "Rate limit exceeded..." }
    const detail = (data as any)?.detail;
    const msg = typeof detail === 'string' ? detail : (data as any)?.error || undefined;
    throw new RateLimitError(msg);
  }

  if (!res.ok) {
    // Generic error message, already normalized by proxy
    const message =
      (data as any)?.error ||
      (typeof (data as any)?.detail === 'string' ? (data as any)?.detail : 'Rewrite failed');
    throw new Error(message);
  }

  return data;
}


