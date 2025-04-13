"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { PlusIcon, XIcon, PencilIcon, ImageIcon, TagIcon, SlidersHorizontal } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

// Mock data - would be fetched from your API
const offChainData = {
  photos: [
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
    "/placeholder.svg?height=300&width=300",
  ],
  interests: ["Blockchain", "Hiking", "Photography", "Reading", "Travel"],
  preferences: {
    ageRange: [25, 35],
    distance: 25,
    relationshipGoals: "Long-term",
    aiMatchingEnabled: true,
  },
}

export default function OffChainData() {
  const [activeTab, setActiveTab] = useState("photos")
  const [ageRange, setAgeRange] = useState(offChainData.preferences.ageRange)
  const [distance, setDistance] = useState(offChainData.preferences.distance)
  const [aiMatching, setAiMatching] = useState(offChainData.preferences.aiMatchingEnabled)

  const tabs = [
    { id: "photos", label: "Photos", icon: ImageIcon },
    { id: "interests", label: "Interests", icon: TagIcon },
    { id: "preferences", label: "Preferences", icon: SlidersHorizontal },
  ]

  return (
    <div className="backdrop-blur-sm bg-white/80 rounded-2xl border border-indigo-100 p-6 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <ImageIcon className="h-6 w-6 text-cyan-600" />
        <h2 className="text-xl font-semibold text-slate-800">Off-Chain Profile Details</h2>
      </div>

      <p className="text-slate-600 mb-6">Manage your private profile information stored off-chain</p>

      <div className="flex mb-6 space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative group flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-cyan-500/90 to-blue-500/90 text-white"
                : "bg-white/80 hover:bg-white/90 text-slate-700"
            }`}
          >
            <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "text-white" : "text-cyan-600"}`} />
            <span className="font-medium">{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeOffChainTab"
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/90 to-blue-500/90 rounded-xl -z-10"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="min-h-[300px]">
        {activeTab === "photos" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {offChainData.photos.map((photo, index) => (
                <motion.div
                  key={index}
                  className="relative group aspect-square rounded-xl overflow-hidden border border-indigo-100 shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-200/20 to-blue-200/20 group-hover:opacity-100 opacity-0 transition-opacity z-10" />
                  <img
                    src={photo || "/placeholder.svg"}
                    alt={`Profile photo ${index + 1}`}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/80 text-indigo-700">
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full bg-white/80 text-indigo-700">
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              <motion.div
                className="border border-dashed border-indigo-200 rounded-xl flex items-center justify-center aspect-square bg-indigo-50 hover:bg-indigo-100 transition-colors cursor-pointer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button variant="ghost" size="icon" className="h-12 w-12 rounded-full bg-white/80 text-indigo-600">
                  <PlusIcon className="h-6 w-6" />
                </Button>
              </motion.div>
            </div>
            <p className="text-xs text-indigo-600">
              Photos are stored off-chain and encrypted for privacy. Changes update immediately.
            </p>
          </motion.div>
        )}

        {activeTab === "interests" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className="backdrop-blur-sm bg-white/90 rounded-xl border border-indigo-100 p-4 min-h-[200px] shadow-sm">
              <div className="flex flex-wrap gap-2">
                {offChainData.interests.map((interest, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-1 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full px-3 py-1.5 border border-cyan-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="text-sm text-slate-700">{interest}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full text-indigo-600 hover:bg-indigo-100"
                    >
                      <XIcon className="h-3 w-3" />
                    </Button>
                  </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-white border-indigo-200 hover:bg-indigo-50 text-indigo-700"
                  >
                    <PlusIcon className="h-4 w-4 mr-1" />
                    Add Interest
                  </Button>
                </motion.div>
              </div>
            </div>
            <p className="text-xs text-indigo-600">
              Your interests help our AI find better matches. This data is stored off-chain.
            </p>
          </motion.div>
        )}

        {activeTab === "preferences" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              <motion.div
                className="backdrop-blur-sm bg-white/90 rounded-xl border border-indigo-100 p-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-700">
                      Age Range: {ageRange[0]} - {ageRange[1]}
                    </Label>
                  </div>
                  <Slider
                    defaultValue={ageRange}
                    min={18}
                    max={80}
                    step={1}
                    onValueChange={setAgeRange}
                    className="py-4"
                  />
                </div>
              </motion.div>

              <motion.div
                className="backdrop-blur-sm bg-white/90 rounded-xl border border-indigo-100 p-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-700">Distance: {distance} miles</Label>
                  </div>
                  <Slider
                    defaultValue={[distance]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(value) => setDistance(value[0])}
                    className="py-4"
                  />
                </div>
              </motion.div>

              <motion.div
                className="backdrop-blur-sm bg-white/90 rounded-xl border border-indigo-100 p-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-slate-700">Relationship Goals</Label>
                  </div>
                  <select className="w-full p-2 rounded-md bg-white border border-indigo-200 text-slate-700 focus:border-indigo-500 outline-none">
                    <option>Long-term</option>
                    <option>Short-term</option>
                    <option>Friendship</option>
                    <option>Casual</option>
                  </select>
                </div>
              </motion.div>

              <motion.div
                className="backdrop-blur-sm bg-white/90 rounded-xl border border-indigo-100 p-4 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center justify-between space-y-0">
                  <div className="space-y-0.5">
                    <Label className="text-slate-700">AI Matching</Label>
                    <p className="text-xs text-slate-500">Allow AI to analyze your profile for better matches</p>
                  </div>
                  <Switch checked={aiMatching} onCheckedChange={setAiMatching} />
                </div>
              </motion.div>
            </div>

            <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
              Save Preferences
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

