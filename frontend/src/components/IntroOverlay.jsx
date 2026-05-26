'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function IntroOverlay() {
    const [isVisible, setIsVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if intro has already run in this session
        const hasRun = sessionStorage.getItem('docshift_intro_run');
        if (!hasRun) {
            const startTimer = setTimeout(() => {
                setIsVisible(true);
            }, 0);
            
            // Progress loader animation
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 2.5; // Fills up in about 1 second
                });
            }, 25);

            // Exit animation trigger after progress finishes
            const timeout = setTimeout(() => {
                setIsVisible(false);
                sessionStorage.setItem('docshift_intro_run', 'true');
            }, 1500);

            return () => {
                clearTimeout(startTimer);
                clearInterval(interval);
                clearTimeout(timeout);
            };
        }
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 0 }}
                    exit={{ 
                        y: '-100%', 
                        transition: { 
                            duration: 0.65, 
                            ease: [0.76, 0, 0.24, 1] 
                        } 
                    }}
                    className="fixed inset-0 z-[99999] bg-[#E4EDE8] flex flex-col items-center justify-center select-none"
                >
                    <div className="flex flex-col items-center max-w-sm px-6 text-center">
                        {/* Neumorphic Logo Container */}
                        <motion.div
                            initial={{ 
                                scale: 0.95,
                                boxShadow: 'inset 8px 8px 16px rgba(189, 201, 193, 0.8), inset -8px -8px 16px rgba(255, 255, 255, 0.9)'
                            }}
                            animate={{ 
                                scale: 1,
                                boxShadow: '9px 9px 18px rgba(189, 201, 193, 0.75), -9px -9px 18px rgba(255, 255, 255, 0.85), 0 0 25px rgba(124, 58, 237, 0.15)'
                            }}
                            transition={{ 
                                delay: 0.2,
                                duration: 0.5,
                                ease: "easeOut"
                            }}
                            className="w-28 h-28 rounded-[28px] bg-[#E4EDE8] flex items-center justify-center mb-8 relative overflow-hidden"
                        >
                            <span className="font-display font-black text-xl tracking-tight flex flex-col items-center">
                                <span className="text-[#2A3A31] text-xs tracking-[0.2em] font-extrabold pb-0.5 border-b border-[#D5DFD9]">DOC</span>
                                <span className="text-[#7C3AED] text-lg font-black tracking-widest mt-0.5">SHIFT</span>
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h2 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 0.3 }}
                            className="font-display font-extrabold text-base uppercase tracking-widest text-[#2A3A31]"
                        >
                            PRIVACY SECURED
                        </motion.h2>

                        {/* Progress Bar Container */}
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45, duration: 0.3 }}
                            className="w-48 h-2 bg-[#E4EDE8] rounded-full shadow-soft-inset-sm mt-6 overflow-hidden p-[1px]"
                        >
                            <div 
                                className="h-full bg-[#7C3AED] rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </motion.div>

                        {/* Monospace Loading Text */}
                        <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            transition={{ delay: 0.55, duration: 0.3 }}
                            className="font-mono text-[9px] text-[#55685C] mt-4 tracking-wider uppercase"
                        >
                            Initializing browser sandbox...
                        </motion.span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
