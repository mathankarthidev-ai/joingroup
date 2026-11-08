'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { PAID_PROMOTION_BANNERS } from '@/lib/data';
import { PaidPromotionBanner } from '@/lib/types';

interface PaidPromotionCarouselProps {
  currentCountry?: string;
  currentState?: string;
  currentCity?: string;
  currentCategory?: string;
}

interface SingleBannerProps {
  promotions: PaidPromotionBanner[];
  initialIndex: number;
  bannerLabel: string;
  currentCity?: string;
  currentState?: string;
}

const SingleScrollBanner: React.FC<SingleBannerProps> = ({
  promotions,
  initialIndex,
  bannerLabel,
  currentCity,
  currentState,
}) => {
  const [currentIndex, setCurrentIndex] = useState(
    promotions.length > 0 ? initialIndex % promotions.length : 0
  );
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (promotions.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [promotions.length, isPaused]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + promotions.length) % promotions.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % promotions.length);
  };

  if (promotions.length === 0) return null;

  const banner = promotions[currentIndex % promotions.length];

  const websiteUrl = banner.websiteUrl || banner.linkUrl || 'https://joingrouplinks.in';
  const arattaiUrl = banner.arattaiUrl || 'https://arattai.in';
  const whatsappUrl = banner.whatsappUrl || 'https://chat.whatsapp.com';
  const telegramUrl = banner.telegramUrl || 'https://t.me';

  const whatsappSubtitle =
    banner.whatsappUrl && banner.whatsappUrl.includes('whatsapp.com')
      ? currentCity
        ? `Safe ${currentCity} Groups`
        : currentState
        ? `Safe ${currentState} Groups`
        : 'Safe Kerala Groups'
      : 'Join WhatsApp Group';

  const telegramSubtitle =
    banner.telegramUrl && banner.telegramUrl.includes('t.me')
      ? currentCity
        ? `${currentCity} Community India`
        : 'Safe Community India'
      : 'Join Telegram Channel';

  return (
    <div
      className="relative w-full rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all overflow-hidden p-2 sm:p-2.5 group/card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 items-center">
        {/* Left Side: Tight Image Banner (No Excess Whitespace) */}
        <div className="lg:col-span-7 xl:col-span-8 relative rounded-xl overflow-hidden bg-slate-950/5 dark:bg-slate-950 flex items-center justify-center w-full h-[220px] sm:h-[240px] md:h-[260px]">
          <Image
            src={banner.imageUrl || '/images/promotions/verified_banner_art.png'}
            alt={banner.title || `Promotion Banner`}
            fill
            className="w-full h-full object-cover object-center rounded-xl"
            priority={initialIndex === 0}
            unoptimized
          />

          {/* Navigation Arrows for this Banner */}
          {promotions.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white shadow-lg flex items-center justify-center opacity-80 group-hover/card:opacity-100 transition-all hover:scale-110 cursor-pointer z-20"
                title="Previous Image"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white shadow-lg flex items-center justify-center opacity-80 group-hover/card:opacity-100 transition-all hover:scale-110 cursor-pointer z-20"
                title="Next Image"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </>
          )}

          {/* Badge indicator */}
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-white border border-slate-700/60 shadow">
            {bannerLabel} • Image {((currentIndex % promotions.length) + 1)} of {promotions.length}
          </div>
        </div>

        {/* Right Side: 4 Compact Action Buttons (Matching user graphic) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center gap-2">
          {/* 1. Website */}
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center justify-between p-2 sm:p-2.5 rounded-xl border bg-[#eef7ff] dark:bg-slate-800/90 border-[#d2e8fc] dark:border-sky-900/50 shadow-xs hover:shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 relative shrink-0">
                <Image
                  src="/images/promotions/icon_website.png"
                  alt="Website"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain drop-shadow"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  Website
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {banner.websiteUrl ? banner.websiteUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'joingrouplinks.in'}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#0084ff] text-white flex items-center justify-center shrink-0 shadow-sm group-hover/btn:scale-105 transition-transform ml-1.5">
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </a>

          {/* 2. Arattai */}
          <a
            href={arattaiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center justify-between p-2 sm:p-2.5 rounded-xl border bg-[#fff9e6] dark:bg-slate-800/90 border-[#ffecb3] dark:border-amber-900/50 shadow-xs hover:shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 relative shrink-0">
                <Image
                  src="/images/promotions/icon_arattai.png"
                  alt="Arattai"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain drop-shadow"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  Arattai
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {banner.arattaiUrl ? banner.arattaiUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'arattai.in'}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#ff9900] text-white flex items-center justify-center shrink-0 shadow-sm group-hover/btn:scale-105 transition-transform ml-1.5">
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </a>

          {/* 3. WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center justify-between p-2 sm:p-2.5 rounded-xl border bg-[#eafaf1] dark:bg-slate-800/90 border-[#c8f2d8] dark:border-emerald-900/50 shadow-xs hover:shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 relative shrink-0">
                <Image
                  src="/images/promotions/icon_whatsapp.png"
                  alt="WhatsApp"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain drop-shadow"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  WhatsApp
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {whatsappSubtitle}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#25d366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover/btn:scale-105 transition-transform ml-1.5">
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </a>

          {/* 4. Telegram */}
          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn flex items-center justify-between p-2 sm:p-2.5 rounded-xl border bg-[#eaf5ff] dark:bg-slate-800/90 border-[#cde7ff] dark:border-sky-900/50 shadow-xs hover:shadow-sm hover:scale-[1.01] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 relative shrink-0">
                <Image
                  src="/images/promotions/icon_telegram.png"
                  alt="Telegram"
                  width={44}
                  height={44}
                  className="w-full h-full object-contain drop-shadow"
                  unoptimized
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  Telegram
                </h4>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">
                  {telegramSubtitle}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#0088cc] text-white flex items-center justify-center shrink-0 shadow-sm group-hover/btn:scale-105 transition-transform ml-1.5">
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </a>
        </div>
      </div>

      {/* Dots Indicator for this Banner */}
      {promotions.length > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {promotions.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === (currentIndex % promotions.length)
                  ? 'w-6 bg-emerald-500 dark:bg-emerald-400'
                  : 'w-1.5 bg-slate-300 dark:bg-slate-700 hover:bg-emerald-400/50'
              }`}
              title={`View Slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const PaidPromotionCarousel: React.FC<PaidPromotionCarouselProps> = ({
  currentState,
  currentCity,
}) => {
  const [promotions, setPromotions] = useState<PaidPromotionBanner[]>(PAID_PROMOTION_BANNERS);

  const loadPromotions = () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('grouphub_custom_paid_promotions');
      if (stored) {
        try {
          const parsed: PaidPromotionBanner[] = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setPromotions(parsed);
            return;
          }
        } catch {}
      }
      setPromotions(PAID_PROMOTION_BANNERS);
    }
  };

  useEffect(() => {
    loadPromotions();

    const handleStorageChange = () => {
      loadPromotions();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('grouphub_promotions_updated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('grouphub_promotions_updated', handleStorageChange);
    };
  }, []);

  if (promotions.length === 0) return null;

  return (
    <div className="w-full my-4 space-y-4">
      {/* 
        ========================================================================
        TOP BANNER 1 (Image 1 scroll)
        ========================================================================
      */}
      <SingleScrollBanner
        promotions={promotions}
        initialIndex={0}
        bannerLabel="Top Banner 1"
        currentCity={currentCity}
        currentState={currentState}
      />

      {/* 
        ========================================================================
        BELOW BANNER 2 (Image 2 scroll)
        ========================================================================
      */}
      {promotions.length > 1 && (
        <SingleScrollBanner
          promotions={promotions}
          initialIndex={1}
          bannerLabel="Below Banner 2"
          currentCity={currentCity}
          currentState={currentState}
        />
      )}
    </div>
  );
};
