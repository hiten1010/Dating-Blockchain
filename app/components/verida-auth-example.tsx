'use client';

import { useState } from 'react';
import { VeridaAuthButton, veridaClient, useVeridaAuth } from '../lib/verida-client-wrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function VeridaAuthExample() {
  const [message, setMessage] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const { isAuthenticated, isLoading, did } = useVeridaAuth();

  const handleSuccess = (did: string) => {
    setMessage(`Successfully connected with DID: ${did}`);
    setAuthError(null);
  };

  const handleError = (error: string) => {
    setAuthError(`Error: ${error}`);
    setMessage(null);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Verida Authentication</CardTitle>
        <CardDescription>
          Connect to your Verida account to use this application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm mb-2">
            Client status: {isAuthenticated ? 'Connected' : 'Disconnected'}
          </p>
          {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          {authError && <p className="text-sm text-red-600">{authError}</p>}
        </div>

        <VeridaAuthButton
          onSuccess={handleSuccess}
          onError={handleError}
        >
          {isAuthenticated ? 'Disconnect' : 'Connect with Verida'}
        </VeridaAuthButton>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-gray-500">
          {did ? `Connected with DID: ${did}` : 'Not connected'}
        </p>
      </CardFooter>
    </Card>
  );
} 