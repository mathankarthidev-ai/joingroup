'use client';

import React from 'react';
import Link from 'next/link';
import { SAFE_COUNTRIES } from '@/lib/data';
import { Globe, TrendingUp, ShieldCheck } from 'lucide-react';

export const SafeCountryRevenueTicker: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-md space-y-2 overflow-hidden">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Safe Country Directory & Growth Index</span>
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
          Strictly Verified Safe Regions
        </span>
      </div>

      {/* Ticker Container - NO CPM TEXT AT ALL */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
        {SAFE_COUNTRIES.map((c) => (
          <Link
            key={c.slug}
            href={`/groups/${c.slug}`}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all shrink-0 text-xs font-bold group"
          >
            <span className="text-base">{c.flag}</span>
            <span className="text-slate-200 group-hover:text-emerald-400">{c.name}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
              {c.groupCountText}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
