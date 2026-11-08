import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';

export const metadata = {
  title: 'Privacy Policy | GroupHub Directory',
  description: 'Privacy policy for GroupHub. Read about how we handle user data and Google AdSense cookie compliance.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        {/* 2 Promotional Banners */}
        <PaidPromotionCarousel />

        <AdSenseUnit slotKey="headerLeaderboard" />

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-10 space-y-6 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Privacy Policy</h1>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p><strong>Effective Date:</strong> 19 August 2026</p>

            <p>
              At GroupHub, we respect your privacy. This Privacy Policy explains how information is collected, used, and safeguarded when you visit our searchable directory.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">1. Google AdSense & Cookies</h2>
            <p>
              We use third-party advertising services like Google AdSense to serve advertisements when you visit our website. Google may use cookies (such as the DART cookie) to serve ads based on your visit to our site and other sites on the Internet.
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">2. Information We Collect</h2>
            <p>
              We do not require user account registration for browsing. When group admins submit group links, we store basic details (group name, description, invite URL, category, location, and optional email).
            </p>

            <h2 className="text-base font-bold text-slate-900 dark:text-white pt-2">3. Third-Party Links</h2>
            <p>
              Our directory contains links to third-party platforms (WhatsApp, Telegram, Instagram). We do not control or assume responsibility for content hosted on third-party services.
            </p>
          </div>
        </div>

        <AdSenseUnit slotKey="betweenSections" />
      </main>

      <Footer />
    </div>
  );
}
