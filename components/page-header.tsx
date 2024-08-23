import Link from 'next/link';
import DarkModeToggle from './dark-mode-toggle';
import useServerDarkMode from '@/hooks/use-server-dark-mode';

interface PageHeaderProps {
  className?: string;
}

export default function PageHeader({ className = '' }: PageHeaderProps) {
  const theme = useServerDarkMode()
  return (
    <header className={`flex justify-between items-center ${className}`}>
      <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">
        Finance App
      </Link>

      <div className="flex items-center space-x-4">
        <DarkModeToggle />
        <div>User Dropdown</div>
      </div>
    </header>
  );
}
