export type DomainMode = 'india' | 'world';

export interface DomainConfig {
  domain: string;
  name: string;
  badge: string;
  mode: DomainMode;
  primaryColor: string;
  gradientBg: string;
  headerBg: string;
  accentBadgeBg: string;
  accentTextColor: string;
  buttonBg: string;
  noticeText: string;
}

export const DOMAIN_CONFIGS: Record<DomainMode, DomainConfig> = {
  india: {
    domain: 'joingrouplinks.in',
    name: 'JoinGroupLinks.in',
    badge: 'INDIA PORTAL 🇮🇳',
    mode: 'india',
    primaryColor: 'emerald',
    gradientBg: 'from-emerald-600 via-teal-600 to-emerald-800',
    headerBg: 'bg-emerald-500',
    accentBadgeBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    accentTextColor: 'text-emerald-500',
    buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    noticeText: '🇮🇳 Official India Social Groups Directory • WhatsApp, Telegram & Arattai by Zoho #1',
  },
  world: {
    domain: 'joingrouplinks.com',
    name: 'JoinGroupLinks.com',
    badge: 'GLOBAL TIER-1 🌐 ($35 eCPM)',
    mode: 'world',
    primaryColor: 'blue',
    gradientBg: 'from-blue-700 via-indigo-800 to-emerald-700',
    headerBg: 'bg-blue-600',
    accentBadgeBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    accentTextColor: 'text-blue-500',
    buttonBg: 'bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-500 hover:to-emerald-400 text-white',
    noticeText: '🌐 Global Tier-1 Directory • USA 🇺🇸, UK 🇬🇧, Canada 🇨🇦, Australia 🇦🇺 & Europe ($15-$35 eCPM)',
  },
};
