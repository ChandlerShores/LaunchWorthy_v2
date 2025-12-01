# Rollout - Resume Optimizer ↔ ATS API

## Dev
1. Run FastAPI service locally (`uvicorn app.main:app --port 8000`)
2. Set `ATS_API_BASE_URL=http://localhost:8000` and `ATS_API_TIMEOUT_MS=120000`
3. `npm run dev` and smoke test:
   - POST `/api/rewrite` with sample JD and bullets
   - GET `/api/health`

## Stage
1. Deploy FastAPI to Render (set `OPENAI_API_KEY`)
2. Set Next.js env: `ATS_API_BASE_URL=<render url>`, `ATS_API_TIMEOUT_MS=120000`
3. Verify health dashboard, run contract tests, and UI E2E flows

## Prod
1. Promote config and deploy Next.js
2. Monitor dashboards for errors & latency
3. Enable alerts and confirm on-call routing
4. Post-deploy validation with live smoke test


