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
    <main className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <div className="section-container text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill mb-6 animate-fade-up
            bg-pdfkit-soft dark:bg-pdfkit-dark shadow-skeuo-inset dark:shadow-skeuo-inset-dark
            text-xs font-semibold text-pdfkit-dark dark:text-white border border-white/30 dark:border-white/5">
            <span>🔒</span>
            <span>Free · Secure · No signup required</span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-extrabold
            text-4xl sm:text-5xl md:text-6xl
            text-pdfkit-dark dark:text-white
            max-w-3xl mx-auto mb-5
            animate-fade-up stagger-2 drop-shadow-sm">
            Every PDF Tool
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-pdfkit-red to-pdfkit-reddark drop-shadow-sm">You'll Ever Need</span>
          </h1>

          {/* Sub */}
          <p className="text-base sm:text-lg text-pdfkit-dark/70 dark:text-white/60
            max-w-xl mx-auto mb-10 animate-fade-up stagger-3 font-medium">
            Merge, split, compress, convert, and secure your PDFs in seconds.
            21 powerful tools, completely free.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-4 flex-wrap
            animate-fade-up stagger-4">
            <a href="#tools" className="btn-primary">
              Explore Tools
              <ArrowRight size={18} strokeWidth={2.5} />
            </a>
            <a href="#features" className="btn-secondary">
              Learn More
            </a>
          </div>

          {/* Quick tool shortcuts */}
          <div className="flex items-center justify-center gap-3 mt-10 flex-wrap
            animate-fade-up stagger-5">
            {['merge-pdf', 'compress-pdf', 'pdf-to-word', 'jpg-to-pdf'].map(slug => {
              const tool = TOOLS.find(t => t.slug === slug)
              if (!tool) return null
              return (
                <Link
                  key={slug}
                  to={`/tool/${slug}`}
                  className="text-xs font-bold text-pdfkit-dark/70 dark:text-white/70
                    px-4 py-2 rounded-pill
                    bg-pdfkit-soft dark:bg-[#252540]
                    shadow-skeuo-up dark:shadow-skeuo-up-dark
                    border border-white/50 dark:border-white/5
                    hover:text-pdfkit-red dark:hover:text-pdfkit-red
                    active:shadow-skeuo-down dark:active:shadow-skeuo-down-dark
                    transition-all duration-200"
                >
                  {tool.name}
                </Link>
              )
            })}
            <span className="text-xs font-bold text-pdfkit-dark/50 dark:text-white/40 px-2">+ 17 more</span>
          </div>
        </div>
      </section>

      {/* ─── Trust strip ─── */}
      <TrustStrip />

      {/* ─── Tool grid ─── */}
      <section id="tools" className="py-20 sm:py-24">
        <div className="section-container">
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-end
            justify-between gap-6 mb-10">
            <div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl
                text-pdfkit-dark dark:text-white mb-2 drop-shadow-sm">
                All PDF Tools
              </h2>
              <p className="text-pdfkit-dark/60 dark:text-white/50 font-medium">
                {TOOLS.length} tools · 100% free · No account needed
              </p>
            </div>
            <FilterTabs
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
            gap-6">
            {filteredTools.map((tool, i) => (
              <ToolCard key={tool.slug} tool={tool} index={i} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-20 font-medium text-pdfkit-dark/50 dark:text-white/40">
              No tools found in this category.
            </div>
          )}
        </div>
      </section>

      {/* ─── Features ─── */}
      <section id="features" className="py-20 sm:py-24 relative">
        {/* Physical Divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-white/50 dark:bg-white/5 shadow-sm" />
        <div className="absolute top-px left-0 right-0 h-px bg-black/5 dark:bg-black/20" />

        <div className="section-container">
          <div className="text-center mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl
              text-pdfkit-dark dark:text-white mb-4 drop-shadow-sm">
              Why Choose PDFKit?
            </h2>
            <p className="text-pdfkit-dark/70 dark:text-white/60 max-w-md mx-auto font-medium">
              Built for speed, privacy, and ease of use on any device.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon
              return (
                <div
                  key={feat.title}
                  className={`card p-8 animate-fade-up stagger-${i + 1} flex flex-col items-center text-center`}
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6
                      shadow-skeuo-inset dark:shadow-skeuo-inset-dark bg-pdfkit-soft dark:bg-[#1A1A2E]"
                  >
                    <Icon size={28} style={{ color: feat.color }} strokeWidth={2.5} className="drop-shadow-sm" />
                  </div>
                  <h3 className="font-display font-bold text-lg
                    text-pdfkit-dark dark:text-white mb-3">
                    {feat.title}
                  </h3>
                  <p className="text-pdfkit-dark/70 dark:text-white/60 font-medium leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA Banner ─── */}
      <section className="py-20 sm:py-28">
        <div className="section-container">
          <div className="rounded-card p-12 sm:p-16 text-center
            relative overflow-hidden
            bg-gradient-to-br from-pdfkit-redlight to-pdfkit-reddark
            shadow-skeuo-up border border-pdfkit-redlight/50">
            {/* Background decoration */}
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full
              bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full
              bg-black/10 blur-2xl pointer-events-none" />

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl
              text-white mb-5 relative drop-shadow-md">
              Start using PDFKit today
            </h2>
            <p className="text-white/90 mb-10 max-w-lg mx-auto relative font-medium text-lg drop-shadow-sm">
              No sign up. No watermarks. No limits. Just powerful PDF tools.
            </p>
            <a
              href="#tools"
              className="inline-flex items-center gap-3
                bg-white text-pdfkit-reddark font-bold text-lg
                px-10 py-4 rounded-btn
                shadow-skeuo-up hover:-translate-y-1 hover:brightness-105
                active:translate-y-0 active:shadow-skeuo-down active:brightness-95
                transition-all duration-200 relative"
            >
              Get Started Free
              <ArrowRight size={20} strokeWidth={3} />
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
