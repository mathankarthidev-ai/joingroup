'use client';

import React from 'react';
import { ShieldAlert, Lock, EyeOff, AlertTriangle, Info } from 'lucide-react';

interface SafetyWarningBannerProps {
  compact?: boolean;
}

export const SafetyWarningBanner: React.FC<SafetyWarningBannerProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/20 text-xs">
        <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span className="text-amber-700 dark:text-amber-400 font-medium">
          <strong>⚠️ Safety:</strong> Never share passwords, OTPs, or banking details inside public groups.
        </span>
      </div>
    );
  }

  return (
    <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 bg-gradient-to-r from-amber-950/30 via-slate-900/80 to-slate-900 p-4 sm:p-5">
      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-amber-600 rounded-l-2xl" />

      <div className="pl-3 space-y-3">
        {/* Title row */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
          </div>
          <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider">
            ⚠️ Official Safety, Anti-Scam & Privacy Warning Notice
          </h4>
        </div>

        {/* Body */}
        <p className="text-xs text-slate-400 leading-relaxed">
          <strong className="text-slate-300">GroupHub Safety Protocol:</strong> GroupHub is a public directory. We{' '}
          <strong className="text-amber-400">never</strong> send direct messages asking for payments, OTPs, passwords,
          or personal identity documents. Always verify group admins before sharing any information inside third-party
          WhatsApp, Telegram, Instagram, or Arattai groups.
        </p>

        {/* Pill badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-[11px] font-semibold text-emerald-400">
            <Lock className="w-3 h-3" />
            Never Share OTPs
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sky-950/60 border border-sky-800/50 text-[11px] font-semibold text-sky-400">
            <EyeOff className="w-3 h-3" />
            Keep Banking Details Private
          </span>
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-800/50 text-[11px] font-semibold text-amber-400">
            <Info className="w-3 h-3" />
            Report Suspicious Groups
          </span>
        </div>
      </div>
    </div>
  );
};
