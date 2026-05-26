'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { NeumorphicButton } from './ui/IndustrialComponents';

const DayosLogo = () => (
    <div className="flex items-center gap-2 select-none">
        <span className="font-suisseintlcond font-bold text-xl sm:text-2xl tracking-tight flex items-center gap-1">
            <span className="text-[#000000]">DOC</span>
            <span className="bg-[#000000] text-[#ffffff] px-2.5 py-0.5 rounded-none text-sm sm:text-base font-bold">SHIFT</span>
        </span>
    </div>
);

export default function Navbar() {
    const router = useRouter();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState('');

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        
        // Track hash change for link active status
        const handleHashChange = () => {
            setActiveHash(window.location.hash || '#tools');
        };
        handleHashChange();
        window.addEventListener('hashchange', handleHashChange);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const navLinks = [
        { name: 'Tools', path: '/#tools', id: 'tools' },
        { name: 'Features', path: '/#features', id: 'features' },
        { name: 'About', path: '/#about', id: 'about' }
    ];

    const handleNav = (path) => {
        setIsMobileMenuOpen(false);
        if (path.startsWith('/#')) {
            const id = path.substring(2);
            if (window.location.pathname === '/') {
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                setActiveHash(`#${id}`);
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
                className={`w-full transition-all duration-300 border-b border-[#000000]/10 ${
                    scrolled
                        ? 'bg-[#e5e7eb]/90 backdrop-blur-md py-2'
                        : 'bg-[#e5e7eb]/70 backdrop-blur-sm py-4'
                }`}
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-8">
                    <div className="flex items-center justify-between h-14">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0 focus:outline-none" aria-label="DocShift - Home">
                            <DayosLogo />
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-6">
                            <div className="flex items-stretch h-14 gap-1">
                                {navLinks.map((link) => {
                                    const isActive = activeHash === `#${link.id}`;
                                    
                                    // Map style reference tokens exactly:
                                    // Default link: backgroundColor=rgba(0,0,0,0) color=rgb(68,68,68) borderTopColor=rgb(68,68,68) borderRadius=0px paddingTop=0px paddingRight=16px paddingBottom=0px paddingLeft=16px
                                    // Active link: backgroundColor=rgba(0,0,0,0) color=rgb(0,0,0) borderTopColor=rgb(0,0,0) borderRadius=0px paddingTop=0px paddingRight=0px paddingBottom=0px paddingLeft=0px
                                    const linkStyle = isActive 
                                        ? {
                                            backgroundColor: 'rgba(0,0,0,0)',
                                            color: 'rgb(0,0,0)',
                                            borderTop: '2px solid rgb(0,0,0)',
                                            borderTopColor: 'rgb(0,0,0)',
                                            borderRadius: '0px',
                                            paddingTop: '18px',
                                            paddingRight: '0px',
                                            paddingBottom: '0px',
                                            paddingLeft: '0px',
                                            fontWeight: '500'
                                          }
                                        : {
                                            backgroundColor: 'rgba(0,0,0,0)',
                                            color: 'rgb(68,68,68)',
                                            borderTop: '2px solid rgb(68,68,68)',
                                            borderTopColor: 'rgb(68,68,68)',
                                            borderRadius: '0px',
                                            paddingTop: '18px',
                                            paddingRight: '16px',
                                            paddingBottom: '0px',
                                            paddingLeft: '16px',
                                            fontWeight: '400'
                                          };

                                    return (
                                        <button
                                            key={link.name}
                                            onClick={() => handleNav(link.path)}
                                            style={linkStyle}
                                            className="font-suisseintl text-xs uppercase tracking-wider transition-all duration-200 focus:outline-none h-full self-start"
                                        >
                                            {link.name}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Schedule Demo Button: Background #000000, text #ffffff, 8px border-radius, paddingRight=16px */}
                            <button
                                onClick={() => handleNav('/#tools')}
                                className="bg-[#000000] text-[#ffffff] rounded-[8px] h-10 pl-4 pr-4 font-suisseintl font-medium text-xs uppercase tracking-wider hover:bg-[#2f2f2f] active:bg-[#444444] transition-colors focus:outline-none"
                            >
                                Launch Toolkit
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="flex lg:hidden items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="w-10 h-10 border border-[#000000] bg-[#ffffff] flex items-center justify-center text-[#000000] hover:bg-[#f3f3f3] focus:outline-none"
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
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden px-4 py-4"
                    >
                        <div className="bg-[#ffffff] border border-[#000000] rounded-[24px] p-4 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => handleNav(link.path)}
                                    className="w-full text-left font-suisseintl font-medium text-sm py-3 px-4 text-[#444444] hover:bg-[#f3f3f3] hover:text-[#000000] transition-all focus:outline-none"
                                >
                                    {link.name}
                                </button>
                            ))}
                            <button
                                onClick={() => handleNav('/#tools')}
                                className="bg-[#000000] text-[#ffffff] rounded-[8px] h-11 w-full font-suisseintl font-bold text-xs uppercase tracking-wider mt-2 hover:bg-[#2f2f2f]"
                            >
                                Launch Toolkit
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
