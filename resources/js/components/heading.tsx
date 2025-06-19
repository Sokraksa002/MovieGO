import { type ReactNode } from 'react';

export default function Heading({ children }: { children: ReactNode }) {
    return (
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {children}
        </h1>
    );
}
