'use client';

import React, { useState, useMemo, useDeferredValue, memo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, ShieldCheck, Zap, ServerCrash, HeartHandshake, Gift, MonitorSmartphone } from 'lucide-react';

import { CATEGORIES, TOOLS } from '@/utils/tools';
import { getIcon, Icons } from '@/utils/icons';
import HeroSection from '@/components/HeroSection';
import { IndustrialSection, IndustrialCard, IndustrialButton, IndustrialBadge, cn } from '@/components/ui/IndustrialComponents';

const DynamicIcon = memo(({ name, color, size = 24, className }) => {
    const IconComponent = getIcon(name);
    return React.createElement(IconComponent, { size, color, className });
});

function HomePage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const deferredSearchQuery = useDeferredValue(searchQuery);
    const router = useRouter();

    // Dynamically calculate counts for categories
    const categoryCounts = useMemo(() => {
        const counts = { all: TOOLS.length };
        TOOLS.forEach(tool => {
            counts[tool.category] = (counts[tool.category] || 0) + 1;
        });
        return counts;
    }, []);

    const categoryTools = useMemo(() => {
        if (activeCategory === 'all') return TOOLS;
        return TOOLS.filter(tool => tool.category === activeCategory);
    }, [activeCategory]);

    const displayedTools = useMemo(() => {
        if (!deferredSearchQuery.trim()) return categoryTools;
        const q = deferredSearchQuery.toLowerCase();
        return categoryTools.filter(tool =>
            tool.name.toLowerCase().includes(q) ||
            tool.shortDesc.toLowerCase().includes(q) ||
            tool.desc.toLowerCase().includes(q) ||
            tool.slug.toLowerCase().includes(q)
        );
    }, [categoryTools, deferredSearchQuery]);

    return (
        <div className="flex flex-col w-full min-h-screen bg-chassis font-body">

            {/* ── HERO SECTION ── */}
            <HeroSection />

            {/* ── TRUST STRIP ── */}
            <div className="border-y border-white/10 bg-[#2d3436] bg-blueprint-dark py-10">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-16">
                        {[
                            { id: 'secure', icon: <ShieldCheck size={18} className="text-accent" />, text: 'Hardware Secure' },
                            { id: 'fast', icon: <Zap size={18} className="text-emerald-500" />, text: 'In-Memory Speed' },
                            { id: 'zero', icon: <ServerCrash size={18} className="text-blue-400" />, text: 'No Server Uploads' },
                            { id: 'free', icon: <HeartHandshake size={18} className="text-amber-500" />, text: '100% Client-Side' },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center gap-3 select-none">
                                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#2d3436] border border-white/10 shadow-[inset_2px_2px_4px_#1e2424,inset_-2px_-2px_4px_#3c4448]">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="font-mono font-extrabold uppercase text-[10px] sm:text-xs tracking-wider text-white flex items-center gap-1.5">
                                        <span className="led-indicator led-green flex-shrink-0" />
                                        {item.text}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MAIN TOOLS GRID ── */}
            <IndustrialSection id="tools" bgVariant="chassis" className="scroll-mt-24 pt-24 pb-32">
                <div className="text-center mb-16">
                    <IndustrialBadge color="green" led={true} className="mb-4">
                        FILE PROCESSORS
                    </IndustrialBadge>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-ink drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                        Everything you need for PDFs
                    </h2>
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-secondary">
                        30+ free offline tools · no limits · no signup required
                    </p>
                </div>

                {/* Recessed Search Bar */}
                <div className="flex justify-center mb-16 px-4">
                    <div className="relative group max-w-2xl w-full">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted/60 pointer-events-none">
                            <Search size={18} />
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH FROM 30+ PDF TOOL MODULES..."
                            className="w-full pl-11 pr-12 py-3.5 bg-chassis border border-white/20 shadow-neu-recessed rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 focus:shadow-[inset_2px_2px_5px_#babecc,inset_-2px_-2px_5px_#ffffff] transition-all font-mono font-bold text-xs text-ink placeholder:text-ink-secondary/50 uppercase tracking-widest"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-ink-secondary hover:text-accent transition-colors">
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category Filtering */}
                <div className="flex flex-wrap justify-center gap-3 mb-16 px-4">
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={cn(
                                "px-5 py-2 font-mono font-bold uppercase tracking-wider text-[10px] border transition-all rounded-full flex items-center gap-2 select-none",
                                activeCategory === category.id
                                    ? "bg-chassis border-white/30 text-ink shadow-neu-pressed"
                                    : "bg-chassis border-white/50 text-ink-secondary shadow-neu-sharp hover:shadow-none hover:text-ink"
                            )}
                        >
                            {category.label}
                            <span className={cn(
                                "px-2 py-0.5 rounded-full text-[9px] font-mono",
                                activeCategory === category.id ? "bg-accent text-white" : "bg-black/10 text-ink-secondary"
                            )}>
                                {categoryCounts[category.id] || 0}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
                    <AnimatePresence mode="popLayout">
                        {displayedTools.length > 0 ? (
                            displayedTools.map((tool) => (
                                <motion.div
                                    layout
                                    key={tool.slug}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <IndustrialCard
                                        screws={true}
                                        ventSlots={true}
                                        className="h-full cursor-pointer flex flex-col group p-6 bg-chassis border border-white/30"
                                        onClick={() => router.push(`/tool/${tool.slug}`)}
                                    >
                                        <div className="flex justify-between items-start mb-5">
                                            <div className="w-12 h-12 rounded-full bg-chassis border border-white/40 shadow-neu flex items-center justify-center transition-all group-hover:-translate-y-0.5 group-hover:shadow-neu-float">
                                                <DynamicIcon name={tool.icon} size={22} className="text-accent" />
                                            </div>
                                            <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-ink-secondary" />
                                        </div>

                                        <h3 className="text-base font-bold tracking-tight text-ink mb-1.5 group-hover:text-accent transition-colors">
                                            {tool.name}
                                        </h3>
                                        <p className="text-xs text-ink-secondary leading-relaxed">
                                            {tool.shortDesc}
                                        </p>
                                    </IndustrialCard>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center font-mono text-xs uppercase tracking-wider text-ink-secondary">
                                No processing modules match your query.
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* SEO Description Footer */}
                <div className="mt-24 pt-12 border-t border-black/5 text-center">
                    <p className="text-xs leading-relaxed text-ink-secondary/70 max-w-4xl mx-auto font-mono uppercase tracking-tighter">
                        DocShift offers a comprehensive suite of completely free online PDF tools. Whether you need to securely <strong>merge PDF</strong> files, <strong>split PDF</strong> pages, or <strong>compress PDF</strong> size, our browser-based solutions process your documents locally. Maintain absolute privacy and 100% security while you manage, edit, and convert PDF documents. No accounts, no uploads, and no limitations.
                    </p>
                </div>
            </IndustrialSection>

            {/* ── FEATURES SECTION ── */}
            <IndustrialSection id="features" bgVariant="dark" className="py-24">
                <div className="text-center mb-16">
                    <IndustrialBadge color="red" led={true} className="mb-4 bg-[#2d3436] text-white border-white/20">
                        PROCESSING ADVANTAGES
                    </IndustrialBadge>
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-3">
                        Built for Privacy & Speed
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { title: 'Zero Uploads', desc: 'Your files never leave your device. All processing happens entirely within your local browser sandbox.', icon: 'ShieldCheck' },
                        { title: 'Local Speed', desc: 'Powered by modern WebAssembly compilers for instantaneous local client-side manipulation.', icon: 'Zap' },
                        { title: '100% Free', desc: 'No hidden paywalls, subscription models, or watermarks. Every engine is completely available to everyone.', icon: 'Gift' },
                        { title: 'Universal Node', desc: 'Works seamlessly on Windows, macOS, iOS, and Android without installation requirements.', icon: 'MonitorSmartphone' }
                    ].map((feat, idx) => (
                        <div key={idx} className="bg-[#2d3436] p-6 rounded-2xl border border-white/10 shadow-[6px_6px_14px_#1e2424,-6px_-6px_14px_#3c4448] flex flex-col items-start hover:-translate-y-1 transition-all duration-300">
                            <div className="w-10 h-10 rounded-full bg-[#2d3436] border border-white/10 shadow-[inset_2px_2px_4px_#1e2424,inset_-2px_-2px_4px_#3c4448] flex items-center justify-center mb-5 text-accent">
                                <DynamicIcon name={feat.icon} size={20} />
                            </div>
                            <h3 className="text-sm font-mono font-extrabold text-white mb-2 uppercase tracking-wide">{feat.title}</h3>
                            <p className="text-xs leading-relaxed text-gray-400 font-mono">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </IndustrialSection>

            {/* ── ABOUT SECTION ── */}
            <IndustrialSection id="about" bgVariant="chassis" className="py-24">
                <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#2d3436] to-[#1e2424] text-white rounded-3xl p-8 md:p-16 border border-white/10 shadow-neu flex flex-col text-center">
                    <div className="self-center">
                        <IndustrialBadge color="yellow" led={true} className="mb-6 bg-black/20 border-white/10 text-white">
                            CORE PHILOSOPHY
                        </IndustrialBadge>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-8 leading-tight text-white">
                        We believe document privacy is a fundamental right.
                    </h3>
                    <div className="space-y-6 font-mono text-xs md:text-sm leading-relaxed text-gray-300 opacity-90 mb-12 max-w-2xl mx-auto">
                        <p>
                            DocShift was created to solve a massive problem: almost every free online PDF tool forces you to upload your sensitive documents to unverified cloud servers.
                        </p>
                        <p>
                            By leveraging modern browser compiler technologies, we brought the processing power of local offline tools directly to your browser. You get the ultra-convenience of an elegant web interface with the security of an offline program.
                        </p>
                    </div>
                    <IndustrialButton
                        variant="primary"
                        className="text-xs tracking-widest px-10 self-center"
                        onClick={() => {
                            const toolsEl = document.getElementById('tools');
                            if (toolsEl) toolsEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        EXPLORE TOOLS
                    </IndustrialButton>
                </div>
            </IndustrialSection>
        </div>
    );
}

export default memo(HomePage);
