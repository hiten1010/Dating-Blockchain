/**
 * @deprecated - This file is no longer in use
 * 
 * Use verida-client-wrapper.tsx instead to avoid font loading issues
 * during server-side rendering. This file contains imports that cause
 * build issues with Next.js.
 */

console.warn(
  'WARNING: app/lib/verida-client.ts is deprecated. ' +
  'Use app/lib/verida-client-wrapper.tsx instead to avoid font loading issues.'
);

// Re-export from the wrapper to maintain compatibility with existing code
export { veridaClient } from './verida-client-wrapper'; 