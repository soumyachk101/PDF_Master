'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { BauhausButton } from '@/components/ui/BauhausComponents';

const BauhausLogo = () => (
    <div className="flex items-center gap-2 group">
        <div className="flex gap-1 items-end">
            <div className="w-4 h-4 rounded-full bg-bauhaus-red border-2 border-bauhaus-black transition-transform group-hover:scale-110" />
            <div className="w-5 h-5 bg-bauhaus-blue border-2 border-bauhaus-black transition-transform group-hover:-rotate-12" />
            <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-bauhaus-yellow relative transition-transform group-hover:translate-y-[-2px]">
                <div className="absolute top-[2px] left-[-10px] w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-bauhaus-black opacity-20" />
            </div>
        </div>
        <span className="font-display font-black text-2xl tracking-tighter uppercase">
            PDF<span className="text-bauhaus-red">Master</span>
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
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-bauhaus-white border-b-4 border-bauhaus-black' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
                <div className="flex items-center justify-between h-20 sm:h-24">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <BauhausLogo />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-12">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => handleNav(link.path)}
                                className="font-display font-bold uppercase tracking-widest text-sm hover:text-bauhaus-red transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-bauhaus-yellow transition-all group-hover:w-full" />
                            </button>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center gap-4">
                        <BauhausButton
                            variant="blue"
                            onClick={() => handleNav('/#tools')}
                        >
                            Get Started
                        </BauhausButton>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex lg:hidden items-center gap-3">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 border-2 border-bauhaus-black bg-white"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                        className="lg:hidden absolute top-full left-0 right-0 bg-bauhaus-white border-b-4 border-bauhaus-black p-8 shadow-bauhaus-lg"
                    >
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNav(link.path)}
                                    className="font-display font-black text-3xl uppercase tracking-tighter text-left hover:text-bauhaus-red"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <BauhausButton
                                variant="red"
                                className="w-full text-xl"
                                onClick={() => handleNav('/#tools')}
                            >
                                Get Started
                            </BauhausButton>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
