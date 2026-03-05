import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function ToolOptions({ options, values, onChange }) {
  return (
    <div className="card p-5 space-y-5">
      <h4 className="font-display font-semibold text-sm text-ink-primary dark:text-white">
        Options
      </h4>
      {options.map(opt => {
        const show = !opt.dependsOn || values[opt.dependsOn.key] === opt.dependsOn.value
        if (!show) return null

        return (
          <OptionField
            key={opt.key}
            option={opt}
            value={values[opt.key] ?? opt.defaultValue ?? ''}
            onChange={val => onChange(opt.key, val)}
          />
        )
      })}
    </div>
  )
}

function OptionField({ option, value, onChange }) {
  const [showPw, setShowPw] = useState(false)

  const labelClass = "block text-sm font-medium text-ink-secondary dark:text-ink-muted mb-2"
  const inputClass = `w-full bg-surface dark:bg-surface-deeper border border-border
    dark:border-border-dark rounded-btn px-3.5 py-2.5 text-sm
    text-ink-primary dark:text-white placeholder-ink-muted
    focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20
    transition-colors`

  if (option.type === 'radio') {
    const grid = option.choices.length > 3 ? 'grid-cols-3' : 'grid-cols-' + option.choices.length
    return (
      <div>
        <span className={labelClass}>{option.label}</span>
        <div className={`grid ${grid} gap-2`}>
          {option.choices.map(c => (
            <button
              key={c.value}
              type="button"
              onClick={() => onChange(c.value)}
              className={`px-3 py-2 rounded-btn text-xs font-medium border transition-all
                ${value === c.value
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface dark:bg-surface-dark border-border dark:border-border-dark text-ink-secondary dark:text-ink-muted hover:border-primary hover:text-primary'
                }`}
            >
              <span className="block">{c.label}</span>
              {c.hint && (
                <span className={`text-[10px] ${value === c.value ? 'text-white/70' : 'text-ink-muted'}`}>
                  {c.hint}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    )
  }

  if (option.type === 'select') {
    return (
      <div>
        <label className={labelClass}>{option.label}</label>
        <select
          value={value}
          onChange={e => onChange(e.target.value)}
          className={inputClass}
        >
          {option.choices.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>
    )
  }

  if (option.type === 'range') {
    return (
      <div>
        <div className="flex justify-between mb-2">
          <span className={labelClass + ' mb-0'}>{option.label}</span>
          <span className="text-sm font-semibold text-primary">
            {value}{option.unit}
          </span>
        </div>
        <input
          type="range"
          min={option.min}
          max={option.max}
          step={option.step || 1}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-ink-muted mt-1">
          <span>{option.min}{option.unit}</span>
          <span>{option.max}{option.unit}</span>
        </div>
      </div>
    )
  }

  if (option.type === 'password') {
    return (
      <div>
        <label className={labelClass}>{option.label}</label>
        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={option.placeholder}
            className={inputClass + ' pr-10'}
          />
          <button
            type="button"
            onClick={() => setShowPw(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2
              text-ink-muted hover:text-ink-secondary transition-colors"
          >
            {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>
    )
  }

  if (option.type === 'number') {
    return (
      <div>
        <label className={labelClass}>{option.label}</label>
        <input
          type="number"
          min={option.min}
          max={option.max}
          value={value}
          onChange={e => onChange(e.target.value)}
          className={inputClass + ' w-32'}
        />
      </div>
    )
  }

  // Default: text input
  return (
    <div>
      <label className={labelClass}>{option.label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={option.placeholder}
        className={inputClass}
      />
    </div>
  )
}
