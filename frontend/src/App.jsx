import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ToolPage from './pages/ToolPage'
import NotFoundPage from './pages/NotFoundPage'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  const [dark, setDark] = useState(() => {
    const stored = localStorage.getItem('pdfkit-theme')
    if (stored) return stored === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('pdfkit-theme', dark ? 'dark' : 'light')
  }, [dark])

  const toggleDark = () => setDark(prev => !prev)

  return (
    <div className="min-h-screen bg-white dark:bg-bg-dark font-body
      transition-colors duration-300">
      <ScrollToTop />
      <Navbar darkMode={dark} toggleDark={toggleDark} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tool/:toolSlug" element={<ToolPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
