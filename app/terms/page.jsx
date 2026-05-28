export const metadata = {
  title: 'Terms of Service',
  description: 'DocShift Terms of Service – Read the terms and conditions for using our free, browser-based PDF tools.',
  openGraph: {
    title: 'Terms of Service | DocShift',
    description: 'DocShift Terms of Service – Read the terms and conditions for using our free, browser-based PDF tools.',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#c0c0c0] py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#ffffff] border-2 border-[#000000] shadow-[4px_4px_0_#000000] p-6 sm:p-10">
          <h1 className="font-suisseintlcond text-3xl sm:text-4xl font-bold text-[#000000] mb-2 uppercase tracking-wider">
            Terms of Service
          </h1>
          <p className="font-suisseintlmono text-[11px] text-[#444444] mb-8">
            Last updated: May 28, 2026
          </p>

          <div className="font-suisseintl text-sm text-[#222222] leading-relaxed space-y-6">
            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using DocShift (the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Service. DocShift is operated by Soumya Chakraborty.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                2. Description of Service
              </h2>
              <p>
                DocShift provides free, browser-based PDF tools including but not limited to merge, split, compress, convert, edit, protect, and unlock functionalities. All processing occurs locally in the user&apos;s browser. No files are uploaded to or stored on our servers.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                3. User Responsibilities
              </h2>
              <p>By using DocShift, you agree to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Use the Service only for lawful purposes</li>
                <li>Not attempt to disrupt, overload, or compromise the Service</li>
                <li>Not use automated tools to scrape or abuse the Service</li>
                <li>Ensure you have the right to process any files you use with our tools</li>
              </ul>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                4. Intellectual Property
              </h2>
              <p>
                All content, design, logos, and code on DocShift are the property of DocShift and its creator. You retain full ownership of any files you process using our tools. We claim no rights over your documents.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                5. Disclaimer of Warranties
              </h2>
              <p>
                The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that the Service will be error-free, uninterrupted, or that the results obtained from using the tools will be accurate or reliable.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                6. Limitation of Liability
              </h2>
              <p>
                To the fullest extent permitted by law, DocShift and its operator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                7. Privacy
              </h2>
              <p>
                Your use of DocShift is also governed by our <a href="/privacy" className="text-[#000000] underline font-bold hover:text-[#444444]">Privacy Policy</a>, which describes how we handle your data.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                8. Third-Party Links
              </h2>
              <p>
                DocShift may contain links to third-party websites. We are not responsible for the content, privacy practices, or availability of external sites.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                9. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Changes take effect upon posting. Your continued use after changes constitutes acceptance of the revised Terms.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                10. Contact
              </h2>
              <p>
                For questions about these Terms, visit our <a href="/contact" className="text-[#000000] underline font-bold hover:text-[#444444]">Contact page</a> or email <strong>support@docshift.tech</strong>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
