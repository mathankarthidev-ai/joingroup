'use client';

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Search, Sparkles } from 'lucide-react';
import { TOP_100_INDIAN_CITIES, CityItem } from '@/lib/local-biz/top-100-cities';

export type { CityItem };
export const TOP_CITIES_DATA = TOP_100_INDIAN_CITIES;

const CITY_ALIASES: Record<string, string[]> = {
  coimbatore: ['cbe', 'kovai'],
  bangalore: ['blr', 'bengaluru'],
  delhi: ['del', 'ncr', 'new delhi'],
  hyderabad: ['hyd', 'secunderabad'],
  mumbai: ['bom', 'bombay'],
  chennai: ['maa', 'madras', 'chn'],
  kolkata: ['ccu', 'calcutta'],
  pune: ['pnq', 'poona'],
  surat: ['srt'],
  ahmedabad: ['amd', 'amdavad'],
  jaipur: ['jpr', 'pink city'],
  lucknow: ['lko'],
  tiruchirappalli: ['trichy', 'tpj'],
  thiruvananthapuram: ['trivandrum', 'trv'],
  visakhapatnam: ['vizag'],
  kochi: ['cochin'],
  varanasi: ['banaras', 'kashi'],
  amritsar: ['asr', 'golden temple'],
  bhopal: ['bpl'],
  patna: ['pat'],
  madurai: ['ixm', 'temple city'],
};

interface CityScrollStripProps {
  onSelectCity?: (cityName: string) => void;
  selectedCity?: string;
  variant?: 'hero-sidebar' | 'full-width';
}

export const CityScrollStrip: React.FC<CityScrollStripProps> = ({
  onSelectCity,
  selectedCity = '',
  variant = 'hero-sidebar',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [citySearchQuery, setCitySearchQuery] = useState('');

  // Filter cities by search query (name, state, landmark, acronym/alias)
  const filteredCities = useMemo(() => {
    if (!citySearchQuery.trim()) return TOP_100_INDIAN_CITIES;
    const q = citySearchQuery.toLowerCase().trim();

    return TOP_100_INDIAN_CITIES.filter((city) => {
      const nameMatch = city.name.toLowerCase().includes(q);
      const stateMatch = city.state.toLowerCase().includes(q);
      const landmarkMatch = city.landmark.toLowerCase().includes(q);
      const aliases = CITY_ALIASES[city.id] || [];
      const aliasMatch = aliases.some((a) => a.includes(q) || q.includes(a));
      return nameMatch || stateMatch || landmarkMatch || aliasMatch;
    });
  }, [citySearchQuery]);

  const checkScroll = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll, filteredCities]);

  // Smooth continuous auto-scroll at calm speed (~25px/sec)
  // Pauses automatically when hovered or when user is actively searching
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const scrollStep = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isHovered && !citySearchQuery && scrollRef.current) {
        const el = scrollRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;

        if (maxScroll > 10) {
          const speed = 0.025 * Math.min(delta, 50);
          if (el.scrollLeft >= maxScroll - 4) {
            el.scrollLeft = 0;
          } else {
            el.scrollLeft += speed;
          }
          checkScroll();
        }
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animId);
  }, [isHovered, citySearchQuery, checkScroll]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className="w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl rounded-3xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xl relative overflow-hidden"
    >
      {/* Header bar with Neat Search & controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5 leading-none">
              <span>Top Cities</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-300/40 dark:border-emerald-700/40">
                100+ Indian Cities
              </span>
            </h4>
            <span className="text-[10px] text-slate-400">
              {citySearchQuery
                ? `Showing ${filteredCities.length} matching cities`
                : 'Slow auto-scroll • Tap city to filter'}
            </span>
          </div>
        </div>

        {/* Search & Navigation Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Neat Search Input */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={citySearchQuery}
              onChange={(e) => setCitySearchQuery(e.target.value)}
              placeholder="Search city (e.g. CBE, Surat, Jaipur)..."
              className="w-full pl-8 pr-7 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-slate-400 transition-all shadow-inner"
            />
            {citySearchQuery && (
              <button
                type="button"
                onClick={() => setCitySearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Scroll Arrows */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => handleScroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll cities left"
              className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollLeft
                  ? 'border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleScroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll cities right"
              className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                canScrollRight
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-500 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Animated Scroll Track with Gradient Edge Masks */}
      <div className="relative">
        {/* Left Fade Mask */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        )}
        {/* Right Fade Mask */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        )}

        {/* Empty state if search has 0 matches */}
        {filteredCities.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">
            No cities found matching &quot;{citySearchQuery}&quot;. Try typing &quot;CBE&quot;, &quot;Tamil Nadu&quot;, or &quot;Gujarat&quot;.
          </div>
        ) : (
          /* Horizontal continuous scroll container */
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="grid grid-rows-2 grid-flow-col auto-cols-[125px] sm:auto-cols-[135px] gap-3 overflow-x-auto scrollbar-none p-1"
          >
            {filteredCities.map((city) => {
              const isSelected = selectedCity.toLowerCase() === city.name.toLowerCase();

              return (
                <div
                  key={city.id}
                  onClick={() => {
                    if (onSelectCity) {
                      onSelectCity(city.name);
                    }
                  }}
                  className={`group relative flex flex-col rounded-2xl overflow-hidden p-2 bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border transition-all duration-300 cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'border-blue-500 ring-2 ring-blue-500/40 shadow-lg shadow-blue-500/15 scale-[1.02]'
                      : 'border-slate-200/70 dark:border-slate-700/60 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:scale-105'
                  }`}
                >
                  {/* Image Container with Landmark Zoom & Shimmer Sweep Animation */}
                  <div className="relative w-full h-18 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-120 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url('${city.imageUrl}')` }}
                      aria-label={`${city.name} - ${city.landmark}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                    {/* Shimmer sweep effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    {/* Top landmark tooltip badge on hover */}
                    <div className="absolute top-1 left-1.5 max-w-[85%] px-1.5 py-0.5 rounded-md bg-black/75 backdrop-blur-sm text-[8px] font-semibold text-white truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-sm pointer-events-none">
                      {city.landmark}
                    </div>

                    {/* Active Selection Check Badge */}
                    {isSelected && (
                      <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full bg-blue-600 text-white text-[8px] font-black shadow-sm flex items-center gap-0.5">
                        <span>✓</span>
                        <span>Selected</span>
                      </div>
                    )}

                    {/* City Listing Tag */}
                    <span className="absolute bottom-1 left-1.5 text-[8px] font-black text-white/95 drop-shadow-sm flex items-center gap-0.5">
                      <Sparkles className="w-2.5 h-2.5 text-amber-300" />
                      <span>{city.listingCount}</span>
                    </span>
                  </div>

                  {/* City Name & State */}
                  <div className="pt-1.5 text-center">
                    <span className="block text-xs font-black text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight truncate">
                      {city.name}
                    </span>
                    <span className="block text-[9px] text-slate-400 truncate mt-0.5">
                      {city.state}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CityScrollStrip;
