'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { IndustrialButton, IndustrialBadge } from './ui/IndustrialComponents';

const HeroSection = () => {
    const handleScrollDown = () => {
        const nextSection = document.getElementById('tools');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-center pt-24 pb-16 overflow-hidden bg-chassis bg-blueprint">
            {/* Ambient Radial Lighting Overlay */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/40 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[100px] rounded-full" />
            </div>

            {/* ── CONTENT ── */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

                    {/* 1. Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-6"
                    >
                        <IndustrialBadge color="green" led={true}>
                            ⚡ ENGINE STATUS: ONLINE · 30+ FREE TOOLS
                        </IndustrialBadge>
                    </motion.div>

                    {/* 2. Headline */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[0.95] mb-6 text-ink drop-shadow-[0_1px_1px_rgba(255,255,255,1)]"
                    >
                        The PDF <span className="text-accent">Toolkit</span><br />
                        Built for <span className="text-gradient">Performance</span>.
                    </motion.h1>

                    {/* 3. Subtitle */}
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-base sm:text-lg md:text-xl text-ink-secondary mb-10 max-w-3xl font-medium leading-relaxed px-4"
                    >
                        DocShift acts as a high-speed browser-based processor.
                        Your files never leave your computer: Merge, convert, and compress PDFs with
                        <span className="font-semibold text-accent border-b border-accent/30 mx-1">100% privacy</span>
                        and
                        <span className="font-semibold text-ink border-b border-white/60 mx-1">zero installation</span>.
                    </motion.p>

                    {/* 4. Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-16 w-full sm:w-auto px-4"
                    >
                        <IndustrialButton
                            variant="primary"
                            className="text-sm px-8 py-4 w-full sm:w-auto"
                            onClick={handleScrollDown}
                        >
                            Launch Toolkit <ArrowRight size={18} />
                        </IndustrialButton>

                        <IndustrialButton
                            variant="secondary"
                            className="text-sm px-8 py-4 w-full sm:w-auto"
                            onClick={handleScrollDown}
                        >
                            Hardware Specs
                        </IndustrialButton>
                    </motion.div>

                    {/* 5. Mechanical Dashboard Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="w-full max-w-4xl bg-chassis border border-white/40 shadow-neu-card rounded-2xl p-6 relative overflow-hidden"
                    >
                        {/* Screws and vent slots details */}
                        <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-chassis shadow-neu-pressed flex items-center justify-center pointer-events-none z-10">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                                <div className="w-1.5 h-[1.5px] bg-gray-600 rotate-45 transform"></div>
                            </div>
                        </div>
                        <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-chassis shadow-neu-pressed flex items-center justify-center pointer-events-none z-10">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                                <div className="w-1.5 h-[1.5px] bg-gray-600 rotate-12 transform"></div>
                            </div>
                        </div>
                        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full bg-chassis shadow-neu-pressed flex items-center justify-center pointer-events-none z-10">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                                <div className="w-1.5 h-[1.5px] bg-gray-600 -rotate-45 transform"></div>
                            </div>
                        </div>
                        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-chassis shadow-neu-pressed flex items-center justify-center pointer-events-none z-10">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                                <div className="w-1.5 h-[1.5px] bg-gray-600 rotate-90 transform"></div>
                            </div>
                        </div>

                        {/* Top ventilation grid mockup */}
                        <div className="flex justify-center gap-1.5 mb-6">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="w-6 h-1 rounded-full bg-black/25 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)] border-t border-l border-white/50" />
                            ))}
                        </div>

                        {/* Dashboard Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                            {[
                                { 
                                    text: "100% Client-Side", 
                                    sub: "No uploads, all locally run", 
                                    icon: <ShieldCheck size={20} className="text-accent" /> 
                                },
                                { 
                                    text: "Turbo Processing", 
                                    sub: "Sub-second load & convert", 
                                    icon: <Zap size={20} className="text-emerald-500" /> 
                                },
                                { 
                                    text: "Universal Platform", 
                                    sub: "Desktop, mobile, tablet browser", 
                                    icon: <Globe size={20} className="text-blue-500" /> 
                                },
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center p-4 bg-chassis rounded-xl shadow-neu-pressed border border-white/20">
                                    <div className="w-10 h-10 rounded-full bg-chassis shadow-neu flex items-center justify-center border border-white/50 mb-3">
                                        {item.icon}
                                    </div>
                                    <span className="font-mono font-extrabold uppercase text-xs sm:text-sm tracking-wider text-ink">
                                        {item.text}
                                    </span>
                                    <span className="font-mono text-[10px] text-ink-secondary mt-1">
                                        {item.sub}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Bottom LED indicators */}
                        <div className="flex items-center justify-between border-t border-white/10 mt-6 pt-4 font-mono text-[9px] text-ink-secondary">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5">
                                    <span className="led-indicator led-green" />
                                    <span>CORE: COMPILING</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="led-indicator led-green" />
                                    <span>RAM: BUFFERED</span>
                                </div>
                            </div>
                            <span className="hidden sm:inline">SERIAL NO: DS-2026-V1.0</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
