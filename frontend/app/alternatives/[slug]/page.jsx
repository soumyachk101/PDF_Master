import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SITE_ID } from '@/utils/schema';
import { NeumorphicCard } from '@/components/ui/IndustrialComponents';

// Two hand-written entries only — see task 021's notes for why this isn't a
// generated list. Nothing here may state a competitor's price, limit,
// watermark policy, retention period or feature set: there is no verified
// source for any of it. Every claim below is about DocShift, not them.
const ALTERNATIVES = {
    ilovepdf: {
        name: 'iLovePDF',
        title: 'DocShift: A Free iLovePDF Alternative',
        seoTitle: 'Free iLovePDF Alternative — No Signup | DocShift',
        seoDesc: 'Looking for an iLovePDF alternative? DocShift runs the same everyday PDF jobs — merge, compress, convert, sign — with no account and no premium tier.',
        intro: 'Looking for an iLovePDF alternative that skips the account prompts? DocShift runs the same core PDF jobs — merging, compressing, converting, signing — without asking you to sign up first.',
        formats: 'DocShift accepts the file types most conversions actually need: JPG and PNG images for image-to-PDF jobs, DOC and DOCX for Word conversions, PPT and PPTX for PowerPoint, XLS and XLSX for Excel, and PDF itself for every organizing, editing and security tool. The 100 MB per-file cap exists because each upload is processed on a real server with finite memory and time — not to push anyone toward a paid tier, since there isn\'t one.',
        startTools: ['merge-pdf', 'compress-pdf', 'pdf-to-word', 'jpg-to-pdf', 'protect-pdf', 'ocr-pdf'],
        faqs: [
            {
                q: 'Why look for an iLovePDF alternative?',
                a: 'People usually want to skip account creation, or want a tool that’s upfront about what happens to a file after it’s processed. DocShift needs neither an account nor an email for any of its 30 tools, and deletes every upload right after the job finishes — see the <a href="/pdf-security-guide">security guide</a> for the full picture.',
            },
            {
                q: 'Is DocShift completely free?',
                a: 'Yes. There’s no premium tier gating any tool, no trial period, and nothing held back behind a paywall.',
            },
            {
                q: 'What happens to my file after I use a tool?',
                a: 'It’s deleted from the server the moment processing finishes. Nothing is stored, logged, or shared — see the <a href="/privacy">privacy policy</a>.',
            },
            {
                q: 'Are all 30 DocShift tools fully working?',
                a: 'Nearly all of them. Three — Organize PDF, Edit PDF and Redact PDF — are currently being rebuilt and don’t yet do everything their page describes, so we’d rather say that plainly than oversell them.',
            },
            {
                q: 'Can I use DocShift on my phone?',
                a: 'Yes — DocShift is a responsive website, not a native app, so every tool works in a mobile browser the same way it does on desktop. There\'s nothing to install either way.',
            },
        ],
    },
    smallpdf: {
        name: 'Smallpdf',
        title: 'DocShift: A Free Smallpdf Alternative',
        seoTitle: 'Free Smallpdf Alternative — No Signup | DocShift',
        seoDesc: 'Comparing Smallpdf alternatives? DocShift covers the same everyday PDF tasks — split, compress, convert, sign — with no login and no premium tier.',
        intro: 'Comparing Smallpdf alternatives that don’t require a login? DocShift covers the same everyday PDF tasks — splitting, compressing, converting, signing — with no account created anywhere on the site.',
        formats: 'Uploads can be JPG or PNG images, DOC or DOCX documents, PPT or PPTX slide decks, XLS or XLSX spreadsheets, or a PDF itself, depending on which tool you\'re using — the accepted format is shown on each tool page before you upload anything. Files are capped at 100 MB each, a limit tied to how much a server can realistically process at once rather than a lever to sell a bigger-file plan, since DocShift doesn\'t have one.',
        startTools: ['split-pdf', 'compress-pdf', 'pdf-to-excel', 'sign-pdf', 'unlock-pdf', 'translate-pdf'],
        faqs: [
            {
                q: 'Why switch from Smallpdf?',
                a: 'Some people just want one fewer account to manage. DocShift skips sign-up entirely — open a tool page and use it — and deletes your file from the server as soon as the job is done.',
            },
            {
                q: 'Does DocShift cost anything, ever?',
                a: 'No. Every one of the 30 tools is free with no premium plan behind it.',
            },
            {
                q: 'Is my file safe if I upload it?',
                a: 'Your file is deleted from the server immediately after processing — there’s no database of user files. Full detail is on the <a href="/pdf-security-guide">PDF security guide</a>.',
            },
            {
                q: 'Which DocShift tools aren’t fully finished yet?',
                a: 'Organize PDF, Edit PDF and Redact PDF are currently being rebuilt behind the scenes and don’t yet match their page descriptions — worth knowing before you rely on one of those three specifically.',
            },
            {
                q: 'Does DocShift work on mobile devices?',
                a: 'Yes — it\'s a responsive website rather than a native app, so it runs the same way in a phone or tablet browser as it does on desktop, with nothing to download or install.',
            },
        ],
    },
};

export function generateStaticParams() {
    return Object.keys(ALTERNATIVES).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const alt = ALTERNATIVES[slug];
    if (!alt) return { title: 'Not Found', robots: { index: false, follow: false } };

    return {
        title: alt.seoTitle,
        description: alt.seoDesc,
        alternates: { canonical: `/alternatives/${slug}` },
        openGraph: {
            title: alt.seoTitle,
            description: alt.seoDesc,
            url: `https://www.docshift.tech/alternatives/${slug}`,
        },
    };
}

export default async function AlternativePage({ params }) {
    const { slug } = await params;
    const alt = ALTERNATIVES[slug];
    if (!alt) notFound();

    const pageUrl = `https://www.docshift.tech/alternatives/${slug}`;
    const breadcrumbId = `${pageUrl}#breadcrumb`;

    const schemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': breadcrumbId,
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.docshift.tech/' },
                { '@type': 'ListItem', position: 2, name: 'Alternatives', item: 'https://www.docshift.tech/alternatives' },
                { '@type': 'ListItem', position: 3, name: alt.name, item: pageUrl },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${pageUrl}#webpage`,
            url: pageUrl,
            name: alt.title,
            description: alt.seoDesc,
            inLanguage: 'en',
            isPartOf: { '@id': SITE_ID },
            breadcrumb: { '@id': breadcrumbId },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: alt.faqs.map((f) => ({
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
                        {alt.title}
                    </h1>
                    <p className="font-suisseintlmono text-[11px] text-[#444444] mb-8">
                        No account, no premium tier, files deleted right after processing
                    </p>

                    <div className="font-suisseintl text-sm text-[#222222] leading-relaxed space-y-6">
                        <p>{alt.intro}</p>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                What DocShift offers
                            </h2>
                            <p>
                                DocShift runs 30 PDF tools covering organizing, converting, editing and
                                securing documents. None of them need an account or an email address —
                                there&apos;s no login system on the site at all. No tool stamps its own
                                branding onto your output; the only exception is{' '}
                                <Link href="/tool/add-watermark" className="text-[#000000] font-bold underline">Add Watermark</Link>,
                                which stamps whatever text you type in, because that&apos;s the point of that
                                specific tool. Every upload is deleted from the server the instant a job
                                finishes — see the{' '}
                                <Link href="/pdf-security-guide" className="text-[#000000] font-bold underline">PDF security guide</Link>{' '}
                                for how that works. Every tool is free, with no premium tier gating any
                                feature — the full list is on{' '}
                                <Link href="/free-pdf-tools" className="text-[#000000] font-bold underline">Free PDF Tools</Link>.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                Where DocShift is still catching up
                            </h2>
                            <p>
                                Three tools —{' '}
                                <Link href="/tool/organize-pdf" className="text-[#000000] font-bold underline">Organize PDF</Link>,{' '}
                                <Link href="/tool/edit-pdf" className="text-[#000000] font-bold underline">Edit PDF</Link> and{' '}
                                <Link href="/tool/redact-pdf" className="text-[#000000] font-bold underline">Redact PDF</Link>{' '}
                                — are currently being rebuilt behind the scenes and don&apos;t yet do
                                everything their page describes; we&apos;d rather disclose that plainly than
                                let the copy overpromise. There&apos;s also no dedicated mobile app —
                                DocShift is a responsive website you use in any browser — and no team or
                                multi-seat account system, since there&apos;s no account system of any kind.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                File types and size limits
                            </h2>
                            <p>{alt.formats}</p>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-3">
                                Tools to start with
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {alt.startTools.map((slugName) => (
                                    <Link
                                        key={slugName}
                                        href={`/tool/${slugName}`}
                                        className="h-10 rounded-none border border-[#000000]/15 bg-[#ffffff] flex items-center justify-center px-3 text-xs font-bold text-[#444444] hover:text-[#000000] hover:border-[#000000] hover:bg-[#f3f3f3] transition-all duration-150 truncate text-center"
                                    >
                                        {slugName.replace(/-/g, ' ')}
                                    </Link>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                Missing something you need?
                            </h2>
                            <p>
                                If a specific feature isn&apos;t here yet, it&apos;s worth saying so rather
                                than working around it silently — that&apos;s exactly what happened with the
                                three tools listed above. For anything else, feature requests and bug reports
                                go through the{' '}
                                <Link href="/contact" className="text-[#000000] font-bold underline">Contact page</Link>,
                                which lists email, X and Discord as the fastest ways to reach the person who
                                actually maintains DocShift.
                            </p>
                        </section>

                        <div className="border-t border-[#000000]/10 my-8" />
                        <h2 className="font-suisseintlcond font-bold text-lg uppercase mb-5 mt-6 text-[#000000]">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {alt.faqs.map((faq, index) => (
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
