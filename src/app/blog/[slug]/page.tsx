import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { PaidPromotionCarousel } from '@/components/PaidPromotionCarousel';
import { BLOG_POSTS } from '@/lib/data';
import { BookOpen, Clock, Calendar, ChevronRight, HelpCircle, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) return { title: 'Article Not Found | GroupHub' };

  const title = post.metaTitle || `${post.title} | GroupHub Blog`;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    keywords: post.primaryKeyword ? [post.primaryKeyword, ...(post.secondaryKeywords || [])] : post.tags,
    openGraph: {
      title,
      description,
      type: 'article',
      images: post.imageUrl ? [{ url: post.imageUrl, alt: post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.imageUrl ? [post.imageUrl] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const post = BLOG_POSTS.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.imageUrl,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    datePublished: post.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'GroupHub India',
      url: 'https://joingrouplinks.in',
    },
  };

  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 flex-grow space-y-6">
        <AdSenseUnit slotKey="headerLeaderboard" />

        <nav className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-emerald-500">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/blog" className="hover:text-emerald-500">Blog</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-700 dark:text-slate-300 font-bold truncate max-w-[200px]">
            {post.title}
          </span>
        </nav>

        <article className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 md:p-10 space-y-8 shadow-sm">
          {/* Header Metadata */}
          <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {post.category}
              </span>
              {post.primaryKeyword && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                  Target: {post.primaryKeyword}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-xs text-slate-400 font-medium pt-1 flex-wrap">
              <span>By {post.author}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md aspect-video bg-slate-100 dark:bg-slate-800">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          )}

          <AdSenseUnit slotKey="inArticle" />

          {/* Main Content Body */}
          <div
            className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQs Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-500" />
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  Frequently Asked Questions (FAQs)
                </h2>
              </div>
              <div className="space-y-3">
                {post.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2"
                  >
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {faq.q}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Internal Links / Next Steps */}
          {post.internalLinks && post.internalLinks.length > 0 && (
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Related Directory Hubs &amp; Useful Links:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {post.internalLinks.map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.href}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-all group"
                  >
                    <span>{link.anchor}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 flex-wrap">
              <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <AdSenseUnit slotKey="betweenSections" />
        </article>

        {/* 2 PROMOTIONAL BANNERS */}
        <PaidPromotionCarousel />
      </main>

      <Footer />
    </div>
  );
}
