import { getToolBySlug, TOOLS } from '@/utils/tools';
import Link from 'next/link';
import { NeumorphicCard } from '@/components/ui/IndustrialComponents';

export default function ToolSEOContent({ toolSlug }) {
    const tool = getToolBySlug(toolSlug);
    if (!tool) return null;

    // Tight gap to the "Last updated" line when it renders; otherwise the usual
    // spacing straight into the next heading.
    const articleMarginClass = tool.updated ? 'mb-2' : 'mb-8';

    return (
        <>
            {/* SEO Rich Content Section */}
            <section className="mb-8 w-full text-left font-suisseintl">
                <h2 className="font-suisseintlcond font-bold text-xl uppercase mb-4 text-[#000000]">
                    How to use {tool.name}
                </h2>
                <ol className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-8 space-y-2 list-decimal pl-5 [&_strong]:text-[#000000] [&_strong]:font-semibold">
                    {tool.steps && tool.steps.length > 0 ? (
                        tool.steps.map((step, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: step }} />
                        ))
                    ) : (
                        <>
                            <li>Open the <strong>{tool.name}</strong> tool above and add your file{tool.multiple ? 's' : ''} — drag &amp; drop or click to browse.</li>
                            <li>Adjust the available options (page order, ranges, or settings) to fit what you need.</li>
                            <li>Click <strong>Process {tool.name}</strong> to run the conversion.</li>
                            <li>Download your finished file. Your upload is deleted from our server right after processing.</li>
                        </>
                    )}
                </ol>
                {tool.seoArticle ? (
                    <div
                        className={`text-xs sm:text-sm text-[#444444] leading-relaxed ${articleMarginClass} space-y-4 [&_a]:text-[#000000] [&_a]:font-bold [&_a]:underline [&_a]:hover:opacity-80`}
                        dangerouslySetInnerHTML={{ __html: tool.seoArticle }}
                    />
                ) : (
                    <p className={`text-xs sm:text-sm text-[#444444] leading-relaxed ${articleMarginClass}`}>
                        Use our free online tool to {tool.name.toLowerCase()} instantly. Load your file above and let our secure client-side processor execute it locally. No installation required.
                    </p>
                )}
                {tool.updated && (
                    <p className="text-[10px] text-[#888888] mb-8">
                        Last updated: {new Date(`${tool.updated}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
                    </p>
                )}

                <h2 className="font-suisseintlcond font-bold text-lg uppercase mb-3 text-[#000000]">
                    Why use DocShift?
                </h2>
                <p className="text-xs sm:text-sm text-[#444444] leading-relaxed mb-10">
                    DocShift deletes your file from our server the moment processing finishes — nothing is stored, logged, or shared. There&apos;s nothing to install and no sign-up: your document is ready in seconds.
                </p>

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
                                    <p
                                        className="text-xs sm:text-sm text-[#444444] leading-relaxed [&_a]:text-[#000000] [&_a]:font-bold [&_a]:underline [&_a]:hover:opacity-80"
                                        dangerouslySetInnerHTML={{ __html: faq.a }}
                                    />
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
