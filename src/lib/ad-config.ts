export interface AdSlotConfig {
  slotId: string;
  format: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  label: string;
  className?: string;
  responsive?: boolean;
}

export const ADSENSE_CLIENT_ID = 'ca-pub-9876543210123456';

// LIVE LAUNCH CONFIGURATION SWITCH:
// Set IS_PRODUCTION_LIVE_AD to true when deploying live to serve real Google AdSense Video/VAST Ads.
export const IS_PRODUCTION_LIVE_AD = false;
export const PRODUCTION_VIDEO_AD_SLOT = '1000000007';

export const AD_SLOTS: Record<string, AdSlotConfig> = {
  headerLeaderboard: {
    slotId: '1000000001',
    format: 'horizontal',
    label: 'Header Leaderboard Ad (728x90 / 320x50)',
    className: 'min-h-[90px] w-full max-w-[728px] mx-auto',
    responsive: true,
  },
  inFeedGrid: {
    slotId: '1000000002',
    format: 'fluid',
    label: 'In-Feed Native Group Ad (High CTR)',
    className: 'w-full h-full min-h-[260px]',
    responsive: true,
  },
  sidebarSticky: {
    slotId: '1000000003',
    format: 'vertical',
    label: 'Sidebar Sticky Skyscraper (300x600)',
    className: 'w-[300px] min-h-[600px] mx-auto sticky top-20',
    responsive: false,
  },
  inArticle: {
    slotId: '1000000004',
    format: 'rectangle',
    label: 'In-Article Contextual Ad (336x280 / Responsive)',
    className: 'w-full max-w-[650px] min-h-[280px] mx-auto my-6',
    responsive: true,
  },
  betweenSections: {
    slotId: '1000000005',
    format: 'horizontal',
    label: 'Between-Sections Banner Ad',
    className: 'w-full min-h-[100px] my-8',
    responsive: true,
  },
  bottomStickyAnchor: {
    slotId: '1000000006',
    format: 'horizontal',
    label: 'Sticky Bottom Mobile Anchor Bar',
    className: 'fixed bottom-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md p-2 shadow-2xl border-t border-slate-800 text-center',
    responsive: true,
  },
  videoAccessGate: {
    slotId: '1000000007',
    format: 'auto',
    label: '30-Second Video Ad Access Wall Gate',
    className: 'w-full max-w-md mx-auto min-h-[220px]',
    responsive: true,
  },
};
