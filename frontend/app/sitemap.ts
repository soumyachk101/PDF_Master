import { MetadataRoute } from 'next';
import { TOOLS } from '@/utils/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.docshift.tech';

  // Fallback for any page with no tracked edit date — a static build-time
  // constant so lastmod stays deterministic across crawls (changing it on
  // every request signals instability). Per-tool pages prefer their own
  // `tool.updated` when set.
  const defaultLastModified = new Date('2026-07-26');

  const home = {
    // No trailing slash — must match the homepage canonical tag exactly.
    url: baseUrl,
    lastModified: defaultLastModified,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  };

  const toolPages = TOOLS.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: tool.updated ? new Date(tool.updated) : defaultLastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  const staticPages = [
    { url: `${baseUrl}/about`, lastModified: defaultLastModified, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: defaultLastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: defaultLastModified, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: defaultLastModified, changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  const hubPages = [
    { url: `${baseUrl}/convert-pdf`, lastModified: defaultLastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/free-pdf-tools`, lastModified: defaultLastModified, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/pdf-security-guide`, lastModified: defaultLastModified, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/alternatives/ilovepdf`, lastModified: defaultLastModified, changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/alternatives/smallpdf`, lastModified: defaultLastModified, changeFrequency: 'monthly' as const, priority: 0.6 },
  ];

  return [home, ...toolPages, ...staticPages, ...hubPages];
}
