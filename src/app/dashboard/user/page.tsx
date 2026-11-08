'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getStoredUser } from '@/lib/auth';
import { UserProfile } from '@/lib/types';

export default function UserDashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'favorites' | 'groups' | 'messages' | 'deals'>('favorites');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col justify-between">
      <Header />

      <main className="w-full pt-20 bg-surface flex-grow">
        <div className="flex flex-col w-full">
          {/* Top Welcome & Profile Section */}
          <section className="w-full bg-surface-container-low py-space-xl border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
              <div className="flex items-center gap-space-lg">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-on-primary font-headline-lg text-2xl font-bold shadow-md">
                    {user?.name ? user.name[0].toUpperCase() : 'S'}
                  </div>
                  <span
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-sm"
                    title="Verified Member"
                  >
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-space-sm mb-space-xs">
                    <span className="px-space-sm py-0.5 rounded-full bg-primary-container text-on-primary-container text-label-sm font-semibold text-xs">
                      {user?.isVip ? 'Verified VIP Member' : 'Verified Member'}
                    </span>
                    <span className="text-body-sm text-outline flex items-center gap-1 text-xs">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>{' '}
                      {user?.city || 'Chennai, Tamil Nadu'}
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface">
                    Welcome back, {user?.name || 'Sarah'}!
                  </h1>
                  <p className="text-body-md text-on-surface-variant text-sm mt-0.5">
                    Here is an overview of your saved local businesses, community groups, and active deals.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-space-md">
                <Link
                  href="/pricing"
                  className="px-space-md py-space-sm rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-xs shadow-sm hover:bg-surface-container-high transition-colors flex items-center gap-space-sm border border-slate-200 dark:border-slate-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-amber-500">local_fire_department</span>
                  <span>Launch Offer (₹99)</span>
                </Link>
                <Link
                  href="/groups"
                  className="px-space-md py-space-sm rounded-xl bg-primary text-on-primary font-semibold text-xs shadow-md hover:bg-primary-container transition-colors flex items-center gap-space-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">add</span>
                  <span>Explore Directory</span>
                </Link>
              </div>
            </div>
          </section>

          {/* Quick Stats Overview Cards */}
          <section className="max-w-7xl mx-auto px-gutter w-full -mt-6 relative z-10 mb-space-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">bookmark</span>
                  </div>
                  <span className="text-label-sm text-secondary font-bold text-xs flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> +1 this week
                  </span>
                </div>
                <div className="font-headline-lg text-2xl font-bold text-on-surface mb-space-xs">4</div>
                <div className="text-body-sm text-on-surface-variant text-xs">Saved Favorite Businesses</div>
              </div>

              {/* Card 2 */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed-dim/30 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[24px]">groups</span>
                  </div>
                  <span className="text-label-sm text-secondary font-bold text-xs flex items-center gap-0.5">Active</span>
                </div>
                <div className="font-headline-lg text-2xl font-bold text-on-surface mb-space-xs">7</div>
                <div className="text-body-sm text-on-surface-variant text-xs">Joined Community Groups</div>
              </div>

              {/* Card 3 */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-[24px]">chat_bubble</span>
                  </div>
                  <span className="text-label-sm text-outline font-bold text-xs">2 Enquiries</span>
                </div>
                <div className="font-headline-lg text-2xl font-bold text-on-surface mb-space-xs">2</div>
                <div className="text-body-sm text-on-surface-variant text-xs">Active Messages &amp; RFQs</div>
              </div>

              {/* Card 4 */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center text-error">
                    <span className="material-symbols-outlined text-[24px]">local_offer</span>
                  </div>
                  <span className="text-label-sm text-error font-bold text-xs">Expiring Soon</span>
                </div>
                <div className="font-headline-lg text-2xl font-bold text-on-surface mb-space-xs">3</div>
                <div className="text-body-sm text-on-surface-variant text-xs">Saved Deals &amp; Codes</div>
              </div>
            </div>
          </section>

          {/* Main Content Tabs & Sections */}
          <section className="max-w-7xl mx-auto px-gutter w-full pb-20">
            {/* Interactive Tab Nav */}
            <div className="flex flex-wrap items-center gap-space-sm mb-space-xl border-b border-slate-200 dark:border-slate-800 pb-space-sm">
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-space-lg py-space-sm rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  activeTab === 'favorites'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Favorite Businesses (3)
              </button>
              <button
                onClick={() => setActiveTab('groups')}
                className={`px-space-lg py-space-sm rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  activeTab === 'groups'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                My Community Groups (4)
              </button>
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-space-lg py-space-sm rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  activeTab === 'messages'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Messages &amp; Enquiries (2)
              </button>
              <button
                onClick={() => setActiveTab('deals')}
                className={`px-space-lg py-space-sm rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  activeTab === 'deals'
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                Saved Offers (3)
              </button>
            </div>

            {/* TAB 1: Favorite Businesses */}
            {activeTab === 'favorites' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {/* Biz 1 */}
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div
                      className="h-48 w-full bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80')`,
                      }}
                    >
                      <span className="absolute top-space-md right-space-md px-space-sm py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-xs font-bold text-on-surface flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>{' '}
                        4.9 (128)
                      </span>
                    </div>
                    <div className="p-space-lg">
                      <div className="flex items-center gap-space-sm mb-space-xs text-xs">
                        <span className="text-primary font-bold">Cafe &amp; Bakery</span>
                        <span className="text-outline">•</span>
                        <span className="text-outline">Chennai, Anna Nagar</span>
                      </div>
                      <h3 className="font-headline-md font-bold text-lg text-on-surface mb-space-xs">
                        Blue Harbor Artisan Cafe
                      </h3>
                      <p className="text-body-sm text-on-surface-variant text-xs line-clamp-2 mb-space-md">
                        Handcrafted specialty coffees, freshly baked organic pastries, and a quiet relaxing atmosphere for remote work.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-lg pt-0 flex items-center gap-space-sm">
                    <a
                      href="tel:+919876543210"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-primary text-on-primary font-bold text-xs text-center hover:bg-primary-container transition-all flex items-center justify-center gap-space-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span> Call
                    </a>
                    <a
                      href="https://wa.me/919876543210"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-secondary text-on-secondary font-bold text-xs text-center hover:bg-on-secondary-container transition-all flex items-center justify-center gap-space-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Biz 2 */}
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div
                      className="h-48 w-full bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80')`,
                      }}
                    >
                      <span className="absolute top-space-md right-space-md px-space-sm py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-xs font-bold text-on-surface flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>{' '}
                        4.8 (94)
                      </span>
                    </div>
                    <div className="p-space-lg">
                      <div className="flex items-center gap-space-sm mb-space-xs text-xs">
                        <span className="text-primary font-bold">Auto Repair</span>
                        <span className="text-outline">•</span>
                        <span className="text-outline">Bangalore, Indiranagar</span>
                      </div>
                      <h3 className="font-headline-md font-bold text-lg text-on-surface mb-space-xs">
                        Apex Auto Repair &amp; Tuning
                      </h3>
                      <p className="text-body-sm text-on-surface-variant text-xs line-clamp-2 mb-space-md">
                        Certified full-service automotive diagnostics, precision tuning, and transparent honest repairs by veteran technicians.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-lg pt-0 flex items-center gap-space-sm">
                    <a
                      href="tel:+919876543211"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-primary text-on-primary font-bold text-xs text-center hover:bg-primary-container transition-all flex items-center justify-center gap-space-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span> Call
                    </a>
                    <a
                      href="https://wa.me/919876543211"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-secondary text-on-secondary font-bold text-xs text-center hover:bg-on-secondary-container transition-all flex items-center justify-center gap-space-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span> WhatsApp
                    </a>
                  </div>
                </div>

                {/* Biz 3 */}
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div
                      className="h-48 w-full bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80')`,
                      }}
                    >
                      <span className="absolute top-space-md right-space-md px-space-sm py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-xs font-bold text-on-surface flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[16px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>{' '}
                        5.0 (210)
                      </span>
                    </div>
                    <div className="p-space-lg">
                      <div className="flex items-center gap-space-sm mb-space-xs text-xs">
                        <span className="text-primary font-bold">Wellness &amp; Spa</span>
                        <span className="text-outline">•</span>
                        <span className="text-outline">Mumbai, Bandra West</span>
                      </div>
                      <h3 className="font-headline-md font-bold text-lg text-on-surface mb-space-xs">
                        Glow Sanctuary &amp; Spa
                      </h3>
                      <p className="text-body-sm text-on-surface-variant text-xs line-clamp-2 mb-space-md">
                        Rejuvenating yoga sessions, therapeutic massage, organic facial treatments, and mindfulness relaxation therapies.
                      </p>
                    </div>
                  </div>
                  <div className="p-space-lg pt-0 flex items-center gap-space-sm">
                    <a
                      href="tel:+919876543212"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-primary text-on-primary font-bold text-xs text-center hover:bg-primary-container transition-all flex items-center justify-center gap-space-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">call</span> Call
                    </a>
                    <a
                      href="https://wa.me/919876543212"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-space-sm px-space-md rounded-xl bg-secondary text-on-secondary font-bold text-xs text-center hover:bg-on-secondary-container transition-all flex items-center justify-center gap-space-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">chat</span> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: My Community Groups */}
            {activeTab === 'groups' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                {/* Group 1: Arattai */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-space-lg">
                  <div className="flex items-start gap-space-md">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      ZOHO
                    </div>
                    <div>
                      <div className="flex items-center gap-space-sm mb-space-xs">
                        <span className="px-space-sm py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 font-bold text-[10px]">
                          Arattai by Zoho
                        </span>
                        <span className="text-[10px] text-secondary font-bold flex items-center gap-1">
                          ● Active Community
                        </span>
                      </div>
                      <h3 className="font-headline-sm font-bold text-on-surface text-base mb-space-xs">
                        Arattai Tamil Literature &amp; Readers
                      </h3>
                      <p className="text-body-sm text-on-surface-variant text-xs mb-space-md">
                        Connecting avid Tamil book readers, book swaps, poetry discussions, and regional creative writing.
                      </p>
                      <div className="text-[11px] text-outline">Members: 3,450+ • Tamil Nadu</div>
                    </div>
                  </div>
                  <a
                    href="https://arattai.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-space-md py-space-sm rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:bg-on-secondary-container transition-all flex items-center gap-space-xs flex-shrink-0"
                  >
                    <span>Open</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>

                {/* Group 2: WhatsApp */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-space-lg">
                  <div className="flex items-start gap-space-md">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      WA
                    </div>
                    <div>
                      <div className="flex items-center gap-space-sm mb-space-xs">
                        <span className="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold text-[10px]">
                          WhatsApp
                        </span>
                        <span className="text-[10px] text-secondary font-bold flex items-center gap-1">
                          ● Verified Link
                        </span>
                      </div>
                      <h3 className="font-headline-sm font-bold text-on-surface text-base mb-space-xs">
                        Global Python Developers &amp; Data Science
                      </h3>
                      <p className="text-body-sm text-on-surface-variant text-xs mb-space-md">
                        A community for Python engineers, data scientists, and AI researchers to share code, solve bugs, and network.
                      </p>
                      <div className="text-[11px] text-outline">Members: 1,420+ • Global India</div>
                    </div>
                  </div>
                  <a
                    href="https://chat.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-space-md py-space-sm rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:bg-on-secondary-container transition-all flex items-center gap-space-xs flex-shrink-0"
                  >
                    <span>Open</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>

                {/* Group 3: Telegram */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-space-lg">
                  <div className="flex items-start gap-space-md">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      TG
                    </div>
                    <div>
                      <div className="flex items-center gap-space-sm mb-space-xs">
                        <span className="px-space-sm py-0.5 rounded-full bg-primary-container text-on-primary-container font-bold text-[10px]">
                          Telegram
                        </span>
                        <span className="text-[10px] text-secondary font-bold flex items-center gap-1">
                          ● Supergroup
                        </span>
                      </div>
                      <h3 className="font-headline-sm font-bold text-on-surface text-base mb-space-xs">
                        Bengaluru AI &amp; Web3 Founders
                      </h3>
                      <p className="text-body-sm text-on-surface-variant text-xs mb-space-md">
                        Mastermind for decentralized app builders, AI researchers, angel investors, and product innovators.
                      </p>
                      <div className="text-[11px] text-outline">Members: 4,890+ • Bengaluru</div>
                    </div>
                  </div>
                  <a
                    href="https://t.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-space-md py-space-sm rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:bg-on-secondary-container transition-all flex items-center gap-space-xs flex-shrink-0"
                  >
                    <span>Open</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>

                {/* Group 4: UPSC */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-space-lg">
                  <div className="flex items-start gap-space-md">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                      EDU
                    </div>
                    <div>
                      <div className="flex items-center gap-space-sm mb-space-xs">
                        <span className="px-space-sm py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/50 text-blue-600 font-bold text-[10px]">
                          WhatsApp
                        </span>
                        <span className="text-[10px] text-secondary font-bold flex items-center gap-1">
                          ● Study Circle
                        </span>
                      </div>
                      <h3 className="font-headline-sm font-bold text-on-surface text-base mb-space-xs">
                        UPSC &amp; TNPSC Civil Services Aspirants
                      </h3>
                      <p className="text-body-sm text-on-surface-variant text-xs mb-space-md">
                        Daily current affairs discussions, editorial breakdowns, and mock exam question practice.
                      </p>
                      <div className="text-[11px] text-outline">Members: 2,300+ • Delhi &amp; Chennai</div>
                    </div>
                  </div>
                  <a
                    href="https://chat.whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-space-md py-space-sm rounded-xl bg-secondary text-on-secondary font-bold text-xs hover:bg-on-secondary-container transition-all flex items-center gap-space-xs flex-shrink-0"
                  >
                    <span>Open</span>
                    <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </a>
                </div>
              </div>
            )}

            {/* TAB 3: Messages & Enquiries */}
            {activeTab === 'messages' && (
              <div className="flex flex-col gap-space-md max-w-4xl mx-auto">
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-space-lg hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold text-sm">
                      BH
                    </div>
                    <div>
                      <div className="flex items-center gap-space-sm mb-space-xs">
                        <h3 className="font-headline-sm font-bold text-on-surface text-sm">Blue Harbor Artisan Cafe</h3>
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" title="Unread Message" />
                      </div>
                      <p className="text-body-sm text-on-surface-variant text-xs line-clamp-1">
                        Your table reservation for Saturday at 10:00 AM is confirmed! We look forward to seeing you.
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-label-sm text-outline text-[11px]">10:45 AM</span>
                    <div className="text-label-sm text-primary mt-1 font-bold text-xs">Active</div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-space-lg hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-on-secondary font-bold text-sm">
                      AP
                    </div>
                    <div>
                      <div className="flex items-center gap-space-sm mb-space-xs">
                        <h3 className="font-headline-sm font-bold text-on-surface text-sm">Apex Auto Repair &amp; Tuning</h3>
                        <span className="w-2.5 h-2.5 rounded-full bg-primary" title="Unread Message" />
                      </div>
                      <p className="text-body-sm text-on-surface-variant text-xs line-clamp-1">
                        Your quotation for synthetic oil change and computerized wheel alignment is ready.
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-label-sm text-outline text-[11px]">Yesterday</span>
                    <div className="text-label-sm text-primary mt-1 font-bold text-xs">Active</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Saved Offers & Deals */}
            {activeTab === 'deals' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                {/* Deal 1: Launch Offer */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-amber-300 dark:border-amber-800/50 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="px-space-sm py-1 rounded-full bg-amber-500/10 text-amber-600 font-bold text-xs">
                        98% OFF • ₹99 / 6 MOS
                      </span>
                      <span className="text-[11px] text-outline">Exclusive Launch</span>
                    </div>
                    <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                      ☕ Chai Offer: Nammabus Listing
                    </h3>
                    <p className="text-body-sm text-on-surface-variant text-xs mb-space-lg">
                      Save ₹4,695 on 6 months of paid verified business listing across all Indian metro cities.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-on-surface tracking-wider">BIZ99</span>
                    <button
                      onClick={() => handleCopy('BIZ99')}
                      className="text-primary hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>{' '}
                      {copiedCode === 'BIZ99' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Deal 2 */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="px-space-sm py-1 rounded-full bg-error-container text-on-error-container font-bold text-xs">
                        20% OFF
                      </span>
                      <span className="text-[11px] text-outline">Expires in 3 days</span>
                    </div>
                    <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                      Blue Harbor Artisan Cafe
                    </h3>
                    <p className="text-body-sm text-on-surface-variant text-xs mb-space-lg">
                      Get 20% off any specialty breakfast combo and artisan coffee blend.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-on-surface tracking-wider">BLUEHARBOR20</span>
                    <button
                      onClick={() => handleCopy('BLUEHARBOR20')}
                      className="text-primary hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>{' '}
                      {copiedCode === 'BLUEHARBOR20' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Deal 3 */}
                <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-space-md">
                      <span className="px-space-sm py-1 rounded-full bg-error-container text-on-error-container font-bold text-xs">
                        ₹500 OFF
                      </span>
                      <span className="text-[11px] text-outline">Expires next week</span>
                    </div>
                    <h3 className="font-headline-md font-bold text-base text-on-surface mb-space-xs">
                      Apex Auto Repair &amp; Tuning
                    </h3>
                    <p className="text-body-sm text-on-surface-variant text-xs mb-space-lg">
                      ₹500 off comprehensive vehicle seasonal servicing and computerized inspection.
                    </p>
                  </div>
                  <div className="bg-surface-container-low p-space-md rounded-xl flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-on-surface tracking-wider">APEX500</span>
                    <button
                      onClick={() => handleCopy('APEX500')}
                      className="text-primary hover:underline font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">content_copy</span>{' '}
                      {copiedCode === 'APEX500' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
