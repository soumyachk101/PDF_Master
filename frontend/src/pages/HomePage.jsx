import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Shield, Smartphone, ArrowRight } from 'lucide-react'
import ToolCard from '../components/ToolCard'
import FilterTabs from '../components/FilterTabs'
import TrustStrip from '../components/TrustStrip'
import { TOOLS, getToolsByCategory } from '../utils/tools'

const FEATURES = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    desc: 'All PDF operations complete in seconds — no waiting, no queue.',
    color: '#F59E0B',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    desc: 'Files are encrypted in transit and deleted immediately after processing.',
    color: '#22C55E',
  },
  {
    icon: Smartphone,
    title: 'Works Everywhere',
    desc: 'Fully responsive. Use on desktop, tablet, or mobile with no app required.',
    color: '#3B82F6',
  },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTools = useMemo(
    () => getToolsByCategory(activeCategory),
    [activeCategory]
  )

  return (
    <main className="min-h-screen relative overflow-hidden">

      {/* ─── Hero ─── */}
      <section className="relative pt-32 pb-16 sm:pt-44 sm:pb-24">
        {/* Animated background glows specific to hero */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-gradientStart/20 blur-[120px] rounded-full pointer-events-none animate-pulse-glow" />

        <div className="section-container text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill mb-8 animate-fade-up glass border border-white/20">
            <span>🔒</span>
            <span className="text-xs font-bold text-ink-primary dark:text-white tracking-wide uppercase">Free &middot; Secure &middot; No signup required</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black
            text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-tight
            text-ink-primary dark:text-white
            max-w-4xl mx-auto mb-6
            animate-fade-up stagger-2">
            Every PDF Tool
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-gradientStart via-primary to-primary-gradientEnd pr-2">You'll Ever Need</span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-ink-secondary dark:text-ink-muted
            max-w-2xl mx-auto mb-12 animate-fade-up stagger-3 font-medium">
            Merge, split, compress, convert, and secure your PDFs in seconds. <br className="hidden sm:block" />
            21 powerful tools, completely free.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap
            animate-fade-up stagger-4">
            <a href="#tools" className="btn-primary text-lg px-8 py-4">
              Explore Tools
              <ArrowRight size={20} strokeWidth={2.5} />
            </a>
            <a href="#features" className="btn-secondary text-lg px-8 py-4">
              Learn More
            </a>
          </div>

          {/* Quick tool shortcuts */}
          <div className="flex items-center justify-center gap-3 mt-12 flex-wrap
            animate-fade-up stagger-5">
            {['merge-pdf', 'compress-pdf', 'pdf-to-word', 'jpg-to-pdf'].map(slug => {
              const tool = TOOLS.find(t => t.slug === slug)
              if (!tool) return null
              return (
                <Link
                  key={slug}
                  to={`/tool/${slug}`}
                  className="text-sm font-semibold text-ink-primary dark:text-white
                    px-5 py-2.5 rounded-full
                    glass shadow-glass border border-white/20
                    hover:border-primary-light/50 hover:shadow-glass-hover
                    hover:-translate-y-0.5
                    active:translate-y-0 active:scale-95
                    transition-all duration-300"
                >
                  {tool.name}
                </Link>
              )
            })}
            <span className="text-sm font-semibold text-ink-muted px-2 pt-1">+ 17 more</span>
          </div>
        </div>
      </section>

      {/* ─── Trust strip ─── */}
      <div className="relative z-10">
        <TrustStrip />
      </div>

      {/* ─── Tool grid ─── */}
      <section id="tools" className="py-24 relative z-10">
        <div className="section-container">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end
            justify-between gap-8 mb-12">
            <div>
              <h2 className="font-display font-black text-4xl sm:text-5xl
                text-ink-primary dark:text-white mb-4 tracking-tight">
                All PDF Tools
              </h2>
              <p className="text-ink-secondary dark:text-ink-muted text-lg font-medium">
                {TOOLS.length} tools &middot; 100% free &middot; No account needed
              </p>
            </div>
            <FilterTabs
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-6 sm:gap-8">
            {filteredTools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-24 font-semibold text-ink-muted text-lg">
              No tools found in this category.
            </div>
          )}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-24 relative z-10">
        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="font-display font-black text-4xl sm:text-5xl
              text-ink-primary dark:text-white mb-6 tracking-tight">
              Why Choose PDFKit?
            </h2>
            <p className="text-ink-secondary dark:text-ink-muted text-lg max-w-2xl mx-auto font-medium">
              Built for speed, privacy, and an unmatched user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className={`card p-10 animate-fade-up stagger-${i + 1} flex flex-col items-center text-center`}
                >
                  <div
                    className="w-20 h-20 rounded-[20px] flex items-center justify-center mb-8
                      glass shadow-glass border border-white/20"
                    style={{
                      boxShadow: `0 8px 32px 0 ${feat.color}20`,
                      background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))`
                    }}
                  >
                    <Icon size={32} style={{ color: feat.color }} strokeWidth={2.5} className="drop-shadow-md" />
                  </div>
                  <h3 className="font-display font-bold text-2xl
                    text-ink-primary dark:text-white mb-4">
                    {feat.title}
                  </h3>
                  <p className="text-ink-secondary dark:text-ink-muted font-medium text-lg leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-24 relative z-10">
        <div className="section-container">
          <div className="glass !rounded-[40px] p-12 sm:p-20 text-center
            relative overflow-hidden border border-primary/20
            shadow-[0_20px_60px_-15px_rgba(139,92,246,0.3)]">

            {/* Background mesh in CTA */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-gradientStart/20 to-primary-gradientEnd/20 z-0" />
            <div className="absolute -top-[200px] -right-[200px] w-[500px] h-[500px] rounded-full bg-primary-gradientEnd/30 blur-[100px] z-0 pointer-events-none" />
            <div className="absolute -bottom-[200px] -left-[200px] w-[500px] h-[500px] rounded-full bg-primary-gradientStart/30 blur-[100px] z-0 pointer-events-none" />

            <div className="relative z-10">
              <h2 className="font-display font-black text-4xl sm:text-6xl
                text-ink-primary dark:text-white mb-6 tracking-tight">
                Ready to get started?
              </h2>
              <p className="text-ink-secondary dark:text-ink-muted mb-12 max-w-xl mx-auto font-medium text-xl">
                No sign up. No watermarks. No limits. Just beautiful PDF tools.
              </p>
              <a
                href="#tools"
                className="btn-primary text-xl px-12 py-5 shadow-glow-primary hover:shadow-glow-primary-hover"
              >
                Start Using PDFKit Free
                <ArrowRight size={24} strokeWidth={3} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
