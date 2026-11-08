'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Wrench, Search, ChevronRight, Sparkles } from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { ServiceCard } from '@/components/local-biz/ServiceCard';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Service } from '@/types/local-biz';
import { JustdialHeroStrip } from '@/components/common/JustdialHeroStrip';
import { TypewriterText } from '@/components/common/TypewriterText';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const list = await LocalBizStore.getServices();
        setServices(list);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filtered = services.filter((s) => {
    if (!searchTerm.trim()) return true;
    const tokens = searchTerm.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const target = `${s.name} ${s.description} ${s.business_name || ''}`.toLowerCase();
    return tokens.every((tok) => target.includes(tok)) || tokens.some((tok) => target.includes(tok));
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      <LocalBizHeader />

      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/local-biz" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 dark:text-slate-200 font-semibold">Services</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-900 dark:text-white min-h-[1.5em]">
                Book Verified{' '}
                <TypewriterText
                  words={[
                    'AC Techs & Electricians',
                    'Wedding Photographers',
                    'Caterers & Home Bakers',
                    'Architects & Designers',
                    'IT & Web Specialists',
                    'Home Repairs & AMC',
                  ]}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
                />
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Book verified electricians, AC repair experts, wedding photographers, caterers, home repairs, and IT solutions.
              </p>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search services, area name, pincode (e.g. 600017)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* AI Search Prompt / Location & Pincode Notice */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 animate-pulse" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">
              <strong className="text-emerald-600 dark:text-emerald-400 font-bold">✨ AI Search Tip:</strong> Enter <strong>Area Name, Pincode (e.g. 600017) and City</strong> to find verified local services and technicians faster in AI.
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        <JustdialHeroStrip variant="local-biz" />

        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">Loading services...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-500 text-sm">
            No services match your search.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((srv) => (
              <ServiceCard key={srv.id} service={srv} />
            ))}
          </div>
        )}
      </main>

      <LocalBizFooter />
    </div>
  );
}
