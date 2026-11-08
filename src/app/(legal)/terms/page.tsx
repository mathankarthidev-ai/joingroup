import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';

export const metadata = {
  title: 'Terms & Conditions | GroupHub Directory',
  description: 'Terms of Service for using GroupHub social directory.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        {/* 2 Promotional Banners */}
        <PaidPromotionCarousel />

        <AdSenseUnit slotKey="headerLeaderboard" />

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 space-y-6 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Terms & Conditions</h1>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              By accessing or using GroupHub, you agree to comply with and be bound by these Terms and Conditions.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">1. Acceptable Use</h2>
            <p>
              Users must not submit group links promoting illegal activities, hate speech, adult content, copyright infringement, or financial recruitment scams.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">2. User-Generated Content Disclaimer</h2>
            <p>
              GroupHub is a user-submitted directory index. We reserve the right to remove any group link reported as invalid, broken, or non-compliant.
            </p>
          </div>
        </div>

        <AdSenseUnit slotKey="betweenSections" />
      </main>

      <Footer />
    </div>
  );
}
