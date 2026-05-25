'use client';

import Link from 'next/link';
import { Twitter, Github, MessageCircle } from 'lucide-react';
import { IndustrialBadge } from '@/components/ui/IndustrialComponents';

const IndustrialLogo = () => (
    <div className="flex items-center gap-3 group select-none">
        <span className="font-mono font-black text-xl tracking-tight flex items-center gap-1.5 text-white">
            <span>DOC</span>
            <span className="text-accent bg-accent/15 px-2 py-0.5 rounded shadow-inner border border-accent/20">SHIFT</span>
        </span>
        <div className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
            <span className="led-indicator led-green" />
            <span className="text-[9px] font-mono font-bold tracking-wider text-gray-400">ONLINE</span>
        </div>
    </div>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#2d3436] bg-blueprint-dark border-t border-white/10 pt-20 pb-10 overflow-hidden relative">
            {/* Ambient Backlight */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/40 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="inline-block" aria-label="DocShift - Home">
                            <IndustrialLogo />
                        </Link>

                        <p className="font-mono text-xs text-gray-400 leading-relaxed max-w-sm">
                            Every PDF tool you'll ever need. <span className="text-white font-extrabold">100% Free. No limits. No signup required.</span> We believe essential document utilities should be accessible, secure, and beautiful to use.
                        </p>

                        {/* Tactile Dark Buttons for Social */}
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Twitter, href: 'https://x.com/soumyachk1', label: 'Follow us on Twitter' },
                                { icon: Github, href: 'https://github.com/soumyachk101', label: 'View our GitHub' },
                                { icon: MessageCircle, href: 'https://discord.com/users/soumya.chk101', label: 'Join us on Discord' }
                            ].map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2d3436] border border-white/10 shadow-[4px_4px_8px_#1e2424,-4px_-4px_8px_#3c4448] text-gray-400 hover:text-white hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_2px_2px_4px_#1e2424,inset_-2px_-2px_4px_#3c4448] transition-all duration-150"
                                    >
                                        <Icon size={18} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tools Columns */}
                    <div className="lg:col-span-3">
                        <h3 className="font-mono font-extrabold text-xs uppercase tracking-widest mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            Popular Tools
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {[
                                { name: 'Merge PDF', path: '/tool/merge-pdf' },
                                { name: 'Split PDF', path: '/tool/split-pdf' },
                                { name: 'Compress PDF', path: '/tool/compress-pdf' },
                                { name: 'PDF to Word', path: '/tool/pdf-to-word' }
                            ].map((tool) => (
                                <li key={tool.path}>
                                    <Link href={tool.path} className="font-mono text-xs tracking-wider text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-accent transition-colors" />
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="font-mono font-extrabold text-xs uppercase tracking-widest mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            More Tools
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {[
                                { name: 'JPG to PDF', path: '/tool/jpg-to-pdf' },
                                { name: 'Edit PDF', path: '/tool/edit-pdf' },
                                { name: 'Protect PDF', path: '/tool/protect-pdf' },
                                { name: 'Unlock PDF', path: '/tool/unlock-pdf' }
                            ].map((tool) => (
                                <li key={tool.path}>
                                    <Link href={tool.path} className="font-mono text-xs tracking-wider text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-blue-500 transition-colors" />
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="lg:col-span-2">
                        <h3 className="font-mono font-extrabold text-xs uppercase tracking-widest mb-6 text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
                            Legal
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {['Privacy Policy', 'Terms of Service', 'About Us', 'Contact'].map((item, i) => (
                                <li key={i}>
                                    <Link href="/" className="font-mono text-xs tracking-wider text-gray-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-yellow-500 transition-colors" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="font-mono text-xs text-gray-500">
                        © {currentYear} <span className="text-white font-extrabold">DocShift</span> · Local File Processing Node
                    </p>

                    <IndustrialBadge color="red" led={true} className="bg-black/20 border border-accent/30 text-accent text-[10px]">
                        ALWAYS FREE · 100% PRIVATE
                    </IndustrialBadge>
                </div>
            </div>
        </footer>
    );
}
