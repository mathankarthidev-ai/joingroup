'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Sparkles,
  Gift,
  Copy,
  Check,
  CheckCircle2,
  Lock,
  Unlock,
  KeyRound,
  ArrowRight,
  Flame,
} from 'lucide-react';

interface ScratchCardOfferProps {
  onCodeApplied: (code: string) => void;
  appliedCode: string;
  isUnlocked: boolean;
}

const SECRET_CODE = 'BIZ99'; // 5-digit promotional access code

export const ScratchCardOffer: React.FC<ScratchCardOfferProps> = ({
  onCodeApplied,
  appliedCode,
  isUnlocked,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [scratchedPercent, setScratchedPercent] = useState(0);
  const [isRevealed, setIsRevealed] = useState(isUnlocked);
  const [copied, setCopied] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [inputError, setInputError] = useState('');

  // Draw gold scratchable foil on canvas
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';

    // Rich metallic gold gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f59e0b');
    gradient.addColorStop(0.25, '#fbbf24');
    gradient.addColorStop(0.5, '#d97706');
    gradient.addColorStop(0.75, '#fde68a');
    gradient.addColorStop(1, '#b45309');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add glitter pattern / sparkles overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Border inner
    ctx.strokeStyle = '#78350f';
    ctx.lineWidth = 3;
    ctx.strokeRect(6, 6, width - 12, height - 12);

    // Text on gold foil
    ctx.fillStyle = '#451a03';
    ctx.font = 'bold 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎁 SCRATCH HERE', width / 2, height / 2 - 12);

    ctx.font = 'bold 11px sans-serif';
    ctx.fillStyle = '#78350f';
    ctx.fillText('Swipe or drag to reveal 5-digit code', width / 2, height / 2 + 12);
  }, []);

  useEffect(() => {
    if (!isRevealed) {
      initCanvas();
    }
  }, [initCanvas, isRevealed]);

  // Scratch action
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    checkScratchedPercentage();
  };

  const checkScratchedPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      // Sample every 4th pixel for speed
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const totalSampled = pixels.length / 16;
      const percent = Math.round((transparentPixels / totalSampled) * 100);
      setScratchedPercent(percent);

      if (percent >= 38) {
        revealOffer();
      }
    } catch (e) {
      // Security fallback
    }
  };

  const revealOffer = () => {
    setIsRevealed(true);
    onCodeApplied(SECRET_CODE);
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    scratch(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    scratch(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    setIsScratching(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsScratching(true);
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isScratching) return;
    if (e.touches[0]) {
      scratch(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    setIsScratching(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SECRET_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleManualApply = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = manualCode.trim().toUpperCase();
    if (clean.length !== 5) {
      setInputError('Please enter a valid 5-digit code');
      return;
    }

    if (clean === SECRET_CODE || clean === 'CHAI9' || clean === '99BIZ' || clean === 'CHAI5' || clean === 'LOCAL') {
      setInputError('');
      setIsRevealed(true);
      onCodeApplied(clean);
    } else {
      setInputError('Invalid code. Scratch the card or try BIZ99');
    }
  };

  return (
    <div className="rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-amber-500/40 p-6 sm:p-8 backdrop-blur-sm shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Explanation Column */}
        <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-black">
            <Gift className="w-4 h-4 text-orange-500 animate-bounce" />
            <span>EXCLUSIVE FOUNDING BUSINESS REWARD</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Scratch Card to Unlock <span className="text-amber-500 underline decoration-amber-400">₹99 Launch Offer</span>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Scratch the gold card on the right to reveal your <strong>5-digit secret access code</strong>. Once revealed, the code instantly unlocks the <strong>₹99 for 6 months</strong> (Just ₹16.50/mo ☕) pricing across all paid tiers!
          </p>

          {/* Value Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-800 shadow-sm">
              <span className="text-base">☕</span> Less than a cup of chai
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-800 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Save up to 99%
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-800 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> First 1,000 businesses
            </span>
          </div>

          {/* Manual 5-Digit Code Entry Option */}
          <form onSubmit={handleManualApply} className="pt-3 flex flex-col sm:flex-row items-center gap-2 max-w-md mx-auto lg:mx-0">
            <div className="relative w-full">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                maxLength={5}
                placeholder="Or enter 5-digit code..."
                value={manualCode}
                onChange={(e) => {
                  setManualCode(e.target.value.toUpperCase());
                  setInputError('');
                }}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs font-mono font-bold tracking-widest uppercase bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-xs shrink-0 transition-all shadow-md"
            >
              Apply Code
            </button>
          </form>
          {inputError && (
            <p className="text-[11px] text-rose-500 font-semibold text-center lg:text-left">{inputError}</p>
          )}
        </div>

        {/* Right Scratch Card Interactive Box */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-[300px] h-[160px] sm:w-[320px] sm:h-[170px] rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-400/80 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex flex-col items-center justify-center text-center p-4">
            {/* Underlying Revealed Offer Content */}
            <div className="space-y-1.5 select-none">
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>5-Digit Access Code</span>
              </span>

              {/* Big 5-digit code badge */}
              <div className="flex items-center justify-center gap-1.5 pt-0.5">
                {SECRET_CODE.split('').map((char, idx) => (
                  <span
                    key={idx}
                    className="w-9 h-11 rounded-xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg border border-amber-200"
                  >
                    {char}
                  </span>
                ))}
              </div>

              <div className="pt-1">
                <div className="text-white text-xs font-extrabold flex items-center justify-center gap-1">
                  <span>☕ ₹99 for 6 Months Unlocked!</span>
                </div>
                <p className="text-[10px] text-emerald-400 font-bold">
                  Just ₹16.50/mo · Less than a cup of chai
                </p>
              </div>

              {/* Quick Copy Button */}
              <button
                onClick={handleCopy}
                className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold transition-all border border-white/20"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Code Copied!' : 'Copy Code BIZ99'}</span>
              </button>
            </div>

            {/* Canvas Scratch Foil Overlay (Only active when not revealed) */}
            {!isRevealed && (
              <canvas
                ref={canvasRef}
                width={320}
                height={170}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none"
              />
            )}
          </div>

          {/* Quick Reveal / Status Controller */}
          <div className="mt-3 flex items-center gap-3">
            {!isRevealed ? (
              <button
                onClick={revealOffer}
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Tap to Scratch &amp; Reveal Code</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-400 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Code {appliedCode || SECRET_CODE} Applied Successfully!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
