'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NeumorphicButton } from './ui/IndustrialComponents';

const NeumorphicLogo = () => (
    <div className="flex items-center gap-2 select-none">
        <span className="font-display font-black text-xl sm:text-2xl tracking-tight flex items-center gap-1.5">
            <span className="text-[#2A3A31]">DOC</span>
            <span className="bg-gradient-to-r from-[#7C3AED] to-[#9F67FF] text-white px-2.5 py-0.5 rounded-xl shadow-soft-extruded-sm text-sm sm:text-base font-extrabold">SHIFT</span>
        </span>
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
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            <div
                className={`w-full transition-all duration-300 ${
                    scrolled
                        ? 'bg-[#E4EDE8]/90 backdrop-blur-md shadow-soft-extruded py-2'
                        : 'bg-[#E4EDE8]/70 backdrop-blur-sm py-4'
                }`}
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-8">
                    <div className="flex items-center justify-between h-14">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 focus:outline-none" aria-label="DocShift - Home">
                            <NeumorphicLogo />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNav(link.path)}
                                    className="text-[#2A3A31] font-semibold text-xs uppercase tracking-wider hover:text-[#7C3AED] transition-colors duration-200 py-1 focus:outline-none focus:text-[#7C3AED]"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <NeumorphicButton
                                onClick={() => handleNav('/#tools')}
                                variant="primary"
                                className="h-9 px-5 text-[10px] font-bold tracking-wider"
                            >
                                Get Started
                            </NeumorphicButton>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="flex lg:hidden items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-10 h-10 rounded-xl bg-[#E4EDE8] shadow-soft-extruded-sm flex items-center justify-center text-[#2A3A31] hover:text-[#7C3AED] active:shadow-soft-inset-sm focus:outline-none"
                                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                            >
                                {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                            </button>
                        </div>
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
                        transition={{ duration: 0.2 }}
                        className="lg:hidden px-4 py-4"
                    >
                        <div className="bg-[#E4EDE8] rounded-[24px] shadow-soft-extruded p-4 border border-white/20 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNav(link.path)}
                                    className="w-full text-left font-semibold text-sm py-3 px-4 rounded-xl text-[#2A3A31] hover:bg-[#D5DFD9]/50 hover:text-[#7C3AED] transition-all focus:outline-none"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <NeumorphicButton
                                onClick={() => handleNav('/#tools')}
                                variant="primary"
                                className="w-full text-center text-xs mt-2"
                            >
                                Get Started
                            </NeumorphicButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
