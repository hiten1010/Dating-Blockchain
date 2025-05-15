"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircleIcon, LockIcon, UserIcon, MapPinIcon, CalendarIcon, MessageSquareIcon, LoaderIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { ProfileData } from "../profile-creation-flow"
import { useToast } from "@/components/ui/use-toast"
import { ProfileService } from "@/app/lib/profile-service"
import { veridaClient } from "@/app/lib/verida-client-wrapper"
import { useVeridaClient, useProfileRestService } from "@/app/lib/clientside-verida"

interface BasicInfoStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onContinue: () => void
}

export default function BasicInfoStep({ profileData, updateProfileData, onContinue }: BasicInfoStepProps) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [clientInitialized, setClientInitialized] = useState<boolean>(false)
  const { client, isLoading, error: clientError } = useVeridaClient();
  const { service: profileRestService, isLoading: isRestLoading, error: restError } = useProfileRestService();
  
  // Initialize Verida client if needed
  useEffect(() => {
    const initializeVeridaClient = async () => {
      try {
        if (!veridaClient.getClient()) {
          console.log("Initializing Verida client...");
          await veridaClient.init();
          setClientInitialized(true);
          console.log("Verida client initialized.");
        } else {
          setClientInitialized(true);
          console.log("Verida client already initialized.");
        }
      } catch (err) {
        console.error("Error initializing Verida client:", err);
        setError("Failed to initialize Verida client. Please try again.");
      }
    };
    
    initializeVeridaClient();
  }, []);
  
  // Check if there's existing profile data in Verida
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Try to get the DID
        let did = null;
        try {
          if (veridaClient.isConnected()) {
            did = veridaClient.getDid();
          } else {
            const connected = await veridaClient.connect();
            if (connected) {
              did = veridaClient.getDid();
            }
          }
        } catch (didError) {
          console.error("Error getting DID:", didError);
        }
        
        console.log("Fetching profile data using REST API...");
        if (profileRestService) {
          // Use the REST API service to get profile data
          const profile = await profileRestService.getProfile(did);
          console.log("Profile data retrieved:", profile);
          
          if (profile) {
            // Update the form with data from Verida
            updateProfileData({
              displayName: profile.displayName || profileData.displayName,
              age: profile.age || profileData.age,
              location: profile.location || profileData.location,
              bio: profile.bio || profileData.bio,
            });
            
            toast({
              title: "Profile Data Retrieved",
              description: "Loaded your existing profile data from Verida.",
              duration: 3000,
            });
          }
        }
      } catch (error) {
        console.error("Error loading profile data from Verida REST API:", error);
        
        // SDK fallback approach has been removed to avoid blocking progression to next steps
      }
    };
    
    if (clientInitialized && profileRestService) {
      fetchProfileData();
    }
  }, [clientInitialized, profileRestService, updateProfileData, profileData, toast]);

  const handleContinue = async () => {
    if (!profileData.displayName) {
      toast({
        variant: "destructive",
        title: "Required Field Missing",
        description: "Please enter your display name to continue",
        duration: 3000,
      })
      return
    }

    if (!profileData.age) {
      toast({
        variant: "destructive",
        title: "Required Field Missing",
        description: "Please enter your age to continue",
        duration: 3000,
      })
      return
    }
    
    // Save profile data to Verida
    setIsSaving(true);
    setError(null);
    
    try {
      console.log("Starting profile save process...");
      
      // Get DID if possible
      let did = "unknown";
      try {
        // Make sure client is initialized
        if (!veridaClient.getClient()) {
          console.log("Initializing Verida client before save...");
          await veridaClient.init();
        }
        
        // Ensure we're connected to Verida to get DID
        if (!veridaClient.isConnected()) {
          console.log("Connecting to Verida before save...");
          const connected = await veridaClient.connect();
          if (connected) {
            did = veridaClient.getDid() || "unknown";
            console.log("Connected successfully, got DID:", did);
          } else {
            console.warn("Failed to connect to Verida, will use 'unknown' DID");
          }
        } else {
          did = veridaClient.getDid() || "unknown";
          console.log("Already connected, using DID:", did);
        }
      } catch (didError) {
        console.error("Error getting DID, will use 'unknown':", didError);
      }
      
      if (did === "unknown") {
        console.warn("Using 'unknown' as DID. This might cause issues with data retrieval later.");
        toast({
          title: "Authentication Notice",
          description: "Unable to authenticate with Verida. Your data will be saved with a temporary identifier.",
          duration: 5000,
        });
      }
      
      // Prepare profile data
      const profileDataToSave = {
        did: did,
        displayName: profileData.displayName,
        age: profileData.age,
        location: profileData.location || "",
        bio: profileData.bio || "",
        // Ensure interests are initialized
        interests: profileData.interests || [],
        // Ensure relationshipGoals is initialized
        relationshipGoals: profileData.relationshipGoals || "",
        // Ensure primaryPhotoIndex is initialized
        primaryPhotoIndex: profileData.primaryPhotoIndex || 0
      };
      
      console.log("Saving profile data:", profileDataToSave);
      
      // Try to save using the REST service first
      if (profileRestService) {
        try {
          console.log("Using REST API to save profile with standard schemas");
          const savedProfile = await profileRestService.saveProfile(profileDataToSave);
          console.log("Profile saved successfully via REST API:", savedProfile);
          
          toast({
            title: "Profile Saved",
            description: "Your profile has been securely stored using Verida.",
            duration: 3000,
          });
          
          // Continue to next step
          onContinue();
          return;
        } catch (restError: any) {
          // Check for specific REST API errors
          const errorMessage = restError instanceof Error ? restError.message : String(restError);
          
          if (errorMessage.includes("Missing scope")) {
            console.error("REST API error - Missing scope:", errorMessage);
            setError("The app lacks permission to save your profile. The API token is missing required scopes.");
            
            toast({
              variant: "destructive",
              title: "Permission Error",
              description: "Your profile cannot be saved due to missing API permissions. Please use the Continue anyway button to proceed.",
              duration: 5000,
            });
          } else if (errorMessage.includes("Invalid permission")) {
            console.error("REST API error - Invalid permission:", errorMessage);
            setError("The app lacks permission to save your profile. Please use the Continue anyway button to proceed.");
            
            // REMOVED: Try falling back to SDK approach
            // console.log("Attempting to fall back to SDK approach after REST API permission error");
          } else {
            console.error("REST API error:", errorMessage);
            setError(`REST API error: ${errorMessage}. Please use the Continue anyway button to proceed.`);
            
            // REMOVED: Try falling back to SDK approach
            // console.log("Attempting to fall back to SDK approach after REST API error");
          }
        }
      } else {
        console.log("REST service not available");
        setError("REST service not available. Please use the Continue anyway button to proceed.");
        toast({
          variant: "destructive",
          title: "Service Unavailable",
          description: "The profile service is not available. Please use the Continue anyway button to proceed.",
          duration: 5000,
        });
      }
      
      // REMOVED SDK fallback approach - comment out the entire SDK fallback block
      /* 
      // Fall back to SDK approach - this may not work correctly with standard schemas
      // without further modifications to ProfileService
      try {
        console.log("Using SDK to save profile");
        const savedProfile = await ProfileService.saveProfile(profileDataToSave);
        console.log("Profile saved successfully via SDK:", savedProfile);
        
        toast({
          title: "Profile Saved (SDK)",
          description: "Your profile has been stored using the Verida SDK.",
          duration: 3000,
        });
        
        // Continue to next step
        onContinue();
      } catch (sdkError) {
        console.error("SDK approach also failed:", sdkError);
        const errorMessage = sdkError instanceof Error ? sdkError.message : String(sdkError);
        setError(`SDK save error: ${errorMessage}`);
        
        toast({
          variant: "destructive",
          title: "Profile Save Failed",
          description: "Both REST API and SDK approaches failed to save your profile.",
          duration: 3000,
        });
      }
      */
    } catch (err) {
      console.error("Error in profile save process:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Profile Save Failed",
        description: "An unexpected error occurred while saving your profile.",
        duration: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
          Tell Us About Yourself
        </CardTitle>
        <CardDescription className="text-base mt-1 text-gray-600">
          Create your basic profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
          <p className="text-sm text-indigo-700 flex items-start">
            <LockIcon className="h-4 w-4 text-indigo-600 mr-2 mt-0.5" />
            <span>
              Your profile data will be stored in your personal encrypted Verida database that only you control.
              Required fields are marked with an asterisk (*).
            </span>
          </p>
        </div>
        
        {(clientError || restError) && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertCircleIcon className="h-4 w-4 text-red-600" />
            <AlertDescription>
              {clientError && `Verida client error: ${clientError.message}. `}
              {restError && `REST API error: ${restError.message}. `}
              Please refresh and try again.
            </AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertCircleIcon className="h-4 w-4 text-red-600" />
            <AlertDescription className="flex justify-between items-center">
              <span>{error}</span>
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-4 text-xs border-red-300 hover:bg-red-100"
                onClick={() => onContinue()}
              >
                Continue anyway
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Display Name Field */}
            <div className="space-y-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <Label htmlFor="displayName" className="text-sm font-medium flex items-center text-indigo-800">
                <div className="bg-indigo-100 p-1.5 rounded-md mr-2">
                  <UserIcon className="h-4 w-4 text-indigo-600" />
                </div>
                Display Name <span className="text-pink-500 ml-1">*</span>
              </Label>
              <Input
                id="displayName"
                value={profileData.displayName}
                onChange={(e) => updateProfileData({ displayName: e.target.value })}
                placeholder="What should we call you?"
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 text-gray-800 placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-500">This is how others will see you on the platform</p>
            </div>

            {/* Age Field */}
            <div className="space-y-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <Label htmlFor="age" className="text-sm font-medium flex items-center text-indigo-800">
                  <div className="bg-indigo-100 p-1.5 rounded-md mr-2">
                    <CalendarIcon className="h-4 w-4 text-indigo-600" />
                  </div>
                  Age <span className="text-pink-500 ml-1">*</span>
                </Label>
                <span className="flex items-center text-xs text-indigo-600">
                  <LockIcon className="h-3 w-3 mr-1" />
                  Stored securely in Verida
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-1/3">
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="120"
                    value={profileData.age}
                    onChange={(e) => updateProfileData({ age: e.target.value })}
                    placeholder="Your age"
                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 text-gray-800 placeholder:text-gray-400"
                  />
                </div>
                <div className="w-2/3 flex items-center">
                  {/* Custom range slider implementation to avoid CSS conflicts */}
                  <div className="relative w-full h-2">
                    {/* Background track */}
                    <div className="absolute inset-0 rounded-full bg-indigo-200"></div>

                    {/* Filled track */}
                    <div
                      className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
                      style={{
                        width: `${profileData.age ? ((Number.parseInt(profileData.age) - 18) / 82) * 100 : 0}%`,
                      }}
                    ></div>

                    {/* Actual range input (invisible but functional) */}
                    <input
                      type="range"
                      min="18"
                      max="100"
                      value={profileData.age || "25"}
                      onChange={(e) => updateProfileData({ age: e.target.value })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Location Field */}
            <div className="space-y-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <Label htmlFor="location" className="text-sm font-medium flex items-center text-indigo-800">
                <div className="bg-indigo-100 p-1.5 rounded-md mr-2">
                  <MapPinIcon className="h-4 w-4 text-indigo-600" />
                </div>
                Location <span className="text-gray-500 ml-1">(Optional)</span>
              </Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => updateProfileData({ location: e.target.value })}
                placeholder="Where are you based?"
                className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 text-gray-800 placeholder:text-gray-400"
              />
              <p className="text-xs text-gray-500">This helps match you with people in your area</p>
            </div>

            {/* Bio Field */}
            <div className="space-y-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <Label htmlFor="bio" className="text-sm font-medium flex items-center text-indigo-800">
                  <div className="bg-indigo-100 p-1.5 rounded-md mr-2">
                    <MessageSquareIcon className="h-4 w-4 text-indigo-600" />
                  </div>
                  Your Bio <span className="text-gray-500 ml-1">(Optional)</span>
                </Label>
                <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
                  {profileData.bio.length}/200
                </span>
              </div>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => updateProfileData({ bio: e.target.value })}
                placeholder="Share something interesting about yourself..."
                maxLength={200}
                className="min-h-[120px] border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 text-gray-800 placeholder:text-gray-400 resize-none"
              />
              <p className="text-xs text-gray-500">
                Tell potential matches about your interests, hobbies, or anything else you'd like to share
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          disabled={isSaving || isLoading || isRestLoading}
        >
          {isSaving ? (
            <div className="flex items-center justify-center">
              <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
              <span>Saving to Verida...</span>
            </div>
          ) : isLoading || isRestLoading ? (
            <div className="flex items-center justify-center">
              <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
              <span>Loading services...</span>
            </div>
          ) : (
            "Continue to Photos"
          )}
        </Button>
      </CardFooter>
    </>
  )
}

