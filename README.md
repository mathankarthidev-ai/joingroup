# Nammabus & JoinGroupLinks Platform

> **India's Dual-Service Community & Local Commerce Ecosystem**  
> Unified directory for verified neighborhood businesses, skilled trade technicians, B2B wholesale merchants, and active community chat groups across India.

[![Next.js](https://img.shields.io/badge/Next.js-16.3.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-v2-3ECF8E?logo=supabase)](https://supabase.com/)
[![Zod](https://img.shields.io/badge/Zod-Schema_Validation-3E67B1?logo=zod)](https://zod.dev/)
[![Lucide React](https://img.shields.io/badge/Lucide_React-v1.33-F56565)](https://lucide.dev/)
[![License](https://img.shields.io/badge/License-Proprietary-red)]()

---

## 📖 Architecture & Visual Flowcharts

For full **Mermaid system diagrams**, state transitions, search pipelines, and component relationships, see:
👉 **[PLATFORM_FEATURES_AND_ARCHITECTURE.md](PLATFORM_FEATURES_AND_ARCHITECTURE.md)**

---

## 🌟 Executive Overview

The platform unites two distinct, complementary user journeys under a single unified navigation system:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   Unified Application (localhost:3000)                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
           ┌────────────────────────┴────────────────────────┐
           ▼                                                 ▼
┌─────────────────────────────────┐   ┌──────────────────────────────────┐
│   Track 1: Nammabus Directory   │   │   Track 2: JoinGroupLinks        │
│   (/local-biz & /b2b)           │   │   (/groups)                      │
│                                 │   │                                  │
│ • Home Technicians (AC, Elect.) │   │ • 🇮🇳 Arattai (by Zoho)           │
│ • Wedding Photographers & Video │   │ • 💬 WhatsApp Groups             │
│ • Caterers, Chefs & Home Bakers │   │ • 📸 Instagram Broadcasts (Insta)│
│ • PGs, Hostels & Rentals        │   │ • ✈️ Telegram Channels (Tele)    │
│ • Boutiques, Tailors & Fashion  │   │ • 👥 Facebook Communities (FB)   │
│ • Auto Mechanics & Detailing    │   │ • 🎮 Discord & Professional Hubs │
│ • B2B Wholesale Suppliers       │   │ • Safe invite link gateway       │
│ • Verified badges & ratings     │   │ • Anti-scam spam protection      │
└─────────────────────────────────┘   └──────────────────────────────────┘
```

---

## 🚀 Key Features

### 1. Dynamic Two-Tier Responsive Navigation
* **Tier 1 (Brand & Global Navigation)**:
  * Brand logo with `Nammabus & GROUPS` badge.
  * Direct track links: **Home** (`/`), **Nammabus** (`/local-biz`), and **JoinGroupLinks** (`/groups`).
  * Instant Dark / Light mode toggle with persistent storage (`localStorage`).
  * User authentication avatar, dropdown menu, and sign-up/login modal.
* **Tier 2 (Context-Aware Mode Switching)**:
  * **When on Home (`/`) or Nammabus (`/local-biz`)**:
    * **📍 All India Location Selector**: Unclipped popup listing all **28 States**, **8 Union Territories**, and **750+ Districts** with 1-click drill-down navigation and search.
    * Direct links: **B2B WHOLESALE**, **Professionals (Technicians)**, **Categories**, **Launch Offer FREE**.
    * Call-To-Action: **+ List Free (₹0)** merchant onboarding button.
  * **When on JoinGroupLinks (`/groups`)**:
    * **🌐 All Groups (25k+)**: Resets filters to browse the entire community network.
    * **5 Dedicated Platform Tabs**:
      1. 🇮🇳 **Arattai** (`ZOHO`)
      2. 💬 **WhatsApp** (`CHAT`)
      3. 📸 **Instagram** (`INSTA`)
      4. ✈️ **Telegram** (`TELE`)
      5. 👥 **Facebook** (`FB`)
    * Call-To-Action: **+ Submit Group (Free)** admin submission gateway.

### 2. Comprehensive Pan-India Territorial Engine
* Built directly in [`src/lib/india.ts`](src/lib/india.ts) containing official governmental administrative divisions:
  * **28 States** (A to Z from Andhra Pradesh to West Bengal).
  * **8 Union Territories** (Delhi, Puducherry, Chandigarh, J&K, Ladakh, etc.).
  * **750+ Districts** alphabetically indexed for instant cascading lookups.
  * Seamless backward-compatible mapping between common city/metro names and official revenue districts.

### 3. Practical Small & Mid-Level Service Categories
* Specially curated for high-frequency, non-regulated household and event needs:
  * ❄️ **AC Technicians & HVAC Service**
  * ⚡ **Master Electricians & Home Rewiring**
  * 📸 **Wedding Photographers & Drone Cinematographers**
  * 🍲 **Caterers, Cloud Kitchens & Home Bakers**
  * 🛏️ **Hostels, Coliving & PGs**
  * 👗 **Bridal Makeup Artists & Boutiques**
  * 🚗 **Car Wash & Auto Mechanics**
  * 🖨️ **Printing Presses & Signage**

### 4. Interactive Hero Components
* **Top Cities Slider (`CityScrollStrip.tsx`)**: Continuous horizontal marquee of major Indian business hubs (Mumbai, Bengaluru, Chennai, Coimbatore, Delhi, Surat, Jaipur, etc.) with quick search support.
* **Typewriter Dynamic Headlines (`TypewriterText.tsx`)**: Smooth headline animations cycling through verified professions.
* **Right Page Scroll Line (`RightPageScrollLine.tsx`)**: Global drag-down progress line indicator.

### 5. Trust, Moderation & Cyber Safety
* **Legal Disclaimer Modal (`LegalSafetyDisclaimerModal.tsx`)**: Educational alert advising visitors regarding cyber safety, payment hygiene, and the official Indian Cyber Crime reporting portal (`1930` / `cybercrime.gov.in`).
* **Safe Redirect Gateway**: Warning timer and security checks before opening third-party group invite links.

---

## 📁 Project Architecture & Directory Structure

```
GroupSharing_Project/
├── PLATFORM_FEATURES_AND_ARCHITECTURE.md  # Complete Mermaid flowcharts & technical spec
├── README.md                              # Main documentation (this file)
├── package.json                           # Dependencies & scripts
├── tsconfig.json                          # TypeScript configuration
├── tailwind.config.ts                     # Tailwind CSS styling tokens
├── next.config.ts                         # Next.js server configuration
└── src/
    ├── app/                               # Next.js App Router (Pages & Routes)
    │   ├── layout.tsx                     # Root HTML, fonts & global scripts
    │   ├── page.tsx                       # Unified Home landing page
    │   ├── b2b/                           # B2B Wholesale directory
    │   ├── groups/                        # JoinGroupLinks community pages
    │   │   ├── page.tsx                   # Community catalog with ?platform= filtering
    │   │   ├── [id]/                      # Group profile & safe join gateway
    │   │   └── submit/                    # Community link submission
    │   ├── local-biz/                     # Nammabus directory engine
    │   │   ├── add-business/              # Merchant self-service onboarding
    │   │   ├── businesses/                # Business listings with state/district filter
    │   │   ├── categories/                # 40+ Industry category browser
    │   │   ├── professionals/             # Verified technicians & trades
    │   │   ├── services/                  # Specific service discovery
    │   │   └── sign-up/                   # Business partner sign up
    │   ├── pricing/                       # Launch offers & subscription plans
    │   ├── privacy/                       # Privacy policy
    │   └── terms/                         # Terms & conditions
    ├── components/                        # UI Components
    │   ├── Header.tsx                     # Dynamic 2-tier sticky navigation
    │   ├── Footer.tsx                     # Global footer with disclaimer & links
    │   ├── GroupCard.tsx                  # Community group link card
    │   ├── LoginModal.tsx                 # Authentication modal
    │   ├── SmartSearchChatbot.tsx         # AI search assistant
    │   ├── LegalSafetyDisclaimerModal.tsx # Anti-fraud warning modal
    │   ├── common/                        # Reusable widgets
    │   │   ├── CityScrollStrip.tsx        # Top 100+ cities marquee
    │   │   ├── JustdialHeroStrip.tsx      # Quick category visual tiles
    │   │   ├── LocationSearchFilter.tsx   # Cascading location filter
    │   │   ├── RightPageScrollLine.tsx    # Page progress line
    │   │   └── TypewriterText.tsx         # Looping headline typewriter
    │   └── local-biz/                     # Local business components
    │       ├── BusinessCard.tsx           # Business directory listing card
    │       └── GrowBusinessSection.tsx    # Merchant growth & testimonial strip
    └── lib/                               # Data Models & Utilities
        ├── auth.ts                        # Local storage auth & session handling
        ├── data.ts                        # Master groups & categories dataset
        ├── india.ts                       # 28 States, 8 UTs, 750+ Districts dataset
        ├── types.ts                       # TypeScript interfaces & types
        └── local-biz/
            ├── data-store.ts              # Local business CRUD operations
            └── seed-data.ts               # Starter businesses, reviews & categories
```

---

## 🛠️ Complete Technology Stack & Libraries

The platform is engineered using modern web technologies across frontend rendering, type validation, database resilience, UI styling, and monetization:

### 1. Full Stack Architecture Matrix

| Category | Technology | Version / Spec | Primary Package | Role & Responsibility in Platform |
| :--- | :--- | :--- | :--- | :--- |
| **Core Framework** | **[Next.js](https://nextjs.org/)** | `16.3.1` | `next` | App Router, Server Components (RSC), Client Components, nested layouts, route handlers, dynamic metadata |
| **UI Library** | **[React](https://react.dev/)** | `19.2.8` | `react`, `react-dom` | Modern React 19 architecture, concurrent features, `<Suspense>` streaming, `useActionState`, transitions |
| **Programming Language** | **[TypeScript](https://www.typescriptlang.org/)** | `^5.x` | `typescript` | 100% strict type checking, shared interfaces (`Group`, `Business`, `Category`, `Platform`), compile-time safety |
| **CSS & Design Engine** | **[Tailwind CSS](https://tailwindcss.com/)** | `^4.0.0` | `tailwindcss`, `@tailwindcss/postcss` | Next-gen CSS engine, zero-runtime utility styling, native CSS variables, responsive breakpoints |
| **Data Validation** | **[Zod](https://zod.dev/)** | `^4.6.5` | `zod` | Declarative runtime schema validation for business registration, group submissions, contact details & phone formats |
| **Database & Cloud Backend** | **[Supabase](https://supabase.com/)** | `^2.117.2` | `@supabase/supabase-js` | Cloud PostgreSQL client, Row Level Security (RLS), real-time updates, auto-generated SQL seeds |
| **Resilient Offline Store** | **Local Storage Engine** | Custom | `src/lib/local-biz/data-store.ts` | Zero-dependency hybrid store running automatically in local development when offline from cloud database |
| **SVG Icons** | **[Lucide React](https://lucide.dev/)** | `^1.33.0` | `lucide-react` | Crisp, scalable UI icons (`MapPin`, `Search`, `Building2`, `Sparkles`, `PlusCircle`, `ArrowLeft`, `Sun`, `Moon`, etc.) |
| **Brand & Platform Icons** | **Google Material Symbols** | Variable Font | Google Fonts CDN | Outlined icons for community platforms (`chat`, `send`, `photo_camera`, `groups`, `hub`) with fine-tuned font variations |
| **Typography (Display)** | **Plus Jakarta Sans** | Modern Geometric | Google Fonts | High-impact headlines, banner titles, cards, and brand badges |
| **Typography (Body)** | **Inter** | Clean Sans-Serif | `next/font/google` | Highly readable UI body text, forms, tables, and location dropdown items with zero Cumulative Layout Shift (CLS) |
| **Monetization & Ads** | **Google AdSense** | Client API | `next/script` | Multi-tier script injection (`ADSENSE_CLIENT_ID`), access wall modals, and responsive sponsored ad units |
| **Code Linting** | **ESLint** | `^9.x` | `eslint`, `eslint-config-next` | Code quality enforcement, unused import detection, Next.js best practices |
| **Process Runner** | **Node.js Junction Runner** | Native Node.js | `dev-runner.js` | Resolves canonical physical drive paths across junction links for multi-drive dev environments |
| **System Diagrams** | **Mermaid.js** | Living Markdown | Native GitHub Markdown | Interactive system architecture diagrams, state charts, and flowchart visualizations |

---

### 2. Deep-Dive by Architectural Layer

#### A. Frontend Framework & React 19 Concurrency
* **Next.js 16 App Router**: Leverages file-system based routing with nested layouts (`layout.tsx`), error boundaries, and static page optimizations.
* **React 19 Suspense Boundaries**: Both [`Header.tsx`](src/components/Header.tsx) and [`groups/page.tsx`](src/app/groups/page.tsx) are wrapped inside `<Suspense>` boundaries to enable query parameter listening (`useSearchParams`) without triggering prerendering de-optimizations.
* **Zero-Flash Dark Mode Switcher**: Injects an inline initialization script in `<head>` that reads `localStorage.getItem('grouphub_theme')` and immediately applies the `.dark` class to `document.documentElement` before the DOM renders, preventing screen flash.

#### B. CSS Engine & Design System Tokens
* **Tailwind CSS v4 with `@tailwindcss/postcss`**: Utilizes the modern CSS-first configuration layer without heavy legacy PostCSS plugins.
* **Semantic Color Variables**:
  * `primary` & `primary-fixed`: Main royal blue and indigo branding.
  * `surface` & `surface-container`: Light/dark adaptive background cards.
  * Platform accents: Arattai (`amber-500`), WhatsApp (`emerald-600`), Instagram (`purple-pink gradient`), Telegram (`sky-500`), Facebook (`blue-600`).
* **Micro-Animations**:
  * **Continuous Marquee Animation**: Powers [`CityScrollStrip.tsx`](src/components/common/CityScrollStrip.tsx) for 100+ Indian cities.
  * **Typewriter Looping Text**: Powers [`TypewriterText.tsx`](src/components/common/TypewriterText.tsx) across hero headings.
  * **Z-Index Layering (`z-[100]`)**: Ensures cascading location popups and navigation dropdowns float completely unclipped above all page sections.

#### C. Database Architecture: Hybrid Dual-Engine
The application supports a **zero-configuration resilient architecture**:
1. **Production Mode (Supabase + PostgreSQL)**:
   * When `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are provided in `.env.local`, data is persisted directly to Supabase cloud tables.
   * Tables: `businesses`, `professionals`, `categories`, `subcategories`, `services`, `reviews`, `banners`, `groups`.
2. **Development / Offline Resilient Mode (Built-In)**:
   * When credentials are not yet set or during offline testing, the app activates its built-in in-memory and `localStorage` storage layer ([`src/lib/local-biz/data-store.ts`](src/lib/local-biz/data-store.ts)).
   * Automatically pre-seeded with 40+ categories, 30+ verified businesses, technician profiles, and community groups from [`seed-data.ts`](src/lib/local-biz/seed-data.ts).

#### D. Built-In Developer Tooling & Database CLI Scripts
The project includes dedicated operational scripts in `package.json`:
* **`npm run dev`**: Launches Next.js dev server via `dev-runner.js` with canonical physical drive path resolution.
* **`npm run db:check`**: Runs [`scripts/check-db.mjs`](scripts/check-db.mjs) to test `.env.local` Supabase connection and verify tables.
* **`npm run db:generate-sql`**: Runs [`scripts/generate-sql.mjs`](scripts/generate-sql.mjs) to extract TypeScript seed data into ready-to-run PostgreSQL `seed.sql` statements for production database seeding.
* **`npx tsc --noEmit`**: Performs full TypeScript type checking across the entire project.

---

## 💻 Getting Started

### Prerequisites
* **Node.js**: `v18.18.0` or higher (Node `v20.x` recommended)
* **npm**: `v9.x` or higher (or `pnpm` / `yarn`)

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd GroupSharing_Project
npm install
```

### 2. Run the Local Development Server
```bash
npm run dev
```

Open your browser at **[http://localhost:3000](http://localhost:3000)** to view the live application.

### 3. Verify TypeScript Types
```bash
npx tsc --noEmit
```

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 🔑 Useful Routes & Quick Links

| Route | Purpose |
| :--- | :--- |
| **`/`** | Unified home page with dual search console & top cities strip |
| **`/local-biz`** | Nammabus local directory showcase |
| **`/local-biz/businesses`** | Search businesses with State & District cascading filters |
| **`/local-biz/professionals`** | Verified technicians (AC repair, electricians, photographers, caterers) |
| **`/local-biz/categories`** | Complete 40+ category directory |
| **`/b2b`** | B2B wholesale suppliers & bulk procurement |
| **`/local-biz/add-business`** | Self-service ₹0 business listing onboarding |
| **`/groups`** | JoinGroupLinks public community hub |
| **`/groups?platform=arattai`** | Arattai (by Zoho) indigenous Indian communities |
| **`/groups?platform=whatsapp`** | Active WhatsApp group invite links |
| **`/groups?platform=instagram`** | Instagram broadcast channels |
| **`/groups?platform=telegram`** | Telegram channels & discussion desks |
| **`/groups?platform=facebook`** | Facebook interest & business communities |
| **`/pricing`** | Special launch promotion & subscription plans |

---

## 🛡️ Trust & Safety Guidelines
1. **Never pay booking advances** to unverified parties online.
2. Group invite links are curated for public community interest; administrators must comply with Indian digital laws and IT Rules.
3. For suspected online scams or cyber fraud, report promptly to the National Cyber Crime Portal at **[cybercrime.gov.in](https://cybercrime.gov.in)** or call helpline **`1930`**.

---

## 📄 License & Attribution
* **Nammabus & JoinGroupLinks**: All rights reserved.
* Third-party trademarks (WhatsApp, Arattai, Telegram, Instagram, Facebook, Zoho) belong to their respective corporate owners and are used strictly for informational directory categorization.
