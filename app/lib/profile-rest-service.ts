'use client';

// Constants
const API_BASE_URL = 'https://api.verida.ai';
// Note: This token requires proper scopes: db:rw:dating_profile, db:rw:dating_preferences, db:rw:dating_photos
const AUTH_TOKEN = '0a420b30-28fe-11f0-b8ca-5b198f1a59d76cjG57RUD1AH_H9zO6ljaRDrZemdQs3O9OUYA47o1pNadrQG';
const PROFILE_DB = 'dating_profile';
const PREFERENCES_DB = 'dating_preferences';
const PHOTOS_DB = 'dating_photos';

// Required scopes for each database
const REQUIRED_SCOPES = {
  [PROFILE_DB]: 'db:rw:dating_profile',
  [PREFERENCES_DB]: 'db:rw:dating_preferences',
  [PHOTOS_DB]: 'db:rw:dating_photos'
};

// Same interfaces as in profile-service.ts
export interface DatingProfile {
  did: string;
  displayName: string;
  age: string; 
  location: string;
  bio: string;
  interests: string[];
  relationshipGoals: string;
  primaryPhotoIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfilePhoto {
  did: string;
  photoUrl: string;
  description: string;
  isPrivate: boolean;
  order: number;
  createdAt: string;
}

export interface DatingPreferences {
  did: string;
  ageRange: { min: number; max: number };
  locationPreference: string;
  distanceRange: number;
  lookingFor: string[];
  dealBreakers: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * ProfileRestService object to handle storing and retrieving profile data from Verida using REST APIs
 * This bypasses the SDK issues with RPC and context creation
 */
export const ProfileRestService = {
  /**
   * Make an authenticated API call to Verida REST API
   * @param endpoint - API endpoint path
   * @param method - HTTP method (GET, POST, PUT, DELETE)
   * @param body - Request body for POST/PUT requests
   * @returns API response
   */
  async apiCall(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
    try {
      // Ensure endpoint starts with a slash if needed
      if (!endpoint.startsWith('/')) {
        endpoint = '/' + endpoint;
      }
      
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`Making ${method} request to ${url}`);
      
      if (body) {
        console.log(`Request body:`, body);
      }
      
      // Determine which database is being accessed for logging purposes
      let dbName = null;
      if (endpoint.includes(PROFILE_DB)) {
        dbName = PROFILE_DB;
      } else if (endpoint.includes(PREFERENCES_DB)) {
        dbName = PREFERENCES_DB;
      } else if (endpoint.includes(PHOTOS_DB)) {
        dbName = PHOTOS_DB;
      }
      
      // Log required scope info if this is a database operation
      if (dbName && (method === 'POST' || method === 'PUT')) {
        console.log(`This operation requires the scope: ${REQUIRED_SCOPES[dbName as keyof typeof REQUIRED_SCOPES]}`);
      }
      
      const headers = {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      };
      
      const options: RequestInit = {
        method,
        headers,
        cache: 'no-store',
      };
      
      if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
      }
      
      // Add timeout to fetch to avoid hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      options.signal = controller.signal;
      
      try {
        const response = await fetch(url, options);
        clearTimeout(timeoutId); // Clear timeout if fetch completes
        
        // Log response status for debugging
        console.log(`Response status: ${response.status} ${response.statusText}`);
        
        // If response is not ok, try to parse the error message
        if (!response.ok) {
          // Try to get the content type header
          const contentType = response.headers.get('content-type');
          let errorMessage = '';
          
          // Handle different response types appropriately
          if (contentType && contentType.includes('application/json')) {
            // Parse as JSON if possible
            const errorJson = await response.json();
            errorMessage = JSON.stringify(errorJson);
            console.error(`API error JSON (${response.status}):`, errorJson);
            
            // Check specifically for scope/permission errors
            if (errorJson.error && errorJson.error.includes('Missing scope')) {
              console.error('PERMISSION ERROR: Your auth token is missing the required scope.');
              console.error(`To fix this, you need to request a new token with the scope: ${errorJson.error.split(':')[1].trim()}`);
            }
          } else {
            // Read as text if not JSON
            const errorText = await response.text();
            errorMessage = errorText;
            console.error(`API error text (${response.status}): ${errorText}`);
          }
          
          // Enhanced error with more details
          throw new Error(`API error (${response.status} ${response.statusText}) on ${method} ${url}: ${errorMessage}`);
        }
        
        // For successful responses, try to parse as JSON
        try {
          const data = await response.json();
          console.log(`API response data:`, data);
          return data;
        } catch (jsonError) {
          console.warn('Response couldn\'t be parsed as JSON, returning raw response');
          const text = await response.text();
          return { rawResponse: text };
        }
      } catch (fetchError: any) {
        if (fetchError.name === 'AbortError') {
          console.error(`Request timeout after 30 seconds when connecting to: ${url}`);
          throw new Error(`Request timeout (30s) when connecting to Verida API: ${url}. Please try again later.`);
        } else if (fetchError instanceof TypeError && fetchError.message === 'Failed to fetch') {
          console.error(`Network error when connecting to: ${url}. This could be due to:
            1. No internet connection
            2. CORS issues
            3. Invalid endpoint URL
            4. Server is not responding`);
          throw new Error(`Network error when connecting to Verida API: ${url}. Please check your internet connection or try again later.`);
        }
        
        // Re-throw with additional context
        console.error(`Fetch error for ${method} ${url}:`, fetchError);
        throw fetchError;
      }
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  },
  
  /**
   * Save or update user profile using REST API
   * @param {Partial<DatingProfile>} profileData - Profile data to save
   * @returns {Promise<DatingProfile>} - Saved profile
   */
  async saveProfile(profileData: Partial<DatingProfile>): Promise<DatingProfile> {
    try {
      console.log("Saving profile data via REST API:", profileData);
      
      // Check if profile already exists by querying
      let existingProfiles;
      try {
        existingProfiles = await this.apiCall(`/api/rest/v1/db/query/${PROFILE_DB}`, 'POST', {
          filters: { did: profileData.did }
        });
      } catch (error) {
        console.log("Error fetching existing profiles, assuming none exist:", error);
        existingProfiles = { data: [] };
      }
      
      const now = new Date().toISOString();
      let savedProfile;
      
      if (existingProfiles.data && existingProfiles.data.length > 0) {
        // Update existing profile
        const existingProfile = existingProfiles.data[0];
        console.log("Updating existing profile:", existingProfile._id);
        
        const updatedData = {
          ...existingProfile,
          ...profileData,
          updatedAt: now
        };
        
        // Use the PUT endpoint to update
        savedProfile = await this.apiCall(`/api/rest/v1/db/${PROFILE_DB}/${existingProfile._id}`, 'PUT', updatedData);
      } else {
        // Create new profile
        console.log("Creating new profile");
        const newProfile: DatingProfile = {
          did: profileData.did || 'unknown',
          displayName: profileData.displayName || '',
          age: profileData.age || '',
          location: profileData.location || '',
          bio: profileData.bio || '',
          interests: profileData.interests || [],
          relationshipGoals: profileData.relationshipGoals || '',
          primaryPhotoIndex: profileData.primaryPhotoIndex || 0,
          createdAt: now,
          updatedAt: now
        };
        
        // Use the POST endpoint to create
        savedProfile = await this.apiCall(`/api/rest/v1/db/${PROFILE_DB}`, 'POST', newProfile);
      }
      
      console.log("Profile saved successfully:", savedProfile);
      return savedProfile.data || savedProfile;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  },
  
  /**
   * Get user profile using REST API
   * @param {string} did - DID of the user
   * @returns {Promise<DatingProfile | null>} - User profile or null if not found
   */
  async getProfile(did?: string): Promise<DatingProfile | null> {
    try {
      console.log("Getting profile for DID:", did);
      
      // Query for profiles with the matching DID
      const result = await this.apiCall(`/api/rest/v1/db/query/${PROFILE_DB}`, 'POST', {
        filters: { did: did }
      });
      
      if (result.data && result.data.length > 0) {
        return result.data[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error getting profile:', error);
      throw error;
    }
  },
  
  /**
   * Save profile photo using REST API
   * @param {string} photoUrl - URL or base64 data of the photo
   * @param {string} description - Description of the photo
   * @param {boolean} isPrivate - Whether the photo is private
   * @param {number} order - Display order of the photo
   * @returns {Promise<ProfilePhoto>} - Saved photo data
   */
  async saveProfilePhoto(
    did: string,
    photoUrl: string,
    description: string = '',
    isPrivate: boolean = false,
    order: number = 0
  ): Promise<ProfilePhoto> {
    try {
      console.log("Saving profile photo via REST API");
      
      const now = new Date().toISOString();
      
      // Create photo object
      const photo: ProfilePhoto = {
        did,
        photoUrl,
        description,
        isPrivate,
        order,
        createdAt: now
      };
      
      // Use the POST endpoint to create
      const result = await this.apiCall(`/api/rest/v1/db/${PHOTOS_DB}`, 'POST', photo);
      
      console.log("Photo saved successfully:", result);
      return result.data || result;
    } catch (error) {
      console.error('Error saving photo:', error);
      throw error;
    }
  },
  
  /**
   * Get all profile photos using REST API
   * @param {string} did - DID of the user
   * @returns {Promise<ProfilePhoto[]>} - Array of user photos
   */
  async getProfilePhotos(did?: string): Promise<ProfilePhoto[]> {
    try {
      console.log("Getting profile photos for DID:", did);
      
      // Query for photos with the matching DID
      const result = await this.apiCall(`/api/rest/v1/db/query/${PHOTOS_DB}`, 'POST', {
        filters: { did: did }
      });
      
      if (result.data && result.data.length > 0) {
        // Sort by order field
        return result.data.sort((a: ProfilePhoto, b: ProfilePhoto) => a.order - b.order);
      }
      
      return [];
    } catch (error) {
      console.error('Error getting photos:', error);
      throw error;
    }
  },
  
  /**
   * Save user preferences using REST API
   * @param {Partial<DatingPreferences>} preferencesData - Preferences data to save
   * @returns {Promise<DatingPreferences>} - Saved preferences
   */
  async savePreferences(did: string, preferencesData: Partial<DatingPreferences>): Promise<DatingPreferences> {
    try {
      console.log("Saving preferences via REST API:", preferencesData);
      
      // Check if preferences already exist by querying
      let existingPreferences;
      try {
        existingPreferences = await this.apiCall(`/api/rest/v1/db/query/${PREFERENCES_DB}`, 'POST', {
          filters: { did: did }
        });
      } catch (error) {
        console.log("Error fetching existing preferences, assuming none exist:", error);
        existingPreferences = { data: [] };
      }
      
      const now = new Date().toISOString();
      let savedPreferences;
      
      if (existingPreferences.data && existingPreferences.data.length > 0) {
        // Update existing preferences
        const existingPreference = existingPreferences.data[0];
        console.log("Updating existing preferences:", existingPreference._id);
        
        const updatedData = {
          ...existingPreference,
          ...preferencesData,
          did,
          updatedAt: now
        };
        
        // Use the PUT endpoint to update
        savedPreferences = await this.apiCall(`/api/rest/v1/db/${PREFERENCES_DB}/${existingPreference._id}`, 'PUT', updatedData);
      } else {
        // Create new preferences
        console.log("Creating new preferences");
        const newPreferences: DatingPreferences = {
          did,
          ageRange: preferencesData.ageRange || { min: 18, max: 50 },
          locationPreference: preferencesData.locationPreference || 'worldwide',
          distanceRange: preferencesData.distanceRange || 50,
          lookingFor: preferencesData.lookingFor || [],
          dealBreakers: preferencesData.dealBreakers || [],
          createdAt: now,
          updatedAt: now
        };
        
        // Use the POST endpoint to create
        savedPreferences = await this.apiCall(`/api/rest/v1/db/${PREFERENCES_DB}`, 'POST', newPreferences);
      }
      
      console.log("Preferences saved successfully:", savedPreferences);
      return savedPreferences.data || savedPreferences;
    } catch (error) {
      console.error('Error saving preferences:', error);
      throw error;
    }
  },
  
  /**
   * Get user preferences using REST API
   * @param {string} did - DID of the user
   * @returns {Promise<DatingPreferences | null>} - User preferences or null if not found
   */
  async getPreferences(did?: string): Promise<DatingPreferences | null> {
    try {
      console.log("Getting preferences for DID:", did);
      
      // Query for preferences with the matching DID
      const result = await this.apiCall(`/api/rest/v1/db/query/${PREFERENCES_DB}`, 'POST', {
        filters: { did: did }
      });
      
      if (result.data && result.data.length > 0) {
        return result.data[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error getting preferences:', error);
      throw error;
    }
  }
} 