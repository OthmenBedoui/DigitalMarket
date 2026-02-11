import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://digitalmarket.example.com';

  return [
    '',
    '/shop',
    '/faq',
    '/terms',
    '/privacy',
    '/blog',
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: path === '' ? 1 : 0.7,
  }));
}
