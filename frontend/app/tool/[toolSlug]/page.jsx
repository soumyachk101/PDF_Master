import { getToolBySlug, TOOLS } from '@/utils/tools';
import ToolPage from '@/views/ToolPage';

export function generateStaticParams() {
  return TOOLS.map((tool) => ({
    toolSlug: tool.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool does not exist.',
    };
  }

  return {
    title: tool.seoTitle || `${tool.name} Online Free – DocShift`,
    description: tool.seoDesc || tool.shortDesc,
    keywords: tool.seoKeywords || undefined,
    alternates: {
      canonical: `https://www.docshift.tech/tool/${tool.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `https://www.docshift.tech/tool/${tool.slug}`,
      title: tool.seoTitle || `${tool.name} Online Free – DocShift`,
      description: tool.seoDesc || tool.shortDesc,
      images: [{ url: 'https://www.docshift.tech/logo.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      url: `https://www.docshift.tech/tool/${tool.slug}`,
      title: tool.seoTitle || `${tool.name} Online Free – DocShift`,
      description: tool.seoDesc || tool.shortDesc,
      images: ['https://www.docshift.tech/logo.png'],
    },
  };
}

export default async function ToolRoute({ params }) {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);

  const schemas = [];

  if (tool?.faqs && tool.faqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: tool.faqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    });
  }

  if (tool) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${tool.name} - DocShift`,
      url: `https://www.docshift.tech/tool/${tool.slug}`,
      description: tool.shortDesc,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        '100% private - files processed in browser',
        'No uploads or server storage',
        'Free forever with no limits',
        'Works on any device',
      ],
    });
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ToolPage toolSlug={toolSlug} />
    </>
  );
}
