<!-- c1ac3d15-c3ac-4033-8052-127932c74d4b 727214b7-c06c-403f-915f-f008758852e4 -->
# ATS Optimizer Wizard Implementation

## Overview

You are Senior Full-Stack Product Engineer (React + Next.js) with AI product experience and design intuition and a background in SaaS onboarding. Senior Full-Stack Web + AI Product + Premium UX instincts + Growth mindset

Create a confidence-building, corporate-grade resume optimizer that takes users from resume upload to AI-enhanced bullets in under 2 minutes. The wizard will feature full state persistence, client-side document parsing, AI-powered job description analysis, and freemium monetization.

## Architecture Decisions

### Document Parsing (Client-Side)

- Use `pdf-parse` (PDF extraction) + `mammoth` (DOCX extraction)
- Parse on upload, extract bullets immediately
- No server upload needed until final submission

### Job Description Analysis (Client-Side Pattern Matching)

- Pure client-side keyword extraction and pattern matching
- No AI API calls needed
- Extract: job title, seniority, hard skills, tools, soft skills, requirements
- Use regex patterns, common job title dictionaries, and skill keyword lists
- Categorize based on context clues (e.g., "required:", "nice to have:", etc.)

### Usage Tracking (Freemium)

- Store usage count in localStorage with timestamp
- First use: completely free
- Subsequent uses: require payment via Stripe
- Track by browser fingerprint (simple localStorage key)

### State Persistence

- Mirror `useBookingFlow` pattern with `useATSOptimizerFlow` hook
- Save all wizard state to localStorage
- Survive page refresh/navigation
- Clear on completion or explicit reset

## File Structure

### New Files to Create

**Pages:**

- `src/app/(site)/tools/resume-optimizer/page.tsx` - Main wizard page
- `src/app/(site)/tools/resume-optimizer/layout.tsx` - Page layout with metadata

**API Routes:**

- `src/app/api/ats/submit-optimization/route.ts` - Proxy to `/api/bulk/process` endpoint
- `src/app/api/ats/check-status/[job_id]/route.ts` - Proxy to `/api/bulk/status/{job_id}` endpoint  
- `src/app/api/ats/get-results/[job_id]/route.ts` - Proxy to `/api/bulk/results/{job_id}` endpoint

**Components (Wizard Steps):**

- `src/components/optimizer/ATSOptimizerFlow.tsx` - Main flow controller
- `src/components/optimizer/OptimizerStep1.tsx` - Upload resume (PDF/DOCX)
- `src/components/optimizer/OptimizerStep2.tsx` - Review/edit extracted bullets
- `src/components/optimizer/OptimizerStep3.tsx` - Paste JD + parse skills/requirements
- `src/components/optimizer/OptimizerStep4.tsx` - Review & submit for optimization
- `src/components/optimizer/OptimizerResults.tsx` - Display optimized bullets

**Supporting Components:**

- `src/components/optimizer/FileUploadZone.tsx` - Drag-drop + file picker
- `src/components/optimizer/BulletEditor.tsx` - Inline bullet editing
- `src/components/optimizer/ConfidenceBadge.tsx` - Visual confidence indicator
- `src/components/optimizer/SkillChip.tsx` - Editable skill/requirement chip
- `src/components/optimizer/UsageLimitModal.tsx` - Payment gate for 2+ uses
- `src/components/optimizer/ProgressSpinner.tsx` - Processing animation

**Hooks:**

- `src/hooks/useATSOptimizerFlow.ts` - State management + persistence

**Utilities:**

- `src/lib/resume-parser.ts` - PDF/DOCX parsing logic
- `src/lib/bullet-extractor.ts` - Extract bullets from parsed text
- `src/lib/optimizer-usage.ts` - Usage tracking helpers

### Files to Modify

**Routes:**

- `src/lib/routes.ts` - Add `/tools/resume-optimizer` route + navigation entry

**Environment Variables:**

- `env.local.example` - Add `OPENAI_API_KEY` example

**Package Dependencies:**

- `package.json` - Add `pdf-parse`, `mammoth`, `openai` libraries

## Implementation Steps

### Step 1: Setup & Dependencies

1. Add new npm packages: `pdf-parse`, `mammoth`, `openai`
2. Update `env.local.example` with `OPENAI_API_KEY`
3. Add routes to `src/lib/routes.ts`

### Step 2: State Management & Persistence

Create `useATSOptimizerFlow` hook mirroring booking flow pattern:

- Track current step (1-4)
- Store uploaded file metadata
- Store extracted bullets (with confidence scores)
- Store JD text + parsed requirements
- Store optimization settings (tone, max_len, variants)
- Store usage count + timestamps
- Persist to localStorage, restore on mount

### Step 3: Document Parsing Utilities

Build `resume-parser.ts`:

- Accept File object (PDF or DOCX)
- Extract text using appropriate library
- Return extracted text + metadata

Build `bullet-extractor.ts`:

- Parse resume text using pattern matching
- Identify bullet points (•, -, *, numbered lists)
- Assign confidence scores (high/medium/low)
- Return structured array of bullets

### Step 4: API Endpoints

**`/api/ats/parse-jd` (POST):**

- Accepts: `{ jd_text: string }`
- Calls OpenAI API with structured prompt
- Returns:
```typescript
{
  job_title: string;
  seniority: string;
  hard_skills: string[];
  tools: string[];
  soft_skills: string[];
  must_haves: string[];
  nice_to_haves: string[];
}
```


**`/api/check-optimizer-usage` (GET):**

- Reads usage count from request metadata
- Returns: `{ allowed: boolean, usage_count: number, requires_payment: boolean }`

### Step 5: Wizard Components

**OptimizerStep1 - Upload Resume:**

- Drag-drop file zone with clear instructions
- Accept PDF/DOCX only
- Parse immediately on drop
- Show friendly preview: "Found X bullet points"
- Highlight low-confidence extractions gently
- CTA: "Review Bullets" button (always enabled)

**OptimizerStep2 - Review Bullets:**

- Display all extracted bullets with inline editing
- Show confidence badges (only if helpful)
- "Add Bullet" button for manual additions
- Tone: "Take a quick look — we'll handle the rest."
- CTA: "Looks Good" button (always enabled)

**OptimizerStep3 - Paste Job Description:**

- Large textarea for JD paste
- "Analyze" button triggers `/api/ats/parse-jd`
- Display parsed data as editable chips:
  - Job Title (text input)
  - Seniority (dropdown: entry/mid/senior/lead)
  - Skills grouped by type (chips)
- Progressive disclosure: all editing optional
- Tone: "Looks like they really care about Python and leadership here."
- CTA: "Continue" button

**OptimizerStep4 - Review & Submit:**

- Show summary of what will be optimized:
  - X bullets
  - For: [Job Title] at [Seniority] level
  - Targeting: [top 3-5 skills]
- Settings (collapsed by default):
  - Tone: professional/concise/dynamic (default: professional)
  - Max length: 25-35 words (default: 30)
  - Variants per bullet: 1-3 (default: 1)
- Check usage limit (if 2+ uses, show payment modal)
- CTA: "Optimize My Resume" button

**OptimizerResults:**

- Synchronous results display (no loading screen)
- Show original vs optimized bullets side-by-side
- Highlight changes (additions in green, removals in gray)
- "Copy All" and "Copy Individual" buttons
- "Start Over" button (clears state)

### Step 6: Payment Integration

**UsageLimitModal:**

- Triggered when usage_count >= 1
- Explain value: "You've used your free optimization!"
- Show pricing: $10 for 5 more optimizations OR resume service upsell
- Stripe checkout integration (mirror BookingStep2 pattern)
- On payment success: increment usage allowance, proceed with optimization

### Step 7: Main Page & Layout

**`/tools/resume-optimizer/page.tsx`:**

- Hero section: "Optimize Your Resume for Any Job"
- Subheading: "Upload resume, paste job description, get ATS-friendly bullets instantly."
- Render `<ATSOptimizerFlow />`
- Trust indicators: "Free first use • 2-minute process • No signup required"

**`/tools/resume-optimizer/layout.tsx`:**

- SEO metadata
- Structured data for tool page

### Step 8: Navigation & Discoverability

- Add "Resume Optimizer" to header navigation (Tools dropdown)
- Add card to homepage showcasing the tool
- Link from services page as complementary free tool

## Key UX Principles

**Reassuring Language:**

- "We'll handle the rest"
- "Optional edits — or keep going"
- "Your resume stays private and is only sent once you confirm"

**Visual Hierarchy:**

- Primary CTAs always visible and enabled
- Secondary options collapsed by default
- Confidence indicators subtle, not alarming

**Error Handling:**

- Graceful file parse failures: "We couldn't extract text automatically. Paste your bullets below."
- JD parse failures: "Manual entry mode" with pre-filled form
- API failures: "Try again" with retry button

**Progress Indication:**

- Step counter (1/4, 2/4, etc.)
- Progress bar visual
- Automatic save indicator: "Changes saved"

## Testing Strategy

**Manual Testing Checklist:**

1. Upload various PDF/DOCX formats (test parsing accuracy)
2. Test state persistence (refresh mid-flow)
3. Test freemium gate (clear localStorage, test 2nd use)
4. Test JD parsing with different job descriptions
5. Test optimization flow end-to-end
6. Test mobile responsiveness

**Edge Cases:**

- Empty resume files
- Scanned PDFs (no extractable text)
- Very long JDs (>5000 words)
- Network failures during API calls
- Payment cancellation

## Environment Variables Required

```
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_ATS_API_URL=https://... (already exists)
NEXT_PUBLIC_OPTIMIZER_PAYMENT_PRICE_ID=price_... (Stripe Price ID for optimizer purchases)
```

## Success Metrics

- < 2 minutes from upload to results
- 80%+ completion rate (step 1 → results)
- Clear conversion funnel for freemium → paid
- Zero API key exposure in client bundle
- Full mobile responsiveness

## Final Touches

- Add FAQ section below wizard: "How does it work?", "Is my resume private?", "What file formats?"
- Add testimonial/sample before-after bullets
- Add "Delete my data" button in results screen
- Privacy notice: "Files processed in memory, not stored permanently"

### To-dos

- [ ] Install npm packages (pdf-parse, mammoth, openai) and update environment configuration
- [ ] Create useATSOptimizerFlow hook with full state persistence pattern
- [ ] Build resume parser and bullet extractor utilities
- [ ] Create /api/ats/parse-jd endpoint with OpenAI integration
- [ ] Create /api/check-optimizer-usage endpoint for freemium gate
- [ ] Build all 4 wizard step components (upload, review bullets, JD paste, submit)
- [ ] Create OptimizerResults component with side-by-side comparison
- [ ] Build FileUploadZone, BulletEditor, SkillChip, UsageLimitModal components
- [ ] Create ATSOptimizerFlow main controller component
- [ ] Create page.tsx and layout.tsx for /tools/resume-optimizer route
- [ ] Update routes, add navigation entries, integrate into site
- [ ] Implement freemium payment gate with Stripe checkout