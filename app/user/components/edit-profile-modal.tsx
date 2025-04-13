"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, Hexagon } from "lucide-react"
import { motion } from "framer-motion"

type ProfileData = {
  name: string
  bio: string
  age: number
  location: string
  profileImage: string
  isOnChain: {
    name: boolean
    bio: boolean
    age: boolean
    location: boolean
  }
}

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  profile: ProfileData
}

export default function EditProfileModal({ isOpen, onClose, profile }: EditProfileModalProps) {
  const [formData, setFormData] = useState<ProfileData>({ ...profile })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      onClose()
      // Here you would update the profile data
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white border border-indigo-100 text-slate-800">
        <DialogHeader>
          <DialogTitle className="text-indigo-700 flex items-center gap-2">
            <Hexagon className="h-5 w-5 text-indigo-500 fill-indigo-100" />
            Edit Your Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="name" className="text-slate-700">
                Display Name
              </Label>
              {profile.isOnChain.name && (
                <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                    On-Chain
                  </Badge>
                  <InfoIcon className="h-4 w-4 text-purple-500" />
                </div>
              )}
            </div>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-white border-indigo-200 text-slate-800 focus:border-indigo-500"
            />
            {profile.isOnChain.name && (
              <motion.p
                className="text-xs text-purple-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Changing this field will require a blockchain transaction.
              </motion.p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="age" className="text-slate-700">
                Age
              </Label>
              {profile.isOnChain.age && (
                <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                  On-Chain
                </Badge>
              )}
            </div>
            <Input
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
              className="bg-white border-indigo-200 text-slate-800 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="location" className="text-slate-700">
                Location
              </Label>
              {profile.isOnChain.location && (
                <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                  On-Chain
                </Badge>
              )}
            </div>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="bg-white border-indigo-200 text-slate-800 focus:border-indigo-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="bio" className="text-slate-700">
                Bio
              </Label>
              {profile.isOnChain.bio ? (
                <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                  On-Chain
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-300">
                  Off-Chain
                </Badge>
              )}
            </div>
            <Textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="bg-white border-indigo-200 text-slate-800 focus:border-indigo-500"
            />
            {profile.isOnChain.bio && (
              <p className="text-xs text-purple-600">Changing this field will require a blockchain transaction.</p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="bg-white border-indigo-200 hover:bg-indigo-50 text-slate-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

