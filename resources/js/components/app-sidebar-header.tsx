import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import { type BreadcrumbItem } from '@/types';

interface AppSidebarHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
}

export function AppSidebarHeader({ breadcrumbs = [] }: AppSidebarHeaderProps) {
  return (
    <div className="mb-6">
      {breadcrumbs.length > 0 && (
        <nav className="mb-2 flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-neutral-900 dark:hover:text-neutral-50"
                >
                  {item.title}
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <h1 className="text-2xl font-bold tracking-tight">
        {breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].title : 'Dashboard'}
      </h1>
    </div>
  );
}
