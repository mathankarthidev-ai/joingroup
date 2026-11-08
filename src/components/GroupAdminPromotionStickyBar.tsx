'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Zap, X, ShieldCheck, Flame, ArrowRight, Share2 } from 'lucide-react';

export const GroupAdminPromotionStickyBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = sessionStorage.getItem('grouphub_sticky_promo_dismissed');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('grouphub_sticky_promo_dismissed', 'true');
    }
  };

  if (isDismissed || !isVisible) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 md:left-auto md:right-6 md:max-w-md z-[100] animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl bg-slate-950 text-white border-2 border-emerald-500/40 p-4 shadow-2xl space-y-2.5">
        {/* Glow accent decoration */}
        <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Dismiss banner"
          aria-label="Dismiss banner"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Tag */}
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
            <Flame className="w-3 h-3 text-rose-600 fill-rose-600 animate-pulse" />
            <span>FOR GROUP ADMINS & CREATORS</span>
          </span>
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            100% Free Reach
          </span>
        </div>

        {/* Body Text */}
        <div className="space-y-0.5 pr-6">
          <h4 className="text-xs sm:text-sm font-black text-white leading-tight">
            Are You a Group Admin or Channel Creator?
          </h4>
          <p className="text-[11px] text-slate-300 leading-normal">
            Promote your <strong className="text-emerald-400">WhatsApp</strong>, <strong className="text-sky-400">Telegram</strong>, or <strong className="text-amber-300">Arattai</strong> link to get 1,000+ active members free!
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <a
            href="https://forms.gle/oZzitWMZ8xtB9rmx5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-emerald-400 shadow-md shadow-emerald-500/20 text-center flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Promote Your Group Free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          <Link
            href="/promote"
            className="py-2 px-3 rounded-xl text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-center flex items-center gap-1 shrink-0"
            title="View ₹999/yr VIP Pass"
          >
            <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>VIP</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
