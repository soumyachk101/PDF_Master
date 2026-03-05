import { Loader2 } from 'lucide-react'

export default function ProcessingScreen({ progress, fileName }) {
  const radius = 60
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="max-w-[500px] mx-auto text-center py-20 px-8 glass rounded-[32px] animate-fade-in relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 blur-[60px] rounded-full" />

      <div className="relative w-40 h-40 mx-auto mb-10">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
          <circle
            cx="70" cy="70" r={radius}
            className="stroke-surface-dark/10 dark:stroke-white/10"
            strokeWidth="8" fill="none"
          />
          <circle
            cx="70" cy="70" r={radius}
            className="stroke-primary drop-shadow-[0_0_12px_rgba(139,92,246,0.6)] transition-all duration-300 ease-out"
            strokeWidth="8" fill="none"
            strokeLinecap="round"
            style={{ strokeDasharray: circumference, strokeDashoffset }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {progress < 100 ? (
            <span className="font-display font-black text-3xl text-ink-primary dark:text-white">
              {Math.round(progress)}%
            </span>
          ) : (
            <Loader2 size={36} className="text-primary animate-spin" strokeWidth={2.5} />
          )}
        </div>
      </div>

      <h3 className="font-display font-bold text-2xl
        text-ink-primary dark:text-white mb-3 relative z-10">
        {progress < 100 ? 'Processing your file...' : 'Almost there...'}
      </h3>
      <p className="text-base font-medium text-ink-secondary dark:text-ink-muted truncate max-w-[280px] mx-auto relative z-10">
        {fileName || 'Hang tight!'}
      </p>
    </div>
  )
}
