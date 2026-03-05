import { CATEGORIES } from '../utils/tools'
import { useEffect, useState } from 'react'

export default function FilterTabs({ active, onChange }) {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    const obs = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const containerStyle = isDark
    ? {
      background: 'linear-gradient(135deg, #1E1E38 0%, #252548 100%)',
      boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.03)',
    }
    : {
      background: 'linear-gradient(135deg, #D8D8DC 0%, #E8E8EC 100%)',
      boxShadow: 'inset 4px 4px 8px rgba(0,0,0,0.12), inset -4px -4px 8px rgba(255,255,255,0.85)',
    }

  const inactiveStyle = isDark
    ? {
      background: 'linear-gradient(to bottom, #2E2E52, #242442)',
      color: 'rgba(255,255,255,0.55)',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.5), -1px -1px 4px rgba(255,255,255,0.04)',
    }
    : {
      background: 'linear-gradient(to bottom, #f0f0f4, #e0e0e4)',
      color: '#555570',
      boxShadow: '2px 2px 5px rgba(0,0,0,0.1), -2px -2px 5px rgba(255,255,255,0.9)',
    }

  return (
    <div
      className="flex items-center gap-2 flex-wrap p-2 rounded-2xl"
      style={containerStyle}
    >
      {CATEGORIES.map(cat => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 select-none"
          style={
            active === cat.id
              ? {
                background: 'linear-gradient(to bottom, #C84439, #E2574C)',
                color: 'white',
                boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.2), inset -1px -1px 3px rgba(255,255,255,0.15)',
                transform: 'translateY(1px)',
              }
              : inactiveStyle
          }
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}

