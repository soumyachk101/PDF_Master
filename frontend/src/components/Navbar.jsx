import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, Menu, X, FileText } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Tools', href: '/#tools' },
  { label: 'Features', href: '/#features' },
]

export default function Navbar({ darkMode, toggleDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300
          ${scrolled ? 'glass' : 'bg-transparent'}`}
      >
        <div className="section-container h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-black text-xl
              tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-[10px] bg-gradient-to-br from-primary-gradientStart to-primary-gradientEnd flex items-center justify-center shadow-glow-primary">
              <FileText size={16} className="text-white" strokeWidth={2.5} />
            </div>
            <span>
              <span className="text-primary">PDF</span>
              <span className="text-ink-primary dark:text-white">Kit</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-ink-secondary dark:text-ink-muted
                  hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDark}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-10 h-10 rounded-full glass
                flex items-center justify-center
                hover:border-primary hover:text-primary
                transition-all duration-300 hover:shadow-glow-primary"
            >
              {darkMode
                ? <Sun size={18} className="text-primary-light" />
                : <Moon size={18} className="text-ink-secondary hover:text-primary" />
              }
            </button>

            <Link
              to="/"
              className="hidden md:inline-flex btn-primary text-sm px-5 py-2.5"
            >
              Get Started
            </Link>

            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden w-10 h-10 flex items-center justify-center
                rounded-btn text-ink-secondary dark:text-white glass"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-20 left-4 right-4 glass rounded-2xl
            p-4 space-y-2 animate-bounce-in shadow-glass">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block p-3 text-base font-semibold text-ink-primary dark:text-white
                  rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <Link to="/" className="btn-primary w-full text-sm py-3">
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
