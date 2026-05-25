import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToHash from '@/components/ScrollToHash';
import { Suspense } from 'react';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.docshift.tech'),
  title: {
    default: 'Free PDF Tools Online – Merge, Compress, Convert | DocShift',
    template: '%s | DocShift',
  },
  description: 'Free online PDF tools that work entirely in your browser. Merge, compress, convert PDF to Word, split and edit PDFs instantly. No uploads, 100% private.',
  keywords: 'pdf tools, merge pdf without uploading, compress pdf in browser, completely free pdf tools online',
  authors: [{ name: 'DocShift' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  openGraph: {
    type: 'website',
    url: 'https://www.docshift.tech/',
    title: 'Free PDF Tools Online – Merge, Compress, Convert | DocShift',
    description: 'Free online PDF tools that work entirely in your browser. Merge, compress, convert PDF to Word, split and edit PDFs instantly. No uploads, 100% private.',
    images: [{ url: 'https://www.docshift.tech/logo.png', width: 512, height: 512, alt: 'DocShift - Free PDF Tools Logo' }],
    siteName: 'DocShift',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Tools Online – Merge, Compress, Convert | DocShift',
    description: 'Free online PDF tools that work entirely in your browser. Merge, compress, convert PDF to Word, split and edit PDFs instantly. No uploads, 100% private.',
    images: ['https://www.docshift.tech/logo.png'],
    site: '@soumyachk1',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
};

export const viewport = {
  themeColor: '#F05B25',
};

export default function RootLayout({ children }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DocShift',
    url: 'https://www.docshift.tech',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.docshift.tech/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DocShift',
    url: 'https://www.docshift.tech',
    logo: 'https://www.docshift.tech/logo.png',
    description: 'Free browser-based PDF tools. Merge, compress, convert and edit PDFs with 100% privacy.',
    foundingDate: '2024',
    sameAs: [
      'https://x.com/soumyachk1',
      'https://github.com/soumyachk101',
      'https://discord.com/users/soumya.chk101',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@docshift.tech',
      availableLanguage: ['English'],
    },
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DocShift PDF Tools',
    url: 'https://www.docshift.tech',
    applicationCategory: 'Utility',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description: 'Free browser-based PDF tools. Merge, compress, convert and edit PDFs with 100% privacy.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '284',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      </head>
      <body>
        <Providers>
          <div className="noise-overlay" />
          <Suspense>
            <ScrollToHash />
          </Suspense>
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: '64px' }}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
