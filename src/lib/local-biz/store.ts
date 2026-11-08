import {
  Business,
  Category,
  City,
  Product,
  Service,
  Review,
  Enquiry,
  SavedBusiness,
  UserProfile,
  Banner,
  ReviewStatus,
  EnquiryStatus,
  Professional,
} from '@/types/local-biz';
import {
  SEED_BUSINESSES,
  SEED_CATEGORIES,
  SEED_CITIES,
  SEED_PRODUCTS,
  SEED_SERVICES,
  SEED_REVIEWS,
  SEED_BANNERS,
  SEED_PROFESSIONALS,
} from './seed-data';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { CITY_TO_DISTRICT_MAP } from '@/lib/india';

// Local storage key constants
const BIZ_STORAGE_KEY = 'localbiz_businesses';
const REVIEWS_STORAGE_KEY = 'localbiz_reviews';
const ENQUIRIES_STORAGE_KEY = 'localbiz_enquiries';
const SAVED_STORAGE_KEY = 'localbiz_saved';
const CATEGORIES_STORAGE_KEY = 'localbiz_categories';
const CITIES_STORAGE_KEY = 'localbiz_cities';

class LocalBizStoreClass {
  private businesses: Business[] = [...SEED_BUSINESSES];
  private categories: Category[] = [...SEED_CATEGORIES];
  private cities: City[] = [...SEED_CITIES];
  private products: Product[] = [...SEED_PRODUCTS];
  private services: Service[] = [...SEED_SERVICES];
  private reviews: Review[] = [...SEED_REVIEWS];
  private enquiries: Enquiry[] = [];
  private saved: string[] = [];
  private banners: Banner[] = [...SEED_BANNERS];
  private professionals: Professional[] = [...SEED_PROFESSIONALS];
  private initialized: boolean = false;

  constructor() {
    this.initStore();
  }

  private initStore() {
    if (typeof window !== 'undefined' && !this.initialized) {
      try {
        const storedBiz = localStorage.getItem(BIZ_STORAGE_KEY);
        if (storedBiz) this.businesses = JSON.parse(storedBiz);
        else localStorage.setItem(BIZ_STORAGE_KEY, JSON.stringify(this.businesses));

        const storedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY);
        if (storedReviews) this.reviews = JSON.parse(storedReviews);
        else localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(this.reviews));

        const storedEnquiries = localStorage.getItem(ENQUIRIES_STORAGE_KEY);
        if (storedEnquiries) this.enquiries = JSON.parse(storedEnquiries);
        else localStorage.setItem(ENQUIRIES_STORAGE_KEY, JSON.stringify(this.enquiries));

        const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);
        if (storedSaved) this.saved = JSON.parse(storedSaved);
        else localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(this.saved));

        this.initialized = true;
      } catch (e) {
        console.warn('LocalStorage access warning in LocalBizStore:', e);
      }
    }
  }

  private persist(key: string, data: any) {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(data));
      } catch (e) {}
    }
  }

  private enrichBusiness(b: Business): Business {
    const city = this.cities.find(
      (c) => c.id === b.city_id || c.name.toLowerCase() === b.city_name.toLowerCase() || c.slug === b.city_name.toLowerCase()
    ) || {
      id: b.city_id,
      name: b.city_name,
      slug: b.city_name.toLowerCase().replace(/\s+/g, '-'),
      state: b.state,
      country: 'India',
      is_active: true,
    };

    const category = this.categories.find(
      (cat) => cat.id === b.category_id || cat.name.toLowerCase() === b.category_name.toLowerCase() || cat.slug === b.category_name.toLowerCase()
    ) || {
      id: b.category_id,
      name: b.category_name,
      slug: b.category_name.toLowerCase().replace(/\s+/g, '-'),
      icon: '🏢',
      is_active: true,
      sort_order: 1,
    };

    return {
      ...b,
      city,
      category,
    };
  }

  private enrichProduct(p: Product): Product {
    const business = this.businesses.find((b) => b.id === p.business_id);
    return {
      ...p,
      business: business ? this.enrichBusiness(business) : undefined,
    };
  }

  private enrichService(s: Service): Service {
    const business = this.businesses.find((b) => b.id === s.business_id);
    return {
      ...s,
      business: business ? this.enrichBusiness(business) : undefined,
    };
  }

  private enrichReview(r: Review): Review {
    return {
      ...r,
      customer: {
        full_name: r.customer_name || 'Verified Customer',
        avatar_url: r.customer_avatar || '👤',
      },
    };
  }

  // 1. BUSINESSES
  async getBusinesses(params?: {
    q?: string;
    search?: string;
    city?: string;
    city_slug?: string;
    state?: string;
    district?: string;
    category?: string;
    category_slug?: string;
    verified?: boolean;
    verified_only?: boolean;
    featured?: boolean;
    is_featured?: boolean;
    is_active?: boolean;
    rating?: number;
    sort?: string;
    limit?: number;
    page?: number;
  }): Promise<Business[]> {
    this.initStore();

    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase.from('businesses').select('*');
        const qVal = params?.q || params?.search;
        if (qVal) query = query.ilike('name', `%${qVal}%`);
        const cityVal = params?.city || params?.city_slug;
        if (cityVal) query = query.eq('city_name', cityVal);
        if (params?.state) query = query.ilike('state', `%${params.state}%`);
        const catVal = params?.category || params?.category_slug;
        if (catVal) query = query.eq('category_name', catVal);
        if (params?.verified || params?.verified_only) query = query.eq('verification_status', 'verified');
        if (params?.featured || params?.is_featured) query = query.eq('is_featured', true);

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return (data as Business[]).map((b) => this.enrichBusiness(b));
        }
      } catch (e) {
        // Fallback to local store
      }
    }

    let results = [...this.businesses];
    if (params?.is_active !== false) {
      results = results.filter((b) => b.is_active);
    }

    const qVal = params?.q || params?.search;
    if (qVal) {
      const q = qVal.toLowerCase().trim();
      const tokens = q.split(/\s+/).filter((t) => t.length > 1);

      results = results.filter((b) => {
        const searchable = [
          b.name,
          b.description,
          b.category_name,
          b.city_name,
          b.area || '',
          b.pincode || '',
          b.address || '',
          b.state || '',
        ]
          .join(' ')
          .toLowerCase();

        // Exact match
        if (searchable.includes(q)) return true;

        // Tokenized AI-assisted query match (matches across name, category, area, pincode, city)
        if (tokens.length > 1) {
          const matchCount = tokens.filter((t) => searchable.includes(t)).length;
          return matchCount >= Math.ceil(tokens.length * 0.6);
        }

        return false;
      });
    }

    const cityVal = params?.city || params?.city_slug;
    if (cityVal) {
      const c = cityVal.toLowerCase().trim();
      results = results.filter(
        (b) =>
          b.city_name.toLowerCase() === c ||
          b.city_id === cityVal ||
          b.city_name.toLowerCase().replace(/\s+/g, '-') === c ||
          (b.area && b.area.toLowerCase().includes(c)) ||
          (b.pincode && b.pincode.includes(c)) ||
          (b.state && b.state.toLowerCase().includes(c))
      );
    }

    if (params?.state) {
      const s = params.state.toLowerCase().trim();
      if (s && s !== 'all india' && s !== 'all') {
        results = results.filter(
          (b) => b.state.toLowerCase() === s || b.state.toLowerCase().replace(/\s+/g, '-') === s
        );
      }
    }

    if (params?.district) {
      const d = params.district.toLowerCase().trim();
      if (d && d !== 'all' && d !== 'all districts' && !d.startsWith('all districts')) {
        results = results.filter((b) => {
          if (b.district && b.district.toLowerCase() === d) return true;
          const mapped = CITY_TO_DISTRICT_MAP[b.city_name.toLowerCase()];
          if (mapped && mapped.district.toLowerCase() === d) return true;
          if (b.city_name.toLowerCase().includes(d) || d.includes(b.city_name.toLowerCase())) return true;
          if (b.area && b.area.toLowerCase().includes(d)) return true;
          return false;
        });
      }
    }

    const catVal = params?.category || params?.category_slug;
    if (catVal) {
      const cat = catVal.toLowerCase().trim();
      results = results.filter(
        (b) =>
          b.category_name.toLowerCase() === cat ||
          b.category_id === catVal ||
          b.category_name.toLowerCase().replace(/\s+/g, '-') === cat
      );
    }

    if (params?.verified || params?.verified_only) {
      results = results.filter((b) => b.verification_status === 'verified');
    }

    if (params?.featured || params?.is_featured) {
      results = results.filter((b) => b.is_featured);
    }

    if (params?.rating) {
      results = results.filter((b) => (b.rating || 0) >= (params.rating || 0));
    }

    if (params?.sort === 'rating') {
      results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (params?.sort === 'popular') {
      results.sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
    } else if (params?.sort === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      results.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    if (params?.limit) {
      results = results.slice(0, params.limit);
    }

    return results.map((b) => this.enrichBusiness(b));
  }

  async getBusinessBySlug(slug: string): Promise<Business | null> {
    this.initStore();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('businesses').select('*').eq('slug', slug).single();
        if (!error && data) return this.enrichBusiness(data as Business);
      } catch (e) {}
    }

    const found = this.businesses.find((b) => b.slug === slug);
    return found ? this.enrichBusiness(found) : null;
  }

  async getBusinessById(id: string): Promise<Business | null> {
    this.initStore();
    const found = this.businesses.find((b) => b.id === id);
    return found ? this.enrichBusiness(found) : null;
  }

  async createBusiness(data: Partial<Business>): Promise<Business> {
    this.initStore();
    const slug = (data.name || 'business')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Math.floor(Math.random() * 1000);

    const cityObj = this.cities.find((c) => c.id === data.city_id);
    const catObj = this.categories.find((c) => c.id === data.category_id);

    const newBiz: Business = {
      id: 'biz-' + Date.now(),
      name: data.name || 'Untitled Business',
      slug: data.slug || slug,
      description: data.description || '',
      short_description: data.short_description || data.description?.slice(0, 120) || '',
      logo_url: data.logo_url || '🏢',
      cover_image_url: data.cover_image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
      phone: data.phone || '+91 98765 43210',
      whatsapp: data.whatsapp || data.phone || '+91 98765 43210',
      email: data.email || 'contact@business.com',
      website: data.website || '',
      address: data.address || '',
      area: data.area || 'Central',
      city_id: data.city_id || cityObj?.id || 'city-1',
      city_name: cityObj?.name || data.city_name || 'Chennai',
      state: data.state || cityObj?.state || 'Tamil Nadu',
      pincode: data.pincode || '600001',
      category_id: data.category_id || catObj?.id || 'cat-1',
      category_name: catObj?.name || data.category_name || 'Restaurants',
      business_type: data.business_type || 'Private Business',
      year_established: data.year_established || 2024,
      gst_number: data.gst_number || '',
      status: data.status || 'approved',
      verification_status: data.verification_status || 'verified',
      is_featured: data.is_featured || false,
      is_active: data.is_active !== undefined ? data.is_active : true,
      views_count: 0,
      rating: 5.0,
      reviews_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.businesses.unshift(newBiz);
    this.persist(BIZ_STORAGE_KEY, this.businesses);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('businesses').insert([newBiz]);
      } catch (e) {
        console.error('Supabase insert business error:', e);
      }
    }

    return this.enrichBusiness(newBiz);
  }

  async updateBusiness(id: string, updates: Partial<Business>): Promise<boolean> {
    this.initStore();
    const idx = this.businesses.findIndex((b) => b.id === id);
    if (idx !== -1) {
      this.businesses[idx] = {
        ...this.businesses[idx],
        ...updates,
        updated_at: new Date().toISOString(),
      };
      this.persist(BIZ_STORAGE_KEY, this.businesses);

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('businesses').update(updates).eq('id', id);
        } catch (e) {}
      }
      return true;
    }
    return false;
  }

  async updateBusinessStatus(
    id: string,
    status: Business['status'],
    verification?: Business['verification_status']
  ): Promise<boolean> {
    return this.updateBusiness(id, {
      status,
      ...(verification ? { verification_status: verification } : {}),
    });
  }

  async toggleFeatured(id: string): Promise<boolean> {
    this.initStore();
    const biz = this.businesses.find((b) => b.id === id);
    if (biz) {
      return this.updateBusiness(id, { is_featured: !biz.is_featured });
    }
    return false;
  }

  async deleteBusiness(id: string): Promise<boolean> {
    this.initStore();
    this.businesses = this.businesses.filter((b) => b.id !== id);
    this.persist(BIZ_STORAGE_KEY, this.businesses);
    return true;
  }

  // 2. CATEGORIES & CITIES
  async getCategories(): Promise<Category[]> {
    this.initStore();
    return [...this.categories];
  }

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    this.initStore();
    return this.categories.find((c) => c.slug === slug) || null;
  }

  async getCities(): Promise<City[]> {
    this.initStore();
    return [...this.cities];
  }

  async getCityBySlug(slug: string): Promise<City | null> {
    this.initStore();
    return this.cities.find((c) => c.slug === slug) || null;
  }

  // 3. PRODUCTS & SERVICES
  async getProducts(paramsOrLimit?: number | { business_id?: string; category_id?: string }): Promise<Product[]> {
    this.initStore();
    let list = [...this.products];
    if (typeof paramsOrLimit === 'number') {
      list = list.slice(0, paramsOrLimit);
    } else if (paramsOrLimit) {
      if (paramsOrLimit.business_id) list = list.filter((p) => p.business_id === paramsOrLimit.business_id);
      if (paramsOrLimit.category_id) list = list.filter((p) => p.category_id === paramsOrLimit.category_id);
    }
    return list.map((p) => this.enrichProduct(p));
  }

  async getProductsByBusiness(business_id: string): Promise<Product[]> {
    return this.getProducts({ business_id });
  }

  async getServices(paramsOrLimit?: number | { business_id?: string }): Promise<Service[]> {
    this.initStore();
    let list = [...this.services];
    if (typeof paramsOrLimit === 'number') {
      list = list.slice(0, paramsOrLimit);
    } else if (paramsOrLimit) {
      if (paramsOrLimit.business_id) list = list.filter((s) => s.business_id === paramsOrLimit.business_id);
    }
    return list.map((s) => this.enrichService(s));
  }

  async getServicesByBusiness(business_id: string): Promise<Service[]> {
    return this.getServices({ business_id });
  }

  // 4. REVIEWS
  async getReviews(business_id?: string): Promise<Review[]> {
    this.initStore();
    let list = [...this.reviews];
    if (business_id) list = list.filter((r) => r.business_id === business_id);
    return list.map((r) => this.enrichReview(r));
  }

  async getReviewsByBusiness(business_id: string): Promise<Review[]> {
    return this.getReviews(business_id);
  }

  async addReview(data: {
    business_id: string;
    business_name?: string;
    customer_id?: string;
    customer_name?: string;
    rating: number;
    title?: string;
    comment: string;
    status?: ReviewStatus;
  }): Promise<Review> {
    this.initStore();
    const newReview: Review = {
      id: 'rev-' + Date.now(),
      business_id: data.business_id,
      business_name: data.business_name || 'Local Business',
      customer_id: data.customer_id || 'guest-' + Date.now(),
      customer_name: data.customer_name || 'Verified Customer',
      customer_avatar: '👤',
      rating: data.rating,
      title: data.title || 'Customer Review',
      comment: data.comment,
      status: data.status || 'approved',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.reviews.unshift(newReview);
    this.persist(REVIEWS_STORAGE_KEY, this.reviews);
    return this.enrichReview(newReview);
  }

  async createReview(data: {
    business_id: string;
    business_name?: string;
    customer_id?: string;
    customer_name?: string;
    rating: number;
    title?: string;
    comment: string;
    status?: ReviewStatus;
  }): Promise<Review> {
    return this.addReview(data);
  }

  async moderateReview(id: string, status: ReviewStatus): Promise<boolean> {
    this.initStore();
    const idx = this.reviews.findIndex((r) => r.id === id);
    if (idx !== -1) {
      this.reviews[idx].status = status;
      this.persist(REVIEWS_STORAGE_KEY, this.reviews);
      return true;
    }
    return false;
  }

  // 5. ENQUIRIES
  async createEnquiry(data: {
    customer_id?: string;
    customer_name?: string;
    customer_email?: string;
    customer_phone?: string;
    name?: string;
    phone?: string;
    email?: string;
    business_id?: string;
    business_name?: string;
    subject?: string;
    message: string;
    budget?: string;
    quantity?: string;
    location?: string;
    status?: EnquiryStatus;
  }): Promise<Enquiry> {
    this.initStore();
    const newEnquiry: Enquiry = {
      id: 'enq-' + Date.now(),
      customer_id: data.customer_id || 'guest-' + Date.now(),
      customer_name: data.customer_name || data.name || 'Prospective Buyer',
      customer_email: data.customer_email || data.email || '',
      customer_phone: data.customer_phone || data.phone || '',
      business_id: data.business_id || '',
      business_name: data.business_name || 'General Supplier',
      subject: data.subject || 'Product/Service Quotation Request',
      message: data.message,
      budget: data.budget || 'Market Rate',
      quantity: data.quantity || '1',
      location: data.location || 'India',
      status: data.status || 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    this.enquiries.unshift(newEnquiry);
    this.persist(ENQUIRIES_STORAGE_KEY, this.enquiries);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('enquiries').insert([newEnquiry]);
      } catch (e) {}
    }

    return newEnquiry;
  }

  async getEnquiries(params?: { customer_id?: string; business_id?: string }): Promise<Enquiry[]> {
    this.initStore();
    let list = [...this.enquiries];
    if (params?.customer_id) list = list.filter((e) => e.customer_id === params.customer_id);
    if (params?.business_id) list = list.filter((e) => e.business_id === params.business_id);
    return list;
  }

  async updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<boolean> {
    this.initStore();
    const idx = this.enquiries.findIndex((e) => e.id === id);
    if (idx !== -1) {
      this.enquiries[idx].status = status;
      this.persist(ENQUIRIES_STORAGE_KEY, this.enquiries);
      return true;
    }
    return false;
  }

  // 6. SAVED BUSINESSES
  async saveBusiness(businessId: string): Promise<boolean> {
    this.initStore();
    if (!this.saved.includes(businessId)) {
      this.saved.push(businessId);
      this.persist(SAVED_STORAGE_KEY, this.saved);
    }
    return true;
  }

  async toggleSaveBusiness(userId: string, businessId: string): Promise<boolean> {
    return this.saveBusiness(businessId);
  }

  async removeSavedBusiness(businessId: string): Promise<boolean> {
    this.initStore();
    this.saved = this.saved.filter((id) => id !== businessId);
    this.persist(SAVED_STORAGE_KEY, this.saved);
    return true;
  }

  async getSavedBusinesses(userId?: string): Promise<string[]> {
    this.initStore();
    return [...this.saved];
  }

  // 7. BANNERS
  async getBanners(): Promise<Banner[]> {
    return [...this.banners];
  }

  // 8. PROFESSIONALS
  async getProfessionals(options?: {
    city?: string;
    state?: string;
    district?: string;
    profession?: string;
    search?: string;
    featuredOnly?: boolean;
    limit?: number;
  }): Promise<Professional[]> {
    let list = [...this.professionals];

    if (options?.state && options.state.toLowerCase() !== 'all india' && options.state.toLowerCase() !== 'all') {
      const sLower = options.state.toLowerCase().trim();
      list = list.filter((p) => {
        const mapped = CITY_TO_DISTRICT_MAP[p.city_name.toLowerCase()];
        return (
          (p.state && p.state.toLowerCase() === sLower) ||
          (mapped && mapped.state.toLowerCase() === sLower)
        );
      });
    }

    if (options?.district && options.district.toLowerCase() !== 'all' && options.district.toLowerCase() !== 'all districts' && !options.district.toLowerCase().startsWith('all districts')) {
      const dLower = options.district.toLowerCase().trim();
      list = list.filter((p) => {
        if (p.district && p.district.toLowerCase() === dLower) return true;
        const mapped = CITY_TO_DISTRICT_MAP[p.city_name.toLowerCase()];
        if (mapped && mapped.district.toLowerCase() === dLower) return true;
        if (p.city_name.toLowerCase().includes(dLower) || dLower.includes(p.city_name.toLowerCase())) return true;
        if (p.area && p.area.toLowerCase().includes(dLower)) return true;
        return false;
      });
    }

    if (options?.city && options.city !== 'All Cities' && options.city !== 'All India') {
      const cLower = options.city.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.city_name.toLowerCase() === cLower ||
          (p.area && p.area.toLowerCase().includes(cLower)) ||
          (p.pincode && p.pincode.includes(cLower))
      );
    }

    if (options?.profession && options.profession !== 'All Professions') {
      const profLower = options.profession.toLowerCase();
      list = list.filter((p) => p.profession.toLowerCase().includes(profLower) || p.title.toLowerCase().includes(profLower));
    }

    if (options?.search && options.search.trim() !== '') {
      const q = options.search.toLowerCase().trim();
      const tokens = q.split(/\s+/).filter((t) => t.length > 1);

      list = list.filter((p) => {
        const searchable = [
          p.name,
          p.title,
          p.profession,
          p.qualification,
          p.city_name,
          p.area || '',
          p.pincode || '',
          p.address || '',
          ...(p.specializations || []),
          ...(p.services_offered || []),
        ]
          .join(' ')
          .toLowerCase();

        if (searchable.includes(q)) return true;
        if (tokens.length > 1) {
          const matchCount = tokens.filter((t) => searchable.includes(t)).length;
          return matchCount >= Math.ceil(tokens.length * 0.6);
        }
        return false;
      });
    }

    if (options?.featuredOnly) {
      list = list.filter((p) => p.is_featured);
    }

    if (options?.limit && options.limit > 0) {
      list = list.slice(0, options.limit);
    }

    return list;
  }

  async getProfessionalBySlug(slug: string): Promise<Professional | null> {
    const prof = this.professionals.find((p) => p.slug === slug || p.id === slug);
    return prof || null;
  }

  async getProfessionsList(): Promise<string[]> {
    const unique = Array.from(new Set(this.professionals.map((p) => p.profession)));
    return unique.sort();
  }

  // 9. ANALYTICS
  async getAnalyticsSummary() {
    this.initStore();
    return {
      totalBusinesses: this.businesses.length,
      approvedBusinesses: this.businesses.filter((b) => b.status === 'approved').length,
      pendingBusinesses: this.businesses.filter((b) => b.status === 'pending').length,
      verifiedBusinesses: this.businesses.filter((b) => b.verification_status === 'verified').length,
      totalEnquiries: this.enquiries.length,
      pendingEnquiries: this.enquiries.filter((e) => e.status === 'pending').length,
      totalReviews: this.reviews.length,
      pendingReviews: this.reviews.filter((r) => r.status === 'pending').length,
      totalViews: this.businesses.reduce((acc, curr) => acc + (curr.views_count || 0), 0),
    };
  }
}

export const LocalBizStore = new LocalBizStoreClass();
export const localBizStore = LocalBizStore;
export default LocalBizStore;
