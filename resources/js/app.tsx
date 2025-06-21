import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { router } from '@inertiajs/react';
import ErrorBoundary from './components/ErrorBoundary';
import './utils/suppress-devtools';

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

// Add navigation logging to debug redirect issues
router.on('navigate', (event) => {
    console.log('Inertia navigation detected:', event.detail.page.url);
});

router.on('before', (event) => {
    console.log('Inertia navigation starting to:', event.detail.visit.url);
});

router.on('start', (event) => {
    console.log('Inertia visit started:', event.detail.visit.url);
});

router.on('finish', (event) => {
    console.log('Inertia visit finished:', event.detail.visit.url);
});

// Add global navigation monitoring
window.addEventListener('beforeunload', () => {
    console.log('Window about to unload - potential redirect detected');
});

window.addEventListener('popstate', () => {
    console.log('Browser navigation (back/forward):', window.location.href);
});

// Monitor for any programmatic navigation
const originalPushState = history.pushState;
const originalReplaceState = history.replaceState;

history.pushState = function(...args) {
    console.log('history.pushState called:', args[2]);
    return originalPushState.apply(this, args);
};

history.replaceState = function(...args) {
    console.log('history.replaceState called:', args[2]);
    return originalReplaceState.apply(this, args);
};

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
        root.render(
            <ErrorBoundary>
                <App {...props} />
            </ErrorBoundary>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();