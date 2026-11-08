'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  PublishingQueueItem,
  PublishingTier,
  QueueItemStatus,
} from '@/lib/types';
import {
  getPublishingQueue,
  savePublishingQueue,
  releaseScheduledBatch,
  getCurrentBatchWeek,
} from '@/lib/publishing-queue';
import {
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Trash2,
  ExternalLink,
  Filter,
  ArrowLeft,
  Sparkles,
  Layers,
  Zap,
  Shield,
  RefreshCw,
} from 'lucide-react';

export default function PublishingQueuePage() {
  const [queue, setQueue] = useState<PublishingQueueItem[]>([]);
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setQueue(getPublishingQueue());
  }, []);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleBatchRelease = () => {
    const { releasedCount, updatedQueue } = releaseScheduledBatch();
    setQueue(updatedQueue);
    if (releasedCount > 0) {
      showToast(`Successfully published ${releasedCount} eligible community listings!`);
    } else {
      showToast('No queued listings have reached their scheduled release time yet.');
    }
  };

  const handleUpdateStatus = (id: string, newStatus: QueueItemStatus) => {
    const updated = queue.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: newStatus,
          publishedAt: newStatus === 'published' ? new Date().toISOString() : item.publishedAt,
        };
      }
      return item;
    });
    setQueue(updated);
    savePublishingQueue(updated);
    showToast(`Listing ${newStatus === 'published' ? 'published immediately' : 'updated'}.`);
  };

  const handleDeleteItem = (id: string) => {
    if (!confirm('Remove this listing from the queue?')) return;
    const updated = queue.filter((item) => item.id !== id);
    setQueue(updated);
    savePublishingQueue(updated);
    showToast('Listing removed from publishing queue.');
  };

  // Filter items
  const filtered = queue.filter((item) => {
    if (selectedTier !== 'all' && item.tier !== selectedTier) return false;
    if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;
    return true;
  });

  const now = new Date();
  const readyCount = queue.filter(
    (i) => i.status === 'queued' && new Date(i.scheduledPublishDate) <= now
  ).length;
  const queuedCount = queue.filter((i) => i.status === 'queued').length;
  const publishedCount = queue.filter((i) => i.status === 'published').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-500 mb-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin Control Centre</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black flex items-center gap-3">
              <Calendar className="w-8 h-8 text-emerald-500" />
              <span>Weekly Publishing Queue & Batch Scheduler</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Phased release engine for community submissions. Current batch cycle: <strong className="text-emerald-600 dark:text-emerald-400">{getCurrentBatchWeek()}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBatchRelease}
              className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4" />
              <span>Release Ready Batches ({readyCount})</span>
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            <span>{notification}</span>
          </div>
        )}

        {/* Schedule Tiers Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Tier A: Unregistered</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">Weekly</span>
            </div>
            <div className="text-xl font-black text-slate-900 dark:text-white">Every Sunday</div>
            <p className="text-[11px] text-slate-400 mt-1">Released in bulk at 00:00 UTC once every 7 days to preserve community quality.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Tier B: Registered User</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">Bi-Weekly</span>
            </div>
            <div className="text-xl font-black text-blue-600 dark:text-blue-400">Wed & Sun</div>
            <p className="text-[11px] text-slate-400 mt-1">Released twice weekly for authenticated account owners who submitted verified links.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Tier C: Priority Paid</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300">Fast Track</span>
            </div>
            <div className="text-xl font-black text-amber-600 dark:text-amber-400">&lt; 1 Hour</div>
            <p className="text-[11px] text-slate-400 mt-1">Priority queue for ₹99 launch plan listings with fast-track automated link verification.</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Tier D: VIP Sponsor</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300">Instant</span>
            </div>
            <div className="text-xl font-black text-purple-600 dark:text-purple-400">Immediate</div>
            <p className="text-[11px] text-slate-400 mt-1">Instant live indexing + pinned marquee carousel on homepage and city categories.</p>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Filter className="w-4 h-4" />
              <span>Tier:</span>
            </div>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Tiers ({queue.length})</option>
              <option value="TIER_A_UNREGISTERED">Tier A — Free Unregistered</option>
              <option value="TIER_B_REGISTERED">Tier B — Registered Member</option>
              <option value="TIER_C_PRIORITY_PAID">Tier C — Priority Paid</option>
              <option value="TIER_D_VIP">Tier D — VIP Sponsor</option>
            </select>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 ml-2">
              <span>Status:</span>
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Statuses</option>
              <option value="queued">Queued ({queuedCount})</option>
              <option value="published">Published ({publishedCount})</option>
              <option value="held">Held for Review</option>
            </select>
          </div>

          <div className="text-xs text-slate-500">
            Showing <strong>{filtered.length}</strong> of {queue.length} queue entries
          </div>
        </div>

        {/* Queue Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Community / Group</th>
                  <th className="py-3 px-4">Platform & City</th>
                  <th className="py-3 px-4">Tier & Priority</th>
                  <th className="py-3 px-4">Scheduled Release</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((item) => {
                  const isReady = item.status === 'queued' && new Date(item.scheduledPublishDate) <= now;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{item.groupName}</div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <span className="truncate max-w-[240px]">{item.inviteUrl}</span>
                          <a href={item.inviteUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-emerald-500">
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                        {item.moderationNotes && (
                          <div className="text-[10px] text-amber-500 mt-1 italic">
                            Note: {item.moderationNotes}
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="capitalize font-semibold text-slate-800 dark:text-slate-200">{item.platform}</span>
                        <div className="text-[11px] text-slate-400">
                          {item.city ? `${item.city}, ` : ''}{item.state || item.country}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            item.tier === 'TIER_D_VIP'
                              ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300'
                              : item.tier === 'TIER_C_PRIORITY_PAID'
                              ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300'
                              : item.tier === 'TIER_B_REGISTERED'
                              ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {item.tier.replace(/_/g, ' ')}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">Score: {item.priorityScore}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {new Date(item.scheduledPublishDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                        {isReady && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-500 animate-pulse mt-0.5">
                            <Clock className="w-3 h-3" /> Ready for Batch Release
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                            item.status === 'published'
                              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                              : item.status === 'held'
                              ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
                              : 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {item.status === 'queued' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'published')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 font-bold text-[11px] transition-colors"
                              title="Publish Now"
                            >
                              Publish
                            </button>
                          )}
                          {item.status === 'queued' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'held')}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white text-slate-600 dark:text-slate-400 font-bold text-[11px] transition-colors"
                              title="Hold for Review"
                            >
                              Hold
                            </button>
                          )}
                          {item.status === 'held' && (
                            <button
                              onClick={() => handleUpdateStatus(item.id, 'queued')}
                              className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-600 font-bold text-[11px] transition-colors"
                              title="Requeue"
                            >
                              Requeue
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No listings found in the queue matching the selected filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
