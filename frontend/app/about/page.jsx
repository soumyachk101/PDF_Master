export const metadata = {
  title: 'About Us',
  description: 'Learn about DocShift – Free browser-based PDF tools built for privacy. No uploads, no signups, 100% local processing.',
  openGraph: {
    title: 'About Us | DocShift',
    description: 'Learn about DocShift – Free browser-based PDF tools built for privacy.',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#c0c0c0] py-12 px-4 sm:px-8">
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
                DocShift is a free, browser-based toolkit for working with PDF files. Merge, split, compress, convert, edit, protect, and unlock your PDFs &mdash; all without uploading a single byte to any server.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                How It Works
              </h2>
              <p>
                Every tool on DocShift runs entirely in your browser using JavaScript and WebAssembly. Your files are processed locally on your device and are never sent over the internet. When you close the tab, your data is gone.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                Why DocShift?
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>100% Private</strong> &mdash; No file uploads. All processing is local.</li>
                <li><strong>Completely Free</strong> &mdash; No hidden fees, no premium tiers, no watermarks.</li>
                <li><strong>No Signup</strong> &mdash; Use any tool instantly. No accounts, no emails.</li>
                <li><strong>Fast &amp; Reliable</strong> &mdash; Modern browser APIs for quick processing.</li>
                <li><strong>Clean Interface</strong> &mdash; No ads, no popups, no distractions.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                Open Source
              </h2>
              <p>
                DocShift is built with Next.js and is open source. You can view the source code, report issues, or contribute on{' '}
                <a href="https://github.com/soumyachk101" target="_blank" rel="noopener noreferrer" className="text-[#000000] underline font-bold hover:text-[#444444]">
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
                </a>.
                For questions, feedback, or collaboration, visit the{' '}
                <a href="/contact" className="text-[#000000] underline font-bold hover:text-[#444444]">Contact page</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
