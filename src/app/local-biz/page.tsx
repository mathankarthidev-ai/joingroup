'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Business, Category, City, Product } from '@/types/local-biz';
import { SEED_CATEGORIES, SEED_CITIES, SEED_PROFESSIONALS } from '@/lib/local-biz/seed-data';
import { GrowBusinessSection } from '@/components/local-biz/GrowBusinessSection';
import { JustdialHeroStrip } from '@/components/common/JustdialHeroStrip';
import { TypewriterText } from '@/components/common/TypewriterText';

export default function LocalBizHomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [bList, pList] = await Promise.all([
          LocalBizStore.getBusinesses({ limit: 6, is_active: true }),
          LocalBizStore.getProducts(),
        ]);
        setBusinesses(bList);
        setProducts(pList.slice(0, 6));
      } catch (err) {
        console.error('Error loading Nammabus home data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (selectedCity) params.set('city', selectedCity);
    router.push(`/local-biz/businesses?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col justify-between">
      <Header />

      <main className="w-full bg-surface flex-grow">
        <div className="flex flex-col w-full">
          {/* ========================================================
              1. IMMERSIVE HERO WITH SEARCH
             ======================================================== */}
          <section className="relative w-full bg-surface-container-low py-16 lg:py-24 px-gutter overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -mb-20 pointer-events-none" />

            <div className="max-w-5xl mx-auto flex flex-col items-center text-center relative z-10">
              <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-high text-on-surface-variant text-label-md mb-space-md text-xs shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                <span>Nammabus • India&apos;s Trusted Business Directory &amp; B2B Hub</span>
              </div>

              <h1 className="font-headline-xl text-3xl sm:text-5xl font-black text-on-surface mb-space-md max-w-4xl leading-tight min-h-[3.2em] sm:min-h-[2.4em]">
                Discover &amp; Hire Verified{' '}
                <TypewriterText
                  words={[
                    'Electricians & Plumbers',
                    'Wedding Photographers',
                    'AC & Appliance Techs',
                    'Boutiques & Tailors',
                    'Home Bakers & Caterers',
                    'Packers & Movers',
                    'Building Contractors',
                    'PGs & Rental Stays',
                  ]}
                  className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 dark:from-blue-400 dark:via-indigo-400 dark:to-emerald-400 bg-clip-text text-transparent"
                />
              </h1>

              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant mb-space-xl max-w-2xl">
                Connect instantly with reliable home technicians, event photographers, bridal tailors, packers &amp; movers, wholesale suppliers, and neighborhood merchants near you.
              </p>

              {/* Prominent Search Bar Component */}
              <form
                onSubmit={handleSearchSubmit}
                className="w-full bg-surface shadow-2xl rounded-3xl p-2 md:p-3 flex flex-col md:flex-row gap-space-sm items-center border border-slate-200 dark:border-slate-800"
              >
                <div className="flex-1 flex items-center gap-space-sm px-space-md py-space-sm w-full md:w-auto bg-surface-container-low rounded-2xl">
                  <span className="material-symbols-outlined text-outline">search</span>
                  <input
                    className="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-outline text-sm font-medium"
                    placeholder="Business name, product, service or category..."
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="w-full md:w-auto h-12 md:h-auto border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 my-auto" />

                <div className="flex-1 flex items-center gap-space-sm px-space-md py-space-sm w-full md:w-auto bg-surface-container-low rounded-2xl">
                  <span className="material-symbols-outlined text-outline">location_on</span>
                  <input
                    className="w-full bg-transparent border-none outline-none text-on-surface placeholder:text-outline text-sm font-medium"
                    placeholder="City (e.g. Chennai, Bangalore, Mumbai)"
                    type="text"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-space-xl py-space-md rounded-2xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center justify-center gap-space-sm cursor-pointer shadow-md"
                >
                  <span>Search</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </form>
            </div>
          </section>

          {/* ========================================================
              2. JUSTDIAL HERO STRIP & CATEGORY GRID
             ======================================================== */}
          <section className="w-full max-w-7xl mx-auto px-gutter py-space-xl">
            <JustdialHeroStrip variant="local-biz" />
          </section>

          {/* ========================================================
              3. FEATURED BUSINESSES LIST SECTION
             ======================================================== */}
          <section className="w-full max-w-7xl mx-auto px-gutter py-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
              <div>
                <p className="font-bold uppercase tracking-wider text-primary text-xs mb-space-xs">
                  Top Rated In Your Area
                </p>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                  Featured Nammabus Businesses
                </h2>
              </div>
              <div className="flex items-center gap-space-sm">
                <Link
                  href="/local-biz/businesses"
                  className="px-space-md py-space-sm rounded-full bg-surface-container-high text-on-surface text-xs font-bold hover:bg-primary hover:text-on-primary transition-colors"
                >
                  All Categories
                </Link>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {/* Card 1: Apex Auto Repair */}
              <div className="w-full bg-surface-container-lowest rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
                <div
                  className="relative w-full h-52 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80')`,
                  }}
                >
                  <div className="absolute top-space-md left-space-md bg-secondary text-on-secondary px-space-md py-space-xs rounded-full text-xs font-bold flex items-center gap-space-xs shadow-md">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    Verified Pro
                  </div>
                  <div className="absolute top-space-md right-space-md bg-surface/90 backdrop-blur-md px-space-md py-space-xs rounded-full text-xs font-bold text-on-surface flex items-center gap-space-xs shadow-md">
                    <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>4.9 (128)</span>
                  </div>
                </div>
                <div className="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-xs">
                      <span className="text-xs text-primary uppercase tracking-wider font-bold">Mechanics &amp; Auto</span>
                      <span className="inline-flex items-center gap-space-xs text-secondary text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Open Until 7:00 PM
                      </span>
                    </div>
                    <h3 className="font-headline-md font-bold text-lg text-on-surface mb-space-xs">
                      Apex Auto Repair &amp; Tuning
                    </h3>
                    <p className="text-body-sm text-on-surface-variant text-xs mb-space-md flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-outline text-[16px]">location_on</span>
                      <span>142 Industrial Area, Chennai Central</span>
                    </p>
                    <p className="text-body-sm text-on-surface-variant text-xs line-clamp-2 mb-space-lg">
                      Full-service auto repair, computerized diagnostics, routine maintenance, and specialist tuning with certified master technicians.
                    </p>
                  </div>
                  <div className="pt-space-md border-t border-slate-100 dark:border-slate-800 flex items-center gap-space-sm">
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors text-xs font-bold flex items-center justify-center gap-space-xs shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="tel:+919876543210"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors text-xs font-bold flex items-center justify-center gap-space-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 2: Elegance Couture & Tailors */}
              <div className="w-full bg-surface-container-lowest rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
                <div
                  className="relative w-full h-52 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=600&q=80')`,
                  }}
                >
                  <div className="absolute top-space-md left-space-md bg-secondary text-on-secondary px-space-md py-space-xs rounded-full text-xs font-bold flex items-center gap-space-xs shadow-md">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    Verified Pro
                  </div>
                  <div className="absolute top-space-md right-space-md bg-surface/90 backdrop-blur-md px-space-md py-space-xs rounded-full text-xs font-bold text-on-surface flex items-center gap-space-xs shadow-md">
                    <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>4.8 (94)</span>
                  </div>
                </div>
                <div className="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-xs">
                      <span className="text-xs text-primary uppercase tracking-wider font-bold">Tailors &amp; Boutique</span>
                      <span className="inline-flex items-center gap-space-xs text-secondary text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Open Until 6:30 PM
                      </span>
                    </div>
                    <h3 className="font-headline-md font-bold text-lg text-on-surface mb-space-xs">
                      Elegance Custom Tailoring
                    </h3>
                    <p className="text-body-sm text-on-surface-variant text-xs mb-space-md flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-outline text-[16px]">location_on</span>
                      <span>88 Grand Avenue, Bangalore Metro</span>
                    </p>
                    <p className="text-body-sm text-on-surface-variant text-xs line-clamp-2 mb-space-lg">
                      Bespoke suits, precise alterations, bridal wear design, and premium fabric selection crafted with meticulous attention to detail.
                    </p>
                  </div>
                  <div className="pt-space-md border-t border-slate-100 dark:border-slate-800 flex items-center gap-space-sm">
                    <a
                      href="https://wa.me/919876543211"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors text-xs font-bold flex items-center justify-center gap-space-xs shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="tel:+919876543211"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors text-xs font-bold flex items-center justify-center gap-space-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Card 3: FreshMarket Organic Groceries */}
              <div className="w-full bg-surface-container-lowest rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-slate-200 dark:border-slate-800">
                <div
                  className="relative w-full h-52 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80')`,
                  }}
                >
                  <div className="absolute top-space-md left-space-md bg-secondary text-on-secondary px-space-md py-space-xs rounded-full text-xs font-bold flex items-center gap-space-xs shadow-md">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    Verified Pro
                  </div>
                  <div className="absolute top-space-md right-space-md bg-surface/90 backdrop-blur-md px-space-md py-space-xs rounded-full text-xs font-bold text-on-surface flex items-center gap-space-xs shadow-md">
                    <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                      star
                    </span>
                    <span>5.0 (210)</span>
                  </div>
                </div>
                <div className="p-space-lg flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-xs">
                      <span className="text-xs text-primary uppercase tracking-wider font-bold">Grocery &amp; Market</span>
                      <span className="inline-flex items-center gap-space-xs text-secondary text-xs font-bold">
                        <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> Open Until 9:00 PM
                      </span>
                    </div>
                    <h3 className="font-headline-md font-bold text-lg text-on-surface mb-space-xs">
                      FreshMarket Neighborhood Hub
                    </h3>
                    <p className="text-body-sm text-on-surface-variant text-xs mb-space-md flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-outline text-[16px]">location_on</span>
                      <span>504 Elmwood Street, Mumbai Bandra</span>
                    </p>
                    <p className="text-body-sm text-on-surface-variant text-xs line-clamp-2 mb-space-lg">
                      Locally sourced organic produce, artisanal bakery items, farm-fresh dairy, and daily household essentials with doorstep delivery.
                    </p>
                  </div>
                  <div className="pt-space-md border-t border-slate-100 dark:border-slate-800 flex items-center gap-space-sm">
                    <a
                      href="https://wa.me/919876543212"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-secondary text-on-secondary hover:bg-on-secondary-container transition-colors text-xs font-bold flex items-center justify-center gap-space-xs shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span>
                      <span>WhatsApp</span>
                    </a>
                    <a
                      href="tel:+919876543212"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container transition-colors text-xs font-bold flex items-center justify-center gap-space-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span>
                      <span>Call Now</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              3B. TRENDING B2B & WHOLESALE PRODUCTS (INDIAMART INSPIRED)
             ======================================================== */}
          {products.length > 0 && (
            <section className="w-full max-w-7xl mx-auto px-gutter py-space-xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    <p className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 text-xs">
                      Factory Direct &amp; Bulk Deals
                    </p>
                  </div>
                  <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                    Trending Products on Nammabus
                  </h2>
                  <p className="text-body-sm text-on-surface-variant text-xs sm:text-sm mt-1 max-w-2xl">
                    Connect directly with verified Indian manufacturers and distributors. Compare bulk quotes with zero broker commission.
                  </p>
                </div>
                <Link
                  href="/local-biz/products"
                  className="px-4 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <span>View All Products</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-surface-container-lowest rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-3xl shadow-sm border border-slate-200/60 dark:border-slate-800">
                          {prod.image_url}
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-base font-black text-primary">
                            {prod.price ? `₹${prod.price.toLocaleString('en-IN')}` : 'Best Price'}
                          </span>
                          <span className="text-[11px] text-outline font-medium">
                            per {prod.unit}
                          </span>
                        </div>
                      </div>

                      <h3 className="font-headline-md font-bold text-sm text-on-surface line-clamp-1 mb-1">
                        {prod.name}
                      </h3>
                      <p className="text-body-sm text-on-surface-variant text-xs line-clamp-2 mb-3">
                        {prod.description}
                      </p>

                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-surface-container-low text-[11px] text-on-surface-variant font-semibold mb-4">
                        <span className="material-symbols-outlined text-[14px] text-outline">inventory_2</span>
                        <span>Min Order: {prod.min_order_quantity} {prod.unit}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                      <a
                        href={`https://wa.me/919876543210?text=Hello,%20I%20am%20interested%20in%20"${encodeURIComponent(
                          prod.name
                        )}"%20listed%20on%20Nammabus.%20Please%20share%20bulk%20price%20quote.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[16px]">price_check</span>
                        <span>Get Best Price</span>
                      </a>
                      <Link
                        href="/local-biz/enquiry"
                        className="py-2 px-3 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container transition-colors"
                        title="Request Custom Quotation"
                      >
                        <span className="material-symbols-outlined text-[16px]">request_quote</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ========================================================
              3C. VERIFIED PROFESSIONALS: SKILLED TECHNICIANS & SPECIALISTS
             ======================================================== */}
          <section className="w-full max-w-7xl mx-auto px-gutter py-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 text-xs">
                    Skilled Technicians &amp; Local Specialists
                  </p>
                </div>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                  Hire Verified Technicians &amp; Specialists
                </h2>
                <p className="text-body-sm text-on-surface-variant text-xs sm:text-sm mt-1 max-w-2xl">
                  Connect directly with licensed electricians, AC service techs, wedding photographers, caterers, and interior contractors with zero middleman fees.
                </p>
              </div>
              <Link
                href="/local-biz/professionals"
                className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]">badge</span>
                <span>Browse All Professionals</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {SEED_PROFESSIONALS.slice(0, 4).map((prof) => (
                <div
                  key={prof.id}
                  className="bg-surface-container-lowest rounded-3xl p-5 flex flex-col justify-between border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all"
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
                          {prof.rating}
                        </span>
                        <span className="text-[10px] text-outline mt-1 font-semibold">
                          {prof.experience_years}+ Yrs Exp
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
                      {prof.qualification}
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
                      <span className="text-outline text-[11px] font-medium">Fee:</span>
                      <span className="text-emerald-600 dark:text-emerald-400">{prof.consultation_fee}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={`https://wa.me/${prof.whatsapp?.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-secondary text-on-secondary font-bold text-[11px] hover:bg-on-secondary-container transition-colors flex items-center justify-center gap-1 shadow-sm"
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
          </section>

          {/* ========================================================
              4. GROW YOUR BUSINESS, REQUIREMENT POSTING, SUCCESS STORIES & FAQS (JUSTDIAL & INDIAMART SUITE)
             ======================================================== */}
          <GrowBusinessSection />

          {/* ========================================================
              5. TRUST & STATS FOOTER BANNER
             ======================================================== */}
          <section className="w-full bg-surface-container-low py-space-xl border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-gutter grid grid-cols-2 md:grid-cols-4 gap-space-xl text-center">
              <div>
                <h3 className="font-headline-xl text-2xl sm:text-3xl font-black text-primary mb-space-xs">10,000+</h3>
                <p className="font-body-sm text-on-surface-variant text-xs">Verified Local Businesses</p>
              </div>
              <div>
                <h3 className="font-headline-xl text-2xl sm:text-3xl font-black text-primary mb-space-xs">50,000+</h3>
                <p className="font-body-sm text-on-surface-variant text-xs">Monthly Customer Searches</p>
              </div>
              <div>
                <h3 className="font-headline-xl text-2xl sm:text-3xl font-black text-primary mb-space-xs">25,000+</h3>
                <p className="font-body-sm text-on-surface-variant text-xs">Active Community Groups</p>
              </div>
              <div>
                <h3 className="font-headline-xl text-2xl sm:text-3xl font-black text-primary mb-space-xs">99.8%</h3>
                <p className="font-body-sm text-on-surface-variant text-xs">Buyer Satisfaction Rate</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
