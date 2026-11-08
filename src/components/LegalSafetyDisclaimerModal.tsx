'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  Users,
  Lock,
  PhoneCall,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertTriangle,
  FileText,
  X,
} from 'lucide-react';

const CURRENT_NOTICE_VERSION = 'v1_2026';
const STORAGE_KEY = `legal_safety_notice_${CURRENT_NOTICE_VERSION}`;

export const LegalSafetyDisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user has already acknowledged this version
    try {
      const acknowledged = localStorage.getItem(STORAGE_KEY);
      if (!acknowledged) {
        // Small delay so page mounts smoothly before showing
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback if localStorage is disabled
      setIsOpen(true);
    }
  }, []);

  // Listen for custom trigger to reopen popup manually (e.g. from footer)
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener('open-safety-notice-modal', handleOpen);
    return () => window.removeEventListener('open-safety-notice-modal', handleOpen);
  }, []);

  // Trap focus inside modal when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isChecked) {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isChecked]);

  const handleDismiss = () => {
    if (!isChecked) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          acknowledged: true,
          timestamp: new Date().toISOString(),
          version: CURRENT_NOTICE_VERSION,
        })
      );
    } catch (e) {
      console.error('Failed to save safety notice acknowledgment', e);
    }
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="safety-modal-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
      >
        {/* Top Header Banner */}
        <div className="relative px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-5 bg-gradient-to-r from-amber-500/10 via-blue-500/10 to-emerald-500/10 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/40 dark:border-amber-700/40">
                Official User Advisory
              </span>
              <h2
                id="safety-modal-title"
                className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight mt-0.5"
              >
                Important Notice – Disclaimer &amp; User Safety
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Please read carefully before using our business discovery &amp; community directory.
              </p>
            </div>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          {/* Card 1: Business Listing Disclaimer */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 space-y-2">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-sm">
              <Building2 className="w-4 h-4 shrink-0" />
              <span>1. Third-Party Business Listing Disclaimer</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              Our website is an online business discovery platform. Businesses, products, services, offers, and contact details are listed by independent third parties. <strong>We do not manufacture, sell, supply, or guarantee products or services</strong>. Before making payments or transactions, users must independently verify the merchant, business legitimacy, and service terms.
            </p>
          </div>

          {/* Card 2: WhatsApp & Group Links Disclaimer */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
              <Users className="w-4 h-4 shrink-0" />
              <span>2. WhatsApp, Telegram &amp; Community Groups</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              Joining any WhatsApp, Telegram, or Arattai group is <strong>entirely voluntary and at your own discretion</strong>. We do not control, manage, or continuously monitor third-party group admins or members. External groups may expose your phone number or profile according to the platform’s privacy settings. Be cautious of unknown links, investment schemes, and suspicious job offers.
            </p>
          </div>

          {/* Card 3: Banking Fraud & UPI Warning */}
          <div className="p-4 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/80 space-y-2.5">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-sm">
              <Lock className="w-4 h-4 shrink-0" />
              <span>3. Banking Fraud &amp; Online Payment Safety (FRAUD ALERT)</span>
            </div>
            <ul className="space-y-1.5 text-xs text-rose-900 dark:text-rose-200 font-medium">
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Never share OTP, UPI PIN, CVV, ATM PIN, or banking passwords</strong> with anyone. Our platform will NEVER request them.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">•</span>
                <span><strong>Do NOT scan QR codes to receive money.</strong> Entering your UPI PIN always deducts money from your account.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-rose-600 font-bold">•</span>
                <span>Avoid fake customer care numbers, suspicious APK files, and guaranteed-return schemes.</span>
              </li>
            </ul>

            <div className="pt-2 border-t border-rose-200/80 dark:border-rose-900/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-rose-700 dark:text-rose-300">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Cyber Fraud Helpline (India): <strong>1930</strong></span>
              </div>
              <a
                href="https://cybercrime.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
              >
                <span>National Cyber Crime Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Expandable Accordion: More Safety & Legal Details */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-3.5 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>More Safety, User Responsibility &amp; Legal Compliance Information</span>
              </div>
              {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </button>

            {isExpanded && (
              <div className="p-4 space-y-3 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 leading-relaxed animate-in fade-in duration-200">
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                    4. User Responsibility
                  </h4>
                  <p>
                    By accessing this platform, you acknowledge that you are responsible for evaluating third-party businesses, products, and external groups. Conduct due diligence before transacting or sharing personal information. If you encounter any fraudulent listing or harmful link, please report it immediately via our Grievance Redressal / Report mechanisms.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-1">
                    5. Platform Rights &amp; Legal Compliance
                  </h4>
                  <p>
                    We reserve the right to review, restrict, suspend, or permanently remove listings and links that violate our Community Guidelines or applicable laws. Nothing in this notice excludes or limits any rights or liabilities that cannot legally be excluded under applicable consumer protection, intermediary liability, or data privacy laws in India.
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
                  <span>For full details, review our </span>
                  <Link href="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</Link>,{' '}
                  <Link href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>, and{' '}
                  <Link href="/disclaimer" className="text-blue-600 dark:text-blue-400 hover:underline">Disclaimer Policy</Link>.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions & Checkbox */}
        <div className="p-5 sm:px-7 sm:py-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 space-y-4 shrink-0">
          {/* Required Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer select-none group">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
            />
            <span className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              I have read and understood the safety notice, payment fraud alert, and third-party disclaimers.
            </span>
          </label>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left">
              <span>Your statutory consumer rights remain fully protected.</span>
            </div>

            <button
              type="button"
              disabled={!isChecked}
              onClick={handleDismiss}
              className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-black flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                isChecked
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>I Understand &amp; Continue</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalSafetyDisclaimerModal;
