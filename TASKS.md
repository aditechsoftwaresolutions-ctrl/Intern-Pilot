# TASKS.md

## MVP goal
A university student in Uganda can load or configure their profile (course, year, skills), explore a verified feed of Ugandan tech internships with deadline countdowns, extract a new listing from a raw WhatsApp/LinkedIn post with Gemini 2.5 Flash, receive personalized career advice from a grounded Gemini advisor citing exclusively real database listings, toggle between dark/light themes, and securely authenticate within a zero-trust hardened environment.

## Current task
All MVP, UI/UX refinement, and security hardening tasks completed and verified.

## Completed Tasks

### T-001: Project Scaffolding, Theme & Responsive Dashboard Shell (Phase 1)
- Priority: P0
- Status: Done
- Acceptance criteria:
  - [x] Next.js 14 App Router project initialized with TypeScript and Tailwind CSS.
  - [x] `@google/genai`, `@supabase/supabase-js`, and `lucide-react` installed.
  - [x] Core types (`src/types/index.ts`) and realistic Ugandan seed data (`src/lib/seed-data.ts`) configured.
  - [x] Dark emerald glassmorphic theme tokens implemented in `src/app/globals.css`.
  - [x] Responsive dashboard shell (Desktop Sidebar, TopBar with Demo Profile Switcher, Mobile Bottom Nav, Bento Grid with StatCards and ReadinessGauge).
  - [x] `npm run build` runs and passes with zero errors (verified).

### T-002: Opportunity Feed, Skill Match Filtering & Profile Editor (Phase 2)
- Priority: P0
- Status: Done
- Acceptance criteria:
  - [x] `src/components/dashboard/OpportunityCard.tsx` created with color-coded deadline countdown badges (emerald/amber/rose), skill matching tags, and direct apply links.
  - [x] `src/components/dashboard/OpportunityFeed.tsx` created supporting All, Best Match, Saved, and Applied filter tabs with category filters and live search.
  - [x] Save and Mark Applied state persisted via localStorage.
  - [x] `src/components/dashboard/ProfileEditor.tsx` provides interactive editing of skills, interests, and coursework with live demo persona switcher.

### T-003: Server-Side Gemini Extractor & Ingest UI (Phase 3)
- Priority: P1
- Status: Done
- Acceptance criteria:
  - [x] `src/lib/gemini.ts` implements `extractOpportunityFromText` with structured JSON schema, 12s timeout, and fallback resilience.
  - [x] `src/app/api/gemini/extract/route.ts` provides server-side POST endpoint validating payloads.
  - [x] `src/components/dashboard/ExtractorModal.tsx` provides text area, 1-click demo presets (WhatsApp campus forwards), structured preview card, and instant "Publish to Feed" action.

### T-004: Grounded Gemini Career Advisor & Slide-Over Drawer (Phase 4)
- Priority: P0
- Status: Done
- Acceptance criteria:
  - [x] `src/lib/gemini.ts` implements `adviseCareer` with strict anti-hallucination system prompt injecting database listings.
  - [x] `src/app/api/gemini/chat/route.ts` Route Handler created with 12s timeout and fallback advice.
  - [x] `src/components/dashboard/AdvisorDrawer.tsx` provides slide-over drawer and full tab view with 3 starter prompts and conversational interface.
  - [x] `npm run build` and `npm run lint` pass with zero errors (verified).

### T-005: Glassy Split-Panel Auth & Session Management (Phase 5)
- Priority: P1
- Status: Done
- Acceptance criteria:
  - [x] Responsive dual-panel glassmorphic login & registration page at `src/app/login/page.tsx`.
  - [x] Server-side login/signup route (`src/app/api/auth/login/route.ts`) with session cookie management.
  - [x] Server-side logout route (`src/app/api/auth/logout/route.ts`) with cookie expiration.
  - [x] Client session decoding in `src/lib/auth-client.ts` and server auth in `src/lib/auth.ts`.
  - [x] Route redirection in `src/middleware.ts` for authed users visiting `/login`.
  - [x] Removed all hardcoded Brian identity references across codebase.

### T-006: Theme Switcher: Dark & Light Mode (Phase 6)
- Priority: P2
- Status: Done
- Acceptance criteria:
  - [x] `ThemeProvider` context in `src/lib/theme-context.tsx` with `toggle()` and localStorage persistence (`ip-theme`).
  - [x] System preference `prefers-color-scheme` detection on initial load.
  - [x] TopBar Sun/Moon toggle button with smooth iconography transitions.
  - [x] High-contrast light mode tokens (`#F0FBF6` background, crisp white cards, emerald borders).
  - [x] `npm run build` verified.

### T-007: Zero-Trust Security Hardening (Phase 7)
- Priority: P0
- Status: Done
- Acceptance criteria:
  - [x] PostgreSQL Row Level Security (RLS) schema and private storage bucket policy in `supabase/schema.sql`.
  - [x] Server-side auth checks on all API endpoints (`/api/gemini/*`, `/api/advisor`, `/api/ingest`).
  - [x] Anti-IDOR assertions in `src/lib/auth.ts` preventing cross-user profile tampering.
  - [x] Server-side admin role guard in `src/middleware.ts` intercepting `/admin` and `/api/admin`.
  - [x] Sliding-window rate limiter in `src/lib/rate-limit.ts` (10/min auth, 20/min AI).
  - [x] Server-side input sanitization and XSS protection in `src/lib/sanitize.ts`.
  - [x] Anti-bot honeypot field `_hp_verify` in `src/app/login/page.tsx` and login route.
  - [x] HTTP Security headers (HSTS, CSP, X-Frame-Options, nosniff) and `poweredByHeader: false` in `next.config.js`.
  - [x] Constant-time HMAC signature verification in `src/lib/webhook-verify.ts`.
  - [x] PDF magic-byte validation and 5MB ceiling in `src/lib/file-security.ts`.
  - [x] Structured security audit logger in `src/lib/audit.ts`.
  - [x] Parameterized SQL query enforcement via Supabase PostgREST SDK.

### T-008: Production Polish: SEO, Metadata, UX Refinement & Dev Hygiene (Phase 8)
- Priority: P1
- Status: Done
- Acceptance criteria:
  - [x] Dynamic and static SEO metadata configured with metadataBase, canonical URLs, descriptive titles, and social previews (`src/app/layout.tsx`, `src/app/login/layout.tsx`).
  - [x] Custom brand assets and icons generated (`public/icon.svg`, `public/favicon.ico`, `public/apple-icon.png`, `public/manifest.json`, `src/app/icon.tsx`, `src/app/apple-icon.tsx`).
  - [x] Custom 1200x630 Open Graph & Twitter share images created (`public/og-image.png`, `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`).
  - [x] Sitemaps and crawler policies generated via Next.js App Router (`src/app/sitemap.ts`, `src/app/robots.ts`).
  - [x] Custom branded 404 error page implemented (`src/app/not-found.tsx`).
  - [x] Custom branded error boundary implemented (`src/app/error.tsx`).
  - [x] Full-fidelity dashboard loading skeleton implemented (`src/app/loading.tsx`) and login Suspense fallback polished.
  - [x] Semantic heading hierarchy audited with exactly one H1 per page/tab view.
  - [x] Accessible button and input labels (`aria-label`, `aria-hidden`) added to dashboard controls.
  - [x] Mobile responsiveness hardened (`w-full min-h-screen`, touch target padding, bottom nav clearance).
  - [x] Dead click targets eliminated: StatCards and ReadinessGauge pills linked directly to feed filters.
  - [x] Dev hygiene and bundle optimization: `productionBrowserSourceMaps: false`, `compress: true`, compiler `removeConsole`, and `optimizePackageImports: ["lucide-react"]` configured in `next.config.js`.
  - [x] `npm run build` and `npm run lint` verified passing with zero errors.

## Later (Post-Hackathon)
- SMS / WhatsApp deadline reminders via Africa's Talking API.
- Tailored CV bullet point and cover letter generator per listing.
- Automated web scraper for Ugandan university notice boards.
- Employer portal for posting verified internships directly.
