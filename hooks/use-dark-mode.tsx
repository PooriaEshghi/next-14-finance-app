
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

type Theme = 'light' | 'dark';

export default function useDarkMode(defaultTheme: Theme = 'dark') {
  const [cookies, setCookie] = useCookies(['theme']);
  const [theme, setTheme] = useState<Theme>(cookies.theme || defaultTheme);

  useEffect(() => {
    
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  const setAndSaveTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    setCookie('theme', newTheme, { path: '/', maxAge: 60 * 60 * 24 * 365 });
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  const toggleTheme = () => {
    setAndSaveTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme };
}
