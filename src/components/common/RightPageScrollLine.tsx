'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

/**
 * RightPageScrollLine:
 * A stylish, modern vertical scroll line positioned on the right edge of the page.
 * Displays page loaded/scroll percentage with an interactive draggable handle
 * ("drag down like scroll line small stylish").
 */
export const RightPageScrollLine: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate current page scroll progress (0% - 100%)
  const updateScrollProgress = useCallback(() => {
    if (typeof window === 'undefined') return;
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop || 0;
    const scrollHeight = doc.scrollHeight || 0;
    const clientHeight = window.innerHeight || doc.clientHeight || 0;
    const maxScroll = scrollHeight - clientHeight;

    if (maxScroll > 150) {
      setIsScrollable(true);
      const progress = Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100));
      setScrollProgress(progress);
    } else {
      setIsScrollable(false);
    }
  }, []);

  // Listen for scroll & resize events
  useEffect(() => {
    const handleScroll = () => {
      updateScrollProgress();
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    };

    updateScrollProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateScrollProgress);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [updateScrollProgress]);

  // Scroll to target progress ratio (0 to 1)
  const scrollToRatio = useCallback((ratio: number, smooth: boolean = false) => {
    if (typeof window === 'undefined') return;
    const doc = document.documentElement;
    const maxScroll = doc.scrollHeight - window.innerHeight;
    const clampedRatio = Math.min(1, Math.max(0, ratio));
    const targetY = clampedRatio * maxScroll;

    if (smooth) {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: targetY });
    }
  }, []);

  // Click on track to jump directly
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const ratio = clickY / rect.height;
    scrollToRatio(ratio, true);
  };

  // Drag handle down / up (Mouse & Touch)
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);

    const onMove = (clientY: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const currentY = clientY - rect.top;
      const ratio = currentY / rect.height;
      scrollToRatio(ratio, false);
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      moveEvent.preventDefault();
      onMove(moveEvent.clientY);
    };

    const handleTouchMove = (touchEvent: TouchEvent) => {
      if (touchEvent.touches.length > 0) {
        onMove(touchEvent.touches[0].clientY);
      }
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleDragEnd);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleDragEnd);
  };

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToBottom = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    }
  };

  if (!isScrollable) return null;

  return (
    <aside
      aria-label="Page scroll progress and drag-down navigation"
      className="fixed right-1.5 sm:right-3 top-24 bottom-20 z-40 flex flex-col items-center justify-between pointer-events-none select-none transition-opacity duration-300"
    >
      {/* Top Jump Button */}
      <button
        type="button"
        onClick={scrollToTop}
        title="Scroll to top of page (0%)"
        aria-label="Scroll to top"
        className="w-6 h-6 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-700 shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 pointer-events-auto cursor-pointer mb-1.5"
      >
        <ChevronUp className="w-3.5 h-3.5" />
      </button>

      {/* Main Small Stylish Vertical Scroll Track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex-1 w-1 sm:w-1.5 rounded-full bg-slate-300/40 dark:bg-slate-700/50 hover:bg-slate-300/70 dark:hover:bg-slate-700/80 backdrop-blur-md cursor-pointer pointer-events-auto transition-colors group shadow-inner my-1"
        title="Click or drag down to scroll page"
      >
        {/* Filled Progress Line (Active Scrolled Area) */}
        <div
          className="absolute top-0 left-0 right-0 rounded-full bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-400 shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all duration-75"
          style={{ height: `${scrollProgress}%` }}
        />

        {/* Small Stylish Drag Handle Thumb (Drag Down) */}
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-white dark:bg-slate-950 border-2 border-blue-600 dark:border-blue-400 shadow-md shadow-blue-500/40 flex items-center justify-center transition-transform cursor-grab active:cursor-grabbing hover:scale-125 z-10 ${
            isDragging ? 'scale-125 ring-4 ring-blue-500/30' : ''
          }`}
          style={{ top: `${scrollProgress}%` }}
        >
          {/* Inner Glowing Core */}
          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 animate-pulse" />
        </div>
      </div>

      {/* Bottom Jump Button */}
      <button
        type="button"
        onClick={scrollToBottom}
        title="Scroll to bottom of page (100%)"
        aria-label="Scroll to bottom"
        className="w-6 h-6 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/80 dark:border-slate-700 shadow-md backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 pointer-events-auto cursor-pointer mt-1.5"
      >
        <ChevronDown className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
};

export default RightPageScrollLine;
