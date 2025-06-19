import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { router } from '@inertiajs/react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Configure global CSRF headers for all Inertia requests
router.on('start', () => {
    const csrfToken = document.head.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (csrfToken) {
        // @ts-expect-error - Headers property exists at runtime
        if (!router.headers) {
            // @ts-expect-error - Headers property exists at runtime
            router.headers = {};
        }
        // @ts-expect-error - Headers property exists at runtime
        router.headers['X-CSRF-TOKEN'] = csrfToken;
    }
});

// Remove the custom login overlay logic to always render Inertia pages
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        // Make sure the name preserves its casing
        return resolvePageComponent(
            `./pages/${name}.tsx`,
            // @ts-expect-error - Type mismatch is expected but works at runtime
            import.meta.glob('./pages/**/*.tsx', { eager: true })
        );
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();