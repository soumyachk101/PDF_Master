'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { NeumorphicButton, NeumorphicBadge, HitCounter, ConstructionStripe, MarqueeText } from './ui/IndustrialComponents';

const HeroSection = () => {
    const handleScrollDown = () => {
        const nextSection = document.getElementById('tools');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative w-full flex flex-col items-center pt-20 pb-16 overflow-hidden bg-[#e5e7eb]">
            {/* Construction Stripe Top */}
            <ConstructionStripe className="absolute top-0 left-0 right-0 z-20" />

            <div className="container mx-auto px-4 sm:px-8 relative z-10 max-w-5xl mt-8">
                {/* Marquee Banner */}
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full mb-12"
                >
                    <MarqueeText>
                        <span className="font-suisseintlmono text-xs font-bold uppercase tracking-wider text-[#000000]">
                            <span className="bg-[#fff100] px-1">&#9733; DOCSHIFT ONLINE TOOLKIT &#9733;</span>
                            {' '}---{' '}
                            <span className="bg-[#d1ffca] px-1">30+ FREE PDF CONVERTERS</span>
                            {' '}---{' '}
                            <span>100% PRIVATE IN-BROWSER PROCESSING</span>
                            {' '}---{' '}
                            <span className="bg-[#d1ffca] px-1">NO SIGNUP REQUIRED &#9733;</span>
                        </span>
                    </MarqueeText>
                </motion.div>

                {/* Split Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    
                    {/* Left Column: Text & CTA */}
                    <div className="lg:col-span-7 flex flex-col items-start text-left">
                        {/* System Badge */}
                        <motion.div
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="mb-6 flex items-center gap-3"
                        >
                            <NeumorphicBadge color="green" led={true}>
                                SYSTEM STATUS: ACTIVE
                            </NeumorphicBadge>
                            <span className="font-suisseintlmono text-[9px] font-bold bg-[#000000] text-white px-2 py-0.5 tracking-wider">
                                LOCAL WASM ENGINE
                            </span>
                        </motion.div>

                        {/* Bold condensed Headline: size 130px (scaled for screens) */}
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="text-4xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.2rem] font-suisseintlcond font-bold tracking-tight uppercase leading-[0.9] text-[#000000] mb-6"
                            style={{ letterSpacing: '-0.04em' }}
                        >
                            The PDF <span className="bg-[#d1ffca] px-2 text-[#000000] inline-block mt-1 sm:mt-0">toolkit</span>
                            <br />
                            built for <span className="underline decoration-2">privacy</span>.
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="text-sm sm:text-base text-[#444444] font-suisseintl mb-8 leading-relaxed max-w-xl"
                        >
                            DocShift is a high-contrast, professional-grade{' '}
                            <strong className="text-[#000000] font-semibold">in-browser PDF suite</strong>. 
                            Merge, convert, split, and protect documents with absolute security. 
                            No server uploads, zero data collection.
                        </motion.p>

                        {/* Actions */}
                        <motion.div
                            initial={{ y: 15, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8"
                        >
                            <NeumorphicButton
                                variant="primary"
                                className="px-8"
                                onClick={handleScrollDown}
                            >
                                Launch Toolkit <ArrowRight size={14} className="ml-1" />
                            </NeumorphicButton>

                            <NeumorphicButton
                                variant="secondary"
                                className="px-8"
                                onClick={handleScrollDown}
                            >
                                Browse All Tools
                            </NeumorphicButton>
                        </motion.div>
                    </div>

                    {/* Right Column: Conceptual 3D Graphic */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.35 }}
                        className="lg:col-span-5 flex justify-center w-full"
                    >
                        {/* Rounded Hero Graphic - Radius 64px as per heroElements radius token */}
                        <div className="relative w-full aspect-square max-w-[400px] bg-[#ffffff] border-2 border-[#000000] rounded-[32px] sm:rounded-[64px] overflow-hidden shadow-none flex items-center justify-center p-2">
                            <img 
                                src="/hero_graphic.png" 
                                alt="Modular 3D construction graphic suggesting construction and precision" 
                                className="w-full h-full object-cover rounded-[24px] sm:rounded-[56px]"
                            />
                        </div>
                    </motion.div>
                </div>



                {/* Visitor check */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.55 }}
                    className="mt-8 text-center"
                >
                    <HitCounter />
                </motion.div>
            </div>

            {/* Construction Stripe Bottom */}
            <ConstructionStripe className="absolute bottom-0 left-0 right-0 z-20" />
        </section>
    );
};

export default HeroSection;
