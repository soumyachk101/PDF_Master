'use client';

import { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { lightTheme, darkTheme } from '@/theme/theme';
import { ColorModeContext } from '@/contexts/ColorModeContext';
import { Analytics } from '@vercel/analytics/react';

export default function Providers({ children }) {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [mode]);

  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('[Service Worker] Registered:', registration.scope);
          })
          .catch((error) => {
            console.log('[Service Worker] Registration failed:', error);
          });
      });
    }
  }, []);

  const colorMode = useMemo(() => ({
    mode,
    toggleColorMode: () => setMode(prev => prev === 'dark' ? 'light' : 'dark'),
  }), [mode]);

  const theme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ColorModeContext.Provider value={colorMode}>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
      <Analytics />
    </ColorModeContext.Provider>
  );
}
