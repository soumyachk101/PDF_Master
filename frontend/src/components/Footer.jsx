'use client';

import Link from 'next/link';

import { Twitter, Github, MessageCircle } from 'lucide-react';
import { BauhausSection } from '@/components/ui/BauhausComponents';

const BauhausLogo = () => (
    <div className="flex items-center gap-2 group">
        <div className="flex gap-1 items-end">
            <div className="w-4 h-4 rounded-full bg-bauhaus-red border-2 border-bauhaus-black" />
            <div className="w-5 h-5 bg-bauhaus-blue border-2 border-bauhaus-black" />
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-bauhaus-yellow relative">
                <div className="absolute top-[2px] left-[-10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-bauhaus-black opacity-20" />
            </div>
        </div>
        <span className="font-display font-black text-xl tracking-tighter uppercase">
            Doc<span className="text-bauhaus-red">Shift</span>
        </span>
    </div>
);

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-bauhaus-white border-t-8 border-bauhaus-black pt-20 pb-10 overflow-hidden relative">
            {/* Background Decorative Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-bauhaus-yellow opacity-10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-bauhaus-red opacity-5 -rotate-12 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">

                    {/* Brand Column */}
                    <div className="lg:col-span-4 flex flex-col gap-6">
                        <Link href="/" className="inline-block" aria-label="DocShift - Home">
                            <BauhausLogo />
                        </Link>

                        <p className="font-display font-medium text-bauhaus-black/70 leading-relaxed max-w-sm">
                            Every PDF tool you'll ever need. <span className="font-black text-bauhaus-black">100% Free. No limits. No signup required.</span> We believe essential document utilities should be accessible, secure, and beautiful to use.
                        </p>

                        <div className="flex items-center gap-3">
                            {[
                                { icon: Twitter, href: 'https://x.com/soumyachk1', color: 'hover:bg-bauhaus-blue', label: 'Follow us on Twitter' },
                                { icon: Github, href: 'https://github.com/soumyachk101', color: 'hover:bg-bauhaus-yellow', label: 'View our GitHub' },
                                { icon: MessageCircle, href: 'https://discord.com/users/soumya.chk101', color: 'hover:bg-bauhaus-red', label: 'Join us on Discord' }
                            ].map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.label}
                                        className={`w-12 h-12 flex items-center justify-center border-4 border-bauhaus-black bg-white shadow-bauhaus hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all ${social.color}`}
                                    >
                                        <Icon size={20} />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Tools Columns */}
                    <div className="lg:col-span-3">
                        <h3 className="font-display font-black text-xl uppercase tracking-tighter mb-8 border-b-4 border-bauhaus-red inline-block">
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
                                    <Link href={tool.path} className="font-display font-bold uppercase text-sm tracking-widest hover:text-bauhaus-red transition-colors flex items-center gap-2 group">
                                        <span className="w-2 h-2 bg-bauhaus-black group-hover:bg-bauhaus-red transition-colors" />
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h3 className="font-display font-black text-xl uppercase tracking-tighter mb-8 border-b-4 border-bauhaus-blue inline-block">
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
                                    <Link href={tool.path} className="font-display font-bold uppercase text-sm tracking-widest hover:text-bauhaus-blue transition-colors flex items-center gap-2 group">
                                        <span className="w-2 h-2 bg-bauhaus-black group-hover:bg-bauhaus-blue transition-colors" />
                                        {tool.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal Column */}
                    <div className="lg:col-span-2">
                        <h3 className="font-display font-black text-xl uppercase tracking-tighter mb-8 border-b-4 border-bauhaus-yellow inline-block">
                            Legal
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {['Privacy Policy', 'Terms of Service', 'About Us', 'Contact'].map((item, i) => (
                                <li key={i}>
                                    <Link href="/" className="font-display font-bold uppercase text-sm tracking-widest hover:text-bauhaus-yellow transition-colors flex items-center gap-2 group">
                                        <span className="w-2 h-2 bg-bauhaus-black group-hover:bg-bauhaus-yellow transition-colors" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t-4 border-bauhaus-black flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="font-display font-bold uppercase text-sm tracking-widest">
                        © {currentYear} <span className="font-black text-bauhaus-red">DocShift</span>. All rights reserved.
                    </p>

                    <div className="px-6 py-2 border-4 border-bauhaus-black bg-bauhaus-yellow text-bauhaus-black font-display font-black uppercase text-sm tracking-widest shadow-bauhaus">
                        Always Free · No Signup
                    </div>
                </div>
            </div>
        </footer>
    );
}
