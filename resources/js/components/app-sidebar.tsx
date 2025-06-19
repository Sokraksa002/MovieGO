import { cn } from '@/lib/utils';
import { HomeIcon, PlayIcon, SearchIcon, UserIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import React from 'react';

interface AppSidebarProps {
  className?: string;
}

export function AppSidebar({ className }: AppSidebarProps) {
  const navigationItems = [
    { icon: HomeIcon, label: 'Home', href: route('home') },
    { icon: SearchIcon, label: 'Search', href: route('search') },
    { icon: PlayIcon, label: 'Watch', href: route('watch') },
    { icon: UserIcon, label: 'Profile', href: route('profile') },
  ];

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-20 flex w-16 flex-col border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 lg:w-64 lg:relative',
        className
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-neutral-200 dark:border-neutral-800">
        <Link href={route('home')} className="flex items-center gap-2">
          <img 
            src="/logo.svg" 
            alt="MovieGO" 
            className="h-8 w-8"
          />
          <span className="hidden text-xl font-bold lg:block">MovieGO</span>
        </Link>
      </div>
      
      <nav className="flex flex-1 flex-col gap-2 p-2 lg:p-4">
        {navigationItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex h-10 items-center gap-3 rounded-md px-3 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50',
              route().current(item.href) && 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-50'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="hidden lg:inline-block">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
