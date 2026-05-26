'use client';

import Link from 'next/link';
import { Search, Home } from 'lucide-react';
import { NeumorphicCard, NeumorphicButton } from '@/components/ui/IndustrialComponents';

const POPULAR_TOOLS = [
    { name: 'Merge PDF', slug: 'merge-pdf' },
    { name: 'Compress PDF', slug: 'compress-pdf' },
    { name: 'Word to PDF', slug: 'word-to-pdf' },
    { name: 'PDF to Word', slug: 'pdf-to-word' },
];

function NotFoundPage() {
    return (
        <div className="min-h-screen bg-[#E4EDE8] flex flex-col items-center justify-center px-4 pt-24 pb-16">
            <div className="max-w-2xl w-full text-center flex flex-col items-center">
                {/* Big 404 */}
                <h1 className="font-display font-extrabold text-[7rem] sm:text-[10rem] leading-none bg-gradient-to-r from-[#7C3AED] to-[#9F67FF] bg-clip-text text-transparent mb-2">
                    404
                </h1>
                <h2 className="font-display font-extrabold text-2xl uppercase text-[#2A3A31] mb-3">
                    Page Not Found
                </h2>
                <p className="text-sm text-[#55685C] max-w-md mx-auto mb-10 leading-relaxed">
                    The page you're looking for doesn't exist or may have been moved.
                    We offer 30+ free tools that are just a click away.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 w-full sm:w-auto">
                    <Link href="/" passHref className="w-full sm:w-auto">
                        <NeumorphicButton variant="primary" className="w-full h-12 flex items-center justify-center gap-2">
                            <Home size={16} /> Back to Home
                        </NeumorphicButton>
                    </Link>
                    <Link href="/#tools" passHref className="w-full sm:w-auto">
                        <NeumorphicButton variant="secondary" className="w-full h-12 flex items-center justify-center gap-2">
                            <Search size={16} /> Browse All Tools
                        </NeumorphicButton>
                    </Link>
                </div>

                {/* Popular Tools */}
                <NeumorphicCard className="w-full p-6" title="POPULAR TOOLS" hoverEffect={false}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
                        {POPULAR_TOOLS.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tool/${tool.slug}`}
                                className="h-10 rounded-xl bg-[#E4EDE8] shadow-soft-extruded-sm flex items-center justify-center px-3 text-xs font-semibold text-[#55685C] hover:text-[#7C3AED] hover:-translate-y-[0.5px] hover:shadow-soft-extruded transition-all duration-200 truncate focus:outline-none"
                            >
                                {tool.name}
                            </Link>
                        ))}
                    </div>
                </NeumorphicCard>
            </div>
        </div>
    );
}

export default NotFoundPage;
