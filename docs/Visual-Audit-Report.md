## Executive Summary

- **Brand baseline**: Tailwind tokens define a coherent palette and typography, with `Inter` as primary font and a calm, confident green/blue/gray scheme.
  - Tokens: see `tailwind.config.ts:11–107`.
  - Fonts: `src/app/globals.css:1–16`, `src/app/(site)/layout.tsx:10,20`.
- **Strengths**: Consistent layout container rhythm; strong CTA component (`CTAButton`) with variants; accessible focus styles; clear form states.
- **Visual debt**:
  - Buttons: **~10 unique button class strings across 8 components**, plus unused global `.btn-*` styles (not referenced). Evidence below.
  - Icons: Custom `Icon` exists but many inline SVGs are used instead → duplication/mismatch.
  - Motion: Only `animate-spin` spinners; no `prefers-reduced-motion` handling; custom keyframes defined but unused.
  - Typography: `font-oswald` used once without token/definition (hypothesis drift).
- **Policy vs Reality**: Tokens exist and are mostly applied, but DX ≠ UX where ad‑hoc button styles bypass `CTAButton` and `.btn-*` utilities.
- **North Star**: Unify buttons to 3 variants; consolidate icon usage to `Icon`; standardize hero/section patterns; document tokens with usage examples.

---

## Brand Intent

Stated intent (inferred from content and metadata):
- **Positioning**: "21 days from 'decent' to 'obvious hire'"; practical, high‑conversion coaching.
  - `src/lib/metadata.ts:6–8,46–61`
- **Typography**: `Inter` across the site.
  - `src/app/globals.css:1–16` (Google import + base family)
  - `src/app/(site)/layout.tsx:10,20` (Next Font `Inter` applied to `<html>`)
- **Color**: Extended Tailwind palette with brand `primary`, `navy`, status colors (`success`, `warning`, `error`, `info`).
  - `tailwind.config.ts:11–107`
- **Tone & imagery**: Authentic, personable; headshot on home/about; OG image configured.
  - `src/app/(site)/page.tsx:214–223`, `src/app/(site)/about/page.tsx:49–56`, `src/lib/metadata.ts:49–56,58–62`

Hypotheses (to verify):
- `font-oswald` used for logo lockup but not defined in tokens or CSS. Verify if Oswald is desired brand accent font; else remove.
  - Evidence: `src/components/Header.tsx:12`
- Public stock images exist but are unused. Confirm imagery direction (photography vs illustration).
  - Files: `public/spacex-unsplash.webp`, `public/nasa-unsplash.webp` (unused in codebase).

Verification sources needed:
- Brand deck or Figma library (typography/imagery). Contrast matrix for brand colors. Iconography guidelines.

---

## Visual Inventory

### Color Usage (tokens)

- Tokens defined: `tailwind.config.ts:11–107`.
- Representative usage counts (class grep):
  - `primary-600`: 143 occurrences across 24 files.
  - `navy-900`: 126 occurrences across 23 files.
  - `text-gray-600`: 98 occurrences across 23 files.
  - `primary-50`: 19 occurrences across 18 files.
  - `bg-navy-50`: 21 occurrences across 15 files.

Examples:
- Headings: `text-navy-900`
  - `src/components/Hero.tsx:52–55`, `src/app/(site)/page.tsx:103–106,124–127,171–176`
- Primary surfaces and accents: `bg-primary-600`, `text-primary-600`
  - `src/app/(site)/services/page.tsx:56–76,88`, `src/components/ServiceCard.tsx:45`, `src/app/(site)/page.tsx:130–135,253–276`

Non-token hex usage: none found in `src/**/*.ts(x)` and CSS (grep).

### Typography

- Base: `Inter` (`src/app/globals.css:1–16`, `src/app/(site)/layout.tsx:10,20`).
- Scale in use (utilities): `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`, `md:text-6xl`.
  - `src/components/Hero.tsx:52–60`, `src/app/(site)/page.tsx:103–106,144–149,198–206`
- Accent (hypothesis): `font-oswald` used for logo.
  - `src/components/Header.tsx:12–14`

### Spacing & Layout Rhythm

- Container rhythm consistent: `container mx-auto px-4 sm:px-6 lg:px-8` in header/footer/sections.
  - `src/components/Header.tsx:9`, `src/components/Footer.tsx:8`, `src/components/Section.tsx:47`
- Section vertical rhythm via prop scale: `py-16/24/32` mapping.
  - `src/components/Section.tsx:21–26`

### Buttons / CTAs

- Central component: `CTAButton` with CVA variants (primary/secondary/outline), sizes (sm/default/lg).
  - Definition: `src/components/CTAButton.tsx:6–26`
  - Usage: 19 instances across 12 files (e.g., `src/components/Hero.tsx:66–75`, `src/components/Header.tsx:31–33`).
  - Variant counts: primary (default) ≈ 14, `variant="secondary"` = 5, `variant="outline"` = 0.
- Global utility classes exist but unused: `.btn-primary`, `.btn-secondary`, `.btn-outline`.
  - `src/app/globals.css:18–29`; no `.btn-*` usage found.
- Ad-hoc button styles (bypass `CTAButton`):
  - Header mobile CTA: `src/components/Header.tsx:38–43`.
  - Home final CTA anchors: `src/app/(site)/page.tsx:262–273` (two styles).
  - Contact submit: `src/app/(site)/contact/page.tsx:155–161`.
  - BookingWidget pay button: `src/components/BookingWidget.tsx:185–199`.
  - Error page buttons: `src/app/(site)/error.tsx:59–81`.
  - Finding: **~10 distinct class strings** across these, creating visual drift.

### Forms & Inputs

- Patterns: Label-above, filled fields, prominent focus ring (`focus:ring-2 focus:ring-primary-500`).
  - Contact form: `src/app/(site)/contact/page.tsx:104–161`.
  - Booking step 1: `src/components/booking/BookingStep1.tsx:61–78,81–99,103–119`.
  - BookingWidget email: `src/components/BookingWidget.tsx:170–183`.
- States: Errors (`text-error-600`, panels) and success banners present.
  - `src/app/(site)/contact/page.tsx:96–101,73–91`.

### Imagery

- Headshot imagery on Home/About via Next Image.
  - `src/app/(site)/page.tsx:214–223`, `src/app/(site)/about/page.tsx:49–56`.
- OG image defined: `src/lib/metadata.ts:49–56,58–62`.
- Unused stock assets in `public/` (hypothesis drift): `spacex-unsplash.webp`, `nasa-unsplash.webp`.

### Iconography

- Custom `Icon` component with a small set (stroke & fill mixed):
  - `src/components/Icon.tsx:9–51`.
- Inline SVGs widely used instead of `Icon` (duplication):
  - Home bullets: `src/app/(site)/page.tsx:109–114`.
  - ServiceCard checks: `src/components/ServiceCard.tsx:52–55`.
  - Multiple info/alert icons across booking steps: `src/components/booking/BookingStep1.tsx:193–201`, `BookingStep2.tsx:256–277,283–295`, `BookingStep3.tsx:229–243,248–271,303–313`.

### Motion / Animation

- Only loading spinners via `animate-spin`.
  - `src/components/booking/BookingStep2.tsx:230–233`, `src/components/BookingWidget.tsx:191–199`, `src/components/booking/BookingStep3.tsx:415–423`, `src/app/(site)/success/page.tsx:53`.
- Custom keyframes defined but unused (`fade-in`, `slide-up`).
  - `tailwind.config.ts:112–125`.
- No `motion-reduce` handling found (hypothesis to add an accessibility policy).

### States & Feedback

- Error boundary UI present for `(site)` with actionable CTAs.
  - `src/app/(site)/error.tsx:49–81`.
- Form success/error banners appear where relevant.
  - `src/app/(site)/contact/page.tsx:73–101`.

### Accessibility

- Focus rings widely implemented: `focus:ring-2 focus:ring-primary-500` on CTAs/forms.
  - Examples: `src/components/CTAButton.tsx:6–14`, `src/app/(site)/contact/page.tsx:117,134,150`, `src/components/FAQ.tsx:31–34`.
- `aria-*` attributes appear on key interactive elements.
  - `src/app/(site)/error.tsx:38,62,71,78`; `src/components/TrustIndicators.tsx:24,44,47`.
- Contrast: Likely acceptable for primary/navy on white; verify with brand contrast matrix (hypothesis).

---

## Inconsistencies & Findings

1) Buttons/CTAs fragmented
- Evidence:
  - Unused `.btn-*` utilities: `src/app/globals.css:18–29`.
  - `CTAButton` variants exist but mixed ad‑hoc buttons in components:
    - Header mobile: `src/components/Header.tsx:38–43`.
    - Home final anchors: `src/app/(site)/page.tsx:262–273`.
    - Contact submit: `src/app/(site)/contact/page.tsx:155–161`.
    - Error actions: `src/app/(site)/error.tsx:59–81`.
- Impact: Inconsistent sizes, radii, spacing, focus rings. Harder maintenance.

2) Icon duplication and style mismatch
- Evidence: `Icon.tsx` exists (`src/components/Icon.tsx:9–51`) but many inline SVGs (e.g., `src/app/(site)/page.tsx:109–114`, `src/components/ServiceCard.tsx:52–55`).
- Impact: Repeated markup, inconsistent stroke/fill, harder to theme.

3) Motion policy missing
- Evidence: Only `animate-spin`; no `prefers-reduced-motion` branches; unused keyframes in config (`tailwind.config.ts:112–125`).
- Impact: Missed micro-interaction polish; potential a11y gaps for vestibular disorders.

4) Typography drift (hypothesis)
- Evidence: `font-oswald` (`src/components/Header.tsx:12`) not defined in tokens.
- Impact: Potentially inconsistent brand typography; build-time unused class.

5) Unused imagery assets (hypothesis)
- Evidence: `public/spacex-unsplash.webp`, `public/nasa-unsplash.webp` not referenced.
- Impact: Confusion about imagery direction; repo bloat.

---

## Policy vs Reality

- Policy: Use Tailwind tokens for color/spacing; `CTAButton` for calls-to-action; `Icon` wrapper for SVGs; `Section` for layout.
  - Sources: `tailwind.config.ts:11–125`, `src/components/CTAButton.tsx:6–26`, `src/components/Icon.tsx:9–51`, `src/components/Section.tsx:21–33,47–50`.
- Reality: Tokens applied broadly; however, CTAs often bypass component; icons frequently inline; custom animation tokens unused.

Drift counts
- Buttons: ~10 unique class strings outside `CTAButton` across 6+ files (citations above).
- Icons: 10 `Icon` usages vs many inline SVGs (see files cited).
- Motion: 0 uses of `fade-in`/`slide-up`; 4 uses of `animate-spin` (citations above).

---

## Vision Sketch (North Star)

Words
- **Buttons**: 3 variants only—Primary (filled), Secondary (outline on light), Tertiary (text). Sizes sm/md/lg with consistent paddings and radii. All via `CTAButton` (or a new `Button`) + tokens.
- **Iconography**: Single custom icon set; all icons consumed via `Icon`; standard sizes (16/20/24), stroke-only for consistency; color via tokens.
- **Sections/Hero**: Repeatable hero with optional badge, two CTAs, trust indicators; controlled background variants (`white`, `navy-50`, `primary-50`).
- **Motion**: Subtle `fade-in`/`slide-up` on entry; respect `motion-reduce`.

ASCII style tile
```
[Colors] primary: #4a8f6a  navy: #0f172a  gray: #4b5563
[Type]   Inter — Headings: 700 — Body: 400–500
[Buttons]
  Primary   [bg primary-600]  [text white]   [radius lg] [shadow sm]
  Secondary [border primary-600] [text primary-600] [hover primary-50]
  Tertiary  [text primary-600 underline] [hover primary-700]
[Cards] white surface, border navy-200, radius xl, space 24
[Icon]  stroke 2px, 24px default, themable via text-* classes
```

---

## Risk Register

- R1: Button consolidation may change perceived prominence
  - Risk: medium; Impact: marketing conversion
  - Mitigation: A/B test critical CTAs; incremental rollout.
- R2: Icon consolidation might alter visual cues
  - Risk: low; Mitigation: map old inline SVGs to `Icon` equivalents.
- R3: Motion additions might affect users sensitive to motion
  - Risk: low; Mitigation: add `motion-reduce` fallbacks.
- R4: Typography cleanup (remove `font-oswald`) may affect logo styling
  - Risk: low; Mitigation: replace with SVG logo lockup or define tokenized accent font.

---

## Staged Refactor Plan (No code changes yet — plan only)

Batch 1: Token alignment (low lift)
- Remove/retire unused `.btn-*` utilities or wire them to `CTAButton` API.
- Document color/typography scales with examples.
- Add `motion-reduce` utilities and guidance.

Batch 2: Core components (medium lift)
- Enforce `CTAButton` for all CTAs; migrate ad‑hoc buttons (see citations).
- Expand `Icon` set; replace inline SVGs with `Icon`.
- Add `FormField` patterns (label, help, error) with status tokens.

Batch 3: Layout rhythm & grids (medium lift)
- Codify `Section` variants and paddings; add `Container` helper.

Batch 4: Imagery & iconography (medium/high lift)
- Define imagery direction; prune unused assets; produce hero artwork if needed.

Batch 5: Motion & polish (low/medium lift)
- Apply `fade-in`/`slide-up` on hero/cards; ensure `motion-reduce` coverage.
- Write visual docs in `/docs` with token matrices and usage.

Success criteria
- 0 ad‑hoc CTAs outside `CTAButton`.
- 0 inline SVGs replaced by `Icon` where feasible.
- Motion tokens used in 3+ hero/section entries; `motion-reduce` present.

---

## Tracker Issues (by component/page)

- Header: Consolidate mobile CTA to `CTAButton`
  - Why: Inconsistent button sizing/spacing vs desktop CTA
  - Evidence: `src/components/Header.tsx:38–43`
  - Effort: S; Risk: Low; Impact: Medium

- Home (Final CTA): Replace anchor CTAs with `CTAButton`
  - Why: Duplicate button styles and spacing
  - Evidence: `src/app/(site)/page.tsx:262–273`
  - Effort: S; Risk: Low; Impact: High

- Contact: Use `CTAButton` for submit for consistency
  - Why: Align focus/spacing with primary CTA system
  - Evidence: `src/app/(site)/contact/page.tsx:155–161`
  - Effort: S; Risk: Low; Impact: Medium

- Error page: Normalize action buttons to component variants
  - Why: 3 unique styles in one view
  - Evidence: `src/app/(site)/error.tsx:59–81`
  - Effort: S; Risk: Low; Impact: Medium

- Iconography: Replace inline SVG checks/arrows with `Icon`
  - Why: Duplication; inconsistent stroke/fill
  - Evidence: `src/app/(site)/page.tsx:109–114`, `src/components/ServiceCard.tsx:52–55`
  - Effort: M; Risk: Low; Impact: Medium

- Motion: Apply `fade-in`/`slide-up` with `motion-reduce` fallbacks
  - Why: Cohesive polish; a11y support
  - Evidence: Unused keyframes `tailwind.config.ts:112–125`
  - Effort: S; Risk: Low; Impact: Medium

---

## Open Questions

1) Is Oswald an approved accent font? If yes, define as token; if not, remove.
   - Evidence needed: Brand typography guide; Figma text styles.
2) Preferred imagery direction for hero/marketing (photo vs vector)?
   - Evidence needed: Brand guidelines; asset library.
3) Should `.btn-*` utilities be removed or mapped to the component system?
   - Evidence needed: Historical usage; dev preference.


