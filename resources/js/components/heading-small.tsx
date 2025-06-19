import { ReactNode } from 'react';

interface HeadingSmallProps {
    children?: ReactNode;
    title?: string;
    description?: string;
}

export default function HeadingSmall({ children, title, description }: HeadingSmallProps) {
    return (
        <div className="space-y-1">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                {children || title}
            </h2>
            {description && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {description}
                </p>
            )}
        </div>
    );
}
