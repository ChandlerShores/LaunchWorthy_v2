export type RewriteApiSuccess = {
  request_id: string;
  latency_ms: number;
  version: string;
  prompt_version: string;
  api_version: string;
  schema_version: string;
  jd_signals: {
    matched: string[];
    missing_but_relevant: string[];
  };
  bullets: Array<{
    original: string;
    revised: string;
    word_count: number;
    matched_signals: string[];
    warnings: string[];
    // New per-bullet scoring (backward-compatible: optional)
    score?: number; // 0-100
    letter?: 'A' | 'B' | 'C' | 'D' | 'F';
  }>;
  grade: {
    overall_score: number;
    letter: 'A' | 'B' | 'C' | 'D' | 'F';
    subscores: {
      alignment: number;
      impact: number;
      clarity: number;
      brevity: number;
      ats_compliance: number;
    };
    rationale: string;
    suggested_global_improvements: string[];
  };
};

export type RewriteApiError = {
  error: string;
  request_id?: string;
  latency_ms?: number;
};

export type RewriteApiResponse = RewriteApiSuccess | RewriteApiError;

export class RateLimitError extends Error {
  constructor(message = 'Rate limit exceeded. Please try again later.') {
    super(message);
    this.name = 'RateLimitError';
  }
}


