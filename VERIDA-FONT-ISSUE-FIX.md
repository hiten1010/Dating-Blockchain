# Verida Font Issue Fix

This document explains the solution implemented to fix issues with Verida's font imports during Next.js server-side rendering and deployment.

## Problem

The Verida SDK, specifically the `@verida/account-web-vault` package, imports a font file directly:

```js
// In @verida/account-web-vault/dist/vault-modal-login.js
import 'SoraRegular' from './assets/fonts/Sora-Regular.ttf';
```

This causes issues during Next.js server-side rendering and deployment because:

1. Font files cannot be imported directly in a Node.js context
2. The import is not compatible with server components
3. These issues are particularly troublesome during deployment on Vercel

## Solution

We implemented a comprehensive solution that:

1. Creates a custom implementation of the Verida client (`app/lib/verida-client-wrapper.tsx`)
2. Bypasses the problematic font imports completely
3. Provides React hooks and components for easy integration
4. Configures webpack in Next.js to handle any remaining font files correctly

### Key Components

1. **Custom Wrapper**: `app/lib/verida-client-wrapper.tsx`
   - Provides a client-side only implementation of Verida authentication
   - Includes a React hook (`useVeridaAuth`) for managing authentication state
   - Includes a reusable button component (`VeridaAuthButton`)

2. **Example Component**: `app/components/verida-auth-example.tsx`
   - Demonstrates how to use the custom implementation
   - Provides feedback on authentication status

3. **Next.js Config**: `next.config.mjs`
   - Properly handles font files as static assets
   - Provides a null loader for the problematic Verida font file
   - Configures Node.js module fallbacks for compatibility

4. **CSS Styles**: Added to `app/globals.css`
   - Provides styling for the authentication button

### How to Use

1. Instead of importing from `verida-client.ts`, import from `verida-client-wrapper.tsx`:

```tsx
// Use this import
import { veridaClient, useVeridaAuth, VeridaAuthButton } from '@/app/lib/verida-client-wrapper';
```

2. Use the `VeridaAuthButton` component for authentication:

```tsx
<VeridaAuthButton 
  onSuccess={(did) => console.log('Connected with DID:', did)}
  onError={(error) => console.error('Auth error:', error)}
>
  Connect with Verida
</VeridaAuthButton>
```

3. Or use the `useVeridaAuth` hook for more control:

```tsx
const { isAuthenticated, isLoading, error, did, login, logout } = useVeridaAuth();

// Then use these values and functions in your UI
```

### Live Example

You can see a working example at `/verida-auth`.

## Technical Details

### CustomVaultAccount

To avoid importing the problematic `VaultAccount` class from `@verida/account-web-vault`, we created a custom implementation that provides the minimum required functionality. This custom implementation does not import any font files.

### Next.js Configuration

The webpack configuration in `next.config.mjs` includes:

1. Handling for font files as static assets
2. A null loader for the problematic font file from Verida
3. Proper externals and fallbacks for Node.js modules

This ensures that the application builds correctly both locally and during deployment.

## Conclusion

This solution allows the application to use Verida authentication without running into font import issues during Next.js server-side rendering or deployment. It provides a clean, client-side only implementation that should be robust across environments. 