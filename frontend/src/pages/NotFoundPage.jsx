import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center
      bg-white dark:bg-bg-dark pt-16">
      <div className="text-center px-6">
        {/* 404 number */}
        <div className="font-display font-extrabold text-8xl sm:text-9xl
          text-primary mb-4 leading-none select-none">
          404
        </div>

        <h1 className="font-display font-bold text-2xl
          text-ink-primary dark:text-white mb-3">
          Page not found
        </h1>
        <p className="text-ink-secondary dark:text-ink-muted mb-8
          max-w-xs mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link to="/" className="btn-primary">
            <Home size={16} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-ghost"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </main>
  )
}
