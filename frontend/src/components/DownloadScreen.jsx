import { Download, RotateCcw, TrendingDown, CheckCircle2 } from 'lucide-react'
import { formatSize, reductionPercent } from '../utils/format'

export default function DownloadScreen({ result, toolName, onReset }) {
  const { url, filename, size, originalSize } = result
  const reduction = reductionPercent(originalSize, size)
  const showReduction = reduction > 0 && reduction < 100

  return (
    <div className="max-w-[460px] mx-auto text-center py-14 animate-fade-in">
      {/* Success icon - raised physical badge */}
      <div
        className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center animate-bounce-in"
        style={{
          background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
          boxShadow: '8px 8px 16px rgba(0,0,0,0.12), -8px -8px 16px rgba(255,255,255,0.9), inset 1px 1px 3px rgba(255,255,255,0.6)',
        }}
      >
        <svg viewBox="0 0 50 50" className="w-14 h-14">
          <circle
            cx="25" cy="25" r="22"
            fill="none"
            stroke="#22C55E"
            strokeWidth="2.5"
            className="animate-draw-circle"
          />
          <polyline
            points="14,26 22,34 36,17"
            fill="none"
            stroke="#22C55E"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw-check"
          />
        </svg>
      </div>

      <h2
        className="font-display font-extrabold text-3xl mb-2"
        style={{ color: '#1A1A2E' }}
      >
        Your file is ready!
      </h2>

      {/* File stats */}
      <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
        <span
          className="inline-flex items-center gap-1 text-sm font-bold px-4 py-1.5 rounded-full"
          style={{
            background: 'linear-gradient(to bottom, #f4f4f8, #e8e8ec)',
            color: '#555570',
            boxShadow: '2px 2px 5px rgba(0,0,0,0.1), -2px -2px 5px rgba(255,255,255,0.9)',
          }}
        >
          {formatSize(size)}
        </span>
        {showReduction && (
          <span
            className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #f0fdf4, #dcfce7)',
              color: '#16a34a',
              boxShadow: '2px 2px 5px rgba(0,0,0,0.08), -2px -2px 5px rgba(255,255,255,0.9)',
            }}
          >
            <TrendingDown size={14} />
            {reduction}% smaller
          </span>
        )}
      </div>

      {/* File name card - inset tray */}
      <div
        className="px-5 py-4 mb-6 text-left rounded-2xl"
        style={{
          background: 'rgba(0,0,0,0.03)',
          boxShadow: 'inset 3px 3px 8px rgba(0,0,0,0.1), inset -3px -3px 8px rgba(255,255,255,0.85)',
          border: '1px solid rgba(255,255,255,0.6)',
        }}
      >
        <p className="font-mono text-sm font-bold truncate" style={{ color: '#1A1A2E' }}>
          {filename}
        </p>
      </div>

      {/* Download button */}
      <a
        href={url}
        download={filename}
        className="btn-primary w-full py-4 text-base mb-3 block"
      >
        <Download size={20} strokeWidth={2.5} />
        Download File
      </a>

      {/* Reset */}
      <button
        onClick={onReset}
        className="btn-ghost w-full py-3 text-sm"
      >
        <RotateCcw size={15} strokeWidth={2.5} />
        Process another file
      </button>

      <p
        className="text-xs font-bold uppercase tracking-widest mt-6"
        style={{ color: 'rgba(0,0,0,0.2)' }}
      >
        Files are automatically deleted after processing
      </p>
    </div>
  )
}
