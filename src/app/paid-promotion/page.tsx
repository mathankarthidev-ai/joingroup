'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';
import {
  Zap,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  MapPin,
  Users,
  ArrowRight,
  Tag,
  Star,
  Globe,
  MessageCircle,
  Send,
  Phone,
  UploadCloud,
  Check,
  ExternalLink,
} from 'lucide-react';

export default function PaidPromotionPage() {
  const [selectedSlot, setSelectedSlot] = useState<'slot1' | 'slot2' | 'both'>('slot1');
  const [selectedDuration, setSelectedDuration] = useState<'1month' | '3months' | '1year'>('1year');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [bannerTitle, setBannerTitle] = useState('');
  const [bannerSubtitle, setBannerSubtitle] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [arattaiUrl, setArattaiUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [telegramUrl, setTelegramUrl] = useState('');
  const [targetState, setTargetState] = useState('All India');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-10">
        {/* The 2 Stacked Promotional Banners */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Live 2-Banner Showcase
              </span>
            </div>
            <Link
              href="/admin?tab=paidpromotions"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              Admin: Edit Banners →
            </Link>
          </div>

          <PaidPromotionCarousel />
        </section>

        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md">
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>2 PROMOTIONAL BANNERS PLACEMENT ON ALL PAGES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Advertise on the <span className="text-amber-500">2 Stacked Banners</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Get instant guaranteed visibility for your business, community, or service on every single page of JoinGroupLinks.in. Each banner features your custom artwork plus 4 direct clickable action buttons (Website, Arattai, WhatsApp, Telegram).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#book-banner"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 hover:from-amber-300 hover:to-amber-400 transition-all flex items-center gap-2"
            >
              <span>Book Your Banner Slot</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/admin?tab=paidpromotions"
              className="px-5 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-sm transition-all"
            >
              Manage Banners in Admin
            </Link>
          </div>
        </section>

        {/* 2 Banner Slots Breakdown */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slot 1: Top 1 Banner */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-400 dark:border-amber-500/50 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider rounded-bl-xl">
              TOP 1 BANNER
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-xl mb-4">
              1
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              Top 1 Banner (Prime Placement)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
              Appears first at the very top of all pages above directory feeds and search results. Highest click-through rate.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Prime top visibility across 28 States & 8 UTs</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>4 Dedicated Action Buttons (Website, Arattai, WhatsApp, Telegram)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Independent auto-scroll and manual navigation arrows</span>
              </li>
            </ul>
            <div className="flex items-baseline justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">₹999</span>
                <span className="text-xs text-slate-500"> / year</span>
              </div>
              <a
                href="#book-banner"
                onClick={() => setSelectedSlot('slot1')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all"
              >
                Select Slot 1
              </a>
            </div>
          </div>

          {/* Slot 2: Below 2 Banner */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-black uppercase tracking-wider rounded-bl-xl">
              BELOW 2 BANNER
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-xl mb-4">
              2
            </div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              Below 2 Banner (High Engagement)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
              Stacked directly beneath the first banner for double impact and persistent branding across all user visits.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Second banner stacked seamlessly with zero excess whitespace</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>4 Dedicated Action Buttons (Website, Arattai, WhatsApp, Telegram)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Independent auto-scroll carousel</span>
              </li>
            </ul>
            <div className="flex items-baseline justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-2xl font-black text-slate-900 dark:text-white">₹799</span>
                <span className="text-xs text-slate-500"> / year</span>
              </div>
              <a
                href="#book-banner"
                onClick={() => setSelectedSlot('slot2')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 transition-all"
              >
                Select Slot 2
              </a>
            </div>
          </div>
        </section>

        {/* 4 Action Links Explanation */}
        <section className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-amber-500/10 to-transparent border border-emerald-500/20">
          <h2 className="text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Every Banner Includes 4 Direct Action Buttons
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
            Unlike standard display ads, your promotional banner gives users 4 instant ways to connect with your business:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Website</div>
                <div className="text-[10px] text-slate-500">Direct landing page</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-orange-500" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Arattai</div>
                <div className="text-[10px] text-slate-500">Zoho Arattai chat</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-emerald-500" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">WhatsApp</div>
                <div className="text-[10px] text-slate-500">Group or business chat</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2.5">
              <Send className="w-4 h-4 text-sky-500" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Telegram</div>
                <div className="text-[10px] text-slate-500">Channel or group link</div>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section id="book-banner" className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl scroll-mt-20">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Book Your 2-Banner Promotion
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Submit your banner details. Our team will verify and activate your banner within 2 hours.
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">
                  Banner Booking Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-700 dark:text-emerald-400">
                  Thank you, <strong>{clientName || 'Partner'}</strong>! Your banner slot has been reserved. Our advertising desk will connect with you on WhatsApp at <strong>{clientPhone || 'your contact number'}</strong> to finalize placement.
                </p>
                <div className="pt-2 flex justify-center gap-3">
                  <a
                    href={`https://wa.me/919876543210?text=Hi%2C%20I%20want%20to%20activate%20Paid%20Promotion%202%20Banners%20for%20${encodeURIComponent(bannerTitle || 'My Business')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-emerald-500 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs"
                  >
                    Submit Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Slot Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Select Placement Slot:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'slot1', label: 'Top 1 Banner', price: '₹999/yr' },
                      { id: 'slot2', label: 'Below 2 Banner', price: '₹799/yr' },
                      { id: 'both', label: 'Both 1 & 2', price: '₹1,499/yr' },
                    ].map((slot) => (
                      <button
                        type="button"
                        key={slot.id}
                        onClick={() => setSelectedSlot(slot.id as any)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          selectedSlot === slot.id
                            ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-900 dark:text-amber-200 font-bold shadow-sm'
                            : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <div className="text-xs font-bold">{slot.label}</div>
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold">{slot.price}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Name / Business Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Rahul Sharma / Tech Academy"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      WhatsApp Number / Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* Banner Texts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Banner Main Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={bannerTitle}
                      onChange={(e) => setBannerTitle(e.target.value)}
                      placeholder="e.g. Free Stock Market VIP Community"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Banner Subtitle / Description
                    </label>
                    <input
                      type="text"
                      value={bannerSubtitle}
                      onChange={(e) => setBannerSubtitle(e.target.value)}
                      placeholder="e.g. Daily live calls, stock analysis, 50k+ active traders"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>

                {/* 4 Action Links Inputs */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Enter the 4 Action Button Links (Optional or provide what you have):
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        🌐 Website Link
                      </label>
                      <input
                        type="url"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        placeholder="https://yourwebsite.com"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        💬 Arattai Link
                      </label>
                      <input
                        type="url"
                        value={arattaiUrl}
                        onChange={(e) => setArattaiUrl(e.target.value)}
                        placeholder="https://arattai.in/group/..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        💚 WhatsApp Link
                      </label>
                      <input
                        type="url"
                        value={whatsappUrl}
                        onChange={(e) => setWhatsappUrl(e.target.value)}
                        placeholder="https://chat.whatsapp.com/..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        ✈️ Telegram Link
                      </label>
                      <input
                        type="url"
                        value={telegramUrl}
                        onChange={(e) => setTelegramUrl(e.target.value)}
                        placeholder="https://t.me/..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>Submit Banner Booking Request</span>
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
