"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircleIcon, PlusIcon, XIcon, HeartIcon, TagIcon } from "lucide-react"
import type { ProfileData } from "../profile-creation-flow"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PreferencesStepProps {
  profileData: ProfileData
  updateProfileData: (data: Partial<ProfileData>) => void
  onContinue: () => void
}

const SUGGESTED_INTERESTS = [
  "Music",
  "Movies",
  "Reading",
  "Travel",
  "Cooking",
  "Fitness",
  "Art",
  "Photography",
  "Technology",
  "Gaming",
  "Hiking",
  "Yoga",
  "Dancing",
  "Writing",
  "Fashion",
  "Sports",
  "Meditation",
  "Cycling",
]

export default function PreferencesStep({ profileData, updateProfileData, onContinue }: PreferencesStepProps) {
  const [error, setError] = useState<string | null>(null)
  const [newInterest, setNewInterest] = useState("")
  const interestsRef = useRef<HTMLDivElement>(null)

  const handleContinue = () => {
    if (profileData.interests.length === 0) {
      setError("Please add at least one interest")
      return
    }

    if (!profileData.relationshipGoals) {
      setError("Please select your relationship goals")
      return
    }

    onContinue()
  }

  const addInterest = (interest: string) => {
    if (!interest.trim()) return

    if (profileData.interests.includes(interest.trim())) {
      setError("This interest is already added")
      return
    }

    if (profileData.interests.length >= 10) {
      setError("You can add up to 10 interests")
      return
    }

    updateProfileData({
      interests: [...profileData.interests, interest.trim()],
    })

    setNewInterest("")
    setError(null)
  }

  const removeInterest = (interest: string) => {
    updateProfileData({
      interests: profileData.interests.filter((item) => item !== interest),
    })
  }

  return (
    <>
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-600 bg-clip-text text-transparent">
          Your Interests & Match Preferences
        </CardTitle>
        <CardDescription className="text-base mt-1 text-gray-600">Help us find your perfect matches</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Interests Section */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-1.5 rounded-md mr-2">
                <TagIcon className="h-4 w-4 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-indigo-800">Your Interests</h3>
            </div>

            {/* Interest cloud */}
            <div
              ref={interestsRef}
              className="min-h-[120px] mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100"
            >
              {profileData.interests.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <p className="text-indigo-300 text-lg">Add your interests below</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest) => (
                    <div
                      key={interest}
                      className="group bg-white flex items-center px-3 py-1.5 rounded-full border border-indigo-200 shadow-sm hover:shadow transition-all duration-200"
                    >
                      <span className="text-indigo-700 font-medium mr-2">{interest}</span>
                      <button
                        onClick={() => removeInterest(interest)}
                        className="h-5 w-5 rounded-full flex items-center justify-center bg-indigo-100 hover:bg-indigo-200 transition-colors"
                      >
                        <XIcon className="h-3 w-3 text-indigo-700" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interest input */}
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type an interest..."
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addInterest(newInterest)
                      }
                    }}
                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 pl-10 py-2 text-gray-800"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <TagIcon className="h-4 w-4 text-indigo-500" />
                  </div>
                </div>
                <Button
                  type="button"
                  onClick={() => addInterest(newInterest)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <PlusIcon className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
            </div>

            {/* Suggested interests */}
            <div>
              <p className="text-sm text-indigo-700 font-medium mb-3">Suggested interests:</p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_INTERESTS.filter((interest) => !profileData.interests.includes(interest))
                  .slice(0, 8)
                  .map((interest) => (
                    <button
                      key={interest}
                      onClick={() => addInterest(interest)}
                      className="bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 px-3 py-1.5 rounded-full text-indigo-700 font-medium text-sm border border-indigo-200 transition-all duration-200 hover:shadow-sm"
                    >
                      {interest}
                    </button>
                  ))}
              </div>
            </div>
          </div>

          {/* Relationship Goals Section */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="bg-indigo-100 p-1.5 rounded-md mr-2">
                <HeartIcon className="h-4 w-4 text-indigo-600" />
              </div>
              <h3 className="text-lg font-medium text-indigo-800">Relationship Goals</h3>
            </div>

            <p className="text-center text-gray-600 mb-6">What are you looking for?</p>

            <RadioGroup
              value={profileData.relationshipGoals}
              onValueChange={(value) => updateProfileData({ relationshipGoals: value })}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="long-term" id="long-term" className="sr-only peer" />
                <Label
                  htmlFor="long-term"
                  className="flex flex-col items-center p-4 rounded-lg border-2 border-indigo-200 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-indigo-50/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-full mb-2 flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    <HeartIcon className="h-6 w-6 text-indigo-600 peer-checked:text-white" />
                  </div>
                  <span className="font-medium text-indigo-800">Long-term Relationship</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="casual" id="casual" className="sr-only peer" />
                <Label
                  htmlFor="casual"
                  className="flex flex-col items-center p-4 rounded-lg border-2 border-indigo-200 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-indigo-50/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-full mb-2 flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    <svg
                      className="h-6 w-6 text-indigo-600 peer-checked:text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <span className="font-medium text-indigo-800">Casual Dating</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="friendship" id="friendship" className="sr-only peer" />
                <Label
                  htmlFor="friendship"
                  className="flex flex-col items-center p-4 rounded-lg border-2 border-indigo-200 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-indigo-50/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-full mb-2 flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    <svg
                      className="h-6 w-6 text-indigo-600 peer-checked:text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-indigo-800">Friendship</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="undecided" id="undecided" className="sr-only peer" />
                <Label
                  htmlFor="undecided"
                  className="flex flex-col items-center p-4 rounded-lg border-2 border-indigo-200 peer-checked:border-indigo-600 peer-checked:bg-indigo-50 hover:bg-indigo-50/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-full mb-2 flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-100 peer-checked:from-indigo-500 peer-checked:to-purple-500">
                    <svg
                      className="h-6 w-6 text-indigo-600 peer-checked:text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-medium text-indigo-800">Still Figuring It Out</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <Button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Continue to NFT Minting
        </Button>
      </CardFooter>
    </>
  )
}

