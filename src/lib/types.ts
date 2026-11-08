export type Platform =
  | 'arattai' // Arattai (by Zoho) - ALWAYS FIRST
  | 'whatsapp'
  | 'telegram'
  | 'instagram'
  | 'facebook'
  | 'linkedin'
  | 'discord'
  | 'reddit'
  | 'twitter'
  | 'threads'
  | 'youtube'
  | 'pinterest'
  | 'snapchat'
  | 'quora'
  | 'medium'
  | 'tiktok'
  | 'slack'
  | 'github'
  | 'signal'
  | 'clubhouse'
  | 'twitch'
  | 'matrix'
  | 'skype'
  | 'viber'
  | 'line'
  | 'vk'
  | 'wechat'
  | 'mastodon'
  | 'lemon8'
  | 'substack'
  | 'meetup';

export type GroupStatus = 'pending' | 'approved' | 'rejected';

export interface Group {
  id: string;
  name: string;
  slug: string;
  description: string;
  platform: Platform;
  inviteUrl: string;
  country: string;
  countryCode: string;
  state?: string;
  district?: string;
  city?: string;
  area?: string;
  category: string;
  language: string;
  memberCount: number;
  imageUrl?: string;
  status: GroupStatus;
  isVerified: boolean;
  isFeatured: boolean;
  lastChecked: string;
  reportsCount: number;
  viewsCount: number;
  clicksCount: number;
  adminEmail?: string;
  ownerEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  groupCount: number;
  isAutoApproved?: boolean;
  badgeTag?: string;
}

export interface CountryLocation {
  name: string;
  code: string;
  slug: string;
  flag: string;
  isSafe: boolean;
  groupCountText: string;
  states: {
    name: string;
    slug: string;
    cities: {
      name: string;
      slug: string;
      areas?: string[];
    }[];
  }[];
}

export type UserRole = 'normal' | 'premium' | 'admin' | 'seller' | 'group_admin';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  whatsappNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  role: UserRole;
  accountType?: 'user' | 'seller' | 'group_admin';
  businessName?: string;
  isVip: boolean;
  vipExpiresAt?: string;
  freeGroupsCountThisWeek: number;
  allowedGroupsLimit: number;
  allowedSponsoredLimit: number;
  submittedGroupIds: string[];
  sponsoredGroupIds: string[];
}

export interface PaidPromotionBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  imageUrl: string;
  targetCountry: string;
  targetState?: string;
  targetCity?: string;
  targetCategory?: string;
  sponsorName: string;
  linkUrl: string;
  badgeText: string;
  priceTag: string;
  websiteUrl?: string;
  arattaiUrl?: string;
  whatsappUrl?: string;
  telegramUrl?: string;
}

export interface GroupReport {
  id: string;
  groupId: string;
  groupName: string;
  reason: 'dead_link' | 'spam' | 'adult_content' | 'misleading' | 'other';
  message?: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  publishedAt: string;
  imageUrl: string;
  tags: string[];
  metaTitle?: string;
  metaDescription?: string;
  primaryKeyword?: string;
  secondaryKeywords?: string[];
  faqs?: { q: string; a: string }[];
  internalLinks?: { anchor: string; href: string }[];
}

// -------------------------------------------------------------
// PUBLISHING QUEUE & SCHEDULER TYPES
// -------------------------------------------------------------
export type PublishingTier =
  | 'TIER_A_UNREGISTERED' // Free weekly scheduled batch
  | 'TIER_B_REGISTERED'   // Free bi-weekly scheduled batch
  | 'TIER_C_PRIORITY_PAID'// Paid fast-track release
  | 'TIER_D_VIP';         // VIP instant pinned promotion

export type QueueItemStatus = 'queued' | 'published' | 'held' | 'rejected';

export interface PublishingQueueItem {
  id: string;
  groupId: string;
  groupName: string;
  platform: Platform;
  category: string;
  country: string;
  state?: string;
  city?: string;
  inviteUrl: string;
  tier: PublishingTier;
  batchWeek: string; // e.g. "2026-W42"
  scheduledPublishDate: string; // ISO 8601
  status: QueueItemStatus;
  submitterEmail?: string;
  submittedAt: string;
  publishedAt?: string;
  priorityScore: number; // Higher is processed earlier
  moderationNotes?: string;
}

// -------------------------------------------------------------
// PAYMENT & MONETIZATION TYPES (Razorpay & Invoicing)
// -------------------------------------------------------------
export interface PaymentOrder {
  id: string;
  orderId: string;
  amount: number; // in INR
  currency: string;
  planId: string;
  planName: string;
  customerEmail: string;
  customerPhone?: string;
  customerName?: string;
  status: 'created' | 'paid' | 'failed' | 'refunded';
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  promoCodeApplied?: string;
  discountAmount?: number;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

