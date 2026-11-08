'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Product, Business } from '@/types/local-biz';
import { SEED_CITIES } from '@/lib/local-biz/seed-data';
import { JustdialHeroStrip } from '@/components/common/JustdialHeroStrip';
import { Sparkles } from 'lucide-react';
import { TypewriterText } from '@/components/common/TypewriterText';
import { STATES, UNION_TERRITORIES, getDistrictsForState } from '@/lib/india';

export default function B2BHomePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All India');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const isStateSelected = Boolean(selectedState && selectedState !== 'All India');
  const availableDistricts = useMemo(
    () => (isStateSelected ? getDistrictsForState(selectedState) : []),
    [isStateSelected, selectedState]
  );

  // Quick RFQ Form state
  const [rfqProduct, setRfqProduct] = useState('');
  const [rfqQuantity, setRfqQuantity] = useState('');
  const [rfqUnit, setRfqUnit] = useState('Pieces');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqCity, setRfqCity] = useState('Chennai');
  const [rfqSubmitting, setRfqSubmitting] = useState(false);
  const [rfqSuccess, setRfqSuccess] = useState(false);

  useEffect(() => {
    async function loadB2BData() {
      try {
        const pList = await LocalBizStore.getProducts();
        setProducts(pList);
      } catch (err) {
        console.error('Error loading B2B products:', err);
      } finally {
        setLoading(false);
      }
    }
    loadB2BData();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (selectedState && selectedState !== 'All India') params.set('state', selectedState);
    if (selectedDistrict) params.set('district', selectedDistrict);
    router.push(`/local-biz/products?${params.toString()}`);
  };

  const handleRfqSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqProduct.trim() || !rfqPhone.trim()) return;

    setRfqSubmitting(true);
    try {
      await LocalBizStore.createEnquiry({
        subject: `B2B Wholesale RFQ: ${rfqProduct} (${rfqQuantity} ${rfqUnit}) in ${rfqCity}`,
        message: `Bulk Requirement for ${rfqProduct}. Target Quantity: ${rfqQuantity} ${rfqUnit}. Buyer Phone: ${rfqPhone}, Delivery Location: ${rfqCity}.`,
        location: rfqCity,
        status: 'pending',
      });
      setRfqSuccess(true);
    } catch (err) {
      console.error('Failed to submit RFQ:', err);
      setRfqSuccess(true);
    } finally {
      setRfqSubmitting(false);
    }
  };

  const b2bCategories = [
    {
      id: 'cat-machinery',
      name: 'Industrial Machinery & CNC',
      sub: 'Lathes, Flanges, Automation',
      icon: 'precision_manufacturing',
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:border-indigo-800',
      count: '3,840 Suppliers',
    },
    {
      id: 'cat-packaging',
      name: 'Packaging & Cartons',
      sub: '5-Ply Corrugated, Films, Tapes',
      icon: 'package_2',
      color: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-800',
      count: '2,920 Suppliers',
    },
    {
      id: 'cat-electrical',
      name: 'Electricals & Switchgear',
      sub: 'LED 36W Panels, 63A MCB, Cable',
      icon: 'bolt',
      color: 'bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800',
      count: '4,150 Suppliers',
    },
    {
      id: 'cat-solar',
      name: 'Solar Energy & PV Panels',
      sub: 'Tier-1 540W Mono PERC, Inverters',
      icon: 'solar_power',
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-800',
      count: '1,890 Suppliers',
    },
    {
      id: 'cat-chemicals',
      name: 'Chemicals, Dyes & Solvents',
      sub: 'Industrial Polymers, Resins, Lab',
      icon: 'science',
      color: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-800',
      count: '2,340 Suppliers',
    },
    {
      id: 'cat-construction',
      name: 'Building & Ready-Mix (RMC)',
      sub: 'M25 Concrete, TMT Steel, Tiles',
      icon: 'foundation',
      color: 'bg-rose-500/10 text-rose-600 border-rose-200 dark:border-rose-800',
      count: '3,670 Suppliers',
    },
    {
      id: 'cat-textiles',
      name: 'Textiles, Yarns & Cotton',
      sub: '180 GSM Tees, Giza Cotton, Twill',
      icon: 'checkroom',
      color: 'bg-pink-500/10 text-pink-600 border-pink-200 dark:border-pink-800',
      count: '5,210 Suppliers',
    },
    {
      id: 'cat-agro',
      name: 'Agro Commodities & Rice',
      sub: 'Seeraga Samba Rice, Spices, Oils',
      icon: 'grain',
      color: 'bg-lime-500/10 text-lime-600 border-lime-200 dark:border-lime-800',
      count: '4,780 Suppliers',
    },
    {
      id: 'cat-commercial-kitchen',
      name: 'Commercial Kitchen & Bakery Equipment',
      sub: 'Ovens, Mixers, Stainless Steel Buffets',
      icon: 'bakery_dining',
      color: 'bg-teal-500/10 text-teal-600 border-teal-200 dark:border-teal-800',
      count: '1,560 Suppliers',
    },
    {
      id: 'cat-gems',
      name: 'Lab-Grown CVD Diamonds',
      sub: 'IGI Certified Round CVD, Jewelry',
      icon: 'diamond',
      color: 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-800',
      count: '820 Wholesalers',
    },
    {
      id: 'cat-furniture',
      name: 'Commercial Office Furniture',
      sub: 'Ergonomic Mesh Chairs, Desks',
      icon: 'chair',
      color: 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-800',
      count: '2,110 Suppliers',
    },
    {
      id: 'cat-freight',
      name: 'Freight & Fleet Logistics',
      sub: 'Full Truck Load, 5-Layer Packing',
      icon: 'local_shipping',
      color: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800',
      count: '1,940 Transporters',
    },
  ];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category_id === selectedCategory || p.name.toLowerCase().includes(selectedCategory));
  }, [products, selectedCategory]);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col justify-between">
      <Header />

      <main className="w-full bg-surface flex-grow">
        <div className="flex flex-col w-full">
          {/* ========================================================
              1. B2B WHOLESALE HERO WITH SEARCH & RFQ OVERLAY
             ======================================================== */}
          <section className="relative w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-16 lg:py-24 px-gutter overflow-hidden border-b border-slate-800">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span>🇮🇳 India&apos;s Direct B2B &amp; Factory Wholesale Gateway</span>
              </div>

              {/* Headline with Typewriter */}
              <h1 className="font-headline-xl text-3xl sm:text-5xl lg:text-6xl font-black text-white max-w-4xl tracking-tight leading-tight min-h-[3.2em] sm:min-h-[2.4em]">
                Source Directly from Verified{' '}
                <TypewriterText
                  words={[
                    'Manufacturers',
                    'Wholesalers',
                    'Industrial Suppliers',
                    'Machinery Fabricators',
                    'Direct Exporters',
                  ]}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400"
                  cursorClassName="text-emerald-400"
                />
              </h1>

              {/* Subhead */}
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                Connect with 50,000+ certified Indian suppliers for machinery, raw materials, packaging cartons, solar panels, and export textiles with zero middleman commission.
              </p>

              {/* AI Search Tip Banner */}
              <div className="w-full max-w-4xl mx-auto flex items-center justify-between gap-2 px-4 py-2 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-medium mb-3 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 shrink-0 animate-pulse" />
                  <span>
                    <strong>AI Search Tip:</strong> Enter <strong>Area Name, Pincode &amp; City</strong> to find wholesale manufacturers and direct suppliers faster in AI.
                  </span>
                </div>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Query-Based AI Engine
                </span>
              </div>

              {/* Prominent B2B Search Bar */}
              <form
                onSubmit={handleSearchSubmit}
                className="w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 p-2 sm:p-3 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-3"
              >
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 rounded-2xl w-full text-slate-900 dark:text-white shadow-inner">
                  <span className="material-symbols-outlined text-purple-500">search</span>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search machines, raw materials, area or pincode (e.g. Peenya 560058, Okhla 110020)..."
                    className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold placeholder-slate-400"
                  />
                </div>

                <div className="w-full md:w-52 flex items-center gap-2 px-3 py-3 bg-white dark:bg-slate-900 rounded-2xl text-slate-900 dark:text-white shadow-inner">
                  <span className="material-symbols-outlined text-blue-500 text-[18px]">location_on</span>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedDistrict('');
                    }}
                    aria-label="Select State or Union Territory"
                    className="w-full bg-transparent border-none outline-none text-xs font-semibold cursor-pointer truncate"
                  >
                    <option value="All India">All India</option>
                    <optgroup label="States (28)">
                      {STATES.map((s) => (
                        <option key={s.name} value={s.name} className="text-slate-900">
                          {s.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Union Territories (8)">
                      {UNION_TERRITORIES.map((ut) => (
                        <option key={ut.name} value={ut.name} className="text-slate-900">
                          {ut.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="w-full md:w-48 flex items-center gap-2 px-3 py-3 bg-white dark:bg-slate-900 rounded-2xl text-slate-900 dark:text-white shadow-inner">
                  <span className="material-symbols-outlined text-emerald-500 text-[18px]">near_me</span>
                  <select
                    disabled={!isStateSelected}
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    aria-label="Select District"
                    className={`w-full bg-transparent border-none outline-none text-xs font-semibold truncate ${
                      isStateSelected ? 'cursor-pointer' : 'text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {!isStateSelected ? (
                      <option value="">Select state first</option>
                    ) : (
                      <>
                        <option value="">All districts in {selectedState}</option>
                        {availableDistricts.map((d) => (
                          <option key={d} value={d} className="text-slate-900">
                            {d}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">search</span>
                  <span>Search Wholesale</span>
                </button>
              </form>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-300">
                <span className="flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">verified</span>
                  <span>100% GST &amp; BIS Verified Factories</span>
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-blue-400">price_check</span>
                  <span>Zero Commission (0%) Direct Contacts</span>
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-amber-400">chat</span>
                  <span>Instant WhatsApp Price Quotations</span>
                </span>
              </div>
            </div>
          </section>

          {/* ========================================================
              2. POST BUY REQUIREMENT (RFQ) QUICK BANNER (INDIAMART INSPIRED)
             ======================================================== */}
          <section id="rfq-section" className="w-full max-w-7xl mx-auto px-gutter -mt-8 relative z-20">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-4 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold">
                    <span className="material-symbols-outlined text-[16px]">request_quote</span>
                    <span>Post Requirement (RFQ)</span>
                  </div>
                  <h3 className="font-headline-md text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    Need Custom Bulk Quotations?
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    Tell us what you need. Receive instant competitive rate quotes from verified Indian manufacturers and authorized wholesalers in 15 minutes.
                  </p>
                </div>

                <div className="lg:col-span-8">
                  {rfqSuccess ? (
                    <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                      <span className="material-symbols-outlined text-3xl text-emerald-600">check_circle</span>
                      <h4 className="font-bold text-sm text-emerald-800 dark:text-emerald-300">
                        Quotation Request Broadcasted!
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Verified suppliers in {rfqCity} have received your RFQ for &quot;{rfqProduct}&quot;. Expect calls and WhatsApp quotes shortly.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setRfqSuccess(false);
                          setRfqProduct('');
                        }}
                        className="text-xs text-blue-600 font-bold underline cursor-pointer pt-2"
                      >
                        Post another requirement
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRfqSubmit} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            required
                            value={rfqProduct}
                            onChange={(e) => setRfqProduct(e.target.value)}
                            placeholder="Enter product or raw material needed (e.g. 500W Solar Modules, CNC Flanges)..."
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="number"
                            required
                            min="1"
                            value={rfqQuantity}
                            onChange={(e) => setRfqQuantity(e.target.value)}
                            placeholder="Qty (e.g. 50)"
                            className="w-1/2 px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <select
                            value={rfqUnit}
                            onChange={(e) => setRfqUnit(e.target.value)}
                            className="w-1/2 px-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                          >
                            <option value="Pieces">Pieces</option>
                            <option value="Units">Units</option>
                            <option value="Kg">Kg</option>
                            <option value="Tons">Tons</option>
                            <option value="Boxes">Boxes</option>
                            <option value="Meters">Meters</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <input
                            type="tel"
                            required
                            value={rfqPhone}
                            onChange={(e) => setRfqPhone(e.target.value)}
                            placeholder="Mobile / WhatsApp No."
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <input
                            type="text"
                            required
                            value={rfqCity}
                            onChange={(e) => setRfqCity(e.target.value)}
                            placeholder="Delivery City (e.g. Chennai)"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs font-medium border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>

                        <div>
                          <button
                            type="submit"
                            disabled={rfqSubmitting}
                            className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer disabled:opacity-50"
                          >
                            <span className="material-symbols-outlined text-[16px]">send</span>
                            <span>{rfqSubmitting ? 'Posting RFQ...' : 'Get Instant Quotes'}</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================
              3. JUSTDIAL HERO STRIP & CATEGORY TILES
             ======================================================== */}
          <section className="w-full max-w-7xl mx-auto px-gutter py-8">
            <JustdialHeroStrip variant="b2b" />
          </section>

          {/* ========================================================
              4. B2B CATEGORIES GRID (JUSTDIAL & INDIAMART STYLE)
             ======================================================== */}
          <section className="w-full max-w-7xl mx-auto px-gutter py-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
              <div>
                <p className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 text-xs mb-1">
                  Explore by Industry Sector
                </p>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                  Core B2B Manufacturing &amp; Wholesale Categories
                </h2>
              </div>
              <Link
                href="/local-biz/products"
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <span>View all product categories</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-space-md">
              {b2bCategories.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    const el = document.getElementById('b2b-products-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group flex flex-col items-center text-center p-space-md rounded-2xl bg-surface-container-low hover:bg-blue-600 hover:text-white transition-all duration-300 border border-slate-200 dark:border-slate-800 shadow-sm cursor-pointer"
                >
                  <div className={`w-13 h-13 rounded-2xl ${cat.color} group-hover:bg-white/20 group-hover:text-white transition-colors flex items-center justify-center mb-space-sm shadow-sm border`}>
                    <span className="material-symbols-outlined text-[26px]">{cat.icon}</span>
                  </div>
                  <h3 className="text-xs font-bold text-on-surface group-hover:text-white transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-outline group-hover:text-blue-100 transition-colors mt-0.5 line-clamp-1">
                    {cat.sub}
                  </span>
                  <span className="text-[9px] font-extrabold text-blue-600 dark:text-blue-400 group-hover:text-amber-300 transition-colors mt-1">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================
              4. B2B TRENDING PRODUCT CATALOG WITH DIRECT QUOTE
             ======================================================== */}
          <section id="b2b-products-section" className="w-full max-w-7xl mx-auto px-gutter py-space-xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <p className="font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 text-xs">
                    Factory Floor Products
                  </p>
                </div>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                  Trending Wholesale Products &amp; Factory Supplies
                </h2>
                <p className="text-body-sm text-on-surface-variant text-xs sm:text-sm mt-1 max-w-2xl">
                  Compare minimum order quantities, review verified manufacturer details, and click &quot;Get Best Price&quot; for instant factory rates.
                </p>
              </div>

              {selectedCategory !== 'all' && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Reset Filter</span>
                  <span className="material-symbols-outlined text-[14px]">close</span>
                </button>
              )}
            </div>

            {loading ? (
              <div className="py-12 text-center text-xs text-slate-400">
                Loading B2B products catalog...
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
                {filteredProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-surface-container-lowest rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
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

                      <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                        <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          verified
                        </span>
                        <span>Verified Indian Manufacturer</span>
                      </div>

                      <h3 className="font-headline-md font-bold text-sm text-on-surface line-clamp-1 mb-1">
                        {prod.name}
                      </h3>
                      <p className="text-body-sm text-on-surface-variant text-xs line-clamp-2 mb-3">
                        {prod.description}
                      </p>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low text-[11px] text-on-surface-variant font-semibold mb-4">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px] text-outline">inventory_2</span>
                          <span>Min Order (MOQ):</span>
                        </span>
                        <span className="font-bold text-primary">
                          {prod.min_order_quantity} {prod.unit}
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center gap-2">
                      <a
                        href={`https://wa.me/919876543210?text=Hello,%20I%20am%20interested%20in%20"${encodeURIComponent(
                          prod.name
                        )}"%20listed%20on%20B2B%20Nammabus.%20Please%20share%20bulk%20factory%20price%20quote.`}
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
                        title="Submit Custom RFQ"
                      >
                        <span className="material-symbols-outlined text-[16px]">request_quote</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ========================================================
              5. B2B SOURCING OPTIONS & WHOLESALE ASSURANCE
             ======================================================== */}
          <section className="w-full bg-surface-container-low py-space-xl border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">verified_user</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface">100% Verified Factories</h4>
                <p className="text-xs text-outline leading-relaxed">
                  Every supplier on Nammabus B2B undergoes business registration and GSTIN validation.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">savings</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface">Zero Broker Commission</h4>
                <p className="text-xs text-outline leading-relaxed">
                  Deal directly with factory owners and wholesalers. Zero markup, zero transaction commissions.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">speed</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface">15-Min Quote Turnaround</h4>
                <p className="text-xs text-outline leading-relaxed">
                  Submit an RFQ and receive multiple competitive price bids delivered directly to your WhatsApp.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-surface border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">local_shipping</span>
                </div>
                <h4 className="font-bold text-sm text-on-surface">Pan-India Freight Logistics</h4>
                <p className="text-xs text-outline leading-relaxed">
                  Integrated transport networks providing containerized and full-truckload transit across all 28 states.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
