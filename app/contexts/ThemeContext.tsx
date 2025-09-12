'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Exclude<ThemeMode, 'system'>;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Utility to resolve the effective theme based on system preference when mode === 'system'
function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('system');

  // Load saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('eliteshop-theme') as ThemeMode | null;
    if (saved) {
      setMode(saved);
    }
  }, []);

  // Listen for system changes when in system mode
  useEffect(() => {
    if (mode !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const listener = () => applyTheme(getSystemPreference());
    listener();
    mql.addEventListener('change', listener);
    return () => mql.removeEventListener('change', listener);
  }, [mode]);

  // Apply theme and persist
  useEffect(() => {
    const effective: 'light' | 'dark' = mode === 'system' ? getSystemPreference() : mode;
    applyTheme(effective);
    localStorage.setItem('eliteshop-theme', mode);
  }, [mode]);

  const theme: 'light' | 'dark' = useMemo(
    () => (mode === 'system' ? getSystemPreference() : mode),
    [mode]
  );

  const value: ThemeContextType = useMemo(
    () => ({
      theme,
      mode,
      setMode,
      toggle: () => setMode(prev => (prev === 'dark' ? 'light' : 'dark')),
    }),
    [theme, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
