'use client';

import TestVeridaAPI from '../components/TestVeridaAPI';

export default function TestPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Verida API Testing</h1>
      <p className="mb-4">
        Use this page to test connectivity to the Verida API and diagnose any issues with 
        database access or permissions.
      </p>
      <TestVeridaAPI />
    </div>
  );
} 