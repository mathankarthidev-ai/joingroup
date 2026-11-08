import { MetadataRoute } from 'next';
import { SAFE_COUNTRIES, CATEGORIES, INITIAL_GROUPS, BLOG_POSTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://grouphub.example.com';

  const staticRoutes = [
    '',
    '/whatsapp',
    '/telegram',
    '/submit-group',
    '/promote',
    '/blog',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/dmca',
    '/community-guidelines',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-08-19'),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Country GEO routes
  const countryRoutes = SAFE_COUNTRIES.map((c) => ({
    url: `${baseUrl}/groups/${c.slug}`,
    lastModified: new Date('2026-08-19'),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Group detail routes
  const groupRoutes = INITIAL_GROUPS.map((g) => ({
    url: `${baseUrl}/group/${g.slug}`,
    lastModified: new Date(g.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Blog post routes
  const blogRoutes = BLOG_POSTS.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date('2026-08-19'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...countryRoutes, ...groupRoutes, ...blogRoutes];
}
