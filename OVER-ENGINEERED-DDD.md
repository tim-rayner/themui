# SYSTEM DESIGN DOCUMENT (SDD) - Themui

### Note:

I am deliberately over-engineering this app, to practice my application infrastructure and design foundations. I've also never got a google AdSense app working before, so hoping this strategy also ensures all regulations are met before release.

## 1.0 Overview

**Themui** is a developer-facing SaaS tool that converts screenshots (websites, apps, wireframes, etc) into Material UI (MUI) themes. The platform will:

- Accept Screenshot/image uploads.
- Process them via AI to extract colour palettes, typography, and component styling.
- Generate downloadable MUI theme files (theme.ts/theme.json)
- Display a preview with limited visibility (e.g first 100 lines) for public users, requiring sign in for full download.
- Monetise through Google Ads (freemium) and an optional Pro subscription (bring your own key or paid)

## 2.0 Goals & Non-Goals

### Goals

- Provide fast, accurate theme generation from screenshots
- Maximise SEO & ad revenue via traffic-heavy shareable pages
- Offer a freemium model: free with ads, paid subscription with premium features
- Ensure scalability via NX monorepo, and modular microservice architecture.

### Non-Goals

- Full UI Component generation (stretch goal)
- Supporting every frontend framework (start with MUI, later Tailwind)

## 3.0 High-Level Architecture

We’ll adopt a monorepo architecture with Nx for modularity.

### 3.1 Top-Level Layout

```tsx
themui/
├─ apps/
│  ├─ web-marketing/        # Public site (SEO + Ads). Domain: themui.com
│  ├─ web-app/              # Authenticated app (ad-gated before download). Domain: app.themui.com
│  ├─ bff/                  # API gateway (Next.js route handlers / server-only)
│  ├─ ai-worker/            # Background jobs (queue consumers) – Node/Edge/CF Worker
│  └─ payments-worker/      # Stripe webhooks & billing tasks (server-only)
├─ libs/
│  ├─ ui/                   # Shared UI (MUI components, primitives, theme provider)
│  ├─ theme-engine/         # Core: screenshot → MUI theme extraction + schema
│  ├─ extraction/           # Model adapters (Replicate/OpenAI/VLMs), feature flags
│  ├─ storage/              # UploadThing client/server wrappers, signed URLs
│  ├─ auth/                 # Supabase + NextAuth glue (server + client hooks)
│  ├─ billing/              # Stripe SDK wrappers, subscription logic, entitlements
│  ├─ ads/                  # Google AdSense components + safe render guards
│  ├─ seo/                  # Metadata builders, sitemap/robots, OG image utils
│  ├─ analytics/            # PostHog/GA wrappers, event contracts
│  ├─ queue/                # Job contracts, pg-boss/Convex adapters
│  ├─ db/                   # Prisma client + schema, RLS helpers (Supabase)
│  ├─ config/               # Runtime config loader (zod), env typing
│  ├─ types/                # Global TS types (Theme, User, Job, Plan…)
│  └─ utils/                # Small pure helpers (never import frameworks)
├─ tools/                   # Nx generators/executors if needed
├─ package.json
├─ nx.json
└─ tsconfig.base.json
```

**Seperation Guarantees**

- web-marketing - ships SEO + Ads. no business logic, no auth-required routes
- web-app - ships Auth Flows, Upload, Preview, Download. No marketing pages
- BFF - exposes typed endpoints to both apps; it owns IO/validation and shields downstream services
- Workers - handle background processing & webhooks (ai jobs, Stripe events)

### Deployments & Domains

- Vercel Projects
  - web-marketing → [themui.io](https://www.godaddy.com/en-uk/domainsearch/find?domainToCheck=themui.io)
  - web-app → [app.themui.io](http://app.themui.io)
  - bff → [api.themui.com](http://api.themui.com)
- Workers
  - ai-worker → Cloudflare workers/Vercel edge functions (choose one)
  - payments-worker → Vercel Serverless (node) for Stripe webhooks
- CDN & Storage
  - UploadThing + CDN for screenshots and generated theme files

### 3.3 Environments & Ads/SEO Boundaries

- web-marketing
  - Ads enabled (AdSense)
  - Static marketing routes, blog, gallery, comparison pages.
  - Aggressive SEO (sitemaps, rich metadata, fast LCP)
- web-app
  - Ads conditionally rendered (free/anonymous flows before download)
  - Auth-gated download; Pro = no ads
- bff, workers
  - No ads, no public pages, no SEO. Server only.

### 3.4 Nx Tags & Boundaries (Critical for scalability)

Add `enforce-module-boundaries` to prevent cross talk.

**.eslintrc.json (root)**

```tsx
{
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "extends": ["plugin:@nx/typescript"],
      "rules": {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              { "sourceTag": "type:app", "onlyDependOnLibsWithTags": ["type:lib", "type:ui", "type:domain", "type:infra"] },
              { "sourceTag": "type:worker", "onlyDependOnLibsWithTags": ["type:lib", "type:domain", "type:infra"] },
              { "sourceTag": "scope:marketing", "onlyDependOnLibsWithTags": ["scope:shared","scope:core"] },
              { "sourceTag": "scope:app", "onlyDependOnLibsWithTags": ["scope:shared","scope:core"] },
              { "sourceTag": "scope:bff", "onlyDependOnLibsWithTags": ["scope:shared","scope:core"] },
              { "sourceTag": "scope:payments", "onlyDependOnLibsWithTags": ["scope:shared","scope:core"] },
              { "sourceTag": "scope:ai", "onlyDependOnLibsWithTags": ["scope:shared","scope:core"] },
              { "sourceTag": "type:domain", "onlyDependOnLibsWithTags": ["type:domain","type:infra","type:ui"] }
            ]
          }
        ]
      }
    }
  ]
}
```

**Example tags per project**

- apps/web-marketing: ["type:app","scope:marketing"]
- apps/web-app: ["type:app","scope:app"]
- apps/bff: ["type:app","scope:bff"]
- apps/ai-worker: ["type:worker","scope:ai"]
- apps/payments-worker: ["type:worker","scope:payments"]
- libs/theme-engine: ["type:domain","scope:core"]
- libs/extraction: ["type:domain","scope:core"]
- libs/ui: ["type:ui","scope:shared"]
- libs/ads, libs/seo, libs/analytics: ["type:infra","scope:shared"]
- libs/auth, libs/billing, libs/storage, libs/queue, libs/db, libs/config, libs/types, libs/utils: ["type:lib","scope:core"]

Result: marketing can depend on shared/core libs but not on web-app or app-only code; app can’t pull in marketing code; workers can’t accidentally import React.

### 3.5 Data/Request Flow (Happy Path)

1. **web-app** → POST `/api/jobs/create` (BFF)
   1. Validates auth (free vs pro), quotas, upload references
2. **bff** → enqueue job (libs/queue) with `upload.fileId`
3. **ai-worker** → consumes job → `/libs/extraction` runs model → `libs/theme-engine` normalises → theme JSON/TS stored via `libs/storage`
4. **ai-worker** → updates job status in `libs/db`
5. **web-app** polls/subscribe → shows preview (first ~100 lines for anon/free), download gated behind sign-in (free) or ad-free (pro)
6. web-app → logs analytics events (`libs/analytics`) and shows ads via `libs/ads` if user is not pro and still in pre-download context.

### 3.6 Library Responsibilities (sharp boundaries)

- libs/theme-engine
  - Pure functions: palette extraction normalization, typography mapping, spacing scales → **deterministic output**.
  - Input contracts (zod): ScreenshotAnalysis, ThemeSpec, MUIThemeOut.
- libs/extraction
  - **Adapters to AI providers** (Replicate/OpenAI/Custom). No app/UI imports.
  - Feature flags to A/B models without leaking provider specifics upward.
- libs/storage
  - UploadThing server wrappers, signed URL creation, lifecycle policies.
- libs/ads
  - AdSense <AdSlot> component with SSR/CSR safety + consent checks.
- libs/seo
  - Builders for metadata, OG image utils, sitemap/robots generators.
- libs/billing
  - Plans, entitlements, Stripe customer/subscription fetchers, webhook mappers.
- libs/auth
  - NextAuth + Supabase session hooks, server helpers.
- libs/queue
  - pg-boss/Convex abstraction. Contracts: Job<GenerateThemeJob>.
- libs/db
  - Prisma Client + schema (User, Plan, Theme, Job, Usage, Quotas).
- libs/analytics
  - Event names as string literal unions, typed track() calls.
- libs/config
  - loadConfig() that zod-validates all env per app/worker.
- libs/types, libs/utils
  - Shared types and pure helpers.

### 3.7 Google Ads & SEO (where they live)

- libs/ads
  - `<AdSlot id="..." format="auto" />` with:
    - SSR guard (never render on the server), consent checks, safe reflow
    - Used only in web-marketing and (optionally) ad-gated screens in web-app.
- libs/seo
  - `buildMetadata({title,description,canonical,og})`
  - `sitemap.ts` & `robots.txt` generators (run in web-marketing)
  - Structured data (JSON-LD) for gallery/detail pages.

### 3.8 Observability & Cost Controls

- libs/analytics: standard events (upload_started, extract_ok, extract_fail, download_click, ad_view)
- **Rate Limits:** at BFF (ip + user based), with quotas defined in DB.
- **Kill Switches:** in `libs/config` (disable free uploads of costs spike)
- **Feature Flags:** to A/B models via `libs/extraction`

### 3.9 Security & Compliance Walls

- web-marketing: has no access to private user data (hard boundary)
- web-app → server actions/route handlers proxy only through BFF types
- Workers never import UI or Next runtime code
- Stripe webhooks isolated in `payments-worker` (no public routes).

## 4.0 Data Flow

1. User uploads screenshot → UploadThing
2. App sends job to AI Processing Service
   1. Extracts colours, typography, spacing.
   2. Builds MUI theme object(s)
3. Theme stored (JSON.TS file in UploadThing)
4. App retrieves theme preview → gated download
5. Ads displayed (if free) or add-free download (if pro)

## 5.0 Authentication & Authorisation

- Supabase Auth (Google/Github OAuth) with NextAuth wrapper.
- Roles:
  - Anonymous: can upload & preview, ads displayed
  - Free user: sign-in required to download, pop up ad shown before download.
  - Pro user: Subscription, ad-free, premium features

## 6.0 Monetisation Strategy

1. Ads (primary early revenue)
   1. Google AdSense integrated on:
      1. app landing page (not marketing)
      2. upload flow
      3. preview screen (pre-download)
   2. Ads persist unless user upgrades.
2. Subscriptions
   1. £X/month for:
      1. Add free experience
      2. MUI Component generation (shows a library of components based on the uploaded image)
      3. Larger upload quota
      4. Priority AI Processing

## 7.0 Infrastructure

- **Hosting**: Vercel (Next.js).
- **Edge Functions**: Supabase / Vercel Edge for auth + lightweight APIs.
- **AI Provider**: Replicate (fallback: OpenAI Vision or self-host).
- **File Storage**: UploadThing + CDN.
- **Database**: Supabase Postgres (user profiles, subscriptions, logs).
- **Monorepo Tooling**: Nx (apps: web, ai-service, payments; libs: ui, utils).

## **8.0 Scalability & Performance**

- CDN caching for static assets and previews.
- Serverless, autoscaling workloads (AI processing jobs run async).
- Job queue (e.g., Supabase functions + pg-boss or Convex if needed).
- Split marketing site (SEO-heavy, static) vs app (authenticated).

## **9.0 Security**

- Secure uploads (virus scanning via UploadThing).
- Authenticated access to generated themes (signed URLs).
- Stripe best practices (PCI compliance handled by Stripe).
- No sensitive data stored in AI service logs.

## **10.0 Future Roadmap**

- Tailwind component generation (paid feature).
- Community gallery of generated themes (SEO play).
- Chrome extension → generate themes from live websites.
- AI-driven React component generation (premium).

## **11.0 Risks**

- AI accuracy may frustrate users (mitigation: allow manual tweaks to generated theme).
- Reliance on Google Ads → low CPM for developer niche.
- Replicate/API costs may exceed ad revenue at scale → need to throttle free tier.

## **12.0 Open Questions**

- Should free tier allow unlimited uploads or cap per day?
- Should Pro include BYOK model usage?
- Should we invest in Convex vs Supabase for job orchestration?
