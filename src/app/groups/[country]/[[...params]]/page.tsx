import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';
import { GroupCard } from '@/components/GroupCard';
import { SAFE_COUNTRIES, CATEGORIES, INITIAL_GROUPS } from '@/lib/data';
import { MapPin, Globe, ShieldCheck, ChevronRight, HelpCircle, Users, Sparkles } from 'lucide-react';

interface PageProps {
  params: Promise<{
    country: string;
    params?: string[];
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const countrySlug = resolvedParams.country;
  const paramArray = resolvedParams.params || [];

  const countryObj = SAFE_COUNTRIES.find((c) => c.slug === countrySlug);
  if (!countryObj) return { title: 'Groups Directory | GroupHub' };

  let stateName = '';
  let cityName = '';
  let categoryName = '';

  if (paramArray.length === 1) {
    // Could be state or category
    const stateMatch = countryObj.states.find((s) => s.slug === paramArray[0]);
    const catMatch = CATEGORIES.find((cat) => cat.slug === paramArray[0]);
    if (stateMatch) stateName = stateMatch.name;
    if (catMatch) categoryName = catMatch.name;
  } else if (paramArray.length === 2) {
    // state/city or state/category
    const stateMatch = countryObj.states.find((s) => s.slug === paramArray[0]);
    if (stateMatch) {
      stateName = stateMatch.name;
      const cityMatch = stateMatch.cities.find((ci) => ci.slug === paramArray[1]);
      const catMatch = CATEGORIES.find((cat) => cat.slug === paramArray[1]);
      if (cityMatch) cityName = cityMatch.name;
      if (catMatch) categoryName = catMatch.name;
    }
  } else if (paramArray.length >= 3) {
    // state/city/category
    const stateMatch = countryObj.states.find((s) => s.slug === paramArray[0]);
    if (stateMatch) {
      stateName = stateMatch.name;
      const cityMatch = stateMatch.cities.find((ci) => ci.slug === paramArray[1]);
      if (cityMatch) cityName = cityMatch.name;
      const catMatch = CATEGORIES.find((cat) => cat.slug === paramArray[2]);
      if (catMatch) categoryName = catMatch.name;
    }
  }

  const locationTitle = cityName
    ? `${cityName}, ${stateName}`
    : stateName
    ? `${stateName}, ${countryObj.name}`
    : countryObj.name;

  const topicTitle = categoryName ? `${categoryName} WhatsApp & Telegram Groups` : 'WhatsApp & Telegram Groups Directory';

  const fullTitle = `${locationTitle} ${topicTitle} – Active 2026 Links | GroupHub`;
  const description = `Join active ${topicTitle.toLowerCase()} in ${locationTitle}. Verified invites, zero spam, updated for 2026.`;

  return {
    title: fullTitle,
    description: description,
    openGraph: {
      title: fullTitle,
      description: description,
      type: 'website',
    },
  };
}

export default async function DynamicGeoGroupPage({ params }: PageProps) {
  const resolvedParams = await params;
  const countrySlug = resolvedParams.country;
  const paramArray = resolvedParams.params || [];

  const countryObj = SAFE_COUNTRIES.find((c) => c.slug === countrySlug);
  if (!countryObj) {
    notFound();
  }

  let stateSlug = '';
  let stateName = '';
  let citySlug = '';
  let cityName = '';
  let categorySlug = '';
  let categoryName = '';

  // Parse path matrix
  if (paramArray.length === 1) {
    const stateMatch = countryObj.states.find((s) => s.slug === paramArray[0]);
    const catMatch = CATEGORIES.find((cat) => cat.slug === paramArray[0]);
    if (stateMatch) {
      stateSlug = stateMatch.slug;
      stateName = stateMatch.name;
    } else if (catMatch) {
      categorySlug = catMatch.slug;
      categoryName = catMatch.name;
    }
  } else if (paramArray.length === 2) {
    const stateMatch = countryObj.states.find((s) => s.slug === paramArray[0]);
    if (stateMatch) {
      stateSlug = stateMatch.slug;
      stateName = stateMatch.name;
      const cityMatch = stateMatch.cities.find((ci) => ci.slug === paramArray[1]);
      const catMatch = CATEGORIES.find((cat) => cat.slug === paramArray[1]);
      if (cityMatch) {
        citySlug = cityMatch.slug;
        cityName = cityMatch.name;
      } else if (catMatch) {
        categorySlug = catMatch.slug;
        categoryName = catMatch.name;
      }
    }
  } else if (paramArray.length >= 3) {
    const stateMatch = countryObj.states.find((s) => s.slug === paramArray[0]);
    if (stateMatch) {
      stateSlug = stateMatch.slug;
      stateName = stateMatch.name;
      const cityMatch = stateMatch.cities.find((ci) => ci.slug === paramArray[1]);
      if (cityMatch) {
        citySlug = cityMatch.slug;
        cityName = cityMatch.name;
      }
      const catMatch = CATEGORIES.find((cat) => cat.slug === paramArray[2]);
      if (catMatch) {
        categorySlug = catMatch.slug;
        categoryName = catMatch.name;
      }
    }
  }

  // Filter groups
  const matchingGroups = INITIAL_GROUPS.filter((g) => {
    if (g.country.toLowerCase() !== countryObj.name.toLowerCase()) return false;
    if (stateName && g.state?.toLowerCase() !== stateName.toLowerCase()) return false;
    if (cityName && g.city?.toLowerCase() !== cityName.toLowerCase()) return false;
    if (categoryName && g.category.toLowerCase().indexOf(categoryName.toLowerCase()) === -1) return false;
    return true;
  });

  const displayLocation = cityName
    ? `${cityName}, ${stateName}, ${countryObj.name}`
    : stateName
    ? `${stateName}, ${countryObj.name}`
    : countryObj.name;

  // JSON-LD Breadcrumbs
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://grouphub.example.com/' },
    { '@type': 'ListItem', position: 2, name: countryObj.name, item: `https://grouphub.example.com/groups/${countryObj.slug}` },
  ];

  if (stateName) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: breadcrumbItems.length + 1,
      name: stateName,
      item: `https://grouphub.example.com/groups/${countryObj.slug}/${stateSlug}`,
    });
  }

  if (cityName) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: breadcrumbItems.length + 1,
      name: cityName,
      item: `https://grouphub.example.com/groups/${countryObj.slug}/${stateSlug}/${citySlug}`,
    });
  }

  if (categoryName) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: breadcrumbItems.length + 1,
      name: categoryName,
      item: `https://grouphub.example.com/groups/${countryObj.slug}/${categorySlug}`,
    });
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 flex-grow space-y-6">
        {/* Top Header AdSense Leaderboard */}
        <AdSenseUnit slotKey="headerLeaderboard" />

        {/* Dynamic Breadcrumbs */}
        <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-emerald-500">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/groups/${countryObj.slug}`} className="hover:text-emerald-500">
            {countryObj.flag} {countryObj.name}
          </Link>
          {stateName && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/groups/${countryObj.slug}/${stateSlug}`} className="hover:text-emerald-500">
                {stateName}
              </Link>
            </>
          )}
          {cityName && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link href={`/groups/${countryObj.slug}/${stateSlug}/${citySlug}`} className="hover:text-emerald-500">
                {cityName}
              </Link>
            </>
          )}
          {categoryName && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{categoryName}</span>
            </>
          )}
        </nav>

        {/* Page Header Title */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 md:p-8 space-y-3 shadow-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <MapPin className="w-3.5 h-3.5" />
            <span>GEO Directory: {displayLocation}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {cityName || stateName || countryObj.name} {categoryName || 'WhatsApp & Telegram Groups'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            Browse verified WhatsApp group links, Telegram channels, and Instagram communities operating in {displayLocation}. Updated regularly to eliminate dead links and prevent spam.
          </p>
        </div>

        {/* Paid Promotion Banner Carousel for this City / State */}
        <PaidPromotionCarousel
          currentCountry={countryObj.name}
          currentState={stateName}
          currentCity={cityName}
          currentCategory={categoryName}
        />

        {/* Layout Grid (Main Content + AdSense Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Column (3 Columns) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Groups Listing */}
            {matchingGroups.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <Users className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No specific groups listed yet for {displayLocation}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Be the first to submit a group link for this location or check national listings.
                </p>
                <a
                  href="https://forms.gle/oZzitWMZ8xtB9rmx5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  Submit a Group
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {matchingGroups.map((group, idx) => (
                  <React.Fragment key={group.id}>
                    <GroupCard group={group} />
                    {(idx + 1) % 3 === 0 && (
                      <div className="col-span-1 md:col-span-2">
                        <AdSenseUnit slotKey="inFeedGrid" />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}

            {/* Long-Tail Substantial Content Section for SEO Value */}
            <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                About {categoryName || 'Social'} Groups in {displayLocation}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Joining active local social groups in {displayLocation} is one of the fastest ways to stay updated on job vacancies, tech meetups, educational resources, and neighborhood deals. GroupHub acts as a safe, searchable index connecting group owners with real community members.
              </p>

              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 pt-2">
                Community Guidelines & Safety Checklist
              </h3>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-disc pl-5">
                <li>Never pay registration fees for job interviews or recruitment calls.</li>
                <li>Respect group members and adhere to group admin guidelines.</li>
                <li>Report dead or spam invite links immediately using our report button.</li>
              </ul>
            </div>
          </div>

          {/* AdSense Sticky Sidebar Column (1 Column) */}
          <div className="lg:col-span-1 space-y-6">
            <AdSenseUnit slotKey="sidebarSticky" />
          </div>
        </div>

        {/* Bottom AdSense Banner */}
        <AdSenseUnit slotKey="betweenSections" />
      </main>

      <Footer />
    </div>
  );
}
