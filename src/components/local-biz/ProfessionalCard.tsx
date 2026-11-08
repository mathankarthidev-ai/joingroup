'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Clock,
  Send,
} from 'lucide-react';
import { Professional } from '@/types/local-biz';
import { EnquiryModal } from './EnquiryModal';

interface ProfessionalCardProps {
  professional: Professional;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <article className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col overflow-hidden">
        {/* Top Header & Avatar */}
        <div className="relative bg-gradient-to-tr from-slate-50 to-blue-50/50 dark:from-slate-800/80 dark:to-slate-800/40 p-5 border-b border-slate-100 dark:border-slate-800 flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-700 shadow-md bg-slate-100 dark:bg-slate-800">
              <img
                src={professional.avatar_url}
                alt={professional.name}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onError={(e) => {
                  // Fallback avatar icon
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            {professional.verification_status === 'verified' && (
              <span
                title="Verified Professional Credential"
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm border-2 border-white dark:border-slate-900"
              >
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                <Briefcase className="w-3 h-3" />
                <span>{professional.profession}</span>
              </span>
              {professional.is_featured && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 text-[11px] font-bold">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Featured</span>
                </span>
              )}
            </div>

            <Link href={`/local-biz/professionals/${professional.slug}`}>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {professional.name}
              </h3>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium line-clamp-1 mt-0.5">
              {professional.title}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            {/* Qualification & Experience */}
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5 font-medium line-clamp-1 pr-2">
                <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{professional.qualification}</span>
              </span>
              <span className="shrink-0 font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {professional.experience_years}+ Yrs Exp
              </span>
            </div>

            {/* Location & Consultation Fee */}
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{professional.area}, {professional.city_name}</span>
              </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                {professional.consultation_fee}
              </span>
            </div>

            {/* About Bio Snippet */}
            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
              {professional.about}
            </p>

            {/* Specializations Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {professional.specializations.slice(0, 3).map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
                >
                  {spec}
                </span>
              ))}
              {professional.specializations.length > 3 && (
                <span className="px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-800/50 text-slate-400 text-[11px]">
                  +{professional.specializations.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Rating & Availability */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{professional.rating.toFixed(1)}</span>
              </div>
              <span className="text-slate-400">({professional.reviews_count} reviews)</span>
            </div>
            {professional.is_available && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Accepting Clients</span>
              </span>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex items-center gap-2">
            <a
              href={`https://wa.me/${professional.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(professional.name)},%20I%20found%20your%20profile%20on%20Nammabus%20Directory%20and%20would%20like%20to%20consult.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => setEnquiryOpen(true)}
              className="py-2.5 px-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center gap-1.5 border border-blue-200 dark:border-blue-800 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Consult</span>
            </button>

            <Link
              href={`/local-biz/professionals/${professional.slug}`}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all"
              title="View Complete Profile & Credentials"
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* Quick Consultation Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        businessId={professional.id}
        businessName={professional.name}
      />
    </>
  );
};
