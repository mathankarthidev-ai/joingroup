'use client';

import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Building2,
  MapPin,
  ChevronDown,
  Search,
  PlusCircle,
  Sparkles,
  User,
  Users,
  UserPlus,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ShieldCheck,
  LayoutDashboard,
  Store,
  ArrowLeft,
  ChevronRight,
  Trophy,
} from 'lucide-react';
import { getStoredUser, clearStoredUser, onAuthStateChange } from '@/lib/auth';
import { UserProfile } from '@/lib/types';
import { LoginModal } from './LoginModal';
import { SEED_CITIES } from '@/lib/local-biz/seed-data';
import { STATES, UNION_TERRITORIES, ALL_INDIA_LOCATIONS, getDistrictsForState } from '@/lib/india';
import { MobileBottomNav } from './MobileBottomNav';
import { BusinessAnnouncementBanner } from './BusinessAnnouncementBanner';

export const Header: React.FC = () => {
  return (
    <Suspense fallback={<div className="h-[74px] bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800" />}>
      <HeaderContent />
    </Suspense>
  );
};

const TOP_INDIAN_DISTRICTS: { district: string; state: string }[] = [
  { district: 'Mumbai', state: 'Maharashtra' },
  { district: 'Bengaluru Urban', state: 'Karnataka' },
  { district: 'Chennai', state: 'Tamil Nadu' },
  { district: 'Hyderabad', state: 'Telangana' },
  { district: 'Pune', state: 'Maharashtra' },
  { district: 'Ahmedabad', state: 'Gujarat' },
  { district: 'Jaipur', state: 'Rajasthan' },
  { district: 'Coimbatore', state: 'Tamil Nadu' },
  { district: 'Surat', state: 'Gujarat' },
  { district: 'Lucknow', state: 'Uttar Pradesh' },
  { district: 'Kolkata', state: 'West Bengal' },
  { district: 'Indore', state: 'Madhya Pradesh' },
  { district: 'Nagpur', state: 'Maharashtra' },
  { district: 'Patna', state: 'Bihar' },
  { district: 'Bhopal', state: 'Madhya Pradesh' },
  { district: 'Thane', state: 'Maharashtra' },
  { district: 'Visakhapatnam', state: 'Andhra Pradesh' },
  { district: 'Vadodara', state: 'Gujarat' },
  { district: 'Ghaziabad', state: 'Uttar Pradesh' },
  { district: 'Ludhiana', state: 'Punjab' },
  { district: 'Agra', state: 'Uttar Pradesh' },
  { district: 'Nashik', state: 'Maharashtra' },
  { district: 'Faridabad', state: 'Haryana' },
  { district: 'Meerut', state: 'Uttar Pradesh' },
  { district: 'Rajkot', state: 'Gujarat' },
  { district: 'Varanasi', state: 'Uttar Pradesh' },
  { district: 'Madurai', state: 'Tamil Nadu' },
  { district: 'Mysuru', state: 'Karnataka' },
  { district: 'Tiruchirappalli', state: 'Tamil Nadu' },
  { district: 'Salem', state: 'Tamil Nadu' },
  { district: 'Tiruppur', state: 'Tamil Nadu' },
  { district: 'Ernakulam', state: 'Kerala' },
  { district: 'Kozhikode', state: 'Kerala' },
  { district: 'Thiruvananthapuram', state: 'Kerala' },
  { district: 'Chandigarh', state: 'Chandigarh' },
  { district: 'New Delhi', state: 'Delhi' },
];

function HeaderContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPlatform = searchParams.get('platform')?.toLowerCase() || 'all';
  const isGroupMode =
    pathname === '/groups' ||
    pathname.startsWith('/groups') ||
    pathname.startsWith('/group') ||
    searchParams.get('tab') === 'groups' ||
    searchParams.get('mode') === 'groups';

  const isGamesMode =
    pathname === '/games' ||
    pathname.startsWith('/games') ||
    searchParams.get('tab') === 'games' ||
    searchParams.get('mode') === 'games';

  const isBusinessPage =
    pathname === '/' ||
    pathname.startsWith('/local-biz') ||
    pathname.startsWith('/businesses') ||
    pathname.startsWith('/categories') ||
    pathname.startsWith('/local-business') ||
    pathname.startsWith('/b2b');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // City Selector Dropdown State
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('All India');
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [drilldownState, setDrilldownState] = useState<string | null>(null);
  const [locationTab, setLocationTab] = useState<'all' | 'states' | 'districts' | 'uts' | 'cities'>('all');
  const locationRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser(getStoredUser());
    const unsubscribe = onAuthStateChange((updatedUser) => {
      setUser(updatedUser);
    });

    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('grouphub_theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    }

    // Close popups on click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(e.target as Node)) {
        setLocationDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      unsubscribe();
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (typeof document !== 'undefined') {
      if (nextDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('grouphub_theme', nextDark ? 'dark' : 'light');
      }
    }
  };

  const handleLogout = () => {
    clearStoredUser();
    setUser(null);
    setUserDropdownOpen(false);
    router.push('/');
  };

  const handleRequireLogin = (targetUrl: string) => {
    if (user) {
      router.push(targetUrl);
    } else {
      setRedirectAfterLogin(targetUrl);
      setLoginModalOpen(true);
    }
  };

  const filteredLocations = useMemo(() => {
    const q = citySearchTerm.toLowerCase().trim();
    if (!q) {
      return {
        states: STATES,
        uts: UNION_TERRITORIES,
        districts: TOP_INDIAN_DISTRICTS,
        cities: SEED_CITIES,
      };
    }

    const states = STATES.filter((s) => s.name.toLowerCase().includes(q));
    const uts = UNION_TERRITORIES.filter((u) => u.name.toLowerCase().includes(q));
    const cities = SEED_CITIES.filter(
      (c) => c.name.toLowerCase().includes(q) || c.state.toLowerCase().includes(q)
    ).slice(0, 30);

    const districts: { district: string; state: string }[] = [];
    for (const loc of ALL_INDIA_LOCATIONS) {
      for (const d of loc.districts) {
        if (d.toLowerCase().includes(q)) {
          districts.push({ district: d, state: loc.name });
          if (districts.length >= 60) break;
        }
      }
      if (districts.length >= 60) break;
    }

    return { states, uts, districts, cities };
  }, [citySearchTerm]);

  const isCurrent = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 w-full z-[1000] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-colors duration-200">
        {/* ========================================================
            TIER 1 (h-[74px]): LOGO, HOME, NAMMABUS, JOINGROUPLINKS, THEME, PROFILE
           ======================================================== */}
        <div className="h-[74px] max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex items-center justify-between gap-4">
          {/* Left: Logo & 1st Nav Group */}
          <div className="flex items-center gap-6 sm:gap-7">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-600 flex items-center justify-center text-white font-headline-md font-black text-xl shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                N
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-tight">
                  <span className="font-headline-md font-black text-slate-900 dark:text-white tracking-tight text-lg sm:text-xl">
                    Namma<span className="text-blue-600 dark:text-blue-400">bus</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold border border-blue-200 dark:border-blue-800">
                    &amp; GROUPS
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wide hidden sm:block">
                  Verified Directory &amp; Links
                </span>
              </div>
            </Link>

            {/* 1st Nav Links: Home, Nammabus, JoinGroupLinks */}
            <nav className="hidden md:flex items-center gap-2">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isCurrent('/') && pathname === '/'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Home
              </Link>

              <Link
                href="/local-biz"
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  isCurrent('/local-biz') &&
                  !pathname.startsWith('/local-biz/professionals') &&
                  !pathname.startsWith('/local-biz/categories')
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Nammabus
              </Link>

              <Link
                href="/groups"
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  isCurrent('/groups')
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[17px] text-amber-500">hub</span>
                <span>JoinGroupLinks</span>
              </Link>

              <Link
                href="/games"
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  isCurrent('/games')
                    ? 'bg-purple-600 text-white shadow-sm font-black'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <span className="material-symbols-outlined text-[17px] text-purple-400">sports_esports</span>
                <span>PlayZone</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-md font-black ${
                    isCurrent('/games')
                      ? 'bg-purple-700 text-white'
                      : 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                  }`}
                >
                  30 GAMES
                </span>
              </Link>
            </nav>
          </div>

          {/* Right: Theme Toggle & User Profile */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200/60 dark:border-slate-800"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
            </button>

            {/* User Profile / Login Dropdown */}
            {user ? (
              <div ref={userRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 sm:px-3.5 sm:py-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border border-slate-200 dark:border-slate-800 shadow-xs"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm shadow-xs">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 hidden md:inline max-w-[120px] truncate">
                    {user.name || user.email.split('@')[0]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:inline" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fade-in">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                          {user.name || 'Member'}
                        </span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 shrink-0">
                          {user.role === 'seller' ? 'SELLER' : user.role === 'group_admin' ? 'GROUP ADMIN' : user.role === 'admin' ? 'ADMIN' : 'USER'}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">{user.email}</div>
                    </div>

                    {/* Role-Specific Primary Dashboard Link */}
                    {user.role === 'seller' && (
                      <Link
                        href="/dashboard/business"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>Seller &amp; Merchant Dashboard</span>
                      </Link>
                    )}

                    {user.role === 'group_admin' && (
                      <Link
                        href="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-purple-600 dark:text-purple-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Group Admin Dashboard</span>
                      </Link>
                    )}

                    <Link
                      href="/dashboard/user"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-emerald-600" />
                      <span>User Profile &amp; Saved</span>
                    </Link>

                    {user.role === 'admin' && (
                      <Link
                        href="/local-biz/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Admin Control Centre</span>
                      </Link>
                    )}

                    <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1" />

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setLoginModalOpen(true);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5 text-slate-400" />
                      <span>Switch Role / Account</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setRedirectAfterLogin(null);
                    setLoginModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Login
                </button>
                <Link
                  href="/sign-up"
                  className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-xs font-bold hover:opacity-90 transition-opacity shadow-xs"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ========================================================
            TIER 2 (min-h-[54px]): DYNAMIC SWITCH BASED ON MODE
            - If isGamesMode: PlayZone Categories (All 30 Games, Daily Challenges, Brain, Memory, Reflex) + Top 500 CTA
            - If isGroupMode: Group Platform Tabs (Arattai, WhatsApp, Insta, Tele, FB) + Submit Group CTA
            - If Nammabus/Home: City/State/District Selector + B2B + Professionals + Categories + Launch Offer + List Free CTA
           ======================================================== */}
        <div className="relative z-[1000] border-t border-slate-150 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 transition-colors overflow-visible">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 min-h-[48px] sm:min-h-[54px] py-1.5 flex items-center justify-between gap-2.5 sm:gap-4 overflow-visible">
            {isGamesMode ? (
              /* ========================================================
                 PLAYZONE TIER 2 BAR (All 30 Games, Daily Challenge, Categories)
                 ======================================================== */
              <>
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 overflow-x-auto scrollbar-none py-0.5">
                  <Link
                    href="/games"
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-purple-600 text-white shadow-sm font-black shrink-0 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[17px]">sports_esports</span>
                    <span>All 30 Games</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md font-black bg-purple-700 text-white">
                      30
                    </span>
                  </Link>

                  <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block shrink-0" />

                  <nav className="flex items-center gap-1.5 shrink-0">
                    <Link
                      href="/games?category=daily-challenges"
                      className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shrink-0 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                    >
                      <span className="material-symbols-outlined text-[17px] text-amber-500">flame</span>
                      <span>Daily Challenges</span>
                      <span className="text-[8px] px-1.5 py-0.2 rounded-md font-black bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                        +25 PTS
                      </span>
                    </Link>

                    <Link
                      href="/games?category=brain-iq"
                      className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-purple-600 hover:bg-white dark:hover:bg-slate-800 shrink-0"
                    >
                      Brain &amp; IQ
                    </Link>

                    <Link
                      href="/games?category=memory-booster"
                      className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-purple-600 hover:bg-white dark:hover:bg-slate-800 shrink-0"
                    >
                      Memory Booster
                    </Link>

                    <Link
                      href="/games?category=maths-numbers"
                      className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-purple-600 hover:bg-white dark:hover:bg-slate-800 shrink-0"
                    >
                      Maths &amp; 2048
                    </Link>

                    <Link
                      href="/games?category=reflex-reaction"
                      className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-purple-600 hover:bg-white dark:hover:bg-slate-800 shrink-0"
                    >
                      Reflex &amp; Speed
                    </Link>

                    <Link
                      href="/games?category=word-games"
                      className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-purple-600 hover:bg-white dark:hover:bg-slate-800 shrink-0"
                    >
                      Word Games
                    </Link>

                    <Link
                      href="/games?category=classic-games"
                      className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-purple-600 hover:bg-white dark:hover:bg-slate-800 shrink-0"
                    >
                      Classic Retro
                    </Link>
                  </nav>
                </div>

                {/* Right: Global Top 500 Button */}
                <div className="shrink-0">
                  <Link
                    href="/games"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-sm shadow-purple-600/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <Trophy className="w-4 h-4 text-amber-300" />
                    <span>Global Top 500</span>
                  </Link>
                </div>
              </>
            ) : isGroupMode ? (
              /* ========================================================
                 GROUP LINKS TIER 2 BAR (Arattai, WhatsApp, Insta, Tele, FB)
                 ======================================================== */
              <>
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 overflow-x-auto scrollbar-none py-0.5">
                  {/* All Groups Pill */}
                  <Link
                    href="/groups"
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 cursor-pointer shadow-xs ${
                      currentPlatform === 'all'
                        ? 'bg-blue-600 text-white shadow-sm font-black'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-500/60'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px] text-amber-500">hub</span>
                    <span>All Groups</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-md font-black ${
                        currentPlatform === 'all'
                          ? 'bg-blue-700 text-white'
                          : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      25k+
                    </span>
                  </Link>

                  <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block shrink-0" />

                  {/* 5 Platforms: Arattai, WhatsApp, Instagram, Telegram, Facebook */}
                  <nav className="flex items-center gap-1.5 shrink-0">
                    {/* 1. Arattai (Zoho) */}
                    <Link
                      href="/groups?platform=arattai"
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        currentPlatform === 'arattai'
                          ? 'bg-amber-500 text-slate-950 shadow-sm font-black'
                          : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px] text-amber-500">chat</span>
                      <span>Arattai</span>
                      <span
                        className={`text-[8px] px-1.5 py-0.2 rounded-md font-black ${
                          currentPlatform === 'arattai'
                            ? 'bg-amber-600 text-slate-950'
                            : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                        }`}
                      >
                        🇮🇳 ZOHO
                      </span>
                    </Link>

                    {/* 2. WhatsApp */}
                    <Link
                      href="/groups?platform=whatsapp"
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        currentPlatform === 'whatsapp'
                          ? 'bg-emerald-600 text-white shadow-sm font-black'
                          : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px] text-emerald-500">chat</span>
                      <span>WhatsApp</span>
                      <span
                        className={`text-[8px] px-1.5 py-0.2 rounded-md font-black ${
                          currentPlatform === 'whatsapp'
                            ? 'bg-emerald-700 text-white'
                            : 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                        }`}
                      >
                        CHAT
                      </span>
                    </Link>

                    {/* 3. Instagram (Insta) */}
                    <Link
                      href="/groups?platform=instagram"
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        currentPlatform === 'instagram'
                          ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-sm font-black'
                          : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px] text-pink-500">photo_camera</span>
                      <span>Instagram</span>
                      <span
                        className={`text-[8px] px-1.5 py-0.2 rounded-md font-black ${
                          currentPlatform === 'instagram'
                            ? 'bg-pink-700 text-white'
                            : 'bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300'
                        }`}
                      >
                        INSTA
                      </span>
                    </Link>

                    {/* 4. Telegram (Tele) */}
                    <Link
                      href="/groups?platform=telegram"
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        currentPlatform === 'telegram'
                          ? 'bg-sky-500 text-white shadow-sm font-black'
                          : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px] text-sky-500">send</span>
                      <span>Telegram</span>
                      <span
                        className={`text-[8px] px-1.5 py-0.2 rounded-md font-black ${
                          currentPlatform === 'telegram'
                            ? 'bg-sky-600 text-white'
                            : 'bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300'
                        }`}
                      >
                        TELE
                      </span>
                    </Link>

                    {/* 5. Facebook (FB) */}
                    <Link
                      href="/groups?platform=facebook"
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                        currentPlatform === 'facebook'
                          ? 'bg-blue-600 text-white shadow-sm font-black'
                          : 'text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px] text-blue-600">groups</span>
                      <span>Facebook</span>
                      <span
                        className={`text-[8px] px-1.5 py-0.2 rounded-md font-black ${
                          currentPlatform === 'facebook'
                            ? 'bg-blue-700 text-white'
                            : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                        }`}
                      >
                        FB
                      </span>
                    </Link>
                  </nav>
                </div>

                {/* Right: + Submit Group CTA */}
                <div className="shrink-0">
                  <a
                    href="https://forms.gle/oZzitWMZ8xtB9rmx5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white shadow-sm shadow-emerald-600/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-emerald-200" />
                    <span>Submit Group (Free)</span>
                  </a>
                </div>
              </>
            ) : (
              /* ========================================================
                 NAMMABUS & HOME TIER 2 BAR (Location Selector, B2B, Techs, Categories, Launch Offer)
                 ======================================================== */
              <>
                {/* 1. City / State / District Selector Pill Dropdown (Stationary, fully unclipped) */}
                <div ref={locationRef} className="relative shrink-0 z-30">
                  <button
                      type="button"
                      onClick={() => {
                        setLocationDropdownOpen(!locationDropdownOpen);
                        if (!locationDropdownOpen) {
                          setDrilldownState(null);
                        }
                      }}
                      className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-500/60 transition-all cursor-pointer shadow-xs"
                    >
                      <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="max-w-[130px] sm:max-w-[160px] truncate">{selectedCity}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                          locationDropdownOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {locationDropdownOpen && (
                      <div className="absolute left-0 top-full mt-2 w-[calc(100vw-24px)] sm:w-[440px] max-w-[440px] rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-3 z-[1100] animate-fade-in max-h-[min(520px,calc(100vh-140px))] flex flex-col overflow-hidden">
                        {/* Header: Drill-down or Normal Search */}
                        {drilldownState ? (
                          <div className="pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0 space-y-2">
                            <div className="flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => {
                                  setDrilldownState(null);
                                  setCitySearchTerm('');
                                }}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                              >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                <span>All States</span>
                              </button>
                              <span className="text-[11px] font-bold text-slate-500">
                                {getDistrictsForState(drilldownState).length} Districts
                              </span>
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                                {drilldownState}
                              </h4>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCity(drilldownState);
                                  setLocationDropdownOpen(false);
                                  setDrilldownState(null);
                                  setCitySearchTerm('');
                                  router.push(`/local-biz/businesses?state=${encodeURIComponent(drilldownState)}`);
                                }}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0 cursor-pointer"
                              >
                                Select Entire State
                              </button>
                            </div>
                            <div className="relative">
                              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                              <input
                                type="text"
                                placeholder={`Search district in ${drilldownState}...`}
                                value={citySearchTerm}
                                onChange={(e) => setCitySearchTerm(e.target.value)}
                                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="pb-2 border-b border-slate-100 dark:border-slate-800 shrink-0 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Select Location Across India
                              </span>
                              <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
                                28 States • 8 UTs • 750+ Dist.
                              </span>
                            </div>

                            {/* Search Input */}
                            <div className="relative">
                              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                              <input
                                type="text"
                                placeholder="Search state, district, or city..."
                                value={citySearchTerm}
                                onChange={(e) => setCitySearchTerm(e.target.value)}
                                className="w-full pl-8 pr-8 py-1.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              />
                              {citySearchTerm && (
                                <button
                                  type="button"
                                  onClick={() => setCitySearchTerm('')}
                                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 cursor-pointer text-xs"
                                >
                                  ✕
                                </button>
                              )}
                            </div>

                            {/* Quick filter tabs */}
                            {!citySearchTerm && (
                              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pt-0.5">
                                {[
                                  { id: 'all', label: 'All' },
                                  { id: 'states', label: 'States (28)' },
                                  { id: 'districts', label: 'Districts' },
                                  { id: 'uts', label: 'UTs (8)' },
                                  { id: 'cities', label: 'Cities' },
                                ].map((tab) => (
                                  <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setLocationTab(tab.id as any)}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                                      locationTab === tab.id
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                    }`}
                                  >
                                    {tab.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Scrollable List Body */}
                        <div className="flex-1 overflow-y-auto pt-2 space-y-1.5 pr-1.5 overscroll-contain">
                          {/* Drill-down mode: list all districts in selected state */}
                          {drilldownState ? (
                            <div className="space-y-1">
                              {getDistrictsForState(drilldownState)
                                .filter((d) =>
                                  citySearchTerm ? d.toLowerCase().includes(citySearchTerm.toLowerCase().trim()) : true
                                )
                                .map((dist) => (
                                  <button
                                    key={`drill-${dist}`}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCity(`${dist}, ${drilldownState}`);
                                      setLocationDropdownOpen(false);
                                      setCitySearchTerm('');
                                      setDrilldownState(null);
                                      router.push(
                                        `/local-biz/businesses?state=${encodeURIComponent(
                                          drilldownState
                                        )}&district=${encodeURIComponent(dist)}`
                                      );
                                    }}
                                    className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/60 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group cursor-pointer"
                                  >
                                    <span>{dist}</span>
                                    <span className="text-[10px] text-slate-400 group-hover:text-blue-600">Select →</span>
                                  </button>
                                ))}
                            </div>
                          ) : (
                            <>
                              {/* All India Reset Pill */}
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedCity('All India');
                                  setLocationDropdownOpen(false);
                                  setCitySearchTerm('');
                                  setDrilldownState(null);
                                  router.push('/local-biz/businesses');
                                }}
                                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 flex items-center justify-between cursor-pointer border border-blue-200/50 dark:border-blue-800/40 bg-blue-50/40 dark:bg-blue-950/20"
                              >
                                <span className="flex items-center gap-1.5">
                                  <span>🇮🇳</span>
                                  <span>All India (Everywhere)</span>
                                </span>
                                <span className="text-[10px] text-blue-500 font-semibold">28 States &amp; 8 UTs</span>
                              </button>

                              {/* Districts Tab Tip */}
                              {locationTab === 'districts' && !citySearchTerm && (
                                <div className="p-2 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-800/40 text-[11px] text-blue-700 dark:text-blue-300">
                                  💡 <strong>Tip:</strong> Tap any state under &quot;States&quot; tab to explore all districts within that state.
                                </div>
                              )}

                              {/* Districts Matching Search or Popular Districts */}
                              {(locationTab === 'all' || locationTab === 'districts') &&
                                filteredLocations.districts.length > 0 && (
                                <div>
                                  <div className="px-2 pt-2 pb-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                    <span>
                                      {citySearchTerm
                                        ? `Districts Matching (${filteredLocations.districts.length})`
                                        : `Popular Districts (${filteredLocations.districts.length})`}
                                    </span>
                                    <span className="text-[9px] text-slate-400 lowercase">tap to select</span>
                                  </div>
                                  <div className="space-y-0.5">
                                    {filteredLocations.districts.map((d) => (
                                      <button
                                        key={`district-${d.district}-${d.state}`}
                                        type="button"
                                        onClick={() => {
                                          setSelectedCity(`${d.district}, ${d.state}`);
                                          setLocationDropdownOpen(false);
                                          setCitySearchTerm('');
                                          setDrilldownState(null);
                                          router.push(
                                            `/local-biz/businesses?state=${encodeURIComponent(
                                              d.state
                                            )}&district=${encodeURIComponent(d.district)}`
                                          );
                                        }}
                                        className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition-colors flex items-center justify-between group cursor-pointer"
                                      >
                                        <span className="group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                                          {d.district}
                                        </span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                                          {d.state}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* States */}
                              {(locationTab === 'all' || locationTab === 'states') &&
                                filteredLocations.states.length > 0 && (
                                  <div>
                                    <div className="px-2 pt-2 pb-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                      <span>States ({filteredLocations.states.length})</span>
                                      <span className="text-[9px] text-slate-400 lowercase">click name or browse dist.</span>
                                    </div>
                                    <div className="space-y-0.5">
                                      {filteredLocations.states.map((s) => (
                                        <div
                                          key={`state-${s.name}`}
                                          className="flex items-center justify-between px-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
                                        >
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setSelectedCity(s.name);
                                              setLocationDropdownOpen(false);
                                              setCitySearchTerm('');
                                              setDrilldownState(null);
                                              router.push(`/local-biz/businesses?state=${encodeURIComponent(s.name)}`);
                                            }}
                                            className="text-left text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-1 truncate cursor-pointer py-0.5"
                                          >
                                            {s.name}
                                          </button>
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setDrilldownState(s.name);
                                              setCitySearchTerm('');
                                            }}
                                            className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors flex items-center gap-0.5 cursor-pointer shrink-0"
                                            title={`View all ${s.districts.length} districts in ${s.name}`}
                                          >
                                            <span>{s.districts.length} Dist.</span>
                                            <ChevronRight className="w-3 h-3" />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              {/* Union Territories */}
                              {(locationTab === 'all' || locationTab === 'uts') &&
                                filteredLocations.uts.length > 0 && (
                                  <div>
                                    <div className="px-2 pt-2 pb-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                                      <span>Union Territories ({filteredLocations.uts.length})</span>
                                    </div>
                                    <div className="space-y-0.5">
                                      {filteredLocations.uts.map((ut) => (
                                        <div
                                          key={`ut-${ut.name}`}
                                          className="flex items-center justify-between px-2 py-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-colors group"
                                        >
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setSelectedCity(ut.name);
                                              setLocationDropdownOpen(false);
                                              setCitySearchTerm('');
                                              setDrilldownState(null);
                                              router.push(`/local-biz/businesses?state=${encodeURIComponent(ut.name)}`);
                                            }}
                                            className="text-left text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 flex-1 truncate cursor-pointer py-0.5"
                                          >
                                            {ut.name}
                                          </button>
                                          {ut.districts.length > 1 ? (
                                            <button
                                              type="button"
                                              onClick={() => {
                                                setDrilldownState(ut.name);
                                                setCitySearchTerm('');
                                              }}
                                              className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900 transition-colors flex items-center gap-0.5 cursor-pointer shrink-0"
                                            >
                                              <span>{ut.districts.length} Dist.</span>
                                              <ChevronRight className="w-3 h-3" />
                                            </button>
                                          ) : (
                                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                                              UT
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                              {/* Top Cities */}
                              {(locationTab === 'all' || locationTab === 'cities') &&
                                filteredLocations.cities.length > 0 && (
                                  <div>
                                    <div className="px-2 pt-2 pb-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                                      Popular Cities ({filteredLocations.cities.length})
                                    </div>
                                    <div className="space-y-0.5">
                                      {filteredLocations.cities.map((c) => (
                                        <button
                                          key={`city-${c.id}`}
                                          type="button"
                                          onClick={() => {
                                            setSelectedCity(c.name);
                                            setLocationDropdownOpen(false);
                                            setCitySearchTerm('');
                                            setDrilldownState(null);
                                            router.push(`/local-biz/businesses?city=${c.slug}`);
                                          }}
                                          className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group cursor-pointer"
                                        >
                                          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400 font-semibold">
                                            {c.name}
                                          </span>
                                          <span className="text-[10px] text-slate-400">{c.state}</span>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                            </>
                          )}
                        </div>
                      </div>
                    )}
                </div>

                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block shrink-0" />

                {/* 2. Scrollable Navigation Tabs (Only this sub-nav container has overflow-x-auto) */}
                <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto scrollbar-none py-0.5">
                  <nav className="flex items-center gap-1.5 shrink-0">
                    <Link
                      href="/b2b"
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                        isCurrent('/b2b')
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-blue-500">precision_manufacturing</span>
                      <span>B2B</span>
                      <span className="text-[8px] px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-black">
                        WHOLESALE
                      </span>
                    </Link>

                    <Link
                      href="/local-biz/professionals"
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                        isCurrent('/local-biz/professionals')
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px] text-emerald-500">handyman</span>
                      <span>Professionals</span>
                    </Link>

                    <Link
                      href="/local-biz/categories"
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isCurrent('/local-biz/categories')
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      Categories
                    </Link>

                    <Link
                      href="/pricing"
                      className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                        isCurrent('/pricing')
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>Launch Offer</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-emerald-400 text-slate-950 shadow-xs">
                        FREE
                      </span>
                    </Link>

                    <Link
                      href="/games"
                      className="px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                    >
                      <span className="material-symbols-outlined text-[16px] text-purple-500">sports_esports</span>
                      <span>PlayZone</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[8px] font-black bg-purple-600 text-white shadow-xs">
                        30 GAMES
                      </span>
                    </Link>
                  </nav>
                </div>

                {/* Right: + List Free (₹0) CTA */}
                <div className="shrink-0">
                  <Link
                    href="/local-biz/add-business"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-sm shadow-blue-600/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4 text-blue-200" />
                    <span>List Free (₹0)</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ========================================================
            MOBILE DRAWER
           ======================================================== */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-4 space-y-2 animate-fade-in shadow-xl">
            {isGamesMode ? (
              /* Mobile View for PlayZone */
              <>
                <div className="p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/60 dark:border-purple-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-900 dark:text-purple-200">
                    <span className="material-symbols-outlined text-[18px]">sports_esports</span>
                    <span>PlayZone • 30 Games</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-600 text-white font-extrabold">
                    Instant Play
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <Link
                    href="/games"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold bg-purple-600 text-white"
                  >
                    All 30 Browser Games
                  </Link>

                  <Link
                    href="/games?category=daily-challenges"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <span>Today&apos;s Daily Challenges</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-black">
                      +25 PTS
                    </span>
                  </Link>

                  <Link
                    href="/games?category=brain-iq"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    Brain &amp; IQ Challenges
                  </Link>

                  <Link
                    href="/games?category=memory-booster"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    Memory Booster (Chimp &amp; Tiles)
                  </Link>

                  <Link
                    href="/games?category=maths-numbers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    Maths &amp; 2048
                  </Link>

                  <Link
                    href="/games?category=reflex-reaction"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    Reflex &amp; Reaction Time
                  </Link>
                </div>
              </>
            ) : isGroupMode ? (
              /* Mobile View for Group Links */
              <>
                <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-900 dark:text-blue-200">
                    <span className="material-symbols-outlined text-[18px] text-amber-500">hub</span>
                    <span>JoinGroupLinks Communities</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600 text-white font-extrabold">
                    25k+ Active
                  </span>
                </div>

                <div className="space-y-1 pt-1">
                  <Link
                    href="/groups"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      currentPlatform === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    All Platforms &amp; Channels
                  </Link>

                  <Link
                    href="/groups?platform=arattai"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      currentPlatform === 'arattai'
                        ? 'bg-amber-500 text-slate-950 font-black'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-amber-500">chat</span>
                      <span>Arattai Communities</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-black">
                      🇮🇳 ZOHO
                    </span>
                  </Link>

                  <Link
                    href="/groups?platform=whatsapp"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      currentPlatform === 'whatsapp'
                        ? 'bg-emerald-600 text-white font-black'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-emerald-500">chat</span>
                      <span>WhatsApp Groups</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black">
                      CHAT
                    </span>
                  </Link>

                  <Link
                    href="/groups?platform=instagram"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      currentPlatform === 'instagram'
                        ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white font-black'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-pink-500">photo_camera</span>
                      <span>Instagram Broadcasts</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-black">
                      INSTA
                    </span>
                  </Link>

                  <Link
                    href="/groups?platform=telegram"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      currentPlatform === 'telegram'
                        ? 'bg-sky-500 text-white font-black'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-sky-500">send</span>
                      <span>Telegram Channels</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-black">
                      TELE
                    </span>
                  </Link>

                  <Link
                    href="/groups?platform=facebook"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      currentPlatform === 'facebook'
                        ? 'bg-blue-600 text-white font-black'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px] text-blue-600">groups</span>
                      <span>Facebook Communities</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-black">
                      FB
                    </span>
                  </Link>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <a
                    href="https://forms.gle/oZzitWMZ8xtB9rmx5"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-600/30 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Submit Your Group Link (Free)</span>
                  </a>
                </div>
              </>
            ) : (
              /* Mobile View for Nammabus & Home */
              <>
                {/* Mobile City Selector */}
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Selected City: {selectedCity}</span>
                  </div>
                  <select
                    value={selectedCity.startsWith('state:') ? selectedCity : selectedCity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === 'All India') {
                        setSelectedCity('All India');
                        router.push('/local-biz/businesses');
                      } else if (val.startsWith('state:')) {
                        const st = val.replace('state:', '');
                        setSelectedCity(st);
                        router.push(`/local-biz/businesses?state=${encodeURIComponent(st)}`);
                      } else {
                        setSelectedCity(val);
                        router.push(`/local-biz/businesses?city=${val.toLowerCase().replace(/ /g, '-')}`);
                      }
                    }}
                    className="w-full p-2 text-xs rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold"
                  >
                    <option value="All India">🇮🇳 All India (All 28 States &amp; 8 UTs)</option>
                    <optgroup label="All 28 States">
                      {STATES.map((s) => (
                        <option key={`m-state-${s.name}`} value={`state:${s.name}`}>
                          {s.name} ({s.districts.length} districts)
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Union Territories">
                      {UNION_TERRITORIES.map((ut) => (
                        <option key={`m-ut-${ut.name}`} value={`state:${ut.name}`}>
                          {ut.name}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Popular Cities">
                      {SEED_CITIES.slice(0, 30).map((c) => (
                        <option key={`m-city-${c.id}`} value={c.name}>
                          {c.name} ({c.state})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Mobile Nav Links */}
                <div className="space-y-1 pt-1">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    Home
                  </Link>
                  <Link
                    href="/local-biz"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    Nammabus Directory
                  </Link>
                  <Link
                    href="/groups"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    JoinGroupLinks (Arattai, WhatsApp, Telegram)
                  </Link>
                  <Link
                    href="/games"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-purple-500">sports_esports</span>
                      <span>PlayZone (30 Free Games)</span>
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-purple-600 text-white font-black">
                      INSTANT
                    </span>
                  </Link>
                  <Link
                    href="/b2b"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <span>B2B Wholesale Portal</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-black">
                      WHOLESALE
                    </span>
                  </Link>
                  <Link
                    href="/local-biz/professionals"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    Technicians &amp; Specialists
                  </Link>
                  <Link
                    href="/local-biz/categories"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    All 40+ Categories
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-900"
                  >
                    <span>🎉 Launch Special Offer</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-black">
                      100% FREE
                    </span>
                  </Link>
                </div>

                {/* Mobile CTA */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <Link
                    href="/local-biz/add-business"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30 cursor-pointer"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>List Your Business For Free (₹0)</span>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </header>

      {/* India-Wide Local Business Directory Scrolling Announcement Banner */}
      {isBusinessPage && <BusinessAnnouncementBanner />}

      {/* Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          setLoginModalOpen(false);
          if (redirectAfterLogin) {
            router.push(redirectAfterLogin);
          }
        }}
      />

      {/* Mobile Bottom Sticky Navigation Tab Bar */}
      <MobileBottomNav />
    </>
  );
};

export default Header;
