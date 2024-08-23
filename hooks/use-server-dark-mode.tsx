// hooks/useServerDarkMode.tsx
import { cookies } from 'next/headers';

type Theme = 'light' | 'dark';

export default function useServerDarkMode(defaultTheme: Theme = 'dark'): Theme {
  const cookieStore = cookies();
  const themeCookie = cookieStore.get('theme')?.value as Theme | undefined;
  return themeCookie || defaultTheme;
}
