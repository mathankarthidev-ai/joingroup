'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';
import { UserProfile, Group } from '@/lib/types';
import { INITIAL_GROUPS } from '@/lib/data';
import {
  User,
  Zap,
  ShieldCheck,
  PlusCircle,
  Star,
  CheckCircle,
  Lock,
  ArrowRight,
  Trash2,
  MapPin,
  ShieldAlert,
  BarChart3,
  Eye,
  MousePointerClick,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Download,
  BookOpen,
  Award,
  Layers,
} from 'lucide-react';

export default function UserDashboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [bumpMsg, setBumpMsg] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('grouphub_logged_user');
      if (storedUser) {
        const parsed: UserProfile = JSON.parse(storedUser);
        setUser(parsed);
        setUserGroups(INITIAL_GROUPS);
      }
    }
  }, []);

  const handleToggleSponsor = (id: string) => {
    if (!user) return;

    setUserGroups((prev) => {
      const target = prev.find((g) => g.id === id);
      if (!target) return prev;

      const currentlyFeatured = target.isFeatured;
      const currentFeaturedTotal = prev.filter((g) => g.isFeatured).length;

      if (!currentlyFeatured && currentFeaturedTotal >= user.allowedSponsoredLimit) {
        alert(`VIP Limit Reached: Under your ${user.role.toUpperCase()} Plan, you can select up to ${user.allowedSponsoredLimit} Sponsored Groups for top city pins.`);
        return prev;
      }

      return prev.map((g) => (g.id === id ? { ...g, isFeatured: !g.isFeatured } : g));
    });
  };

  const handleBumpListing = (groupName: string) => {
    setBumpMsg(`🚀 "${groupName}" bumped to #1 in latest listings feed! (Option #9 Repost & Renewal Active)`);
    setTimeout(() => setBumpMsg(''), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        {/* 2 Promotional Banners */}
        <PaidPromotionCarousel />

        {!user ? (
          <div className="p-10 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 max-w-md mx-auto my-12 shadow-xl">
            <User className="w-12 h-12 text-slate-400 mx-auto" />
            <h2 className="text-xl font-black text-slate-900 dark:text-white">Please Login to Access Dashboard</h2>
            <p className="text-xs text-slate-500">
              Log in with your email to access Premium Group Analytics, Repost Listing Bumps & VIP Badge Settings.
            </p>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 shadow-md"
            >
              Return to Home & Login
            </Link>
          </div>
        ) : (
          <>
            {/* Dashboard Header */}
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-emerald-500 text-slate-950">
                    PREMIUM GROUP ADMIN DASHBOARD (#17 ANALYTICS)
                  </span>
                  {user.role === 'admin' ? (
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>ADMINISTRATOR ROLE</span>
                    </span>
                  ) : user.isVip ? (
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 fill-amber-400" />
                      <span>PREMIUM VIP MEMBER (100 GROUPS + 20 SPONSORED PINS)</span>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">
                      FREE CUSTOMER PLAN
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Welcome, {user.name || user.email}
                </h1>
                <p className="text-xs text-slate-400">
                  Email: <strong className="text-slate-200">{user.email}</strong> • Managing {userGroups.length} Active Group Listings
                </p>
              </div>

              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 shadow-md flex items-center gap-1.5"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Open Admin Control Portal →</span>
                </Link>
              )}

              {user.role === 'normal' && (
                <Link
                  href="/promote"
                  className="px-6 py-3 rounded-2xl text-xs font-black text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 flex items-center gap-2 shrink-0"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>UPGRADE TO ₹999/YR VIP (100 GROUPS + 20 PINS)</span>
                </Link>
              )}
            </div>

            {bumpMsg && (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                <span>{bumpMsg}</span>
              </div>
            )}

            {/* OPTION #17: LIVE GROUP ADMIN ANALYTICS DASHBOARD */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-sky-500" />
                  <span>Total Listing Impressions</span>
                </span>
                <span className="text-2xl font-black text-slate-900 dark:text-white">
                  128,450 Views
                </span>
                <p className="text-[11px] text-emerald-500 font-semibold">
                  ↑ +24% Growth this month
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block flex items-center gap-1">
                  <MousePointerClick className="w-3.5 h-3.5 text-amber-500" />
                  <span>Invite Link Clicks</span>
                </span>
                <span className="text-2xl font-black text-amber-500">
                  42,180 Clicks
                </span>
                <p className="text-[11px] text-amber-500 font-semibold">
                  Avg. 32.8% Conversion Rate
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 block flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>Top Sponsored City Pins</span>
                </span>
                <span className="text-2xl font-black text-amber-500">
                  {userGroups.filter((g) => g.isFeatured).length} / {user.allowedSponsoredLimit} Active
                </span>
                <p className="text-[11px] text-slate-500">
                  Option #1: Featured #1-3 Spots
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 block flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Option #2: Verified Badge</span>
                </span>
                <span className="text-2xl font-black text-emerald-500 flex items-center gap-1">
                  <span>{user.isVip ? '✔️ Verified Active' : 'Unverified'}</span>
                </span>
                <p className="text-[11px] text-slate-500">
                  Option #2 Trust Checkmark
                </p>
              </div>
            </div>


            {/* My Groups & Repost Renewal Options */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    My Group Analytics & Repost Bumps ({userGroups.length} Listings)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Track live click counts, auto-renew listings (Option #9), and select Top Sponsored Pins (Option #1).
                  </p>
                </div>

                <a
                  href="https://forms.gle/oZzitWMZ8xtB9rmx5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>+ Add New Group Free</span>
                </a>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600 dark:text-slate-400">
                  <thead className="bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3.5">Group Title</th>
                      <th className="p-3.5">Platform</th>
                      <th className="p-3.5">Views / Clicks</th>
                      <th className="p-3.5">Option #1: Sponsored Pin</th>
                      <th className="p-3.5">Option #9: Repost & Renew</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                    {userGroups.map((g) => (
                      <tr key={g.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                        <td className="p-3.5 font-bold text-slate-900 dark:text-white">
                          {g.name}
                          <span className="text-[10px] text-slate-400 block font-normal">{g.city}, {g.country}</span>
                        </td>
                        <td className="p-3.5 uppercase font-semibold text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800">
                            {g.platform}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-emerald-500">
                          👁️ {g.viewsCount || 14200} • 🖱️ {g.clicksCount || 9100}
                        </td>
                        <td className="p-3.5">
                          <label className="inline-flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={g.isFeatured}
                              disabled={!user.isVip}
                              onChange={() => handleToggleSponsor(g.id)}
                              className="w-4 h-4 text-amber-500 rounded focus:ring-amber-400"
                            />
                            <span className={`font-bold text-[11px] ${g.isFeatured ? 'text-amber-500' : 'text-slate-400'}`}>
                              {g.isFeatured ? '⭐ #1-3 SPONSORED PIN' : 'Standard'}
                            </span>
                          </label>
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => handleBumpListing(g.name)}
                            className="px-3 py-1.5 rounded-xl text-[11px] font-bold text-teal-600 dark:text-teal-400 bg-teal-500/10 border border-teal-500/30 hover:bg-teal-500/20 flex items-center gap-1 transition-all"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Bump to #1 Top Feed</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
