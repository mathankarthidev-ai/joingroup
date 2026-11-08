'use client';

import React, { useState, useEffect } from 'react';
import { Play, ShieldCheck, Sparkles, Clock, CheckCircle, Volume2, Lock, FastForward, X } from 'lucide-react';
import { AdSenseUnit } from './AdSenseUnit';
import { IS_PRODUCTION_LIVE_AD, ADSENSE_CLIENT_ID, PRODUCTION_VIDEO_AD_SLOT } from '@/lib/ad-config';

// Easily adjustable timer duration & dev mode bypass
const DEMO_AD_DURATION_SECONDS = 2;
// Set ENABLE_AD_WALL_GATE to false to completely bypass modal during development testing
const ENABLE_AD_WALL_GATE = false;

export const AdSenseAccessWallModal: React.FC = () => {
  const [showGate, setShowGate] = useState(false);
  const [isPlayingAd, setIsPlayingAd] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DEMO_AD_DURATION_SECONDS);
  const [adFinished, setAdFinished] = useState(false);

  useEffect(() => {
    if (!ENABLE_AD_WALL_GATE) {
      setShowGate(false);
      return;
    }

    if (typeof window !== 'undefined') {
      const passExpires = localStorage.getItem('grouphub_ad_pass_expires');
      const now = Date.now();

      if (!passExpires || parseInt(passExpires, 10) < now) {
        setShowGate(true);
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAd && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isPlayingAd && timeLeft === 0) {
      setAdFinished(true);
      setIsPlayingAd(false);
    }
    return () => clearInterval(timer);
  }, [isPlayingAd, timeLeft]);

  const handleStartAd = () => {
    setIsPlayingAd(true);
    setTimeLeft(DEMO_AD_DURATION_SECONDS);
    setAdFinished(false);

    if (IS_PRODUCTION_LIVE_AD && typeof window !== 'undefined') {
      try {
        ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle =
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
      } catch (e) {
        // Fallback to timer
      }
    }
  };

  const handleGrantAccess = () => {
    if (typeof window !== 'undefined') {
      const sixHoursLater = Date.now() + 6 * 60 * 60 * 1000;
      localStorage.setItem('grouphub_ad_pass_expires', sixHoursLater.toString());
      setShowGate(false);
    }
  };

  const handleSkipOrCancel = () => {
    setShowGate(false);
  };

  if (!ENABLE_AD_WALL_GATE || !showGate) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl space-y-6 text-slate-100 overflow-hidden">
        {/* SKIP / CANCEL BUTTON */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={handleSkipOrCancel}
            className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all font-black text-xs shadow-md flex items-center gap-1"
            title="Skip Ad & Enter Site Now"
          >
            <span>Skip Ad & Enter Site ⏩</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="text-center space-y-2 relative z-10 pt-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-md">
            <Lock className="w-3.5 h-3.5 fill-slate-950" />
            <span>6-HOUR SITE-WIDE ACCESS PASS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Welcome to <span className="text-emerald-400">GroupHub</span>
          </h2>

          {/* Bold Notice */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed text-center space-y-1">
            <p className="font-extrabold text-amber-400 text-sm sm:text-base">
              GroupHub is 100% FREE for everyone!
            </p>
            <p className="font-bold text-slate-100">
              Please watch a short ad to support our platform servers and unlock 6 hours of unlimited site-wide access to all 30 social group links!
            </p>
          </div>
        </div>

        {/* Ad Video Player Area */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 min-h-[200px] flex flex-col items-center justify-center p-4">
          {isPlayingAd ? (
            <div className="w-full space-y-4 text-center">
              <div className="relative aspect-video w-full max-w-md mx-auto rounded-xl bg-slate-900 border border-amber-500/40 p-4 flex flex-col items-center justify-center space-y-3 overflow-hidden shadow-inner">
                <div className="absolute top-2 left-2 flex items-center gap-1 bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded">
                  <span>{IS_PRODUCTION_LIVE_AD ? 'LIVE GOOGLE ADSENSE VIDEO' : 'FAST DEMO VIDEO AD'}</span>
                </div>
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-slate-800 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                  <Volume2 className="w-3 h-3 text-emerald-400" />
                  <span>Audio On</span>
                </div>

                {IS_PRODUCTION_LIVE_AD ? (
                  <ins
                    className="adsbygoogle block w-full h-full"
                    style={{ display: 'block' }}
                    data-ad-client={ADSENSE_CLIENT_ID}
                    data-ad-slot={PRODUCTION_VIDEO_AD_SLOT}
                    data-ad-format="auto"
                  />
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-pulse">
                      <Play className="w-6 h-6 fill-emerald-400 ml-0.5" />
                    </div>

                    <div className="text-center space-y-1">
                      <h4 className="text-sm font-bold text-white">Sponsoring GroupHub Free Pass</h4>
                      <p className="text-xs text-slate-400">Fast Video Ad Demo Playing...</p>
                    </div>
                  </>
                )}

                {/* Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mt-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full transition-all duration-500"
                    style={{ width: `${((DEMO_AD_DURATION_SECONDS - timeLeft) / DEMO_AD_DURATION_SECONDS) * 100}%` }}
                  />
                </div>
              </div>

              {/* Countdown Display */}
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400">
                <Clock className="w-4 h-4 animate-spin text-amber-400" />
                <span>Ad finishes in: {timeLeft}s...</span>
              </div>
            </div>
          ) : adFinished ? (
            <div className="text-center space-y-3 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Thank You for Supporting Us!</h3>
              <p className="text-xs text-slate-400">
                Your 6-hour unlimited pass is ready. You can now access all country, state, and category listings.
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
                <Play className="w-8 h-8 fill-emerald-400 ml-1" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Click Below to Play Ad or Skip</h4>
                <p className="text-xs text-slate-400">Unlocks 6 hours of full access immediately</p>
              </div>
            </div>
          )}
        </div>

        {/* AdSense Unit */}
        <AdSenseUnit slotKey="inArticle" />

        {/* Action Button & Skip Option */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
          {adFinished ? (
            <button
              onClick={handleGrantAccess}
              className="w-full py-4 rounded-2xl text-sm font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>ACCESS GRANTED – ENTER DIRECTORY</span>
            </button>
          ) : isPlayingAd ? (
            <button
              disabled
              className="w-full py-3.5 rounded-2xl text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 cursor-not-allowed opacity-80"
            >
              Playing Ad ({timeLeft}s remaining)...
            </button>
          ) : (
            <>
              <button
                onClick={handleStartAd}
                className="w-full sm:w-2/3 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 shadow-xl shadow-amber-500/20 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>PLAY AD & UNLOCK</span>
              </button>

              <button
                onClick={handleSkipOrCancel}
                className="w-full sm:w-1/3 py-3.5 rounded-2xl text-xs font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                <FastForward className="w-4 h-4 text-amber-400" />
                <span>Skip Ad & Enter</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
