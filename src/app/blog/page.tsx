import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { MathanKarthikaAcademyBanner } from '@/components/MathanKarthikaAcademyBanner';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';
import { BLOG_POSTS } from '@/lib/data';
import { BookOpen, Clock, ChevronRight, Sparkles, FileText } from 'lucide-react';

export const metadata = {
  title: 'Social Group Safety Guides & Sponsored SEO Articles | GroupHub',
  description: 'Learn how to safely join WhatsApp job groups, Telegram student communities, and explore sponsored Top 10 directory articles.',
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-8">
        <AdSenseUnit slotKey="headerLeaderboard" />

        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
            <BookOpen className="w-4 h-4" />
            <span>GroupHub Safety & Sponsored SEO Articles</span>
          </div>

          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Articles, Tutorials & Sponsored Reviews
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Security guides, "Top 10 Group Reviews", and long-tail SEO advice for social group members and brand partners.
          </p>
        </div>

        {/* MATHANKARTHIKA ACADEMY CROSS-SELL BANNER (MONETIZATION OPTION #5 & #12) */}
        <MathanKarthikaAcademyBanner />

        {/* 2 PROMOTIONAL BANNERS */}
        <PaidPromotionCarousel />

        {/* SPONSORED ARTICLE CALLOUT CARD (MONETIZATION OPTION #13) */}
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-black text-amber-500 uppercase flex items-center gap-1">
              <FileText className="w-4 h-4" />
              <span>Option #13: Sponsored Article & Dofollow Backlinks</span>
            </span>
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Want a Dedicated "Top 10 X Groups" Review Article for Your Brand?
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Get a dedicated sponsored article featuring your company, app, or training institute with permanent SEO Dofollow backlinks for ₹999.
            </p>
          </div>

          <Link
            href="/promote"
            className="px-5 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shrink-0"
          >
            Publish Sponsored Article (₹999) →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <React.Fragment key={post.id}>
              <Link
                href={`/blog/${post.slug}`}
                className="group p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between shadow-sm"
              >
                {post.imageUrl && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-4 border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-purple-500 font-semibold">
                    <span className="px-2.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/60">
                      {post.category}
                    </span>
                    <span className="text-slate-400 font-normal flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400">
                  <span>Read Full Guide & Recommendations</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            </React.Fragment>
          ))}
        </div>

        <AdSenseUnit slotKey="betweenSections" />
      </main>

      <Footer />
    </div>
  );
}
