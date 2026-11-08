'use client';

import React from 'react';
import Link from 'next/link';
import {
  Globe,
  ShieldCheck,
  AlertCircle,
  MapPin,
  Award,
  ShieldAlert,
  Lock,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { TOP_100_INDIAN_CITIES, TOP_100_CATEGORIES } from '@/lib/data';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-800/80 mt-16 font-sans">
      {/* 🔒 MANDATORY SAFETY NOTE AS SPECIFIED */}
      <div className="border-b border-slate-800/80 bg-amber-950/20 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs sm:text-sm">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
            <span>🔒 SAFETY NOTE: Never send money or share bank OTPs inside any public group.</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Lock className="w-3.5 h-3.5" /> 100% Free Directory
            </span>
            <span className="flex items-center gap-1 text-sky-400">
              <EyeOff className="w-3.5 h-3.5" /> No Registration Needed
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* SEO SECTION 1: TOP 100 INDIAN CITIES */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Top 100 Indian Cities — WhatsApp &amp; Telegram Group Links (SEO)
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Find active WhatsApp groups, Telegram channels, and Arattai communities in all major cities across India:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1 max-h-48 overflow-y-auto pr-2 scrollbar-none">
            {TOP_100_INDIAN_CITIES.map((city, idx) => (
              <Link
                key={`${city}-${idx}`}
                href={`/groups/india/${city.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
              >
                📍 {city} Groups
              </Link>
            ))}
          </div>
        </div>

        {/* SEO SECTION 2: TOP 100 POPULAR CATEGORIES */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
              Top 100 Group Categories — Verified Links (SEO)
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Explore verified social communities across popular Indian topics, careers, entertainment, and trading:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1 max-h-48 overflow-y-auto pr-2 scrollbar-none">
            {TOP_100_CATEGORIES.map((category, idx) => (
              <Link
                key={`${category}-${idx}`}
                href={`/groups/india/${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400 hover:border-amber-500/40 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* 4 COLUMN BRAND & TRUST NAVIGATION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-slate-800/80 text-xs">
          <div className="col-span-2 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-black text-white tracking-tight">
                🇮🇳 JoinGroupLinks<span className="text-emerald-400">.in</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India&apos;s #1 verified community directory for active <strong>WhatsApp Groups</strong>, <strong>Telegram Channels</strong>, <strong>Arattai by Zoho</strong>, and <strong>Instagram Broadcast Channels</strong>.
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Strict Anti-Scam Moderation · 100% Safe Public Links</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Quick Links</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link href="/groups-2026" className="text-emerald-400 font-bold hover:underline transition-colors">🔥 7,000+ Groups (2026)</Link></li>
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home Directory</Link></li>
              <li><a href="https://forms.gle/oZzitWMZ8xtB9rmx5" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">➕ Post Group Free</a></li>
              <li><Link href="/local-biz" className="hover:text-blue-400 font-semibold transition-colors">🏪 Local Business Directory</Link></li>
              <li><a href="https://forms.gle/FVQVofUVejQ2ebiA7" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 font-bold transition-colors">📝 Register Business (Free ₹0)</a></li>
              <li><Link href="/paid-promotion" className="hover:text-amber-400 font-semibold transition-colors">⚡ Promote your business (2 Banners)</Link></li>
              <li><Link href="/blog" className="hover:text-emerald-400 transition-colors">📖 Blogs &amp; Guides</Link></li>
              <li><Link href="/dashboard" className="hover:text-emerald-400 transition-colors">My Dashboard</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-200">Legal &amp; Trust</h4>
            <ul className="space-y-1.5 text-slate-400">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-emerald-400 transition-colors">Disclaimer</Link></li>
              <li><Link href="/dmca" className="hover:text-emerald-400 transition-colors">DMCA Notice</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new Event('open-safety-notice-modal'));
                    }
                  }}
                  className="text-amber-400 hover:text-amber-300 transition-colors text-left font-semibold cursor-pointer"
                >
                  🛡️ Safety &amp; Fraud Notice
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* DISCLAIMER BOX */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-500 leading-relaxed flex flex-col sm:flex-row items-start justify-between gap-3">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-400 font-semibold">Disclaimer: </strong>
              JoinGroupLinks.in is an independent public directory and is not affiliated with, sponsored, or endorsed by WhatsApp, Meta Platforms Inc., Telegram Messenger, Instagram, or Arattai Zoho. All trademarks and brand names belong to their respective owners.
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new Event('open-safety-notice-modal'));
              }
            }}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-[11px] cursor-pointer transition-colors"
          >
            Review Safety Notice
          </button>
        </div>

        {/* MADE IN INDIA & AI ACCURACY NOTICE */}
        <div className="py-4 my-2 border-y border-slate-800/60 flex flex-col items-center justify-center text-center space-y-1.5">
          <div className="text-xs sm:text-sm font-bold text-slate-200 flex items-center justify-center gap-2">
            <span>🇮🇳</span>
            <span>Made in India, Made with ❤️ for India.</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-2xl leading-normal">
            Content &amp; directory listings are organized with AI assistance. Some data may occasionally be inaccurate — please independently verify details before joining groups or making payments.
          </p>
        </div>

        {/* BOTTOM COPYRIGHT & LEGAL BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <Link href="/about" className="hover:underline">About Us</Link>
            <span>·</span>
            <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <span>·</span>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
            <span>·</span>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
          <div>© 2026 JoinGroupLinks.in · All rights reserved</div>
        </div>
      </div>
    </footer>
  );
};
