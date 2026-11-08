'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WeServeCitiesSection } from '@/components/local-biz/WeServeCitiesSection';
import { JustdialHeroStrip } from '@/components/common/JustdialHeroStrip';
import { CityScrollStrip } from '@/components/common/CityScrollStrip';
import { SEED_PROFESSIONALS } from '@/lib/local-biz/seed-data';
import { Sparkles, Bot } from 'lucide-react';
import { TypewriterText } from '@/components/common/TypewriterText';
import { getLocationEntry, CITY_TO_DISTRICT_MAP } from '@/lib/india';

export default function HomePage() {
  const router = useRouter();
  const [searchTab, setSearchTab] = useState<'biz' | 'groups' | 'ai'>('biz');

  // Business Search state
  const [bizQuery, setBizQuery] = useState('');
  const [bizLocation, setBizLocation] = useState('');

  // Groups Search state
  const [groupQuery, setGroupQuery] = useState('');
  const [groupPlatform, setGroupPlatform] = useState('all');

  const handleBizSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (bizQuery) params.set('q', bizQuery);
    if (bizLocation && bizLocation !== 'All India') {
      const entry = getLocationEntry(bizLocation);
      if (entry) {
        params.set('state', entry.name);
      } else {
        const mapped = CITY_TO_DISTRICT_MAP[bizLocation.toLowerCase()];
        if (mapped) {
          params.set('state', mapped.state);
          params.set('district', mapped.district);
        } else {
          params.set('city', bizLocation);
        }
      }
    }
    const pincodeMatch = (bizLocation + ' ' + bizQuery).match(/\b\d{6}\b/);
    if (pincodeMatch) params.set('pincode', pincodeMatch[0]);
    if (searchTab === 'ai') params.set('ai', '1');
    router.push(`/local-biz/businesses?${params.toString()}`);
  };

  const handleGroupSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (groupQuery) params.set('q', groupQuery);
    if (groupPlatform !== 'all') params.set('platform', groupPlatform);
    router.push(`/groups?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col justify-between">
      <Header />

      <main className="w-full bg-surface flex-grow">
        <div className="flex flex-col w-full">
          {/* ========================================================
              1. HERO SECTION: LEFT CITY SCROLL + RIGHT HERO CONTENT & SEARCH
             ======================================================== */}
          <section className="relative w-full bg-surface-container-low pt-8 sm:pt-12 pb-14 px-gutter overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* LEFT SIDE: ANIMATED TOP CITIES SCROLL SHOWCASE */}
                <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
                  <CityScrollStrip
                    selectedCity={bizLocation}
                    onSelectCity={(cityName) => {
                      setBizLocation(cityName);
                    }}
                  />
                </div>

                {/* RIGHT SIDE: HERO HEADLINE, SUBTITLE & DUAL SEARCH BOX */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left order-1 lg:order-2 space-y-4">
                  {/* Overline Tag */}
                  <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-high text-on-surface-variant font-label-md text-xs shadow-sm w-fit">
                    <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                    <span>Dual-Service Community &amp; Commerce Directory</span>
                  </div>

                  {/* Main Headline with Typewriter Animation */}
                  <h1 className="font-headline-xl text-3xl sm:text-4xl lg:text-5xl font-black text-on-surface tracking-tight leading-tight min-h-[3.2em] sm:min-h-[2.4em]">
                    Consult &amp; Connect with Verified{' '}
                    <TypewriterText
                      words={[
                        'Home Technicians',
                        'Wedding Photographers',
                        'Caterers & Bakers',
                        'Boutiques & Tailors',
                        'Wholesale Suppliers',
                        'Local Businesses',
                        'Community Groups',
                      ]}
                      className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent"
                    />
                  </h1>

                  {/* Subtitle */}
                  <p className="font-body-lg text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                    Discover trusted neighborhood businesses or find active, verified community chat groups, channels, and social directories in one unified hub.
                  </p>

                  {/* 2 Small Explanatory Cards: Nammabus & JoinGroupLinks */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {/* Div 1: Nammabus */}
                    <div className="group relative p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-blue-200/80 dark:border-blue-900/50 hover:border-blue-500 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[19px]">storefront</span>
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                              <span>Nammabus</span>
                            </h4>
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold border border-blue-200 dark:border-blue-800">
                              LOCAL BIZ
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                            Verified directory for neighborhood businesses, local technicians, photographers, caterers, tailors &amp; stores with direct contact and zero broker fees.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Div 2: JoinGroupLinks */}
                    <div className="group relative p-3 sm:p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-amber-200/80 dark:border-amber-900/50 hover:border-amber-500 shadow-sm hover:shadow-md transition-all">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                          <span className="material-symbols-outlined text-[19px]">hub</span>
                        </div>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4 className="text-xs font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                              <span>JoinGroupLinks</span>
                            </h4>
                            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold border border-amber-200 dark:border-amber-800">
                              COMMUNITIES
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                            Curated hub for active, verified social &amp; chat communities across Arattai, WhatsApp, Telegram &amp; Discord for jobs, study, trades &amp; interests.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dual Search Component Container */}
                  <div className="w-full bg-surface rounded-3xl shadow-xl p-space-md md:p-space-lg text-left border border-slate-200 dark:border-slate-800">
                    {/* Tabs Switcher */}
                    <div className="flex rounded-2xl bg-surface-container-low p-space-xs mb-space-md">
                      <button
                        type="button"
                        onClick={() => setSearchTab('biz')}
                        className={`flex-1 py-space-sm px-space-md rounded-xl font-label-md transition-all flex items-center justify-center gap-space-sm text-xs sm:text-sm font-bold cursor-pointer ${
                          searchTab === 'biz'
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">storefront</span>
                        <span>Search Nammabus</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSearchTab('groups')}
                        className={`flex-1 py-space-sm px-space-md rounded-xl font-label-md transition-all flex items-center justify-center gap-space-sm text-xs sm:text-sm font-bold cursor-pointer ${
                          searchTab === 'groups'
                            ? 'bg-secondary text-on-secondary shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">group</span>
                        <span>Discover Group Links</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSearchTab('ai')}
                        className={`flex-1 py-space-sm px-space-md rounded-xl font-label-md transition-all flex items-center justify-center gap-space-sm text-xs sm:text-sm font-bold cursor-pointer ${
                          searchTab === 'ai'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                            : 'text-purple-600 dark:text-purple-400 hover:text-purple-700 bg-purple-50/50 dark:bg-purple-950/30'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
                        <span>AI Search</span>
                      </button>
                    </div>

                    {/* AI Prompt / Pincode Notice Banner */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 text-purple-900 dark:text-purple-200 text-xs font-medium mb-space-md shadow-xs">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>
                        <strong>AI Search Tip:</strong> Enter <strong>Area Name, Pincode (e.g. 600017) and City</strong> to get business search faster in AI.
                      </span>
                    </div>

                    {/* SEARCH FORM 1: LOCAL BIZ */}
                    {searchTab === 'biz' && (
                      <form onSubmit={handleBizSearch} className="space-y-space-md">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
                          <div className="md:col-span-7 relative flex items-center">
                            <span className="material-symbols-outlined absolute left-space-md text-outline">search</span>
                            <input
                              type="text"
                              value={bizQuery}
                              onChange={(e) => setBizQuery(e.target.value)}
                              placeholder="Search electricians, plumbers, photographers, caterers, tailors, garages..."
                              className="w-full pl-12 pr-space-md py-space-md rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium border border-transparent transition-all"
                            />
                          </div>
                          <div className="md:col-span-4 relative flex items-center">
                            <span className="material-symbols-outlined absolute left-space-md text-outline">location_on</span>
                            <input
                              type="text"
                              value={bizLocation}
                              onChange={(e) => setBizLocation(e.target.value)}
                              placeholder="Area, Pincode or City (e.g. T. Nagar, 600017, Chennai)..."
                              className="w-full pl-12 pr-space-md py-space-md rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium border border-transparent transition-all"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <button
                              type="submit"
                              className="w-full h-full min-h-[48px] bg-primary text-on-primary rounded-xl flex items-center justify-center hover:bg-primary-container transition-colors shadow-md cursor-pointer"
                            >
                              <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {/* SEARCH FORM 2: GROUPS */}
                    {searchTab === 'groups' && (
                      <form onSubmit={handleGroupSearch} className="space-y-space-md">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
                          <div className="md:col-span-7 relative flex items-center">
                            <span className="material-symbols-outlined absolute left-space-md text-outline">explore</span>
                            <input
                              type="text"
                              value={groupQuery}
                              onChange={(e) => setGroupQuery(e.target.value)}
                              placeholder="Search tech, medical, legal, crypto, study, jobs, city or area..."
                              className="w-full pl-12 pr-space-md py-space-md rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium border border-transparent transition-all"
                            />
                          </div>
                          <div className="md:col-span-4 relative flex items-center">
                            <span className="material-symbols-outlined absolute left-space-md text-outline">chat</span>
                            <select
                              value={groupPlatform}
                              onChange={(e) => setGroupPlatform(e.target.value)}
                              className="w-full pl-12 pr-space-md py-space-md rounded-xl bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary text-sm font-medium border border-transparent transition-all appearance-none cursor-pointer"
                            >
                              <option value="all">All 30+ Platforms</option>
                              <option value="arattai">⭐ Arattai (by Zoho) - India #1</option>
                              <option value="whatsapp">WhatsApp Communities</option>
                              <option value="telegram">Telegram Channels</option>
                              <option value="instagram">Instagram Broadcast &amp; Pages</option>
                              <option value="discord">Discord Servers</option>
                            </select>
                          </div>
                          <div className="md:col-span-1">
                            <button
                              type="submit"
                              className="w-full h-full min-h-[48px] bg-secondary text-on-secondary rounded-xl flex items-center justify-center hover:bg-secondary-container hover:text-on-secondary-container transition-colors shadow-md cursor-pointer"
                            >
                              <span className="material-symbols-outlined">arrow_forward</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    )}

                    {/* SEARCH FORM 3: AI SMART QUERY SEARCH */}
                    {searchTab === 'ai' && (
                      <form onSubmit={handleBizSearch} className="space-y-space-md">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
                          <div className="md:col-span-7 relative flex items-center">
                            <Sparkles className="w-5 h-5 text-purple-600 absolute left-space-md" />
                            <input
                              type="text"
                              value={bizQuery}
                              onChange={(e) => setBizQuery(e.target.value)}
                              placeholder="Ask AI: e.g. 'Child Specialist in Anna Nagar 600040' or 'Wholesale packaging in 110020'..."
                              className="w-full pl-12 pr-space-md py-space-md rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium border border-purple-300/40 dark:border-purple-800/40 transition-all shadow-inner"
                            />
                          </div>
                          <div className="md:col-span-4 relative flex items-center">
                            <span className="material-symbols-outlined absolute left-space-md text-purple-600">location_on</span>
                            <input
                              type="text"
                              value={bizLocation}
                              onChange={(e) => setBizLocation(e.target.value)}
                              placeholder="Area, Pincode or City (e.g. T. Nagar, 600017, Chennai)..."
                              className="w-full pl-12 pr-space-md py-space-md rounded-xl bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm font-medium border border-purple-300/40 dark:border-purple-800/40 transition-all shadow-inner"
                            />
                          </div>
                          <div className="md:col-span-1">
                            <button
                              type="submit"
                              className="w-full h-full min-h-[48px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl flex items-center justify-center hover:from-purple-500 hover:to-indigo-500 transition-all shadow-md cursor-pointer hover:shadow-lg"
                            >
                              <Sparkles className="w-5 h-5 text-amber-300" />
                            </button>
                          </div>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              2. JUSTDIAL-STYLE HERO STRIP & POPULAR CATEGORIES (DUAL TRACK)
             ======================================================== */}
          <section className="w-full py-space-xl px-gutter bg-surface">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <span className="text-label-md text-primary uppercase tracking-wider font-bold text-xs">
                  Instant Access Directory
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                  Explore Trending Hubs &amp; Categories
                </h2>
              </div>

              <JustdialHeroStrip />
            </div>
          </section>

          {/* ========================================================
              3. FEATURED LOCAL BUSINESSES SECTION
             ======================================================== */}
          <section className="w-full py-space-xl px-gutter bg-surface-container-low">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
                <div>
                  <span className="text-label-md text-primary uppercase tracking-wider font-bold text-xs">
                    Verified Merchants
                  </span>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                    Featured Nammabus Businesses
                  </h2>
                </div>
                <Link
                  href="/local-biz/businesses"
                  className="text-primary font-bold text-xs hover:underline flex items-center gap-space-xs mt-space-sm md:mt-0"
                >
                  <span>View all Nammabus businesses</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>

              {/* Grid of Local Biz Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {/* Biz Card 1 */}
                <div className="bg-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-slate-200 dark:border-slate-800">
                  <div
                    className="h-48 w-full bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80')`,
                    }}
                  >
                    <div className="absolute top-space-md right-space-md bg-surface/90 backdrop-blur-md px-space-sm py-1 rounded-full text-xs font-bold text-on-surface flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>4.9 (124 reviews)</span>
                    </div>
                  </div>
                  <div className="p-space-lg flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-space-xs mb-space-xs text-xs">
                        <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed font-bold rounded">
                          Coffee Roastery
                        </span>
                        <span className="text-outline">• Chennai Central</span>
                      </div>
                      <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                        Blue Harbor Artisan Cafe
                      </h3>
                      <p className="text-on-surface-variant text-body-sm text-xs line-clamp-2">
                        Specialty single-origin espresso, fresh artisanal bakery daily, and a quiet workspace for remote professionals.
                      </p>
                    </div>
                    <div className="pt-space-md mt-space-md flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                      <span className="text-label-sm text-secondary font-bold text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Verified Local
                      </span>
                      <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-space-md py-1.5 bg-surface-container-high text-on-surface rounded-xl text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">chat</span> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>

                {/* Biz Card 2 */}
                <div className="bg-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-slate-200 dark:border-slate-800">
                  <div
                    className="h-48 w-full bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80')`,
                    }}
                  >
                    <div className="absolute top-space-md right-space-md bg-surface/90 backdrop-blur-md px-space-sm py-1 rounded-full text-xs font-bold text-on-surface flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>4.8 (98 reviews)</span>
                    </div>
                  </div>
                  <div className="p-space-lg flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-space-xs mb-space-xs text-xs">
                        <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed font-bold rounded">
                          Auto Repair
                        </span>
                        <span className="text-outline">• Bangalore, Indiranagar</span>
                      </div>
                      <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                        Precision Apex Mechanics
                      </h3>
                      <p className="text-on-surface-variant text-body-sm text-xs line-clamp-2">
                        Honest diagnostics, transparent pricing, computerized tuning, and certified master technicians for all car models.
                      </p>
                    </div>
                    <div className="pt-space-md mt-space-md flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                      <span className="text-label-sm text-secondary font-bold text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Verified Local
                      </span>
                      <a
                        href="tel:+919876543211"
                        className="px-space-md py-1.5 bg-surface-container-high text-on-surface rounded-xl text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">call</span> Call Now
                      </a>
                    </div>
                  </div>
                </div>

                {/* Biz Card 3 */}
                <div className="bg-surface rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col border border-slate-200 dark:border-slate-800">
                  <div
                    className="h-48 w-full bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80')`,
                    }}
                  >
                    <div className="absolute top-space-md right-space-md bg-surface/90 backdrop-blur-md px-space-sm py-1 rounded-full text-xs font-bold text-on-surface flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>5.0 (215 reviews)</span>
                    </div>
                  </div>
                  <div className="p-space-lg flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center gap-space-xs mb-space-xs text-xs">
                        <span className="px-2 py-0.5 bg-primary-fixed text-on-primary-fixed font-bold rounded">
                          Fitness &amp; Yoga
                        </span>
                        <span className="text-outline">• Mumbai, Bandra</span>
                      </div>
                      <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                        Solstice Wellness Studio
                      </h3>
                      <p className="text-on-surface-variant text-body-sm text-xs line-clamp-2">
                        Daily restorative yoga flows, mindfulness meditation workshops, and community wellness designed for all levels.
                      </p>
                    </div>
                    <div className="pt-space-md mt-space-md flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                      <span className="text-label-sm text-secondary font-bold text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Verified Local
                      </span>
                      <a
                        href="https://wa.me/919876543212"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-space-md py-1.5 bg-surface-container-high text-on-surface rounded-xl text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">chat</span> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              3B. VERIFIED PROFESSIONALS: SKILLED TECHNICIANS & SPECIALISTS
             ======================================================== */}
          <section className="w-full py-space-xl px-gutter bg-surface">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-label-md text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-bold text-xs">
                      Skilled Technicians &amp; Specialists
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                    Hire Verified Technicians &amp; Specialists
                  </h2>
                  <p className="text-on-surface-variant text-body-sm text-xs sm:text-sm mt-1 max-w-2xl">
                    Connect directly with licensed electricians, AC service technicians, wedding photographers, caterers, and interior contractors.
                  </p>
                </div>
                <Link
                  href="/local-biz/professionals"
                  className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-colors flex items-center gap-1.5 shadow-sm shrink-0"
                >
                  <span className="material-symbols-outlined text-[16px]">badge</span>
                  <span>View All Professionals</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>

              {/* Grid of 4 Professional Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                {SEED_PROFESSIONALS.slice(0, 4).map((prof) => (
                  <div
                    key={prof.id}
                    className="bg-surface-container-low rounded-3xl p-5 flex flex-col justify-between border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-primary/40 transition-all duration-200"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <img
                          src={prof.avatar_url}
                          alt={prof.name}
                          className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20 shadow-sm"
                        />
                        <div className="flex flex-col items-end">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              star
                            </span>
                            {prof.rating} ({prof.reviews_count})
                          </span>
                          <span className="text-[11px] text-outline mt-1 font-medium">
                            {prof.experience_years}+ yrs exp
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          verified
                        </span>
                        <span>{prof.profession}</span>
                      </div>

                      <h3 className="font-headline-md font-bold text-base text-on-surface line-clamp-1 mb-0.5">
                        {prof.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-primary line-clamp-1 mb-2">
                        {prof.title}
                      </p>
                      <p className="text-body-sm text-on-surface-variant text-xs line-clamp-2 mb-3">
                        {prof.about}
                      </p>

                      <div className="text-[11px] text-outline flex items-center gap-1 mb-3">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        <span>{prof.area}, {prof.city_name}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
                      <div className="flex items-center justify-between text-xs font-bold text-on-surface">
                        <span className="text-outline text-[11px] font-medium">Consultation:</span>
                        <span className="text-emerald-600 dark:text-emerald-400">{prof.consultation_fee}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={`https://wa.me/${prof.whatsapp?.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-3 rounded-xl bg-secondary text-on-secondary font-bold text-[11px] hover:bg-on-secondary-container transition-colors flex items-center justify-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[14px]">chat</span>
                          <span>WhatsApp</span>
                        </a>
                        <Link
                          href={`/local-biz/professionals/${prof.slug}`}
                          className="py-2 px-3 rounded-xl bg-surface-container-high text-on-surface font-bold text-[11px] hover:bg-primary hover:text-on-primary transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Profile</span>
                          <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ========================================================
              4. TOP COMMUNITY GROUPS SECTION
             ======================================================== */}
          <section className="w-full py-space-xl px-gutter bg-surface-container-low">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
                <div>
                  <span className="text-label-md text-secondary uppercase tracking-wider font-bold text-xs">
                    JoinGroupLinks Directory
                  </span>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                    Top Active Community Groups
                  </h2>
                </div>
                <Link
                  href="/groups"
                  className="text-secondary font-bold text-xs hover:underline flex items-center gap-space-xs mt-space-sm md:mt-0"
                >
                  <span>Explore all group links</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>

              {/* Grid of Group Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                {/* Group 1: Arattai (Zoho) */}
                <div className="bg-surface rounded-3xl p-space-lg flex flex-col justify-between hover:bg-amber-500/10 transition-colors border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-md">
                        ZOHO
                      </div>
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-700 dark:text-amber-300 rounded-full text-xs font-bold">
                        Arattai (Zoho) 🇮🇳
                      </span>
                    </div>
                    <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                      Arattai Tamil Literature &amp; Readers
                    </h3>
                    <p className="text-on-surface-variant text-body-sm text-xs mb-space-md">
                      Connecting passionate Tamil book lovers, poetry discussions, regional author events, and literature swaps.
                    </p>
                    <div className="flex items-center gap-space-sm text-outline text-xs mb-space-md">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">group</span> 3,450 members
                      </span>
                      <span>•</span>
                      <span className="text-secondary font-bold">Active Now</span>
                    </div>
                  </div>
                  <a
                    href="https://arattai.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-secondary text-on-secondary rounded-xl text-center font-bold text-xs hover:bg-on-secondary-container transition-colors flex items-center justify-center gap-space-xs shadow-sm"
                  >
                    <span>Join Group</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>

                {/* Group 2: WhatsApp */}
                <div className="bg-surface rounded-3xl p-space-lg flex flex-col justify-between hover:bg-secondary-fixed/10 transition-colors border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <div className="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center font-headline-md">
                        <span className="material-symbols-outlined">chat</span>
                      </div>
                      <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-xs font-bold">
                        WhatsApp
                      </span>
                    </div>
                    <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                      Metro Area Foodies &amp; Diners
                    </h3>
                    <p className="text-on-surface-variant text-body-sm text-xs mb-space-md">
                      Discover hidden culinary gems, secret pop-up dinners, food truck locations, and get exclusive dining perks.
                    </p>
                    <div className="flex items-center gap-space-sm text-outline text-xs mb-space-md">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">group</span> 4,890 members
                      </span>
                      <span>•</span>
                      <span className="text-secondary font-bold">Active Now</span>
                    </div>
                  </div>
                  <a
                    href="https://chat.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-secondary text-on-secondary rounded-xl text-center font-bold text-xs hover:bg-on-secondary-container transition-colors flex items-center justify-center gap-space-xs shadow-sm"
                  >
                    <span>Join Group</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>

                {/* Group 3: Telegram */}
                <div className="bg-surface rounded-3xl p-space-lg flex flex-col justify-between hover:bg-primary-fixed/10 transition-colors border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <div className="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center font-headline-md">
                        <span className="material-symbols-outlined">code</span>
                      </div>
                      <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold">
                        Telegram
                      </span>
                    </div>
                    <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                      Global Python &amp; AI Engineers
                    </h3>
                    <p className="text-on-surface-variant text-body-sm text-xs mb-space-md">
                      A mastermind community sharing backend code snippets, AI models, freelance gigs, and tech architecture solutions.
                    </p>
                    <div className="flex items-center gap-space-sm text-outline text-xs mb-space-md">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">group</span> 12.4k members
                      </span>
                      <span>•</span>
                      <span className="text-secondary font-bold">Active Now</span>
                    </div>
                  </div>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-primary text-on-primary rounded-xl text-center font-bold text-xs hover:bg-primary-container transition-colors flex items-center justify-center gap-space-xs shadow-sm"
                  >
                    <span>Join Group</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>

                {/* Group 4: Instagram Broadcast */}
                <div className="bg-surface rounded-3xl p-space-lg flex flex-col justify-between hover:bg-pink-500/10 transition-colors border border-slate-200 dark:border-slate-800 shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white flex items-center justify-center font-headline-md shadow-md">
                        <span className="material-symbols-outlined">photo_camera</span>
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950 text-pink-600 dark:text-pink-300 rounded-full text-xs font-bold border border-pink-200 dark:border-pink-800">
                        Instagram
                      </span>
                    </div>
                    <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                      South India Home Services &amp; AC Guild
                    </h3>
                    <p className="text-on-surface-variant text-body-sm text-xs mb-space-md">
                      Official Instagram broadcast channel for licensed electricians, HVAC technicians, and home repair professionals.
                    </p>
                    <div className="flex items-center gap-space-sm text-outline text-xs mb-space-md">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">group</span> 84.5k members
                      </span>
                      <span>•</span>
                      <span className="text-secondary font-bold">Active Daily</span>
                    </div>
                  </div>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-bold rounded-xl text-center text-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-space-xs shadow-sm"
                  >
                    <span>Join Broadcast</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              5. VALUE PROPOSITION CARDS SECTION
             ======================================================== */}
          <section className="w-full py-space-xl px-gutter bg-surface-container-low">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-2xl mx-auto mb-space-xl">
                <span className="text-label-md text-primary uppercase tracking-wider font-bold text-xs">
                  Why Choose Us
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-1">
                  Built for Trust &amp; Community Engagement
                </h2>
                <p className="text-on-surface-variant text-body-md text-xs sm:text-sm mt-space-sm">
                  Whether you&apos;re scaling a local storefront or launching a passionate niche community, our platform delivers unmatched visibility.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {/* Prop 1 */}
                <div className="bg-surface rounded-3xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">verified_user</span>
                  </div>
                  <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                    Verified Listings
                  </h3>
                  <p className="text-on-surface-variant text-body-md text-xs leading-relaxed">
                    Every local business and group link undergoes rigorous manual review to prevent spam and ensure authentic user interactions.
                  </p>
                </div>

                {/* Prop 2 */}
                <div className="bg-surface rounded-3xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">bolt</span>
                  </div>
                  <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                    Instant Discovery
                  </h3>
                  <p className="text-on-surface-variant text-body-md text-xs leading-relaxed">
                    Advanced location filters and category tagging let users find precisely what they need in seconds, on mobile or desktop.
                  </p>
                </div>

                {/* Prop 3 */}
                <div className="bg-surface rounded-3xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center mb-space-md">
                    <span className="material-symbols-outlined text-[24px]">trending_up</span>
                  </div>
                  <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                    Grow Your Audience
                  </h3>
                  <p className="text-on-surface-variant text-body-md text-xs leading-relaxed">
                    Promote your services or group invitations to thousands of targeted local consumers and community members daily.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              6. CLEAR CALLS TO ACTION (DUAL BANNERS)
             ======================================================== */}
          <section className="w-full py-space-xl px-gutter bg-surface">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-space-lg">
              {/* CTA 1: Business Owners */}
              <div className="bg-primary text-on-primary rounded-3xl p-space-xl relative overflow-hidden flex flex-col justify-between shadow-xl">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-primary-container/40 blur-2xl pointer-events-none" />
                <div className="relative z-10 mb-space-xl">
                  <span className="px-3 py-1 bg-primary-container text-on-primary-container rounded-full text-xs font-bold inline-block mb-space-md">
                    For Business Owners
                  </span>
                  <h3 className="font-headline-lg text-2xl font-bold text-on-primary mb-space-sm">
                    List Your Local Business Today
                  </h3>
                  <p className="text-primary-fixed-dim text-xs sm:text-sm max-w-md">
                    Claim your profile, showcase working hours, customer reviews, and attract local walk-ins with our ₹99 launch offer.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-space-md flex-wrap">
                  <Link
                    href="/local-biz/add-business"
                    className="px-space-xl py-3 rounded-full bg-on-primary text-primary font-bold text-xs hover:bg-primary-fixed transition-colors shadow-md"
                  >
                    Add Your Business
                  </Link>
                  <a
                    href="https://forms.gle/FVQVofUVejQ2ebiA7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-on-primary hover:underline text-xs font-bold"
                  >
                    Direct Google Form (₹0) →
                  </a>
                </div>
              </div>

              {/* CTA 2: Community Organizers */}
              <div className="bg-secondary text-on-secondary rounded-3xl p-space-xl relative overflow-hidden flex flex-col justify-between shadow-xl">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none" />
                <div className="relative z-10 mb-space-xl">
                  <span className="px-3 py-1 bg-secondary-container text-on-secondary-fixed-variant rounded-full text-xs font-bold inline-block mb-space-md">
                    For Group Admins
                  </span>
                  <h3 className="font-headline-lg text-2xl font-bold text-on-secondary mb-space-sm">
                    Share Your Chat Group Links
                  </h3>
                  <p className="text-secondary-fixed-dim text-xs sm:text-sm max-w-md">
                    Submit your WhatsApp, Telegram, or Arattai community links to gain engaged, authentic members right away.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-space-md flex-wrap">
                  <a
                    href="https://forms.gle/oZzitWMZ8xtB9rmx5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-space-xl py-3 rounded-full bg-on-secondary text-secondary font-bold text-xs hover:bg-secondary-fixed transition-colors shadow-md inline-block"
                  >
                    Submit Group Link
                  </a>
                  <Link href="/groups" className="text-on-secondary hover:underline text-xs font-bold">
                    Explore Directory →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              7. WE SERVE THESE CITIES (300+ CITIES PRESERVED)
             ======================================================== */}
          <WeServeCitiesSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
