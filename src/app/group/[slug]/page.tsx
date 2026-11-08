import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { GroupCard } from '@/components/GroupCard';
import { SafetyWarningBanner } from '@/components/SafetyWarningBanner';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';
import { TopScrollDownBanner, BottomJoinSection } from '@/components/ScrollDownJoinHelper';
import { ContextualSafetyBanner } from '@/components/ContextualSafetyBanner';
import { INITIAL_GROUPS } from '@/lib/data';
import {
  MessageSquare,
  ShieldCheck,
  Users,
  Star,
  Clock,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  AlertCircle,
  Sparkles,
  Award,
  MapPin,
  Globe,
} from 'lucide-react';

interface GroupPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: GroupPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const group = INITIAL_GROUPS.find((g) => g.slug === resolvedParams.slug);

  if (!group) return { title: 'Group Not Found | GroupHub' };

  const title = `${group.name} – Join Active ${group.platform.toUpperCase()} Group (${group.city || group.country})`;
  const description = `${group.description.slice(0, 155)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function GroupDetailPage({ params }: GroupPageProps) {
  const resolvedParams = await params;
  const group = INITIAL_GROUPS.find((g) => g.slug === resolvedParams.slug);

  if (!group) {
    notFound();
  }

  // Related groups (same category or city)
  const relatedGroups = INITIAL_GROUPS.filter(
    (g) => g.id !== group.id && (g.category === group.category || g.city === group.city)
  ).slice(0, 3);

  // Dynamic FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How to join ${group.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Scroll to the bottom of the page and click the 'JOIN ${group.platform.toUpperCase()} GROUP' button. You will be redirected securely to the official invite link.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is the ${group.name} link verified and free?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, GroupHub verified this link on ${group.lastChecked}. All public group joins are 100% free with zero registration fees.`,
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. HEADER (Includes Home Option in Nav) */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex-grow space-y-6">
        {/* Mandatory Safety & Privacy Warning Banner */}
        <SafetyWarningBanner />

        {/* 1. TOP SCROLL DOWN TO JOIN ARROW BANNER (STEP 1) */}
        <TopScrollDownBanner group={group} />

        {/* 2. AD (TOP HIGH-RPM LEADERBOARD BANNER) */}
        <AdSenseUnit slotKey="headerLeaderboard" />

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-emerald-500">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/groups/${group.countryCode.toLowerCase()}`} className="hover:text-emerald-500">
            {group.country}
          </Link>
          {group.city && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-700 dark:text-slate-300 font-semibold">{group.city}</span>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-emerald-600 dark:text-emerald-400 font-bold truncate max-w-[200px]">
            {group.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* 3. GROUP INFORMATION CARD */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6">
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-white bg-emerald-600 shadow-sm uppercase">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{group.platform} Group</span>
                  </span>

                  {group.isVerified && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/20">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Verified Active</span>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span>4.8 Rating</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-500 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Checked: {group.lastChecked}</span>
                  </span>
                </div>
              </div>

              {/* Group Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {group.name}
              </h1>

              {/* Group Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Group Description:
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {group.description}
                </p>
              </div>

              {/* ⭐ Members / Category / Location / Language */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">⭐ Category</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{group.category}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">📍 Location</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {group.city ? `${group.city}, ${group.country}` : group.country}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">🌐 Language</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{group.language}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">⭐ Members</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    <span>{group.memberCount.toLocaleString()}</span>
                  </span>
                </div>
              </div>

              {/* 3b. ADS DIRECTLY UNDER MEMBERS/CATEGORY */}
              <div className="pt-2">
                <AdSenseUnit slotKey="inArticle" />
              </div>
            </div>

            {/* 4. RELATED GROUPS */}
            {relatedGroups.length > 0 && (
              <div className="space-y-4 pt-2">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                  <span>Related Groups</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedGroups.map((rg) => (
                    <GroupCard key={rg.id} group={rg} />
                  ))}
                </div>
              </div>
            )}

            {/* 2 PROMOTIONAL BANNERS */}
            <PaidPromotionCarousel
              currentCountry={group.country}
              currentState={group.state}
              currentCity={group.city}
              currentCategory={group.category}
            />

            {/* 5. AD (IN-FEED BETWEEN SECTIONS) */}
            <AdSenseUnit slotKey="betweenSections" />

            {/* 6. USEFUL INFORMATION / FAQ */}
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-8 space-y-4">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-500" />
                <span>Useful Information & FAQ</span>
              </h2>

              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    How can I join a {group.city || group.category} group safely?
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Simply scroll to the bottom of this page and click the yellow &quot;JOIN {group.platform.toUpperCase()} GROUP&quot; button. GroupHub automatically validates invite links for safety before publishing.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Is joining this group 100% free?
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Yes, all group links listed on GroupHub are public communities and completely free to join with zero subscription or registration fees.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    How can I submit my own social group link?
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Click &quot;Submit Group&quot; in the header or <a href="https://forms.gle/oZzitWMZ8xtB9rmx5" target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 font-bold underline">open the official submission form here</a> to submit your WhatsApp, Telegram, or Arattai link for free indexing.
                  </p>
                </div>
              </div>
            </div>

            {/* 7. AD (BOTTOM BANNER AD BEFORE JOIN BUTTON) */}
            <AdSenseUnit slotKey="inArticle" />

            {/* 8. [ STEP 2: JOIN BUTTON PLACED AT THE PAGE END WITH SCROLL TARGET ] */}
            <BottomJoinSection group={group} />

            {/* Permanent Contextual Safety Advisory */}
            <ContextualSafetyBanner variant="group" />
          </div>

          {/* Sticky Sidebar AdSense Skyscraper (4 Cols) */}
          <aside className="lg:col-span-4 w-full space-y-6">
            <div className="sticky top-20">
              <AdSenseUnit slotKey="sidebarSticky" />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
