# SYSTEM DESIGN DOCUMENT (SDD) -- Themui (Minimal MVP)

## 1.0 Overview

**Themui** lets developers upload a screenshot (site/app/wireframe) and
instantly get a usable **Material UI (MUI) theme** (JSON/TS). This
**minimal MVP** trims architecture to a **single Next.js app inside an
Nx workspace**, keeping costs, complexity, and time-to-market low while
still laying foundations for **SEO, Google Ads, profitability, auth,
storage, and scalability**.

**Core MVP flow** 1. User lands on marketing home → understands value in
5 seconds. 2. User uploads a screenshot (drag & drop or URL). 3. App
generates a theme (palette, typography, shape, components). 4. User
previews theme & tweaks palette live. 5. **Gate**: Sign in to download
full theme. Show first \~100 lines free. 6. Monetize with **Ads on
public/marketing pages** + **Pro tier** (credits/BYOK).

---

## 2.0 Goals & Non‑Goals

### 2.1 Goals

- Ship fast with a **single Next app** (in Nx) to simplify deploys.
- Capture **search traffic** (SEO-first marketing pages).
- Monetize via **Google Ads** (free tier) + **Pro** (Stripe) with a
  path to profitability.
- Keep infra minimal and **cheap**; scale progressively.
- Provide a **great UX** (fast, clear, low friction), optimized for
  **Core Web Vitals**.
- Store uploads & generated assets reliably with **signed URLs**.
- Respect privacy & **consent mode v2** for ads/analytics.

### 2.2 Non‑Goals (MVP)

- No microservices / separate backends.
- No custom queue infra unless required by load.
- No complex multi-tenant billing portals; start simple with Stripe
  Checkout.
- No design editor beyond **palette editor** (typography editor
  later).
- No multi-language SEO at launch.

---

## 3.0 Architecture (Minimal)

### 3.1 High-Level

- **Monorepo:** Nx
- **App:** Next.js 15 (App Router, React 19), TypeScript
- **Runtime:** Vercel (edge for static/marketing; node for heavy
  routes)
- **Auth & DB:** Supabase (Auth, Postgres, RLS)
- **Storage:** UploadThing → S3-compatible bucket _or_ Supabase
  Storage
- **Payments:** Stripe (Checkout + Webhooks)
- **Analytics:** GA4 (+ linked Google Ads), lightweight event logging
  (server-side)
- **Ads:** Google AdSense (with option to switch to Ad Manager later)
- **Styling:** MUI + Tailwind (utility classes for layout only)
- **Validation:** Zod
- **State:** React state + Server Actions; (skip tRPC for MVP)
- **Optional cache (later):** Upstash Redis for rate limiting/caching

### 3.2 Nx Layout

    /apps
      /themui      # Next.js app (marketing + app)
    /libs
      /ui          # shared components (ad-safe layouts, upload widget, palette editor)
      /core        # types, validators, theme builders, adapters
      /analytics   # tiny GA4/Ads helpers (no heavy deps)

> Keep libs minimal; grow if code starts to sprawl.

---

## 4.0 Key Product Surfaces

### 4.1 Marketing (SEO + Ads)

- **Routes:** `/` (hero + upload CTA), `/how-it-works`, `/pricing`,
  `/faq`, `/legal/*`
- **SEO:** Static, fast, CLS-safe ad slots, JSON-LD, sitemap, robots,
  canonical tags, OG/Twitter cards.
- **Ads:** Above-the-fold **leaderboard** (CLS-safe), in-article
  rectangle, sticky footer (mobile) --- **marketing pages only**.
  Disable for Pro users.

### 4.2 App (Generation)

- **Routes:** `/app` (blank state w/ upload), `/app/result/:id`
- **Features:** upload screenshot → extract theme → live palette
  editor → gated download.
- **Gates:** show first 100 lines; require sign-in for full download.
- **Free tier:** 1 generation/day (or week) + ads **not** shown in app
  screen for signed-in Pro.
- **BYOK (optional MVP+):** allow user's Replicate/API key to offset
  costs.

---

## 5.0 Data Model (MVP)

**users** (Supabase managed)\

- `id`, `email`, `created_at`, `pro_status` (enum: free, pro), `credits`
  (int, nullable)

**uploads**\

- `id` (uuid), `user_id` (nullable for anon), `file_url`, `status`
  (enum: ready\|processing\|error), `created_at`

**themes**\

- `id` (uuid), `upload_id`, `palette_json`, `typography_json` (nullable
  MVP), `components_json` (nullable MVP), `preview_url` (optional),
  `created_at`

**payments**\

- `id`, `user_id`, `stripe_session_id`, `plan`, `amount`, `status`,
  `created_at`

**usage_events**\

- `id`, `user_id` (nullable), `type` (upload\|generate\|download),
  `meta` (jsonb), `created_at`

RLS: users can only read their own uploads/themes/payments.

---

## 6.0 Theme Generation Pipeline (MVP)

1.  **Upload** (client → UploadThing → S3/Supabase Storage)
    - Validate mime/size; return `file_url`.
2.  **Server Action / Route Handler** `/api/generate`
    - Input: `file_url`\
    - Steps:
      a) Extract dominant colors (non-AI algorithm like MMCQ /
      color-thief equivalent).\
      b) Build MUI **palette** (primary/secondary/background/text) +
      contrast checks.\
      c) (Optional AI step later) enhance palette/typography using
      low-cost model or BYOK.\
    - Output: `theme_json`, `preview_url` (screenshot of theme demo).
3.  **Persist** theme record; return `theme_id`.
4.  **Palette Editor** updates state and regenerates `theme_json`
    on-the-fly (client), with an option to **save** (server action) to
    sync.

> **Cost-first**: Prefer **non-AI palette extraction** initially. Add
> optional AI "refinement" path for Pro or BYOK.

---

## 7.0 Auth & Authorization

- **Supabase Auth** (Google, Email OTP for MVP).
- Protect `/app/result/:id/download` route; require sign-in.
- **Credits** (MVP-simple): free users get 1/day (or week). Pro users
  unlimited (reasonable cap).
- Server-side checks before generation & download.
- **RLS** + signed URLs for private assets.

---

## 8.0 Storage

- **UploadThing** → S3 (or Supabase Storage)\
  Pros: simple DX, progress UI, easy file type limits.\
- **Retention policy:** Delete raw uploads after 7 days (config), keep
  themes indefinitely (small JSON).

---

## 9.0 Payments & Plans

- **Stripe Checkout**: "Pro" monthly (e.g., £12--£19) with
  **unlimited** or high credit cap.
- **Free**: 1 generation/day (or 3/month) + gated download +
  marketing-page ads.
- **Pro Perks**: no ads, higher limits, typography/component tuning
  (MVP+), priority processing (if queue added).
- **Webhooks**: `/api/stripe/webhook` to flip `pro_status` and issue
  credits (if used).

---

## 10.0 SEO Strategy (Launch)

- **Fast static pages** with ad slots that **reserve size** to prevent
  CLS.
- **Programmatic SEO (MVP+)**: public, anonymized gallery of generated
  themes with unique slugs, indexable previews, JSON-LD
  ("SoftwareApplication" + "CreativeWork").
- **Essentials:**
  - Metadata per page + canonical\
  - `/sitemap.xml`, `/robots.txt`\
  - OG images (Vercel OG)\
  - FAQ schema on `/faq`

---

## 11.0 Google Ads (Ad-Safe Implementation)

- **Consent Mode v2** (default + ad_user_data/ad_personalization based
  on consent).
- **Ad slots**:
  - Header leaderboard on marketing pages (fixed height, no CLS).\
  - In-content rectangle after section 1.\
  - Sticky mobile footer (marketing only).\
- **No ads** inside the generation view for Pro users; keep free
  users' app view minimal ads or none initially to avoid UX harm
  (experiment later).
- **Lazy-load ads** below the fold; defer scripts after main content.

---

## 12.0 Scalability & Performance

- **Edge-friendly marketing** with static caching (ISR).\
- **Node runtime** for `/api/generate`.\
- **Rate limiting** (MVP-lite): per-IP in memory on single region;
  upgrade to Upstash later.\
- **Queue (later if needed)**: Vercel Queues or Supabase cron for
  heavy AI jobs.\
- **Observability**: Vercel analytics + basic server logs; add Sentry
  later.

---

## 13.0 Security & Compliance

- **RLS** on all user-linked tables.\
- **Signed URLs** for private files.\
- **Zod** validation on all server actions.\
- **CSP** (allowlist GA/Ads/UploadThing/Stripe).\
- **GDPR**: consent banner (CMP), data export/delete (MVP-simple via
  email link or profile action).\
- **Abuse controls**: file-type/size limits, simple rate limit,
  blocklist on repeated abuse.

---

## 14.0 Minimal Feature Checklist (MVP Scope)

- [ ] **Landing page** (hero, USP, quick demo GIF, upload CTA)\
- [ ] **Upload** (drag & drop)\
- [ ] **Generate** theme (non-AI palette extraction)\
- [ ] **Preview** (MUI demo area)\
- [ ] **Palette editor** (live update)\
- [ ] **Gate**: sign in to download full theme\
- [ ] **Auth** (Supabase)\
- [ ] **Download** theme.json / theme.ts\
- [ ] **Pricing** page with Stripe Checkout\
- [ ] **SEO**: sitemap, robots, meta, OG, JSON-LD\
- [ ] **Ads** on marketing pages with consent mode\
- [ ] **Usage limits** (1/day free)\
- [ ] **Basic analytics** (GA4 events: upload, generate, sign-in,
      checkout)

---

## 15.0 Profitability Plan (MVP)

- **Short term**:
  - Free + Ads on marketing pages (optimize CTR without hurting
    CWV).\
  - Pro: remove ads, higher limits, upcoming AI refinements.\
- **Levers**:
  - Programmatic SEO gallery for long-tail traffic.\
  - "Made with Themui" badges linking back (viral loop).\
  - BYOK option to offload AI cost for power users (MVP+).\
- **Costs**: Vercel (hobby → pro), Supabase (free → pro), storage
  egress, Stripe fees, minimal AI (or none initially).\
- **Pricing experiments**: £12, £15, £19/mo; track conversion, ARPU,
  LTV.

---

## 16.0 Analytics & Experimentation

- **Core events** (server-side preferred): `upload_started`,
  `upload_succeeded`, `generate_started`, `generate_succeeded`,
  `download_clicked`, `checkout_started`, `purchase_succeeded`.\
- **Funnels**: Landing → Upload → Generate → Sign-in → Download /
  Purchase.\
- **A/B (later)**: headline, hero CTA, pricing copy, ad density on
  marketing pages.

---

## 17.0 Rollout & Ops

- **Environments**: Preview deployments via Git, main → production.\
- **Feature flags** (env var based for MVP).\
- **Backups**: Supabase auto backups; verify restore.\
- **Runbooks**: add quick docs for Stripe webhook failures, storage
  issues, and auth incidents.

---

## 18.0 Risks & Mitigations

- **Adverse CWV from Ads** → fixed-size slots, lazy-load, defer
  scripts.\
- **Abuse/Cost spikes** → rate limits, daily credit cap, BYOK only for
  AI at first.\
- **Low conversion** → programmatic SEO, social proof, clearer Pro
  value (no ads, more credits, AI refine).\
- **Legal (GDPR/consent)** → CMP + consent mode v2, privacy policy,
  data deletion flow.

---

## 19.0 Roadmap (Post‑MVP)

1.  **AI Refinement**: optional (BYOK or Pro) to improve
    palette/typography mapping.\
2.  **Component presets**: sliders/toggles for elevation, radius,
    density.\
3.  **Public gallery**: SEO farm of anonymized, opt-in themes.\
4.  **Team seats** & shared libraries.\
5.  **Export targets**: Tailwind tokens, CSS variables, Figma plugin.\
6.  **Queue & scale**: introduce job queue if generation time grows.\
7.  **Ad Manager upgrade** for better fill and floor pricing.

---

## 20.0 Acceptance Criteria (MVP "Done")

- User can **upload**, **generate**, **edit palette**, **sign in**,
  and **download** a full MUI theme.\
- Marketing pages load **\<2.5s LCP** on 4G; **no CLS** from ads.\
- SEO basics are in place; pages indexable.\
- **Free limit** enforced; **Pro** unlocks limits and removes
  marketing-page ads.\
- Stripe payment creates/updates `pro_status`.\
- Minimal logs/metrics visible for troubleshooting.

---

### Appendix -- Implementation Notes (Quick Decisions)

- **Keep it single app**; add libs only when reuse is obvious.\
- **Start non-AI** for palette extraction; roll AI in as a value prop,
  not a dependency.\
- **Ads only on marketing** at launch; experiment later with safe
  placements in app for free users if needed.\
- **No microservices**; only add a queue when traffic or processing
  time forces it.

This plan gets us live quickly, keeps running costs sane, and still sets
the table for SEO growth and ad + subscription revenue.
