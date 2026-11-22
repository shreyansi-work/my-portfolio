import { useCallback, useState } from 'react';

/** Light/dark theme. The initial value is set before first paint by public/theme-init.js. */
export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));

  const toggle = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      /* storage can be blocked; the theme still changes for this visit */
    }
    setDark(next);
  }, []);

  return { dark, toggle };
}
