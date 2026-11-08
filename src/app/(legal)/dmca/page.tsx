import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';

export const metadata = {
  title: 'DMCA Copyright Policy | GroupHub',
  description: 'DMCA Takedown Notice instructions for GroupHub.',
};

export default function DmcaPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        {/* 2 Promotional Banners */}
        <PaidPromotionCarousel />

        <AdSenseUnit slotKey="headerLeaderboard" />

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 space-y-6 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">DMCA Copyright Policy</h1>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              GroupHub respects the intellectual property rights of others. If you believe your copyrighted work or group trademark has been listed without permission, submit a DMCA takedown request to our compliance officer.
            </p>
            <p>
              Email your URL, trademark documentation, and contact details to <strong>dmca@grouphub.example.com</strong>.
            </p>
          </div>
        </div>

        <AdSenseUnit slotKey="betweenSections" />
      </main>

      <Footer />
    </div>
  );
}
