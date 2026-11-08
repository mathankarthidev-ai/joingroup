'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Sparkles,
  Building2,
  Wrench,
  Stethoscope,
  Users,
  SlidersHorizontal,
} from 'lucide-react';

interface JustdialHeroStripProps {
  variant?: 'home' | 'b2b' | 'local-biz' | 'professionals' | 'groups';
  showCategoriesGrid?: boolean;
}

export const JustdialHeroStrip: React.FC<JustdialHeroStripProps> = ({
  variant = 'home',
  showCategoriesGrid = true,
}) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);

  // Check scroll position to toggle arrow buttons & gradient fade masks
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Continuous slow, gentle auto-scroll for 40+ categories
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const scrollStep = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      if (!isCategoriesHovered && scrollRef.current) {
        const el = scrollRef.current;
        const maxScroll = el.scrollWidth - el.clientWidth;

        if (maxScroll > 10) {
          // Slow, calm speed: ~35 pixels per second
          const speed = 0.035 * Math.min(delta, 50);
          if (el.scrollLeft >= maxScroll - 3) {
            el.scrollLeft = 0;
          } else {
            el.scrollLeft += speed;
          }
          checkScroll();
        }
      }
      animId = requestAnimationFrame(scrollStep);
    };

    animId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animId);
  }, [isCategoriesHovered]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 350);
    }
  };

  const slides = React.useMemo(() => {
    if (variant === 'groups') {
      return [
        {
          id: 1,
          badge: '🎉 100% FREE GROUP SHARING',
          title: 'Share Your WhatsApp & Telegram Groups with 100,000+ Daily Visitors',
          description:
            'Submit your community chat link, channel, or broadcast group for instant indexing. Get real, targeted members from your city and topic with 0 fees.',
          ctaText: 'Share Your Group Free (+)',
          ctaHref: 'https://forms.gle/oZzitWMZ8xtB9rmx5',
          bgGradient: 'from-emerald-950 via-teal-900 to-slate-950',
          accentColor: 'text-emerald-300',
          tag: '₹0 Free Forever',
        },
        {
          id: 2,
          badge: '✨ 25,000+ ACTIVE COMMUNITIES',
          title: 'Discover Verified WhatsApp, Telegram & Arattai Groups',
          description:
            'Connect with like-minded people across India: UPSC & NEET study circles, IT freshers & remote job alerts, crypto discussions, and local city networks.',
          ctaText: 'Explore All Groups',
          ctaHref: '/groups#trending-groups',
          bgGradient: 'from-indigo-950 via-purple-900 to-slate-950',
          accentColor: 'text-cyan-300',
          tag: 'Verified Links',
        },
        {
          id: 3,
          badge: '⚡ FAST AUDIENCE GROWTH',
          title: 'Promote Your Channel, Broadcast & Community Link',
          description:
            'Expand your subscriber reach on WhatsApp Communities, Telegram Channels, Discord Servers, and Arattai Groups. Instant public exposure with zero commission.',
          ctaText: 'Submit Group Free (+)',
          ctaHref: 'https://forms.gle/oZzitWMZ8xtB9rmx5',
          bgGradient: 'from-blue-950 via-sky-900 to-slate-950',
          accentColor: 'text-amber-300',
          tag: 'Instant Indexing',
        },
      ];
    }

    if (variant === 'b2b') {
      return [
        {
          id: 1,
          badge: '🏭 DIRECT B2B WHOLESALE',
          title: 'Source at Factory Rates Across India',
          description:
            'Connect directly with 50,000+ verified manufacturers for industrial machinery, packaging boxes, solar panels & raw chemicals with zero commission.',
          ctaText: 'Post RFQ Requirement',
          ctaHref: '/b2b#rfq-section',
          bgGradient: 'from-slate-950 via-blue-950 to-indigo-950',
          accentColor: 'text-cyan-300',
          tag: '50,000+ Suppliers',
        },
        {
          id: 2,
          badge: '⚡ 15-MINUTE QUOTES',
          title: 'Direct WhatsApp Quotations From Factories',
          description:
            'Submit your bulk bill of materials (BOM) or RFQ. Verified GST suppliers respond with custom unit prices within minutes.',
          ctaText: 'Browse Wholesale Products',
          ctaHref: '/local-biz/products',
          bgGradient: 'from-blue-900 via-indigo-900 to-slate-950',
          accentColor: 'text-amber-300',
          tag: 'Zero Brokerage',
        },
        {
          id: 3,
          badge: '🎉 FREE MANUFACTURER ONBOARDING',
          title: 'Register Your Factory or Wholesaler Unit Free',
          description:
            'Join Nammabus B2B portal at ₹0 during our launch special. Showcase catalogs, wholesale MOQs, and receive high-volume bulk leads.',
          ctaText: 'List Factory Free',
          ctaHref: '/local-biz/add-business',
          bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
          accentColor: 'text-emerald-300',
          tag: '₹0 Zero Cost',
        },
      ];
    }

    if (variant === 'professionals') {
      return [
        {
          id: 1,
          badge: '⚡ VERIFIED SPECIALISTS',
          title: 'Hire Electricians, AC Techs & Contractors',
          description:
            'Direct WhatsApp and call bookings with licensed electricians, HVAC technicians, plumbers, and home repair contractors near you.',
          ctaText: 'Find Technicians',
          ctaHref: '/local-biz/professionals',
          bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
          accentColor: 'text-emerald-300',
          tag: 'Zero Broker Fees',
        },
        {
          id: 2,
          badge: '📸 EVENTS & CELEBRATIONS',
          title: 'Wedding Photographers & Master Caterers',
          description:
            'Hire candid wedding photographers, 4K drone cinematographers, banquet chefs, and bridal makeup artists with verified portfolios.',
          ctaText: 'Explore Event Specialists',
          ctaHref: '/local-biz/professionals?profession=Wedding+%26+Event+Photographer',
          bgGradient: 'from-slate-950 via-blue-950 to-indigo-950',
          accentColor: 'text-cyan-300',
          tag: 'Verified Portfolio',
        },
        {
          id: 3,
          badge: '🎉 FREE SERVICE DIRECTORY',
          title: 'Are You a Technician or Specialist? List Free',
          description:
            'Expand your customer reach across India. Zero referral commission, direct customer phone calls, and trusted verification shield.',
          ctaText: 'List Your Service Free',
          ctaHref: '/local-biz/add-business',
          bgGradient: 'from-blue-900 via-indigo-900 to-slate-950',
          accentColor: 'text-amber-300',
          tag: '₹0 Zero Cost',
        },
      ];
    }

    return [
      {
        id: 1,
        badge: '🎉 FOUNDING LAUNCH SPECIAL',
        title: '100% Free Business Listing for All',
        description:
          'Zero commission, verified shield badge, direct WhatsApp customer leads & 6 months priority visibility for all Indian merchants.',
        ctaText: 'List Your Business Free',
        ctaHref: '/local-biz/add-business',
        bgGradient: 'from-blue-950 via-indigo-900 to-slate-950',
        accentColor: 'text-amber-300',
        tag: '₹0 Zero Cost',
      },
      {
        id: 2,
        badge: '🏭 DIRECT B2B WHOLESALE',
        title: 'Source at Factory Rates Across India',
        description:
          'Connect directly with 50,000+ verified manufacturers for industrial machinery, packaging boxes, solar panels & raw chemicals.',
        ctaText: 'Explore B2B Wholesale',
        ctaHref: '/b2b',
        bgGradient: 'from-slate-950 via-blue-950 to-indigo-950',
        accentColor: 'text-cyan-300',
        tag: '50,000+ Suppliers',
      },
      {
        id: 3,
        badge: '⚡ VERIFIED SPECIALISTS',
        title: 'Hire Electricians, AC Techs & Specialists',
        description:
          'Direct WhatsApp and call bookings with licensed electricians, HVAC technicians, wedding photographers, caterers and contractors near you.',
        ctaText: 'Find Specialists',
        ctaHref: '/local-biz/professionals',
        bgGradient: 'from-emerald-950 via-teal-950 to-slate-950',
        accentColor: 'text-emerald-300',
        tag: 'Zero Broker Fees',
      },
    ];
  }, [variant]);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length]);

  // 40+ Rich, Authentic Categories with Scrolling & Animations
  const categoryTiles = [
    {
      name: 'Restaurants',
      sub: 'Dine & Cafes',
      icon: 'restaurant',
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/40',
      href: '/local-biz/businesses?category=restaurants',
    },
    {
      name: 'Hotels',
      sub: 'Resorts & Stay',
      icon: 'hotel',
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40',
      href: '/local-biz/businesses?category=hotels',
    },
    {
      name: 'AC Repair',
      sub: 'Service & Gas',
      icon: 'ac_unit',
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/40',
      href: '/local-biz/professionals?profession=AC+%26+Refrigeration+Specialist',
      badge: 'Top',
    },
    {
      name: 'Electricians',
      sub: 'Wiring & Panels',
      icon: 'bolt',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      href: '/local-biz/professionals?profession=Electrical+Contractor+%26+Tech',
    },
    {
      name: 'Photographers',
      sub: 'Weddings & Drone',
      icon: 'photo_camera',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40',
      href: '/local-biz/professionals?profession=Wedding+%26+Event+Photographer',
    },
    {
      name: 'Catering & Food',
      sub: 'Banquets & Chefs',
      icon: 'bakery_dining',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40',
      href: '/local-biz/professionals?profession=Catering+Chef+%26+Event+Food+Director',
    },
    {
      name: 'PGs & Hostels',
      sub: 'Co-Living & Rooms',
      icon: 'apartment',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40',
      href: '/local-biz/businesses?category=pgs-hostels',
    },
    {
      name: 'Beauty Spa',
      sub: 'Bridal Salons',
      icon: 'spa',
      color: 'text-pink-500 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800/40',
      href: '/local-biz/businesses?category=beauty',
    },
    {
      name: 'Home Decor',
      sub: 'Modular Design',
      icon: 'chair',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40',
      href: '/local-biz/businesses?category=home-decor',
    },
    {
      name: 'B2B Wholesale',
      sub: 'Factory Direct',
      icon: 'precision_manufacturing',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40',
      href: '/b2b',
      badge: 'Hot',
    },
    {
      name: 'Wedding Planners',
      sub: 'Banquets & Decors',
      icon: 'favorite',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40',
      href: '/local-biz/businesses?category=wedding',
    },
    {
      name: 'Education',
      sub: 'Tuition & Schools',
      icon: 'school',
      color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/40',
      href: '/local-biz/businesses?category=education',
    },
    {
      name: 'Rent & Hire',
      sub: 'Cars & Tools',
      icon: 'key',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      href: '/local-biz/businesses?category=rental',
    },
    {
      name: 'Contractors',
      sub: 'Civil & Building',
      icon: 'engineering',
      color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800/40',
      href: '/local-biz/businesses?category=contractors',
    },
    {
      name: 'Pet Shops',
      sub: 'Veterinary & Food',
      icon: 'pets',
      color: 'text-amber-700 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      href: '/local-biz/businesses?category=pets',
    },
    {
      name: 'PG & Hostels',
      sub: 'Rooms & Stays',
      icon: 'bed',
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/40',
      href: '/local-biz/businesses?category=hostels',
    },
    {
      name: 'Real Estate',
      sub: 'Flats & Plots',
      icon: 'domain',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
      href: '/local-biz/businesses?category=real-estate',
      badge: 'Verified',
    },
    {
      name: 'Gym & Fitness',
      sub: 'Crossfit & Yoga',
      icon: 'fitness_center',
      color: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
      href: '/local-biz/businesses?category=fitness',
    },
    {
      name: 'Driving Schools',
      sub: '4W & 2W Training',
      icon: 'directions_car',
      color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800/40',
      href: '/local-biz/businesses?category=driving',
    },
    {
      name: 'Packers & Movers',
      sub: 'All India Relocate',
      icon: 'local_shipping',
      color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/40',
      href: '/local-biz/services',
    },
    {
      name: 'Architects',
      sub: '3D Villa Designs',
      icon: 'architecture',
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40',
      href: '/local-biz/professionals?profession=Architect+%26+Interior+Designer',
    },
    {
      name: '24/7 Mechanics',
      sub: 'Car & Bike Care',
      icon: 'car_repair',
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40',
      href: '/local-biz/businesses?category=automobile',
      badge: '24/7',
    },
    {
      name: 'Custom Tailors',
      sub: 'Suits & Boutiques',
      icon: 'content_cut',
      color: 'text-pink-600 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800/40',
      href: '/local-biz/businesses?category=clothing',
    },
    {
      name: 'AC Repairs',
      sub: 'Service & AMC',
      icon: 'ac_unit',
      color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/40',
      href: '/local-biz/services',
    },
    {
      name: 'Solar Energy',
      sub: 'PV Panels 540W',
      icon: 'solar_power',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
      href: '/b2b',
    },
    {
      name: 'Electricals',
      sub: 'Switchgear & LED',
      icon: 'bolt',
      color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800/40',
      href: '/b2b',
    },
    {
      name: 'Raw Chemicals',
      sub: 'Polymers & Resins',
      icon: 'science',
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40',
      href: '/b2b',
    },
    {
      name: 'Carton Boxes',
      sub: '5-Ply Corrugated',
      icon: 'package_2',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      href: '/b2b',
    },
    {
      name: 'CVD Diamonds',
      sub: 'IGI Certified Lab',
      icon: 'diamond',
      color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/40',
      href: '/b2b',
    },
    {
      name: 'Photo Studios',
      sub: 'Pre-Wedding & 4K',
      icon: 'photo_camera',
      color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800/40',
      href: '/local-biz/businesses?category=wedding',
    },
    {
      name: 'Security Guards',
      sub: 'Commercial Watch',
      icon: 'shield',
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40',
      href: '/local-biz/services',
    },
    {
      name: 'Plumbers & Elec.',
      sub: 'Home Repair Tech',
      icon: 'plumbing',
      color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/40',
      href: '/local-biz/services',
    },
    {
      name: 'House Cleaning',
      sub: 'Deep Sanitization',
      icon: 'cleaning_services',
      color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/40',
      href: '/local-biz/services',
    },
    {
      name: 'Catering Svcs',
      sub: 'Veg & Non-Veg',
      icon: 'dinner_dining',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      href: '/local-biz/businesses?category=restaurants',
    },
    {
      name: 'Printing & Signs',
      sub: 'Flex & Glow Signs',
      icon: 'print',
      color: 'text-slate-600 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800',
      href: '/b2b',
    },
    {
      name: 'IT & Software',
      sub: 'Web & App Tech',
      icon: 'code',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40',
      href: '/local-biz/services',
    },
    {
      name: 'Bookstores',
      sub: 'Stationery & Hub',
      icon: 'menu_book',
      color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/40',
      href: '/local-biz/businesses',
    },
    {
      name: 'Travel & Tours',
      sub: 'Flight & Holidays',
      icon: 'flight_takeoff',
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40',
      href: '/local-biz/businesses',
    },
    {
      name: 'Courier & Cargo',
      sub: 'Express Delivery',
      icon: 'local_post_office',
      color: 'text-red-500 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/40',
      href: '/local-biz/services',
    },
    {
      name: 'All Categories',
      sub: 'Explore 50+ Hub',
      icon: 'grid_view',
      color: 'text-blue-600 bg-blue-100/60 dark:bg-blue-950/80 border-blue-300 dark:border-blue-700 font-black',
      href: '/local-biz/categories',
      isSpecial: true,
      badge: '50+',
    },
  ];

  const isGroups = variant === 'groups';

  // 40+ Rich, Authentic Community Group Categories (for JoinGroupLinks)
  const groupCategoryTiles = [
    {
      name: 'Jobs & Careers',
      sub: 'IT & Walk-ins',
      icon: 'work',
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40',
      href: '/groups/india/jobs',
      badge: 'Hot',
    },
    {
      name: 'Education & Study',
      sub: 'Notes & College',
      icon: 'school',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
      href: '/groups/india/education',
      badge: 'Top',
    },
    {
      name: 'Stock & Trading',
      sub: 'Nifty & F&O',
      icon: 'trending_up',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      href: '/groups/india/stock-market',
    },
    {
      name: 'Tech & Coding',
      sub: 'Python, AI & Web',
      icon: 'terminal',
      color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/40',
      href: '/groups/india/programming',
      badge: 'Devs',
    },
    {
      name: 'Gaming & Esports',
      sub: 'BGMI & FreeFire',
      icon: 'sports_esports',
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40',
      href: '/groups/india/gaming',
    },
    {
      name: 'Deals & Loot',
      sub: 'Amazon & Flipkart',
      icon: 'local_offer',
      color: 'text-rose-600 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40',
      href: '/groups/india/shopping',
      badge: 'Loot',
    },
    {
      name: 'Cinema & OTT',
      sub: 'Movies & Reviews',
      icon: 'movie',
      color: 'text-red-600 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/40',
      href: '/groups/india/cinema',
    },
    {
      name: 'Startups & Biz',
      sub: 'Founders & Pitch',
      icon: 'rocket_launch',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40',
      href: '/groups/india/business',
    },
    {
      name: 'Fitness & Gym',
      sub: 'Diet & Workouts',
      icon: 'fitness_center',
      color: 'text-teal-600 bg-teal-50 dark:bg-teal-950/40 border-teal-200 dark:border-teal-800/40',
      href: '/groups/india/fitness',
    },
    {
      name: 'Travel & Trips',
      sub: 'Trekking & Tours',
      icon: 'flight',
      color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/40',
      href: '/groups/india/travel',
    },
    {
      name: 'Music & Bands',
      sub: 'Songs & Creators',
      icon: 'music_note',
      color: 'text-pink-600 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800/40',
      href: '/groups/india/music',
    },
    {
      name: 'Govt Exams',
      sub: 'UPSC, SSC & Bank',
      icon: 'menu_book',
      color: 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/40',
      href: '/groups/india/exams',
      badge: 'Govt',
    },
    {
      name: 'Cars & Bikers',
      sub: 'Riders & Auto',
      icon: 'directions_car',
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40',
      href: '/groups/india/automobile',
    },
    {
      name: 'Comedy & Memes',
      sub: 'Jokes & Viral',
      icon: 'mood',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      href: '/groups/india/comedy',
    },
    {
      name: 'News & Updates',
      sub: 'Daily Headlines',
      icon: 'newspaper',
      color: 'text-slate-600 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700',
      href: '/groups/india/news',
    },
    {
      name: 'Roommates & PGs',
      sub: 'Flat Sharing',
      icon: 'home_work',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
      href: '/groups/india/roommates',
    },
    {
      name: 'Cooking & Food',
      sub: 'Recipes & Chef',
      icon: 'restaurant_menu',
      color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800/40',
      href: '/groups/india/cooking',
    },
    {
      name: 'Art & Crafts',
      sub: 'Design & Drawing',
      icon: 'palette',
      color: 'text-violet-600 bg-violet-50 dark:bg-violet-950/40 border-violet-200 dark:border-violet-800/40',
      href: '/groups/india/art',
    },
    {
      name: 'Podcasts & Audio',
      sub: 'Interviews & Talk',
      icon: 'mic',
      color: 'text-fuchsia-600 bg-fuchsia-50 dark:bg-fuchsia-950/40 border-fuchsia-200 dark:border-fuchsia-800/40',
      href: '/groups/india/podcasts',
    },
    {
      name: 'Arattai (Zoho)',
      sub: 'Channels & Chats',
      icon: 'forum',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700',
      href: '/groups?platform=arattai',
      badge: '#1 Indian',
    },
    {
      name: 'Telegram Hub',
      sub: 'Channels & Bots',
      icon: 'send',
      color: 'text-sky-500 bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800/40',
      href: '/groups?platform=telegram',
    },
    {
      name: 'WhatsApp Chats',
      sub: 'Public Invites',
      icon: 'chat',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
      href: '/groups?platform=whatsapp',
      badge: 'Popular',
    },
    {
      name: 'Crypto & Web3',
      sub: 'DeFi & Airdrops',
      icon: 'currency_bitcoin',
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      href: '/groups/india/crypto',
    },
    {
      name: 'Matrimony & Dating',
      sub: 'Singles & Match',
      icon: 'favorite',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40',
      href: '/groups/india/matrimony',
    },
    {
      name: 'Farmers & Agri',
      sub: 'Organic & Kisan',
      icon: 'agriculture',
      color: 'text-lime-600 bg-lime-50 dark:bg-lime-950/40 border-lime-200 dark:border-lime-800/40',
      href: '/groups/india/agriculture',
    },
    {
      name: 'Science & Facts',
      sub: 'Curiosity & Tech',
      icon: 'science',
      color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/40',
      href: '/groups/india/science',
    },
    {
      name: 'Book Readers',
      sub: 'Novels & PDF',
      icon: 'auto_stories',
      color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40',
      href: '/groups/india/books',
    },
    {
      name: 'Sports & Cricket',
      sub: 'IPL & Match Live',
      icon: 'sports_cricket',
      color: 'text-green-600 bg-green-50 dark:bg-green-950/40 border-green-200 dark:border-green-800/40',
      href: '/groups/india/sports',
    },
    {
      name: 'Photography',
      sub: 'Camera & Reels',
      icon: 'photo_camera',
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40',
      href: '/groups/india/photography',
    },
    {
      name: 'Spiritual Peace',
      sub: 'Bhajan & Mantras',
      icon: 'self_improvement',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/40',
      href: '/groups/india/spiritual',
    },
    {
      name: 'Language Study',
      sub: 'English Fluency',
      icon: 'translate',
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/40',
      href: '/groups/india/language',
    },
    {
      name: 'Pet Lovers',
      sub: 'Dogs, Cats & Birds',
      icon: 'pets',
      color: 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950/40 border-yellow-200 dark:border-yellow-800/40',
      href: '/groups/india/pets',
    },
    {
      name: 'Fashion & Style',
      sub: 'Trends & Outfits',
      icon: 'styler',
      color: 'text-pink-500 bg-pink-50 dark:bg-pink-950/40 border-pink-200 dark:border-pink-800/40',
      href: '/groups/india/fashion',
    },
    {
      name: 'Real Estate Hub',
      sub: 'Plots & Flats',
      icon: 'apartment',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
      href: '/groups/india/real-estate',
    },
    {
      name: 'Freelancers Hub',
      sub: 'Gigs & Remote',
      icon: 'laptop_mac',
      color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800/40',
      href: '/groups/india/freelance',
    },
    {
      name: 'Yoga & Health',
      sub: 'Wellness Circles',
      icon: 'spa',
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/40',
      href: '/groups/india/wellness',
    },
    {
      name: 'Discord Servers',
      sub: 'Voice & Communities',
      icon: 'headset_mic',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/40',
      href: '/groups?platform=discord',
    },
    {
      name: 'Instagram Hub',
      sub: 'Broadcast Channels',
      icon: 'camera_alt',
      color: 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800/40',
      href: '/groups?platform=instagram',
    },
    {
      name: 'YouTube Creators',
      sub: 'Channels & Collabs',
      icon: 'smart_display',
      color: 'text-red-500 bg-red-50 dark:bg-red-950/40 border-red-200 dark:border-red-800/40',
      href: '/groups?platform=youtube',
    },
    {
      name: 'All 40+ Groups',
      sub: 'Full Directory Index',
      icon: 'grid_view',
      color: 'text-blue-600 bg-blue-100/60 dark:bg-blue-950/80 border-blue-300 dark:border-blue-700 font-black',
      href: '/groups#trending-groups',
      isSpecial: true,
      badge: '40+',
    },
  ];

  const displayedCategoryTiles = isGroups ? groupCategoryTiles : categoryTiles;

  const activeSlide = slides[currentSlide];

  return (
    <div className="w-full space-y-6">
      {/* ========================================================
          1. FULL-WIDTH BIG HERO BANNER
         ======================================================== */}
      <div className="w-full">
        <div
          className={`relative w-full rounded-3xl p-6 sm:p-10 md:p-12 bg-gradient-to-r ${activeSlide.bgGradient} text-white shadow-2xl overflow-hidden border border-white/15 flex flex-col justify-between min-h-[260px] sm:min-h-[290px] md:min-h-[310px] transition-all duration-700 group`}
        >
          {/* Animated Ambient Blurs */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-400/25 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-1000" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-400/25 blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-1000" />

          {/* Top Banner Content */}
          <div className="relative z-10 space-y-3.5 max-w-4xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
                <span>{activeSlide.badge}</span>
              </span>
              <span className="text-[11px] font-black px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm animate-pulse">
                {activeSlide.tag}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
              {activeSlide.title}
            </h2>

            <p className="text-xs sm:text-sm md:text-base text-slate-200 line-clamp-2 sm:line-clamp-3 max-w-3xl leading-relaxed">
              {activeSlide.description}
            </p>
          </div>

          {/* Bottom Bar: Action Button & Interactive Slide Controls */}
          <div className="relative z-10 pt-6 flex flex-wrap items-center justify-between gap-4">
            {activeSlide.ctaHref.startsWith('http') ? (
              <a
                href={activeSlide.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-black/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <Link
                href={activeSlide.ctaHref}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-black/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            )}

            {/* Slide Navigation: Arrows & Indicators */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/15">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                  }
                  aria-label="Previous slide"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1.5 px-2">
                  {slides.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  aria-label="Next slide"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. SCROLLABLE CATEGORIES CAROUSEL (40+ CATEGORIES IN 2 ROWS)
         ======================================================== */}
      {showCategoriesGrid && (
        <div
          onMouseEnter={() => setIsCategoriesHovered(true)}
          onMouseLeave={() => setIsCategoriesHovered(false)}
          onTouchStart={() => setIsCategoriesHovered(true)}
          onTouchEnd={() => setIsCategoriesHovered(false)}
          className="w-full bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden group/cat"
        >
          {/* Section Header with Scroll Controls & Explore Badge */}
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-800/40">
                <span className="material-symbols-outlined text-[18px]">category</span>
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{isGroups ? 'Explore Group Categories' : 'Explore Verified Categories'}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                    {isGroups ? '40+ Topics' : '40+ Services'}
                  </span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isGroups
                    ? isCategoriesHovered
                      ? 'Paused on hover • Click any category to explore community groups'
                      : 'Auto-scrolling slowly • Tap any category to discover WhatsApp, Telegram & Arattai groups.'
                    : isCategoriesHovered
                    ? 'Paused on hover • Click any category to explore'
                    : 'Auto-scrolling slowly • Tap any category to explore or scroll manually.'}
                </p>
              </div>
            </div>

            {/* Left & Right Smooth Scroll Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll categories left"
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                disabled={!canScrollRight}
                aria-label="Scroll categories right"
                className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                  canScrollRight
                    ? 'border-blue-500 dark:border-blue-500 bg-blue-600 text-white hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-md shadow-blue-500/20'
                    : 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 opacity-40 cursor-not-allowed'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Smooth Horizontal Scrolling Wrapper with Gradient Edge Masks */}
          <div className="relative">
            {/* Left Edge Mask */}
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none transition-opacity duration-300" />
            )}

            {/* Right Edge Mask */}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none transition-opacity duration-300" />
            )}

            {/* 2-Row Horizontal Scrollable Grid */}
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="grid grid-rows-2 grid-flow-col auto-cols-[125px] sm:auto-cols-[140px] gap-3 p-1 overflow-x-auto scrollbar-none"
            >
              {displayedCategoryTiles.map((cat, idx) => (
                <Link
                  key={idx}
                  href={cat.href}
                  className="group relative flex flex-col items-center justify-center text-center p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/50 hover:border-blue-500/50 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Category Icon Container */}
                  <div
                    className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center mb-2 shadow-xs border group-hover:scale-115 group-hover:rotate-6 group-hover:shadow-md transition-all duration-300 relative`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {cat.icon}
                    </span>
                    {cat.badge && (
                      <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[8px] font-black uppercase shadow-xs animate-pulse">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  {/* Name & Subtitle */}
                  <span className="text-[12px] font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 line-clamp-1 transition-colors leading-tight">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 line-clamp-1 transition-colors mt-0.5">
                    {cat.sub}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JustdialHeroStrip;
