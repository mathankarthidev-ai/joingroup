'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BusinessAnnouncementBanner: React.FC = () => {
  // Sequence of messages (Main headline + 5 secondary messages)
  const items = (
    <>
      {/* 1. MAIN HEADLINE */}
      <span className="inline-flex items-center gap-2 font-black text-white tracking-wide">
        <span className="text-base select-none" role="img" aria-label="India flag">🇮🇳</span>
        <span>List Your Business for</span>
        <span className="px-1.5 py-0.5 rounded-md font-black text-emerald-300 bg-emerald-950/90 border border-emerald-500/50 shadow-xs uppercase tracking-wider text-[11px] sm:text-xs">
          FREE (₹0)
        </span>
        <span>– Across All India!</span>
      </span>

      <span className="text-amber-400 font-bold select-none text-xs">✦</span>

      {/* 2. SECONDARY MESSAGE 1 */}
      <span className="inline-flex items-center gap-1.5 font-bold text-slate-200">
        <span className="text-amber-400">⚡</span>
        <span>Register Your Business in Minutes.</span>
      </span>

      <span className="text-slate-500 font-bold select-none text-xs">•</span>

      {/* 3. SECONDARY MESSAGE 2 */}
      <span className="inline-flex items-center gap-1.5 font-bold text-slate-200">
        <span className="text-cyan-400">🎯</span>
        <span>Reach Customers Across India.</span>
      </span>

      <span className="text-slate-500 font-bold select-none text-xs">•</span>

      {/* 4. SECONDARY MESSAGE 3 */}
      <span className="inline-flex items-center gap-1.5 font-bold text-slate-200">
        <span className="text-indigo-400">🏪</span>
        <span>Promote Your Shop, Company or Services.</span>
      </span>

      <span className="text-slate-500 font-bold select-none text-xs">•</span>

      {/* 5. SECONDARY MESSAGE 4 */}
      <span className="inline-flex items-center gap-1.5 font-bold text-slate-200">
        <span className="text-rose-400">📍</span>
        <span>Get Discovered by Local Customers.</span>
      </span>

      <span className="text-slate-500 font-bold select-none text-xs">•</span>

      {/* 6. SECONDARY MESSAGE 5 */}
      <span className="inline-flex items-center gap-1.5 font-bold text-slate-200">
        <span className="text-emerald-400 font-black">✨</span>
        <span>Free Business Registration – All India.</span>
      </span>

      <span className="text-amber-400 font-bold select-none text-xs">✦</span>
    </>
  );

  return (
    <aside
      aria-label="India-wide Local Business Directory Announcement"
      className="relative w-full bg-slate-950 text-white overflow-hidden border-b border-amber-500/25 shadow-[0_4px_20px_rgba(0,0,0,0.35)] group/banner select-none h-10 sm:h-11 flex items-center z-[900]"
    >
      <div className="max-w-7xl mx-auto w-full h-full flex items-center justify-between px-3 sm:px-6 relative">
        {/* Left Pill: Announcement (Visible on sm and up) */}
        <div className="hidden md:flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-lg bg-blue-950/80 border border-blue-700/60 text-[11px] font-black text-blue-200 z-20 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>NAMMABUS</span>
        </div>

        {/* Marquee Viewport with Gradient Fade Edges */}
        <div className="relative flex-1 overflow-hidden h-full flex items-center mx-1 sm:mx-3">
          {/* Left Gradient Fade Mask */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent z-10"
            aria-hidden="true"
          />

          {/* Marquee Track: Entire Ticker is Clickable */}
          <Link
            href="/local-biz/add-business"
            className="flex w-max animate-business-marquee group-hover/banner:[animation-play-state:paused] focus-visible:[animation-play-state:paused] gap-8 items-center cursor-pointer text-xs sm:text-sm py-1"
            title="Click to register your business for free across India"
          >
            {/* Loop Group 1 */}
            <div className="flex items-center gap-6 shrink-0">
              {items}
            </div>

            {/* Loop Group 2 (Duplicate for Seamless Infinite Marquee) */}
            <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
              {items}
            </div>
          </Link>

          {/* Right Gradient Fade Mask */}
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-slate-950 via-slate-950/85 to-transparent z-10"
            aria-hidden="true"
          />
        </div>

        {/* Right CTA Button */}
        <div className="shrink-0 z-20">
          <Link
            href="/local-biz/add-business"
            className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-[11px] sm:text-xs shadow-md shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-slate-950 hidden sm:inline" />
            <span className="hidden sm:inline">List Your Business Free</span>
            <span className="sm:hidden">List Free (₹0)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default BusinessAnnouncementBanner;
