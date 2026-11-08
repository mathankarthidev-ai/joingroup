'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  MessageSquare,
  FileText,
  Bookmark,
  ExternalLink,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Business } from '@/types/local-biz';
import { EnquiryModal } from './EnquiryModal';
import { LocalBizStore } from '@/lib/local-biz/store';

interface BusinessCardProps {
  business: Business;
  viewMode?: 'grid' | 'list';
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, viewMode = 'grid' }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const next = !saved;
    setSaved(next);
    if (next) {
      await LocalBizStore.saveBusiness(business.id);
    }
  };

  const isList = viewMode === 'list';

  return (
    <>
      <article
        className={`group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col overflow-hidden ${
          isList ? 'md:flex-row' : ''
        }`}
      >
        {/* Cover / Header Area */}
        <div
          className={`relative bg-gradient-to-tr from-slate-100 to-blue-50/60 dark:from-slate-800 dark:to-slate-800/50 p-5 flex items-start justify-between border-b border-slate-100 dark:border-slate-800 ${
            isList ? 'md:w-56 md:border-b-0 md:border-r shrink-0 flex-col md:justify-between' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/10 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center font-black text-xl shadow-sm">
              {business.logo_url || business.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              {business.verification_status === 'verified' && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified</span>
                </div>
              )}
              {business.is_featured && (
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-[11px] font-bold ml-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Featured</span>
                </div>
              )}
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleToggleSave}
            title={saved ? 'Remove from Saved' : 'Save Business'}
            className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-sm"
          >
            <Bookmark className={`w-4 h-4 ${saved ? 'fill-blue-600 text-blue-600' : ''}`} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <Link
                href={`/local-biz/businesses/${business.slug}`}
                className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1"
              >
                {business.name}
              </Link>
            </div>

            {/* Rating & City Location */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-3">
              <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-bold px-2 py-0.5 rounded-lg border border-amber-200/60 dark:border-amber-800/50">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{business.rating ? business.rating.toFixed(1) : '4.8'}</span>
                <span className="text-[10px] text-amber-600/80 font-normal">
                  ({business.reviews_count || 42})
                </span>
              </div>

              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  {business.area ? `${business.area}, ` : ''}
                  {business.city?.name || 'India'}
                </span>
              </div>

              <div className="flex items-center gap-1 text-emerald-600 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>Open Now</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {business.short_description || business.description}
            </p>
          </div>

          {/* Action Buttons: Call, WhatsApp, Get Quote, View Profile */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2">
            {business.phone ? (
              <a
                href={`tel:${business.phone}`}
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-blue-600" />
                <span>Call</span>
              </a>
            ) : (
              <span />
            )}

            {business.whatsapp ? (
              <a
                href={`https://wa.me/${business.whatsapp.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(
                  business.name
                )},%20I%20found%20your%20business%20on%20Nammabus%20India.%20Please%20share%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-xs border border-emerald-500/20 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            ) : (
              <span />
            )}

            <button
              onClick={() => setEnquiryOpen(true)}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold text-xs border border-amber-500/20 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Get Quote</span>
            </button>

            <Link
              href={`/local-biz/businesses/${business.slug}`}
              className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm shadow-blue-600/20 transition-colors"
            >
              <span>Details</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </article>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        businessId={business.id}
        businessName={business.name}
      />
    </>
  );
};
