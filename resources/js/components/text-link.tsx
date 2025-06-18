import React from 'react';

interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode;
}

export default function TextLink({ children, className = '', ...props }: TextLinkProps) {
    return (
        <a
            className={`text-blue-600 hover:underline ${className}`}
            {...props}
        >
            {children}
        </a>
    );
} 