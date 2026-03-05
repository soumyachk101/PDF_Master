import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'

export default function ToolCard({ tool, index = 0 }) {
  const Icon = Icons[tool.icon] || Icons.FileText
  const staggerClass = `stagger-${Math.min(index + 1, 12)}`

  return (
    <Link
      to={`/tool/${tool.slug}`}
      className={`group relative card card-hover p-6 sm:p-8 flex flex-col gap-5
        cursor-pointer animate-fade-up overflow-hidden ${staggerClass}`}
    >
      {/* Background radial glow on hover */}
      <div
        className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: tool.color }}
      />

      {/* Icon Component */}
      <div className="flex items-center justify-between relative z-10">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
            glass transition-transform duration-300 group-hover:scale-110"
          style={{
            boxShadow: `0 4px 20px ${tool.color}20`,
            border: `1px solid ${tool.color}40`,
            backgroundColor: `${tool.color}15`
          }}
        >
          <Icon size={26} style={{ color: tool.color }} strokeWidth={2.5} />
        </div>

        {/* Arrow indicator */}
        <div className="w-10 h-10 rounded-full flex items-center justify-center
          glass
          opacity-0 group-hover:opacity-100 -translate-x-4
          group-hover:translate-x-0 transition-all duration-400 ease-out">
          <ArrowRight size={18} style={{ color: tool.color }} strokeWidth={2.5} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mt-2 relative z-10">
        <h3 className="font-display font-bold text-xl text-ink-primary dark:text-white
          mb-2 transition-colors duration-300"
          style={{ '--hover-color': tool.color }}
          onMouseEnter={(e) => e.currentTarget.style.color = tool.color}
          onMouseLeave={(e) => e.currentTarget.style.color = ''}
        >
          {tool.name}
        </h3>
        <p className="text-sm font-medium text-ink-secondary dark:text-ink-muted leading-relaxed
          line-clamp-2">
          {tool.desc}
        </p>
      </div>

      {/* Hover border accent (subtle glow instead of flat bottom border) */}
      <div
        className="absolute inset-0 rounded-card opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `inset 0 0 20px ${tool.color}15`,
          border: `1px solid ${tool.color}30`
        }}
      />
    </Link>
  )
}
