"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircleIcon, InfoIcon, UploadIcon, XIcon, StarIcon } from "lucide-react"
import type { ProfileData } from "../profile-creation-flow"

interface PhotosStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onContinue: () => void
}

export default function PhotosStep({ profileData, updateProfileData, onContinue }: PhotosStepProps) {
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleContinue = () => {
    if (profileData.photos.length === 0) {
      setError("Please upload at least one photo")
      return
    }

    onContinue()
  }

  const simulatePhotoUpload = () => {
    setUploading(true)
    setError(null)

    // Simulate upload delay
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 15)
      const newPhoto = `/placeholder.svg?height=300&width=300&text=Photo+${profileData.photos.length + 1}`

      updateProfileData({
        photos: [...profileData.photos, newPhoto],
      })

      setUploading(false)
    }, 1500)
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
        <div className="bg-purple-50 p-4 rounded-lg flex items-start space-x-3">
          <InfoIcon className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">
              All images are stored securely off-chain. Your NFT profile will link to these photos via a hashed
              reference for authenticity.
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
                    <div className="h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
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

