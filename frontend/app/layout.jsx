import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToHash from '@/components/ScrollToHash';
import { Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, Bebas_Neue, IBM_Plex_Mono } from 'next/font/google';
import IntroOverlay from '@/components/IntroOverlay';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-suisseintl',
  weight: ['400', '500'],
});

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-suisseintlcond',
  weight: ['400'],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-suisseintlmono',
  weight: ['400'],
});

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
    images: [{ url: 'https://www.docshift.tech/logo.png', width: 1200, height: 630, alt: 'DocShift - Free PDF Tools' }],
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
  themeColor: '#e5e7eb',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DocShift',
    url: 'https://www.docshift.tech',
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
    author: {
      '@type': 'Organization',
      name: 'DocShift',
      url: 'https://www.docshift.tech',
    },
  };

  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      </head>
      <body>
        <IntroOverlay />
        <SpeedInsights />
        <Providers>
          <Suspense>
            <ScrollToHash />
          </Suspense>
          <Navbar />
          <main className="pt-20 sm:pt-24 min-h-screen">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
