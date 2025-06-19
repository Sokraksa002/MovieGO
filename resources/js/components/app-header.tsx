import { Link } from '@inertiajs/react';
import { BellIcon, ChevronRight, UserIcon } from 'lucide-react';
import React from 'react';
import { type BreadcrumbItem } from '@/types';

interface AppHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function AppHeader({ breadcrumbs = [] }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900 md:px-6 lg:px-8">
      <Link href={route('home')} className="flex items-center gap-2">
        <img 
          src="/logo.svg" 
          alt="MovieGO" 
          className="h-8 w-8"
        />
        <span className="text-xl font-bold">MovieGO</span>
      </Link>
      
      {breadcrumbs.length > 0 && (
        <nav className="hidden md:flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
          <ChevronRight className="h-4 w-4" />
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {item.href && !item.active ? (
                <Link
                  href={item.href}
                  className="hover:text-neutral-900 dark:hover:text-neutral-50"
                >
                  {item.title}
                </Link>
              ) : (
                <span className={item.active ? 'font-medium text-neutral-900 dark:text-neutral-50' : ''}>
                  {item.title}
                </span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      
      <div className="ml-auto flex items-center gap-4">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
        >
          <BellIcon className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
        </button>
        
        <Link
          href={route('profile.edit')}
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
        >
          <UserIcon className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Link>
      </div>
    </header>
  );
}
