'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function MerchantDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Merchant Dashboard</h1>
            <p className="text-xs text-slate-500">Manage your business listings, customer leads, and branch locations</p>
          </div>
          <Link
            href="/local-biz/add-business"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors self-start cursor-pointer shadow-sm"
          >
            + Add New Branch
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Active Listings</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">1 Listing</div>
            <span className="text-[11px] text-emerald-600 font-bold">100% Verified</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Customer Leads</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">24 Leads</div>
            <span className="text-[11px] text-blue-600 font-bold">+5 new today</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Profile Views</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">1,420</div>
            <span className="text-[11px] text-slate-500">Across Tamil Nadu &amp; Karnataka</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
