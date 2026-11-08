'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Sparkles, BookOpen, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const MathanKarthikaAcademyBanner: React.FC = () => {
  return (
    <div className="w-full my-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border-2 border-amber-400/40 p-6 md:p-8 text-white shadow-2xl relative overflow-hidden group">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md">
            <GraduationCap className="w-4 h-4 fill-slate-950" />
            <span>🎓 MATHANKARTHIKA ACADEMY • OFFICIAL CAREER PARTNER</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
            Upgrade Your Skills & Land High-Paying IT / Govt Jobs in 2026!
          </h3>

          <p className="text-xs sm:text-sm text-purple-200 leading-relaxed font-medium">
            Access free resume templates, mock exam test series, live coding bootcamps, and career placement mentorship at MathanKarthika Academy.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-amber-300 pt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% Free Resume Templates
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              TNPSC / UPSC / IT Mock Tests
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Direct Placement Assistance
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-3 shrink-0 w-full lg:w-auto">
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 text-center flex items-center justify-center gap-2 hover:scale-[1.03] transition-all"
          >
            <BookOpen className="w-4 h-4" />
            <span>Enroll / Download Free Study Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <span className="text-[11px] text-purple-300 font-semibold text-center">
            ⭐ 4.9/5 Rating by 15,000+ Academy Students
          </span>
        </div>
      </div>
    </div>
  );
};
