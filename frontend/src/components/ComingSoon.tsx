'use client';

import Link from 'next/link';
import { Sparkles, ArrowLeft, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ComingSoonPage({ title = "Tool" }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse" />

            <div className="relative mb-12 group">
                <div className="absolute inset-0 bg-violet-600/30 rounded-[3rem] blur-2xl group-hover:blur-3xl transition-all duration-500" />
                <div className="size-32 glass border border-white/20 dark:border-slate-800 rounded-[3rem] flex items-center justify-center shadow-3xl text-violet-600 dark:text-violet-400 relative z-10 hover:scale-105 transition-transform duration-500">
                    <Construction className="size-16" />
                </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-2xl border border-violet-500/30 bg-violet-500/10 px-5 py-2 text-xs font-black text-violet-600 dark:text-violet-400 mb-8 uppercase tracking-[0.2em] relative z-20">
                <Sparkles className="w-4 h-4 fill-violet-600 dark:fill-violet-400" />
                Neural Engineering in Progress
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-tight relative z-20">
                The <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600">{title}</span> <br className="hidden md:block" /> is launching soon.
            </h1>

            <p className="max-w-xl text-xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-12 relative z-20">
                We're currently calibrating our processing engines and hardening the security parameters for this professional tool.
            </p>

            <div className="flex flex-wrap justify-center gap-6 relative z-20">
                <Button size="lg" className="rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-black px-10 h-16 shadow-2xl shadow-violet-200 dark:shadow-none transition-all hover:scale-[1.05] active:scale-95 text-lg">
                    Join Private Beta
                </Button>
                <Button size="lg" variant="outline" className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl px-10 h-16 font-black hover:bg-slate-50 dark:hover:bg-slate-900 transition-all hover:scale-[1.05] active:scale-95 text-lg" asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-3 size-5 text-violet-600" />
                        Return to Hub
                    </Link>
                </Button>
            </div>

            <div className="mt-24 flex items-center gap-8 text-slate-400 grayscale opacity-30 relative z-20">
                <div className="h-4 w-20 bg-slate-300 dark:bg-slate-700 rounded-full" />
                <div className="h-4 w-32 bg-slate-300 dark:bg-slate-700 rounded-full" />
                <div className="h-4 w-24 bg-slate-300 dark:bg-slate-700 rounded-full" />
            </div>
        </div>
    );
}
