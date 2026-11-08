'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Store,
  Users,
  Gamepad2,
  Building2,
  PlusCircle,
  Flame,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();

  const isHome = pathname === '/' || pathname.startsWith('/local-biz');
  const isGroups = pathname.startsWith('/groups');
  const isGames = pathname.startsWith('/games');
  const isB2B = pathname.startsWith('/b2b');

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-[1050] md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-1 py-1.5 shadow-[0_-6px_25px_rgba(0,0,0,0.08)] safe-area-bottom select-none"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 gap-0.5 items-center">
        {/* 1. Home / Directory Tab */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
            isHome && !isGroups && !isGames && !isB2B
              ? 'text-blue-600 dark:text-blue-400 font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Store className="w-5 h-5" />
            {isHome && !isGroups && !isGames && !isB2B && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600 dark:bg-blue-400" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 leading-none">Home</span>
        </Link>

        {/* 2. Groups Tab */}
        <Link
          href="/groups"
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
            isGroups
              ? 'text-emerald-600 dark:text-emerald-400 font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Users className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 text-[8px] font-black px-1 rounded-full bg-emerald-500 text-white">
              25k
            </span>
            {isGroups && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 leading-none">Groups</span>
        </Link>

        {/* 3. PlayZone Tab (Center Featured) */}
        <Link
          href="/games"
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
            isGames
              ? 'text-purple-600 dark:text-purple-400 font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Gamepad2 className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 text-[8px] font-black px-1 rounded-full bg-purple-600 text-white animate-pulse">
              30
            </span>
            {isGames && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-purple-600 dark:bg-purple-400" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 leading-none">Games</span>
        </Link>

        {/* 4. B2B Wholesale Tab */}
        <Link
          href="/b2b"
          className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] ${
            isB2B
              ? 'text-indigo-600 dark:text-indigo-400 font-black'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <Building2 className="w-5 h-5" />
            {isB2B && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-600 dark:bg-indigo-400" />
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 leading-none">B2B</span>
        </Link>

        {/* 5. Submit Group Tab */}
        <a
          href="https://forms.gle/oZzitWMZ8xtB9rmx5"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer min-h-[48px] text-emerald-600 dark:text-emerald-400 font-bold active:scale-95"
        >
          <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-sm">
            <PlusCircle className="w-4 h-4 text-white fill-emerald-600" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5 leading-none font-black text-emerald-600 dark:text-emerald-400">
            Submit
          </span>
        </a>
      </div>
    </nav>
  );
};
