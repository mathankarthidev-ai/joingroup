'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { SafetyWarningBanner } from '@/components/SafetyWarningBanner';
import {
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import { FORMS_CONFIG } from '@/lib/forms-config';

export default function SubmitGroupPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between font-sans">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        <SafetyWarningBanner />
        <AdSenseUnit slotKey="headerLeaderboard" />

        {/* Page Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-4 h-4" />
            <span>FREE REGISTRATION & MULTIPLE GROUP SUBMISSIONS ALLOWED</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
            Promote & Add Your Group Link
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Promote your WhatsApp, Telegram, or Arattai group invite link for free and get targeted active members. Fast, safe, and 100% free!
          </p>
        </div>

        {/* OFFICIAL GOOGLE FORM DIRECT SUBMISSION BOX */}
        <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 p-6 sm:p-8 text-white shadow-xl shadow-emerald-600/20 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider">
            <span>✨ OFFICIAL SUBMISSION FORM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black">
            Submit Group via Official Google Form
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
            Submit your WhatsApp, Telegram, or Arattai community group link directly into our verified database using the official submission form.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <a
              href={FORMS_CONFIG.submitGroup.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-slate-950 font-black text-sm shadow-xl hover:bg-slate-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Click Here to Open Google Form</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* EMBEDDED GOOGLE FORM IFRAME */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm overflow-hidden space-y-4">
          <div className="flex items-center justify-between border-b border-slate-150 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                Fill Form Directly Online
              </h3>
            </div>
            <a
              href={FORMS_CONFIG.submitGroup.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Open in New Tab</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="w-full overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-950 flex justify-center">
            <iframe
              src={FORMS_CONFIG.submitGroup.embedUrl}
              width="100%"
              height="850"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              className="w-full border-0 min-h-[750px]"
              title="Official Group Submission Google Form"
            >
              Loading Google Form…
            </iframe>
          </div>
        </div>

        {/* WHATSAPP GROUP ADMIN GUIDE & REVOKE TUTORIAL SECTION */}
        <section className="rounded-3xl bg-slate-900 text-white p-6 md:p-8 space-y-6 shadow-xl border border-slate-800">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
              📘
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-white">WhatsApp Group Admin Guide & Revoke Link Tutorial</h2>
              <p className="text-xs text-slate-400">Everything you need to know about group links, revoking invite access & safety rules.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300 leading-relaxed">
            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <h3 className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>1. Private vs Public Group Links</span>
              </h3>
              <p>
                <strong>Public Groups:</strong> Anyone with the invite link can join directly without prior admin approval. Great for maximum community growth and promotion!
              </p>
              <p>
                <strong>Private Admin Approval Groups:</strong> Turning on &quot;Approve New Members&quot; in group settings lets admins review member profiles before granting access.
              </p>
            </div>

            <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
              <h3 className="font-bold text-amber-400 text-sm flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" />
                <span>2. How Admins Revoke / Reset Invite Link</span>
              </h3>
              <p>If your group reaches capacity or receives unwanted spammers, you can instantly deactivate your invite link using 3 simple steps:</p>
              <ol className="list-decimal pl-4 space-y-1">
                <li>Open WhatsApp ➔ Tap <strong>Group Info</strong>.</li>
                <li>Tap <strong>Invite via Link</strong>.</li>
                <li>Tap <strong>Reset Link / Revoke Link</strong> ➔ Confirm Reset.</li>
              </ol>
            </div>
          </div>
        </section>

        <AdSenseUnit slotKey="inArticle" />
      </main>

      <Footer />
    </div>
  );
}
