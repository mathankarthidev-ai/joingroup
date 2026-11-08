'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function ModerationQueuePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Trust &amp; Safety Moderation Desk</h1>
          <p className="text-xs text-slate-500">Review pending community groups, reported links, and merchant verifications</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center mx-auto font-black text-lg">
            ✓
          </div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">All Pending Queues Clear</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Zero pending scam reports or suspicious invite URLs awaiting human review at this moment.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
