# Monitoring and Alerts - Resume Optimizer

## Key Metrics
- Requests per minute to `/api/rewrite`
- Upstream 429/5xx rates
- p50/p95 latency for `/api/rewrite` and `/api/health`
- Retry attempts (count of 502/504 retries)

## Dashboards
- Timeseries: latency (p50/p95), error rates (4xx/5xx), 429 counts
- Top errors by message (group by `error`)
- Request volume with breakdown by status code

## Alerts (examples)
- 5xx rate > 1% for 5 minutes on `/api/rewrite`
- p95 latency > 10s for 10 minutes on `/api/rewrite`
- 429 rate > baseline (e.g., > 5/min for 10 minutes)

## Logs
All logs are JSON-structured with fields:
`kind`, `event`, `request_id`, `status_code`, `latency_ms`, `retry_attempts`, optional `error`.


