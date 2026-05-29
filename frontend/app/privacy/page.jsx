export const metadata = {
  title: 'Privacy Policy',
  description: 'DocShift Privacy Policy – Learn how we protect your data. All PDF processing happens locally in your browser. No files are uploaded or stored on our servers.',
  keywords: 'docshift privacy policy, pdf tool privacy, data protection, no upload pdf',
  alternates: {
    canonical: 'https://www.docshift.tech/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | DocShift',
    description: 'DocShift Privacy Policy – Learn how we protect your data. All PDF processing happens locally in your browser.',
    url: 'https://www.docshift.tech/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#c0c0c0] py-12 px-4 sm:px-8 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#ffffff] border-2 border-[#000000] shadow-[4px_4px_0_#000000] p-6 sm:p-10">
          <h1 className="font-suisseintlcond text-3xl sm:text-4xl font-bold text-[#000000] mb-2 uppercase tracking-wider">
            Privacy Policy
          </h1>
          <p className="font-suisseintlmono text-[11px] text-[#444444] mb-8">
            Last updated: May 28, 2026
          </p>

          <div className="font-suisseintl text-sm text-[#222222] leading-relaxed space-y-6">
            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                1. Introduction
              </h2>
              <p>
                Welcome to DocShift (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at <strong>docshift.tech</strong>.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                2. Information We Collect
              </h2>
              <p>
                <strong>We do not collect, upload, or store any of your PDF files or documents.</strong> All PDF processing happens entirely within your browser using client-side JavaScript. Your files never leave your device.
              </p>
              <p className="mt-2">We may collect the following non-personal information:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Anonymous usage analytics (page views, tool usage counts)</li>
                <li>Browser type and device information</li>
                <li>Referring website URLs</li>
              </ul>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                3. How We Use Your Information
              </h2>
              <p>Any collected non-personal data is used solely to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Improve our tools and user experience</li>
                <li>Monitor website performance and uptime</li>
                <li>Understand which tools are most helpful to users</li>
              </ul>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                4. Cookies and Tracking
              </h2>
              <p>
                We use Vercel Speed Insights for anonymous performance monitoring. We do not use advertising cookies or third-party trackers. You may disable cookies in your browser settings at any time.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                5. Third-Party Services
              </h2>
              <p>
                We use Vercel for hosting and analytics. Their privacy policy can be found at <strong>vercel.com/privacy</strong>. We do not share any user data with third parties for marketing or advertising purposes.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                6. Data Security
              </h2>
              <p>
                Since all file processing occurs locally in your browser, your documents are never transmitted over the internet. This architecture ensures maximum privacy and security for your files.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                7. Children&apos;s Privacy
              </h2>
              <p>
                DocShift is not intended for children under 13. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of DocShift after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                9. Contact Us
              </h2>
              <p>
                If you have questions about this Privacy Policy, please reach out via our <a href="/contact" className="text-[#000000] underline font-bold hover:text-[#444444]">Contact page</a> or email us at <strong>support@docshift.tech</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
