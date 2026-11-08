import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';

export const metadata = {
  title: 'About Us | GroupHub Directory',
  description: 'Learn about GroupHub, India\'s searchable social group directory for active WhatsApp and Telegram communities.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        {/* 2 Promotional Banners */}
        <PaidPromotionCarousel />

        <AdSenseUnit slotKey="headerLeaderboard" />

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 space-y-6 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">About GroupHub</h1>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              <strong>GroupHub</strong> is an independent searchable directory designed to help users discover active, verified public social groups (WhatsApp, Telegram, Instagram) across safe countries and local cities like Chennai, Bangalore, Mumbai, London, and Dubai.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">Our Mission</h2>
            <p>
              We solve the problem of broken invite links, doorway page spam, and unverified social groups. Every listing on GroupHub passes strict automated link verification and user safety checks.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">Zero Spam Policy</h2>
            <p>
              We maintain a zero-tolerance policy against scams, paid referral traps, or unauthorized user-generated spam. All submissions are reviewed by moderators before entering our search index.
            </p>
          </div>
        </div>

        <AdSenseUnit slotKey="betweenSections" />
      </main>

      <Footer />
    </div>
  );
}
