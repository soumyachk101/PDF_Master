'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import { BauhausButton, BauhausBadge } from './ui/BauhausComponents';

const HeroSection = () => {
    const handleScrollDown = () => {
        const nextSection = document.getElementById('tools');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="relative min-h-screen w-full flex items-center pt-24 pb-16 overflow-hidden bg-white">
            {/* ── BAUHAUS GEOMETRIC BACKGROUND ── */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Vertical Stripe */}
                <div className="absolute left-1/4 top-0 w-1 h-full bg-bauhaus-black opacity-10" />
                
                {/* Large Red Circle */}
                <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute -top-20 -left-20 w-80 h-80 bg-bauhaus-red rounded-full opacity-20" 
                />
                
                {/* Blue Square */}
                <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute top-1/4 right-[-5%] w-64 h-64 bg-bauhaus-blue opacity-10 rotate-12" 
                />
                
                {/* Yellow Rectangle */}
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="absolute bottom-10 left-[10%] w-48 h-12 bg-bauhaus-yellow border-2 border-bauhaus-black shadow-bauhaus" 
                />

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" 
                    style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
                />
            </div>

            {/* ── CONTENT ── */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                    
                    {/* 1. Badge */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <BauhausBadge color="blue" className="mb-8 scale-110">
                            ⚡ 30+ FREE PDF TOOLS
                        </BauhausBadge>
                    </motion.div>

                    {/* 2. Headline */}
                    <motion.h1 
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-bauhaus-black"
                    >
                        The PDF <span className="text-bauhaus-red">Toolkit</span><br />
                        <span className="relative">
                            Built for <span className="text-bauhaus-blue">Speed</span>.
                            <div className="absolute -bottom-2 left-0 w-full h-4 bg-bauhaus-yellow -z-10" />
                        </span>
                    </motion.h1>

                    {/* 3. Subtitle */}
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl md:text-2xl text-gray-700 mb-12 max-w-3xl font-medium leading-relaxed"
                    >
                        DOC-SHIFT is your focused PDF toolbox. 
                        Merge, split, compress, and convert in your browser — 
                        <span className="font-bold border-b-4 border-bauhaus-red mx-1">no signups</span>, 
                        <span className="font-bold border-b-4 border-bauhaus-blue mx-1">no limits</span>.
                    </motion.p>

                    {/* 4. Buttons */}
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:row gap-6 mb-16 w-full sm:w-auto"
                    >
                        <div className="flex flex-wrap justify-center gap-6">
                            <BauhausButton 
                                variant="red" 
                                className="text-lg px-10 py-4 flex items-center gap-2"
                                onClick={handleScrollDown}
                            >
                                Try Free Tools <ArrowRight size={20} />
                            </BauhausButton>

                            <BauhausButton 
                                variant="outline" 
                                className="text-lg px-10 py-4"
                                onClick={handleScrollDown}
                            >
                                See All Tools
                            </BauhausButton>
                        </div>
                    </motion.div>

                    {/* 5. Trust Badges */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-16 pt-8 border-t-2 border-bauhaus-black w-full"
                    >
                        {[
                            { text: "No files stored", icon: <ShieldCheck size={24} className="text-bauhaus-red" /> },
                            { text: "Instant processing", icon: <Zap size={24} className="text-bauhaus-blue" /> },
                            { text: "Works everywhere", icon: <Globe size={24} className="text-bauhaus-yellow bg-black rounded-full p-0.5" /> },
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-center gap-3">
                                <div className="p-2 border-2 border-bauhaus-black bg-white shadow-[4px_4px_0px_0px_black]">
                                    {item.icon}
                                </div>
                                <span className="font-bold uppercase tracking-tighter text-sm md:text-base">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
