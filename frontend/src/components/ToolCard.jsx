import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import * as Icons from 'lucide-react'

export default function ToolCard({ tool, index = 0 }) {
  const Icon = Icons[tool.icon] || Icons.FileText
  const staggerClass = `stagger-${Math.min(index + 1, 12)}`

  return (
    <Link
      to={`/tool/${tool.slug}`}
      className={`group relative card card-hover p-6 sm:p-7 flex flex-col gap-4
        cursor-pointer animate-fade-up ${staggerClass}`}
    >
      {/* Icon Component */}
      <div className="flex items-center justify-between">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0
            shadow-skeuo-inset dark:shadow-skeuo-inset-dark transition-transform group-hover:scale-105"
          style={{ backgroundColor: `${tool.color}15` }}
        >
          <Icon size={26} style={{ color: tool.color }} strokeWidth={2} className="drop-shadow-sm" />
        </div>

        {/* Arrow indicator */}
        <div className="w-8 h-8 rounded-full flex items-center justify-center
          bg-pdfkit-soft dark:bg-[#1A1A2E] shadow-skeuo-up dark:shadow-skeuo-up-dark
          opacity-0 group-hover:opacity-100 -translate-x-4
          group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight size={16} className="text-pdfkit-red" strokeWidth={2.5} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 mt-2">
        <h3 className="font-display font-bold text-lg text-pdfkit-dark dark:text-white
          mb-2 group-hover:text-pdfkit-red dark:group-hover:text-pdfkit-red transition-colors">
          {tool.name}
        </h3>
        <p className="text-sm font-medium text-pdfkit-dark/60 dark:text-white/50 leading-relaxed
          line-clamp-2">
          {tool.desc}
        </p>
      </div>

      {/* Hover border accent */}
      <div
        className="absolute inset-x-0 bottom-0 h-0.5 rounded-b-card
          scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ backgroundColor: tool.color }}
      />
    </Link>
  )
}
