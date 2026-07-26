import { getToolBySlug, TOOLS } from '@/utils/tools';
import ToolPage from '@/views/ToolPage';
import ToolSEOContent from '@/views/ToolSEOContent';
import { ORG_ID, SITE_ID } from '@/utils/schema';

export function generateStaticParams() {
  return TOOLS.map((tool) => ({
    toolSlug: tool.slug,
  }));
}

// Every valid slug is known at build time, so anything outside generateStaticParams
// is a 404 — not an indexable "Tool Not Found" page served with HTTP 200.
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
      description: 'The requested tool does not exist.',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: tool.seoTitle || `${tool.name} Online Free – DocShift`,
    description: tool.seoDesc || tool.shortDesc,
    keywords: tool.seoKeywords || undefined,
    alternates: {
      canonical: `/tool/${tool.slug}`,
    },
    openGraph: {
      type: 'website',
      url: `https://www.docshift.tech/tool/${tool.slug}`,
      title: tool.seoTitle || `${tool.name} Online Free – DocShift`,
      description: tool.seoDesc || tool.shortDesc,
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.seoTitle || `${tool.name} Online Free – DocShift`,
      description: tool.seoDesc || tool.shortDesc,
    },
  };
}

export default async function ToolRoute({ params }) {
  const { toolSlug } = await params;
  const tool = getToolBySlug(toolSlug);

  const schemas = [];

  if (tool) {
    const pageUrl = `https://www.docshift.tech/tool/${tool.slug}`;
    const breadcrumbId = `${pageUrl}#breadcrumb`;

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: `${tool.name} - DocShift`,
      url: pageUrl,
      description: tool.shortDesc,
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@id': ORG_ID },
      featureList: [
        '100% private - files processed in browser',
        'No uploads or server storage',
        'Free forever with no limits',
        'Works on any device',
      ],
    });

    const categoryLabels = {
      organize: 'Organize PDF',
      optimize: 'Optimize PDF',
      convertTo: 'Convert to PDF',
      convertFrom: 'Convert from PDF',
      edit: 'Edit PDF',
      security: 'PDF Security',
      intelligence: 'PDF Intelligence',
    };
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': breadcrumbId,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.docshift.tech/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: categoryLabels[tool.category] || 'Tools',
          item: `https://www.docshift.tech/#${tool.category}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: tool.name,
          item: pageUrl,
        },
      ],
    });

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: tool.seoTitle || `${tool.name} - DocShift`,
      description: tool.seoDesc || tool.shortDesc,
      inLanguage: 'en',
      isPartOf: { '@id': SITE_ID },
      breadcrumb: { '@id': breadcrumbId },
    });

    if (tool.faqs && tool.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: tool.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      });
    }
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
      <ToolSEOContent toolSlug={toolSlug} />
    </>
  );
}
