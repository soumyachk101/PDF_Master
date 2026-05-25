'use client';

import { useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { lightTheme } from '@/theme/theme';
import { ColorModeContext } from '@/contexts/ColorModeContext';
import { Analytics } from '@vercel/analytics/react';

export default function Providers({ children }) {
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

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
    mode: 'light',
    toggleColorMode: () => {},
  }), []);

  const theme = lightTheme;

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
