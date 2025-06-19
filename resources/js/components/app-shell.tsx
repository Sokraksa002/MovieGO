import { cn } from '@/lib/utils';
import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
  variant?: 'default' | 'sidebar';
  className?: string;
}

export function AppShell({ children, variant = 'default', className }: AppShellProps) {
  return (
    <div
      className={cn(
        'flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950',
        variant === 'sidebar' && 'lg:flex-row',
        className
      )}
    >
      {children}
    </div>
  );
}
