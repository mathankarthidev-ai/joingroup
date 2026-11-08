# Production Supabase Database Runbook

> **Platform**: Nammabus & JoinGroupLinks  
> **Database**: PostgreSQL 15+ with PostGIS, Trigram, and PGMQ  
> **Architecture**: 11 Logically Separated Domain Schemas with Transaction Pooling  

---

## 1. Connection Pooling & Limits

* **Connection Pooler**: Supavisor / PgBouncer
* **Port**: `54329` (Transaction mode for serverless Next.js functions)
* **Direct DB Port**: `54322` (Session mode for migrations only)
* **Default Pool Size**: `20`
* **Max Client Connections**: `100`

---

## 2. Migration Execution Sequence

Migrations are dependency-ordered across 8 phases (0001–0048) in [`supabase/migrations/`](../../supabase/migrations/):
* **Phase A (0001–0006)**: Extensions, Schemas, Shared Functions, Countries, Administrative Locations, Location Metadata.
* **Phase B (0007–0011)**: User Profiles, Organizations, Members, Roles/Permissions, Resource Scopes.
* **Phase C–H**: Catalog, Directory, Community, Commerce, Marketing, Operations, RLS Policies.

Run migrations via Supabase CLI:
```bash
supabase db push
```

---

## 3. Row Level Security (RLS) Verification

Every exposed table has Row Level Security enabled in its creation migration.
* **Anon**: Limited to reading active units, public profiles, approved community groups, and verified listings.
* **Authenticated**: Scoped to user's profile and organization memberships.
* **Service Role**: Bypasses RLS for administrative jobs and internal queue processing.
