'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowDown,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  MessageSquare,
  Users,
} from 'lucide-react';
import { Group } from '@/lib/types';

interface ScrollDownJoinHelperProps {
  group: Group;
}

export const TopScrollDownBanner: React.FC<ScrollDownJoinHelperProps> = ({ group }) => {
  const handleScrollToBottom = () => {
    const el = document.getElementById('join-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl border-2 border-emerald-400/40 relative overflow-hidden animate-fade-in">
      {/* Decorative background glow */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3.5 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
            <ArrowDown className="w-6 h-6 text-amber-300 animate-bounce" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 mb-1">
              <Sparkles className="w-3 h-3 fill-slate-950" />
              <span>Step 1: Invite Link Ready</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight">
              Scroll Down to Join {group.name}
            </h3>
            <p className="text-xs text-emerald-100/90 font-medium">
              Official invite button is placed at the end of this page 👇
            </p>
          </div>
        </div>

        <button
          onClick={handleScrollToBottom}
          className="w-full sm:w-auto px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 shrink-0"
        >
          <span>Scroll Down to Join</span>
          <ArrowDown className="w-4 h-4 text-slate-950 animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export const BottomJoinSection: React.FC<ScrollDownJoinHelperProps> = ({ group }) => {
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setReady(true);
    }
  }, [countdown]);

  const handleCopy = () => {
    if (typeof window !== 'undefined' && group.inviteUrl) {
      navigator.clipboard.writeText(group.inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const platformName = group.platform.toUpperCase();

  return (
    <section
      id="join-section"
      className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden scroll-mt-24 space-y-6"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Step 2: Official Verified Join Link</span>
        </div>

        <div className="pt-2">
          <div className="flex justify-center mb-2">
            <span className="text-3xl animate-bounce">👇</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Ready to Join {group.name}?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Click the official button below to launch {platformName} and join the community.
          </p>
        </div>
      </div>

      {/* Main Join Button Card */}
      <div className="max-w-lg mx-auto bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 shadow-xl space-y-4 text-center relative z-10">
        <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-700/60">
          <span className="flex items-center gap-1 font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Anti-Scam Verified</span>
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Users className="w-3.5 h-3.5" />
            <span>{group.memberCount.toLocaleString()} members</span>
          </span>
        </div>

        {/* The Action Button */}
        <div className="pt-1">
          <a
            href={group.inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 rounded-2xl text-base sm:text-lg font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-2xl shadow-amber-500/30 transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare className="w-5 h-5 fill-slate-950" />
            <span>JOIN {platformName} GROUP NOW</span>
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Copy Invite Link Option */}
        <div className="flex items-center justify-center gap-2 pt-2">
          <button
            onClick={handleCopy}
            className="text-xs font-bold text-slate-300 hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Link Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copy Invite Link</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-400 font-medium">
          🔒 100% Free · Verified Public Link · Safe &amp; Clean
        </p>
      </div>
    </section>
  );
};
