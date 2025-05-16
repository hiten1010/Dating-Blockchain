'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AUTH_TOKEN } from './verida-config';

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

  // Enhanced utility functions for the hook
  
  // Get authentication status
  const getAuthStatus = async (): Promise<boolean> => {
    if (isLoading || !client) return false;
    try {
      return client.isConnected();
    } catch (error) {
      console.error('Failed to check auth status:', error);
      return false;
    }
  };
  
  // Get user's DID
  const getDidId = async (): Promise<string | null> => {
    if (isLoading || !client) return null;
    try {
      return client.getDid();
    } catch (error) {
      console.error('Failed to get DID:', error);
      return null;
    }
  };
  
  // Get authentication token for API calls
  const getAuthToken = async (): Promise<string | null> => {
    // Using the centralized auth token from config
    try {
      return AUTH_TOKEN;
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  };

  return { 
    client, 
    isLoading, 
    error,
    getAuthStatus,
    getDidId,
    getAuthToken
  };
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

// Create a hook that uses ProfileRestService
export const useProfileRestService = () => {
  const [service, setService] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadService = async () => {
      try {
        setIsLoading(true);
        const { ProfileRestService } = await import('./profile-rest-service');
        setService(ProfileRestService);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to load ProfileRestService:', err);
        setError(err instanceof Error ? err : new Error('Failed to load ProfileRestService'));
        setIsLoading(false);
      }
    };

    loadService();
  }, []);

  return { service, isLoading, error };
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