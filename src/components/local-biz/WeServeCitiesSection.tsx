'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { MapPin, Search, ChevronDown, ChevronUp, Globe, Building2, ExternalLink } from 'lucide-react';
import { INDIAN_STATES_AND_CITIES } from '@/lib/local-biz/cities-data';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[()]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const WeServeCitiesSection: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expanded, setExpanded] = useState<boolean>(false);

  // Total count of cities
  const totalCitiesCount = useMemo(() => {
    return INDIAN_STATES_AND_CITIES.reduce((acc, curr) => acc + curr.cities.length, 0);
  }, []);

  // Filtered states and cities based on search and selected state
  const displayedGroups = useMemo(() => {
    let groups = INDIAN_STATES_AND_CITIES;

    if (selectedState !== 'All') {
      groups = groups.filter((g) => g.state.toLowerCase() === selectedState.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return groups
        .map((g) => {
          const matchingCities = g.cities.filter(
            (c) => c.toLowerCase().includes(q) || g.state.toLowerCase().includes(q)
          );
          return {
            state: g.state,
            cities: matchingCities,
          };
        })
        .filter((g) => g.cities.length > 0);
    }

    return groups;
  }, [selectedState, searchQuery]);

  return (
    <section className="border-b border-slate-800 bg-slate-950/90 text-slate-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-2">
              <Globe className="w-3.5 h-3.5" />
              <span>Pan-India Business &amp; Service Network</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              We Serve These Cities &amp; States
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Discover verified retail shops, manufacturers, industrial suppliers, corporate services, and licensed professionals in <span className="text-white font-bold">{totalCitiesCount}+ cities</span> across 28 Indian States &amp; Union Territories.
            </p>
          </div>

          {/* Quick City Search Bar */}
          <div className="w-full md:w-80 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search city (e.g. Pune, Noida, Surat)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim() && !expanded) setExpanded(true);
                }}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* State Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800">
          <button
            onClick={() => setSelectedState('All')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedState === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All States ({INDIAN_STATES_AND_CITIES.length})
          </button>
          {INDIAN_STATES_AND_CITIES.map((g) => (
            <button
              key={g.state}
              onClick={() => {
                setSelectedState(g.state);
                setExpanded(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedState === g.state
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {g.state} ({g.cities.length})
            </button>
          ))}
        </div>

        {/* States & Cities Listing Grid */}
        <div
          className={`space-y-6 transition-all duration-300 overflow-hidden ${
            !expanded ? 'max-h-[380px] relative' : ''
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedGroups.map((group) => (
              <div
                key={group.state}
                className="bg-slate-900/60 rounded-2xl p-4 border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
                    <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>{group.state}</span>
                    </h4>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {group.cities.length} cities
                    </span>
                  </div>

                  {/* City Pills Links */}
                  <div className="flex flex-wrap gap-1.5">
                    {group.cities.map((city) => {
                      const citySlug = slugify(city);
                      return (
                        <Link
                          key={city}
                          href={`/local-biz/businesses?city=${citySlug}`}
                          className="px-2 py-1 rounded-md bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-300 text-[11px] font-medium transition-colors"
                          title={`Find verified businesses in ${city}, ${group.state}`}
                        >
                          {city}
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/60 text-right">
                  <Link
                    href={`/local-biz/businesses?state=${encodeURIComponent(group.state)}`}
                    className="text-[11px] text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
                  >
                    <span>Browse {group.state}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {displayedGroups.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs">
              No cities found matching "{searchQuery}". Try another keyword or reset the filter.
            </div>
          )}

          {/* Fade overlay when collapsed */}
          {!expanded && (
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none"></div>
          )}
        </div>

        {/* Expand / Collapse Button */}
        <div className="pt-2 text-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 transition-all shadow-sm"
          >
            <span>{expanded ? 'Show Less Cities' : `View All ${totalCitiesCount}+ Cities in India`}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </section>
  );
};
