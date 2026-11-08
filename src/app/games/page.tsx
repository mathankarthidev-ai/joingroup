'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Trophy,
  Flame,
  Zap,
  Sparkles,
  Search,
  Filter,
  Play,
  RotateCcw,
  CheckCircle2,
  Medal,
  Award,
  Globe,
  Layers,
  ArrowRight,
  ShieldCheck,
  User,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  GAME_CATEGORIES,
  PLAYZONE_GAMES,
  GameCategory,
  GameMetadata,
} from '@/lib/games/catalog';
import {
  getPlayerStats,
  getStoredRecords,
  PlayerStats,
  PersonalRecord,
} from '@/lib/games/engine';
import { PlayZoneGameModal } from '@/components/games/PlayZoneGameModal';

export default function GamesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <GamesPageContent />
    </Suspense>
  );
}

function GamesPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [activeTab, setActiveTab] = useState<'games' | 'leaderboard' | 'profile'>('games');
  const [activeGame, setActiveGame] = useState<GameMetadata | null>(null);

  // Player Stats & Records
  const [playerStats, setPlayerStats] = useState<PlayerStats>(() => getPlayerStats());
  const [records, setRecords] = useState<Record<string, PersonalRecord>>(() => getStoredRecords());

  const handleOpenGame = (game: GameMetadata) => {
    setActiveGame(game);
  };

  const handleCloseGame = () => {
    setActiveGame(null);
    setPlayerStats(getPlayerStats());
    setRecords(getStoredRecords());
  };

  // Split games into Available (Top) and Coming Soon (Down)
  const { availableGames, comingSoonGames, totalGamesCount } = useMemo(() => {
    const list = PLAYZONE_GAMES.filter((g) => {
      const matchesCategory =
        selectedCategory === 'all' || g.categorySlug === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        g.title.toLowerCase().includes(q) ||
        g.description.toLowerCase().includes(q) ||
        g.categoryTitle.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    return {
      availableGames: list.filter((g) => !g.comingSoon),
      comingSoonGames: list.filter((g) => g.comingSoon),
      totalGamesCount: list.length,
    };
  }, [searchQuery, selectedCategory]);

  // Daily Challenge Games - ensure available games come first
  const dailyGames = useMemo(() => {
    return PLAYZONE_GAMES.filter((g) => g.dailyChallenge).sort((a, b) => {
      if (!a.comingSoon && b.comingSoon) return -1;
      if (a.comingSoon && !b.comingSoon) return 1;
      return 0;
    });
  }, []);

  // Render individual game card
  const renderGameCard = (game: GameMetadata) => {
    const recordKey = `${game.slug}__medium`;
    const record = records[recordKey];

    return (
      <div
        key={game.id}
        onClick={() => handleOpenGame(game)}
        className={`group relative rounded-3xl bg-white dark:bg-slate-900 border overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
          game.comingSoon
            ? 'border-slate-200/80 dark:border-slate-800 opacity-90 hover:opacity-100 hover:border-amber-400/80 hover:shadow-amber-500/10'
            : 'border-emerald-500/40 dark:border-emerald-500/40 hover:border-emerald-500 hover:shadow-emerald-500/15 ring-1 ring-emerald-500/20'
        }`}
      >
        {/* Game Cover Image (Shown Prominently Outside) */}
        <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-950">
          {game.coverImage ? (
            <img
              src={game.coverImage}
              alt={game.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-tr from-purple-900 via-indigo-900 to-slate-900" />
          )}

          {/* Dark Gradient Overlay for Badges & Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-black/40 pointer-events-none" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
            <span className="text-[10px] px-2.5 py-1 rounded-full font-black bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[13px] text-purple-400">
                {game.categorySlug.includes('math') ? 'calculate' : 'sports_esports'}
              </span>
              <span>{game.categoryTitle}</span>
            </span>

            {game.comingSoon ? (
              <span className="text-[9px] px-2.5 py-0.5 rounded-full font-black bg-amber-500/95 text-slate-950 shadow-md flex items-center gap-1">
                <span>🚀 COMING SOON</span>
              </span>
            ) : (
              <span className="text-[9px] px-2.5 py-0.5 rounded-full font-black bg-emerald-500 text-slate-950 shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>PLAY NOW</span>
              </span>
            )}
          </div>

          {/* Center Play Button Overlay on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            {game.comingSoon ? (
              <div className="px-4 py-2 rounded-2xl bg-black/85 text-amber-300 font-black text-xs shadow-xl border border-amber-500/30 backdrop-blur-md">
                🚀 Unlocks in next expansion
              </div>
            ) : (
              <div className="w-13 h-13 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow-xl shadow-emerald-500/50 scale-90 group-hover:scale-100 transition-transform duration-300 backdrop-blur-xs border border-white/30 font-black">
                <Play className="w-6 h-6 fill-current ml-0.5 text-slate-950" />
              </div>
            )}
          </div>

          {/* Bottom Info on Image */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between pointer-events-none">
            <div className="flex items-center gap-1 flex-wrap">
              {game.difficultyLevels.map((lvl) => (
                <span
                  key={lvl}
                  className="text-[9px] px-1.5 py-0.5 rounded-md bg-white/20 backdrop-blur-md text-white font-bold capitalize border border-white/10"
                >
                  {lvl}
                </span>
              ))}
            </div>
            <span className="text-[10px] font-extrabold text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-amber-400/30">
              {game.metricLabel}
            </span>
          </div>
        </div>

        {/* Card Content Below Image */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors tracking-tight flex items-center gap-2">
              <span>{game.title}</span>
              {!game.comingSoon && (
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              )}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
              {game.description}
            </p>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
            <div className="text-[11px] text-slate-400 font-medium truncate">
              {record ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>PB: {game.higherIsBetter ? `${record.bestScore} pts` : `${record.bestTimeMs} ms`}</span>
                </span>
              ) : (
                <span className="text-slate-400">
                  {game.comingSoon ? 'Expanding soon' : 'Ready to play'}
                </span>
              )}
            </div>

            {game.comingSoon ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenGame(game);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 font-bold text-xs border border-slate-200 dark:border-slate-700 hover:border-amber-400 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Coming Soon</span>
                <span>⏳</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenGame(game);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/25 group-hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Play Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col justify-between">
      <Header />

      <main className="w-full flex-grow">
        {/* ========================================================
            1. PLAYZONE HERO SECTION
           ======================================================== */}
        <section className="relative w-full bg-gradient-to-b from-purple-900/10 via-surface to-surface pt-8 pb-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 dark:border-slate-800">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-extrabold text-xs border border-purple-200 dark:border-purple-800">
                  <span className="material-symbols-outlined text-[16px]">sports_esports</span>
                  <span>PLAYZONE • 30 BROWSER GAMES • ZERO DOWNLOADS</span>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  Play. Challenge.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600">
                    Improve. Rank.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
                  Lightweight client-side cognitive challenges, memory boosters, and classic mini games.
                  Play anonymously as a guest or track your daily streak and personal records locally with zero lag.
                </p>
              </div>

              {/* Player Stats Mini Widget */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm shrink-0">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300">
                  <Flame className="w-4 h-4 text-amber-500 animate-pulse" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Streak</span>
                    <span className="text-xs font-black">{playerStats.currentStreak} Days</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Total Points</span>
                    <span className="text-xs font-black">{playerStats.totalPoints} pts</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Navigation Tabs: All Games, Global Leaderboard, Daily Challenges */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-2 -webkit-overflow-scrolling-touch">
              <button
                type="button"
                onClick={() => setActiveTab('games')}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap ${
                  activeTab === 'games'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-purple-500'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
                <span>All 30 Games</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('leaderboard')}
                className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap ${
                  activeTab === 'leaderboard'
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-purple-500'
                }`}
              >
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Global Top 500</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('games');
                  setSelectedCategory('daily-challenges');
                }}
                className="px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-300/40 hover:bg-amber-500/20 transition-all cursor-pointer flex items-center gap-1.5 shrink-0 whitespace-nowrap"
              >
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Today&apos;s Daily Challenges</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. TODAY'S DAILY CHALLENGE STRIP (UTC SYNCHRONIZED)
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 border border-amber-200/60 dark:border-amber-900/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md shadow-amber-500/30">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Today&apos;s Daily Global Challenges</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 font-extrabold">
                      UTC DATE SEED
                    </span>
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    One shared daily puzzle per game. Ranked attempt gives +25 bonus rank points!
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {dailyGames.map((dg) => (
                <div
                  key={dg.id}
                  onClick={() => handleOpenGame(dg)}
                  className="group relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-row items-center"
                >
                  {/* Daily Game Thumbnail Image Outside */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-24 overflow-hidden bg-slate-950 shrink-0">
                    {dg.coverImage ? (
                      <img
                        src={dg.coverImage}
                        alt={dg.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-amber-600 to-purple-600" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/60 pointer-events-none" />
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-black shadow-xs flex items-center gap-0.5">
                      <Flame className="w-2.5 h-2.5 fill-current" />
                      <span>TODAY</span>
                    </div>
                  </div>

                  <div className="p-3 flex-1 flex items-center justify-between gap-2 min-w-0">
                    <div className="min-w-0 space-y-0.5">
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-amber-600 transition-colors">
                        {dg.title}
                      </h4>
                      <span className="text-[10px] text-slate-400 block truncate font-medium">
                        {dg.metricLabel} • <strong className="text-amber-500 font-black">+25 pts</strong>
                      </span>
                      {dg.comingSoon ? (
                        <span className="text-[9px] px-2 py-0.2 rounded-md bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 font-bold inline-block border border-amber-500/30">
                          🚀 Coming Soon
                        </span>
                      ) : (
                        <span className="text-[9px] px-2 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold inline-block">
                          Daily Challenge
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-110 active:scale-95 transition-transform shadow-md shadow-amber-500/20"
                    >
                      {dg.comingSoon ? (
                        <span className="text-[11px]">⏳</span>
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MATHS SEASON ACTIVE NOTIFICATION STRIP */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-emerald-500/10 border border-purple-200 dark:border-purple-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl select-none">🧮</span>
              <div>
                <span className="font-extrabold text-slate-900 dark:text-white block sm:inline">
                  Maths Games Active (+ - × ÷ %):
                </span>{' '}
                <span className="text-slate-600 dark:text-slate-300">
                  Currently featuring our high-speed <strong>Mental Math Sprint (+, −, ×, ÷, %)</strong> and <strong>2048 Tile Merger</strong>. Other categories are marked Coming Soon and will expand in our upcoming release!
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedCategory('maths-numbers')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs shrink-0 shadow-sm transition-all cursor-pointer"
            >
              Play Maths Games →
            </button>
          </div>
        </div>

        {/* ========================================================
            3. TAB 1: ALL GAMES & CATEGORIES VIEW
           ======================================================== */}
        {activeTab === 'games' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
            {/* Search and Category Filter Strip */}
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search games (e.g. 2048, Mental Math)..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-slate-400 shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="text-xs text-slate-500 font-semibold">
                  Showing <strong>{totalGamesCount}</strong> games (<span className="text-emerald-600 dark:text-emerald-400 font-black">{availableGames.length} available</span>)
                </div>
              </div>

              {/* 10 Category Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 -webkit-overflow-scrolling-touch">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    selectedCategory === 'all'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-purple-400'
                  }`}
                >
                  All 10 Categories
                </button>
                {GAME_CATEGORIES.map((cat) => {
                  const isMath = cat.slug === 'maths-numbers';
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        selectedCategory === cat.slug
                          ? 'bg-purple-600 text-white shadow-xs'
                          : isMath
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-2 border-emerald-500/60 font-black'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-purple-400'
                      }`}
                    >
                      <span>{cat.title}</span>
                      {isMath ? (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500 text-slate-950 font-black">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-800 text-slate-400 font-semibold">
                          SOON
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1. TOP SECTION: AVAILABLE GAMES (PLAY NOW) */}
            {availableGames.length > 0 && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-500/30 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/30 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-base sm:text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <span>Available Games (Play Now)</span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black shadow-xs">
                          {availableGames.length} READY
                        </span>
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Zero install browser games • 60-second speed tests • 2048 &amp; Mental Math
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {availableGames.map(renderGameCard)}
                </div>
              </div>
            )}

            {/* 2. DOWN SECTION: UPCOMING GAMES (COMING SOON) */}
            {comingSoonGames.length > 0 && (
              <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-3xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-black shrink-0">
                      <span className="text-lg">⏳</span>
                    </div>
                    <div>
                      <h3 className="font-black text-base sm:text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <span>Upcoming Games (Coming Soon)</span>
                        <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold border border-slate-300 dark:border-slate-700">
                          {comingSoonGames.length} EXPANDING SOON
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500">
                        Word puzzles, reaction timers, memory boosters, and trivia games unlocking in next expansion
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                  {comingSoonGames.map(renderGameCard)}
                </div>
              </div>
            )}

            {/* EMPTY STATE */}
            {availableGames.length === 0 && comingSoonGames.length === 0 && (
              <div className="text-center py-12 space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
                <div className="text-3xl">🔍</div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">No games found</h4>
                <p className="text-xs text-slate-500">No games matched your search criteria.</p>
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            4. TAB 2: GLOBAL TOP 500 LEADERBOARD
           ======================================================== */}
        {activeTab === 'leaderboard' && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-6">
            <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-500" />
                    <span>Global Top 500 Leaderboard</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Updated with validated score submissions across all 30 games. 0% Cheating tolerance.
                  </p>
                </div>

                {/* Country and Period Filter Tabs */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
                  <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs">
                    All-Time
                  </span>
                  <span className="px-3 py-1 cursor-pointer hover:text-slate-900 dark:hover:text-white">This Week</span>
                  <span className="px-3 py-1 cursor-pointer hover:text-slate-900 dark:hover:text-white">Today</span>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase font-bold text-slate-400">
                      <th className="py-2.5 px-3">Rank</th>
                      <th className="py-2.5 px-3">Player</th>
                      <th className="py-2.5 px-3">Country</th>
                      <th className="py-2.5 px-3">Points</th>
                      <th className="py-2.5 px-3">Best Game</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-semibold text-slate-700 dark:text-slate-300">
                    {[
                      { rank: 1, name: 'Arun Kumar', flag: '🇮🇳', pts: '4,850', game: 'Arrow Maze (Expert)', status: 'Grandmaster' },
                      { rank: 2, name: 'Sophia Chen', flag: '🇸🇬', pts: '4,620', game: 'Chimp Memory (12 Tiles)', status: 'Master' },
                      { rank: 3, name: 'Rajesh Sharma', flag: '🇮🇳', pts: '4,380', game: '2048 Tile Merger', status: 'Master' },
                      { rank: 4, name: 'Liam Davies', flag: '🇬🇧', pts: '3,990', game: 'Word Guess (Daily)', status: 'Diamond' },
                      { rank: 5, name: 'Priya Sundaram', flag: '🇮🇳', pts: '3,840', game: 'Reaction Time (162ms)', status: 'Diamond' },
                      { rank: 6, name: 'Karthik Raja', flag: '🇮🇳', pts: '3,710', game: 'Mental Math Sprint', status: 'Platinum' },
                      { rank: 7, name: 'David Miller', flag: '🇺🇸', pts: '3,550', game: 'Memory Tile Match', status: 'Platinum' },
                      { rank: 8, name: 'Amina Al-Mansoor', flag: '🇦🇪', pts: '3,420', game: 'Color Reflex (Stroop)', status: 'Platinum' },
                      { rank: 9, name: 'Ananya Roy', flag: '🇮🇳', pts: '3,290', game: 'Mini Sudoku (9x9)', status: 'Gold' },
                      { rank: 10, name: 'Kenji Sato', flag: '🇯🇵', pts: '3,180', game: 'Snake Classic', status: 'Gold' },
                    ].map((row) => (
                      <tr key={row.rank} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-3 font-black text-slate-900 dark:text-white">
                          {row.rank === 1 ? '🥇 #1' : row.rank === 2 ? '🥈 #2' : row.rank === 3 ? '🥉 #3' : `#${row.rank}`}
                        </td>
                        <td className="py-3 px-3 flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                          <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/60 text-purple-700 dark:text-purple-300 text-[10px] font-black flex items-center justify-center">
                            {row.name[0]}
                          </div>
                          <span>{row.name}</span>
                        </td>
                        <td className="py-3 px-3 text-base">{row.flag}</td>
                        <td className="py-3 px-3 font-black text-purple-600 dark:text-purple-400">{row.pts}</td>
                        <td className="py-3 px-3 text-slate-500 dark:text-slate-400">{row.game}</td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-black">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Game Modal */}
      {activeGame && (
        <PlayZoneGameModal
          game={activeGame}
          onClose={handleCloseGame}
          onSelectGame={handleOpenGame}
        />
      )}

      <Footer />
    </div>
  );
}
