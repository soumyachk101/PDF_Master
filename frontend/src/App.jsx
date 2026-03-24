import { useState, useMemo, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Typography } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ColorModeContext } from './contexts/ColorModeContext';
import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';

import HomePage from './pages/HomePage';
const ToolPage = lazy(() => import('./pages/ToolPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const PageLoader = () => (
    <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        bgcolor: 'background.default',
        gap: 3
    }}>
        <div className="loader"></div>
        <Typography variant="body2" sx={{ 
            color: 'text.secondary', 
            fontWeight: 600, 
            letterSpacing: '2px', 
            textTransform: 'uppercase',
            fontSize: '0.75rem',
            opacity: 0.8,
            animation: 'pulseText 1.5s ease-in-out infinite'
        }}>
            Preparing PDFs
        </Typography>
        <style>
            {`
                @keyframes pulseText {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
            `}
        </style>
    </Box>
);


function ScrollToHash({ isInitializing }) {
  const { pathname, hash } = useLocation();
  const prevPathnameRef = useRef(pathname);

  useEffect(() => {
    if (isInitializing) return;

    if (hash) {
      const id = hash.replace('#', '');
      
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          // Add a small delay for the layout to settle
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 50);
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToElement()) {
        const interval = setInterval(() => {
          if (scrollToElement()) {
            clearInterval(interval);
          }
        }, 100);

        const timeout = setTimeout(() => clearInterval(interval), 3000);
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }
    } else if (pathname !== prevPathnameRef.current) {
      // Only scroll to top if it's a new page (pathname changed)
      // This prevents jumps when status changes in ToolPage
      window.scrollTo(0, 0);
    }
    prevPathnameRef.current = pathname;
  }, [pathname, hash, isInitializing]);

  return null;
}

export default function App() {
  const [mode, setMode] = useState('dark');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Reduced initial load time for better UX
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  const colorMode = useMemo(() => ({
    mode,
    toggleColorMode: () => setMode(prev => prev === 'dark' ? 'light' : 'dark'),
  }), [mode]);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <div className="noise-overlay" />
          <ScrollToHash isInitializing={isInitializing} />
          <Navbar />
          <main style={{ minHeight: '100vh', paddingTop: '64px' }}>
            {isInitializing ? (
              <PageLoader />
            ) : (
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/tool/:toolSlug" element={<ToolPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            )}
          </main>
          {!isInitializing && <Footer />}
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
