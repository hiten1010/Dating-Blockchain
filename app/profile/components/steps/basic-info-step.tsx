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

interface BasicInfoStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onContinue: () => void
}

export default function BasicInfoStep({ profileData, updateProfileData, onContinue }: BasicInfoStepProps) {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  
  // Check if there's existing profile data in Verida
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (veridaClient.isConnected()) {
          const profile = await ProfileService.getProfile();
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
              description: "Loaded your existing profile data from your Verida storage.",
              duration: 3000,
            });
          }
        }
      } catch (error) {
        console.error("Error loading profile data from Verida:", error);
      }
    };
    
    fetchProfileData();
  }, [updateProfileData]);

  const handleContinue = async () => {
    if (!profileData.displayName) {
      toast({
        variant: "destructive",
        title: "Required Field Missing",
        description: "Please enter your display name to continue",
        duration: 3000,
        className: "bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm border-purple-200/50 text-white shadow-lg hover:shadow-xl transition-all duration-200",
      })
      return
    }

    if (!profileData.age) {
      toast({
        variant: "destructive",
        title: "Required Field Missing",
        description: "Please enter your age to continue",
        duration: 3000,
        className: "bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-sm border-purple-200/50 text-white shadow-lg hover:shadow-xl transition-all duration-200",
      })
      return
    }
    
    // Save profile data to Verida
    setIsSaving(true);
    setError(null);
    
    try {
      // Ensure we're connected to Verida
      if (!veridaClient.isConnected()) {
        await veridaClient.connect();
      }
      
      // Save profile data
      await ProfileService.saveProfile({
        displayName: profileData.displayName,
        age: profileData.age,
        location: profileData.location,
        bio: profileData.bio,
      });
      
      toast({
        title: "Profile Saved",
        description: "Your profile has been securely stored in your Verida database.",
        duration: 3000,
      });
      
      // Continue to next step
      onContinue();
    } catch (err) {
      console.error("Error saving profile to Verida:", err);
      setError("Failed to save profile. Please try again.");
      
      toast({
        variant: "destructive",
        title: "Profile Save Failed",
        description: "There was an error saving your profile to Verida. Please try again.",
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
        
        {error && (
          <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
            <AlertCircleIcon className="h-4 w-4 text-red-600" />
            <AlertDescription>{error}</AlertDescription>
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
          disabled={isSaving}
        >
          {isSaving ? (
            <div className="flex items-center justify-center">
              <LoaderIcon className="h-4 w-4 animate-spin mr-2" />
              <span>Saving to Verida...</span>
            </div>
          ) : (
            "Continue to Photos"
          )}
        </Button>
      </CardFooter>
    </>
  )
}

