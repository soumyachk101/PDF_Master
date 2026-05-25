'use client';

import { useState, useMemo, useDeferredValue, memo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight, ShieldCheck, Zap, ServerCrash, HeartHandshake, Gift, MonitorSmartphone } from 'lucide-react';

import { CATEGORIES, TOOLS } from '@/utils/tools';
import { getIcon, Icons } from '@/utils/icons';
import HeroSection from '@/components/HeroSection';
import { BauhausSection, BauhausCard, BauhausButton, BauhausBadge, cn } from '@/components/ui/BauhausComponents';

const DynamicIcon = memo(({ name, color, size = 24, className }) => {
    const Icon = getIcon(name);
    return <Icon size={size} color={color} className={className} />;
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
        <div className="flex flex-col w-full min-h-screen bg-bauhaus-white font-bauhaus">

            {/* ── HERO SECTION ── */}
            <HeroSection />

            {/* ── TRUST STRIP ── */}
            <div className="border-y-4 border-bauhaus-black bg-white py-12">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {[
                            { id: 'secure', icon: <ShieldCheck className="text-bauhaus-red" />, text: 'Secure Encryption' },
                            { id: 'fast', icon: <Zap className="text-bauhaus-blue" />, text: 'In-Browser Speed' },
                            { id: 'zero', icon: <ServerCrash className="text-bauhaus-yellow bg-black rounded-full p-0.5" />, text: 'No Uploads' },
                            { id: 'free', icon: <HeartHandshake className="text-bauhaus-red" />, text: '100% Private' },
                        ].map((item) => (
                            <div key={item.id} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 flex items-center justify-center border-2 border-bauhaus-black bg-white shadow-[4px_4px_0px_0px_black] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
                                    {item.icon}
                                </div>
                                <span className="font-black uppercase tracking-tighter text-sm text-bauhaus-black">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MAIN TOOLS GRID ── */}
            <BauhausSection id="tools" bgVariant="white" className="scroll-mt-20 py-32">
                <div className="text-center mb-20">
                    <BauhausBadge color="red" className="mb-4 inline-block">
                        PDF TOOLS
                    </BauhausBadge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-bauhaus-black">
                        Everything you need for PDFs
                    </h2>
                    <p className="text-xl text-gray-600 font-bold uppercase tracking-widest opacity-80">
                        30+ free tools. No uploads. No limits.
                    </p>
                </div>

                {/* Bauhaus Search Bar */}
                <div className="flex justify-center mb-16 px-4">
                    <div className="relative group max-w-2xl w-full">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="SEARCH FROM 30+ PDF TOOLS..."
                            className="w-full pl-6 pr-16 py-5 bg-white border-4 border-bauhaus-black shadow-bauhaus focus:outline-none focus:ring-0 focus:shadow-[8px_8px_0px_0px_black] transition-all font-black uppercase tracking-widest text-lg placeholder:text-gray-400"
                        />
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="p-1 hover:text-bauhaus-red transition-colors">
                                    <X size={24} />
                                </button>
                            )}
                            <Search size={28} className="text-bauhaus-black" />
                        </div>
                    </div>
                </div>

                {/* Category Filtering */}
                <div className="flex flex-wrap justify-center gap-4 mb-20 px-4">
                    {CATEGORIES.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={cn(
                                "px-6 py-2 font-black uppercase tracking-tighter text-sm border-2 border-bauhaus-black transition-all",
                                activeCategory === category.id
                                    ? "bg-bauhaus-black text-white shadow-none translate-x-[2px] translate-y-[2px]"
                                    : "bg-white text-bauhaus-black shadow-[4px_4px_0px_0px_black] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                            )}
                        >
                            {category.label}
                            <span className={cn(
                                "ml-2 px-2 py-0.5 text-[10px] border-2",
                                activeCategory === category.id ? "border-white bg-white text-black" : "border-bauhaus-black bg-bauhaus-black text-white"
                            )}>
                                {categoryCounts[category.id] || 0}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Tools Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <AnimatePresence mode="popLayout">
                        {displayedTools.length > 0 ? (
                            displayedTools.map((tool, index) => (
                                <motion.div
                                    layout
                                    key={tool.slug}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <BauhausCard
                                        className="h-full cursor-pointer flex flex-col group"
                                        decoration={['circle', 'square', 'triangle'][index % 3]}
                                        decorationColor={['red', 'blue', 'yellow'][index % 3]}
                                        onClick={() => router.push(`/tool/${tool.slug}`)}
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={cn(
                                                "w-14 h-14 border-2 border-bauhaus-black flex items-center justify-center transition-all group-hover:-rotate-6 shadow-[4px_4px_0px_0px_black]",
                                                index % 3 === 0 ? "bg-bauhaus-red" : index % 3 === 1 ? "bg-bauhaus-blue" : "bg-bauhaus-yellow"
                                            )}>
                                                <DynamicIcon name={tool.icon} size={28} className="text-white drop-shadow-[1px_1px_0px_black]" />
                                            </div>
                                            <ArrowUpRight size={24} className="opacity-0 group-hover:opacity-100 transition-opacity text-bauhaus-black" />
                                        </div>

                                        <h3 className="text-xl font-black uppercase tracking-tighter mb-2 group-hover:text-bauhaus-red transition-colors">
                                            {tool.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 font-medium leading-snug">
                                            {tool.shortDesc}
                                        </p>
                                    </BauhausCard>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <h3 className="text-2xl font-black uppercase tracking-tighter">No tools found matching your search.</h3>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* SEO Footer Content */}
                <div className="mt-20 pt-12 border-t-4 border-bauhaus-black text-center">
                    <p className="text-sm md:text-base text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed uppercase tracking-tighter">
                        DocShift offers a comprehensive suite of completely free online PDF tools. Whether you need to securely <strong>merge PDF</strong> files, <strong>split PDF</strong> pages, or <strong>compress PDF</strong> size, our browser-based solutions process your documents locally. Maintain absolute privacy and 100% security while you manage, edit, and convert PDF documents. No accounts, no uploads, and no limitations.
                    </p>
                </div>
            </BauhausSection>

            {/* ── FEATURES SECTION ── */}
            <BauhausSection id="features" bgVariant="yellow" className="py-32">
                <div className="text-center mb-16">
                    <BauhausBadge color="black" className="mb-4 inline-block bg-black text-white border-white">
                        WHY CHOOSE DOCSHIFT
                    </BauhausBadge>
                    <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-bauhaus-black">
                        Built for Privacy & Speed
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Zero Uploads', desc: 'Your files never leave your device. All processing happens entirely within your local browser.', icon: 'ShieldCheck', color: 'red' },
                        { title: 'Lightning Fast', desc: 'Powered by modern browser APIs for instantaneous PDF manipulation and conversion.', icon: 'Zap', color: 'blue' },
                        { title: '100% Free', desc: 'No hidden fees, no paywalls, no subscriptions. Every tool is completely available to everyone.', icon: 'Gift', color: 'black' },
                        { title: 'Universal', desc: 'Works seamlessly on Windows, Mac, Linux, iOS, and Android without installing apps.', icon: 'MonitorSmartphone', color: 'red' }
                    ].map((feat, idx) => (
                        <div key={idx} className="bg-white p-8 border-4 border-bauhaus-black shadow-bauhaus hover:-translate-y-2 transition-transform">
                            <div className={cn(
                                "w-12 h-12 flex items-center justify-center border-2 border-bauhaus-black mb-6 shadow-[4px_4px_0px_0px_black]",
                                feat.color === 'red' ? "bg-bauhaus-red text-white" : feat.color === 'blue' ? "bg-bauhaus-blue text-white" : "bg-bauhaus-black text-white"
                            )}>
                                <DynamicIcon name={feat.icon} size={24} />
                            </div>
                            <h4 className="text-xl font-black uppercase tracking-tighter mb-3">{feat.title}</h4>
                            <p className="text-sm font-medium text-gray-700 leading-relaxed">{feat.desc}</p>
                        </div>
                    ))}
                </div>
            </BauhausSection>

            {/* ── ABOUT SECTION ── */}
            <BauhausSection id="about" bgVariant="blue" className="py-32 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <BauhausBadge color="yellow" className="mb-6 inline-block">
                        OUR MISSION
                    </BauhausBadge>
                    <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8 leading-tight">
                        We believe that document privacy is a fundamental right.
                    </h3>
                    <div className="space-y-6 text-lg md:text-xl font-medium leading-relaxed opacity-90 mb-12">
                        <p>
                            DocShift was created to solve a massive problem: almost every free online PDF tool forces you to upload your sensitive documents to unverified servers.
                        </p>
                        <p>
                            By leveraging modern browser technologies, we brought the processing power of local offline tools directly to your web browser. You get the ultra-convenience of an elegant web app with the strict offline security that guarantees your files never leave your device.
                        </p>
                    </div>
                    <BauhausButton
                        variant="yellow"
                        className="text-xl px-12 py-5"
                        onClick={() => {
                            const toolsEl = document.getElementById('tools');
                            if (toolsEl) toolsEl.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        EXPLORE TOOLS
                    </BauhausButton>
                </div>
            </BauhausSection>
        </div>
    );
}

export default memo(HomePage);
