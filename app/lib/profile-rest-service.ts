'use client';

import { 
  APP_SCHEMA_MAPPING, 
  SCHEMA_SHORTHAND, 
  SCHEMA_URLS,
  formatDataToSchema, 
  formatSchemaToData,
  encodeSchemaUrl,
  prepareSchemaForEndpoint
} from './verida-schema-mapping';

// Constants
const API_BASE_URL = 'https://api.verida.ai';
// Updated token with all necessary scopes
const AUTH_TOKEN = '58d16670-2dee-11f0-b8ca-5b198f1a59d7pduhzxgYXXdVHL5liF0coKxSTCZMXAUidn63_UnddHHLwm+I';

// Using standard Verida schemas
const PROFILE_SCHEMA_URL = SCHEMA_URLS.SOCIAL_POST; // For profile information
const PREFERENCES_SCHEMA_URL = SCHEMA_URLS.SOCIAL_FOLLOWING; // For preferences
const PHOTOS_SCHEMA_URL = SCHEMA_URLS.FILE; // For photos

// Encoded schema parameters for API endpoints - always use full URL encoding, not shortcuts
const PROFILE_SCHEMA_PARAM = encodeSchemaUrl(PROFILE_SCHEMA_URL);
const PREFERENCES_SCHEMA_PARAM = encodeSchemaUrl(PREFERENCES_SCHEMA_URL);
const PHOTOS_SCHEMA_PARAM = encodeSchemaUrl(PHOTOS_SCHEMA_URL);

// Required scopes for each schema
const REQUIRED_SCOPES = {
  [SCHEMA_SHORTHAND.SOCIAL_POST]: APP_SCHEMA_MAPPING.DATING_PROFILE.requiredScope,
  [SCHEMA_SHORTHAND.SOCIAL_FOLLOWING]: APP_SCHEMA_MAPPING.DATING_PREFERENCES.requiredScope,
  [SCHEMA_SHORTHAND.FILE]: APP_SCHEMA_MAPPING.PROFILE_PHOTOS.requiredScope
};

// API scopes required for operations
const API_SCOPES = {
  QUERY: 'api:ds-query',
  CREATE: 'api:ds-create',
  UPDATE: 'api:ds-update',
  GET_BY_ID: 'api:ds-get-by-id',
  DELETE: 'api:ds-delete'
};

// Function to properly encode schema URLs for API endpoints
function encodeSchemaForEndpoint(schemaUrl: string): string {
  // Use the encodeSchemaUrl function from our mapping file
  return encodeSchemaUrl(schemaUrl);
}

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
 * ProfileRestService
 * Handles API communication with Verida REST API for profile operations
 */
export const ProfileRestService = {
  /**
   * Generic API call method
   */
  async apiCall(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
    try {
      // Ensure endpoint starts with a slash if needed
      if (!endpoint.startsWith('/')) {
        endpoint = '/' + endpoint;
      }
      
      const url = `${API_BASE_URL}${endpoint}`;
      console.log(`Making ${method} request to ${url}`);
      
      // Add detailed debugging info
      console.log(`FULL REQUEST DETAILS:
Raw URL: ${url}
Method: ${method}
Headers: Bearer token (hidden for security)
Body: ${body ? JSON.stringify(body, null, 2) : 'none'}`);
      
      if (body) {
        console.log(`Request body:`, body);
      }
      
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : undefined
      });
      
      if (!response.ok) {
        // Try to get error details from response
        let errorDetails: string;
        try {
          const errorJson = await response.json();
          errorDetails = JSON.stringify(errorJson);
        } catch {
          errorDetails = await response.text();
        }
        
        // Log and throw the error
        console.error(`API Error (${response.status}): ${errorDetails}`);
        throw new Error(`API Error (${response.status}): ${errorDetails}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API call failed', error);
      throw error;
    }
  },
  
  /**
   * Save a profile to the Verida network
   */
  async saveProfile(profileData: Partial<DatingProfile>): Promise<DatingProfile> {
    try {
      console.log("Saving profile data via REST API using social-post schema:", profileData);
      
      // Use our mapping utility to format data according to the schema
      const socialPostData = formatDataToSchema('DATING_PROFILE', profileData);
      console.log("Formatted data for Verida schema:", JSON.stringify(socialPostData, null, 2));
      
      // Ensure that these required fields are set (most common causes of 500 errors)
      if (!socialPostData.schema) {
        console.error("ERROR: Schema URL missing from formatted data");
        socialPostData.schema = SCHEMA_URLS.SOCIAL_POST;
      }
      
      if (!socialPostData.name) {
        console.error("ERROR: 'name' field missing (required by schema)");
        socialPostData.name = profileData.displayName || "User Profile";
      }
      
      if (!socialPostData.uri) {
        console.error("ERROR: 'uri' field missing (required by schema)");
        socialPostData.uri = `dating:profile:${profileData.did || Date.now()}`;
      }
      
      console.log("Final data after validation checks:", JSON.stringify(socialPostData, null, 2));
      
      // Check if profile already exists by querying
      let existingProfiles;
      try {
        // Query using DID to see if profile exists
        const queryEndpoint = `/api/rest/v1/ds/query/${PROFILE_SCHEMA_PARAM}`;
        // Use the correct format expected by the API for queries
        const queryBody = {
          recordFilter: {
            did: profileData.did,
            "metadata.profileType": "dating" 
          },
          options: {
            limit: 1
          }
        };
        
        existingProfiles = await this.apiCall(queryEndpoint, 'POST', queryBody);
        console.log("Query result:", JSON.stringify(existingProfiles, null, 2));
      } catch (error) {
        console.warn("Error querying for existing profile", error);
        existingProfiles = { data: [] };
      }
      
      let result;
      if (existingProfiles?.data?.length > 0) {
        // Update existing profile
        const recordId = existingProfiles.data[0]._id;
        const updateEndpoint = `/api/rest/v1/ds/${PROFILE_SCHEMA_PARAM}/${recordId}`;
        
        // Update instead of creating new record - Wrap in 'record' object as required by the API
        result = await this.apiCall(updateEndpoint, 'PUT', { record: socialPostData });
        console.log("Updated profile:", result);
      } else {
        // Create new profile
        const createEndpoint = `/api/rest/v1/ds/${PROFILE_SCHEMA_PARAM}`;
        console.log("Creating new profile at endpoint:", createEndpoint);
        
        // IMPORTANT FIX: Wrap the data in a 'record' object as required by the Verida API
        const requestBody = {
          record: socialPostData
        };
        console.log("With data:", JSON.stringify(requestBody, null, 2));
        
        // Make the API call to create the profile
        result = await this.apiCall(createEndpoint, 'POST', requestBody);
        console.log("Created new profile:", result);
      }
      
      // Convert back to our app's format (result.record contains the created/updated data)
      return formatSchemaToData('DATING_PROFILE', result.record) as DatingProfile;
    } catch (error) {
      console.error('Error saving profile', error);
      throw error;
    }
  },
  
  /**
   * Get a profile from the Verida network
   */
  async getProfile(did: string): Promise<DatingProfile | null> {
    try {
      console.log(`Getting profile for DID: ${did}`);
      
      // Query for profile with the given DID
      const queryEndpoint = `/api/rest/v1/ds/query/${PROFILE_SCHEMA_PARAM}`;
      const queryBody = {
        recordFilter: {
          did: did,
          "metadata.profileType": "dating"
        },
        options: {
          limit: 1
        }
      };
      
      const result = await this.apiCall(queryEndpoint, 'POST', queryBody);
      console.log(`Query result:`, result);
      
      if (result?.data?.length > 0) {
        // Convert to our app format and return
        return formatSchemaToData('DATING_PROFILE', result.data[0]) as DatingProfile;
      } else {
        console.log(`No profile found for DID: ${did}`);
        return null;
      }
    } catch (error) {
      console.error('Error getting profile', error);
      throw error;
    }
  },
  
  /**
   * Delete a profile from the Verida network
   */
  async deleteProfile(did: string): Promise<boolean> {
    try {
      console.log(`Deleting profile for DID: ${did}`);
      
      // First find the profile ID
      const queryEndpoint = `/api/rest/v1/ds/query/${PROFILE_SCHEMA_PARAM}`;
      const queryBody = {
        recordFilter: {
          did: did,
          "metadata.profileType": "dating"
        },
        options: {
          limit: 1
        }
      };
      
      const result = await this.apiCall(queryEndpoint, 'POST', queryBody);
      
      if (result?.data?.length > 0) {
        const recordId = result.data[0]._id;
        // Delete the record
        const deleteEndpoint = `/api/rest/v1/ds/${PROFILE_SCHEMA_PARAM}/${recordId}`;
        await this.apiCall(deleteEndpoint, 'DELETE');
        console.log(`Profile deleted successfully`);
        return true;
      } else {
        console.log(`No profile found to delete for DID: ${did}`);
        return false;
      }
    } catch (error) {
      console.error('Error deleting profile', error);
      throw error;
    }
  },
  
  /**
   * Search for profiles with given criteria
   */
  async searchProfiles(criteria: {
    ageMin?: number;
    ageMax?: number;
    location?: string;
    interests?: string[];
    limit?: number;
    offset?: number;
  }): Promise<DatingProfile[]> {
    try {
      console.log(`Searching profiles with criteria:`, criteria);
      
      // Build query object based on criteria
      const filter: any = {
        "metadata.profileType": "dating" // Always filter to our app's profiles
      };
      
      // Add age filtering if provided
      if (criteria.ageMin !== undefined || criteria.ageMax !== undefined) {
        filter["metadata.age"] = {};
        if (criteria.ageMin !== undefined) {
          filter["metadata.age"]["$gte"] = criteria.ageMin.toString();
        }
        if (criteria.ageMax !== undefined) {
          filter["metadata.age"]["$lte"] = criteria.ageMax.toString();
        }
      }
      
      // Add location filtering if provided
      if (criteria.location) {
        filter["metadata.location"] = criteria.location;
      }
      
      // Add interests filtering if provided
      if (criteria.interests && criteria.interests.length > 0) {
        filter["metadata.interests"] = { "$in": criteria.interests };
      }
      
      const queryEndpoint = `/api/rest/v1/ds/query/${PROFILE_SCHEMA_PARAM}`;
      const queryBody = {
        recordFilter: filter,
        options: {
          limit: criteria.limit || 20,
          skip: criteria.offset || 0
        }
      };
      
      const result = await this.apiCall(queryEndpoint, 'POST', queryBody);
      
      if (result?.data?.length > 0) {
        // Convert each profile to our app format
        return result.data.map((item: any) => 
          formatSchemaToData('DATING_PROFILE', item)
        ) as DatingProfile[];
      } else {
        console.log(`No profiles found matching criteria`);
        return [];
      }
    } catch (error) {
      console.error('Error searching profiles', error);
      throw error;
    }
  },

  // Add a new method for handling photo uploads
  async saveProfilePhoto(photoData: Partial<ProfilePhoto>): Promise<ProfilePhoto> {
    try {
      console.log("Saving profile photo via REST API:", photoData);
      
      // Format data for the file schema
      const fileSchemaData = formatDataToSchema('PROFILE_PHOTOS', photoData);
      console.log("Formatted photo data for Verida schema:", JSON.stringify(fileSchemaData, null, 2));
      
      // Ensure required fields
      if (!fileSchemaData.schema) {
        console.error("ERROR: Schema URL missing from formatted data");
        fileSchemaData.schema = SCHEMA_URLS.FILE;
      }
      
      // Create photo record
      const createEndpoint = `/api/rest/v1/ds/${PHOTOS_SCHEMA_PARAM}`;
      console.log("Creating new photo record at endpoint:", createEndpoint);
      
      // Wrap the data in a 'record' object as required by the API
      const requestBody = {
        record: fileSchemaData
      };
      console.log("With data:", JSON.stringify(requestBody, null, 2));
      
      // Make the API call
      const result = await this.apiCall(createEndpoint, 'POST', requestBody);
      console.log("Created new photo record:", result);
      
      // Convert back to our app's format
      return formatSchemaToData('PROFILE_PHOTOS', result.record) as ProfilePhoto;
    } catch (error) {
      console.error('Error saving photo', error);
      throw error;
    }
  }
}

export default ProfileRestService; 