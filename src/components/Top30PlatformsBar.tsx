'use client';

import React from 'react';
import { TOP_30_PLATFORMS, PLATFORM_MAP } from '@/lib/data';
import { Sparkles, Grid3X3 } from 'lucide-react';

interface Top30PlatformsBarProps {
  activePlatform?: string;
  onSelectPlatform?: (platform: string) => void;
}

export const Top30PlatformsBar: React.FC<Top30PlatformsBarProps> = ({
  activePlatform,
  onSelectPlatform,
}) => {
  return (
    <div className="w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
            <Grid3X3 className="w-3.5 h-3.5 text-slate-950" />
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            30+ Social Platforms
          </span>
        </div>
        {activePlatform && activePlatform !== 'all' && (
          <button
            onClick={() => onSelectPlatform && onSelectPlatform(activePlatform)}
            className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* Scrollable Platform Chips */}
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-none">
        {TOP_30_PLATFORMS.map((platformKey) => {
          const p = PLATFORM_MAP[platformKey];
          const isSelected = activePlatform === platformKey;
          const isArattai = platformKey === 'arattai';

          return (
            <button
              key={platformKey}
              onClick={() => onSelectPlatform && onSelectPlatform(platformKey)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                isSelected
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/25 scale-105'
                  : isArattai
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 border-amber-300 shadow-sm shadow-amber-500/20 ring-1 ring-amber-400/40'
                  : 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400/50 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full shrink-0 ${
                  isSelected ? 'bg-white/80' : `${p.bg}`
                }`}
              />
              <span className="whitespace-nowrap">{p.name}</span>
              {isArattai && !isSelected && (
                <span className="text-[9px] px-1 py-0.5 rounded-md bg-slate-950/20 font-black">#1</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
