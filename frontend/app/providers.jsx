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
