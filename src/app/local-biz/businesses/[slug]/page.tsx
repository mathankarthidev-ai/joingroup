'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  MessageSquare,
  Globe,
  Mail,
  Clock,
  Calendar,
  FileText,
  Bookmark,
  Share2,
  ChevronRight,
  Package,
  Wrench,
  Camera,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { EnquiryModal } from '@/components/local-biz/EnquiryModal';
import { ReviewModal } from '@/components/local-biz/ReviewModal';
import { ProductCard } from '@/components/local-biz/ProductCard';
import { ServiceCard } from '@/components/local-biz/ServiceCard';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Business, Product, Service, Review } from '@/types/local-biz';
import { ContextualSafetyBanner } from '@/components/ContextualSafetyBanner';

export default function BusinessProfilePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [business, setBusiness] = useState<Business | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'services' | 'photos' | 'reviews' | 'contact'>('overview');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const b = await LocalBizStore.getBusinessBySlug(slug);
        if (!b) {
          router.push('/local-biz/businesses');
          return;
        }
        setBusiness(b);

        const [pList, sList, rList] = await Promise.all([
          LocalBizStore.getProductsByBusiness(b.id),
          LocalBizStore.getServicesByBusiness(b.id),
          LocalBizStore.getReviewsByBusiness(b.id),
        ]);
        setProducts(pList);
        setServices(sList);
        setReviews(rList);
      } catch (err) {
        console.error('Error loading business profile:', err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      loadData();
    }
  }, [slug, router]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = async () => {
    if (!business) return;
    const next = !saved;
    setSaved(next);
    if (next) {
      await LocalBizStore.saveBusiness(business.id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
        <LocalBizHeader />
        <div className="flex-1 flex items-center justify-center text-sm text-slate-500">
          Loading business profile...
        </div>
        <LocalBizFooter />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans">
        <LocalBizHeader />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
          <h2 className="text-xl font-bold">Business Not Found</h2>
          <Link href="/local-biz/businesses" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold">
            Back to Directory
          </Link>
        </div>
        <LocalBizFooter />
      </div>
    );
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <LocalBizHeader />


      {/* Breadcrumb Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Link href="/local-biz" className="hover:text-blue-600">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/local-biz/businesses" className="hover:text-blue-600">Businesses</Link>
          {business.city && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/local-biz/businesses?city=${business.city.slug}`} className="hover:text-blue-600">
                {business.city.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-800 dark:text-slate-200 font-semibold truncate">
            {business.name}
          </span>
        </div>
      </div>

      {/* Profile Header Banner */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Business Logo & Primary Details */}
            <div className="flex items-start gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-blue-600/10 to-indigo-600/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-3xl shrink-0 shadow-sm">
                {business.logo_url || business.name.slice(0, 2).toUpperCase()}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {business.name}
                  </h1>
                  {business.verification_status === 'verified' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Business</span>
                    </span>
                  )}
                  {business.gst_number && (
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-mono font-medium">
                      GST: {business.gst_number}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1 text-amber-600 font-bold bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200/50">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{business.rating ? business.rating.toFixed(1) : '4.8'}</span>
                    <span className="text-slate-400 font-normal">
                      ({reviews.length || business.reviews_count || 42} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {business.area ? `${business.area}, ` : ''}
                      {business.city?.name || 'India'}
                    </span>
                  </div>

                  {business.year_established && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Est. {business.year_established}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1 text-emerald-600 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Open Now</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2.5 max-w-2xl">
                  {business.short_description || business.description}
                </p>
              </div>
            </div>

            {/* Quick Actions (Call, WhatsApp, Get Quote, Save) */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {business.phone && (
                <a
                  href={`tel:${business.phone}`}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call Now</span>
                </a>
              )}

              {business.whatsapp && (
                <a
                  href={`https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                    business.name
                  )},%20I%20am%20interested%20in%20your%20services.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              )}

              <button
                onClick={() => setEnquiryOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Get Quotation</span>
              </button>

              <button
                onClick={handleSave}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-blue-600 transition-colors"
                title="Save Business"
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-blue-600 text-blue-600' : ''}`} />
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-blue-600 transition-colors"
                title="Share Profile"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {copied && (
            <div className="mt-2 text-right text-xs text-emerald-600 font-semibold">
              Link copied to clipboard!
            </div>
          )}

          {/* Permanent Contextual Safety Notice */}
          <ContextualSafetyBanner variant="listing" className="mt-6" />

          {/* Navigation Tabs */}
          <div className="mt-8 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'products', label: `Products (${products.length})` },
              { id: 'services', label: `Services (${services.length})` },
              { id: 'photos', label: 'Photos' },
              { id: 'reviews', label: `Reviews (${reviews.length})` },
              { id: 'contact', label: 'Contact Details' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  About {business.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {business.description}
                </p>

                {/* Key Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-400 block">Business Category</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {business.category?.name || 'General Business'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Establishment Year</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {business.year_established || '2015'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">GST Verified</span>
                    <span className="font-bold text-emerald-600">
                      {business.gst_number ? 'Yes (Verified)' : 'On Request'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Featured Products Teaser */}
              {products.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Products Offered
                    </h3>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      View All ({products.length}) &rarr;
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {products.slice(0, 2).map((p) => (
                      <ProductCard key={p.id} product={{ ...p, business }} />
                    ))}
                  </div>
                </div>
              )}

              {/* Featured Services Teaser */}
              {services.length > 0 && (
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      Services Provided
                    </h3>
                    <button
                      onClick={() => setActiveTab('services')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700"
                    >
                      View All ({services.length}) &rarr;
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {services.slice(0, 2).map((s) => (
                      <ServiceCard key={s.id} service={{ ...s, business }} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Working Hours & Location */}
            <div className="space-y-6">
              {/* Working Hours */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Business Working Hours</span>
                </h3>
                <div className="space-y-2 text-xs">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">{day}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        09:00 AM – 08:00 PM
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span>Business Location</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                  {business.address}, {business.area ? `${business.area}, ` : ''}
                  {business.city?.name}, {business.state} - {business.pincode}
                </p>

                {/* Map Mockup */}
                <div className="h-40 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-xs text-slate-400 space-y-1">
                  <MapPin className="w-6 h-6 text-blue-500 animate-bounce" />
                  <span className="font-semibold">Interactive Map View</span>
                  <span className="text-[10px]">{business.city?.name || 'India'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Product Catalog</h2>
                <p className="text-xs text-slate-500">Verified products with wholesale &amp; retail supply</p>
              </div>
              <button
                onClick={() => setEnquiryOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Request Custom Quotation
              </button>
            </div>

            {products.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500">No specific products listed yet. Contact the supplier directly.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={{ ...p, business }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'services' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Services Offered</h2>
                <p className="text-xs text-slate-500">Professional services provided by this enterprise</p>
              </div>
              <button
                onClick={() => setEnquiryOpen(true)}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs"
              >
                Inquire for Service
              </button>
            </div>

            {services.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800">
                <p className="text-sm text-slate-500">No standalone service packages listed.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((s) => (
                  <ServiceCard key={s.id} service={{ ...s, business }} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* PHOTOS TAB */}
        {activeTab === 'photos' && (
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Business Photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { emoji: '🏢', label: 'Office Front' },
                { emoji: '🏭', label: 'Manufacturing & Workshop' },
                { emoji: '📦', label: 'Warehouse & Storage' },
                { emoji: '🤝', label: 'Client Consultation Desk' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="h-44 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-4xl group hover:border-blue-500 transition-all"
                >
                  <span>{item.emoji}</span>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REVIEWS TAB */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Customer Reviews</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="text-lg font-bold">
                      {business.rating ? business.rating.toFixed(1) : '4.8'}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Based on {reviews.length || 1} verified customer experience(s)
                  </span>
                </div>
              </div>

              <button
                onClick={() => setReviewOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
              >
                Write a Review
              </button>
            </div>

            {reviews.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 text-center border border-slate-200 dark:border-slate-800 space-y-2">
                <p className="text-xs text-slate-500">No reviews yet. Be the first to review this business!</p>
                <button
                  onClick={() => setReviewOpen(true)}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Share Your Experience
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div
                    key={r.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 flex items-center justify-center font-bold text-xs">
                          {r.customer?.full_name?.slice(0, 1) || 'C'}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">
                            {r.customer?.full_name || 'Verified Customer'}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(r.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {r.title && (
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        {r.title}
                      </h4>
                    )}
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CONTACT DETAILS TAB */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Contact Information
              </h3>

              <div className="space-y-3 text-xs">
                {business.phone && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <Phone className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="text-slate-400 block">Phone Number</span>
                      <a href={`tel:${business.phone}`} className="font-bold text-blue-600 hover:underline">
                        {business.phone}
                      </a>
                    </div>
                  </div>
                )}

                {business.whatsapp && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-slate-400 block">WhatsApp Number</span>
                      <a
                        href={`https://wa.me/${business.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-emerald-600 hover:underline"
                      >
                        {business.whatsapp}
                      </a>
                    </div>
                  </div>
                )}

                {business.email && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <div>
                      <span className="text-slate-400 block">Official Email</span>
                      <a href={`mailto:${business.email}`} className="font-bold text-indigo-600 hover:underline">
                        {business.email}
                      </a>
                    </div>
                  </div>
                )}

                {business.website && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <Globe className="w-4 h-4 text-cyan-600" />
                    <div>
                      <span className="text-slate-400 block">Website</span>
                      <a
                        href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-cyan-600 hover:underline flex items-center gap-1"
                      >
                        <span>{business.website}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <div>
                    <span className="text-slate-400 block">Physical Address</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {business.address}, {business.area ? `${business.area}, ` : ''}{business.city?.name}, {business.state} - {business.pincode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Send Direct Message
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Message will be delivered immediately to this business.
              </p>
              <button
                onClick={() => setEnquiryOpen(true)}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20"
              >
                Open Message &amp; Quotation Box
              </button>
            </div>
          </div>
        )}
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        businessId={business.id}
        businessName={business.name}
      />

      <ReviewModal
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
        businessId={business.id}
        businessName={business.name}
        onSuccess={async () => {
          const updated = await LocalBizStore.getReviewsByBusiness(business.id);
          setReviews(updated);
        }}
      />

      <LocalBizFooter />
    </div>
  );
}
