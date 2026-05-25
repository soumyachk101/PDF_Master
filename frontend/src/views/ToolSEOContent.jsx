import { getToolBySlug, TOOLS } from '@/utils/tools';
import Link from 'next/link';

export default function ToolSEOContent({ toolSlug }) {
    const tool = getToolBySlug(toolSlug);
    if (!tool) return null;

    return (
        <>
            {/* SEO Rich Content Section */}
            <section className="mt-20 mb-8 w-full max-w-3xl text-left">
                <h2 className="font-display font-extrabold text-2xl mb-4 text-ink drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                    How to {tool.name}
                </h2>
                {tool.seoArticle ? (
                    <div
                        className="font-mono text-xs text-ink-secondary leading-relaxed mb-10 space-y-4"
                        dangerouslySetInnerHTML={{ __html: tool.seoArticle }}
                    />
                ) : (
                    <p className="font-mono text-xs text-ink-secondary leading-relaxed mb-10">
                        Use our free online tool to {tool.name.toLowerCase()} instantly. Load your file above and let our secure client-side processor execute it locally. No installation required.
                    </p>
                )}

                <h2 className="font-display font-extrabold text-lg mb-2 text-ink drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                    Why use DocShift?
                </h2>
                <div className="font-mono text-xs text-ink-secondary leading-relaxed mb-10 space-y-3">
                    <p>
                        <strong>100% Private &amp; Secure:</strong> We take your document privacy seriously. Files are never stored or transmitted, ensuring your data remains completely secure on your own local hardware.
                    </p>
                    <p>
                        <strong>Blazing Fast:</strong> Forget heavy desktop software. Process your documents in absolute seconds directly from your web browser with zero server latency.
                    </p>
                </div>

                {tool.faqs && tool.faqs.length > 0 && (
                    <div className="mt-8">
                        <h2 className="font-display font-extrabold text-lg mb-4 text-ink drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                            Frequently Asked Questions
                        </h2>
                        <div className="flex flex-col gap-4">
                            {tool.faqs.map((faq, i) => (
                                <div key={i} className="p-5 rounded-2xl bg-chassis border border-white/40 shadow-neu">
                                    <h3 className="font-mono font-bold text-xs text-ink mb-1.5 uppercase tracking-wide">{faq.q}</h3>
                                    <p className="font-mono text-[11px] leading-relaxed text-ink-secondary">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Related Tools */}
            <RelatedToolsSection currentSlug={tool.slug} currentCategory={tool.category} />
        </>
    );
}

function RelatedToolsSection({ currentSlug, currentCategory }) {
    const relatedTools = TOOLS.filter(t => t.slug !== currentSlug && t.category === currentCategory).slice(0, 4);
    if (relatedTools.length === 0) return null;

    return (
        <section className="mt-12 pt-8 border-t border-black/5 w-full max-w-3xl">
            <h2 className="font-display font-extrabold text-lg mb-6 text-center text-ink drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {relatedTools.map(related => (
                    <Link
                        key={related.slug}
                        href={`/tool/${related.slug}`}
                        className="p-4 rounded-xl bg-chassis border border-white/40 shadow-neu hover:-translate-y-0.5 hover:shadow-neu-float active:shadow-neu-pressed transition-all duration-150 block text-decoration-none"
                    >
                        <p className="font-mono font-bold text-[10px] text-ink uppercase tracking-wider mb-1">
                            {related.name}
                        </p>
                        <p className="font-mono text-[9px] text-ink-secondary leading-normal">
                            {related.shortDesc}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
