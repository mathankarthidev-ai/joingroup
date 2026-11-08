'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ChevronRight, ArrowRight } from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { SEED_CATEGORIES } from '@/lib/local-biz/seed-data';
import { JustdialHeroStrip } from '@/components/common/JustdialHeroStrip';
import { TypewriterText } from '@/components/common/TypewriterText';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <LocalBizHeader />

      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
            <Link href="/local-biz" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Categories</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white min-h-[1.5em]">
            Browse Verified{' '}
            <TypewriterText
              words={[
                'Home Services & Techs',
                'Wedding & Event Planners',
                'Catering & Bakers',
                'Boutiques & Tailoring',
                'Auto Garages & Mechanics',
                'PGs & Hostels',
                'Real Estate & Builders',
                'B2B Wholesale',
              ]}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
            />
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Browse through 20 curated commercial and consumer sectors across India.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        <JustdialHeroStrip variant="local-biz" showCategoriesGrid={false} />

        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-4">
            All 20 Nammabus Business Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {SEED_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/local-biz/businesses?category=${cat.slug}`}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-slate-800 text-3xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon || '🏢'}
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors mb-1.5">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {cat.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
                <span>Explore Listings</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
          </div>
        </div>
      </main>

      <LocalBizFooter />
    </div>
  );
}
