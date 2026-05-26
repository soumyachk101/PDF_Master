'use client';

import React, { useState, useMemo, useDeferredValue, useCallback, memo } from 'react';
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

// Animation variants for staggered entrance
const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { 
            type: "spring",
            stiffness: 100,
            damping: 15
        } 
    }
};

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { 
        opacity: 1, 
        y: 0,
        transition: { 
            duration: 0.6,
            ease: "easeOut"
        } 
    }
};

function HomePage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const deferredSearchQuery = useDeferredValue(searchQuery);
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
        if (!deferredSearchQuery.trim()) return catTools;
        
        const q = deferredSearchQuery.toLowerCase();
        return catTools.filter(tool =>
            tool.name.toLowerCase().includes(q) ||
            tool.shortDesc.toLowerCase().includes(q) ||
            tool.desc.toLowerCase().includes(q)
        );
    }, [deferredSearchQuery]);

    // Check if there are any results at all
    const hasResults = useMemo(() => {
        return activeCategories.some(cat => getFilteredToolsForCategory(cat.id).length > 0);
    }, [activeCategories, getFilteredToolsForCategory]);

    const handleToolClick = (slug) => {
        router.push(`/tool/${slug}`);
    };

    return (
        <div className="min-h-screen bg-[#E4EDE8] pb-16">
            {/* Hero Section with built-in entrance animations */}
            <HeroSection />

            <GrooveHr />

            {/* ── TOOLS SECTION ── */}
            <section id="tools" className="py-16 px-4">
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
                        <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#2A3A31] mb-3">
                            Choose Your <span className="text-[#7C3AED]">Toolkit</span>
                        </h2>
                        <p className="font-body text-sm text-[#55685C]">30+ FREE PDF TOOLS - NO SIGNUP REQUIRED</p>
                    </motion.div>

                    {/* Search */}
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={sectionVariants}
                        className="max-w-md mx-auto mb-10"
                    >
                        <div className="rounded-full bg-[#E4EDE8] shadow-soft-inset flex items-center px-4 h-12 focus-within:ring-2 focus-within:ring-[#7C3AED] focus-within:ring-offset-2 focus-within:ring-offset-[#E4EDE8] transition-all">
                            <Search size={18} className="text-[#55685C] flex-shrink-0" />
                            <input
                                type="text"
                                placeholder="Search tools..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 ml-2.5 bg-transparent outline-none font-body text-sm text-[#2A3A31] placeholder-[#55685C]"
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="ml-2 focus:outline-none" aria-label="Clear search">
                                    <X size={16} className="text-[#55685C] hover:text-[#E11D48]" />
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Category Tabs */}
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
                                        'h-9 px-4 text-xs font-semibold rounded-full font-body tracking-wider transition-all duration-300 focus:outline-none',
                                        isActive
                                            ? 'bg-[#E4EDE8] text-[#7C3AED] shadow-soft-inset-sm font-bold'
                                            : 'bg-[#E4EDE8] text-[#55685C] shadow-soft-extruded-sm hover:-translate-y-[0.5px] hover:shadow-soft-extruded hover:text-[#2A3A31]'
                                    )}
                                >
                                    {cat.label}
                                    <span className="ml-1.5 text-[10px] text-[#55685C]/70">
                                        ({categoryCounts[cat.id] || 0})
                                    </span>
                                </button>
                            );
                        })}
                    </motion.div>

                    {/* Tools Grouped Category-Wise */}
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
                                            <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] shadow-soft-extruded-sm" />
                                            <h3 className="font-display font-extrabold text-base uppercase tracking-wider text-[#2A3A31]">
                                                {category.label}
                                            </h3>
                                            <div className="flex-1 h-[2px] bg-[#D5DFD9] rounded-full shadow-soft-inset-sm" />
                                        </div>

                                        {/* Tools Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                            {categoryTools.map((tool) => (
                                                <motion.div
                                                    key={tool.slug}
                                                    variants={cardVariants}
                                                    whileHover={{ y: -4 }}
                                                >
                                                    <button
                                                        onClick={() => handleToolClick(tool.slug)}
                                                        className="bg-[#F2F6F4] rounded-[24px] shadow-soft-extruded p-5 flex flex-col gap-4 group transition-all duration-300 hover:shadow-soft-extruded-hover text-left w-full relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:ring-offset-2 focus:ring-offset-[#E4EDE8]"
                                                    >
                                                        <div className="flex items-center justify-between w-full">
                                                            <span className="text-[9px] font-mono tracking-widest text-[#7C3AED]/80 font-bold uppercase">
                                                                {tool.category}
                                                            </span>
                                                            <div className="w-6 h-6 rounded-full bg-[#F2F6F4] shadow-soft-inset-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                <ArrowUpRight size={12} className="text-[#7C3AED]" />
                                                            </div>
                                                        </div>

                                                        <div className="flex items-start gap-4">
                                                            <div className="w-12 h-12 rounded-2xl bg-[#F2F6F4] shadow-soft-inset-sm flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                                                <DynamicIcon name={tool.icon} color="#7C3AED" size={24} />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-[#2A3A31] leading-snug">
                                                                    {tool.name}
                                                                </h3>
                                                                <p className="font-body text-xs text-[#55685C] mt-1 line-clamp-2 leading-relaxed">
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
                                <div className="bg-[#F2F6F4] rounded-[32px] shadow-soft-extruded max-w-sm mx-auto p-8">
                                    <p className="font-body text-sm text-[#55685C] font-semibold">No tools found matching &quot;{searchQuery}&quot;</p>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            <GrooveHr />

            {/* ── FEATURES SECTION ── */}
            <section id="features" className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div 
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={sectionVariants}
                        className="text-center mb-12"
                    >
                        <NeumorphicBadge color="green" led className="mb-4">SYSTEM FEATURES</NeumorphicBadge>
                        <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#2A3A31] mb-3">
                            Why Choose <span className="text-[#0D9488]">DocShift</span>?
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
                                icon: <ShieldCheck size={28} className="text-[#0D9488]" />,
                                title: '100% Private',
                                desc: 'All processing happens directly in your browser. Files are never uploaded to any server.'
                            },
                            {
                                icon: <Zap size={28} className="text-[#7C3AED]" />,
                                title: 'Lightning Fast',
                                desc: 'Powered by modern WebAssembly and optimized client-side engines for speed.'
                            },
                            {
                                icon: <MonitorSmartphone size={28} className="text-[#7C3AED]" />,
                                title: 'Works Everywhere',
                                desc: 'Desktop, tablet, or mobile - DocShift works on any modern browser. No installation needed.'
                            },
                            {
                                icon: <Gift size={28} className="text-[#0D9488]" />,
                                title: 'Completely Free',
                                desc: 'No hidden fees, no premium tiers, no file limits. Every tool is free forever.'
                            },
                            {
                                icon: <HeartHandshake size={28} className="text-[#7C3AED]" />,
                                title: 'No Signup Required',
                                desc: 'Start using tools immediately. No account creation, no email required.'
                            },
                            {
                                icon: <ServerCrash size={28} className="text-[#55685C]" />,
                                title: 'Offline Capable',
                                desc: 'Once loaded, DocShift works even without an internet connection.'
                            }
                        ].map((feature, i) => (
                            <motion.div key={i} variants={cardVariants}>
                                <NeumorphicCard className="flex flex-col items-start gap-4 h-full">
                                    <div className="w-14 h-14 rounded-2xl bg-[#F2F6F4] shadow-soft-inset-sm flex items-center justify-center text-[#7C3AED]">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-display font-extrabold text-sm uppercase tracking-wider text-[#2A3A31] mb-1.5">
                                            {feature.title}
                                        </h3>
                                        <p className="font-body text-xs text-[#55685C] leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </NeumorphicCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <GrooveHr />

            {/* ── ABOUT / TRUST SECTION ── */}
            <section id="about" className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={sectionVariants}
                    >
                        <NeumorphicCard className="p-8 sm:p-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h2 className="font-display font-extrabold text-2xl uppercase text-[#2A3A31] mb-4">
                                        Built for <span className="text-[#7C3AED]">Privacy</span>
                                    </h2>
                                    <p className="text-sm text-[#55685C] leading-relaxed mb-4">
                                        DocShift processes all files directly in your browser using cutting-edge WebAssembly technology.
                                        Your documents <strong>never leave your device</strong>. No uploads, no cloud processing, no data collection.
                                    </p>
                                    <p className="text-sm text-[#55685C] leading-relaxed">
                                        Whether you're merging sensitive contracts, compressing confidential reports, or converting private documents - your files stay 100% on your machine.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="rounded-2xl bg-[#E4EDE8] shadow-soft-inset-sm p-5 border border-white/20">
                                        <p className="font-mono text-xs text-[#2A3A31]/90 leading-relaxed">
                                            <strong className="text-[#7C3AED]">&gt;&gt; SECURITY NOTICE:</strong><br/>
                                            All document processing occurs locally via client-side JavaScript and WebAssembly. Zero data transmission to external servers.
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center gap-3">
                                        <ColorSquares />
                                        <span className="font-mono text-[10px] text-[#55685C]/60">v2.0</span>
                                    </div>
                                </div>
                            </div>
                        </NeumorphicCard>
                    </motion.div>
                </div>
            </section>

            {/* ── CTA SECTION ── */}
            <ConstructionStripe />
            <section className="py-20 px-4">
                <motion.div 
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={sectionVariants}
                    className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#7C3AED] to-[#9F67FF] rounded-[40px] shadow-soft-extruded text-white p-8 sm:p-16 relative overflow-hidden"
                >
                    {/* Concentric Circle Background Elements */}
                    <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full border-8 border-white/5" />
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full border-[12px] border-white/5" />
                    
                    <h2 className="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-white mb-4 relative z-10">
                        Ready to Convert?
                    </h2>
                    <p className="text-sm text-white/80 mb-8 max-w-lg mx-auto font-body leading-relaxed relative z-10">
                        Join thousands of users who trust DocShift for their daily PDF needs.
                        100% free. No limits. Forever.
                    </p>
                    <NeumorphicButton
                        onClick={() => document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' })}
                        variant="green"
                        className="h-12 px-8 text-xs font-bold uppercase tracking-wider relative z-10"
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
