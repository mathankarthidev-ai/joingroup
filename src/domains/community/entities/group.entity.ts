export type CommunityPlatform =
  | 'arattai'
  | 'whatsapp'
  | 'instagram'
  | 'telegram'
  | 'facebook'
  | 'discord';

export type GroupLifecycleStatus =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'expired'
  | 'suspended'
  | 'removed';

export interface CommunityGroupEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  platform: CommunityPlatform;
  inviteUrl: string;
  status: GroupLifecycleStatus;
  category: string;
  state?: string;
  district?: string;
  city?: string;
  memberCount: number;
  isVerified: boolean;
  isFeatured: boolean;
  reportsCount: number;
  viewsCount: number;
  clicksCount: number;
  lastAuditedAt?: string;
  createdAt: string;
  updatedAt: string;
}
