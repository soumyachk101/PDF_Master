'use client';

import Link from 'next/link';
import { Twitter, Github, MessageCircle } from 'lucide-react';
import { HitCounter, GrooveHr } from '@/components/ui/IndustrialComponents';

const NeumorphicLogo = () => (
    <div className="flex items-center gap-2 select-none">
        <span className="font-display font-black text-xl tracking-tight flex items-center gap-1.5">
            <span className="text-[#2A3A31]">DOC</span>
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#9F67FF] text-white px-2.5 py-0.5 rounded-xl shadow-soft-extruded-sm text-xs font-extrabold">SHIFT</span>
        </span>
    </div>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#E4EDE8] pt-16 pb-8 overflow-hidden relative shadow-[inset_0_12px_24px_rgba(189,201,193,0.65)] border-t border-white/20">
            <div className="max-w-5xl mx-auto px-4 sm:px-8 relative z-10">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

                    {/* Brand Column */}
                    <div className="lg:col-span-1 flex flex-col gap-4">
                        <Link href="/" className="inline-block focus:outline-none" aria-label="DocShift - Home">
                            <NeumorphicLogo />
                        </Link>

                        <p className="text-xs text-[#55685C] leading-relaxed max-w-sm">
                            Every PDF tool you'll ever need. <span className="font-bold text-[#2A3A31]">100% Free. No limits. No signup required.</span>
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
                                        className="w-10 h-10 rounded-xl bg-[#E4EDE8] shadow-soft-extruded-sm flex items-center justify-center text-[#55685C] hover:text-[#7C3AED] hover:-translate-y-[1px] hover:shadow-soft-extruded transition-all duration-200 active:translate-y-[0.5px] active:shadow-soft-inset-sm focus:outline-none focus:text-[#7C3AED]"
                                    >
                                        <Icon size={16} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Popular Tools */}
                    <div>
                        <h3 className="font-display font-bold text-xs uppercase tracking-wider mb-4 text-[#2A3A31] border-b border-[#D5DFD9] pb-2">
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
                                    <Link href={tool.path} className="inline-block text-xs text-[#55685C] hover:text-[#7C3AED] hover:translate-x-1 hover:underline transition-all duration-200">
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* More Tools */}
                    <div>
                        <h3 className="font-display font-bold text-xs uppercase tracking-wider mb-4 text-[#2A3A31] border-b border-[#D5DFD9] pb-2">
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
                                    <Link href={tool.path} className="inline-block text-xs text-[#55685C] hover:text-[#7C3AED] hover:translate-x-1 hover:underline transition-all duration-200">
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-display font-bold text-xs uppercase tracking-wider mb-4 text-[#2A3A31] border-b border-[#D5DFD9] pb-2">
                            Legal
                        </h3>
                        <ul className="flex flex-col gap-2.5">
                            {['Privacy Policy', 'Terms of Service', 'About Us', 'Contact'].map((item, i) => (
                                <li key={i}>
                                    <Link href="/" className="inline-block text-xs text-[#55685C] hover:text-[#7C3AED] hover:translate-x-1 hover:underline transition-all duration-200">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="soft-divider my-6" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <p className="font-mono text-[11px] text-[#55685C]">
                        &copy; {currentYear} <span className="font-bold text-[#2A3A31]">DocShift</span> &middot; Secure Local Processing
                    </p>
                    <HitCounter />
                </div>
            </div>
        </footer>
    );
}
