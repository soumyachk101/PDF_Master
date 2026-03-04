'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin, Heart, ShieldCheck, Zap, Lock } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-400 py-24 border-t border-slate-900 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2 lg:col-span-1 space-y-8">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-xl group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-2xl">auto_fix_high</span>
                            </div>
                            <div className="flex flex-col">
                                <h2 className="text-2xl font-black tracking-tighter text-white">PDFMaster</h2>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">Professional</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed max-w-sm font-medium">
                            The world's most intuitive PDF engine. Professional tools to merge, split, compress, and secure your documents with enterprise-grade safety.
                        </p>
                        <div className="flex items-center gap-5 pt-2">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="p-2.5 bg-slate-900 rounded-xl hover:bg-violet-600 hover:text-white transition-all duration-300">
                                    <Icon className="size-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-black uppercase tracking-widest text-[11px] mb-8">Power Tools</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link href="/merge" className="hover:text-violet-400 transition-colors flex items-center gap-2 group"><Zap className="size-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Merge PDF</Link></li>
                            <li><Link href="/split" className="hover:text-violet-400 transition-colors flex items-center gap-2 group"><Zap className="size-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Split PDF</Link></li>
                            <li><Link href="/compress" className="hover:text-violet-400 transition-colors flex items-center gap-2 group"><Zap className="size-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" /> Compress PDF</Link></li>
                            <li><Link href="/convert" className="hover:text-violet-400 transition-colors flex items-center gap-2 group"><Zap className="size-3 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" /> PDF Converter</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-black uppercase tracking-widest text-[11px] mb-8">Platform</h3>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link href="/pricing" className="hover:text-violet-400 transition-colors">Pricing Plans</Link></li>
                            <li><Link href="/api" className="hover:text-violet-400 transition-colors">Developer API</Link></li>
                            <li><Link href="/security" className="hover:text-violet-400 transition-colors">Security Center</Link></li>
                            <li><Link href="/status" className="hover:text-violet-400 transition-colors">System Status</Link></li>
                        </ul>
                    </div>

                    <div className="bg-slate-900/50 p-8 rounded-[2rem] border border-slate-800/50 space-y-6">
                        <div className="flex items-center gap-3 text-white">
                            <ShieldCheck className="size-6 text-violet-400" />
                            <h4 className="font-black tracking-tight">Privacy Focus</h4>
                        </div>
                        <p className="text-xs leading-relaxed font-medium">
                            We never store your documents. Files are purged automatically after processing and strictly encrypted in transit.
                        </p>
                        <div className="pt-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full border border-violet-500/20">
                                GDPR Compliant
                            </span>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[11px] font-bold uppercase tracking-[0.2em]">
                        © 2026 PDFForge Technologies. All rights reserved.
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em]">
                        Made with <Heart className="size-3 text-rose-500 fill-rose-500 animate-pulse" /> for professional teams
                    </div>
                </div>
            </div>
        </footer>
    );
}
