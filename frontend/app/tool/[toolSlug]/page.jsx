import { getToolBySlug, TOOLS } from '@/utils/tools';
import ToolPage from '@/views/ToolPage';
import ToolSEOContent from '@/views/ToolSEOContent';

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
      applicationCategory: 'Utility',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: {
        '@type': 'Organization',
        name: 'DocShift',
        url: 'https://www.docshift.tech',
      },
      featureList: [
        '100% private - files processed in browser',
        'No uploads or server storage',
        'Free forever with no limits',
        'Works on any device',
      ],
    });

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to ${tool.name}`,
      description: tool.shortDesc,
      step: [
        {
          '@type': 'HowToStep',
          name: 'Upload your file',
          text: `Upload your ${tool.accept ? 'file' : 'URL'} to the ${tool.name} tool.`,
        },
        {
          '@type': 'HowToStep',
          name: 'Process',
          text: `Click the process button to ${tool.name.toLowerCase()} instantly in your browser.`,
        },
        {
          '@type': 'HowToStep',
          name: 'Download result',
          text: 'Download your processed file immediately.',
        },
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
      <ToolSEOContent toolSlug={toolSlug} />
    </>
  );
}
