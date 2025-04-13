"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  PencilIcon,
  MapPinIcon,
  CalendarIcon,
  Hexagon,
  ChevronRight,
  ShieldIcon,
  LockIcon,
  HistoryIcon,
} from "lucide-react"
import EditProfileModal from "./edit-profile-modal"

// Mock data - would be fetched from your API
const profileData = {
  name: "Alex Johnson",
  bio: "Blockchain enthusiast and coffee lover. Looking for meaningful connections in the web3 world.",
  age: 28,
  location: "San Francisco, CA",
  profileImage: "/placeholder.svg?height=200&width=200",
  isOnChain: {
    name: true,
    bio: false,
    age: true,
    location: false,
  },
}

export default function ProfileSnapshot() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative backdrop-blur-sm bg-white/80 rounded-2xl border border-indigo-100 p-6 h-full shadow-md">
            <div className="absolute -top-3 -right-3 rotate-12">
              <Hexagon className="h-8 w-8 text-cyan-500 fill-cyan-100" />
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full blur opacity-70 group-hover:opacity-100 transition duration-1000"></div>
                <Avatar className="h-32 w-32 relative">
                  <AvatarImage src={profileData.profileImage} alt={profileData.name} className="object-cover" />
                  <AvatarFallback className="bg-gradient-to-br from-purple-400 to-blue-400 text-white text-2xl">
                    {profileData.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Button variant="ghost" size="sm" className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700">
                <PencilIcon className="h-3 w-3 mr-1" />
                Change Photo
              </Button>

              <div className="w-full space-y-4 mt-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-800">{profileData.name}</h3>
                    {profileData.isOnChain.name && (
                      <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                        On-Chain
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-slate-600 gap-2">
                    <CalendarIcon className="h-4 w-4 text-indigo-500" />
                    <span>{profileData.age} years old</span>
                    {profileData.isOnChain.age && (
                      <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                        On-Chain
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center text-sm text-slate-600 gap-2">
                    <MapPinIcon className="h-4 w-4 text-indigo-500" />
                    <span>{profileData.location}</span>
                    {profileData.isOnChain.location && (
                      <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                        On-Chain
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="backdrop-blur-sm bg-white/80 rounded-2xl border border-indigo-100 p-6 h-full shadow-md">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-xl font-semibold text-slate-800">Profile Details</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="bg-indigo-50 border-indigo-200 hover:bg-indigo-100 text-indigo-700"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-medium text-indigo-700">Bio</h4>
                  {profileData.isOnChain.bio ? (
                    <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                      On-Chain
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700 border-blue-300">
                      Off-Chain
                    </Badge>
                  )}
                </div>
                <p className="text-slate-700 leading-relaxed">{profileData.bio}</p>
              </div>

              <div className="pt-4 border-t border-indigo-100">
                <h4 className="font-medium text-indigo-700 mb-3">Quick Actions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: "View NFT Details", icon: Hexagon },
                    { label: "Update DID Settings", icon: ShieldIcon },
                    { label: "Manage Privacy", icon: LockIcon },
                    { label: "View Activity Log", icon: HistoryIcon },
                  ].map((action, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-blue-100">
                          <action.icon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">{action.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {isEditing && <EditProfileModal isOpen={isEditing} onClose={() => setIsEditing(false)} profile={profileData} />}
    </>
  )
}

