import type { ReactNode } from 'react';
import { ThemeToggle } from '../ui/ThemeToggle';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      <main>
        {children}
      </main>
    </div>
  );
}
