import type { MetadataRoute } from 'next';
import { getProjectContent } from '@/lib/projectContent';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = Object.keys(getProjectContent('de')).map((slug) => ({
    url: `${SITE_URL}/projekte/${slug}`,
    changeFrequency: 'yearly' as const,
    priority: 0.7,
  }));
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ...projects,
  ];
}
