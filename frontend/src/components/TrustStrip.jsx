const TRUST_ITEMS = [
  { icon: '🔐', text: '256-bit SSL encryption' },
  { icon: '⚡', text: 'Processed in seconds' },
  { icon: '🗑️', text: 'Auto-deleted after download' },
  { icon: '📱', text: 'Works on all devices' },
  { icon: '🆓', text: '100% free to use' },
]

export default function TrustStrip() {
  return (
    <div className="border-y border-border dark:border-border-dark
      bg-surface dark:bg-surface-dark py-4">
      <div className="section-container">
        <div className="flex items-center justify-center gap-4 sm:gap-8
          flex-wrap text-sm text-ink-secondary dark:text-ink-muted">
          {TRUST_ITEMS.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <span>{item.icon}</span>
              <span className="hidden sm:inline">{item.text}</span>
              {i < TRUST_ITEMS.length - 1 && (
                <span className="hidden sm:inline text-border dark:text-border-dark ml-4">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
