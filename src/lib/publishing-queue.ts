import { PublishingQueueItem, PublishingTier, QueueItemStatus, Platform } from './types';

export const QUEUE_STORAGE_KEY = 'grouphub_publishing_queue';

// Calculate the next target batch publishing date
export function calculateNextPublishDate(tier: PublishingTier): string {
  const now = new Date();

  if (tier === 'TIER_D_VIP' || tier === 'TIER_C_PRIORITY_PAID') {
    // Immediate or +1 hour
    const date = new Date(now.getTime() + 60 * 60 * 1000);
    return date.toISOString();
  }

  if (tier === 'TIER_B_REGISTERED') {
    // Releases Wednesday (day 3) or Sunday (day 0) at 00:00 UTC
    const date = new Date(now);
    const day = date.getUTCDay();
    let daysToAdd = 0;
    if (day < 3) {
      daysToAdd = 3 - day;
    } else if (day === 3) {
      daysToAdd = 4; // next Sunday
    } else if (day < 7) {
      daysToAdd = 7 - day; // next Sunday
    }
    date.setUTCDate(date.getUTCDate() + (daysToAdd === 0 ? 3 : daysToAdd));
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString();
  }

  // TIER_A_UNREGISTERED: Next Sunday at 00:00 UTC
  const date = new Date(now);
  const day = date.getUTCDay();
  const daysUntilSunday = (7 - day) % 7 || 7;
  date.setUTCDate(date.getUTCDate() + daysUntilSunday);
  date.setUTCHours(0, 0, 0, 0);
  return date.toISOString();
}

// Generate current batch week string (e.g., "2026-W42")
export function getCurrentBatchWeek(): string {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const pastDaysOfYear = (now.getTime() - startOfYear.getTime()) / 86400000;
  const weekNum = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  return `${now.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

// Initial seed data for the publishing queue
export const INITIAL_PUBLISHING_QUEUE: PublishingQueueItem[] = [
  {
    id: 'pq-101',
    groupId: 'grp-demo-01',
    groupName: 'Chennai Real Estate & Flats WhatsApp Group',
    platform: 'whatsapp',
    category: 'Real Estate',
    country: 'India',
    state: 'Tamil Nadu',
    city: 'Chennai',
    inviteUrl: 'https://chat.whatsapp.com/sampleRealEstateChennai',
    tier: 'TIER_C_PRIORITY_PAID',
    batchWeek: getCurrentBatchWeek(),
    scheduledPublishDate: new Date(Date.now() - 3600000).toISOString(),
    status: 'queued',
    submitterEmail: 'broker.chennai@example.com',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    priorityScore: 90,
    moderationNotes: 'Paid listing priority fast-track approved.',
  },
  {
    id: 'pq-102',
    groupId: 'grp-demo-02',
    groupName: 'Bengaluru Tech & AI Founders Community',
    platform: 'telegram',
    category: 'Technology',
    country: 'India',
    state: 'Karnataka',
    city: 'Bengaluru',
    inviteUrl: 'https://t.me/sampleBangaloreAIFounders',
    tier: 'TIER_B_REGISTERED',
    batchWeek: getCurrentBatchWeek(),
    scheduledPublishDate: calculateNextPublishDate('TIER_B_REGISTERED'),
    status: 'queued',
    submitterEmail: 'techfounder@blrfirms.org',
    submittedAt: new Date(Date.now() - 43200000).toISOString(),
    priorityScore: 60,
  },
  {
    id: 'pq-103',
    groupId: 'grp-demo-03',
    groupName: 'Arattai Tamil Literature & Book Readers',
    platform: 'arattai',
    category: 'Education',
    country: 'India',
    state: 'Tamil Nadu',
    city: 'Madurai',
    inviteUrl: 'https://arattai.in/sampleTamilBooks',
    tier: 'TIER_A_UNREGISTERED',
    batchWeek: getCurrentBatchWeek(),
    scheduledPublishDate: calculateNextPublishDate('TIER_A_UNREGISTERED'),
    status: 'queued',
    submittedAt: new Date(Date.now() - 172800000).toISOString(),
    priorityScore: 20,
    moderationNotes: 'Pending weekly community batch release.',
  },
  {
    id: 'pq-104',
    groupId: 'grp-demo-04',
    groupName: 'Mumbai Stock Trading & Options Scalpers',
    platform: 'telegram',
    category: 'Stock Market',
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    inviteUrl: 'https://t.me/sampleMumbaiTraders',
    tier: 'TIER_D_VIP',
    batchWeek: getCurrentBatchWeek(),
    scheduledPublishDate: new Date(Date.now() - 7200000).toISOString(),
    status: 'published',
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    submitterEmail: 'vip.trader@mumbaifund.in',
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    priorityScore: 100,
    moderationNotes: 'VIP Tier promotion published instantly.',
  },
  {
    id: 'pq-105',
    groupId: 'grp-demo-05',
    groupName: 'UPSC Civil Services Aspirants 2026',
    platform: 'whatsapp',
    category: 'Education',
    country: 'India',
    state: 'Delhi',
    city: 'New Delhi',
    inviteUrl: 'https://chat.whatsapp.com/sampleDelhiUPSC2026',
    tier: 'TIER_B_REGISTERED',
    batchWeek: getCurrentBatchWeek(),
    scheduledPublishDate: calculateNextPublishDate('TIER_B_REGISTERED'),
    status: 'queued',
    submitterEmail: 'upsc.delhi@gmail.com',
    submittedAt: new Date(Date.now() - 25000000).toISOString(),
    priorityScore: 60,
  },
];

// Helper to get queue items from localStorage or fallback
export function getPublishingQueue(): PublishingQueueItem[] {
  if (typeof window === 'undefined') return INITIAL_PUBLISHING_QUEUE;
  try {
    const raw = localStorage.getItem(QUEUE_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(INITIAL_PUBLISHING_QUEUE));
      return INITIAL_PUBLISHING_QUEUE;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse publishing queue from storage', err);
    return INITIAL_PUBLISHING_QUEUE;
  }
}

// Helper to save queue
export function savePublishingQueue(queue: PublishingQueueItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error('Failed to save publishing queue to storage', err);
  }
}

// Add a group to the queue
export function enqueueGroup(
  item: Omit<PublishingQueueItem, 'id' | 'batchWeek' | 'scheduledPublishDate' | 'status' | 'submittedAt' | 'priorityScore'> & {
    tier: PublishingTier;
  }
): PublishingQueueItem {
  const queue = getPublishingQueue();
  const scheduledDate = calculateNextPublishDate(item.tier);
  const priorityScore =
    item.tier === 'TIER_D_VIP'
      ? 100
      : item.tier === 'TIER_C_PRIORITY_PAID'
      ? 80
      : item.tier === 'TIER_B_REGISTERED'
      ? 50
      : 20;

  const newItem: PublishingQueueItem = {
    ...item,
    id: `pq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    batchWeek: getCurrentBatchWeek(),
    scheduledPublishDate: scheduledDate,
    status: item.tier === 'TIER_D_VIP' ? 'published' : 'queued',
    submittedAt: new Date().toISOString(),
    publishedAt: item.tier === 'TIER_D_VIP' ? new Date().toISOString() : undefined,
    priorityScore,
  };

  const updatedQueue = [newItem, ...queue];
  savePublishingQueue(updatedQueue);
  return newItem;
}

// Publish all eligible queued groups
export function releaseScheduledBatch(): { releasedCount: number; updatedQueue: PublishingQueueItem[] } {
  const queue = getPublishingQueue();
  const now = new Date();
  let releasedCount = 0;

  const updated = queue.map((item) => {
    if (item.status === 'queued' && new Date(item.scheduledPublishDate) <= now) {
      releasedCount++;
      return {
        ...item,
        status: 'published' as QueueItemStatus,
        publishedAt: now.toISOString(),
      };
    }
    return item;
  });

  savePublishingQueue(updated);
  return { releasedCount, updatedQueue: updated };
}
