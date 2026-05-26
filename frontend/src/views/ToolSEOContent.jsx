import { getToolBySlug, TOOLS } from '@/utils/tools';
import Link from 'next/link';
import { NeumorphicCard } from '@/components/ui/IndustrialComponents';

export default function ToolSEOContent({ toolSlug }) {
    const tool = getToolBySlug(toolSlug);
    if (!tool) return null;

    return (
        <>
            {/* SEO Rich Content Section */}
            <section className="mb-8 w-full text-left font-suisseintl">
                <h2 className="font-suisseintlcond font-bold text-xl uppercase mb-4 text-[#000000]">
                    How to {tool.name}
                </h2>
                {tool.seoArticle ? (
                    <div
                        className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-10 space-y-4 [&_a]:text-[#000000] [&_a]:font-bold [&_a]:underline [&_a]:hover:opacity-80"
                        dangerouslySetInnerHTML={{ __html: tool.seoArticle }}
                    />
                ) : (
                    <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-10">
                        Use our free online tool to {tool.name.toLowerCase()} instantly. Load your file above and let our secure client-side processor execute it locally. No installation required.
                    </p>
                )}

                <h2 className="font-suisseintlcond font-bold text-lg uppercase mb-3 text-[#000000]">
                    Why use DocShift?
                </h2>
                <div className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-10 space-y-3.5">
                    <p>
                        <strong className="text-[#000000] font-semibold">100% Private &amp; Secure:</strong> We take your document privacy seriously. Files are never stored or transmitted, ensuring your data remains completely secure on your own local hardware.
                    </p>
                    <p>
                        <strong className="text-[#000000] font-semibold">Blazing Fast:</strong> Forget heavy desktop software. Process your documents in absolute seconds directly from your web browser.
                    </p>
                    <p>
                        <strong className="text-[#000000] font-semibold">Zero Installation:</strong> No downloads, no plugins, no sign-ups. Everything runs right in the browser.
                    </p>
                </div>

                {/* FAQ Section */}
                {tool.faqs && tool.faqs.length > 0 && (
                    <>
                        <div className="border-t border-[#000000]/10 my-8" />
                        <h2 className="font-suisseintlcond font-bold text-lg uppercase mb-5 mt-6 text-[#000000]">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {tool.faqs.map((faq, index) => (
                                <NeumorphicCard key={index} title={`Q: ${faq.q}`} hoverEffect={false} className="p-6 bg-[#ffffff] border border-[#000000] rounded-[32px]">
                                    <p className="text-xs sm:text-sm text-[#444444] leading-relaxed">{faq.a}</p>
                                </NeumorphicCard>
                            ))}
                        </div>
                    </>
                )}

                {/* Related Tools */}
                <div className="border-t border-[#000000]/10 my-8" />
                <h2 className="font-suisseintlcond font-bold text-lg uppercase mb-5 mt-6 text-[#000000]">
                    Related Tools
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {TOOLS.filter(t => t.category === tool.category && t.slug !== tool.slug)
                        .slice(0, 8)
                        .map((relatedTool) => (
                            <Link
                                key={relatedTool.slug}
                                href={`/tool/${relatedTool.slug}`}
                                className="h-10 rounded-none border border-[#000000]/15 bg-[#ffffff] flex items-center justify-center px-3 text-xs font-bold text-[#444444] hover:text-[#000000] hover:border-[#000000] hover:bg-[#f3f3f3] transition-all duration-150 truncate text-center"
                            >
                                {relatedTool.name}
                            </Link>
                        ))}
                </div>
            </section>
        </>
    );
}
