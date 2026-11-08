'use client';

import React from 'react';
import { Search, Filter, Globe, MapPin, Layers, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';
import { SAFE_COUNTRIES, CATEGORIES, TOP_30_PLATFORMS, PLATFORM_MAP } from '@/lib/data';
import { Platform } from '@/lib/types';

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (val: string) => void;
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
  selectedState: string;
  setSelectedState: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  onlyVerified: boolean;
  setOnlyVerified: (val: boolean) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedPlatform,
  setSelectedPlatform,
  selectedCountry,
  setSelectedCountry,
  selectedState,
  setSelectedState,
  selectedCity,
  setSelectedCity,
  selectedCategory,
  setSelectedCategory,
  onlyVerified,
  setOnlyVerified,
}) => {
  // Cascading Location Logic
  const currentCountryObj = SAFE_COUNTRIES.find((c) => c.slug === selectedCountry);
  
  // Available states: if country selected, get states for that country; else accumulate all states from all safe countries
  const availableStates = currentCountryObj
    ? currentCountryObj.states
    : SAFE_COUNTRIES.flatMap((c) => c.states || []);

  const currentStateObj = availableStates.find((s) => s.slug === selectedState);
  
  // Available cities: if state selected, get cities for that state; else accumulate all cities
  const availableCities = currentStateObj
    ? currentStateObj.cities
    : availableStates.flatMap((s) => s.cities || []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('all');
    setSelectedCountry('all');
    setSelectedState('all');
    setSelectedCity('all');
    setSelectedCategory('all');
    setOnlyVerified(false);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedPlatform !== 'all' ||
    selectedCountry !== 'all' ||
    selectedState !== 'all' ||
    selectedCity !== 'all' ||
    selectedCategory !== 'all' ||
    onlyVerified;

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 md:p-6 shadow-sm space-y-4">
      {/* Search Header Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-500" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
            Directory Filters & Search Matrix
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        )}
      </div>

      {/* AI Search Engine Tip */}
      <div className="flex items-center gap-2 p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20 text-xs">
        <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 animate-pulse" />
        <span className="text-slate-700 dark:text-slate-300 font-medium">
          <strong className="text-emerald-600 dark:text-emerald-400 font-bold">✨ AI Search Tip:</strong> Enter <strong>Area Name, Pincode (e.g. 600017) and City</strong> to get business and community group search faster in AI.
        </span>
      </div>

      {/* Main Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by keyword, channel name, area name or 6-digit pincode (e.g. T. Nagar 600017, Chennai)..."
          className="w-full pl-11 pr-20 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white placeholder-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2.5 py-1 rounded-xl bg-slate-200 dark:bg-slate-800"
          >
            Clear
          </button>
        )}
      </div>

      {/* FILTER DROPDOWN MATRIX */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
        {/* 1. PLATFORM DROPDOWN */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
            Platform
          </label>
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">All Platforms</option>
            {TOP_30_PLATFORMS.map((pkey) => {
              const p = PLATFORM_MAP[pkey];
              return (
                <option key={pkey} value={pkey}>
                  {pkey === 'arattai' ? '⭐ ' : ''}{p.name}
                </option>
              );
            })}
          </select>
        </div>

        {/* 2. SAFE COUNTRY DROPDOWN */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
            Safe Country
          </label>
          <select
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              setSelectedState('all');
              setSelectedCity('all');
            }}
            className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">All Safe Countries</option>
            {SAFE_COUNTRIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.flag} {c.name} ({c.groupCountText})
              </option>
            ))}
          </select>
        </div>

        {/* 3. STATE / REGION DROPDOWN */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
            State / Region
          </label>
          <select
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedCity('all');
            }}
            className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">All States</option>
            {availableStates.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* 4. CITY DROPDOWN */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
            City
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">All Cities</option>
            {availableCities.map((ci) => (
              <option key={ci.slug} value={ci.slug}>
                {ci.name}
              </option>
            ))}
          </select>
        </div>

        {/* 5. CATEGORY DROPDOWN */}
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name} ({cat.groupCount})
              </option>
            ))}
          </select>
        </div>

        {/* 6. ONLY VERIFIED CHECKBOX */}
        <div className="flex flex-col justify-end">
          <label className="w-full flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 cursor-pointer hover:bg-emerald-500/20 transition-all">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Only Verified</span>
            </span>
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
            />
          </label>
        </div>
      </div>
    </div>
  );
};
