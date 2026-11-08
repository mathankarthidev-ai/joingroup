'use client';

import React from 'react';
import Link from 'next/link';
import { SAFE_COUNTRIES, TOP_30_PLATFORMS, PLATFORM_MAP, CATEGORIES } from '@/lib/data';

export const GlobalMarqueeTickerBar: React.FC = () => {
  return (
    <div className="w-full max-w-full bg-slate-900 border-b border-slate-800 py-3 space-y-2 overflow-hidden shadow-lg">
      {/* 1. 30 COUNTRIES SEAMLESS CONTINUOUS MARQUEE */}
      <div className="relative w-full max-w-full overflow-hidden group/marquee">
        <div className="flex w-max animate-marquee-loop group-hover/marquee:[animation-play-state:paused] gap-6">
          {/* Loop Group 1 */}
          <div className="flex items-center gap-6 shrink-0">
            {SAFE_COUNTRIES.map((c) => (
              <Link
                key={`g1-${c.slug}`}
                href={`/groups/${c.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-emerald-400 transition-colors whitespace-nowrap"
              >
                <span className="text-sm">{c.flag}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>

          {/* Loop Group 2 (Duplicate for seamless continuous loop) */}
          <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
            {SAFE_COUNTRIES.map((c) => (
              <Link
                key={`g2-${c.slug}`}
                href={`/groups/${c.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-emerald-400 transition-colors whitespace-nowrap"
              >
                <span className="text-sm">{c.flag}</span>
                <span>{c.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 2. 30+ SOCIAL MEDIA PLATFORMS MARQUEE */}
      <div className="relative w-full max-w-full overflow-hidden group/marquee-platforms border-t border-slate-800/60 pt-2">
        <div className="flex w-max animate-marquee-loop-reverse group-hover/marquee-platforms:[animation-play-state:paused] gap-6">
          {/* Loop Group 1 */}
          <div className="flex items-center gap-6 shrink-0">
            {TOP_30_PLATFORMS.map((platformKey) => {
              const p = PLATFORM_MAP[platformKey];
              return (
                <span
                  key={`p1-${platformKey}`}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap px-2.5 py-0.5 rounded-full ${
                    platformKey === 'arattai'
                      ? 'bg-amber-400 text-slate-950 shadow-sm ring-1 ring-amber-300 font-black'
                      : 'text-slate-300 bg-slate-800/80 border border-slate-700/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${p.bg}`} />
                  <span>{p.name}</span>
                </span>
              );
            })}
          </div>

          {/* Loop Group 2 (Duplicate for seamless continuous loop) */}
          <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
            {TOP_30_PLATFORMS.map((platformKey) => {
              const p = PLATFORM_MAP[platformKey];
              return (
                <span
                  key={`p2-${platformKey}`}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap px-2.5 py-0.5 rounded-full ${
                    platformKey === 'arattai'
                      ? 'bg-amber-400 text-slate-950 shadow-sm ring-1 ring-amber-300 font-black'
                      : 'text-slate-300 bg-slate-800/80 border border-slate-700/50'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${p.bg}`} />
                  <span>{p.name}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. 20 MONEY-MAKING CATEGORIES MARQUEE */}
      <div className="relative w-full max-w-full overflow-hidden group/marquee-categories border-t border-slate-800/60 pt-2">
        <div className="flex w-max animate-marquee-loop group-hover/marquee-categories:[animation-play-state:paused] gap-6">
          {/* Loop Group 1 */}
          <div className="flex items-center gap-6 shrink-0">
            {CATEGORIES.map((cat) => (
              <Link
                key={`cat1-${cat.slug}`}
                href={`/groups/india/${cat.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-amber-400 transition-colors whitespace-nowrap"
              >
                <span>⭐</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>

          {/* Loop Group 2 (Duplicate for seamless continuous loop) */}
          <div className="flex items-center gap-6 shrink-0" aria-hidden="true">
            {CATEGORIES.map((cat) => (
              <Link
                key={`cat2-${cat.slug}`}
                href={`/groups/india/${cat.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-amber-400 transition-colors whitespace-nowrap"
              >
                <span>⭐</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
