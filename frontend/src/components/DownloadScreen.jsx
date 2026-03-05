import { Download, RotateCcw, TrendingDown, CheckCircle2 } from 'lucide-react'
import { formatSize, reductionPercent } from '../utils/format'

export default function DownloadScreen({ result, toolName, onReset }) {
  const { url, filename, size, originalSize } = result
  const reduction = reductionPercent(originalSize, size)
  const showReduction = reduction > 0 && reduction < 100

  return (
    <div className="max-w-[500px] mx-auto text-center py-20 px-8 glass rounded-[32px] animate-fade-in relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-green-500/20 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/20 blur-[80px] rounded-full pointer-events-none" />

      {/* Success icon */}
      <div className="w-24 h-24 mx-auto mb-10 rounded-full flex items-center justify-center animate-bounce-in glass border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.3)] relative z-10">
        <CheckCircle2 size={48} className="text-green-500" strokeWidth={2.5} />
      </div>

      <h2 className="font-display font-black text-4xl mb-3 text-ink-primary dark:text-white tracking-tight relative z-10">
        Your file is ready!
      </h2>

      {/* File stats */}
      <div className="flex items-center justify-center gap-3 mb-8 flex-wrap relative z-10">
        <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl glass text-ink-primary dark:text-white border border-white/10 shadow-glass">
          {formatSize(size)}
        </span>
        {showReduction && (
          <span className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-xl glass text-green-600 dark:text-green-400 border border-green-500/20 shadow-[0_4px_12px_rgba(34,197,94,0.15)] bg-green-500/10">
            <TrendingDown size={16} strokeWidth={2.5} />
            {reduction}% smaller
          </span>
        )}
      </div>

      {/* File name card */}
      <div className="px-6 py-5 mb-8 text-left rounded-2xl glass border border-white/20 shadow-glass relative z-10 bg-surface/50 dark:bg-surface-dark/50">
        <p className="font-display font-bold text-base truncate text-ink-primary dark:text-white">
          {filename}
        </p>
      </div>

      {/* Download button */}
      <a
        href={url}
        download={filename}
        className="btn-primary w-full py-4 text-xl mb-4 flex items-center justify-center gap-3 shadow-glow-primary hover:shadow-glow-primary-hover relative z-10"
      >
        <Download size={24} strokeWidth={2.5} />
        Download File
      </a>

      {/* Reset */}
      <button
        onClick={onReset}
        className="w-full py-4 text-base font-bold text-ink-secondary dark:text-ink-muted hover:text-primary dark:hover:text-primary transition-colors flex items-center justify-center gap-2 relative z-10 glass rounded-xl border border-transparent hover:border-white/10 hover:bg-white/5"
      >
        <RotateCcw size={18} strokeWidth={2.5} />
        Process another file
      </button>

      <p className="text-xs font-bold uppercase tracking-widest mt-10 text-ink-muted/50 relative z-10">
        Files are automatically deleted after processing
      </p>
    </div>
  )
}
