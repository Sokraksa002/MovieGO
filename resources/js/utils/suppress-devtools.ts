// Suppress React DevTools warnings in production
if (typeof window !== 'undefined' && import.meta.env.PROD) {
  // Disable React DevTools
  if (typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'object') {
    for (const [key, value] of Object.entries((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
      if (typeof value === 'function') {
        (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = () => {};
      }
    }
  }
  
  // Suppress console warnings about devtools
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      (
        args[0].includes('React DevTools') ||
        args[0].includes('Extension context invalidated')
      )
    ) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

export {};
