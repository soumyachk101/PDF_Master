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
      // Content here is public marketing; uploaded files are deleted right after
      // processing and are never used for anything beyond the requested job.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      // Common Crawl sends no traffic and no citations of its own, but its dumps feed
      // pretraining for many open models — and every free backlink/index checker reads
      // them. Blocking it made the site invisible to those tools for zero benefit on a
      // site whose crawlable content is public marketing copy, not user file data.
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: 'https://www.docshift.tech/sitemap.xml',
    host: 'https://www.docshift.tech',
  };
}
