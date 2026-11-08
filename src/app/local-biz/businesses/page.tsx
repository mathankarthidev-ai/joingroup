'use client';

import React, { useState, useEffect, useMemo, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Filter,
  Grid,
  List,
  ShieldCheck,
  Star,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { BusinessCard } from '@/components/local-biz/BusinessCard';
import { LocationSearchFilter } from '@/components/common/LocationSearchFilter';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Business, Category, City } from '@/types/local-biz';
import { SEED_CATEGORIES, SEED_CITIES } from '@/lib/local-biz/seed-data';
import { JustdialHeroStrip } from '@/components/common/JustdialHeroStrip';
import { TypewriterText } from '@/components/common/TypewriterText';

function BusinessesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialCity = searchParams.get('city') || '';
  const initialState = searchParams.get('state') || 'All India';
  const initialDistrict = searchParams.get('district') || '';
  const initialCategory = searchParams.get('category') || '';

  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialQ);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'name'>('featured');

  // Sync state when URL search params change externally
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const st = searchParams.get('state') || 'All India';
    const dist = searchParams.get('district') || '';
    const cat = searchParams.get('category') || '';
    const city = searchParams.get('city') || '';

    setSearchTerm(q);
    setSelectedState(st);
    setSelectedDistrict(dist);
    setSelectedCategory(cat);
    setSelectedCity(city);
  }, [searchParams]);

  // Push new state to URL (?state=...&district=...) to survive refreshes & allow bookmarking
  const syncToUrl = useCallback(
    (newState: string, newDistrict: string, newSearch: string, newCategory: string) => {
      const params = new URLSearchParams();
      if (newSearch && newSearch.trim()) params.set('q', newSearch.trim());
      if (newState && newState !== 'All India') params.set('state', newState);
      if (newDistrict && newDistrict.trim()) params.set('district', newDistrict.trim());
      if (newCategory && newCategory.trim()) params.set('category', newCategory.trim());

      const qs = params.toString();
      router.push(`/local-biz/businesses${qs ? `?${qs}` : ''}`);
    },
    [router]
  );

  useEffect(() => {
    async function fetchListings() {
      try {
        setLoading(true);
        const data = await LocalBizStore.getBusinesses({
          search: searchTerm,
          city_slug: selectedCity,
          state: selectedState === 'All India' ? undefined : selectedState,
          district: selectedDistrict || undefined,
          category_slug: selectedCategory,
          verified_only: verifiedOnly,
          is_active: true,
        });
        setBusinesses(data);
      } catch (err) {
        console.error('Error fetching businesses:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
  }, [searchTerm, selectedCity, selectedState, selectedDistrict, selectedCategory, verifiedOnly]);

  const filteredAndSorted = useMemo(() => {
    let result = [...businesses];
    if (minRating > 0) {
      result = result.filter((b) => (b.rating || 0) >= minRating);
    }
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // featured
      result.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }
    return result;
  }, [businesses, minRating, sortBy]);

  // Compute location display phrase for heading & counts:
  // e.g. "in Coimbatore, Tamil Nadu", "in Tamil Nadu", or "across India"
  const locationPhrase = useMemo(() => {
    const hasState = selectedState && selectedState !== 'All India';
    const hasDistrict = Boolean(selectedDistrict);

    if (hasDistrict && hasState) {
      return `in ${selectedDistrict}, ${selectedState}`;
    }
    if (hasDistrict) {
      return `in ${selectedDistrict}`;
    }
    if (hasState) {
      return `in ${selectedState}`;
    }
    return 'across India';
  }, [selectedState, selectedDistrict]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCity('');
    setSelectedState('All India');
    setSelectedDistrict('');
    setSelectedCategory('');
    setVerifiedOnly(false);
    setMinRating(0);
    setSortBy('featured');
    router.push('/local-biz/businesses');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <LocalBizHeader />

      {/* Breadcrumb & Search Bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <Link href="/local-biz" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Nammabus Businesses</span>
            {selectedCity && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="capitalize">{selectedCity}</span>
              </>
            )}
          </div>

          {/* Page Heading with Typewriter */}
          <div className="mb-4">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight min-h-[1.5em]">
              Find &amp; Hire Verified{' '}
              <TypewriterText
                words={[
                  'AC Techs & Electricians',
                  'Wedding Photographers',
                  'Caterers & Home Bakers',
                  'Boutiques & Tailors',
                  'Packers & Movers',
                  'PGs & Hostels',
                  'Car Workshops & Garages',
                ]}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
              />
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Browse 40+ verified local trade categories across India with direct WhatsApp connect and verified credentials.
            </p>
          </div>

          {/* AI Search Banner / Tip */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 text-purple-900 dark:text-purple-200 text-xs font-medium mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0 animate-pulse" />
              <span>
                <strong>AI Search:</strong> Enter <strong>Area Name, Pincode (e.g. 600017) and City</strong> to get business search faster in AI.
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-200/80 dark:bg-purple-900 text-purple-800 dark:text-purple-300">
              Query-Based AI Engine
            </span>
          </div>

          <div className="space-y-3">
            <LocationSearchFilter
              searchQuery={searchTerm}
              onSearchChange={(val) => {
                setSearchTerm(val);
              }}
              selectedState={selectedState}
              onStateChange={(st) => {
                setSelectedState(st);
                setSelectedDistrict('');
                syncToUrl(st, '', searchTerm, selectedCategory);
              }}
              selectedDistrict={selectedDistrict}
              onDistrictChange={(dist) => {
                setSelectedDistrict(dist);
                syncToUrl(selectedState, dist, searchTerm, selectedCategory);
              }}
              onSearchSubmit={(e) => {
                e.preventDefault();
                syncToUrl(selectedState, selectedDistrict, searchTerm, selectedCategory);
              }}
              placeholder="Search technicians, photographers, caterers, tailors, area name, or 6-digit pincode (e.g. 600017)..."
            />

            {/* Category Filter Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  syncToUrl(selectedState, selectedDistrict, searchTerm, e.target.value);
                }}
                aria-label="Filter by category"
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none cursor-pointer"
              >
                <option value="">All Categories (40+ Services)</option>
                {SEED_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('');
                    syncToUrl(selectedState, selectedDistrict, searchTerm, '');
                  }}
                  className="text-[11px] text-blue-600 hover:text-blue-700 font-semibold cursor-pointer underline"
                >
                  Clear category
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Justdial Animated Hero Strip & Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
        <JustdialHeroStrip variant="local-biz" />
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar Filters */}
          <aside className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 sticky top-32 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200">
                <Filter className="w-4 h-4 text-blue-600" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Verification Status */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                Trust &amp; Verification
              </h4>
              <label className="flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  Verified Businesses Only
                </span>
              </label>
            </div>

            {/* Minimum Rating */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                Customer Rating
              </h4>
              <div className="space-y-1.5">
                {[
                  { val: 0, label: 'Any Rating' },
                  { val: 4.5, label: '4.5 & Above (Exceptional)' },
                  { val: 4.0, label: '4.0 & Above (Popular)' },
                  { val: 3.5, label: '3.5 & Above' },
                ].map((item) => (
                  <label
                    key={item.val}
                    className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="min_rating"
                      checked={minRating === item.val}
                      onChange={() => setMinRating(item.val)}
                      className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Quick Categories List */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2.5">
                Top Categories
              </h4>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1 text-xs">
                {SEED_CATEGORIES.slice(0, 10).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat.slug ? '' : cat.slug)
                    }
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-slate-400">{cat.icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Results Column */}
          <main className="lg:col-span-3 space-y-6">
            {/* Results Header Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
              <div>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Verified Businesses {locationPhrase}</span>
                  {selectedDistrict && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold border border-blue-200 dark:border-blue-800">
                      District Filtered
                    </span>
                  )}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {filteredAndSorted.length} verified {filteredAndSorted.length === 1 ? 'business' : 'businesses'} {locationPhrase}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  aria-label="Sort businesses"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="rating">Sort by: Top Rated</option>
                  <option value="name">Sort by: Alphabetical</option>
                </select>

                <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-lg ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                        : 'text-slate-400'
                    }`}
                    title="Grid View"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-lg ${
                      viewMode === 'list'
                        ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm'
                        : 'text-slate-400'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Grid / List */}
            {loading ? (
              <div className="py-20 text-center text-slate-400 text-sm">
                Loading businesses {locationPhrase}...
              </div>
            ) : filteredAndSorted.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="text-4xl">🔍</div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No businesses found {locationPhrase}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  We couldn&apos;t find any listings matching your search criteria. Try choosing &quot;All districts&quot;, switching state to &quot;All India&quot;, or clearing all filters.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear filters</span>
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 gap-5'
                    : 'space-y-4'
                }
              >
                {filteredAndSorted.map((b) => (
                  <BusinessCard key={b.id} business={b} viewMode={viewMode} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <LocalBizFooter />
    </div>
  );
}

export default function BusinessesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-center">Loading...</div>}>
      <BusinessesContent />
    </Suspense>
  );
}
