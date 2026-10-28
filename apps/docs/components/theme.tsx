'use client';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Button } from '@antiflex/ui';
import { IconMoon, IconSun } from '@tabler/icons-react';
const Context = createContext({ theme: 'light', toggle: () => {} });
export function useTheme() {
  return useContext(Context);
}
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'light');
  }, []);
  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('antiflex-theme', next);
    } catch {}
  };
  return <Context.Provider value={{ theme, toggle }}>{children}</Context.Provider>;
}
export function ThemeToggle() {
  const { theme, toggle } = useContext(Context);
  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      onClick={toggle}
    >
      {theme === 'light' ? <IconMoon /> : <IconSun />}
    </Button>
  );
}
