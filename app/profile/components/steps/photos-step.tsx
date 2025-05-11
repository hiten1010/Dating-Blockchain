"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { InfoIcon, UploadIcon, XIcon, StarIcon, AlertTriangleIcon } from "lucide-react"
import type { ProfileData } from "../profile-creation-flow"
import { useToast } from "@/components/ui/use-toast"
import { HeartLoader } from "@/components/ui/heart-loader"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useVeridaClient, useProfileRestService } from "@/app/lib/clientside-verida"
import { formatDataToSchema, SCHEMA_URLS, encodeSchemaUrl } from "@/app/lib/verida-schema-mapping"

interface PhotosStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onContinue: () => void
}

export default function PhotosStep({ profileData, updateProfileData, onContinue }: PhotosStepProps) {
  const { toast } = useToast()
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const { getAuthStatus, getDidId } = useVeridaClient()
  const { service: profileRestService, isLoading: serviceLoading } = useProfileRestService()

  const savePhotoToVerida = async (photoUrl: string, order: number, description: string = "") => {
    try {
      // Get authentication status and DID
      const isAuthenticated = await getAuthStatus()
      if (!isAuthenticated) {
        throw new Error("Not authenticated with Verida")
      }
      
      const did = await getDidId() 
      
      if (!did) {
        throw new Error("Missing DID")
      }
      
      if (serviceLoading || !profileRestService) {
        console.warn("ProfileRestService not ready yet")
        return false
      }
      
      // Create photo data object
      const photoData = {
        did: did,
        description: description || `Profile Photo ${order + 1}`,
        photoUrl: photoUrl,
        size: 1024 * 100, // Estimated size (100KB)
        order: order,
        isPrivate: false
      }
      
      // Use the service to save the photo
      const result = await profileRestService.saveProfilePhoto(photoData)
      console.log("Photo saved to Verida:", result)
      
      return true
    } catch (error) {
      console.error("Error saving photo to Verida:", error)
      return false
    }
  }

  const handleContinue = () => {
    if (profileData.photos.length === 0) {
      toast({
        variant: "destructive",
        title: "Required Field Missing",
        description: "Please upload at least one photo to continue",
        duration: 3000, // 3 seconds
      })
      return
    }

    onContinue()
  }

  const simulatePhotoUpload = async () => {
    setUploading(true)
    setUploadError(null)

    try {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const randomId = Math.random().toString(36).substring(2, 15)
      const newPhoto = `/placeholder.svg?height=300&width=300&text=Photo+${profileData.photos.length + 1}`
      
      // Try to save to Verida
      const savedToVerida = await savePhotoToVerida(
        newPhoto, 
        profileData.photos.length,
        `Profile Photo ${profileData.photos.length + 1}`
      )
      
      if (!savedToVerida) {
        console.warn("Photo wasn't saved to Verida, but will continue with local update")
      }

      updateProfileData({
        photos: [...profileData.photos, newPhoto],
      })
    } catch (error) {
      console.error("Error during photo upload:", error)
      setUploadError("Failed to upload photo. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const removePhoto = (index: number) => {
    const updatedPhotos = [...profileData.photos]
    updatedPhotos.splice(index, 1)

    // If removing the primary photo, reset the primary index
    let newPrimaryIndex = profileData.primaryPhotoIndex
    if (index === profileData.primaryPhotoIndex) {
      newPrimaryIndex = updatedPhotos.length > 0 ? 0 : -1
    } else if (index < profileData.primaryPhotoIndex) {
      newPrimaryIndex--
    }

    updateProfileData({
      photos: updatedPhotos,
      primaryPhotoIndex: newPrimaryIndex,
    })
  }

  const setPrimaryPhoto = (index: number) => {
    updateProfileData({ primaryPhotoIndex: index })
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Add Profile Photos</CardTitle>
        <CardDescription>Upload photos to showcase your personality</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {uploadError && (
          <Alert variant="destructive">
            <AlertTriangleIcon className="h-4 w-4" />
            <AlertTitle>Upload Error</AlertTitle>
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}
      
        <div className="bg-purple-50 p-4 rounded-lg flex items-start space-x-3">
          <InfoIcon className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">
              All images are stored securely off-chain using the Verida network. Your NFT profile will link to these photos via a hashed
              reference for authenticity.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-3 gap-4">
              {profileData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <div
                    className={`aspect-square rounded-lg overflow-hidden border-2 ${index === profileData.primaryPhotoIndex ? "border-pink-500" : "border-gray-200"}`}
                  >
                    <img
                      src={photo || "/placeholder.svg"}
                      alt={`Profile photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removePhoto(index)}
                    >
                      <XIcon className="h-3 w-3" />
                    </Button>
                    {index !== profileData.primaryPhotoIndex && (
                      <Button
                        variant="default"
                        size="icon"
                        className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-amber-500 hover:bg-amber-600"
                        onClick={() => setPrimaryPhoto(index)}
                      >
                        <StarIcon className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  {index === profileData.primaryPhotoIndex && (
                    <div className="absolute bottom-2 left-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
                      Primary
                    </div>
                  )}
                </div>
              ))}

              {profileData.photos.length < 6 && (
                <div
                  className="aspect-square rounded-lg border-2 border-dashed border-purple-300 flex flex-col items-center justify-center cursor-pointer hover:bg-purple-50/50 transition-all duration-300 hover:border-pink-400 hover:shadow-inner"
                  onClick={simulatePhotoUpload}
                >
                  {uploading ? (
                    <HeartLoader size="sm" />
                  ) : (
                    <>
                      <UploadIcon className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-muted-foreground">Upload Photo</p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/3 bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-700 mb-4">Photo Guidelines</h3>
            <div className="text-sm text-muted-foreground space-y-3">
              <p className="flex items-center">
                <span className="inline-block w-4 h-4 bg-purple-200 rounded-full mr-2 flex-shrink-0"></span>
                Upload up to 6 photos
              </p>
              <p className="flex items-center">
                <span className="inline-block w-4 h-4 bg-purple-200 rounded-full mr-2 flex-shrink-0"></span>
                First photo will be your primary photo by default
              </p>
              <p className="flex items-center">
                <span className="inline-block w-4 h-4 bg-purple-200 rounded-full mr-2 flex-shrink-0"></span>
                Click the star icon to set a different primary photo
              </p>
              <p className="flex items-center">
                <span className="inline-block w-4 h-4 bg-purple-200 rounded-full mr-2 flex-shrink-0"></span>
                Supported formats: JPEG, PNG (max 5MB each)
              </p>
              <p className="flex items-center">
                <span className="inline-block w-4 h-4 bg-purple-200 rounded-full mr-2 flex-shrink-0"></span>
                Clear, recent photos work best
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleContinue}
          className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] rounded-xl py-5"
          disabled={uploading}
        >
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          <span className="relative">Continue to Preferences</span>
        </Button>
      </CardFooter>
    </>
  )
}

