'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';

export default function Header() {
    const { user, logout } = useAuthStore();
    const [isHydrated, setIsHydrated] = useState(false);

    // Fix hydration mismatch
    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full glass shadow-sm">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-200 dark:shadow-none group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-2xl">auto_fix_high</span>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-black leading-tight tracking-tighter text-slate-900 dark:text-white">PDFMaster</h2>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-400">Professional</span>
                    </div>
                </Link>
                <nav className="hidden md:flex items-center gap-10">
                    <Link className="text-sm font-bold tracking-tight hover:text-primary transition-colors text-slate-600 dark:text-slate-400" href="/">Home</Link>
                    <Link className="text-sm font-bold tracking-tight hover:text-primary transition-colors text-slate-600 dark:text-slate-400" href="/merge">Merge</Link>
                    <Link className="text-sm font-bold tracking-tight hover:text-primary transition-colors text-slate-600 dark:text-slate-400" href="/split">Split</Link>
                    <Link className="text-sm font-bold tracking-tight hover:text-primary transition-colors text-slate-600 dark:text-slate-400" href="/compress">Compress</Link>
                    <Link className="text-sm font-bold tracking-tight hover:text-primary transition-colors text-slate-600 dark:text-slate-400" href="/pricing">Pricing</Link>
                </nav>
                <div className="flex items-center gap-4">
                    {isHydrated && user ? (
                        <>
                            <Link href="/dashboard" className="text-sm font-bold tracking-tight hover:text-primary px-4 py-2 transition-colors text-slate-700 dark:text-slate-300">
                                Dashboard
                            </Link>
                            <button
                                onClick={logout}
                                className="rounded-xl bg-slate-100 dark:bg-slate-800 px-6 py-2.5 text-sm font-black text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login" className="text-sm font-bold tracking-tight hover:text-primary px-4 py-2 transition-colors text-slate-700 dark:text-slate-300">
                                Login
                            </Link>
                            <Link href="/auth/register" className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-sm font-black text-white shadow-xl shadow-violet-200 dark:shadow-none hover:opacity-90 hover:scale-[1.02] transition-all active:scale-95">
                                Join Now
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

