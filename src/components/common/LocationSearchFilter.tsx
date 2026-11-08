'use client';

import React from 'react';
import { Search, MapPin, Navigation, X } from 'lucide-react';
import { STATES, UNION_TERRITORIES, getDistrictsForState } from '@/lib/india';

export interface LocationSearchFilterProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  selectedState: string;
  onStateChange: (state: string) => void;
  selectedDistrict: string;
  onDistrictChange: (district: string) => void;
  onSearchSubmit?: (e: React.FormEvent) => void;
  placeholder?: string;
  className?: string;
  showSearchButton?: boolean;
}

export const LocationSearchFilter: React.FC<LocationSearchFilterProps> = ({
  searchQuery = '',
  onSearchChange,
  selectedState,
  onStateChange,
  selectedDistrict,
  onDistrictChange,
  onSearchSubmit,
  placeholder = 'Search business, technician, photographer, service, pincode...',
  className = '',
  showSearchButton = true,
}) => {
  const isStateSelected = Boolean(selectedState && selectedState !== 'All India');
  const availableDistricts = isStateSelected ? getDistrictsForState(selectedState) : [];

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextState = e.target.value;
    onStateChange(nextState);
    // Changing state resets the district. Going back to "All India" clears both.
    onDistrictChange('');
  };

  const handleDistrictSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onDistrictChange(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full bg-white dark:bg-slate-900 rounded-2xl md:rounded-3xl p-3 md:p-3.5 border border-slate-200 dark:border-slate-800 shadow-xl transition-all ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2 sm:gap-2.5 items-center">
        {/* 1. Keyword / Search Query Input */}
        <div className="col-span-1 sm:col-span-2 md:col-span-5 relative flex items-center">
          <label htmlFor="location-filter-keyword" className="sr-only">
            Search keywords
          </label>
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            id="location-filter-keyword"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder={placeholder}
            className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
          />
          {searchQuery && onSearchChange && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 2. State / UT Dropdown */}
        <div className="col-span-1 md:col-span-3 relative flex items-center">
          <label htmlFor="state-ut-select" className="sr-only">
            Select State or Union Territory
          </label>
          <MapPin className="w-4 h-4 text-blue-500 absolute left-3 pointer-events-none" />
          <select
            id="state-ut-select"
            name="state"
            value={selectedState || 'All India'}
            onChange={handleStateSelect}
            className="w-full pl-9 pr-7 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer transition-all shadow-inner appearance-none truncate"
          >
            <option value="All India">All India</option>
            <optgroup label="States (28)">
              {STATES.map((s) => (
                <option key={s.name} value={s.name} className="dark:bg-slate-900 text-slate-900 dark:text-white">
                  {s.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Union Territories (8)">
              {UNION_TERRITORIES.map((ut) => (
                <option key={ut.name} value={ut.name} className="dark:bg-slate-900 text-slate-900 dark:text-white">
                  {ut.name}
                </option>
              ))}
            </optgroup>
          </select>
          <span className="absolute right-3 pointer-events-none text-slate-400 text-xs">▾</span>
        </div>

        {/* 3. District Dropdown (Cascading) */}
        <div className="col-span-1 md:col-span-3 relative flex items-center">
          <label htmlFor="district-select" className="sr-only">
            Select District
          </label>
          <Navigation className={`w-4 h-4 absolute left-3 pointer-events-none ${isStateSelected ? 'text-emerald-500' : 'text-slate-400'}`} />
          <select
            id="district-select"
            name="district"
            disabled={!isStateSelected}
            value={selectedDistrict || ''}
            onChange={handleDistrictSelect}
            className={`w-full pl-9 pr-7 py-2.5 rounded-xl border transition-all text-xs sm:text-sm font-semibold shadow-inner appearance-none truncate ${
              isStateSelected
                ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer'
                : 'border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-75'
            }`}
          >
            {!isStateSelected ? (
              <option value="">Select state first</option>
            ) : (
              <>
                <option value="">All districts in {selectedState}</option>
                {availableDistricts.map((d) => (
                  <option key={d} value={d} className="dark:bg-slate-900 text-slate-900 dark:text-white">
                    {d}
                  </option>
                ))}
              </>
            )}
          </select>
          <span className="absolute right-3 pointer-events-none text-slate-400 text-xs">▾</span>
        </div>

        {/* 4. Search Submit Button */}
        {showSearchButton && (
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <button
              type="submit"
              className="w-full min-h-[42px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl flex items-center justify-center font-bold shadow-md hover:shadow-lg transition-all cursor-pointer"
              title="Apply Location Filter"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </form>
  );
};
