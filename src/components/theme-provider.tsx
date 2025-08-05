'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    // Force dark mode
    const applyDarkTheme = () => {
      try {
        // Always set dark mode regardless of system preference
        document.documentElement.classList.add('dark');
        // Save the preference to localStorage
        localStorage.setItem('portfolio-theme', 'dark');
      } catch (error) {
        console.error('Theme application error:', error);
      }
    };

    applyDarkTheme();
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      forcedTheme="dark"
      disableTransitionOnChange={false}
      storageKey="portfolio-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
