'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  MapPin,
  Briefcase,
  ShieldCheck,
  Star,
  Sparkles,
  Filter,
  CheckCircle2,
  Users,
  Award,
  PhoneCall,
  UserCheck,
} from 'lucide-react';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { ProfessionalCard } from '@/components/local-biz/ProfessionalCard';
import { LocalBizStore } from '@/lib/local-biz/store';
import { Professional } from '@/types/local-biz';
import { JustdialHeroStrip } from '@/components/common/JustdialHeroStrip';
import { TypewriterText } from '@/components/common/TypewriterText';
import { STATES, UNION_TERRITORIES, getDistrictsForState, CITY_TO_DISTRICT_MAP } from '@/lib/india';

export default function ProfessionalsDirectoryPage() {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [professions, setProfessions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState('All India');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedProfession, setSelectedProfession] = useState('All Professions');
  const [onlyFeatured, setOnlyFeatured] = useState(false);

  const isStateSelected = Boolean(selectedState && selectedState !== 'All India');
  const availableDistricts = useMemo(() => {
    return isStateSelected ? getDistrictsForState(selectedState) : [];
  }, [isStateSelected, selectedState]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [profList, profCats] = await Promise.all([
          LocalBizStore.getProfessionals(),
          LocalBizStore.getProfessionsList(),
        ]);
        setProfessionals(profList);
        setProfessions(profCats);
      } catch (err) {
        console.error('Failed to load professionals:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const filteredProfessionals = useMemo(() => {
    return professionals.filter((prof) => {
      // State filter
      if (isStateSelected) {
        const sLower = selectedState.toLowerCase().trim();
        const mapped = CITY_TO_DISTRICT_MAP[prof.city_name.toLowerCase()];
        const matchState =
          (prof.state && prof.state.toLowerCase() === sLower) ||
          (mapped && mapped.state.toLowerCase() === sLower);
        if (!matchState) return false;
      }

      // District filter
      if (selectedDistrict) {
        const dLower = selectedDistrict.toLowerCase().trim();
        const mapped = CITY_TO_DISTRICT_MAP[prof.city_name.toLowerCase()];
        const matchDistrict =
          (prof.district && prof.district.toLowerCase() === dLower) ||
          (mapped && mapped.district.toLowerCase() === dLower) ||
          prof.city_name.toLowerCase().includes(dLower) ||
          dLower.includes(prof.city_name.toLowerCase());
        if (!matchDistrict) return false;
      }

      // City filter
      if (selectedCity !== 'All Cities' && prof.city_name.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Profession filter
      if (selectedProfession !== 'All Professions' && prof.profession.toLowerCase() !== selectedProfession.toLowerCase()) {
        return false;
      }

      // Featured filter
      if (onlyFeatured && !prof.is_featured) {
        return false;
      }

      // Search term
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const matchesName = prof.name.toLowerCase().includes(q);
        const matchesTitle = prof.title.toLowerCase().includes(q);
        const matchesProfession = prof.profession.toLowerCase().includes(q);
        const matchesQual = prof.qualification.toLowerCase().includes(q);
        const matchesArea = prof.area.toLowerCase().includes(q);
        const matchesCity = prof.city_name.toLowerCase().includes(q);
        const matchesSpecs = prof.specializations.some((s) => s.toLowerCase().includes(q));
        const matchesServices = prof.services_offered.some((s) => s.toLowerCase().includes(q));

        if (!matchesName && !matchesTitle && !matchesProfession && !matchesQual && !matchesArea && !matchesCity && !matchesSpecs && !matchesServices) {
          return false;
        }
      }

      return true;
    });
  }, [professionals, isStateSelected, selectedState, selectedDistrict, selectedCity, selectedProfession, onlyFeatured, search]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200">
      <LocalBizHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white pt-12 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Nammabus • Verified Practice Directory</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight min-h-[2.4em] md:min-h-[2.2em]">
              Hire Verified{' '}
              <TypewriterText
                words={[
                  'Event Photographers',
                  'AC & Electrical Techs',
                  'Bridal Makeup & Mehendi',
                  'Caterers & Home Bakers',
                  'Boutique Tailors',
                  'Building Contractors',
                  'Packers & Movers',
                  'Tutors & Trainers',
                ]}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-emerald-400"
                cursorClassName="text-emerald-400"
              />
            </h1>

            <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Connect directly with credential-checked professionals across India. Zero broker fees, transparent consultation charges, and instant direct WhatsApp contact.
            </p>

            {/* Live Search & Filter Bar */}
            <div className="pt-4 max-w-3xl mx-auto space-y-2.5">
              {/* AI Search Tip */}
              <div className="flex items-center justify-between gap-2 px-3.5 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200 text-xs font-medium backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0 animate-pulse" />
                  <span>
                    <strong>AI Search Tip:</strong> Enter <strong>Area Name, Pincode &amp; City</strong> to find verified technicians, photographers &amp; specialists faster in AI.
                  </span>
                </div>
                <span className="hidden sm:inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Query-Based AI
                </span>
              </div>

              <div className="p-2 md:p-2.5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex flex-col md:flex-row gap-2">
                <div className="flex-1 relative flex items-center">
                  <Search className="w-5 h-5 text-purple-400 absolute left-3.5" />
                  <input
                    type="text"
                    placeholder="Search technicians, photographers, caterers, area or pincode (e.g. T. Nagar, 600017)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 border border-transparent shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* State / UT Dropdown */}
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedDistrict('');
                    }}
                    aria-label="Select State or Union Territory"
                    className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="All India">All India</option>
                    <optgroup label="States (28)">
                      {STATES.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Union Territories (8)">
                      {UNION_TERRITORIES.map((ut) => (
                        <option key={ut.name} value={ut.name}>
                          {ut.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>

                  {/* District Dropdown (Cascading) */}
                  <select
                    disabled={!isStateSelected}
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    aria-label="Select District"
                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isStateSelected
                        ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 cursor-pointer'
                        : 'bg-white/40 dark:bg-slate-900/40 text-slate-400 cursor-not-allowed opacity-60'
                    }`}
                  >
                    {!isStateSelected ? (
                      <option value="">Select state first</option>
                    ) : (
                      <>
                        <option value="">All districts in {selectedState}</option>
                        {availableDistricts.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </>
                    )}
                  </select>

                  {/* Profession Dropdown */}
                  <select
                    value={selectedProfession}
                    onChange={(e) => setSelectedProfession(e.target.value)}
                    aria-label="Select Profession"
                    className="px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="All Professions">All Professions</option>
                    {professions.map((prof) => (
                      <option key={prof} value={prof}>
                        {prof}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Badges / Highlights */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4 text-xs text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Bar & Institute Members
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Direct WhatsApp & Call
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Transparent Consultation Fees
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 py-8 -mt-6 space-y-6">
          {/* Justdial Hero Feature Strip */}
          <JustdialHeroStrip variant="professionals" />

          {/* Filter Pills */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </span>
              <button
                onClick={() => setSelectedProfession('All Professions')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedProfession === 'All Professions'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All ({professionals.length})
              </button>
              {professions.map((prof) => {
                const count = professionals.filter((p) => p.profession === prof).length;
                return (
                  <button
                    key={prof}
                    onClick={() => setSelectedProfession(prof)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      selectedProfession === prof
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {prof} ({count})
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyFeatured}
                  onChange={(e) => setOnlyFeatured(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Featured Only</span>
              </label>
            </div>
          </div>

          {/* Results Count & Reset */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400">
              Showing <span className="font-bold text-slate-900 dark:text-white">{filteredProfessionals.length}</span> verified {filteredProfessionals.length === 1 ? 'professional' : 'professionals'}
              {selectedDistrict ? ` in ${selectedDistrict}, ${selectedState}` : isStateSelected ? ` in ${selectedState}` : ' across India'}
              {selectedProfession !== 'All Professions' && ` for ${selectedProfession}`}
            </h2>

            {(search || isStateSelected || selectedDistrict || selectedCity !== 'All Cities' || selectedProfession !== 'All Professions' || onlyFeatured) && (
              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setSelectedState('All India');
                  setSelectedDistrict('');
                  setSelectedCity('All Cities');
                  setSelectedProfession('All Professions');
                  setOnlyFeatured(false);
                }}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Professionals Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProfessionals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProfessionals.map((prof) => (
                <ProfessionalCard key={prof.id} professional={prof} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <Users className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">No professionals match your query</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-5">
                We couldn't find any verified professionals matching your current filters. Try resetting the filters or searching with another keyword.
              </p>
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCity('All Cities');
                  setSelectedProfession('All Professions');
                  setOnlyFeatured(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* Join as Professional Banner */}
          <div className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-blue-800">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-800/80 text-blue-200 text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Professional Practice Onboarding</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold">Are you an AC Tech, Photographer, Caterer, or Specialist?</h3>
              <p className="text-sm text-blue-200 max-w-xl">
                Get listed on India's trusted local business and specialist directory. Receive verified customer booking requests directly on WhatsApp.
              </p>
            </div>
            <Link
              href="/local-biz/add-business"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-blue-50 text-blue-900 font-bold text-sm shrink-0 shadow-md transition-all flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>List Your Services for Free</span>
            </Link>
          </div>
        </section>
      </main>

      <LocalBizFooter />
    </div>
  );
}
