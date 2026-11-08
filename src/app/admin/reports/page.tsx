'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GroupReport } from '@/lib/types';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowLeft,
  Filter,
  Eye,
  Trash2,
  ExternalLink,
  ShieldCheck,
  Ban,
  MessageSquare,
} from 'lucide-react';

const INITIAL_REPORTS: GroupReport[] = [
  {
    id: 'rep-001',
    groupId: 'grp-001',
    groupName: 'Bangalore Python Coders Hub',
    reason: 'dead_link',
    message: 'The WhatsApp group invite link has expired and shows "Link revoked".',
    status: 'pending',
    createdAt: '2026-10-17T14:30:00Z',
  },
  {
    id: 'rep-002',
    groupId: 'grp-003',
    groupName: 'Delhi Crypto Scalping Signals',
    reason: 'spam',
    message: 'Group is promoting unauthorized crypto bot scams without consent.',
    status: 'pending',
    createdAt: '2026-10-18T08:15:00Z',
  },
  {
    id: 'rep-003',
    groupId: 'grp-006',
    groupName: 'Chennai Real Estate Deals',
    reason: 'misleading',
    message: 'Title says direct owners but only third-party brokers post advertisements.',
    status: 'reviewed',
    createdAt: '2026-10-16T19:00:00Z',
  },
  {
    id: 'rep-004',
    groupId: 'grp-008',
    groupName: 'Tamil Cinema & Memes',
    reason: 'adult_content',
    message: 'NSFW content posted without age restrictions.',
    status: 'resolved',
    createdAt: '2026-10-15T11:20:00Z',
  },
];

export default function AdminReportsQueuePage() {
  const [reports, setReports] = useState<GroupReport[]>(INITIAL_REPORTS);
  const [filterReason, setFilterReason] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 4000);
  };

  const handleUpdateStatus = (id: string, newStatus: 'pending' | 'reviewed' | 'resolved') => {
    setReports(reports.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
    showToast(`Report marked as ${newStatus}.`);
  };

  const handleTakedown = (id: string, groupName: string) => {
    if (confirm(`Immediately take down and deactivate "${groupName}" from public directory?`)) {
      setReports(reports.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r)));
      showToast(`Group "${groupName}" deactivated and listing delisted.`);
    }
  };

  const filtered = reports.filter((r) => {
    if (filterReason !== 'all' && r.reason !== filterReason) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    return true;
  });

  const pendingCount = reports.filter((r) => r.status === 'pending').length;

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
              <ShieldAlert className="w-8 h-8 text-rose-500" />
              <span>Trust, Safety & Community Abuse Reports</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Active moderation queue for dead invite links, spam, policy violations, and community complaints.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
              {pendingCount} Pending Action
            </span>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{toast}</span>
          </div>
        )}

        {/* Filter Controls */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Filter className="w-4 h-4" />
              <span>Reason:</span>
            </div>
            <select
              value={filterReason}
              onChange={(e) => setFilterReason(e.target.value)}
              className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Reasons</option>
              <option value="dead_link">Dead / Revoked Link</option>
              <option value="spam">Spam / Financial Fraud</option>
              <option value="adult_content">Adult / NSFW Content</option>
              <option value="misleading">Misleading Listing</option>
              <option value="other">Other Violation</option>
            </select>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 ml-2">
              <span>Status:</span>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-slate-800 dark:text-slate-200"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Under Investigation</option>
              <option value="resolved">Resolved / Delisted</option>
            </select>
          </div>

          <div className="text-xs text-slate-500">
            Showing <strong>{filtered.length}</strong> reports
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Reported Group</th>
                  <th className="py-3 px-4">Violation Type</th>
                  <th className="py-3 px-4">Reporter Details & Evidence</th>
                  <th className="py-3 px-4">Date Filed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Moderator Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white">{report.groupName}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {report.groupId}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          report.reason === 'adult_content' || report.reason === 'spam'
                            ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400'
                            : 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {report.reason.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <p className="text-slate-700 dark:text-slate-300 italic">
                        &quot;{report.message || 'No additional comment provided.'}&quot;
                      </p>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(report.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                          report.status === 'resolved'
                            ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400'
                            : report.status === 'reviewed'
                            ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                            : 'bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400'
                        }`}
                      >
                        {report.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {report.status !== 'resolved' && (
                          <button
                            onClick={() => handleTakedown(report.id, report.groupName)}
                            className="px-2.5 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 font-bold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                            title="Take down listing"
                          >
                            <Ban className="w-3 h-3" />
                            <span>Take Down</span>
                          </button>
                        )}
                        {report.status === 'pending' && (
                          <button
                            onClick={() => handleUpdateStatus(report.id, 'reviewed')}
                            className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500 hover:text-white text-blue-600 font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            Investigate
                          </button>
                        )}
                        {report.status !== 'resolved' && (
                          <button
                            onClick={() => handleUpdateStatus(report.id, 'resolved')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500 hover:text-white text-emerald-600 font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            Dismiss
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No reports found matching the selected filter.
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
