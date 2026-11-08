'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Group } from '@/lib/types';
import {
  MapPin,
  Clock,
  Star,
  ExternalLink,
  Flag,
  Share2,
  CheckCircle2,
  Zap,
  ShieldAlert,
  Users,
  TrendingUp,
  Copy,
  Check,
} from 'lucide-react';
import { ReportModal } from './ReportModal';

interface GroupCardProps {
  group: Group;
}

const PLATFORM_STYLES: Record<string, { gradient: string; label: string; dot: string }> = {
  arattai: {
    gradient: 'from-amber-500 to-orange-500',
    label: 'Arattai by Zoho',
    dot: 'bg-amber-400',
  },
  whatsapp: {
    gradient: 'from-emerald-500 to-green-600',
    label: 'WhatsApp',
    dot: 'bg-emerald-400',
  },
  telegram: {
    gradient: 'from-sky-500 to-blue-500',
    label: 'Telegram',
    dot: 'bg-sky-400',
  },
  youtube: {
    gradient: 'from-rose-600 to-red-600',
    label: 'YouTube',
    dot: 'bg-rose-400',
  },
  instagram: {
    gradient: 'from-amber-500 via-rose-500 to-purple-600',
    label: 'Instagram',
    dot: 'bg-pink-400',
  },
  facebook: {
    gradient: 'from-blue-600 to-blue-700',
    label: 'Facebook',
    dot: 'bg-blue-400',
  },
  discord: {
    gradient: 'from-indigo-500 to-purple-600',
    label: 'Discord',
    dot: 'bg-indigo-400',
  },
  linkedin: {
    gradient: 'from-blue-700 to-blue-800',
    label: 'LinkedIn',
    dot: 'bg-blue-300',
  },
  reddit: {
    gradient: 'from-orange-500 to-red-500',
    label: 'Reddit',
    dot: 'bg-orange-400',
  },
};

export const GroupCard: React.FC<GroupCardProps> = ({ group }) => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const pStyle = PLATFORM_STYLES[group.platform] ?? {
    gradient: 'from-slate-600 to-slate-700',
    label: group.platform,
    dot: 'bg-slate-400',
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/group/${group.slug}`;
      navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <div
        className={`group relative flex flex-col rounded-2xl overflow-hidden transition-all duration-300 card-hover ${
          group.isFeatured
            ? 'bg-amber-50/80 dark:bg-amber-950/30 border-2 border-amber-400/80 shadow-md shadow-amber-500/10'
            : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-emerald-500 shadow-sm hover:shadow-lg hover:shadow-emerald-500/5'
        }`}
      >
        {/* Top color accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${pStyle.gradient}`} />

        {/* Featured Badge Overlay */}
        {group.isFeatured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-md shadow-amber-500/30">
              <Zap className="w-3 h-3 fill-slate-950" />
              SPONSORED
            </span>
          </div>
        )}

        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 space-y-3">
          {/* Top Line: 🟢 WhatsApp · Chennai */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
              <span className={`w-2.5 h-2.5 rounded-full ${pStyle.dot}`} />
              <span>{pStyle.label}</span>
              <span className="text-slate-400">·</span>
              <span className="text-slate-600 dark:text-slate-300 font-semibold">{group.city || group.state || 'All India'}</span>
            </div>

            {group.isVerified && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                VERIFIED
              </span>
            )}
          </div>

          {/* Group Name */}
          <Link href={`/group/${group.slug}`} className="block">
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              {group.name}
            </h3>
          </Link>

          {/* Members · Active */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <strong>{group.memberCount.toLocaleString()}</strong> Members
            </span>
            <span>·</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active
            </span>
          </div>

          {/* User Requested Action Button: [ 👉 Join WhatsApp Group ] */}
          <div className="pt-2">
            <Link
              href={`/group/${group.slug}`}
              className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold text-white text-center flex items-center justify-center gap-2 shadow-sm transition-all ${
                group.platform === 'whatsapp'
                  ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'
                  : group.platform === 'telegram'
                  ? 'bg-sky-600 hover:bg-sky-500 shadow-sky-600/20'
                  : group.platform === 'arattai'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black'
                  : group.platform === 'instagram'
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-95 text-white shadow-pink-500/20 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <span>👉 Join {pStyle.label}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Copied toast */}
        {copied && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl border border-slate-700 animate-fade-in whitespace-nowrap z-20">
            ✓ Link copied!
          </div>
        )}
      </div>

      {reportModalOpen && (
        <ReportModal
          groupId={group.id}
          groupName={group.name}
          onClose={() => setReportModalOpen(false)}
        />
      )}
    </>
  );
};
