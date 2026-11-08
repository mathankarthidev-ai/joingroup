import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';

export const metadata = {
  title: 'Community Guidelines | GroupHub',
  description: 'GroupHub community guidelines for group admins and members.',
};

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        {/* 2 Promotional Banners */}
        <PaidPromotionCarousel />

        <AdSenseUnit slotKey="headerLeaderboard" />

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 space-y-6 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Community Guidelines</h1>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">1. Safe Countries & Content Protection</h2>
            <p>
              GroupHub enforces strict safe geography policies. Only safe countries and regions are indexed. Groups attempting to post terrorism, illegal violence, or hate speech are permanently banned.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white">2. No Paid Recruitment Traps</h2>
            <p>
              Job groups asking for upfront registration money or interview fees will be deleted immediately.
            </p>
          </div>
        </div>

        <AdSenseUnit slotKey="betweenSections" />
      </main>

      <Footer />
    </div>
  );
}
