import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { INITIAL_GROUPS, CATEGORIES, TOP_30_PLATFORMS, PLATFORM_MAP } from '@/lib/data';
import { GroupCard } from '@/components/GroupCard';
import { JustdialHeroStrip } from '@/components/common/JustdialHeroStrip';
import { TypewriterText } from '@/components/common/TypewriterText';
import {
  ShieldCheck,
  Users,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Zap,
  Globe,
  Award,
  ArrowRight,
  TrendingUp,
  Lock,
  MessageSquare,
  Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '7,000+ Active WhatsApp, Telegram & Arattai Group Links (2026) – Join Free',
  description:
    'Browse 7,000+ verified, active group links across India in 2026. Join WhatsApp communities, Arattai (by Zoho), Telegram channels, and Discord servers for jobs, UPSC, NEET, tech, crypto, business & students.',
  keywords: [
    '7000+ group links 2026',
    'WhatsApp group links 2026',
    'Arattai group links India',
    'active Telegram channels 2026',
    'job vacancy WhatsApp groups',
    'UPSC NEET study groups 2026',
    'Indian community group links',
    'free WhatsApp group invite links 2026',
  ],
  openGraph: {
    title: '7,000+ Active WhatsApp, Telegram & Arattai Group Links (2026)',
    description:
      'Discover 7,000+ verified active group invite links across India. Free to join on Arattai by Zoho, WhatsApp, Telegram and Discord.',
    url: 'https://joingrouplinks.in/groups-2026',
    siteName: 'JoinGroupLinks & Nammabus',
    locale: 'en_IN',
    type: 'website',
  },
  alternates: {
    canonical: 'https://joingrouplinks.in/groups-2026',
  },
};

export default function Groups2026SEOPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How many active group links are available in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'JoinGroupLinks hosts over 7,000+ verified, active community links across 30+ social messaging platforms including Arattai (by Zoho), WhatsApp, Telegram, Discord, and Instagram Broadcast.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are all 7,000+ group links free to join?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, 100% of the public directory invite links are free to join with zero subscription charges or intermediary fees.',
        },
      },
      {
        '@type': 'Question',
        name: 'What categories are available among the 7,000+ groups?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The 7,000+ groups span 40+ curated categories including IT & Software Engineering, UPSC & Govt Exam Prep, Jobs & Careers, Real Estate & Housing, B2B Commerce, Medical & Healthcare, Crypto & Trading, and Regional Indian Communities.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is Arattai (by Zoho) featured as India #1 in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Arattai is an Indian-developed, privacy-first messaging and community platform engineered by Zoho Corporation. It is ranked #1 in our directory to champion secure, ad-free, indigenous digital communities in India.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I submit my own community link in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Group administrators can submit their invite links for free through our Submit Group portal. Submissions undergo a safety compliance check before being published.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Schema.org FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Header />

      <main className="flex-1 w-full">
        {/* ========================================================
            1. HERO SECTION: 7,000+ GROUPS IN 2026
           ======================================================== */}
        <section className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white pt-14 pb-20 px-4 overflow-hidden">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10 text-center space-y-5">
            {/* SEO Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Verified 2026 Directory • 7,000+ Active Public Communities</span>
            </div>

            {/* Main Headline with Typewriter */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-4xl mx-auto leading-tight min-h-[3.2em] sm:min-h-[2.4em]">
              7,000+ Active Groups in 2026 for{' '}
              <TypewriterText
                words={[
                  'WhatsApp Communities',
                  'Arattai by Zoho',
                  'Telegram Channels',
                  'Discord Servers',
                  'UPSC & Govt Exams',
                  'IT & AI Developers',
                  'B2B Wholesale Traders',
                ]}
                className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400"
                cursorClassName="text-emerald-400"
              />
            </h1>

            {/* Subhead */}
            <p className="text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed">
              India&apos;s authoritative public directory index of <strong>7,000+ active WhatsApp group links</strong>, <strong>Arattai communities</strong>, <strong>Telegram channels</strong>, and <strong>Discord servers</strong>. Verified for 2026 with anti-spam moderation and direct one-click invite access.
            </p>

            {/* Key Metric Highlights Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto pt-4 text-center">
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="block text-2xl sm:text-3xl font-black text-emerald-400">7,000+</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">Active Groups</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="block text-2xl sm:text-3xl font-black text-amber-400">30+</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">Social Platforms</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="block text-2xl sm:text-3xl font-black text-sky-400">100%</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">Free to Join</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <span className="block text-2xl sm:text-3xl font-black text-purple-400">2026</span>
                <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold">Fresh Verified</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/groups"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
              >
                <span>Browse All 7,000+ Groups</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://forms.gle/oZzitWMZ8xtB9rmx5"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 backdrop-blur-md transition-all cursor-pointer inline-flex items-center"
              >
                <span>+ Submit Your Group Free</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================
            2. JUSTDIAL CAROUSEL & CATEGORY TILES
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <JustdialHeroStrip variant="groups" />
        </section>

        {/* ========================================================
            3. FEATURED 2026 GROUPS SHOWCASE
           ======================================================== */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>2026 Trending Hubs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Featured Verified Communities in 2026
              </h2>
            </div>
            <Link
              href="/groups"
              className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Explore all 7,000+ groups</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INITIAL_GROUPS.slice(0, 6).map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </section>

        {/* ========================================================
            4. IN-DEPTH SEO EDITORIAL CONTENT: 7,000+ GROUPS GUIDE (2026)
           ======================================================== */}
        <section className="bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Section 1: Introduction */}
            <article className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                The Complete Directory of 7,000+ Active WhatsApp &amp; Arattai Group Links in 2026
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                As social media and business communication evolve, decentralized chat communities have become the cornerstone of online networking. In 2026, <strong>JoinGroupLinks.in</strong> aggregates over <strong>7,000+ verified public group links</strong> spanning 30+ leading platforms. Whether you are preparing for civil services exams, seeking direct B2B wholesale manufacturers, looking for software engineering hackathons, or connecting with local neighborhood associations in your city, our directory provides spam-free, instant invite access.
              </p>
            </article>

            {/* Section 2: 7,000+ Groups by Major Categories in 2026 */}
            <div className="space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Popular Categories Across Our 7,000+ Groups
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <span>📚</span>
                    <span>Education, UPSC &amp; Competitive Exam Prep (1,850+ Groups)</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Active study circles for UPSC Civil Services, NEET medical entrance, JEE Main &amp; Advanced, State PSCs (TNPSC, UPPSC, KPSC), Banking IBPS, SSC CGL, and GATE. Members share verified PDF study materials, daily current affairs quizzes, and answer-writing tips.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-sm text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <span>💻</span>
                    <span>Technology, AI &amp; Software Developers (1,420+ Groups)</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Channels for Python, Full-Stack React &amp; Next.js developers, Generative AI &amp; LLM researchers, DevOps/AWS architects, and open-source contributors. Discover hackathons, code reviews, and remote tech job alerts.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                    <span>💼</span>
                    <span>Jobs, Careers &amp; Internship Openings (1,280+ Groups)</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Daily verified job postings for freshers and experienced professionals across IT, marketing, accounting, civil engineering, data science, and corporate HR in Chennai, Bangalore, Mumbai, Delhi NCR, and Hyderabad.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2">
                  <h4 className="font-bold text-sm text-purple-600 dark:text-purple-400 flex items-center gap-2">
                    <span>🏭</span>
                    <span>B2B Wholesale Commerce &amp; Local Business (1,150+ Groups)</span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    Direct manufacturer-to-retailer networks. Buy and sell textiles from Surat, brassware from Moradabad, electronics from Delhi, and engineering components from Coimbatore and Peenya at zero middleman commission.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Why Arattai (by Zoho) is India #1 in 2026 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-500/30 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider">
                  India Priority #1
                </span>
                <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
                  Engineered by Zoho Corporation
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Why JoinGroupLinks Champions Arattai (by Zoho) in 2026
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                As India moves toward data sovereignty and sovereign tech infrastructure, <strong>Arattai</strong> has emerged as the premier home-grown alternative to foreign messaging platforms. Engineered in Tamil Nadu by Zoho, Arattai delivers enterprise-grade security, ad-free group discussions, and zero third-party data tracking. In our directory of 7,000+ communities, Arattai groups receive priority visibility to support Indian digital independence.
              </p>
            </div>

            {/* Section 4: Safety & Verification Rules */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                <span>User Safety &amp; Anti-Fraud Guidelines in 2026</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                While community chat links provide great networking value, user safety remains paramount:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Never share banking OTPs:</strong> No legitimate group admin will ever ask for UPI PINs, CVV, or passwords.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Beware of get-rich-quick scams:</strong> Exercise extreme caution with guaranteed investment or crypto schemes.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Phone privacy settings:</strong> Set your WhatsApp &amp; Telegram profile settings so only contacts can view your phone number.</span>
                </li>
                <li className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Report fraudulent groups:</strong> Report any misleading or spam group links to 1930 or our grievance redressal team.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================
            5. STRUCTURED SEO FAQS (FAQ SCHEMA INCLUDED)
           ======================================================== */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              7,000+ Group Links in 2026 – Everything You Need to Know
            </h2>
          </div>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, idx) => (
              <details
                key={idx}
                className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
              >
                <summary className="flex items-center justify-between font-bold text-sm sm:text-base text-slate-900 dark:text-white cursor-pointer list-none select-none">
                  <span>{item.name}</span>
                  <span className="text-slate-400 group-open:rotate-180 transition-transform text-lg">▾</span>
                </summary>
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {item.acceptedAnswer.text}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
