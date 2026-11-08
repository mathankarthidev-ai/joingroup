'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LocalBizStore } from '@/lib/local-biz/store';

export const GrowBusinessSection: React.FC = () => {
  // 1. Phone Lead Capture State
  const [leadPhone, setLeadPhone] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // 2. Quick Post Requirement State (IndiaMART inspired)
  const [reqCategory, setReqCategory] = useState('Home Repairs & Electricians');
  const [reqDetails, setReqDetails] = useState('');
  const [reqPhone, setReqPhone] = useState('');
  const [reqCity, setReqCity] = useState('Chennai');
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);

  // 3. FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadPhone || leadPhone.length < 10) return;
    setLeadSubmitted(true);
  };

  const handleRequirementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqDetails.trim() || !reqPhone.trim()) return;

    setReqSubmitting(true);
    try {
      await LocalBizStore.createEnquiry({
        subject: `Requirement for ${reqCategory} in ${reqCity}`,
        message: `${reqDetails} (Contact Mobile: ${reqPhone}, City: ${reqCity})`,
        location: reqCity,
        status: 'pending',
      });
      setReqSuccess(true);
    } catch (err) {
      console.error('Failed to post requirement:', err);
      setReqSuccess(true);
    } finally {
      setReqSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'What benefits will I get with the ₹99 Launch Offer?',
      a: 'You get a Verified Pro seal, direct WhatsApp chat button, click-to-call phone linking, online product & service catalogue (up to 5 products and 3 services), zero commissions on inquiries, and priority ranking in your city directory for 6 full months.',
    },
    {
      q: 'How does the Verified Pro badge work?',
      a: 'Our local moderation desk authenticates your business registration, phone number, and physical store or office address. Once verified, the green Verified Pro shield is displayed, increasing customer contact rates by over 45%.',
    },
    {
      q: 'Do you charge any commission on customer bookings or sales?',
      a: 'Zero percent (0%). Unlike Justdial or IndiaMART which often charge per-lead fees or take sales cuts, all customer calls and WhatsApp inquiries come directly to your personal phone. We never take a commission.',
    },
    {
      q: 'Can I list both my local business and my WhatsApp/Arattai group?',
      a: 'Yes! If you are a business owner or professional who also runs an active customer community or broadcast channel, you can link your community directly on your business profile page at no extra charge.',
    },
    {
      q: 'Can I receive leads and buyer inquiries only from my city?',
      a: 'Yes. Your listing is geotagged to your specific city and locality (e.g. Chennai - T. Nagar, Bangalore - Koramangala). You can also set a broader district or statewide radius in your owner dashboard.',
    },
  ];

  return (
    <div className="w-full space-y-space-xl">
      {/* ========================================================
          1. GROW YOUR BUSINESS HERO (JUSTDIAL INSPIRED)
         ======================================================== */}
      <section className="w-full max-w-7xl mx-auto px-gutter">
        <div className="relative w-full bg-gradient-to-br from-primary via-[#002f73] to-[#001d4a] text-white rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl border border-blue-900/40">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-container/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Get Assured Verified Leads Every Month</span>
              </div>

              <h2 className="font-headline-xl text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                GROW <span className="text-secondary-fixed">Your Business</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-xl">
                Connect with 10,000+ monthly local shoppers and high-intent clients looking for electricians, plumbers, wedding photographers, caterers, auto mechanics, tailors, and certified local technicians.
              </p>

              {/* 1-Step Lead Form */}
              {leadSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-3 animate-fade-in">
                  <span className="material-symbols-outlined text-emerald-400 text-[24px]">check_circle</span>
                  <div>
                    <strong className="block text-white font-bold">Offer Reserved!</strong>
                    Our local onboarding specialist will connect with you on WhatsApp within 15 minutes.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleLeadSubmit} className="flex flex-col sm:flex-row items-center gap-3 pt-2 max-w-lg">
                  <div className="relative w-full flex-1">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 text-xs font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="Enter WhatsApp / Mobile Number"
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-secondary hover:bg-secondary-container text-on-secondary hover:text-on-secondary-container font-extrabold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>Get Started</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </form>
              )}

              {/* 3 Core Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">verified</span>
                  <span>100% Genuine Leads</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">chat</span>
                  <span>Direct WhatsApp Inquiries</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">percent</span>
                  <span>0% Commission (Direct Pay)</span>
                </div>
              </div>
            </div>

            {/* Right Card / Promo Highlight */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-extrabold text-amber-300">
                  ⚡ 6-Month Chai Launch Offer
                </span>
                <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                  SAVE 98%
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white">₹99</span>
                <span className="text-xs text-slate-300 font-medium">for 6 months (Code: BIZ99)</span>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed">
                Just <strong>₹16.50 / month</strong> — Less than a single cup of chai to establish your verified digital storefront, capture leads, and rank on top!
              </p>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-200">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check</span>
                  <span>Verified Pro Shield Badge</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check</span>
                  <span>1-Click Direct WhatsApp Connect</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check</span>
                  <span>Display 5 Products &amp; 3 Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[16px]">check</span>
                  <span>Priority Placement in 300+ Indian Cities</span>
                </div>
              </div>

              <Link
                href="/pricing"
                className="w-full block py-3 rounded-2xl bg-white hover:bg-slate-100 text-primary font-black text-xs text-center transition-colors shadow-md mt-4"
              >
                Claim ₹99 Offer Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. POST REQUIREMENT & GET QUOTES (INDIAMART INSPIRED)
         ======================================================== */}
      <section className="w-full max-w-7xl mx-auto px-gutter">
        <div className="bg-surface-container-low rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
                <span>Fast Lead Matching Service</span>
              </div>
              <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                Tell Us What You Need &amp; Get Instant Quotations
              </h2>
              <p className="text-body-sm text-on-surface-variant text-xs sm:text-sm mt-1 max-w-2xl">
                Looking for an electrician, AC repair tech, wedding photographer, caterer, auto mechanic, or bulk supplier? Post your requirement in 30 seconds and receive direct quotes from top-rated verified local specialists.
              </p>
            </div>
            <Link
              href="/local-biz/enquiry"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Detailed Requirement Form</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          {reqSuccess ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3 animate-fade-in max-w-xl mx-auto">
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <span className="material-symbols-outlined text-[24px]">done_all</span>
              </div>
              <h3 className="font-headline-md font-bold text-lg text-on-surface">
                Requirement Broadcasted Successfully!
              </h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Your requirement for <strong>{reqCategory}</strong> in <strong>{reqCity}</strong> has been shared with 4 verified providers. You will receive WhatsApp quotes shortly on <strong>+91 {reqPhone}</strong>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setReqSuccess(false);
                  setReqDetails('');
                  setReqPhone('');
                }}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer"
              >
                Post Another Requirement
              </button>
            </div>
          ) : (
            <form onSubmit={handleRequirementSubmit} className="space-y-4">
              {/* Category selector pills */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-on-surface">Quick Select:</span>
                {[
                  'Home Repairs & Electricians',
                  'AC Service & Techs',
                  'Wedding Photographers',
                  'Catering & Home Bakers',
                  'Architects & Interiors',
                  'Auto Repair & Mechanics',
                  'Tailoring & Boutiques',
                  'Wholesale Goods',
                ].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setReqCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      reqCategory === cat
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Requirement inputs */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-6 relative">
                  <input
                    type="text"
                    required
                    value={reqDetails}
                    onChange={(e) => setReqDetails(e.target.value)}
                    placeholder="Describe what you need (e.g. Need cardiologist consultation for chest pain in Chennai)"
                    className="w-full px-4 py-3 rounded-2xl bg-surface text-on-surface placeholder:text-outline text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-3 relative">
                  <input
                    type="tel"
                    required
                    value={reqPhone}
                    onChange={(e) => setReqPhone(e.target.value)}
                    placeholder="Your WhatsApp Number"
                    className="w-full px-4 py-3 rounded-2xl bg-surface text-on-surface placeholder:text-outline text-xs sm:text-sm font-medium border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={reqSubmitting}
                    className="w-full h-full min-h-[44px] py-3 px-6 rounded-2xl bg-secondary hover:bg-on-secondary-container text-on-secondary font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                    <span>{reqSubmitting ? 'Submitting...' : 'Get Instant Quotes'}</span>
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ========================================================
          3. REAL ADVERTISER SUCCESS STORIES (JUSTDIAL INSPIRED)
         ======================================================== */}
      <section className="w-full max-w-7xl mx-auto px-gutter">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-secondary uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">format_quote</span>
              <span>Advertiser Testimonials</span>
            </div>
            <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
              Trusted By 10,000+ Indian Businesses &amp; Professionals
            </h2>
            <p className="text-body-sm text-on-surface-variant text-xs sm:text-sm mt-1 max-w-2xl">
              See how verified technicians, wedding photographers, caterers, and local store owners expand their customer base and capture genuine local bookings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Story 1: AC Specialist */}
          <div className="bg-surface rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"
                  alt="K. Ramanathan"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-sm text-on-surface">K. Ramanathan</h4>
                  <span className="text-[11px] text-primary font-semibold block">HVAC &amp; AC Specialist · Chennai</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★★★★★'}
                <span className="text-outline text-[11px] ml-1">Verified Member</span>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed italic">
                &ldquo;The Verified Pro badge and direct WhatsApp consultation button brought 80+ AC service and repair bookings in our peak summer month without commission cuts.&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-4 text-[11px] text-secondary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span>+65% Direct Bookings</span>
            </div>
          </div>

          {/* Story 2: Wedding Photographer */}
          <div className="bg-surface rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
                  alt="S. Anandakumar"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-sm text-on-surface">S. Anandakumar</h4>
                  <span className="text-[11px] text-primary font-semibold block">Wedding Photographer · Delhi</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★★★★★'}
                <span className="text-outline text-[11px] ml-1">Verified Member</span>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed italic">
                &ldquo;Couples find our candid wedding portfolio directly through the local directory. We closed 12 full-wedding photography bookings this season.&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-4 text-[11px] text-secondary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">photo_camera</span>
              <span>12 Wedding Contracts</span>
            </div>
          </div>

          {/* Story 3: Catering Chef */}
          <div className="bg-surface rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
                  alt="Chef Ganesh Namboodiri"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Chef Ganesh Namboodiri</h4>
                  <span className="text-[11px] text-primary font-semibold block">Catering Director · Bangalore</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★★★★★'}
                <span className="text-outline text-[11px] ml-1">Verified Member</span>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed italic">
                &ldquo;Event hosts and families find our authentic Kalyana Virundhu catering directly with zero broker margins. Generated 40+ banquet bookings.&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-4 text-[11px] text-secondary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">bakery_dining</span>
              <span>40+ Banquet Leads</span>
            </div>
          </div>

          {/* Story 4: Auto Mechanic */}
          <div className="bg-surface rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=200&q=80"
                  alt="Apex Auto Repair"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                />
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Apex Auto Repair</h4>
                  <span className="text-[11px] text-primary font-semibold block">Auto Garage · Industrial Area</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-amber-500 text-xs">
                {'★★★★★'}
                <span className="text-outline text-[11px] ml-1">Verified Member</span>
              </div>

              <p className="text-xs text-on-surface-variant leading-relaxed italic">
                &ldquo;Emergency vehicle breakdown calls and routine periodic maintenance bookings doubled in 60 days via our instant call and WhatsApp buttons.&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-4 text-[11px] text-secondary font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">car_repair</span>
              <span>2x Monthly Revenue</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. CORE FEATURES MATRIX (JUSTDIAL INSPIRED)
         ======================================================== */}
      <section className="w-full max-w-7xl mx-auto px-gutter">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-wider font-bold text-primary">Why Nammabus Ads</span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-1">
            Everything You Need to Scale Your Local Revenue
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
          <div className="p-6 rounded-3xl bg-surface-container-low border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Verified Pro Seal</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Showcase official verified status to build instant trust with local buyers and rank on top of category searches.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-low border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">chat</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Direct WhatsApp Chat</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Buyers chat directly on your phone without middleman portals, masked numbers, or hidden lead fees.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-low border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">inventory_2</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Digital Product Catalogue</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Display up to 5 products and 3 services with HD images, prices, and 1-click &ldquo;Inquire&rdquo; buttons.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-low border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">notifications_active</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Daily Lead Notifications</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Get immediate alerts whenever a shopper posts a requirement in your city or requests a consultation quote.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-low border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">share</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">Dual Traffic Network</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Promote to both local directory searchers and thousands of active community members across WhatsApp &amp; Arattai.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-surface-container-low border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[24px]">monetization_on</span>
            </div>
            <h3 className="font-bold text-base text-on-surface">0% Commission Model</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              100% of transaction revenue belongs to you. No hidden commissions, no per-lead deductibles, and no surprises.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. INTERACTIVE FAQS ACCORDION (JUSTDIAL INSPIRED)
         ======================================================== */}
      <section className="w-full max-w-4xl mx-auto px-gutter pb-6">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-wider font-bold text-primary">Got Questions?</span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-surface rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-on-surface hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`material-symbols-outlined text-outline transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs text-on-surface-variant leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
