'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Building2,
  FileText,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Layers,
  MapPin,
  Sparkles,
  Lock,
  Search,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Users,
  Database,
  Copy,
  Check,
} from 'lucide-react';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Business, Enquiry, Review } from '@/types/local-biz';
import { SEED_CATEGORIES, SEED_CITIES } from '@/lib/local-biz/seed-data';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function LocalBizAdminPage() {
  const [activeTab, setActiveTab] = useState<'businesses' | 'reviews' | 'enquiries' | 'analytics' | 'database'>('businesses');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [copiedFile, setCopiedFile] = useState('');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [allBusinesses, allEnquiries] = await Promise.all([
          LocalBizStore.getBusinesses({ limit: 100 }),
          LocalBizStore.getEnquiries(),
        ]);
        setBusinesses(allBusinesses);
        setEnquiries(allEnquiries);
      } catch (err) {
        console.error('Error loading admin portal data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const showNotification = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleToggleVerification = async (business: Business) => {
    const nextStatus = business.verification_status === 'verified' ? 'unverified' : 'verified';
    await LocalBizStore.updateBusiness(business.id, { verification_status: nextStatus });
    setBusinesses((prev) =>
      prev.map((b) => (b.id === business.id ? { ...b, verification_status: nextStatus } : b))
    );
    showNotification(`Updated verification status for ${business.name}`);
  };

  const handleToggleFeatured = async (business: Business) => {
    const nextFeatured = !business.is_featured;
    await LocalBizStore.updateBusiness(business.id, { is_featured: nextFeatured });
    setBusinesses((prev) =>
      prev.map((b) => (b.id === business.id ? { ...b, is_featured: nextFeatured } : b))
    );
    showNotification(`Toggled featured status for ${business.name}`);
  };

  const handleToggleStatus = async (business: Business) => {
    const nextStatus = business.status === 'approved' ? 'rejected' : 'approved';
    await LocalBizStore.updateBusiness(business.id, { status: nextStatus });
    setBusinesses((prev) =>
      prev.map((b) => (b.id === business.id ? { ...b, status: nextStatus } : b))
    );
    showNotification(`Status for ${business.name} set to ${nextStatus}`);
  };

  const filteredBusinesses = businesses.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.city?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.category?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Admin Top Bar */}
      <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/local-biz"
              className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Nammabus Portal</span>
            </Link>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">
                <Lock className="w-3.5 h-3.5" />
              </div>
              <span className="font-black text-sm tracking-tight text-slate-900 dark:text-white">
                Nammabus <span className="text-amber-500 dark:text-amber-400">Admin Control</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300" />
            <div className="hidden md:flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/40 px-3 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Master Admin Access Active</span>
            </div>

            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
              title="Switch to GroupHub Administration"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Switch to GroupHub Admin</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 flex-1 w-full space-y-6">
        {/* Cross Admin Portal Switcher: Local Biz -> GroupHub */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/50 to-slate-50 dark:from-emerald-950/70 dark:via-slate-950 dark:to-teal-950/70 border border-emerald-200 dark:border-emerald-800/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 dark:bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Cross Admin Switch
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-500/30">
                  GroupHub Social Groups Portal
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
                Switch to the <strong>GroupHub Social Groups Administration</strong> to manage WhatsApp &amp; Telegram groups directory, run automated link health checkers, bulk CSV uploads, and manage paid promotional banners.
              </p>
            </div>
          </div>

          <Link
            href="/admin"
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Open GroupHub Admin</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Toast alert */}
        {message && (
          <div className="p-3 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-lg animate-in fade-in">
            {message}
          </div>
        )}

        {/* Analytics Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
              Total Businesses
            </span>
            <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
              {businesses.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
              Verified Listings
            </span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
              {businesses.filter((b) => b.verification_status === 'verified').length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
              Active Enquiries
            </span>
            <span className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1 block">
              {enquiries.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
              Covered Cities
            </span>
            <span className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1 block">
              {SEED_CITIES.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
              Categories
            </span>
            <span className="text-2xl font-black text-purple-600 dark:text-purple-400 mt-1 block">
              {SEED_CATEGORIES.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider block">
              Platform Status
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 block">
              ● 100% Operational
            </span>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 overflow-x-auto">
          {[
            { id: 'businesses', label: `Manage Businesses (${businesses.length})` },
            { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
            { id: 'analytics', label: 'Platform Stats & Categories' },
            { id: 'database', label: 'Database & Supabase Setup' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* BUSINESSES MANAGEMENT TAB */}
        {activeTab === 'businesses' && (
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter businesses by name, city, category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400">
                Total Listed: <span className="font-bold text-slate-900 dark:text-white">{filteredBusinesses.length}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 uppercase tracking-wider font-bold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Business Details</th>
                    <th className="py-3 px-4">City / State</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Verification</th>
                    <th className="py-3 px-4">Featured</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {filteredBusinesses.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{b.name}</span>
                          <Link
                            href={`/local-biz/businesses/${b.slug}`}
                            target="_blank"
                            className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                        <div className="text-[10px] text-slate-500 mt-0.5">
                          {b.phone} • {b.business_type}
                        </div>
                      </td>

                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        {b.city?.name || 'India'}
                      </td>

                      <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                        {b.category?.name || 'General'}
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleVerification(b)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            b.verification_status === 'verified'
                              ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60'
                              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {b.verification_status === 'verified' ? '✓ Verified' : 'Unverified'}
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleToggleFeatured(b)}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                            b.is_featured
                              ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/60'
                              : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {b.is_featured ? '★ Featured' : 'Standard'}
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.status === 'approved'
                              ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                              : 'bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleToggleStatus(b)}
                          className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-colors ${
                            b.status === 'approved'
                              ? 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 border border-red-200 dark:border-red-800/50'
                              : 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900 border border-emerald-200 dark:border-emerald-800/50'
                          }`}
                        >
                          {b.status === 'approved' ? 'Reject' : 'Approve'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ENQUIRIES MANAGEMENT TAB */}
        {activeTab === 'enquiries' && (
          <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Buyer Enquiries &amp; Quotation Requests
            </h2>

            {enquiries.length === 0 ? (
              <p className="text-xs text-slate-500">No enquiries recorded.</p>
            ) : (
              <div className="space-y-3">
                {enquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">{enq.subject}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 font-bold uppercase">
                        {enq.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">{enq.message}</p>
                    <div className="text-[10px] text-slate-500 pt-1 flex items-center gap-4">
                      {enq.location && <span>Location: {enq.location}</span>}
                      {enq.quantity && <span>Quantity: {enq.quantity}</span>}
                      {enq.budget && <span>Budget: {enq.budget}</span>}
                      <span>{new Date(enq.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ANALYTICS & DIRECTORY TAXONOMY TAB */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
                Active Categories ({SEED_CATEGORIES.length})
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {SEED_CATEGORIES.map((c) => (
                  <div key={c.id} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                    <span>{c.icon}</span>
                    <span className="text-slate-700 dark:text-slate-300 truncate">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-4">
                Registered Cities ({SEED_CITIES.length})
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {SEED_CITIES.map((c) => (
                  <div key={c.id} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{c.name}</span>
                    <span className="text-[10px] text-slate-400">{c.state}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DATABASE & SUPABASE SETUP TAB */}
        {activeTab === 'database' && (
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-600/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Database className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">Database Engine &amp; Storage Architecture</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      PostgreSQL on Supabase with Row Level Security (RLS) &amp; Resilient Fallback Engine
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-3 py-1 rounded-full font-bold bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Database Engine Active (Auto Fallback Ready)</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Total Normalized Tables</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white mt-1 block">17 Tables</span>
                  <span className="text-[10px] text-slate-500">cities, categories, businesses, products, reviews, etc.</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Preloaded Seed Records</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">30 Verified Businesses</span>
                  <span className="text-[10px] text-slate-500">Across 15 Indian metropolitan cities</span>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">Security Policies</span>
                  <span className="text-xl font-black text-purple-600 dark:text-purple-400 mt-1 block">RLS Enabled</span>
                  <span className="text-[10px] text-slate-500">Public read, authenticated owner &amp; admin writes</span>
                </div>
              </div>
            </div>

            {/* 1-Click SQL Scripts */}
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Generated SQL Scripts for Supabase SQL Editor</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Open any file below, copy its content, and paste into your Supabase Dashboard SQL Editor to initialize or re-seed:
                </p>
              </div>

              <div className="space-y-3 text-xs">
                {[
                  {
                    name: 'Full Schema + All Seed Data (Recommended)',
                    path: 'supabase/full_schema_and_seed.sql',
                    desc: 'Creates all 17 tables, types, RLS policies, indexes, AND populates 15 cities, 20 categories, 30 businesses, 15 products, 10 services, reviews, and banners in ONE single run!',
                    size: '93 KB',
                  },
                  {
                    name: 'Schema Migration Only',
                    path: 'supabase/migrations/20261005_init_local_biz.sql',
                    desc: 'Creates empty normalized PostgreSQL tables, indexes, triggers, and Row Level Security rules.',
                    size: '15 KB',
                  },
                  {
                    name: 'Seed Data Inserts Only',
                    path: 'supabase/seed.sql',
                    desc: 'Inserts all Indian cities, categories, products, services, businesses, and banners into existing tables.',
                    size: '78 KB',
                  },
                ].map((f) => (
                  <div key={f.path} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{f.name}</span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono text-[10px]">
                          {f.path}
                        </span>
                        <span className="text-[10px] text-slate-500">({f.size})</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 mt-1 text-[11px] max-w-2xl">{f.desc}</p>
                    </div>

                    <button
                      onClick={() => {
                        if (typeof navigator !== 'undefined') {
                          navigator.clipboard.writeText(f.path);
                          setCopiedFile(f.path);
                          setTimeout(() => setCopiedFile(''), 2000);
                        }
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                    >
                      {copiedFile === f.path ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedFile === f.path ? 'Copied Path!' : 'Copy Path'}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">How to Connect Your Supabase Database in 3 Minutes</h3>
              <ol className="space-y-3 text-xs text-slate-700 dark:text-slate-300 list-decimal list-inside leading-relaxed">
                <li>
                  <strong className="text-slate-900 dark:text-white">Create a Supabase Project:</strong> Go to{' '}
                  <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                    supabase.com
                  </a>{' '}
                  and click <em>New Project</em> (free tier works perfectly).
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">Run SQL Setup:</strong> In your Supabase Dashboard, click{' '}
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">&ldquo;SQL Editor&rdquo;</span> in the left menu. Open{' '}
                  <code className="text-blue-600 dark:text-blue-300 bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-800">supabase/full_schema_and_seed.sql</code>, copy everything, paste into the editor, and click <strong className="text-emerald-600 dark:text-emerald-400">&ldquo;Run&rdquo;</strong>.
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">Add Environment Variables:</strong> Go to{' '}
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">Project Settings &rarr; API</span> in Supabase. Copy your Project URL &amp; Anon Key into your local{' '}
                  <code className="text-blue-600 dark:text-blue-300 bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-800">.env.local</code> file:
                  <pre className="mt-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-[11px] overflow-x-auto border border-slate-200 dark:border-slate-800">
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
                  </pre>
                </li>
                <li>
                  <strong className="text-slate-900 dark:text-white">Run Connection Check:</strong> Run{' '}
                  <code className="text-emerald-600 dark:text-emerald-400 bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded border border-slate-200 dark:border-slate-800">npm run db:check</code>{' '}
                  in your terminal to verify full live connectivity with all 17 tables!
                </li>
              </ol>

              <div className="pt-2">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
                >
                  <span>Open Supabase Dashboard</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
