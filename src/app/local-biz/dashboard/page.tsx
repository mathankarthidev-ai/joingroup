'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  User,
  Bookmark,
  FileText,
  Star,
  Bell,
  Building2,
  Trash2,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  PlusCircle,
} from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Business, Enquiry, Review } from '@/types/local-biz';

export default function LocalBizDashboardPage() {
  const [activeTab, setActiveTab] = useState<'saved' | 'enquiries' | 'reviews' | 'profile'>('saved');
  const [savedBusinesses, setSavedBusinesses] = useState<Business[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const [savedIds, allEnquiries, allBusinesses] = await Promise.all([
          LocalBizStore.getSavedBusinesses(),
          LocalBizStore.getEnquiries(),
          LocalBizStore.getBusinesses({ limit: 50 }),
        ]);

        const savedObjs = allBusinesses.filter((b) => savedIds.includes(b.id));
        setSavedBusinesses(savedObjs);
        setEnquiries(allEnquiries);

        // Load reviews for the first business or sample
        if (allBusinesses.length > 0) {
          const revs = await LocalBizStore.getReviewsByBusiness(allBusinesses[0].id);
          setReviews(revs);
        }
      } catch (err) {
        console.error('Error loading dashboard:', err);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const handleRemoveSaved = async (businessId: string) => {
    await LocalBizStore.removeSavedBusiness(businessId);
    setSavedBusinesses((prev) => prev.filter((b) => b.id !== businessId));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <LocalBizHeader />



      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <Link href="/local-biz" className="hover:text-blue-600">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-800 dark:text-slate-200 font-semibold">User Dashboard</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Customer &amp; Business Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Manage your saved businesses, track submitted quotations, reviews, and profile settings.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/local-biz/add-business"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>List Another Business</span>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Dashboard Navigation */}
          <aside className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 space-y-1">
            {[
              { id: 'saved', label: 'Saved Businesses', icon: Bookmark, count: savedBusinesses.length },
              { id: 'enquiries', label: 'My Enquiries & Quotes', icon: FileText, count: enquiries.length },
              { id: 'reviews', label: 'My Reviews', icon: Star, count: reviews.length },
              { id: 'profile', label: 'Profile Settings', icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-bold">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Tab Content */}
          <section className="md:col-span-3 space-y-6">
            {/* SAVED BUSINESSES */}
            {activeTab === 'saved' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Saved Businesses ({savedBusinesses.length})
                </h2>

                {savedBusinesses.length === 0 ? (
                  <div className="text-center py-12 text-xs text-slate-500 space-y-2">
                    <Bookmark className="w-8 h-8 text-slate-300 mx-auto" />
                    <p>No saved businesses yet. Click the bookmark icon on any business card to save it for quick access.</p>
                    <Link
                      href="/local-biz/businesses"
                      className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
                    >
                      Browse Directory
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {savedBusinesses.map((b) => (
                      <div key={b.id} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center font-bold text-sm">
                            {b.logo_url || b.name.slice(0, 2)}
                          </div>
                          <div>
                            <Link
                              href={`/local-biz/businesses/${b.slug}`}
                              className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600"
                            >
                              {b.name}
                            </Link>
                            <div className="text-[11px] text-slate-400">
                              {b.city?.name} • {b.category?.name}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Link
                            href={`/local-biz/businesses/${b.slug}`}
                            className="p-2 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-50"
                            title="View"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleRemoveSaved(b.id)}
                            className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-50"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MY ENQUIRIES */}
            {activeTab === 'enquiries' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Sent Enquiries &amp; Quotation Requests ({enquiries.length})
                </h2>

                {enquiries.length === 0 ? (
                  <div className="text-center py-12 text-xs text-slate-500">
                    <p>No enquiries recorded yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {enquiries.map((enq) => (
                      <div
                        key={enq.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                            {enq.subject}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 capitalize">
                            {enq.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {enq.message}
                        </p>
                        <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                          {enq.quantity && <span>Qty: {enq.quantity}</span>}
                          {enq.budget && <span>Budget: {enq.budget}</span>}
                          {enq.location && <span>Location: {enq.location}</span>}
                          <span>
                            {new Date(enq.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* MY REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800">
                <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
                  Customer Reviews
                </h2>
                {reviews.length === 0 ? (
                  <div className="text-center py-12 text-xs text-slate-500">
                    <p>No reviews posted yet.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-amber-400">
                            {Array.from({ length: rev.rating }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                            ))}
                          </div>
                          <span className="text-[10px] text-emerald-600 font-bold uppercase">
                            {rev.status}
                          </span>
                        </div>
                        {rev.title && (
                          <div className="font-bold text-xs text-slate-800 dark:text-slate-200">
                            {rev.title}
                          </div>
                        )}
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {rev.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PROFILE SETTINGS */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Profile Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Admin / Customer"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      defaultValue="user@nammabus.in"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <LocalBizFooter />
    </div>
  );
}
