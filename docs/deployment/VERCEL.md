# Production Vercel Deployment Runbook

> **Platform**: Nammabus & JoinGroupLinks  
> **Deployment Architecture**: One Next.js 16 Application on Vercel Edge / CDN  
> **Target Scale**: 20 Lakhs Entities & 10 Lakhs Daily Visits  

---

## 1. Vercel Configuration Settings

* **Framework Preset**: Next.js
* **Build Command**: `npm run build`
* **Output Directory**: `.next`
* **Node.js Version**: `20.x`

---

## 2. Production Environment Variables

| Variable | Environment | Description |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_URL` | Production | `https://nammabus.in` |
| `NEXT_PUBLIC_SUPABASE_URL` | Production | Production Supabase API URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Production | Production Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Production (Secret) | Server-only admin key for webhooks & cron |
| `REDIS_URL` | Production (Secret) | Connection string for Upstash / Redis L2 cache |

---

## 3. Edge CDN & Caching Strategy

* **Landing Pages & Marketing**: Cached at Vercel Edge with `stale-while-revalidate` (SWR 300s).
* **State / District Browse Pages**: Cached via Next.js ISR (Incremental Static Regeneration).
* **Search API (`/api/v1/search`)**: Dynamic with cursor pagination and in-memory L1 cache.
* **Background Processing**: Heavy background tasks run through Supabase Queues (PGMQ), ready to be consumed by dedicated containers in `workers/`.
