import Link from 'next/link';
import { TOOLS, CATEGORIES } from '@/utils/tools';
import { SITE_ID } from '@/utils/schema';
import { NeumorphicCard } from '@/components/ui/IndustrialComponents';

export const metadata = {
    title: 'Free PDF Tools — No Signup, No Watermark | DocShift',
    description: 'All 30 DocShift PDF tools, completely free. No account, no email, no watermark on your output, no daily limit. See exactly what "free" means here.',
    keywords: 'free pdf tools, pdf tools no signup, free pdf editor online, no watermark pdf tools',
    alternates: {
        canonical: '/free-pdf-tools',
    },
    openGraph: {
        title: 'Free PDF Tools — No Signup, No Watermark | DocShift',
        description: 'All 30 DocShift PDF tools, completely free. No account, no email, no watermark on your output, no daily limit.',
        url: 'https://www.docshift.tech/free-pdf-tools',
    },
};

const PAGE_URL = 'https://www.docshift.tech/free-pdf-tools';

const FAQS = [
    {
        q: 'Is DocShift really free, or is there a catch?',
        a: 'Every tool on this page is free with no catch: no trial period, no feature locked behind a paid plan, no credit card requested anywhere on the site.',
    },
    {
        q: 'Do I need to create an account?',
        a: 'No. There is no signup form, no login, and no email address requested anywhere on DocShift. Open a tool and use it.',
    },
    {
        q: 'Does DocShift add a watermark to my file?',
        a: 'No tool stamps its own branding onto your output. The one exception is <a href="/tool/add-watermark">Add Watermark</a> itself, which stamps whatever text you type — because that is the point of that specific tool, not something applied behind your back.',
    },
    {
        q: 'What is the file size limit?',
        a: 'Uploads are capped at 100 MB per file. That covers the large majority of PDFs, Word documents, spreadsheets and presentations people work with day to day.',
    },
    {
        q: 'How is this free?',
        a: 'DocShift is an independent, source-available project with no premium tier to upsell — every tool runs the same way for every visitor. The full source is public on <a href="https://github.com/soumyachk101/PDF_Master" target="_blank" rel="noopener noreferrer">GitHub</a>.',
    },
];

export default function FreePdfToolsHub() {
    const categories = CATEGORIES.filter((c) => c.id !== 'all');
    const breadcrumbId = `${PAGE_URL}#breadcrumb`;

    const schemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': breadcrumbId,
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.docshift.tech/' },
                { '@type': 'ListItem', position: 2, name: 'Free PDF Tools', item: PAGE_URL },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${PAGE_URL}#webpage`,
            url: PAGE_URL,
            name: 'Free PDF Tools',
            description: metadata.description,
            inLanguage: 'en',
            isPartOf: { '@id': SITE_ID },
            breadcrumb: { '@id': breadcrumbId },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]*>/g, '') },
            })),
        },
    ];

    return (
        <div className="min-h-screen bg-[#c0c0c0] py-12 px-4 sm:px-8 overflow-x-hidden">
            {schemas.map((schema, i) => (
                <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            ))}
            <div className="max-w-4xl mx-auto">
                <div className="bg-[#ffffff] border-2 border-[#000000] shadow-[4px_4px_0_#000000] p-6 sm:p-10">
                    <h1 className="font-suisseintlcond text-3xl sm:text-4xl font-bold text-[#000000] mb-2 uppercase tracking-wider">
                        Free PDF Tools
                    </h1>
                    <p className="font-suisseintlmono text-[11px] text-[#444444] mb-8">
                        All 30 tools. No account. No watermark. No catch.
                    </p>

                    <div className="font-suisseintl text-sm text-[#222222] leading-relaxed space-y-6">
                        <p>
                            DocShift runs 30 PDF tools covering conversion, editing, organizing, compressing
                            and securing documents, and every one of them is free to use. This page spells out
                            exactly what &ldquo;free&rdquo; means in practice, then links to all 30 tools grouped
                            by what they do.
                        </p>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                What &ldquo;free&rdquo; actually means here
                            </h2>
                            <ul className="list-disc list-inside space-y-2">
                                <li><strong>No account or signup</strong> — there&apos;s no login system on DocShift at all. Open a tool page and use it directly.</li>
                                <li><strong>No email required</strong> — nothing is collected to unlock a tool or deliver your file.</li>
                                <li><strong>No watermark added to your output</strong> — unless you&apos;re deliberately using the Add Watermark tool, nothing gets stamped onto your file.</li>
                                <li><strong>No daily limit and no premium tier</strong> — there&apos;s no paid plan gating features, so nothing is held back for a &ldquo;pro&rdquo; version.</li>
                                <li><strong>A 100 MB per-file upload limit</strong> — the one real constraint. It&apos;s generous enough for nearly every PDF, document or presentation, but very large scanned books or image-heavy files can hit it. That limit exists because each file is processed on a real server with finite memory and time, not to push anyone toward a bigger-file paid plan &mdash; there isn&apos;t one.</li>
                            </ul>
                            <p className="mt-4">
                                None of this is a limited-time offer or an introductory price. It&apos;s the
                                same set of tools, under the same terms, for every visitor, indefinitely.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-4">
                                All 30 tools, by category
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                                {categories.map((cat) => {
                                    const tools = TOOLS.filter((t) => t.category === cat.id);
                                    return (
                                        <div key={cat.id}>
                                            <h3 className="font-suisseintlmono text-[11px] uppercase tracking-widest text-[#000000]/70 mb-2 font-bold border-b border-[#000000]/10 pb-1">
                                                {cat.label}
                                            </h3>
                                            <ul className="flex flex-col gap-1.5">
                                                {tools.map((tool) => (
                                                    <li key={tool.slug}>
                                                        <Link
                                                            href={`/tool/${tool.slug}`}
                                                            className="inline-block text-xs text-[#444444] hover:text-[#000000] hover:underline transition-all duration-150"
                                                        >
                                                            {tool.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        <div className="border-t border-[#000000]/10 my-8" />
                        <h2 className="font-suisseintlcond font-bold text-lg uppercase mb-5 mt-6 text-[#000000]">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {FAQS.map((faq, index) => (
                                <NeumorphicCard key={index} title={`Q: ${faq.q}`} hoverEffect={false} className="p-6 bg-[#ffffff] border border-[#000000] rounded-[32px]">
                                    <p
                                        className="text-xs sm:text-sm text-[#444444] leading-relaxed [&_a]:text-[#000000] [&_a]:font-bold [&_a]:underline"
                                        dangerouslySetInnerHTML={{ __html: faq.a }}
                                    />
                                </NeumorphicCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
