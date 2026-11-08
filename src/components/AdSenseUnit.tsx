'use client';

import React, { useEffect } from 'react';
import { AD_SLOTS, ADSENSE_CLIENT_ID } from '@/lib/ad-config';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AdSenseUnitProps {
  slotKey: keyof typeof AD_SLOTS;
  className?: string;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({ slotKey, className = '' }) => {
  const slot = AD_SLOTS[slotKey] || AD_SLOTS.betweenSections;

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
      }
    } catch (err) {
      // Ignored for SSR or uninitialized ads script
    }
  }, []);

  return (
    <div className={`ad-container-outer my-4 text-center ${slotKey === 'bottomStickyAnchor' ? AD_SLOTS.bottomStickyAnchor.className : ''} ${className}`}>
      <div className="flex items-center justify-center gap-1.5 mb-1 text-[10px] tracking-wider uppercase font-semibold text-slate-400 dark:text-slate-500">
        <span>ADVERTISEMENT</span>
        <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
        <span className="text-[9px] text-amber-5-00/80 font-normal">Google AdSense</span>
      </div>

      <div className="relative group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-3 transition-all">
        {/* Real AdSense Element */}
        <ins
          className="adsbygoogle block"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot.slotId}
          data-ad-format={slot.format}
          data-full-width-responsive={slot.responsive ? 'true' : 'false'}
        />

        {/* Development Visual Representation */}
        <div className="dev-ad-placeholder flex flex-col items-center justify-center p-4 min-h-[100px] border border-dashed border-emerald-400/40 rounded-lg bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-emerald-500/5">
          <div className="flex items-center gap-2 mb-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
            <span>Google AdSense High-RPM Ad Slot</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {slot.label}
          </p>
          <div className="mt-2 text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300">
            Slot ID: {slot.slotId} • Client: {ADSENSE_CLIENT_ID}
          </div>
        </div>
      </div>
    </div>
  );
};
