import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/pdf-preview'],
      },
    ],
    sitemap: 'https://www.docshift.tech/sitemap.xml',
    host: 'https://www.docshift.tech',
  };
}
