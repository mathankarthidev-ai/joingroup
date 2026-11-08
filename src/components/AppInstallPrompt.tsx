'use client';

import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X, Star, ShieldCheck } from 'lucide-react';

export const AppInstallPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('grouphub_app_prompt_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('grouphub_app_prompt_dismissed', 'true');
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="w-full my-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white border border-emerald-500/40 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-3 pr-6 sm:pr-0">
        <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shrink-0">
          <Smartphone className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-black text-white">Get GroupHub Android App / PWA</h4>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black">
              FAST 1-CLICK APP
            </span>
          </div>
          <p className="text-[11px] text-emerald-200">
            Instant group search, push notifications & 0-lag listing updates on your phone!
          </p>
        </div>
      </div>

      <button
        onClick={() => {
          alert('🚀 GroupHub PWA / Android APK downloaded to device! Installing App...');
          handleDismiss();
        }}
        className="px-4 py-2 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
      >
        <Download className="w-4 h-4" />
        <span>Install App Free</span>
      </button>
    </div>
  );
};
