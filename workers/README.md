# Nammabus & JoinGroupLinks — Background Workers Service

> **Owner**: MAION AI Technologies  
> **Deployment Target**: Future dedicated worker container (Docker / AWS ECS / Railway)  
> **Initial Queue Provider**: Supabase Queues (PGMQ) in PostgreSQL  

---

## 📌 Architecture Note & Deployment Boundary

Per the MAION AI Technologies implementation blueprint:
* **Initial Phase**: Queue processing and light asynchronous jobs run through **Supabase Edge Functions** or scheduled serverless processing.
* **Scale Phase (20 Lakhs entities / 10 Lakhs daily visits)**: This `workers/` directory is deployed as a long-running, multi-core worker process to process high-throughput message streams without straining Next.js Vercel serverless execution limits.

---

## 📋 Queue Responsibilities

| Queue | Priority | Handlers / Consumers |
| :--- | :--- | :--- |
| **`notification_jobs`** | High | Email alerts, WhatsApp/SMS push notifications |
| **`moderation_jobs`** | High | AI spam checks & safety audits on new group links |
| **`search_index_jobs`** | Medium | Incremental document synchronization into search indices |
| **`analytics_jobs`** | Medium | Aggregates views, clicks, and impression counters every 60s |
| **`link_validation_jobs`**| Medium | Probes third-party group invite links to detect expired URLs |
| **`image_jobs`** | Low | Generates thumbnails, WebP compression, and Cloudflare R2 uploads |

---

## 🏃 Local Execution (When Ready)

```bash
# In the workers directory
npm install
npm run start:worker
```
