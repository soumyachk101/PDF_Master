import Link from 'next/link';
import { TOOLS } from '@/utils/tools';
import { SITE_ID } from '@/utils/schema';
import { NeumorphicCard } from '@/components/ui/IndustrialComponents';

export const metadata = {
    title: 'PDF Conversion Tools — Convert To & From PDF Free',
    description: 'Convert a PDF to Word, JPG, Excel, PowerPoint or PDF/A, or turn images and Office files into a PDF. Ten free conversion tools, no signup, files deleted right after processing.',
    keywords: 'convert pdf, pdf converter, convert pdf to word, convert to pdf, pdf conversion tools free',
    alternates: {
        canonical: '/convert-pdf',
    },
    openGraph: {
        title: 'PDF Conversion Tools — Convert To & From PDF Free | DocShift',
        description: 'Convert a PDF to Word, JPG, Excel, PowerPoint or PDF/A, or turn images and Office files into a PDF. Ten free tools, no signup.',
        url: 'https://www.docshift.tech/convert-pdf',
    },
};

const PAGE_URL = 'https://www.docshift.tech/convert-pdf';

const FAQS = [
    {
        q: 'Will converting my file keep the original formatting?',
        a: 'PDF to Word, PDF to PowerPoint and PDF to Excel all try to preserve layout, fonts and structure, but complex layouts (multi-column pages, unusual fonts, nested tables) can shift slightly during conversion — this is a limitation of every conversion engine, not just DocShift\'s. Converting a file <em>to</em> PDF (Word, PowerPoint, Excel, JPG, HTML) is far more predictable, since PDF is a fixed-layout format.',
    },
    {
        q: 'Can I convert more than one file at a time?',
        a: 'JPG to PDF accepts multiple images and combines them into a single PDF in one pass. The other conversion tools process one document per job, since each output (a Word file, a spreadsheet, a slide deck) maps to a single source PDF.',
    },
    {
        q: 'Is there a file size limit?',
        a: 'Yes — each upload is capped at 100 MB. That covers the overwhelming majority of PDFs, Word documents and presentations; very large scanned books or image-heavy slide decks are the main case where you might hit it.',
    },
    {
        q: 'What happens to my file after it\'s converted?',
        a: 'Your upload is deleted from our server the moment the conversion finishes. Nothing is stored, logged, or shared — see the <a href="/privacy">privacy policy</a> for the full data-handling commitment.',
    },
];

export default function ConvertPdfHub() {
    const convertFrom = TOOLS.filter((t) => t.category === 'convertFrom');
    const convertTo = TOOLS.filter((t) => t.category === 'convertTo');

    const breadcrumbId = `${PAGE_URL}#breadcrumb`;
    const schemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': breadcrumbId,
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.docshift.tech/' },
                { '@type': 'ListItem', position: 2, name: 'Convert PDF', item: PAGE_URL },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            '@id': `${PAGE_URL}#webpage`,
            url: PAGE_URL,
            name: 'PDF Conversion Tools',
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
                        PDF Conversion Tools
                    </h1>
                    <p className="font-suisseintlmono text-[11px] text-[#444444] mb-8">
                        Convert to PDF, or out of it — ten tools, one page
                    </p>

                    <div className="font-suisseintl text-sm text-[#222222] leading-relaxed space-y-6">
                        <p>
                            DocShift runs ten separate PDF conversion tools, five that turn a PDF into another
                            file type and five that turn another file type into a PDF. This page groups all
                            ten in one place so you can find the right direction without guessing which tool
                            page to search for. Every conversion listed below deletes your upload from our
                            server the moment the job finishes.
                        </p>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-3">
                                Converting a PDF into another format
                            </h2>
                            <p className="mb-4">
                                Use these when the PDF already exists and you need it as an editable document,
                                a spreadsheet, a slide deck, an image, or a long-term archival file.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {convertFrom.map((tool) => (
                                    <Link
                                        key={tool.slug}
                                        href={`/tool/${tool.slug}`}
                                        className="block p-4 border border-[#000000]/20 bg-[#f9f9f9] hover:border-[#000000] hover:bg-[#f3f3f3] transition-all duration-150"
                                    >
                                        <span className="font-bold text-[#000000] text-sm">{tool.name}</span>
                                        <p className="text-xs text-[#444444] mt-1">{tool.shortDesc}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-3">
                                Converting another file into a PDF
                            </h2>
                            <p className="mb-4">
                                Use these when you have images or an Office document and need a single,
                                fixed-layout PDF you can send, print, or archive without the recipient needing
                                the original app to open it correctly.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {convertTo.map((tool) => (
                                    <Link
                                        key={tool.slug}
                                        href={`/tool/${tool.slug}`}
                                        className="block p-4 border border-[#000000]/20 bg-[#f9f9f9] hover:border-[#000000] hover:bg-[#f3f3f3] transition-all duration-150"
                                    >
                                        <span className="font-bold text-[#000000] text-sm">{tool.name}</span>
                                        <p className="text-xs text-[#444444] mt-1">{tool.shortDesc}</p>
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                Which conversion do I need?
                            </h2>
                            <p>
                                If someone needs to <strong>edit</strong> the content, send them a Word,
                                PowerPoint or Excel file — that&apos;s <Link href="/tool/pdf-to-word" className="text-[#000000] font-bold underline">PDF to Word</Link>,{' '}
                                <Link href="/tool/pdf-to-pptx" className="text-[#000000] font-bold underline">PDF to PowerPoint</Link> or{' '}
                                <Link href="/tool/pdf-to-excel" className="text-[#000000] font-bold underline">PDF to Excel</Link>. If you need a picture of a page for a
                                thumbnail or a social post, use{' '}
                                <Link href="/tool/pdf-to-jpg" className="text-[#000000] font-bold underline">PDF to JPG</Link>. Going the other way, scanned photos or
                                phone pictures become one shareable document with{' '}
                                <Link href="/tool/jpg-to-pdf" className="text-[#000000] font-bold underline">JPG to PDF</Link>, and an existing Word, PowerPoint or Excel
                                file becomes a fixed, print-ready PDF with the matching &ldquo;to PDF&rdquo;
                                tool. Long-term archiving or regulatory storage is what{' '}
                                <Link href="/tool/pdf-to-pdfa" className="text-[#000000] font-bold underline">PDF to PDF/A</Link> is for, and turning a live webpage
                                into a static, offline copy is what{' '}
                                <Link href="/tool/html-to-pdf" className="text-[#000000] font-bold underline">HTML to PDF</Link> does.
                            </p>
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
