'use client';

import React from 'react';
import { ShieldAlert, Lock, PhoneCall, ExternalLink } from 'lucide-react';

interface ContextualSafetyBannerProps {
  variant?: 'listing' | 'group' | 'compact';
  className?: string;
}

export const ContextualSafetyBanner: React.FC<ContextualSafetyBannerProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const handleOpenNotice = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-safety-notice-modal'));
    }
  };

  return (
    <div
      className={`rounded-2xl border border-amber-200/80 dark:border-amber-900/50 bg-gradient-to-r from-amber-50/90 via-amber-50/60 to-orange-50/70 dark:from-amber-950/30 dark:via-slate-900 dark:to-orange-950/20 p-3.5 sm:p-4 text-xs text-amber-900 dark:text-amber-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
            <span>Stay Safe – Never Share OTP or UPI PIN</span>
            <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-extrabold uppercase">
              Fraud Alert
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 text-[11px] sm:text-xs mt-0.5 leading-relaxed">
            {variant === 'group'
              ? 'External WhatsApp & Telegram groups are run by independent third parties. Never send money or personal OTPs to group admins.'
              : variant === 'listing'
              ? 'Verify merchant credentials before transferring money. Entering your UPI PIN always deducts funds from your bank account.'
              : 'Our platform never asks for your OTP, UPI PIN, or bank passwords. In case of cyber fraud in India, dial 1930 immediately.'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
        <a
          href="tel:1930"
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[11px] shadow-xs transition-colors"
        >
          <PhoneCall className="w-3 h-3" />
          <span>Dial 1930</span>
        </a>

        <button
          type="button"
          onClick={handleOpenNotice}
          className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline font-bold cursor-pointer"
        >
          Safety Notice
        </button>
      </div>
    </div>
  );
};

export default ContextualSafetyBanner;
