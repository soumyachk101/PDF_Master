import { MetadataRoute } from 'next';
import { TOOLS } from '@/utils/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.docshift.tech';

  // Use a static build-time date so lastmod is deterministic and stable
  // across crawls (changing it on every request signals instability).
  const lastModified = new Date('2026-06-22');

  const home = {
    url: `${baseUrl}/`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  };

  const toolPages = TOOLS.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const staticPages = [
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  return [home, ...toolPages, ...staticPages];
}
