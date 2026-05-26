'use client';

import React, { useState, useMemo, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, ShieldCheck, Zap, ServerCrash, HeartHandshake, Gift, MonitorSmartphone } from 'lucide-react';

import { CATEGORIES, TOOLS } from '@/utils/tools';
import { getIcon } from '@/utils/icons';
import HeroSection from '@/components/HeroSection';
import { NeumorphicCard, NeumorphicButton, NeumorphicBadge, cn, GrooveHr, HitCounter, ColorSquares, ConstructionStripe } from '@/components/ui/IndustrialComponents';

const DynamicIcon = memo(({ name, color, size = 24, className }) => {
    const IconComponent = getIcon(name);
    if (!IconComponent) return null;
    return React.createElement(IconComponent, { size, color, className });
});

DynamicIcon.displayName = 'DynamicIcon';

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { 
            type: "spring",
            stiffness: 120,
            damping: 18
        } 
    }
};

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { 
            duration: 0.5,
            ease: "easeOut"
        } 
    }
};

function HomePage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    // Map tools to their categories
    const categoryCounts = useMemo(() => {
        const counts = { all: TOOLS.length };
        TOOLS.forEach(tool => {
            counts[tool.category] = (counts[tool.category] || 0) + 1;
        });
        return counts;
    }, []);

    // Filter categories to display
    const activeCategories = useMemo(() => {
        if (activeCategory === 'all') {
            return CATEGORIES.filter(cat => cat.id !== 'all');
        }
        return CATEGORIES.filter(cat => cat.id === activeCategory);
    }, [activeCategory]);

    // Filter tools based on search query
    const getFilteredToolsForCategory = useCallback((catId) => {
        const catTools = TOOLS.filter(tool => tool.category === catId);
        if (!searchQuery.trim()) return catTools;
        
        const q = searchQuery.toLowerCase();
        return catTools.filter(tool =>
            tool.name.toLowerCase().includes(q) ||
            tool.shortDesc.toLowerCase().includes(q) ||
            tool.desc.toLowerCase().includes(q)
        );
    }, [searchQuery]);

    // Check if there are any results
    const hasResults = useMemo(() => {
        return activeCategories.some(cat => getFilteredToolsForCategory(cat.id).length > 0);
    }, [activeCategories, getFilteredToolsForCategory]);

    const handleToolClick = (slug) => {
        router.push(`/tool/${slug}`);
    };

    return (
        <div className="min-h-screen bg-[#e5e7eb] pb-16 font-suisseintl w-full overflow-x-hidden">
            {/* Hero Section */}
            <HeroSection />

            <GrooveHr className="my-10" />

            {/* ── TOOLS SECTION ── */}
            {/* Section Gap: 80px */}
            <section id="tools" className="py-20 px-4">
                <div className="max-w-5xl mx-auto">

                    {/* Section Title */}
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={sectionVariants}
                        className="text-center mb-12"
                    >
                        <NeumorphicBadge color="blue" led className="mb-4">ALL TOOLS</NeumorphicBadge>
                        <h2 className="font-suisseintlcond font-bold text-3xl sm:text-5xl uppercase tracking-tight text-[#000000] mb-3">
                            Choose Your <span className="underline decoration-2">Toolkit</span>
                        </h2>
                        <p className="font-suisseintl text-xs tracking-wider uppercase text-[#444444] font-medium">30+ FREE PDF TOOLS - NO SIGNUP REQUIRED</p>
                    </motion.div>

                    {/* Search Field (Flat minimal well) */}
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={sectionVariants}
                        className="max-w-md mx-auto mb-10"
                    >
                        <div className="bg-[#ffffff] border border-[#000000] flex items-center px-4 h-12 focus-within:ring-2 focus-within:ring-[#000000] focus-within:ring-offset-2 focus-within:ring-offset-[#e5e7eb] transition-all">
                            <Search size={18} className="text-[#444444] flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 ml-2.5 bg-transparent outline-none font-suisseintl text-sm text-[#000000] placeholder-[#979797]"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="ml-2 focus:outline-none" aria-label="Clear search">
                                    <X size={16} className="text-[#444444] hover:text-[#000000]" />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Category Tabs (Flat and aligned) */}
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={sectionVariants}
                        className="flex flex-wrap justify-center gap-3 mb-12"
                    >
                        {CATEGORIES.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={cn(
                                        'h-9 px-4 text-xs font-medium uppercase tracking-wider transition-all duration-200 focus:outline-none border',
                                        isActive
                                            ? 'bg-[#000000] text-[#ffffff] border-[#000000]'
                                            : 'bg-[#ffffff] text-[#444444] border-[#000000]/15 hover:border-[#000000] hover:text-[#000000]'
                                    )}
                                >
                                    {cat.label}
                                    <span className={cn("ml-1.5 text-[10px]", isActive ? "text-[#ffffff]/70" : "text-[#444444]/60")}>
                                        ({categoryCounts[cat.id] || 0})
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Tools Grouped Category-Wise */}
                    {/* Element Gap: 24px between coherent blocks */}
                    <div className="space-y-16">
                        {hasResults ? (
                            activeCategories.map((category) => {
                                const categoryTools = getFilteredToolsForCategory(category.id);
                                if (categoryTools.length === 0) return null;

                                return (
                                    <motion.div 
                                        key={category.id}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true, margin: "-80px" }}
                                        variants={containerVariants}
                                        className="space-y-6"
                                    >
                                        {/* Category Header */}
                                        <div className="flex items-center gap-4">
                                            <span className="w-2.5 h-2.5 bg-[#000000]" />
                                            <h3 className="font-suisseintl font-bold text-xs uppercase tracking-wider text-[#000000]">
                                                {category.label}
                                            </h3>
                                            <div className="flex-1 h-[1px] bg-[#000000]/15" />
                                        </div>

                                        {/* Tools Grid - gap-6 is 24px */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {categoryTools.map((tool) => (
                                                <motion.div
                                                    key={tool.slug}
                                                    variants={cardVariants}
                                                    whileHover={{ y: -2 }}
                                                >
                                                    {/* Flat Paper Card style */}
                                                    <button
                                                        onClick={() => handleToolClick(tool.slug)}
                                                        className="bg-[#ffffff] border border-[#000000] rounded-[20px] sm:rounded-[32px] p-4 sm:p-5 flex flex-col gap-4 group transition-all duration-200 hover:border-[#000000] hover:bg-[#f3f3f3] text-left w-full relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#000000] focus:ring-offset-2 focus:ring-offset-[#e5e7eb]"
                                                    >
                                                        <div className="flex items-center justify-between w-full">
                                                            <span className="text-[9px] font-suisseintlmono tracking-widest text-[#444444] font-bold uppercase">
                                                                {tool.category}
                                                            </span>
                                                            {/* Action green functional highlight on hover */}
                                                            <div className="w-6 h-6 rounded-full border border-[#000000] bg-transparent group-hover:bg-[#d1ffca] flex items-center justify-center transition-all duration-200">
                                                                <ArrowUpRight size={12} className="text-[#000000]" />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-start gap-4">
                                                            <div className="w-12 h-12 border border-[#000000] bg-[#ffffff] flex items-center justify-center flex-shrink-0 group-hover:scale-102 transition-transform duration-200">
                                                                <DynamicIcon name={tool.icon} color="#000000" size={24} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-suisseintl font-bold text-sm uppercase tracking-wider text-[#000000] leading-snug">
                                                                    {tool.name}
                                                                </h3>
                                                                <p className="font-suisseintl text-xs text-[#444444] mt-1.5 line-clamp-2 leading-relaxed">
                                                                    {tool.shortDesc}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-16"
                            >
                                <div className="bg-[#ffffff] border border-[#000000] rounded-[20px] sm:rounded-[32px] max-w-sm mx-auto p-6 sm:p-8">
                                    <p className="font-suisseintl text-xs uppercase tracking-wider text-[#444444] font-bold">No tools found matching &quot;{searchQuery}&quot;</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            <GrooveHr className="my-10" />

            {/* ── FEATURES SECTION ── */}
            <section id="features" className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={sectionVariants}
                        className="text-center mb-12"
                    >
                        <NeumorphicBadge color="green" led className="mb-4">SYSTEM FEATURES</NeumorphicBadge>
                        <h2 className="font-suisseintlcond font-bold text-3xl sm:text-5xl uppercase tracking-tight text-[#000000] mb-3">
                            Why Choose <span className="bg-[#d1ffca] px-1.5 text-[#000000]">DocShift</span>?
                        </h2>
                    </motion.div>

                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-80px" }}
                        variants={containerVariants}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {[
                            {
                                icon: <ShieldCheck size={28} className="text-[#000000]" />,
                                title: '100% Private',
                                desc: 'All processing happens directly in your browser. Files are never uploaded to any server.'
                            },
                            {
                                icon: <Zap size={28} className="text-[#000000]" />,
                                title: 'Lightning Fast',
                                desc: 'Powered by modern WebAssembly and optimized client-side engines for speed.'
                            },
                            {
                                icon: <MonitorSmartphone size={28} className="text-[#000000]" />,
                                title: 'Works Everywhere',
                                desc: 'Desktop, tablet, or mobile - DocShift works on any modern browser. No installation needed.'
                            },
                            {
                                icon: <Gift size={28} className="text-[#000000]" />,
                                title: 'Completely Free',
                                desc: 'No hidden fees, no premium tiers, no file limits. Every tool is free forever.'
                            },
                            {
                                icon: <HeartHandshake size={28} className="text-[#000000]" />,
                                title: 'No Signup Required',
                                desc: 'Start using tools immediately. No account creation, no email required.'
                            },
                            {
                                icon: <ServerCrash size={28} className="text-[#000000]" />,
                                title: 'Offline Capable',
                                desc: 'Once loaded, DocShift works even without an internet connection.'
                            }
                        ].map((feature, i) => (
                            <motion.div key={i} variants={cardVariants}>
                                <NeumorphicCard className="flex flex-col items-start gap-4 h-full bg-[#ffffff] border border-[#000000]">
                                    <div className="w-14 h-14 border border-[#000000] bg-[#e5e7eb]/20 flex items-center justify-center">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-suisseintl font-bold text-xs uppercase tracking-wider text-[#000000] mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="font-suisseintl text-xs text-[#444444] leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </NeumorphicCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <GrooveHr className="my-10" />

            {/* ── ABOUT / TRUST SECTION ── */}
            <section id="about" className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={sectionVariants}
                    >
                        <NeumorphicCard className="p-6 sm:p-12 bg-[#ffffff] border border-[#000000]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="font-suisseintlcond font-bold text-2xl sm:text-3xl uppercase text-[#000000] mb-4">
                                        Built for <span className="underline decoration-2">Privacy</span>
                                    </h2>
                                    <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-4">
                                        DocShift processes all files directly in your browser using cutting-edge WebAssembly technology.
                                        Your documents <strong className="text-[#000000] font-semibold">never leave your device</strong>. No uploads, no cloud processing, no data collection.
                                    </p>
                                    <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">
                                        Whether you're merging sensitive contracts, compressing confidential reports, or converting private documents - your files stay 100% on your machine.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {/* Callout box - uses Action Green as functional accent background */}
                                    <div className="bg-[#d1ffca] border border-[#000000] p-5">
                                        <p className="font-suisseintlmono text-xs text-[#000000] leading-relaxed">
                                            <strong>&gt;&gt; SECURITY NOTICE:</strong><br/>
                                            All document processing occurs locally via client-side JavaScript and WebAssembly. Zero data transmission to external servers.
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center gap-3">
                                        <ColorSquares />
                                        <span className="font-suisseintlmono text-[10px] text-[#444444]/60">v2.1 DIRECT MODE</span>
                                    </div>
                                </div>
                            </div>
                        </NeumorphicCard>
                    </motion.div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <ConstructionStripe />
            {/* Section gap: 80px */}
            <section className="py-20 px-4">
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={sectionVariants}
                    // Solid Card: Content card with a dark background. backgroundColor=#000000, borderRadius=32px, no boxShadow
                    className="max-w-3xl mx-auto text-center bg-[#000000] rounded-[20px] sm:rounded-[32px] text-white p-6 sm:p-16 relative overflow-hidden"
                >
                    <h2 className="font-suisseintlcond font-bold text-3xl sm:text-5xl uppercase tracking-tight text-[#ffffff] mb-4 relative z-10">
                        Ready to Convert?
                    </h2>
                    <p className="text-xs sm:text-sm text-[#979797] mb-8 max-w-lg mx-auto font-suisseintl leading-relaxed relative z-10">
                        Join thousands of users who trust DocShift for their daily PDF needs.
                        100% free. No limits. Forever.
                    </p>
                    
                    {/* Primary CTA button: Black background/white text in light themes, but on dark card we use the Action Green highlight button */}
                    <NeumorphicButton
                        onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                        variant="green"
                        className="h-12 px-8 text-xs font-bold uppercase tracking-wider relative z-10 hover:bg-[#b5f5ad]"
                    >
                        Launch Toolkit Now
                    </NeumorphicButton>
                </motion.div>
            </section>
            <ConstructionStripe />
        </div>
    );
}

export default HomePage;
