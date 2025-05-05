'use client';

/**
 * Utility for testing API connectivity to Verida services
 * This can be used to diagnose connection issues with the Verida API
 */

// Constants
const API_BASE_URL = 'https://api.verida.ai';
const AUTH_TOKEN = '0a420b30-28fe-11f0-b8ca-5b198f1a59d76cjG57RUD1AH_H9zO6ljaRDrZemdQs3O9OUYA47o1pNadrQG';
const PROFILE_DB = 'dating_profile';

/**
 * Test the API connectivity with a simple GET request
 * @returns Promise<{success: boolean, message: string, data?: any}>
 */
export const testApiConnectivity = async () => {
  try {
    console.log('Testing API connectivity...');
    
    // Use a simple token verification endpoint
    const response = await fetch(`${API_BASE_URL}/api/rest/v1/auth/token-verify`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}): ${errorText}`);
      return {
        success: false,
        message: `API error (${response.status}): ${errorText}`
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      message: 'API connection successful',
      data
    };
  } catch (error) {
    console.error('API test error:', error);
    return {
      success: false,
      message: `API test error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

/**
 * Test database query functionality
 * @returns Promise<{success: boolean, message: string, data?: any}>
 */
export const testDatabaseQuery = async () => {
  try {
    console.log('Testing database query...');
    
    const response = await fetch(`${API_BASE_URL}/api/rest/v1/db/query/${PROFILE_DB}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        filters: {}
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}): ${errorText}`);
      return {
        success: false,
        message: `API error (${response.status}): ${errorText}`
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      message: `Database query successful. Found ${data.data?.length || 0} records`,
      data
    };
  } catch (error) {
    console.error('Database query test error:', error);
    return {
      success: false,
      message: `Database query test error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

/**
 * Get all available API endpoints for debugging
 * @returns Promise<{success: boolean, message: string, data?: any}>
 */
export const getApiEndpoints = async () => {
  try {
    console.log('Getting API endpoints...');
    
    const response = await fetch(`${API_BASE_URL}/api/rest`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}): ${errorText}`);
      return {
        success: false,
        message: `API error (${response.status}): ${errorText}`
      };
    }
    
    const data = await response.json();
    return {
      success: true,
      message: 'API endpoints retrieved successfully',
      data
    };
  } catch (error) {
    console.error('API endpoints test error:', error);
    return {
      success: false,
      message: `API endpoints test error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
};

/**
 * Generate curl commands for testing API endpoints
 * @returns string[] - Array of curl commands
 */
export const generateCurlCommands = () => {
  return [
    `curl -v "https://api.verida.ai/api/rest/v1/auth/token-verify" -H "Authorization: Bearer ${AUTH_TOKEN}" -H "Content-Type: application/json"`,
    `curl -v -X POST "https://api.verida.ai/api/rest/v1/db/query/${PROFILE_DB}" -H "Authorization: Bearer ${AUTH_TOKEN}" -H "Content-Type: application/json" -d '{"filters": {}}'`,
    `curl -v "https://api.verida.ai/api/rest" -H "Authorization: Bearer ${AUTH_TOKEN}" -H "Content-Type: application/json"`,
    `curl -v -X POST "https://api.verida.ai/api/rest/v1/db/${PROFILE_DB}" -H "Authorization: Bearer ${AUTH_TOKEN}" -H "Content-Type: application/json" -d '{"did":"test_user","displayName":"Test User","age":"30","location":"Test Location","bio":"Test bio","interests":["test"],"relationshipGoals":"Test","primaryPhotoIndex":0,"createdAt":"2023-01-01T00:00:00.000Z","updatedAt":"2023-01-01T00:00:00.000Z"}'`
  ];
};

/**
 * Generate instructions for obtaining a new authentication token with proper scopes
 * @returns string - Instructions text
 */
export const getScopeInstructions = (): string => {
  return `
To generate a new Verida authentication token with the proper scopes, follow these steps:

1. Go to the Verida Developer Console (https://console.verida.io)

2. Create a new application or select your existing application

3. When creating an OAuth application, ensure you request these specific scopes:
   - db:rw:dating_profile      (Read and write access to profiles)
   - db:rw:dating_preferences  (Read and write access to preferences)
   - db:rw:dating_photos       (Read and write access to photos)

4. Generate a new auth token with these scopes

5. Update the AUTH_TOKEN constant in the app/lib/profile-rest-service.ts file with your new token

Alternatively, if you're using the Verida SDK directly with user authentication:
- Make sure to request these permissions in your account configuration
- The permission format according to the Verida documentation (https://developers.verida.network/protocol/client-sdk/permissions) is:
  {
    "permissions": {
      "db/dating_profile": { "read": true, "write": true },
      "db/dating_preferences": { "read": true, "write": true },
      "db/dating_photos": { "read": true, "write": true }
    }
  }

For testing with curl commands, you can check your token's scopes with:
curl -v "https://api.verida.ai/api/rest/v1/auth/token-info" -H "Authorization: Bearer YOUR_TOKEN_HERE"
`;
}; 