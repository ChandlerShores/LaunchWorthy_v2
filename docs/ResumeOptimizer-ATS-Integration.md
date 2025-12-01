# Resume Optimizer ↔ ATS Resume Rewriter Integration

## Overview
Server-side proxy in Next.js connects the Resume Optimizer UI to the ATS Resume Rewriter FastAPI service with validation, retries, and observability.

## Endpoints
- Client → Next proxy: `POST /api/rewrite`
- Health: `GET /api/health` (proxies upstream `/health`)

## Environment
- `ATS_API_BASE_URL` — Base URL of the FastAPI service
- `ATS_API_TIMEOUT_MS` — upstream timeout (default 120000)

## Validation & Limits
- job_description: string, max 10KB
- resume_bullets: 1–50 items, non-empty strings
- params:
  - target_tense: "present" | "past" | "auto"
  - max_words_per_bullet: 6–60
  - seniority_hint: "IC mid" | "Manager" | "Director"

## Error Handling
FastAPI errors are wrapped under `detail`:
- 429: `{ "detail": "Rate limit exceeded. Try again later." }` (no retry)
- 502: `{ "detail": { "error": "INVALID_RESPONSE", "request_id": "..." } }`

Proxy returns normalized JSON including:
```json
{ "error": "...", "request_id": "...", "latency_ms": 1234 }
```

## Success Response Schema (subset)
Returned fields include:
- `request_id`, `latency_ms`
- `version`, `prompt_version`, `api_version`, `schema_version`
- `jd_signals` (matched, missing_but_relevant)
- `bullets` (original, revised, word_count, matched_signals, warnings)
- `grade` (overall_score, letter, subscores..., rationale, suggested_global_improvements)

## Observability
Structured logs (stdout):
```json
{ "kind": "rewrite_proxy", "event": "success|upstream_error|rate_limited|exception", "request_id": "...", "status_code": 200, "latency_ms": 1234, "retry_attempts": 0 }
```

## Client UX
- Client validation mirrors server limits
- 429 shows banner with cooldown


