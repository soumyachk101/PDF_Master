'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Globe, Cpu, Laptop, Database } from 'lucide-react';
import { NeumorphicButton, NeumorphicBadge, ColorSquares, HitCounter, ConstructionStripe, MarqueeText } from './ui/IndustrialComponents';

const HeroSection = () => {
    const handleScrollDown = () => {
        const nextSection = document.getElementById('tools');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full flex flex-col items-center pt-24 pb-16 overflow-hidden bg-[#E4EDE8]">
            {/* Construction Stripe Top */}
            <ConstructionStripe className="absolute top-0 left-0 right-0 z-20" />

            {/* Ambient Background Neumorphic Art */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div 
                    animate={{ 
                        y: [0, -15, 0],
                        rotate: [0, 45, 0] 
                    }}
                    transition={{ 
                        duration: 10, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="absolute -right-20 top-20 w-80 h-80 rounded-full bg-[#E4EDE8] shadow-soft-extruded flex items-center justify-center opacity-40"
                >
                    <div className="w-60 h-60 rounded-full bg-[#E4EDE8] shadow-soft-inset flex items-center justify-center">
                        <div className="w-40 h-40 rounded-full bg-[#E4EDE8] shadow-soft-extruded-sm" />
                    </div>
                </motion.div>
                
                <motion.div 
                    animate={{ 
                        y: [0, 20, 0],
                        rotate: [0, -30, 0] 
                    }}
                    transition={{ 
                        duration: 12, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                    }}
                    className="absolute -left-20 bottom-10 w-96 h-96 rounded-full bg-[#E4EDE8] shadow-soft-inset flex items-center justify-center opacity-30"
                >
                    <div className="w-72 h-72 rounded-full bg-[#E4EDE8] shadow-soft-extruded flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full bg-[#E4EDE8] shadow-soft-inset-sm" />
                    </div>
                </motion.div>
            </div>

            {/* ── CONTENT ── */}
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">

                    {/* 1. Marquee Banner */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="w-full mb-8 max-w-3xl"
                    >
                        <MarqueeText>
                            <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#55685C]">
                                <span className="text-[#7C3AED]">&#9733; DOCSHIFT ONLINE TOOLKIT &#9733;</span>
                                {' '}---{' '}
                                <span className="text-[#0D9488]">30+ FREE PDF CONVERTERS</span>
                                {' '}---{' '}
                                <span className="text-[#7C3AED]">100% PRIVATE IN-BROWSER PROCESSING</span>
                                {' '}---{' '}
                                <span className="text-[#0D9488]">&#9733; NO SIGNUP OR INSTALLATION REQUIRED &#9733;</span>
                            </span>
                        </MarqueeText>
                    </motion.div>

                    {/* 2. Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mb-6 flex items-center gap-3"
                    >
                        <NeumorphicBadge color="green" led={true}>
                            SYSTEM STATUS: ONLINE
                        </NeumorphicBadge>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-mono font-extrabold bg-[#7C3AED] text-white tracking-widest animate-pulse">
                            NEW
                        </span>
                    </motion.div>

                    {/* 3. Headline */}
                    <motion.h1
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="text-4xl sm:text-6xl md:text-[5.5rem] font-display font-extrabold tracking-tight leading-[0.95] mb-6 text-[#2A3A31]"
                    >
                        THE PDF <span className="bg-gradient-to-r from-[#7C3AED] to-[#9F67FF] bg-clip-text text-transparent">TOOLKIT</span>
                        <br />
                        BUILT FOR <span className="text-[#7C3AED]">PRIVACY</span>.
                    </motion.h1>

                    {/* 4. Subtitle */}
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="text-sm sm:text-base md:text-lg text-[#55685C] mb-10 max-w-3xl font-body leading-relaxed px-4"
                    >
                        DocShift is your all-in-one{' '}
                        <span className="font-bold text-[#7C3AED]">client-side PDF processor</span>.
                        Merge, convert, and compress PDFs with{' '}
                        <span className="font-bold text-[#0D9488]">100% privacy</span>
                        {' '}and{' '}
                        <span className="font-bold">zero data collection</span>.
                    </motion.p>

                    {/* 5. Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto px-4"
                    >
                        <NeumorphicButton
                            variant="primary"
                            className="px-8 py-3.5 w-full sm:w-auto"
                            onClick={handleScrollDown}
                        >
                            Launch Toolkit <ArrowRight size={16} className="ml-1" />
                        </NeumorphicButton>

                        <NeumorphicButton
                            variant="secondary"
                            className="px-8 py-3.5 w-full sm:w-auto"
                            onClick={handleScrollDown}
                        >
                            Browse All Tools
                        </NeumorphicButton>
                    </motion.div>

                    {/* 6. Dashboard Panel - Neumorphic Style */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="w-full max-w-4xl px-4"
                    >
                        <div className="bg-[#E4EDE8] rounded-[32px] shadow-soft-extruded p-6 sm:p-8 border border-white/20">
                            {/* Dashboard Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 rounded-full bg-[#E11D48] shadow-soft-inset-sm" />
                                    <span className="w-3 h-3 rounded-full bg-amber-500 shadow-soft-inset-sm" />
                                    <span className="w-3 h-3 rounded-full bg-[#0D9488] shadow-soft-inset-sm" />
                                    <span className="font-mono text-xs font-extrabold text-[#2A3A31] ml-2 tracking-wider">DOCSHIFT ENGINE STATS</span>
                                </div>
                                <span className="font-mono text-[10px] text-[#55685C]/60 tracking-wider">v2.0 ACTIVE</span>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                                {[
                                    { text: "100% Client-Side", sub: "WebAssembly, zero uploads", icon: <ShieldCheck size={20} className="text-[#0D9488]" /> },
                                    { text: "Instant Compile", sub: "Sub-second file creation", icon: <Zap size={20} className="text-[#7C3AED]" /> },
                                    { text: "Responsive Engine", sub: "Desktop, mobile, tablet", icon: <Globe size={20} className="text-[#7C3AED]" /> },
                                ].map((item, index) => (
                                    <div key={index} className="rounded-2xl bg-[#E4EDE8] shadow-soft-inset p-5 flex flex-col items-center text-center">
                                        <div className="w-10 h-10 rounded-xl bg-[#E4EDE8] shadow-soft-extruded-sm flex items-center justify-center mb-3">
                                            {item.icon}
                                        </div>
                                        <span className="font-display font-extrabold text-xs uppercase tracking-wider text-[#2A3A31]">
                                            {item.text}
                                        </span>
                                        <span className="font-body text-[10px] text-[#55685C] mt-1">
                                            {item.sub}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Status Bar */}
                            <div className="rounded-2xl bg-[#E4EDE8] shadow-soft-inset-sm p-3.5 flex items-center justify-between">
                                <div className="flex items-center gap-4 font-mono text-[10px] text-[#55685C] font-semibold">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488] inline-block animate-pulse" />
                                        ENGINE: SECURE
                                    </span>
                                    <span className="text-[#D5DFD9]">|</span>
                                    <span>30+ LIBRARIES LOADED</span>
                                </div>
                                <span className="font-mono text-[10px] text-[#55685C]/70 hidden sm:inline tracking-wider">
                                    SANDBOX: SECURE
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 7. Visitor Count / Verification details */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                        className="mt-8"
                    >
                        <HitCounter />
                    </motion.div>
                </div>
            </div>

            {/* Construction Stripe Bottom */}
            <ConstructionStripe className="absolute bottom-0 left-0 right-0 z-20" />
        </section>
    );
};

export default HeroSection;
