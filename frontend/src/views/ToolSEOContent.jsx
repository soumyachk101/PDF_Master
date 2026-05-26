import { getToolBySlug, TOOLS } from '@/utils/tools';
import Link from 'next/link';
import { NeumorphicCard } from '@/components/ui/IndustrialComponents';

export default function ToolSEOContent({ toolSlug }) {
    const tool = getToolBySlug(toolSlug);
    if (!tool) return null;

    return (
        <>
            {/* SEO Rich Content Section */}
            <section className="mt-16 mb-8 w-full max-w-3xl text-left">
                <h2 className="font-display font-extrabold text-xl uppercase mb-4 text-[#2A3A31]">
                    How to {tool.name}
                </h2>
                {tool.seoArticle ? (
                    <div
                        className="text-sm text-[#55685C] leading-relaxed mb-10 space-y-4 [&_a]:text-[#7C3AED] [&_a]:font-bold [&_a]:hover:text-[#9F67FF]"
                        dangerouslySetInnerHTML={{ __html: tool.seoArticle }}
                    />
                ) : (
                    <p className="text-sm text-[#55685C] leading-relaxed mb-10">
                        Use our free online tool to {tool.name.toLowerCase()} instantly. Load your file above and let our secure client-side processor execute it locally. No installation required.
                    </p>
                )}

                <h2 className="font-display font-extrabold text-lg uppercase mb-3 text-[#2A3A31]">
                    Why use DocShift?
                </h2>
                <div className="text-sm text-[#55685C] leading-relaxed mb-10 space-y-3.5">
                    <p>
                        <strong className="text-[#2A3A31]">100% Private &amp; Secure:</strong> We take your document privacy seriously. Files are never stored or transmitted, ensuring your data remains completely secure on your own local hardware.
                    </p>
                    <p>
                        <strong className="text-[#2A3A31]">Blazing Fast:</strong> Forget heavy desktop software. Process your documents in absolute seconds directly from your web browser.
                    </p>
                    <p>
                        <strong className="text-[#2A3A31]">Zero Installation:</strong> No downloads, no plugins, no sign-ups. Everything runs right in the browser.
                    </p>
                </div>

                {/* FAQ Section */}
                {tool.faqs && tool.faqs.length > 0 && (
                    <>
                        <div className="soft-divider my-8" />
                        <h2 className="font-display font-extrabold text-lg uppercase mb-5 mt-6 text-[#2A3A31]">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-5">
                            {tool.faqs.map((faq, index) => (
                                <NeumorphicCard key={index} title={`Q: ${faq.q}`} hoverEffect={true} className="p-6">
                                    <p className="text-sm text-[#55685C] leading-relaxed">{faq.a}</p>
                                </NeumorphicCard>
                            ))}
                        </div>
                    </>
                )}

                {/* Related Tools */}
                <div className="soft-divider my-8" />
                <h2 className="font-display font-extrabold text-lg uppercase mb-5 mt-6 text-[#2A3A31]">
                    Related Tools
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug)
                        .slice(0, 6)
                        .map((relatedTool) => (
                            <Link
                                key={relatedTool.slug}
                                href={`/tool/${relatedTool.slug}`}
                                className="h-10 rounded-xl bg-[#E4EDE8] shadow-soft-extruded-sm flex items-center justify-center px-3 text-xs font-semibold text-[#55685C] hover:text-[#7C3AED] hover:-translate-y-[0.5px] hover:shadow-soft-extruded transition-all duration-200 truncate focus:outline-none focus:ring-1 focus:ring-[#7C3AED] text-center"
                            >
                                {relatedTool.name}
                            </Link>
                        ))}
                </div>
            </section>
        </>
    );
}
