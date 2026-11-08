import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import { ContextualSafetyBanner } from '@/components/ContextualSafetyBanner';

export const metadata = {
  title: 'Disclaimer Notice | JoinGroupLinks.in & Nammabus',
  description:
    'Disclaimer: JoinGroupLinks.in is an independent public directory and is not affiliated with, sponsored, or endorsed by WhatsApp, Meta Platforms Inc., Telegram Messenger, Instagram, or Arattai Zoho.',
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        {/* Promotional Banners */}
        <PaidPromotionCarousel />

        <AdSenseUnit slotKey="headerLeaderboard" />

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-10 space-y-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Disclaimer Notice</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Independent Public Directory &amp; Non-Affiliation Statement</p>
            </div>
          </div>

          {/* Official Explicit Disclaimer Box */}
          <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 text-amber-950 dark:text-amber-200 text-sm leading-relaxed font-medium shadow-xs">
            <strong className="font-bold text-amber-900 dark:text-amber-300 block mb-1.5 text-base">
              Disclaimer:
            </strong>
            JoinGroupLinks.in is an independent public directory and is not affiliated with, sponsored, or endorsed by WhatsApp, Meta Platforms Inc., Telegram Messenger, Instagram, or Arattai Zoho. All trademarks and brand names belong to their respective owners.
          </div>

          {/* Permanent Contextual Safety Notice */}
          <ContextualSafetyBanner className="my-2" />

          <div className="space-y-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                1. Non-Affiliation Statement
              </h2>
              <p>
                JoinGroupLinks.in operates strictly as an independent community directory and search index. We maintain zero corporate affiliation, authorization, sponsorship, or formal partnership with Meta Platforms, Inc., WhatsApp LLC, Telegram FZ-LLC, Instagram, or Zoho Corporation Pvt. Ltd. (Arattai).
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                2. Trademark &amp; Intellectual Property Ownership
              </h2>
              <p>
                All trademarks, trade names, product badges, logos, and brand symbols displayed across JoinGroupLinks.in remain the sole and exclusive intellectual property of their respective trademark holders. Their usage on this site is purely nominative and descriptive to inform users of the third-party platforms on which community groups operate.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                3. User-Generated Links &amp; Third-Party Content
              </h2>
              <p>
                Group invitation links, channels, and social listings indexed on JoinGroupLinks.in are submitted by users or aggregated from public domains. JoinGroupLinks.in does not own, moderate private communication within, or control any external groups, channels, or chats. Users participate in external groups at their own discretion.
              </p>
            </section>
          </div>
        </div>

        <AdSenseUnit slotKey="betweenSections" />
      </main>

      <Footer />
    </div>
  );
}
