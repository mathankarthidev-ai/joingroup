export interface BusinessBranch {
  id: string;
  name: string;
  address: string;
  district: string;
  state: string;
  pincode: string;
  phone: string;
  latitude?: number;
  longitude?: number;
  isHeadquarters: boolean;
}

export interface BusinessEntity {
  id: string;
  organizationId?: string;
  name: string;
  slug: string;
  description: string;
  categoryId: string;
  subcategoryId?: string;
  isVerified: boolean;
  rating: number;
  reviewCount: number;
  branches: BusinessBranch[];
  primaryPhone: string;
  primaryEmail?: string;
  websiteUrl?: string;
  createdAt: string;
  updatedAt: string;
}
