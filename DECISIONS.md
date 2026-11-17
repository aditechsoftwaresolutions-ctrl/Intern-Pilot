# DECISIONS.md

## Index
- [ADR-001: Next.js App Router on Vercel](#adr-001-nextjs-app-router-on-vercel) (Accepted)
- [ADR-002: Supabase (PostgreSQL) for Data Persistence](#adr-002-supabase-postgresql-for-data-persistence) (Accepted)
- [ADR-003: Server-Side Gemini API Integration via @google/genai](#adr-003-server-side-gemini-api-integration-via-googlegenai) (Accepted)
- [ADR-004: Frictionless Demo Profile (No Login Wall)](#adr-004-frictionless-demo-profile-no-login-wall) (Accepted)
- [ADR-007: Comprehensive Zero-Trust Security Hardening](#adr-007-comprehensive-zero-trust-security-hardening) (Accepted)
- [ADR-008: Production SEO, Metadata, UX Polish & Dev Hygiene Standards](#adr-008-production-seo-metadata-ux-polish--dev-hygiene-standards) (Accepted)
- [ADR-005: Africa's Talking SMS Deadline Alerts](#adr-005-africas-talking-sms-deadline-alerts) (Proposed)
- [ADR-006: Tailored CV Bullet & Cover Letter Generator](#adr-006-tailored-cv-bullet--cover-letter-generator) (Proposed)

---

## Accepted Decisions

### ADR-001: Next.js App Router on Vercel
- Date: 2026-11-13
- Status: Accepted
- Supersedes: None

#### Context
InternPilot must be developed and delivered before 5:00 PM today for the hackathon. It requires server-side execution for the Gemini API key, fast client-side rendering for a mobile-first interface, and zero-configuration deployment to Vercel.

#### Decision
Use Next.js (App Router, TypeScript, Tailwind CSS) deployed on Vercel. Server Route Handlers (`app/api/*`) host backend logic.

#### Alternatives
- *Vite + React SPA with separate Express server:* Requires managing two repositories or builds and separate hosting.
- *Firebase Hosting + Cloud Functions:* Higher deployment setup friction within a 4-hour window.

#### Consequences
Single repository, unified TypeScript types across frontend and API routes, instant Vercel CI/CD deployments.

---

### ADR-002: Supabase (PostgreSQL) for Data Persistence
- Date: 2026-11-13
- Status: Accepted
- Supersedes: None

#### Context
The app requires storing structured opportunity listings, application status (saved/applied), and handling relational queries. Vercel serverless environments have ephemeral filesystems, so local file storage cannot be used for mutations.

#### Decision
Use Supabase (PostgreSQL) accessed server-side via `@supabase/supabase-js`. Provide pre-seeded fallback data so the demo functions even if external database credentials are not supplied.

#### Alternatives
- *Vercel Postgres:* Similar benefits, but Supabase offers instant dashboard table viewing for demo judges.
- *Firebase Firestore:* NoSQL schema is less rigid for structured opportunity filtering.

#### Consequences
Fast relational queries and filtering on deadlines and eligibility. Requires `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in environment.

---

### ADR-003: Server-Side Gemini API Integration via @google/genai
- Date: 2026-11-13
- Status: Accepted
- Supersedes: None

#### Context
Hackathon rules require using the Google Gemini API. Crucially, the Gemini API key must never reach the client browser, and the advisor chatbot must strictly never hallucinate or invent listings, deadlines, or requirements.

#### Decision
All interactions with Gemini use the official `@google/genai` SDK within Next.js server Route Handlers (`/api/chat` and `/api/extract`).
1. **Advisor Chat (`/api/chat`):** Injects student profile JSON and active database listings JSON into the system prompt with strict zero-hallucination guardrails (`gemini-2.5-flash`).
2. **Listing Extractor (`/api/extract`):** Uses structured JSON schema parsing to extract title, organization, deadline, eligibility, requirements, and link from messy text.

#### Alternatives
- *Client-side SDK calls:* Rejected; leaks API key in network tab.
- *Unconstrained prompting:* Rejected; risks hallucinating non-existent scholarships.

#### Consequences
Guaranteed key security. Model output is grounded exclusively in verified database listings. Graceful fallback message returned on network/rate-limit errors.

---

### ADR-004: Frictionless Demo Profile (No Login Wall)
- Date: 2026-11-13
- Status: Accepted
- Supersedes: None

#### Context
A 3-minute hackathon live demo cannot afford login delays, email confirmation links, or authentication errors.

#### Decision
Implement lightweight client-side profile onboarding backed by localStorage/session with a prominent 1-click "Load Sample Student" button (e.g., Makerere University 3rd-year Software Engineering student).

#### Alternatives
- *Full Supabase Auth:* Adds unnecessary authentication UX friction and potential point of failure during a 3-minute demo.

#### Consequences
Instant demo setup, zero barrier to testing personalized matching immediately upon app load.

---

### ADR-007: Comprehensive Zero-Trust Security Hardening
- Date: 2026-11-15
- Status: Accepted
- Supersedes: None

#### Context
Production deployment requires robust protection against common web vulnerabilities (OWASP Top 10), automated brute-force bots, IDOR profile tampering, unauthorized cross-origin requests, quota drainage, and data leakage.

#### Decision
Implement end-to-end zero-trust security controls across the application:
1. **Access & Auth:** Strict server-side session authentication on all API routes (`/api/gemini/*`, `/api/advisor`, `/api/ingest`), anti-IDOR resource ownership assertions, and role-based admin isolation in middleware.
2. **Database & Storage:** Explicit PostgreSQL Row Level Security (RLS) schema (`supabase/schema.sql`) enforcing `auth.uid() = user_id`, restricted opportunity mutation rights, and private storage buckets with strict MIME/magic byte checks.
3. **Attack Prevention & Network:** In-memory sliding-window rate limiting on auth and AI endpoints, bot honeypot traps on public forms, input sanitization and length constraints, strict CORS validation, and parameterized query execution via PostgREST SDK.
4. **Production Hardening & Monitoring:** Complete suite of HTTP security headers (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy), disabled framework fingerprinting (`poweredByHeader: false`), and structured security audit logging.

#### Consequences
Resilient against OWASP Top 10 exploits, preventing unauthorized data tampering, scraper flooding, and API abuse.

---

### ADR-008: Production SEO, Metadata, UX Polish & Dev Hygiene Standards
- Date: 2026-11-17
- Status: Accepted
- Supersedes: None

#### Context
For production excellence, social sharing (LinkedIn, Twitter, WhatsApp), discoverability by search engines (Google), accessibility (WCAG), and responsive UX across student smartphones in Uganda, the application must avoid generic titles, missing previews, dead buttons, unhelpful error states, and unoptimized JS bundles.

#### Decision
1. **Dynamic & Static SEO & Social Previews:**
   - Configure Next.js App Router metadata with `metadataBase`, canonical URLs (`/`, `/login`), titles with template `%s | InternPilot`, meta descriptions, keywords, author/publisher metadata, Open Graph (1200x630), and Twitter Summary Large Image previews.
   - Implement dynamic Edge OG image generation (`src/app/opengraph-image.tsx`) with fallback `public/og-image.png`.
   - Implement `src/app/sitemap.ts` and `src/app/robots.ts` for search engine crawling.
2. **Branded UX States:**
   - Implement custom branded 404 page (`src/app/not-found.tsx`) and error boundary (`src/app/error.tsx`).
   - Implement full-fidelity skeleton dashboard loading state (`src/app/loading.tsx`) and branded login loading card.
3. **Frontend Accessibility & Interaction:**
   - Enforce exactly one semantic H1 per page/view.
   - Connect all metric stat cards and readiness gauge pills directly to the live opportunity feed filter.
   - Add `aria-label` / `aria-hidden` attributes to all icon controls and form inputs.
4. **Developer Hygiene & Bundle Optimization:**
   - Explicitly disable client source maps in production (`productionBrowserSourceMaps: false`).
   - Remove debugging console statements from production client bundles via compiler `removeConsole`.
   - Enable Gzip/Brotli compression and package import optimization for `lucide-react`, reducing dashboard bundle size by over 24%.

#### Consequences
High search engine discoverability, crisp social preview cards when shared on WhatsApp or LinkedIn, resilient accessibility for screen readers, and fast, low-bandwidth load times for Ugandan mobile networks.

---

## Proposed Decisions (Awaiting Post-MVP Confirmation)

### ADR-005: Africa's Talking SMS Deadline Alerts
- Date: 2026-11-13
- Status: Proposed
- Context: Ugandan students often experience intermittent mobile data connectivity. SMS alerts 48 hours prior to deadlines would improve accessibility.
- Decision: Post-hackathon integration using Africa's Talking SMS API.

### ADR-006: Tailored CV Bullet & Cover Letter Generator
- Date: 2026-11-13
- Status: Proposed
- Context: Once an opportunity is selected, students need assistance articulating how their specific coursework matches the opportunity requirements.
- Decision: Dedicated Gemini prompt generating tailored application bullet points.

---

## Entry Template
### ADR-[number]: [title]
- Date: [YYYY-MM-DD]
- Status: Proposed / Accepted / Superseded
- Supersedes: [previous ADR, if any]

#### Context
[problem and constraints]
#### Decision
[chosen approach, or proposed approach awaiting a decision]
#### Alternatives
[options and tradeoffs]
#### Consequences
[benefits, costs, limitations]

Preserve previous entries. Add a superseding entry when a choice changes.

