'use client';

import React from 'react';
import Link from 'next/link';
import { INITIAL_GROUPS } from '@/lib/data';
import { Sparkles, TrendingUp, Zap, Star } from 'lucide-react';

export const TopMoneyMakingGroupsTicker: React.FC = () => {
  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-3.5 shadow-md space-y-2 overflow-hidden my-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Top 100+ Most Popular Money-Making Groups Ticker</span>
          </h3>
        </div>
        <span className="text-[10px] font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800/50">
          UPSC • BNI • IT Jobs • Finance • Zoho Arattai
        </span>
      </div>

      {/* Scrolling Money Making Groups Ticker */}
      <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
        {INITIAL_GROUPS.map((g) => (
          <Link
            key={g.id}
            href={`/group/${g.slug}`}
            className="flex items-center gap-2.5 p-2 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-slate-900 transition-all shrink-0 text-xs font-bold group min-w-[260px]"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <div className="truncate">
              <span className="text-slate-200 group-hover:text-amber-400 block truncate">
                {g.name}
              </span>
              <span className="text-[10px] text-slate-400 font-normal">
                {g.city || g.country} • {g.memberCount.toLocaleString()} Members
              </span>
            </div>
            <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 shrink-0">
              4.8 ★
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};
