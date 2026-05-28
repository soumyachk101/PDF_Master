'use client';

import Link from 'next/link';
import { Twitter, Github, MessageCircle } from 'lucide-react';
import { HitCounter } from '@/components/ui/IndustrialComponents';

const DayosFooterLogo = () => (
    <div className="flex items-center gap-2 select-none">
        <span className="font-suisseintlcond font-bold text-lg tracking-tight flex items-center gap-1">
            <span className="text-[#000000]">DOC</span>
            <span className="bg-[#000000] text-[#ffffff] px-2.5 py-0.5 rounded-none text-xs font-bold">SHIFT</span>
        </span>
    </div>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#e5e7eb] pt-16 pb-8 border-t border-[#000000]/10">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                    {/* Brand Column */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <Link href="/" className="inline-block focus:outline-none" aria-label="DocShift - Home">
                            <DayosFooterLogo />
                        </Link>

                        <p className="text-xs text-[#444444] font-suisseintl leading-relaxed max-w-sm">
                            Every PDF tool you'll ever need. <span className="font-bold text-[#000000]">100% Free. No limits. No signup required.</span>
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                            {[
                                { icon: Twitter, href: 'https://x.com/soumyachk1', label: 'Twitter' },
                                { icon: Github, href: 'https://github.com/soumyachk101', label: 'GitHub' },
                                { icon: MessageCircle, href: 'https://discord.com/users/soumya.chk101', label: 'Discord' }
                            ].map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 border border-[#000000] bg-[#ffffff] flex items-center justify-center text-[#000000] hover:bg-[#f3f3f3] transition-all duration-200 focus:outline-none"
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Popular Tools */}
                    <div>
                        <h3 className="font-suisseintl font-bold text-xs uppercase tracking-wider mb-4 text-[#000000] border-b border-[#000000]/10 pb-2">
                            Popular Tools
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {[
                                { name: 'Merge PDF', path: '/tool/merge-pdf' },
                                { name: 'Split PDF', path: '/tool/split-pdf' },
                                { name: 'Compress PDF', path: '/tool/compress-pdf' },
                                { name: 'PDF to Word', path: '/tool/pdf-to-word' }
                            ].map((tool) => (
                                <li key={tool.path}>
                                    <Link href={tool.path} className="inline-block text-xs text-[#444444] font-suisseintl hover:text-[#000000] hover:underline transition-all duration-200">
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* More Tools */}
                    <div>
                        <h3 className="font-suisseintl font-bold text-xs uppercase tracking-wider mb-4 text-[#000000] border-b border-[#000000]/10 pb-2">
                            More Tools
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {[
                                { name: 'JPG to PDF', path: '/tool/jpg-to-pdf' },
                                { name: 'Edit PDF', path: '/tool/edit-pdf' },
                                { name: 'Protect PDF', path: '/tool/protect-pdf' },
                                { name: 'Unlock PDF', path: '/tool/unlock-pdf' }
                            ].map((tool) => (
                                <li key={tool.path}>
                                    <Link href={tool.path} className="inline-block text-xs text-[#444444] font-suisseintl hover:text-[#000000] hover:underline transition-all duration-200">
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-suisseintl font-bold text-xs uppercase tracking-wider mb-4 text-[#000000] border-b border-[#000000]/10 pb-2">
                            Legal
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {[
                                { name: 'Privacy Policy', path: '/privacy' },
                                { name: 'Terms of Service', path: '/terms' },
                                { name: 'About Us', path: '/about' },
                                { name: 'Contact', path: '/contact' }
                            ].map((item) => (
                                <li key={item.path}>
                                    <Link href={item.path} className="inline-block text-xs text-[#444444] font-suisseintl hover:text-[#000000] hover:underline transition-all duration-200">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#000000]/10 my-6" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="font-suisseintlmono text-[11px] text-[#444444]">
                        &copy; {currentYear} <span className="font-bold text-[#000000]">DocShift</span> &middot; Secure Local Processing
                    </p>
                    <HitCounter />
                </div>
            </div>
        </footer>
    );
}
