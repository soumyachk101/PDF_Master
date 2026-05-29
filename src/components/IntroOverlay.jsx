'use client';

import { useState, useEffect } from 'react';

export default function IntroOverlay() {
    const [isVisible, setIsVisible] = useState(() => {
        if (typeof window === 'undefined') return false;
        return !sessionStorage.getItem('docshift_intro_run');
    });
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isVisible) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2.5;
            });
        }, 25);

        const timeout = setTimeout(() => {
            setIsExiting(true);
            sessionStorage.setItem('docshift_intro_run', 'true');
        }, 1500);

        const removeTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 2150);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            clearTimeout(removeTimeout);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[99999] bg-[#E4EDE8] flex flex-col items-center justify-center select-none"
            style={{
                transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
                transition: 'transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)',
                willChange: 'transform',
            }}
        >
            <div className="flex flex-col items-center max-w-sm px-6 text-center">
                <div
                    className="w-28 h-28 rounded-[28px] bg-[#E4EDE8] flex items-center justify-center mb-8 relative overflow-hidden"
                    style={{
                        boxShadow: '9px 9px 18px rgba(189, 201, 193, 0.75), -9px -9px 18px rgba(255, 255, 255, 0.85)',
                        animation: 'fadeIn 0.5s ease-out 0.2s both',
                    }}
                >
                    <span className="font-display font-black text-xl tracking-tight flex flex-col items-center">
                        <span className="text-[#2A3A31] text-xs tracking-[0.2em] font-extrabold pb-0.5 border-b border-[#D5DFD9]">DOC</span>
                        <span className="text-[#7C3AED] text-lg font-black tracking-widest mt-0.5">SHIFT</span>
                    </span>
                </div>

                <h2
                    className="font-display font-extrabold text-base uppercase tracking-widest text-[#2A3A31]"
                    style={{ animation: 'fadeSlideUp 0.3s ease-out 0.35s both' }}
                >
                    PRIVACY SECURED
                </h2>

                <div
                    className="w-48 h-2 bg-[#E4EDE8] rounded-full mt-6 overflow-hidden p-[1px]"
                    style={{
                        boxShadow: 'inset 2px 2px 4px rgba(189, 201, 193, 0.6), inset -2px -2px 4px rgba(255, 255, 255, 0.7)',
                        animation: 'fadeSlideUp 0.3s ease-out 0.45s both',
                    }}
                >
                    <div
                        className="h-full bg-[#7C3AED] rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <span
                    className="font-mono text-[9px] text-[#55685C] mt-4 tracking-wider uppercase"
                    style={{ animation: 'fadeIn 0.3s ease-out 0.55s both', opacity: 0 }}
                >
                    Initializing browser sandbox...
                </span>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
