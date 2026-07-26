import { SITE_ID, PERSON_ID } from '@/utils/schema';

export const metadata = {
  title: 'About Us',
  description: 'Learn about DocShift – Free online PDF tools, no signup required. Files are deleted from our server right after processing.',
  keywords: 'about docshift, pdf tools, free pdf editor, online pdf tools, secure pdf processing',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Us | DocShift',
    description: 'Learn about DocShift – Free online PDF tools, no signup required.',
    url: 'https://www.docshift.tech/about',
  },
};

const ABOUT_URL = 'https://www.docshift.tech/about';

export default function AboutPage() {
  const aboutPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${ABOUT_URL}#webpage`,
    url: ABOUT_URL,
    name: 'About DocShift',
    description: metadata.description,
    inLanguage: 'en',
    isPartOf: { '@id': SITE_ID },
    mainEntity: { '@id': PERSON_ID },
  };

  return (
    <div className="min-h-screen bg-[#c0c0c0] py-12 px-4 sm:px-8 overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} />
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#ffffff] border-2 border-[#000000] shadow-[4px_4px_0_#000000] p-6 sm:p-10">
          <h1 className="font-suisseintlcond text-3xl sm:text-4xl font-bold text-[#000000] mb-2 uppercase tracking-wider">
            About DocShift
          </h1>
          <p className="font-suisseintlmono text-[11px] text-[#444444] mb-8">
            The PDF toolkit that respects your privacy
          </p>

          <div className="font-suisseintl text-sm text-[#222222] leading-relaxed space-y-6">
            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                What is DocShift?
              </h2>
              <p>
                DocShift is a free online toolkit for working with PDF files. Merge, split, compress, convert, edit, protect, and unlock your PDFs &mdash; each file is deleted from our server immediately after your job finishes.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                How It Works
              </h2>
              <p>
                Every tool on DocShift uploads your file securely to our server, processes it, and deletes it immediately afterward. We don&apos;t keep a database of user files &mdash; nothing is logged, stored long-term, or shared.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                Why DocShift?
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Files Deleted After Use</strong> &mdash; Your file is removed from our server the moment processing finishes.</li>
                <li><strong>Completely Free</strong> &mdash; No hidden fees, no premium tiers, no watermarks.</li>
                <li><strong>No Signup</strong> &mdash; Use any tool instantly. No accounts, no emails.</li>
                <li><strong>Fast &amp; Reliable</strong> &mdash; Optimized processing engines, most files convert in seconds.</li>
                <li><strong>Clean Interface</strong> &mdash; No ads, no popups, no distractions.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                Source Available
              </h2>
              <p>
                DocShift is built with Next.js and its source code is public. You can view it or report issues on{' '}
                <a href="https://github.com/soumyachk101/PDF_Master" target="_blank" rel="noopener noreferrer" className="text-[#000000] underline font-bold hover:text-[#444444]">
                  GitHub
                </a>.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                Built By
              </h2>
              <p>
                DocShift is created and maintained by{' '}
                <a href="https://github.com/soumyachk101" target="_blank" rel="noopener noreferrer" className="text-[#000000] underline font-bold hover:text-[#444444]">
                  Soumya Chakraborty
                </a>, built around one architectural decision: every uploaded file is processed and then
                deleted from the server immediately, rather than stored &mdash; so there&apos;s nothing left
                on our servers to lose, leak, or hand over.
                For questions, feedback, or collaboration, reach out on{' '}
                <a href="https://x.com/soumyachk1" target="_blank" rel="noopener noreferrer" className="text-[#000000] underline font-bold hover:text-[#444444]">X</a>,{' '}
                <a href="https://discord.com/users/soumya.chk101" target="_blank" rel="noopener noreferrer" className="text-[#000000] underline font-bold hover:text-[#444444]">Discord</a>, or via the{' '}
                <a href="/contact" className="text-[#000000] underline font-bold hover:text-[#444444]">Contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
