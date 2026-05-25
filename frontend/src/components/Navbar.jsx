'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { IndustrialButton } from '@/components/ui/IndustrialComponents';

const IndustrialLogo = () => (
    <div className="flex items-center gap-3 group select-none">
        <span className="font-mono font-black text-2xl tracking-tight flex items-center gap-1.5">
            <span className="text-ink">DOC</span>
            <span className="text-accent bg-accent/10 px-2 py-0.5 rounded shadow-neu-pressed border border-accent/20">SHIFT</span>
        </span>
        <div className="flex items-center gap-1.5 bg-black/5 px-2.5 py-1 rounded-full border border-white/30 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
            <span className="led-indicator led-green" />
            <span className="text-[10px] font-mono font-bold tracking-wider text-ink-secondary">SYS_OK</span>
        </div>
    </div>
);

export default function Navbar() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Tools', path: '/#tools' },
        { name: 'Features', path: '/#features' },
        { name: 'About', path: '/#about' }
    ];

    const handleNav = (path) => {
        setIsMobileMenuOpen(false);
        if (path.startsWith('/#')) {
            const id = path.substring(2);
            if (window.location.pathname === '/') {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            } else {
                router.push(path);
            }
        } else {
            router.push(path);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-chassis/90 backdrop-blur-md shadow-neu border-b border-white/20' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between h-20 sm:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0" aria-label="DocShift - Home">
                        <IndustrialLogo />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNav(link.path)}
                                className="font-mono font-bold uppercase tracking-widest text-xs text-ink-secondary hover:text-accent transition-colors relative group py-2"
                            >
                                {link.name}
                                <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-accent transition-all group-hover:w-8 rounded-full" />
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <IndustrialButton
                            variant="primary"
                            onClick={() => handleNav('/#tools')}
                            className="text-xs tracking-wider"
                        >
                            Get Started
                        </IndustrialButton>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex lg:hidden items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2.5 rounded-lg bg-chassis border border-white/40 shadow-neu hover:shadow-neu-sharp active:shadow-neu-pressed transition-all duration-150 text-ink"
                            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="lg:hidden absolute top-full left-4 right-4 bg-chassis border border-white/40 p-6 rounded-2xl shadow-neu-float mt-2 z-50"
                    >
                        <div className="flex flex-col gap-5">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNav(link.path)}
                                    className="font-mono font-bold text-base uppercase tracking-wider text-left text-ink hover:text-accent py-2 border-b border-white/10"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <IndustrialButton
                                variant="primary"
                                className="w-full text-xs tracking-wider mt-2"
                                onClick={() => handleNav('/#tools')}
                            >
                                Get Started
                            </IndustrialButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
