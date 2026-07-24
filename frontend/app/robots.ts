import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/pdf-preview'],
      },
      // AI answer engines cite and link back — allow them for discovery.
      // Content here is public marketing; user files never leave the browser.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      // Common Crawl is a bulk dataset scraper with no citations/traffic — keep blocked.
      { userAgent: 'CCBot', disallow: '/' },
    ],
    sitemap: 'https://www.docshift.tech/sitemap.xml',
    host: 'https://www.docshift.tech',
  };
}
