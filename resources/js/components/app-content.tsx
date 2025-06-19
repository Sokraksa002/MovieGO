import { cn } from '@/lib/utils';
import React from 'react';

interface AppContentProps {
  children: React.ReactNode;
  variant?: 'default' | 'sidebar';
  className?: string;
}

export function AppContent({ children, variant = 'default', className }: AppContentProps) {
  return (
    <main
      className={cn(
        'flex-1 overflow-auto',
        variant === 'sidebar' ? 'p-6 lg:p-8' : 'p-4 md:p-6 lg:p-8',
        className
      )}
    >
      {children}
    </main>
  );
}
