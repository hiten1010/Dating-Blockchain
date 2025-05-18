"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ProfileSnapshot from "./profile-snapshot"
import NftDetails from "./nft-details"
import DidSettings from "./did-settings"
import OffChainData from "./off-chain-data"
import SecurityControls from "./security-controls"
import ActivityLog from "./activity-log"
import ProfileDeactivation from "./profile-deactivation"
import {
  LockIcon,
  ShieldIcon,
  HistoryIcon,
  UserIcon,
  KeyIcon,
  ImageIcon,
  AlertTriangleIcon,
  Hexagon,
} from "lucide-react"

export default function ProfileOverview() {
  const [activeTab, setActiveTab] = useState("overview")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const tabs = [
    { id: "overview", label: "Overview", icon: UserIcon },
    { id: "nft", label: "NFT Details", icon: KeyIcon },
    { id: "did", label: "DID", icon: ShieldIcon },
    { id: "offchain", label: "Off-Chain", icon: ImageIcon },
    { id: "security", label: "Privacy", icon: LockIcon },
    { id: "activity", label: "Activity", icon: HistoryIcon },
    { id: "deactivate", label: "Deactivate", icon: AlertTriangleIcon },
  ]

  if (!mounted) return null

  return (
    <div className="space-y-8">
      <div className="relative backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-indigo-100 shadow-xl">
        <div className="absolute -top-3 -left-3">
          <Hexagon className="h-10 w-10 text-indigo-500 fill-indigo-100" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent inline-block">
            Your Blockchain Profile
          </h1>
        <p className="text-sm text-slate-600">
        Your profile is now secured on the Unichain Sepolia blockchain with Verida integration. Manage your on-chain and off-chain data below.
        </p>
        <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-green-700">Connected to Blockchain</span>
          </div>
      </div>

      <div className="flex overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative group flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-pink-500/90 to-rose-500/90 text-white"
                  : "bg-white/80 hover:bg-white/90 text-slate-700"
              }`}
            >
              <tab.icon className={`h-5 w-5 ${activeTab === tab.id ? "text-white" : "text-pink-500"}`} />
              <span className="font-medium">{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/90 to-rose-500/90 rounded-xl -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && <ProfileSnapshot />}
          {activeTab === "nft" && <NftDetails />}
          {activeTab === "did" && <DidSettings />}
          {activeTab === "offchain" && <OffChainData />}
          {activeTab === "security" && <SecurityControls />}
          {activeTab === "activity" && <ActivityLog />}
          {activeTab === "deactivate" && <ProfileDeactivation />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

