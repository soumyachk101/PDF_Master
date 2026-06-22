import dynamic from 'next/dynamic';
import { TOOLS } from '@/utils/tools';

const HomePage = dynamic(() => import('@/views/HomePage'), {
  loading: () => <div style={{ minHeight: '100vh' }} />,
});

export const metadata = {
  title: 'DocShift – Free & Private PDF Tools',
  description: 'Access 30+ PDF tools in your browser. Merge, compress, and convert PDFs securely without uploading files to any server. 100% private and free.',
  keywords: 'pdf tools, merge pdf, split pdf, free online pdf tools, secure pdf editor, convert pdf',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.docshift.tech/',
    title: 'DocShift – Free & Private PDF Tools',
    description: 'Access 30+ PDF tools in your browser. Merge, compress, and convert PDFs securely without uploading files to any server. 100% private and free.',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'DocShift – Free PDF Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DocShift – Free & Private PDF Tools',
    description: 'Access 30+ PDF tools in your browser. Merge, compress, and convert PDFs securely without uploading files to any server. 100% private and free.',
    images: ['/logo.png'],
  },
};

export default function Page() {
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'DocShift PDF Tools',
    description: 'Free browser-based PDF tools for merging, splitting, compressing, converting, and editing PDFs.',
    numberOfItems: TOOLS.length,
    itemListElement: TOOLS.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebApplication',
        name: tool.name,
        url: `https://www.docshift.tech/tool/${tool.slug}`,
        description: tool.shortDesc,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <HomePage />
    </>
  );
}
