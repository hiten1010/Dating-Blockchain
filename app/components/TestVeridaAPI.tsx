'use client';

import { useState } from 'react';
import { testApiConnectivity, testDatabaseQuery, generateCurlCommands, getScopeInstructions } from '../lib/testapi';

export default function TestVeridaAPI() {
  const [testResult, setTestResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [testType, setTestType] = useState<string>('');
  const [showScopeInstructions, setShowScopeInstructions] = useState(false);
  const curlCommands = generateCurlCommands();
  const scopeInstructions = getScopeInstructions();

  const runTest = async (type: string) => {
    setLoading(true);
    setTestType(type);
    setTestResult(null);
    
    try {
      let result;
      
      if (type === 'connection') {
        result = await testApiConnectivity();
      } else if (type === 'query') {
        result = await testDatabaseQuery();
      }
      
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: `Error: ${error instanceof Error ? error.message : String(error)}`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Verida API Connectivity Test</h2>
      
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => runTest('connection')}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          Test API Connection
        </button>
        
        <button
          onClick={() => runTest('query')}
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          Test Database Query
        </button>
        
        <button
          onClick={() => setShowScopeInstructions(!showScopeInstructions)}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          {showScopeInstructions ? 'Hide Scope Instructions' : 'Show Scope Instructions'}
        </button>
      </div>
      
      {loading && (
        <div className="text-center py-4">
          <p>Testing {testType}...</p>
        </div>
      )}
      
      {testResult && (
        <div className={`p-4 rounded ${testResult.success ? 'bg-green-100' : 'bg-red-100'} mt-4`}>
          <h3 className="font-bold">{testResult.success ? 'Success' : 'Error'}</h3>
          <p>{testResult.message}</p>
          
          {testResult.data && (
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
              {JSON.stringify(testResult.data, null, 2)}
            </pre>
          )}
          
          {!testResult.success && testResult.message.includes('Missing scope') && (
            <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
              <p className="font-bold text-yellow-800">Missing Scope Error Detected</p>
              <p className="text-sm mt-1">You need to generate a new auth token with the required scopes.</p>
              <button 
                onClick={() => setShowScopeInstructions(true)}
                className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded text-xs hover:bg-yellow-600"
              >
                Show Instructions
              </button>
            </div>
          )}
        </div>
      )}
      
      {showScopeInstructions && (
        <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded">
          <h3 className="font-bold text-purple-800 mb-2">How to Generate a Token with Proper Scopes</h3>
          <pre className="whitespace-pre-wrap text-sm">{scopeInstructions}</pre>
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="font-semibold mb-2">Curl Commands for Postman Testing</h3>
        <div className="bg-gray-100 p-2 rounded-lg text-xs overflow-auto">
          {curlCommands.map((cmd, i) => (
            <div key={i} className="mb-2">
              <pre className="whitespace-pre-wrap break-all">{cmd}</pre>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 border-t pt-4">
        <h3 className="font-semibold mb-2">Common Troubleshooting Tips</h3>
        <ul className="list-disc pl-5 text-sm">
          <li>Ensure your AUTH_TOKEN is valid and has not expired</li>
          <li><strong>Missing Scope Error:</strong> If you see "Invalid permission (Missing scope: db:w:dating_profile)", your token doesn't have write permissions. You need to generate a new token with the proper scopes:</li>
          <ul className="list-disc pl-5 text-sm ml-5 mt-1">
            <li><code>db:rw:dating_profile</code> - Read/write for profiles</li>
            <li><code>db:rw:dating_preferences</code> - Read/write for preferences</li>
            <li><code>db:rw:dating_photos</code> - Read/write for photos</li>
          </ul>
          <li>Check that your API endpoints match the correct format in the Verida documentation</li>
          <li>Verify that the database names (dating_profile, etc.) exist in your Verida account</li>
          <li>Try running the curl commands in Postman to test directly</li>
          <li>Check for CORS issues if testing from a browser</li>
          <li>Ensure your network can reach the Verida API servers</li>
        </ul>
      </div>
    </div>
  );
} 