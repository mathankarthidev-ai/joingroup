# Nammabus + JoinGroupLinks — Final Implementation Blueprint
**Architecture Decisions Locked | 10-Year Architecture Blueprint**

* **Owner**: MAION AI Technologies  
* **Product**: Nammabus + JoinGroupLinks  
* **Market**: India First → Global Expansion  
* **Target Scale**: 20 Lakh (2,000,000) Businesses & Community Listings, 10 Lakh (1,000,000) Daily User Visits  
* **Architecture Pattern**: Domain-Driven Design (DDD) + Modular Monolith + CQRS Principles  

---

## 1. Locked Architecture Decisions

| Decision Area | Final Locked Decision | Rationale for Scale |
| :--- | :--- | :--- |
| **Search Engine** | **PostgreSQL (FTS + PostGIS) Initially → Meilisearch when needed** | Keeps database source-of-truth clean. Avoids dual-writing from clients. Search service uses interchangeable adapters. |
| **Background Processing** | **Supabase Queues (PGMQ) Initially → Dedicated Workers later** | Durable ACID messages inside PostgreSQL. Zero operational overhead initially. Decoupled consumers via Edge Functions / Cron. |
| **Deployment Model** | **One Vercel Next.js Application + Separate Workers (`workers/`) when needed** | Eliminates premature microservice complexity. Static & ISR caching at Edge CDN. Worker boundary is preserved in folder hierarchy. |
| **Proxy & Middleware** | **`src/proxy.ts` (Next.js 16 Convention)** | Next.js 16 proxy convention for lightweight routing and rate limiting. Deep authorization enforced at data/policy level. |
| **Database Architecture** | **PostgreSQL with 11 Logically Separated Domain Schemas** | Clean boundaries: `public`, `identity`, `geo`, `catalog`, `directory`, `community`, `commerce`, `marketing`, `trust`, `intelligence`, `operations`. |
| **Security Foundation** | **Row Level Security (RLS) from Day 1** | Every exposed table has strict RLS enabled in its creation migration. Deny-by-default access. |

---

## 2. High-Level System Architecture

```
                    CUSTOMERS · MERCHANTS · ADMINS
                 (Web · Mobile Browsers · Search Engines)
                                   │
                                   ▼
                           VERCEL EDGE / CDN
                  (Caching · Routing · Static Delivery)
                                   │
                                   ▼
                       ONE NEXT.JS 16 APPLICATION
    ┌──────────────────────────────┬──────────────────────────────┐
    │          Nammabus            │        JoinGroupLinks        │
    │   (Business · B2B · Service) │    (Groups · Communities)    │
    ├──────────────────────────────┼──────────────────────────────┤
    │         Dashboard            │        Administration        │
    │    (Merchant · Customer)     │      (Admin · Moderation)    │
    └──────────────────────────────┴──────────────────────────────┘
                                   │
                    Domain Application Services (DDD)
     (Identity · Geo · Catalog · Directory · Community · Commerce)
                                   │
                                   ▼
                          SUPABASE / POSTGRESQL
          (PostgreSQL 16 · Auth · RLS · Storage · Queues · PostGIS)
          ┌───────────────────────────────────────────────────────┐
          │ Logically Separated Schemas:                          │
          │ • identity       • geo           • catalog            │
          │ • directory      • community     • commerce           │
          │ • marketing      • trust         • intelligence       │
          │ • operations     • public (RPC / Views)               │
          └───────────────────────────────────────────────────────┘
                                   │
        ┌──────────────────────────┼──────────────────────────┐
        ▼                          ▼                          ▼
  Redis / Upstash             Meilisearch             AI & Payments
  (Future Cache Layer)     (Future Search Index)    (Moderation & Billing)
```

---

## 3. Database Schemas (11 Domain Schemas)

1. **`public`**: Public API views, exposed RPC functions, read models.
2. **`identity`**: User profiles, organizations, membership, roles, permissions, scopes.
3. **`geo`**: Global location hierarchy (countries, administrative levels, administrative units, aliases, translations, postcodes).
4. **`catalog`**: Industry categories, subcategories, service definitions, regional translations.
5. **`directory`**: Businesses, branches, operating locations, media, hours, professionals, credentials.
6. **`community`**: Community groups, platforms (Arattai, WhatsApp, Telegram, Instagram, Facebook), submission lifecycle, link checks.
7. **`commerce`**: Customer leads, wholesale enquiries, subscription plans, payments, invoices, immutable financial ledger.
8. **`marketing`**: Advertising campaigns, creatives, ad placements, impression/click counters.
9. **`trust`**: Ratings, customer reviews, moderation cases, reports, fraud prevention.
10. **`intelligence`**: AI prompt logs, token usage, search analytics, recommendation tracking.
11. **`operations`**: Administrative audit trails, platform configuration, system health settings.

---

## 4. 48-Step Ordered Migration Plan

* **Phase A — Database Foundation (0001–0006)**:
  * `0001_extensions.sql`: `uuid-ossp`, `postgis`, `pg_trgm`, `pgcrypto`, `btree_gist`.
  * `0002_schemas.sql`: 11 domain schemas.
  * `0003_shared_functions.sql`: `update_updated_at_column`, `slugify`, common triggers.
  * `0004_countries.sql`: `geo.countries` ISO codes & metadata.
  * `0005_administrative_locations.sql`: `geo.administrative_levels` and `geo.administrative_units` hierarchy.
  * `0006_location_metadata.sql`: `geo.location_aliases`, `geo.location_translations`, `geo.postcodes`.
* **Phase B — Identity & Permissions (0007–0011)**: Profiles, Organizations, Members, Roles/Permissions, Resource Scopes.
* **Phase C — Catalog & Directory (0012–0018)**: Categories, Translations, Services, Businesses, Locations, Hours, Professionals.
* **Phase D — Community & Trust (0019–0023)**: Platforms, Groups, Submissions, Reviews/Reports, Moderation Queues.
* **Phase E — B2B & Commerce (0024–0031)**: Suppliers, Enquiries, Leads, Plans, Subscriptions, Payments, Financial Ledger, Commissions.
* **Phase F — Monetization & Engagement (0032–0037)**: Advertising, Placements, Events, Notifications, Preferences, Saved Items.
* **Phase G — Intelligence & Operations (0038–0043)**: Search Support, AI Usage, Recommendations, Analytics, Audit Logs, Settings.
* **Phase H — Security & Hardening (0044–0048)**: RLS Policies, Storage Rules, Database Indexes, PGMQ Queue Setup, Integrity Constraints.

---

## 5. Architectural Principles

1. **One Repository, One Next.js App**: Single codebase avoids distributed system complexity.
2. **Two Product Domains**: Nammabus (Local Biz & B2B) and JoinGroupLinks (Communities) live in isolated bounded contexts.
3. **CQRS Principles**: Reads are heavily cached and cursor-paginated; writes use strict validation and outbox events.
4. **Durable Queuing**: Important events (moderation, search index sync, notifications) go through Supabase Queues (PGMQ) to guarantee delivery.
5. **Interchangeable Adapters**: PostgreSQL search can be replaced by Meilisearch via `ISearchAdapter` with zero changes to UI or domain logic.
6. **Future Worker Boundary**: The `workers/` directory defines an independent deployment target ready to be spun up as a containerized service when background volume justifies it.
