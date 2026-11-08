'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Wrench, ShieldCheck, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Service } from '@/types/local-biz';
import { EnquiryModal } from './EnquiryModal';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-blue-500/50 hover:shadow-lg transition-all duration-300 p-5 flex flex-col justify-between group">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-50 to-teal-50 dark:from-slate-800 dark:to-slate-700 text-3xl flex items-center justify-center border border-slate-200/60 dark:border-slate-700">
              {service.image_url || '🛠️'}
            </div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 capitalize">
              {service.price_type?.replace('_', ' ') || 'Fixed'}
            </span>
          </div>

          <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
            {service.name}
          </h3>

          {/* Pricing */}
          <div className="text-emerald-600 dark:text-emerald-400 font-black text-lg mb-2">
            {service.price ? `₹${service.price.toLocaleString('en-IN')}` : 'Contact for Pricing'}
            {service.price_type === 'starting_from' && (
              <span className="text-xs font-normal text-slate-400 ml-1">onwards</span>
            )}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {service.description}
          </p>

          {/* Provider Info */}
          {service.business && (
            <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 mb-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    {service.business.name}
                  </span>
                  {service.business.verification_status === 'verified' && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  )}
                </div>
                <div className="text-[10px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />
                  <span>
                    {service.business.area ? `${service.business.area}, ` : ''}
                    {service.business.city?.name || 'India'}
                  </span>
                </div>
              </div>
              <Link
                href={`/local-biz/businesses/${service.business.slug}`}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700 shrink-0"
              >
                View
              </Link>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={() => setEnquiryOpen(true)}
            className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Book Service</span>
          </button>
          {service.business?.phone ? (
            <a
              href={`tel:${service.business.phone}`}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all text-center"
            >
              <span>Call Provider</span>
            </a>
          ) : (
            <button
              onClick={() => setEnquiryOpen(true)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Inquire</span>
            </button>
          )}
        </div>
      </div>

      <EnquiryModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        businessId={service.business_id}
        businessName={service.business?.name}
        productName={service.name}
      />
    </>
  );
};
