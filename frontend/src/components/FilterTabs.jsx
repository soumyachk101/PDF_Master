import { CATEGORIES } from '../utils/tools'

export default function FilterTabs({ active, onChange }) {
  return (
    <div className="glass p-1.5 rounded-full flex items-center gap-1 flex-wrap shadow-glass overflow-x-auto max-w-full no-scrollbar">
      {CATEGORIES.map(cat => {
        const isActive = active === cat.id
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className={`
              px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 select-none whitespace-nowrap
              ${isActive
                ? 'bg-gradient-to-r from-primary-gradientStart to-primary-gradientEnd text-white shadow-glow-primary scale-100'
                : 'text-ink-secondary dark:text-ink-muted hover:text-ink-primary dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 scale-95'
              }
            `}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}

