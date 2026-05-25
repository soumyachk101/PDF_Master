import { getToolBySlug, TOOLS } from '@/utils/tools';
import Link from 'next/link';

export default function ToolSEOContent({ toolSlug }) {
    const tool = getToolBySlug(toolSlug);
    if (!tool) return null;

    return (
        <>
            {/* SEO Rich Content Section */}
            <section style={{ marginTop: '5rem', marginBottom: '2rem', width: '100%', maxWidth: '800px', textAlign: 'left' }}>
                <h2 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '2rem' }}>How to {tool.name}</h2>
                {tool.seoArticle ? (
                    <p
                        style={{ color: '#404040', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}
                        dangerouslySetInnerHTML={{ __html: tool.seoArticle }}
                    />
                ) : (
                    <p style={{ color: '#404040', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                        Use our free online tool to {tool.name.toLowerCase()} instantly. Upload your file above and let our secure servers do the heavy lifting. No installation required.
                    </p>
                )}

                <h2 style={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.5rem' }}>Why use DocShift?</h2>
                <p style={{ color: '#404040', marginBottom: '2.5rem', lineHeight: 1.8, fontSize: '1.1rem' }}>
                    <strong>100% Private &amp; Secure:</strong> We take your privacy seriously. Files are never stored permanently, ensuring your data remains completely secure. No account or email required to use our tools.
                    <br /><br />
                    <strong>Blazing Fast:</strong> Forget heavy desktop software. Process your documents in absolute seconds directly from your browser with zero bloatware.
                </p>

                {tool.faqs && tool.faqs.length > 0 && (
                    <div style={{ marginTop: '0.5rem' }}>
                        <h2 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '1.5rem' }}>Frequently Asked Questions</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {tool.faqs.map((faq, i) => (
                                <div key={i} style={{ padding: '1rem', backgroundColor: '#ffffff', border: '3px solid #121212', borderRadius: '0px', boxShadow: '4px 4px 0px 0px #121212' }}>
                                    <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem', color: '#121212' }}>{faq.q}</h3>
                                    <p style={{ color: '#404040', lineHeight: 1.6, fontSize: '1.05rem' }}>{faq.a}</p>
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
        <section style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(18, 18, 18, 0.1)' }}>
            <h2 style={{ fontWeight: 800, marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>
                Related Tools
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {relatedTools.map(related => (
                    <Link
                        key={related.slug}
                        href={`/tool/${related.slug}`}
                        style={{
                            padding: '1rem',
                            borderRadius: '0px',
                            backgroundColor: '#ffffff',
                            border: '3px solid #121212',
                            boxShadow: '4px 4px 0px 0px #121212',
                            textDecoration: 'none',
                            transition: 'all 0.2s',
                        }}
                    >
                        <p style={{ fontWeight: 700, color: '#121212', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                            {related.name}
                        </p>
                        <p style={{ color: '#404040', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                            {related.shortDesc}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
