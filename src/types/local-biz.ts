export type UserRole = 'customer' | 'admin';

export interface UserProfile {
  id: string;
  user_id: string;
  full_name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  status: 'active' | 'suspended';
  created_at: string;
  updated_at: string;
}

export type BusinessStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type VerificationStatus = 'unverified' | 'verified' | 'rejected';

export interface City {
  id: string;
  name: string;
  slug: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
  business_count?: number;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
  business_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Business {
  id: string;
  owner_id?: string;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  logo_url: string;
  cover_image_url: string;
  phone: string;
  whatsapp: string;
  email: string;
  website?: string;
  address: string;
  area: string;
  city_id: string;
  city_name: string;
  city?: City;
  state: string;
  district?: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  category_id: string;
  category_name: string;
  category?: Category;
  subcategory_id?: string;
  subcategory_name?: string;
  business_type: string;
  year_established: number;
  gst_number?: string;
  status: BusinessStatus;
  verification_status: VerificationStatus;
  is_featured: boolean;
  is_active: boolean;
  views_count: number;
  rating: number;
  reviews_count: number;
  created_at: string;
  updated_at: string;
}

export type PriceType = 'fixed' | 'starting_from' | 'negotiable' | 'contact';

export interface Service {
  id: string;
  business_id: string;
  business_name?: string;
  business?: Business;
  name: string;
  slug: string;
  description: string;
  price?: number;
  price_type: PriceType;
  image_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  business_id: string;
  business_name?: string;
  business?: Business;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  price?: number;
  min_order_quantity?: number;
  unit?: string;
  image_url: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface BusinessPhoto {
  id: string;
  business_id: string;
  image_url: string;
  caption?: string;
  sort_order: number;
  created_at: string;
}

export interface BusinessHours {
  id: string;
  business_id: string;
  day_of_week: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface SavedBusiness {
  id: string;
  user_id: string;
  business_id: string;
  created_at: string;
  business?: Business;
}

export type EnquiryStatus = 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';

export interface Enquiry {
  id: string;
  customer_id: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  business_id: string;
  business_name?: string;
  subject: string;
  message: string;
  budget?: string;
  quantity?: string;
  location?: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at: string;
}

export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export interface Review {
  id: string;
  customer_id: string;
  customer_name?: string;
  customer_avatar?: string;
  customer?: {
    full_name?: string;
    avatar_url?: string;
  };
  business_id: string;
  business_name?: string;
  rating: number;
  title: string;
  comment: string;
  status: ReviewStatus;
  created_at: string;
  updated_at: string;
}

export interface Report {
  id: string;
  reported_by: string;
  business_id?: string;
  review_id?: string;
  reason: string;
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'dismissed';
  created_at: string;
  resolved_at?: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'enquiry' | 'review' | 'system' | 'business';
  is_read: boolean;
  created_at: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image_url: string;
  button_text: string;
  button_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface AdminLog {
  id: string;
  admin_id: string;
  admin_email?: string;
  action: string;
  entity_type: string;
  entity_id: string;
  description: string;
  created_at: string;
}

export interface Professional {
  id: string;
  name: string;
  slug: string;
  title: string;
  profession: string;
  qualification: string;
  experience_years: number;
  about: string;
  avatar_url: string;
  cover_image_url?: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  area: string;
  city_name: string;
  state: string;
  district?: string;
  pincode: string;
  specializations: string[];
  services_offered: string[];
  consultation_fee?: string;
  verification_status: VerificationStatus;
  rating: number;
  reviews_count: number;
  is_featured: boolean;
  is_available: boolean;
  office_hours?: string;
  memberships?: string[];
  created_at: string;
}
