"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircleIcon, LockIcon, UserIcon, MapPinIcon, CalendarIcon, MessageSquareIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { ProfileData } from "../profile-creation-flow"

interface BasicInfoStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onContinue: () => void
}

export default function BasicInfoStep({ profileData, updateProfileData, onContinue }: BasicInfoStepProps) {
  const [error, setError] = useState<string | null>(null)

  const handleContinue = () => {
    if (!profileData.displayName) {
      setError("Display name is required")
      return
    }

    if (!profileData.age) {
      setError("Age is required")
      return
    }

    onContinue()
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
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-100">
          <p className="text-sm text-indigo-700">
            This information will be used to create your profile. Required fields are marked with an asterisk (*).
          </p>
        </div>

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
                  Stored securely off-chain
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
        >
          Continue to Photos
        </Button>
      </CardFooter>
    </>
  )
}

