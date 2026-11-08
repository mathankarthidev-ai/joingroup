'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, MapPin, Phone, Mail, ShieldCheck, ArrowRight, Heart } from 'lucide-react';
import { SEED_CITIES, SEED_CATEGORIES } from '@/lib/local-biz/seed-data';
import { WeServeCitiesSection } from './WeServeCitiesSection';

export const LocalBizFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-sm">
      {/* We Serve These Cities and States Section (Above Footer Links) */}
      <WeServeCitiesSection />

      {/* Top Banner in Footer */}
      <div className="border-b border-slate-800/80 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white text-base font-bold">Grow Your Business with Nammabus</h3>
              <p className="text-slate-400 text-xs mt-0.5">
                Join thousands of verified Indian suppliers, manufacturers, retailers, and service providers.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/local-biz/add-business"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
            >
              <span>List Your Business Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/local-biz/enquiry"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all"
            >
              Post B2B Requirement
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="col-span-2">
            <Link href="/local-biz" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black">
                BS
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Bizz<span className="text-blue-500">Spot</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-4">
              India&apos;s next-generation local business discovery platform, connecting customers with verified local stores, manufacturers, wholesalers, and professional service providers across 15+ major Indian cities.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Verified Business Profiles &amp; Direct Quotations</span>
            </div>
          </div>

          {/* Directory */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Directory</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/groups-2026" className="text-emerald-400 font-bold hover:underline transition-colors">
                  🔥 7,000+ Groups in 2026
                </Link>
              </li>
              <li>
                <Link href="/local-biz/businesses" className="hover:text-white transition-colors">
                  All Businesses
                </Link>
              </li>
              <li>
                <Link href="/local-biz/categories" className="hover:text-white transition-colors">
                  All Categories
                </Link>
              </li>
              <li>
                <Link href="/local-biz/cities" className="hover:text-white transition-colors">
                  Browse by City
                </Link>
              </li>
              <li>
                <Link href="/local-biz/products" className="hover:text-white transition-colors">
                  Product Marketplace
                </Link>
              </li>
              <li>
                <Link href="/local-biz/services" className="hover:text-white transition-colors">
                  Services Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Cities */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Popular Cities</h4>
            <ul className="space-y-2 text-xs">
              {SEED_CITIES.slice(0, 5).map((city) => (
                <li key={city.id}>
                  <Link
                    href={`/local-biz/businesses?city=${city.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    Businesses in {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business & Legal */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">For Businesses</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/local-biz/add-business" className="hover:text-white transition-colors">
                  Register Business
                </Link>
              </li>
              <li>
                <Link href="/local-biz/dashboard" className="hover:text-white transition-colors">
                  Business Dashboard
                </Link>
              </li>
              <li>
                <Link href="/local-biz/admin" className="hover:text-white transition-colors">
                  Admin Portal
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Disclaimer Notice
                </Link>
              </li>
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

        {/* MADE IN INDIA & AI ACCURACY NOTICE */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 flex flex-col items-center justify-center text-center space-y-1.5">
          <div className="text-xs sm:text-sm font-bold text-slate-200 flex items-center justify-center gap-2">
            <span>🇮🇳</span>
            <span>Made in India, Made with ❤️ for India.</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-2xl leading-normal">
            Content &amp; directory listings are organized with AI assistance. Some data may occasionally be inaccurate — please independently verify details before making payments or hiring professionals.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span>© 2026 Nammabus India. All rights reserved.</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-500">Find Local. Connect Better.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
            >
              <span>Switch to Social Groups (JoinGroupLinks)</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
