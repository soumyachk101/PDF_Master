import { Twitter, Github, MessageCircle, Mail } from 'lucide-react';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with DocShift – Reach out for support, feedback, or collaboration.',
  keywords: 'contact docshift, pdf tool support, feedback, bug report',
  alternates: {
    canonical: 'https://www.docshift.tech/contact',
  },
  openGraph: {
    title: 'Contact | DocShift',
    description: 'Get in touch with DocShift – Reach out for support, feedback, or collaboration.',
    url: 'https://www.docshift.tech/contact',
  },
};

export default function ContactPage() {
  const links = [
    { icon: Mail, label: 'Email', href: 'mailto:support@docshift.tech', display: 'support@docshift.tech' },
    { icon: Twitter, label: 'Twitter / X', href: 'https://x.com/soumyachk1', display: '@soumyachk1' },
    { icon: Github, label: 'GitHub', href: 'https://github.com/soumyachk101', display: 'github.com/soumyachk101' },
    { icon: MessageCircle, label: 'Discord', href: 'https://discord.com/users/soumya.chk101', display: 'soumya.chk101' },
  ];

  return (
    <div className="min-h-screen bg-[#c0c0c0] py-12 px-4 sm:px-8 overflow-x-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#ffffff] border-2 border-[#000000] shadow-[4px_4px_0_#000000] p-6 sm:p-10">
          <h1 className="font-suisseintlcond text-3xl sm:text-4xl font-bold text-[#000000] mb-2 uppercase tracking-wider">
            Contact
          </h1>
          <p className="font-suisseintlmono text-[11px] text-[#444444] mb-8">
            We&apos;d love to hear from you
          </p>

          <div className="font-suisseintl text-sm text-[#222222] leading-relaxed space-y-6">
            <p>
              Have a question, suggestion, or found a bug? Reach out through any of the channels below and we&apos;ll get back to you as soon as possible.
            </p>

            <div className="space-y-4">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-4 p-4 border-2 border-[#000000] bg-[#f3f3f3] hover:bg-[#e5e7eb] transition-colors duration-200 group"
                  >
                    <div className="w-10 h-10 border border-[#000000] bg-[#ffffff] flex items-center justify-center text-[#000000] shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-[#000000] text-sm">{link.label}</p>
                      <p className="text-xs text-[#444444] group-hover:text-[#000000] transition-colors">{link.display}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                Response Time
              </h2>
              <p>
                We typically respond within 24&ndash;48 hours. For urgent issues, reach out on Discord for the fastest response.
              </p>
            </section>

            <section>
              <h2 className="font-suisseintlcond text-lg font-bold text-[#000000] uppercase tracking-wider mb-2">
                Feature Requests &amp; Bug Reports
              </h2>
              <p>
                Found a bug or have an idea for a new tool? Please open an issue on{' '}
                <a href="https://github.com/soumyachk101" target="_blank" rel="noopener noreferrer" className="text-[#000000] underline font-bold hover:text-[#444444]">
                  GitHub
                </a>{' '}
                so we can track and prioritize it.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
