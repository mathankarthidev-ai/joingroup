'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { INITIAL_GROUPS, CATEGORIES } from '@/lib/data';
import { Group, Platform } from '@/lib/types';
import { JustdialHeroStrip } from '@/components/common/JustdialHeroStrip';
import { TypewriterText } from '@/components/common/TypewriterText';

export default function GroupsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <GroupsPageContent />
    </Suspense>
  );
}

function GroupsPageContent() {
  const searchParams = useSearchParams();
  const platformParam = searchParams.get('platform');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>(() => {
    return platformParam ? platformParam.toLowerCase() : 'all';
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'members'>('popular');

  // Sync state if platform query parameter in URL changes
  useEffect(() => {
    if (platformParam) {
      setSelectedPlatform(platformParam.toLowerCase());
    } else {
      setSelectedPlatform('all');
    }
  }, [platformParam]);

  // Submission Form State
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    platform: 'arattai' as Platform,
    category: 'Technology',
    inviteUrl: '',
    description: '',
  });

  // Filter groups
  const filteredGroups = useMemo(() => {
    return INITIAL_GROUPS.filter((g) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const tokens = q.split(/\s+/).filter(t => t.length > 0);
        const searchTarget = `${g.name} ${g.description} ${g.city || ''} ${g.area || ''} ${g.state || ''} ${g.category}`.toLowerCase();
        const matchesTokens = tokens.every(tok => searchTarget.includes(tok)) || tokens.some(tok => searchTarget.includes(tok));
        if (!matchesTokens) return false;
      }
      if (selectedPlatform !== 'all' && g.platform !== selectedPlatform) return false;
      if (selectedCategory !== 'all' && g.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'members') return b.memberCount - a.memberCount;
      if (sortBy === 'latest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      return (b.viewsCount || 0) - (a.viewsCount || 0);
    });
  }, [searchQuery, selectedPlatform, selectedCategory, sortBy]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        platform: 'arattai',
        category: 'Technology',
        inviteUrl: '',
        description: '',
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col justify-between">
      <Header />

      <main className="w-full bg-surface flex-grow">
        <div className="flex flex-col w-full">
          {/* ========================================================
              1. HERO SECTION
             ======================================================== */}
          <section className="relative w-full bg-surface-container-low py-space-xl px-gutter overflow-hidden">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-fixed rounded-full blur-3xl opacity-60 pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-fixed-dim rounded-full blur-3xl opacity-40 pointer-events-none" />

            <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
              <div className="inline-flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-highest text-on-surface-variant font-label-md mb-space-md shadow-sm text-xs">
                <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  hub
                </span>
                <span>Over 25,000+ Active Communities Connected</span>
              </div>

              <h1 className="font-headline-xl text-3xl sm:text-5xl font-black text-on-surface tracking-tight max-w-4xl mb-space-md leading-tight min-h-[3.2em] sm:min-h-[2.4em]">
                Discover &amp; Join Verified{' '}
                <TypewriterText
                  words={[
                    'WhatsApp Groups',
                    'Arattai Communities',
                    'Telegram Channels',
                    'Discord Servers',
                    'Instagram Broadcasts',
                    'Professional Circles',
                  ]}
                  className="bg-gradient-to-r from-emerald-600 via-teal-600 to-primary bg-clip-text text-transparent dark:from-emerald-400 dark:via-teal-300 dark:to-primary"
                  cursorClassName="text-emerald-500"
                />
              </h1>

              <p className="font-body-lg text-sm sm:text-base text-on-surface-variant max-w-2xl mb-space-xl">
                Connect with like-minded individuals across Arattai (by Zoho), WhatsApp, Telegram, Instagram Broadcast, and Discord groups. Explore verified local communities, professional circles, tech hubs, and educational channels.
              </p>

              {/* AI Search Prompt / Location & Pincode Tip Banner */}
              <div className="w-full max-w-4xl mb-space-sm p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-primary/10 to-purple-500/10 border border-emerald-500/20 text-xs sm:text-sm text-left flex items-center gap-2.5 shadow-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                <span className="text-on-surface font-medium">
                  <strong className="text-primary font-bold">✨ AI Search Tip:</strong> Enter <strong>Area Name, Pincode (e.g. 600017) and City</strong> to get business and community group search faster in AI.
                </span>
              </div>

              {/* Prominent Search Bar Component */}
              <div className="w-full max-w-4xl bg-surface-container-lowest p-space-sm rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-space-sm mb-space-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-space-sm px-space-md w-full md:w-1/2 py-space-sm">
                  <span className="material-symbols-outlined text-outline">search</span>
                  <input
                    className="w-full bg-transparent text-on-surface placeholder:text-outline focus:outline-none text-sm font-medium"
                    placeholder="Search topic, area name, pincode (e.g. 600017) or city..."
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="hidden md:block w-[1px] h-8 bg-surface-container-high" />

                <div className="flex items-center gap-space-sm px-space-md w-full md:w-1/3 py-space-sm">
                  <span className="material-symbols-outlined text-outline">category</span>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-transparent text-on-surface focus:outline-none text-sm font-medium cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.slice(0, 15).map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <button
                    onClick={() => {}}
                    className="w-full md:w-auto px-space-xl py-space-md bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-all flex items-center justify-center gap-space-sm shadow-md cursor-pointer"
                  >
                    <span>Search</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Submit Link Callout Badge */}
              <div className="flex flex-wrap items-center justify-center gap-space-md text-xs text-on-surface-variant">
                <span>Are you a group admin?</span>
                <a
                  className="inline-flex items-center gap-space-xs text-primary font-bold hover:underline"
                  href="https://forms.gle/oZzitWMZ8xtB9rmx5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Submit your group link for free</span>
                </a>
              </div>
            </div>
          </section>

          {/* ========================================================
              2. PLATFORM FILTER TABS SECTION (STICKY)
             ======================================================== */}
          <section className="w-full py-space-xs sm:py-space-md bg-surface px-gutter sticky top-14 sm:top-28 z-40 backdrop-blur-md bg-surface/90 border-b border-slate-200/80 dark:border-slate-800/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
            <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-space-md pb-space-xs scrollbar-none -webkit-overflow-scrolling-touch">
              <div className="flex items-center gap-space-xs sm:gap-space-sm min-w-max py-0.5">
                <button
                  onClick={() => setSelectedPlatform('all')}
                  className={`px-space-lg py-space-sm rounded-full text-xs font-bold transition-all cursor-pointer ${
                    selectedPlatform === 'all'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  All Platforms ({INITIAL_GROUPS.length})
                </button>

                {/* Arattai (Zoho) ALWAYS FIRST PRIORITY */}
                <button
                  onClick={() => setSelectedPlatform('arattai')}
                  className={`px-space-lg py-space-sm rounded-full text-xs font-bold transition-all flex items-center gap-space-xs cursor-pointer ${
                    selectedPlatform === 'arattai'
                      ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                    chat
                  </span>
                  <span>Arattai (Zoho) 🇮🇳</span>
                </button>

                {/* WhatsApp */}
                <button
                  onClick={() => setSelectedPlatform('whatsapp')}
                  className={`px-space-lg py-space-sm rounded-full text-xs font-bold transition-all flex items-center gap-space-xs cursor-pointer ${
                    selectedPlatform === 'whatsapp'
                      ? 'bg-secondary text-on-secondary shadow-md font-black'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    chat
                  </span>
                  <span>WhatsApp</span>
                </button>

                {/* Telegram */}
                <button
                  onClick={() => setSelectedPlatform('telegram')}
                  className={`px-space-lg py-space-sm rounded-full text-xs font-bold transition-all flex items-center gap-space-xs cursor-pointer ${
                    selectedPlatform === 'telegram'
                      ? 'bg-primary text-on-primary shadow-md font-black'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                    send
                  </span>
                  <span>Telegram</span>
                </button>

                {/* Instagram */}
                <button
                  onClick={() => setSelectedPlatform('instagram')}
                  className={`px-space-lg py-space-sm rounded-full text-xs font-bold transition-all flex items-center gap-space-xs cursor-pointer ${
                    selectedPlatform === 'instagram'
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-md font-black'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-pink-500" style={{ fontVariationSettings: "'FILL' 1" }}>
                    photo_camera
                  </span>
                  <span>Instagram</span>
                </button>

                {/* Discord */}
                <button
                  onClick={() => setSelectedPlatform('discord')}
                  className={`px-space-lg py-space-sm rounded-full text-xs font-bold transition-all flex items-center gap-space-xs cursor-pointer ${
                    selectedPlatform === 'discord'
                      ? 'bg-indigo-600 text-white shadow-md font-black'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    groups
                  </span>
                  <span>Discord</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => setSelectedPlatform('facebook')}
                  className={`px-space-lg py-space-sm rounded-full text-xs font-bold transition-all flex items-center gap-space-xs cursor-pointer ${
                    selectedPlatform === 'facebook'
                      ? 'bg-blue-600 text-white shadow-md font-black'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px] text-blue-600" style={{ fontVariationSettings: "'FILL' 1" }}>
                    groups
                  </span>
                  <span>Facebook</span>
                </button>
              </div>
            </div>
          </section>

          {/* ========================================================
              JUSTDIAL HERO STRIP & CATEGORY TILES (GROUPS VARIANT)
             ======================================================== */}
          <section className="w-full max-w-7xl mx-auto px-gutter pt-8">
            <JustdialHeroStrip variant="groups" />
          </section>

          {/* ========================================================
              3. POPULAR & RECENTLY ADDED GROUPS GRID
             ======================================================== */}
          <section className="w-full py-space-xl px-gutter max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
              <div>
                <span className="text-label-sm uppercase tracking-wider text-primary font-bold text-xs">
                  Trending Directories
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-space-xs">
                  Popular &amp; Verified Groups
                </h2>
              </div>
              <div className="flex items-center gap-space-sm text-xs">
                <span className="text-body-sm text-on-surface-variant font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="bg-surface-container px-space-md py-space-sm rounded-xl text-on-surface font-semibold focus:outline-none cursor-pointer border border-slate-200 dark:border-slate-800"
                >
                  <option value="popular">Most Active / Popular</option>
                  <option value="latest">Recently Added</option>
                  <option value="members">Highest Members</option>
                </select>
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
              {filteredGroups.map((group) => {
                const isArattai = group.platform === 'arattai';
                const isWA = group.platform === 'whatsapp';
                const isTG = group.platform === 'telegram';

                return (
                  <div
                    key={group.id}
                    className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group border border-slate-200 dark:border-slate-800"
                  >
                    <div>
                      <div className="flex items-start justify-between mb-space-md">
                        <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center font-bold text-sm overflow-hidden relative">
                          {isArattai ? (
                            <span className="text-amber-600 font-black">ZOHO</span>
                          ) : isWA ? (
                            <span className="text-emerald-600 font-black">WA</span>
                          ) : isTG ? (
                            <span className="text-sky-600 font-black">TG</span>
                          ) : (
                            <span className="text-indigo-600 font-black">COMM</span>
                          )}
                        </div>
                        <div
                          className={`flex items-center gap-space-xs px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            isArattai
                              ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300'
                              : isWA
                              ? 'bg-secondary-container text-on-secondary-container'
                              : 'bg-primary-fixed text-on-primary-fixed'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {isWA ? 'chat' : isTG ? 'send' : 'groups'}
                          </span>
                          <span className="capitalize">{group.platform}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-space-xs mb-space-xs">
                        <h3 className="font-headline-sm font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                          {group.name}
                        </h3>
                        {group.isVerified && (
                          <span
                            className="material-symbols-outlined text-primary text-[18px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                            title="Verified Community"
                          >
                            verified
                          </span>
                        )}
                      </div>

                      <p className="font-body-sm text-on-surface-variant text-xs line-clamp-2 mb-space-md">
                        {group.description}
                      </p>

                      <div className="flex flex-wrap gap-space-xs mb-space-lg">
                        <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[11px] font-medium">
                          {group.category}
                        </span>
                        {group.city && (
                          <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant text-[11px] font-medium">
                            📍 {group.city}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="pt-space-md border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-space-xs text-xs text-on-surface-variant">
                        <span className="material-symbols-outlined text-[18px] text-outline">group</span>
                        <span>{group.memberCount.toLocaleString()} members</span>
                      </div>
                      <a
                        href={group.inviteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-space-lg py-space-sm rounded-full bg-primary text-on-primary text-xs font-bold hover:bg-primary-container transition-all flex items-center gap-space-xs shadow-sm"
                      >
                        <span>Join Group</span>
                        <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================
              4. GROUP OWNER SUBMISSION SECTION
             ======================================================== */}
          <section className="w-full py-space-xl bg-surface-container-low px-gutter relative overflow-hidden my-space-xl" id="submit-section">
            <div className="max-w-4xl mx-auto bg-surface-container-lowest rounded-3xl p-6 sm:p-12 shadow-xl relative z-10 border border-slate-200 dark:border-slate-800">
              <div className="text-center max-w-2xl mx-auto mb-space-lg space-y-3">
                <span className="text-label-sm uppercase tracking-wider text-primary font-bold text-xs">
                  Grow Your Audience
                </span>
                <h2 className="font-headline-lg text-2xl sm:text-3xl font-bold text-on-surface mt-space-xs mb-space-sm">
                  Submit Your Group Link
                </h2>
                <p className="font-body-md text-on-surface-variant text-xs sm:text-sm">
                  Are you running an Arattai, WhatsApp, or Telegram community? Submit your invite link via our official form to reach thousands of active members instantly.
                </p>

                {/* Primary Official Google Form Button */}
                <div className="pt-2">
                  <a
                    href="https://forms.gle/oZzitWMZ8xtB9rmx5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm shadow-lg shadow-emerald-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                    <span>Click Here to Submit Group (Google Form)</span>
                  </a>
                </div>
              </div>

              {submitSuccess && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Group link submitted successfully! It has been queued for verification.</span>
                </div>
              )}

              <form className="space-y-space-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-space-xs">Group Name</label>
                    <input
                      className="w-full bg-surface-container-low px-space-md py-space-sm rounded-xl text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                      placeholder="e.g., Chennai AI Researchers"
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-space-xs">Platform Type</label>
                    <select
                      className="w-full bg-surface-container-low px-space-md py-space-sm rounded-xl text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all cursor-pointer"
                      value={formData.platform}
                      onChange={(e: any) => setFormData({ ...formData, platform: e.target.value })}
                    >
                      <option value="arattai">Arattai (by Zoho) - India Priority</option>
                      <option value="whatsapp">WhatsApp Community / Group</option>
                      <option value="telegram">Telegram Channel / Group</option>
                      <option value="discord">Discord Server</option>
                      <option value="facebook">Facebook Group</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-space-xs">Category</label>
                    <select
                      className="w-full bg-surface-container-low px-space-md py-space-sm rounded-xl text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all cursor-pointer"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Tech & Startups">Tech &amp; Startups</option>
                      <option value="Education & Study">Education &amp; Study</option>
                      <option value="Jobs & Careers">Jobs &amp; Careers</option>
                      <option value="Local Community">Local Community</option>
                      <option value="Crypto & Finance">Crypto &amp; Finance</option>
                      <option value="Entertainment & Arts">Entertainment &amp; Arts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-space-xs">Invite Link URL</label>
                    <input
                      className="w-full bg-surface-container-low px-space-md py-space-sm rounded-xl text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                      placeholder="https://chat.whatsapp.com/... or https://t.me/..."
                      required
                      type="url"
                      value={formData.inviteUrl}
                      onChange={(e) => setFormData({ ...formData, inviteUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-space-xs">Group Description</label>
                  <textarea
                    className="w-full bg-surface-container-low px-space-md py-space-sm rounded-xl text-on-surface text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-transparent transition-all"
                    placeholder="Write a short description about your group rules, topic focus, and guidelines..."
                    required
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="flex items-center gap-space-sm pt-1">
                  <input
                    className="w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer accent-primary"
                    id="terms"
                    required
                    type="checkbox"
                  />
                  <label className="text-xs text-on-surface-variant cursor-pointer select-none" htmlFor="terms">
                    I confirm that this community link adheres to community guidelines and does not promote spam or prohibited content.
                  </label>
                </div>

                <div className="flex justify-center pt-space-md">
                  <button
                    className="px-space-xl py-space-md bg-primary text-on-primary font-bold text-xs rounded-xl hover:bg-primary-container transition-all shadow-md flex items-center gap-space-sm cursor-pointer"
                    type="submit"
                    disabled={submitting}
                  >
                    <span className="material-symbols-outlined text-[18px]">publish</span>
                    <span>{submitting ? 'Submitting...' : 'Submit Group for Approval'}</span>
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* ========================================================
              5. SEO CONTENT SECTION: 7,000+ GROUPS IN 2026
             ======================================================== */}
          <section className="w-full py-16 px-gutter bg-surface-container-low border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-5xl mx-auto space-y-8 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold text-primary uppercase tracking-wider block">
                    Verified Directory Index (2026)
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-on-surface mt-1">
                    7,000+ Active WhatsApp, Arattai &amp; Telegram Groups in 2026
                  </h2>
                </div>
                <Link
                  href="/groups-2026"
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm w-fit cursor-pointer"
                >
                  <span>Explore 7,000+ Groups Guide</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-on-surface-variant leading-relaxed">
                <div className="p-5 rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 space-y-2">
                  <h3 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                    <span>📚</span>
                    <span>7,000+ Verified Study &amp; Job Groups</span>
                  </h3>
                  <p>
                    Discover active, spam-free study groups for UPSC, NEET, JEE, Banking, and IT careers in 2026. Daily current affairs PDFs, job alerts, and interview prep shared by verified community admins across India.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 space-y-2">
                  <h3 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                    <span>🇮🇳</span>
                    <span>Arattai (by Zoho) - India&apos;s #1 Choice</span>
                  </h3>
                  <p>
                    Championing indigenous Indian digital communities, Arattai by Zoho offers ad-free, secure group discussions with zero third-party tracking. Join thousands of Tamil, Hindi, Kannada, Telugu, and English channels.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface border border-slate-200 dark:border-slate-800 space-y-2">
                  <h3 className="font-bold text-sm text-on-surface flex items-center gap-1.5">
                    <span>🛡️</span>
                    <span>Zero Spam &amp; Fraud Awareness</span>
                  </h3>
                  <p>
                    All group invite links are vetted for safety. Never share banking OTPs or sensitive personal information. Report suspicious communities instantly to our 24/7 trust &amp; safety moderation desk.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
