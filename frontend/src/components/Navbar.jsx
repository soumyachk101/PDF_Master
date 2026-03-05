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
          ${scrolled
            ? 'bg-[#E8E8EC]/90 dark:bg-[#1A1A2E]/90 backdrop-blur-md shadow-skeuo-up dark:shadow-skeuo-up-dark border-b border-white/40 dark:border-white/5'
            : 'bg-transparent'
          }`}
      >
        <div className="section-container h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-extrabold text-xl
              tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-[8px] bg-primary flex items-center justify-center">
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
                className="text-sm font-medium text-ink-secondary dark:text-ink-muted
                  hover:text-primary dark:hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDark}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-pill bg-surface dark:bg-surface-dark
                border border-border dark:border-border-dark
                flex items-center justify-center
                hover:border-primary hover:text-primary
                transition-all duration-200"
            >
              {darkMode
                ? <Sun size={15} className="text-primary" />
                : <Moon size={15} className="text-ink-secondary" />
              }
            </button>

            <Link
              to="/"
              className="hidden md:inline-flex btn-primary text-sm px-5 py-2"
            >
              Get Started
            </Link>

            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden w-9 h-9 flex items-center justify-center
                rounded-btn text-ink-secondary dark:text-white"
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
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <nav className="absolute top-16 left-0 right-0 bg-white dark:bg-bg-dark
            border-b border-border dark:border-border-dark
            px-6 py-4 space-y-1 animate-slide-down shadow-lg">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-base font-medium text-ink-primary dark:text-white
                  border-b border-border dark:border-border-dark last:border-none
                  hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
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
