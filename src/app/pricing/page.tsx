'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Check,
  Zap,
  Building2,
  Users,
  ShieldCheck,
  Star,
  Sparkles,
  ArrowRight,
  HelpCircle,
  CreditCard,
  Crown,
  Flame,
  BadgeCheck,
  Clock,
  AlertCircle,
  Percent,
  CheckCircle2,
  Gift,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LocalBizHeader } from '@/components/local-biz/LocalBizHeader';
import { LocalBizFooter } from '@/components/local-biz/LocalBizFooter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { ScratchCardOffer } from '@/components/local-biz/ScratchCardOffer';
import { PaymentCheckoutModal, PlanCheckoutDetails } from '@/components/local-biz/PaymentCheckoutModal';

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950" />}>
      <PricingContent />
    </Suspense>
  );
}

function PricingContent() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get('product') || searchParams.get('tab') || searchParams.get('type');

  // Launch offer is active by default
  const [pricingMode, setPricingMode] = useState<'launch' | 'regular'>('launch');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [activeTab, setActiveTab] = useState<'business' | 'groups'>(() => {
    if (productParam === 'groups') return 'groups';
    return 'business';
  });

  // Per-plan unlock state (each plan starts locked; user must enter code on the card to unlock offer)
  const [unlockedPlans, setUnlockedPlans] = useState<Record<string, boolean>>({});
  const [planPromoCodes, setPlanPromoCodes] = useState<Record<string, string>>({});
  const [revealedSecretCode, setRevealedSecretCode] = useState<string>('');

  // Payment checkout modal state
  const [checkoutPlan, setCheckoutPlan] = useState<PlanCheckoutDetails | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Inline card apply code state
  const [cardCodeInputs, setCardCodeInputs] = useState<Record<string, string>>({});
  const [cardInputErrors, setCardInputErrors] = useState<Record<string, string>>({});

  const handleApplyCodeForPlan = (planSlug: string, code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setCardInputErrors((prev) => ({ ...prev, [planSlug]: 'Please enter 5-digit code' }));
      return;
    }
    if (clean.length !== 5) {
      setCardInputErrors((prev) => ({ ...prev, [planSlug]: 'Must be 5 digits (e.g. BIZ99)' }));
      return;
    }
    const VALID_CODES = ['BIZ99', 'CHAI9', '99BIZ', 'CHAI5', 'LOCAL'];
    if (VALID_CODES.includes(clean)) {
      setUnlockedPlans((prev) => ({ ...prev, [planSlug]: true }));
      setPlanPromoCodes((prev) => ({ ...prev, [planSlug]: clean }));
      setCardInputErrors((prev) => ({ ...prev, [planSlug]: '' }));
    } else {
      setCardInputErrors((prev) => ({ ...prev, [planSlug]: 'Invalid code. Try BIZ99' }));
    }
  };

  const handleRemoveCodeForPlan = (planSlug: string) => {
    setUnlockedPlans((prev) => ({ ...prev, [planSlug]: false }));
    setPlanPromoCodes((prev) => ({ ...prev, [planSlug]: '' }));
    setCardCodeInputs((prev) => ({ ...prev, [planSlug]: '' }));
  };

  const handleScratchRevealed = (code: string) => {
    setRevealedSecretCode(code);
  };

  const handleApplyToAllPlans = () => {
    const code = revealedSecretCode || 'BIZ99';
    setUnlockedPlans({ basic: true, pro: true, premium: true });
    setPlanPromoCodes({ basic: code, pro: code, premium: code });
  };

  useEffect(() => {
    if (productParam === 'groups') {
      setActiveTab('groups');
    } else if (productParam === 'local-biz' || productParam === 'business') {
      setActiveTab('business');
    }
  }, [productParam]);

  // Business plans with original regular rates and ₹99 launch promo
  const businessPlans = [
    {
      name: 'Free Listing',
      slug: 'free',
      isPaid: false,
      launchPrice: 0,
      regularPrice: 0,
      sixMonthRegularPrice: 0,
      periodLaunch: 'Free forever',
      periodRegular: 'forever',
      monthlyEquivalent: '₹0 / month',
      regularLabel: 'Free forever',
      description: 'Standard profile, contact details, one category and city, enquiry messages and basic analytics.',
      popular: false,
      badge: null,
      savings: null,
      features: [
        'Standard business profile on Nammabus',
        'Direct phone number & address listing',
        'Appears in 1 primary category & 1 city',
        'Receive customer enquiry messages',
        'Standard search ranking',
        'Basic listing analytics',
        'Free forever with zero expiration',
      ],
      ctaText: 'List Business Free',
      ctaHref: '/local-biz/add-business',
      variant: 'default',
    },
    {
      name: 'Basic Listing',
      slug: 'basic',
      isPaid: true,
      launchPrice: 99,
      regularPrice: 799,
      sixMonthRegularPrice: 4794,
      periodLaunch: 'for 6 months',
      periodRegular: '/ month',
      monthlyEquivalent: 'Just ₹16.50 / month',
      regularLabel: 'Regular: ₹799/month (₹4,794 for 6 mos)',
      description: 'Verified badge, WhatsApp button, up to 5 products and 3 services, lead notifications.',
      popular: false,
      badge: 'VERIFIED BADGE · ₹99 OFFER',
      savings: 'SAVE 98% (Save ₹4,695)',
      features: [
        'Everything in Free Listing',
        'Official Green Verified Business Badge',
        'Direct 1-Click WhatsApp chat button',
        'List up to 5 Products & 3 Services',
        'Higher priority in city & category search',
        'Instant WhatsApp & Email lead notifications',
        'Add business opening hours & Google Map link',
        'Full 6 months promotional access',
      ],
      ctaText: 'Activate Basic Plan',
      ctaHref: '#',
      variant: 'blue',
    },
    {
      name: 'Professional',
      slug: 'pro',
      isPaid: true,
      launchPrice: 99,
      regularPrice: 1599,
      sixMonthRegularPrice: 9594,
      periodLaunch: 'for 6 months',
      periodRegular: '/ month',
      monthlyEquivalent: 'Just ₹16.50 / month',
      regularLabel: 'Regular: ₹1,599/month (₹9,594 for 6 mos)',
      description: 'Featured category placement, up to 25 products and services, photo gallery, quotation manager.',
      popular: true,
      badge: '🔥 MOST POPULAR · ₹99 OFFER',
      savings: 'SAVE 99% (Save ₹9,495)',
      features: [
        'Everything in Basic Listing',
        'Featured placement in top 3 category searches',
        'List up to 25 Products & Services with pricing',
        'Customer quotation request manager',
        'Photo gallery (up to 15 high-res photos)',
        'Verified customer review collection link',
        'Zero commission on leads & enquiries',
        'Priority email & WhatsApp support',
        'Full 6 months promotional access',
      ],
      ctaText: 'Activate Pro Plan',
      ctaHref: '#',
      variant: 'indigo',
    },
    {
      name: 'Premium Enterprise',
      slug: 'premium',
      isPaid: true,
      launchPrice: 99,
      regularPrice: 2399,
      sixMonthRegularPrice: 14394,
      periodLaunch: 'for 6 months',
      periodRegular: '/ month',
      monthlyEquivalent: 'Just ₹16.50 / month',
      regularLabel: 'Regular: ₹2,399/month (₹14,394 for 6 mos)',
      description: 'Sponsored city placement, rotating banners, unlimited catalogue and monthly lead reports.',
      popular: false,
      badge: 'MAX LEADS · VIP ENTERPRISE',
      savings: 'SAVE 99% (Save ₹14,295)',
      slotNotice: '⚠️ Limited sponsored slots per city to guarantee maximum advertised visibility.',
      features: [
        'Everything in Professional',
        'Top #1 Sponsored slot in city directory',
        'Rotating banner advertisement across all pages',
        'Unlimited Products & Services catalog',
        'B2B Wholesale / Bulk order enquiry badge',
        'Competitor-free listing page',
        'Dedicated account manager (WhatsApp support)',
        'Monthly detailed lead analytics report',
        'Full 6 months promotional access',
      ],
      ctaText: 'Activate Enterprise Plan',
      ctaHref: '#',
      variant: 'amber',
    },
  ];

  const handleOpenCheckout = (plan: (typeof businessPlans)[0]) => {
    if (!plan.isPaid) return;
    setCheckoutPlan({
      name: plan.name,
      slug: plan.slug,
      monthlyPrice: plan.regularPrice,
      sixMonthPrice: plan.sixMonthRegularPrice,
      description: plan.description,
      popular: plan.popular,
    });
    setIsCheckoutOpen(true);
  };

  const groupPromotionPlans = [
    {
      name: 'Free Community Submission',
      price: 0,
      period: 'forever',
      description: 'Submit your WhatsApp, Telegram, or Arattai group to our national directory.',
      popular: false,
      badge: null,
      features: [
        'Permanent listing in safe directory',
        '2-Step secure member join flow',
        'Indexed by search engines & Google',
        'Standard category & city placement',
        'Community safety spam moderation',
      ],
      ctaText: 'Post Group Free',
      ctaHref: 'https://forms.gle/oZzitWMZ8xtB9rmx5',
    },
    {
      name: 'Featured Group (VIP)',
      price: 99,
      period: 'for 30 days',
      description: 'Pin your group to the top of your category and state for 10x member growth.',
      popular: true,
      badge: '🔥 10X JOINS',
      features: [
        'Pinned to top #1-#5 slots in category',
        'Gold VIP badge & verified shield',
        'Instant approval without waiting queue',
        'Direct highlight in AI Search Assistant',
        'Member count badge & custom promo banner',
        'Social share card on Telegram & WhatsApp',
      ],
      ctaText: 'Promote Group (₹99)',
      ctaHref: '/paid-promotion',
    },
    {
      name: '2-Image Billboard Ad',
      price: 299,
      period: 'for 30 days',
      description: 'Dual scrolling promotional banner displayed at the top of all pages.',
      popular: false,
      badge: 'MAX EXPOSURE',
      features: [
        'Dual banner display (Zero whitespace gap)',
        'Displays across all 50+ website pages',
        'Direct link to your group or business website',
        'High click-through rate from 450k+ visitors',
        'Mobile responsive retina banner graphics',
        'Full impressions & clicks tracking',
      ],
      ctaText: 'Book 2 Banner Ads (₹299)',
      ctaHref: '/paid-promotion',
    },
  ];

  const faqs = [
    {
      q: 'What is the ₹99 for 6 Months Launch Offer?',
      a: 'To celebrate our Nammabus launch, founding businesses can access any of our paid plans (Basic, Professional, or Premium Enterprise) for a one-time promotional payment of just ₹99 for 6 full months. That works out to only ₹16.50 per month!',
    },
    {
      q: 'Who is eligible for the ₹99 launch offer?',
      a: 'The offer is open to the first 1,000 businesses across Chennai and Indian cities. Once the 1,000-business quota is reached, standard subscription rates will apply.',
    },
    {
      q: 'What happens after the 6-month promotional period?',
      a: 'There are NO automatic credit card deductions. At the end of 6 months, you can choose to renew at regular subscription rates (Basic: ₹799/mo, Professional: ₹1,599/mo, Enterprise: ₹2,399/mo with annual discounts), or simply downgrade to the Free Listing forever with zero penalty.',
    },
    {
      q: 'Can I really get Premium Enterprise for ₹99?',
      a: 'Yes! However, to guarantee the advertised visibility, sponsored placement slots in each city are strictly limited on a first-come, first-served basis.',
    },
    {
      q: 'Does Free Listing remain free forever?',
      a: 'Yes, 100%. Free listings on Nammabus have zero expiration date and remain permanently active at ₹0.',
    },
    {
      q: 'Are there any hidden lead commission fees?',
      a: 'Zero commission! All customer phone calls, WhatsApp messages, direct enquiries, and quotation requests belong 100% to your business.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {activeTab === 'business' ? <LocalBizHeader /> : <Header />}

      <main className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        {/* Header / Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          {/* Limited Time Offer Callout Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-black shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-500 animate-bounce" />
            <span>🎉 NATIONWIDE LAUNCH SPECIAL · 100% FREE FOR ALL</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Launch Special:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 dark:from-emerald-400 dark:via-teal-300 dark:to-blue-400">
              100% Free For All
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            To celebrate our nationwide rollout, all verified business listings, direct WhatsApp lead buttons, and community group submissions are completely <strong>FREE (₹0)</strong>. Paid promotion packages are locked and will open in a future update!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/local-biz/add-business"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>List Your Business (100% Free)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://forms.gle/oZzitWMZ8xtB9rmx5"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Submit Your Group (100% Free)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Product Category Tabs */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('business')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'business'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-400'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Nammabus Marketplace Plans</span>
            </button>

            <button
              onClick={() => setActiveTab('groups')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'groups'
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-emerald-400'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Group Link Promotion Plans</span>
            </button>
          </div>
        </div>

        {/* Business Marketplace Pricing Section */}
        {activeTab === 'business' && (
          <div className="relative rounded-3xl overflow-hidden">
            {/* Frosted Glass Overlay */}
            <div className="absolute inset-0 z-30 bg-slate-900/60 dark:bg-slate-950/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
              <div className="max-w-md p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-2xl font-black">
                  🔒
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                  LAUNCH SPECIAL: 100% FREE FOR ALL
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Paid Offers Locked
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  During our launch phase, all verified badges, contact links, and business promotion features are <strong>100% FREE (₹0)</strong> for every registered business. Paid subscription plans will open in a future update.
                </p>
                <div className="pt-2">
                  <Link
                    href="/local-biz/add-business"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <span>Claim Your Free Business Listing (₹0)</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Blurred background content */}
            <div className="filter blur-[4px] select-none pointer-events-none opacity-40 space-y-10">
              {/* Launch Offer Announcement Card */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-950 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 border-2 border-blue-500/40 shadow-2xl">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
                <div className="space-y-3 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nammabus Founding Business Offer</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                    Get 6 Months of Premium Visibility for Just <span className="text-amber-400 underline decoration-amber-400/40">₹99</span>
                  </h2>

                  {/* Big Chai Price Callout */}
                  <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-sm sm:text-lg shadow-xl shadow-amber-400/20 border-2 border-amber-200">
                    <span className="text-2xl sm:text-3xl animate-bounce">☕</span>
                    <span>Just ₹16.50 / Month — Less Than a Cup of Chai!</span>
                    <span className="text-[10px] bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold">
                      Cheaper Than Chai
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Save over 95% on your regular subscription during our launch. Available across all three paid tiers (Basic, Professional, and Premium Enterprise). Free Listing remains free forever.
                  </p>

                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      One-time promotional payment
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Zero automatic deductions
                    </span>
                    <span className="flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Keep leads &amp; reviews permanently
                    </span>
                  </div>
                </div>

                {/* Quota Counter Box */}
                <div className="shrink-0 w-full sm:w-auto bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    Founding Business Quota
                  </span>
                  <div className="text-3xl font-black text-white">
                    842 <span className="text-base text-slate-400 font-normal">/ 1,000</span>
                  </div>
                  <div className="w-48 bg-slate-800 rounded-full h-2 mx-auto overflow-hidden">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full w-[84%]"></div>
                  </div>
                  <p className="text-[10px] text-slate-300">
                    ⚡ 158 slots remaining for launch pricing
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Scratch Card Offer */}
            <div id="scratch-card-section" className="scroll-mt-24">
              <ScratchCardOffer
                onCodeApplied={handleScratchRevealed}
                appliedCode={revealedSecretCode}
                isUnlocked={!!revealedSecretCode}
              />
            </div>

            {/* Offer Mode / Billing Toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <div className="p-1 rounded-2xl bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center gap-1">
                <button
                  onClick={() => setPricingMode('launch')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    pricingMode === 'launch'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Flame className="w-4 h-4 text-orange-600" />
                  <span>Launch Offer: ₹99 for 6 Months</span>
                  <span className="px-1.5 py-0.5 rounded bg-orange-600 text-white text-[9px] font-extrabold uppercase">
                    First 1,000
                  </span>
                </button>

                <button
                  onClick={() => setPricingMode('regular')}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    pricingMode === 'regular'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Standard Pricing
                </button>
              </div>

              {/* Monthly vs Annual Toggle when Standard Pricing is Selected */}
              {pricingMode === 'regular' && (
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span
                    onClick={() => setBillingCycle('monthly')}
                    className={`cursor-pointer ${billingCycle === 'monthly' ? 'text-blue-600 font-bold' : 'text-slate-500'}`}
                  >
                    Monthly
                  </span>
                  <button
                    onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                    className="w-10 h-5 rounded-full bg-slate-300 dark:bg-slate-700 p-0.5 relative transition-colors"
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-blue-600 shadow-sm transform transition-transform ${
                        billingCycle === 'annual' ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span
                    onClick={() => setBillingCycle('annual')}
                    className={`cursor-pointer flex items-center gap-1 ${billingCycle === 'annual' ? 'text-blue-600 font-bold' : 'text-slate-500'}`}
                  >
                    Annual
                    <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-extrabold">
                      -20%
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* 4 Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {businessPlans.map((plan) => {
                const isPaid = plan.isPaid;
                const isDiscountUnlocked = isPaid && !!unlockedPlans[plan.slug];
                const activeCode = planPromoCodes[plan.slug] || 'BIZ99';

                // Before code is applied: show original price!
                // After code is applied: show ₹99!
                const displayPrice = isPaid
                  ? isDiscountUnlocked
                    ? plan.launchPrice
                    : plan.regularPrice
                  : 0;

                const displayPeriod = isPaid
                  ? isDiscountUnlocked
                    ? 'for 6 months'
                    : '/ month'
                  : 'Free forever';

                const cardBadge = isPaid && isDiscountUnlocked
                  ? `🎉 CODE ${activeCode} APPLIED`
                  : plan.badge;

                const buttonText = isPaid
                  ? isDiscountUnlocked
                    ? `Pay ₹99 & Activate ${plan.name}`
                    : `Pay & Apply 5-Digit Code`
                  : plan.ctaText;

                return (
                  <div
                    key={plan.name}
                    className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all ${
                      plan.popular
                        ? 'bg-white dark:bg-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/10 ring-4 ring-blue-500/10'
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl'
                    }`}
                  >
                    {/* Badge */}
                    {cardBadge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md whitespace-nowrap">
                        {cardBadge}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">{plan.name}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[36px]">
                          {plan.description}
                        </p>
                      </div>

                      {/* Pricing Display */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        {/* Strikethrough regular rate when unlocked */}
                        {isDiscountUnlocked && (
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs text-slate-400 line-through">
                              {plan.regularLabel}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">
                              {plan.savings}
                            </span>
                          </div>
                        )}

                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                            ₹{displayPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                            {displayPeriod}
                          </span>
                        </div>

                        {/* When locked: Show original 6-month value + Inline Apply Code Box Right Here */}
                        {isPaid && !isDiscountUnlocked && (
                          <div className="mt-2 space-y-2">
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              Original 6-month value: ₹{plan.sixMonthRegularPrice.toLocaleString('en-IN')}
                            </p>
                            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border-2 border-amber-400 dark:border-amber-600/80 space-y-2.5 shadow-sm">
                              <div className="flex items-center justify-between gap-2">
                                <div className="leading-tight text-left">
                                  <div className="text-[11px] font-black text-amber-900 dark:text-amber-200 flex items-center gap-1">
                                    <span>🎁 Launch Offer: Get for ₹99</span>
                                  </div>
                                  <div className="text-[10px] font-bold text-amber-700 dark:text-amber-400 mt-0.5">
                                    Just ₹16.50/mo ☕ Less than chai
                                  </div>
                                </div>
                                <span className="text-2xl shrink-0 animate-bounce">☕</span>
                              </div>

                              {/* Apply Code Input Right Here on the Card */}
                              <div className="pt-2 border-t border-amber-200/80 dark:border-amber-800/60 space-y-1.5">
                                <div className="flex items-center justify-between text-[10px] font-extrabold text-amber-900 dark:text-amber-300">
                                  <span>Enter 5-digit code here to get offer:</span>
                                  <button
                                    type="button"
                                    onClick={() => handleApplyCodeForPlan(plan.slug, 'BIZ99')}
                                    className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-0.5 cursor-pointer font-bold"
                                  >
                                    <Sparkles className="w-2.5 h-2.5" />
                                    <span>Use BIZ99</span>
                                  </button>
                                </div>

                                <form
                                  onSubmit={(e) => {
                                    e.preventDefault();
                                    const inputVal = cardCodeInputs[plan.slug] || '';
                                    handleApplyCodeForPlan(plan.slug, inputVal);
                                  }}
                                  className="flex items-center gap-1.5"
                                >
                                  <input
                                    type="text"
                                    maxLength={5}
                                    placeholder="Enter code (BIZ99)"
                                    value={cardCodeInputs[plan.slug] || ''}
                                    onChange={(e) => {
                                      setCardCodeInputs((prev) => ({
                                        ...prev,
                                        [plan.slug]: e.target.value.toUpperCase(),
                                      }));
                                      setCardInputErrors((prev) => ({
                                        ...prev,
                                        [plan.slug]: '',
                                      }));
                                    }}
                                    className="flex-1 min-w-0 px-2.5 py-1.5 rounded-xl text-xs font-mono font-black tracking-widest uppercase bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                                  />
                                  <button
                                    type="submit"
                                    className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shrink-0 shadow-md transition-all cursor-pointer"
                                  >
                                    Apply Code
                                  </button>
                                </form>

                                {cardInputErrors[plan.slug] && (
                                  <p className="text-[10px] text-rose-600 font-semibold">
                                    {cardInputErrors[plan.slug]}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* When unlocked: Price changes to ₹99! Show prominent chai callout + applied badge */}
                        {isDiscountUnlocked && (
                          <div className="mt-2.5 space-y-2">
                            <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/60 dark:to-orange-950/40 border border-amber-300 dark:border-amber-700/80 flex items-center gap-2.5 shadow-sm">
                              <span className="text-2xl shrink-0">☕</span>
                              <div className="leading-tight">
                                <div className="text-xs font-black text-slate-950 dark:text-amber-200">
                                  Just ₹16.50 / month
                                </div>
                                <div className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400">
                                  Less than a cup of chai price!
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-[10px] font-bold text-emerald-800 dark:text-emerald-300">
                              <span className="flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>Code <strong>{activeCode}</strong> Applied: ₹99 Active!</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveCodeForPlan(plan.slug)}
                                className="text-rose-600 dark:text-rose-400 hover:underline font-bold text-[9px] cursor-pointer"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Limited Slot Notice for Premium */}
                      {plan.slotNotice && (
                        <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-800 dark:text-amber-300 font-medium leading-snug">
                          {plan.slotNotice}
                        </div>
                      )}

                      {/* Features List */}
                      <ul className="space-y-2.5 pt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2">
                      {isPaid ? (
                        <button
                          type="button"
                          onClick={() => handleOpenCheckout(plan)}
                          className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${
                            plan.popular
                              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                              : plan.name === 'Premium Enterprise'
                              ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                              : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                          }`}
                        >
                          {!isDiscountUnlocked ? (
                            <Gift className="w-4 h-4 text-amber-500 animate-pulse" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          )}
                          <span>{buttonText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      ) : (
                        <Link
                          href={plan.ctaHref}
                          className="w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200"
                        >
                          <span>{plan.ctaText}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}

                      {isPaid && (
                        <p className="text-[10px] text-center text-slate-400">
                          {isDiscountUnlocked
                            ? 'One-time ₹99 for 6 months · No auto-renew'
                            : 'Enter 5-digit code above to unlock ₹99 price'}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Post-Promotional Transparency Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Transparent Post-Launch Pricing Policy</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                We believe in 100% transparency. When our founding launch period concludes, your account will <strong>not</strong> be automatically billed. You can continue on the standard subscription or switch to the permanent <strong>Free Listing</strong> anytime. Your reviews, ratings, and listing URL remain active and intact.
              </p>
            </div>
            </div>
          </div>
        )}

        {/* Group Promotion Pricing Section */}
        {activeTab === 'groups' && (
          <div className="relative rounded-3xl overflow-hidden max-w-5xl mx-auto">
            {/* Frosted Glass Overlay */}
            <div className="absolute inset-0 z-30 bg-slate-900/60 dark:bg-slate-950/75 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
              <div className="max-w-md p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto text-2xl font-black">
                  🔒
                </div>
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs">
                  LAUNCH SPECIAL: 100% FREE FOR ALL
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  Paid Promotions Locked
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  During our founding launch, all group submissions and directory placements across WhatsApp, Telegram, and Arattai are <strong>100% FREE (₹0)</strong>. Paid promotion tiers will open in a future update.
                </p>
                <div className="pt-2">
                  <a
                    href="https://forms.gle/oZzitWMZ8xtB9rmx5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
                  >
                    <span>Submit Your Group Free (₹0)</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Blurred background content */}
            <div className="filter blur-[4px] select-none pointer-events-none opacity-40 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {groupPromotionPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all ${
                    plan.popular
                      ? 'bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 ring-4 ring-emerald-500/10'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl'
                  }`}
                >
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md">
                      {plan.badge}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-white">{plan.name}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 min-h-[32px]">
                        {plan.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-slate-900 dark:text-white">
                          ₹{plan.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-3 pt-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      href={plan.ctaHref}
                      className={`w-full py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                        plan.popular
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      <span>{plan.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6 pt-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Clear answers to help you choose the best subscription plan
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800"
              >
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Need Help CTA Banner */}
        <div className="p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl font-bold">Have custom requirements or large catalog?</h3>
            <p className="text-xs text-slate-400">
              Speak directly with our enterprise business solutions team for bulk catalog imports and tailored marketing.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition-all shrink-0"
          >
            Contact Business Sales
          </Link>
        </div>

        {/* Checkout Payment Modal with Apply 5-Digit Code Option */}
        <PaymentCheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          plan={checkoutPlan}
          initialCode={checkoutPlan ? planPromoCodes[checkoutPlan.slug] || revealedSecretCode || '' : ''}
          isPromoUnlocked={checkoutPlan ? !!unlockedPlans[checkoutPlan.slug] : false}
          onCodeAppliedGlobally={(code) => {
            if (checkoutPlan) {
              handleApplyCodeForPlan(checkoutPlan.slug, code);
            }
          }}
        />
      </main>

      {activeTab === 'business' ? <LocalBizFooter /> : <Footer />}
    </div>
  );
}
