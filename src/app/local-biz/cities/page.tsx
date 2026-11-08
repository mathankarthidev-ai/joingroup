'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, ChevronRight, ArrowRight, Building, Search, Globe, Filter } from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { SEED_CITIES, INDIAN_STATES_AND_CITIES } from '@/lib/local-biz/seed-data';
import { TypewriterText } from '@/components/common/TypewriterText';

export default function CitiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('All');

  const filteredCities = useMemo(() => {
    return SEED_CITIES.filter((city) => {
      if (selectedState !== 'All' && city.state.toLowerCase() !== selectedState.toLowerCase()) {
        return false;
      }
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase().trim();
        return city.name.toLowerCase().includes(q) || city.state.toLowerCase().includes(q);
      }
      return true;
    });
  }, [searchTerm, selectedState]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      <LocalBizHeader />

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs text-blue-300">
            <Link href="/local-biz" className="hover:text-white">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-semibold">Cities Directory</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-2 border border-blue-400/20">
                <Globe className="w-3.5 h-3.5" />
                <span>Pan-India Discovery</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight min-h-[1.5em]">
                Explore Verified Businesses in{' '}
                <TypewriterText
                  words={[
                    'Chennai',
                    'Bangalore',
                    'Mumbai',
                    'Delhi NCR',
                    'Hyderabad',
                    'Ahmedabad',
                    'Pune',
                    'Kolkata',
                  ]}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400"
                  cursorClassName="text-emerald-400"
                />
              </h1>
              <p className="text-sm text-blue-200 max-w-2xl mt-1">
                Discover verified companies, wholesale distributors, local retailers, and certified professionals in {SEED_CITIES.length}+ cities across 28 states and Union Territories.
              </p>
            </div>

            {/* Quick Search Box */}
            <div className="w-full md:w-96">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  placeholder="Search any city or state in India..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 top-3 text-xs text-slate-300 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-6">
        {/* State Filter Buttons */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter by State or Region:
            </span>
            <span>Showing {filteredCities.length} of {SEED_CITIES.length} cities</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
            <button
              onClick={() => setSelectedState('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedState === 'All'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              All States ({SEED_CITIES.length})
            </button>
            {INDIAN_STATES_AND_CITIES.map((g) => (
              <button
                key={g.state}
                onClick={() => setSelectedState(g.state)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedState === g.state
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {g.state} ({g.cities.length})
              </button>
            ))}
          </div>
        </div>

        {/* Cities Grid */}
        {filteredCities.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredCities.map((city) => (
              <Link
                key={city.id}
                href={`/local-biz/businesses?city=${city.slug}`}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-lg transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                    <Building className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {city.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {city.state}
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-bold text-blue-600 dark:text-blue-400">
                  <span>Browse Listings</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <MapPin className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">No Cities Found</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              We couldn't find any cities matching "{searchTerm}".
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedState('All'); }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      <LocalBizFooter />
    </div>
  );
}
