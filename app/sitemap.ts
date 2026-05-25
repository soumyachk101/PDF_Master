import { MetadataRoute } from 'next';
import { TOOLS } from '@/utils/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.docshift.tech';
  const now = new Date();

  const home = {
    url: `${baseUrl}/`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  };

  const toolPages = TOOLS.map((tool) => ({
    url: `${baseUrl}/tool/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [home, ...toolPages];
}
