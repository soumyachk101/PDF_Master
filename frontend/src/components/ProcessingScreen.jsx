export default function ProcessingScreen({ progress = 0, fileName }) {
  const circumference = 2 * Math.PI * 36

  return (
    <div className="max-w-[460px] mx-auto text-center py-16 animate-fade-in">
      {/* Circular progress - skeuo raised ring */}
      <div
        className="relative w-32 h-32 mx-auto mb-8 rounded-full"
        style={{
          background: 'linear-gradient(135deg, #f0f0f4 0%, #e0e0e5 100%)',
          boxShadow: '8px 8px 16px rgba(0,0,0,0.15), -8px -8px 16px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.4)',
        }}
      >
        <svg viewBox="0 0 88 88" className="w-32 h-32 -rotate-90">
          {/* Track */}
          <circle
            cx="44" cy="44" r="36"
            fill="none"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="6"
          />
          {/* Progress */}
          <circle
            cx="44" cy="44" r="36"
            fill="none"
            stroke="url(#redGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress / 100)}
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
          <defs>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F48C84" />
              <stop offset="100%" stopColor="#C84439" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-display font-black text-xl"
            style={{ color: '#C84439' }}
          >
            {progress}%
          </span>
        </div>
      </div>

      <h3
        className="font-display font-extrabold text-2xl mb-3"
        style={{ color: '#1A1A2E' }}
      >
        Processing your file…
      </h3>

      {fileName && (
        <p
          className="font-mono text-sm truncate max-w-xs mx-auto mb-6 px-4 py-1 rounded-lg"
          style={{
            color: '#555570',
            background: 'rgba(0,0,0,0.04)',
            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.06), inset -2px -2px 4px rgba(255,255,255,0.8)',
          }}
        >
          {fileName}
        </p>
      )}

      {/* Linear progress bar - inset tray */}
      <div
        className="w-full max-w-xs mx-auto rounded-full h-3 overflow-hidden mb-3"
        style={{
          background: 'rgba(0,0,0,0.06)',
          boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.12), inset -2px -2px 5px rgba(255,255,255,0.8)',
        }}
      >
        <div
          className="h-full rounded-full transition-all duration-400 ease-out"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(to right, #F48C84, #C84439)',
            boxShadow: '0 1px 3px rgba(200,68,57,0.4)',
          }}
        />
      </div>

      <p
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: 'rgba(0,0,0,0.25)' }}
      >
        Please don't close this tab
      </p>
    </div>
  )
}
