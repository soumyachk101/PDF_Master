import Link from 'next/link';
import { SITE_ID } from '@/utils/schema';
import { NeumorphicCard } from '@/components/ui/IndustrialComponents';

export const metadata = {
    title: 'PDF Security Guide — Passwords, Redaction & Signatures',
    description: 'Is it safe to upload a PDF online? A plain-language guide to file retention, password encryption, redaction, digital signatures and PDF/A archiving.',
    keywords: 'pdf security, is it safe to upload pdf online, pdf password encryption, pdf redaction, pdf digital signature',
    alternates: {
        canonical: '/pdf-security-guide',
    },
    openGraph: {
        title: 'PDF Security Guide — Passwords, Redaction & Signatures | DocShift',
        description: 'Is it safe to upload a PDF online? A plain-language guide to file retention, password encryption, redaction, digital signatures and PDF/A archiving.',
        url: 'https://www.docshift.tech/pdf-security-guide',
    },
};

const PAGE_URL = 'https://www.docshift.tech/pdf-security-guide';

const FAQS = [
    {
        q: 'Is it safe to upload a PDF to an online tool?',
        a: 'It depends entirely on what that specific service does with your file afterward — not on where the processing happens. Look for a clear statement of when the file is deleted, and be cautious of any tool that doesn\'t say.',
    },
    {
        q: 'What\'s the difference between redacting a PDF and blacking out text?',
        a: 'Redaction removes the underlying data from the file. Drawing a black box only hides it visually — the original text can still exist underneath and be recoverable by copying, searching, or opening the file in another program. The two are not interchangeable for anything genuinely sensitive.',
    },
    {
        q: 'Is a typed or drawn signature legally binding?',
        a: 'A typed or drawn signature image, on its own, is a visual mark — it shows intent but carries none of the cryptographic identity-verification of a certificate-based digital signature (the kind backed by a PKI certificate that proves who signed and whether the document changed afterward). Whether a visual signature is sufficient depends on what you\'re signing and which jurisdiction\'s rules apply — check with whoever requires the signed document if you\'re unsure.',
    },
    {
        q: 'What is PDF/A and do I actually need it?',
        a: 'PDF/A is a version of the PDF format designed for long-term archiving — it embeds fonts and restricts features that could make a file unreadable years later. You need it if an archive, court, or institution specifically asks for a PDF/A file; for everyday sharing, a normal PDF is fine.',
    },
    {
        q: 'What\'s the difference between a user password and an owner password?',
        a: 'A user password is required to open the file at all. An owner (permissions) password leaves the file openable but restricts actions like printing or editing. Some tools let you set these separately; others apply a single password to both roles — check which model a specific encryption tool uses before relying on it.',
    },
];

export default function PdfSecurityGuide() {
    const breadcrumbId = `${PAGE_URL}#breadcrumb`;
    const schemas = [
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            '@id': breadcrumbId,
            itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.docshift.tech/' },
                { '@type': 'ListItem', position: 2, name: 'PDF Security Guide', item: PAGE_URL },
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': `${PAGE_URL}#webpage`,
            url: PAGE_URL,
            name: 'PDF Security Guide',
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
                acceptedAnswer: { '@type': 'Answer', text: f.a },
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
                        PDF Security Guide
                    </h1>
                    <p className="font-suisseintlmono text-[11px] text-[#444444] mb-8">
                        What actually happens to your file, and what these tools really do
                    </p>

                    <div className="font-suisseintl text-sm text-[#222222] leading-relaxed space-y-6">
                        <p>
                            PDF tools get asked to handle contracts, tax paperwork, ID scans and other files
                            people would rather not mishandle. This guide explains, in plain terms, what
                            happens when you use an online PDF tool and what the security-related tools on
                            this site actually do under the hood — not just what their buttons are labeled.
                        </p>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                What happens when you upload a file to an online PDF tool
                            </h2>
                            <p>
                                Most real PDF operations — compressing with Ghostscript, running OCR, converting
                                to Word or PowerPoint, encrypting with a password — depend on server-side
                                libraries that don&apos;t run inside a browser tab. So the honest, useful
                                question isn&apos;t &ldquo;does this happen locally,&rdquo; it&apos;s{' '}
                                <strong>what happens to the file afterward, and how quickly.</strong> On
                                DocShift, every upload is processed and then deleted from the server the moment
                                the job finishes — there is no database of user files and nothing is kept,
                                logged or shared. The full commitment is on the{' '}
                                <Link href="/privacy" className="text-[#000000] font-bold underline">privacy policy</Link>.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                User password vs. owner (permissions) password
                            </h2>
                            <p>
                                Password protection on a PDF can mean two different things. A <strong>user
                                password</strong> is required just to open the file. An <strong>owner or
                                permissions password</strong> leaves the file readable but restricts actions
                                like printing, copying text, or editing. Some encryption tools let you set
                                these two independently; DocShift&apos;s{' '}
                                <Link href="/tool/protect-pdf" className="text-[#000000] font-bold underline">Protect PDF</Link>{' '}
                                applies AES-256 encryption using a single password for both roles, rather than
                                a two-tier system — worth knowing if you specifically needed separate open and
                                permissions passwords. Need to remove a password instead?{' '}
                                <Link href="/tool/unlock-pdf" className="text-[#000000] font-bold underline">Unlock PDF</Link>{' '}
                                does that, provided you already have the correct password.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                Redaction vs. drawing a black box
                            </h2>
                            <p>
                                This distinction matters more than it sounds. Genuine redaction strips the
                                underlying data out of the file entirely. Simply drawing a black rectangle over
                                text — a common shortcut in basic PDF editors — only covers it visually; the
                                original characters can still be sitting in the file&apos;s content stream,
                                recoverable by selecting and copying the &ldquo;hidden&rdquo; text or by opening
                                the file in a different viewer. Never rely on a visual overlay alone for
                                anything you actually need removed. If your goal is restricting who can open or
                                modify a file rather than deleting specific content from it, that&apos;s what{' '}
                                <Link href="/tool/protect-pdf" className="text-[#000000] font-bold underline">encryption</Link>{' '}
                                is for.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                Visible signature vs. digital certificate signature
                            </h2>
                            <p>
                                A visible signature — typed in a cursive font, drawn with a mouse or finger, or
                                a scanned image — is a mark stamped onto the page. A certificate-based digital
                                signature is a different thing entirely: it uses a PKI certificate to
                                cryptographically bind a signer&apos;s identity to the exact bytes of the
                                document, so any later change is detectable.{' '}
                                <Link href="/tool/sign-pdf" className="text-[#000000] font-bold underline">Sign PDF</Link>{' '}
                                on DocShift places a visible signature onto your document — it does not apply a
                                certificate-based signature. For most everyday paperwork a visible signature is
                                exactly what&apos;s expected; for anything with a strict legal signing
                                requirement, check what that specific process requires first.
                            </p>
                        </section>

                        <section>
                            <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                                PDF/A and why archives ask for it
                            </h2>
                            <p>
                                Ordinary PDFs can reference fonts or content that live outside the file, which
                                is fine today but can break in a viewer decades from now. PDF/A is a restricted
                                version of the format built specifically to still render correctly after a very
                                long time — fonts are embedded, and features that depend on external resources
                                or non-deterministic playback are disallowed.{' '}
                                <Link href="/tool/pdf-to-pdfa" className="text-[#000000] font-bold underline">PDF to PDF/A</Link>{' '}
                                converts a document toward that archival format; if an institution needs a
                                specific PDF/A conformance level, confirm the requirement with them directly
                                rather than assuming any converter covers it automatically.
                            </p>
                        </section>

                        <div className="border-t border-[#000000]/10 my-8" />
                        <h2 className="font-suisseintlcond font-bold text-lg uppercase mb-5 mt-6 text-[#000000]">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {FAQS.map((faq, index) => (
                                <NeumorphicCard key={index} title={`Q: ${faq.q}`} hoverEffect={false} className="p-6 bg-[#ffffff] border border-[#000000] rounded-[32px]">
                                    <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">{faq.a}</p>
                                </NeumorphicCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
