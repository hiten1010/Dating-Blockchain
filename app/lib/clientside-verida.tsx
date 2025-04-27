'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Define a type for the Verida client
interface VeridaClient {
  connect: () => Promise<boolean>;
  isConnected: () => boolean;
  getDid: () => string | null;
  openDatabase: (dbName: string) => Promise<any>;
  disconnect: () => void;
  getClient: () => any;
  getAccount: () => any;
  getContext: () => any;
}

// Create placeholders for state
let veridaClientInstance: VeridaClient | null = null;
let isClientInitialized = false;

// Create a hook to use Verida client safely on the client side
export const useVeridaClient = () => {
  const [client, setClient] = useState<VeridaClient | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Dynamic import of the Verida client - only happens on client side
    const loadVeridaClient = async () => {
      try {
        setIsLoading(true);
        
        // Only initialize once
        if (!isClientInitialized) {
          // Dynamically import the Verida modules only on the client side
          const { veridaClient } = await import('./verida-client');
          veridaClientInstance = veridaClient;
          isClientInitialized = true;
        }
        
        setClient(veridaClientInstance);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load Verida client:', err);
        setError(err instanceof Error ? err : new Error('Failed to load Verida client'));
        setIsLoading(false);
      }
    };

    loadVeridaClient();
  }, []);

  return { client, isLoading, error };
};

// Wrapper for the ProfileService
export const useProfileService = () => {
  const [profileService, setProfileService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProfileService = async () => {
      try {
        setIsLoading(true);
        // Dynamically import the profile service
        const { ProfileService } = await import('./profile-service');
        setProfileService(ProfileService);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load ProfileService:', err);
        setError(err instanceof Error ? err : new Error('Failed to load ProfileService'));
        setIsLoading(false);
      }
    };

    loadProfileService();
  }, []);

  return { profileService, isLoading, error };
};

// No-op component for SSR
export const NoSSR = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

// Export a No-SSR wrapper for components that use Verida
export const withNoSSR = (Component: React.ComponentType<any>) => {
  return dynamic(() => Promise.resolve(Component), {
    ssr: false,
  });
}; 