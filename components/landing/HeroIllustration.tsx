'use client'

import { motion } from 'framer-motion'
import { Heart, UserCircle, Shield, Coffee, Music, Bike, Wine, Camera, Plane, Lock, Fingerprint, HeartPulse, Flame, Gift, Crown, Sparkles } from 'lucide-react'

export function HeroIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative"
    >
      {/* Main illustration - creative blob shape with 3D effect */}
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-[#6D28D9]/20 to-[#EC4899]/20 rounded-blob-3 blur-lg"></div>
        <div className="relative bg-white rounded-blob-3 shadow-xl overflow-hidden p-6">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>

          {/* 3D floating elements */}
          <div className="relative h-[350px] w-full">
            {/* Floating profile cards */}
            <div className="absolute top-[10%] left-[10%] w-48 transform rotate-[-5deg] animate-float-slow">
              <div className="bg-white rounded-xl shadow-lg p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] flex items-center justify-center">
                    <UserCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">NFT Profile #3872</h3>
                    <div className="flex items-center text-xs text-[#EC4899]">
                      <Shield className="h-3 w-3 mr-1" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {[
                    <Coffee key="coffee" className="h-3 w-3" />,
                    <Music key="music" className="h-3 w-3" />,
                    <Bike key="bike" className="h-3 w-3" />,
                  ].map((icon, i) => (
                    <div key={i} className="bg-[#F9F5FF] p-1 rounded-full">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute top-[30%] right-[5%] w-56 transform rotate-[5deg] animate-float">
              <div className="bg-white rounded-xl shadow-lg p-4 border border-[#E5E7EB]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] flex items-center justify-center">
                    <UserCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">NFT Profile #4291</h3>
                    <div className="flex items-center text-xs text-[#EC4899]">
                      <Shield className="h-3 w-3 mr-1" />
                      <span>Verified</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-[#F9F5FF] rounded p-2 text-xs">
                    <span className="text-[#6B7280]">Trust Score</span>
                    <div className="flex items-center">
                      <span className="text-[#EC4899] font-medium">98%</span>
                      <div className="ml-2 h-1 bg-[#E5E7EB] rounded-full w-full overflow-hidden">
                        <div className="h-full bg-[#EC4899] rounded-full w-[98%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#F9F5FF] rounded p-2 text-xs">
                    <span className="text-[#6B7280]">Compatibility</span>
                    <div className="flex items-center">
                      <span className="text-[#6D28D9] font-medium">87%</span>
                      <div className="ml-2 h-1 bg-[#E5E7EB] rounded-full w-full overflow-hidden">
                        <div className="h-full bg-[#6D28D9] rounded-full w-[87%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {[
                    <Wine key="wine" className="h-3 w-3" />,
                    <Camera key="camera" className="h-3 w-3" />,
                    <Plane key="plane" className="h-3 w-3" />,
                  ].map((icon, i) => (
                    <div key={i} className="bg-[#F9F5FF] p-1 rounded-full">
                      {icon}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating match elements */}
            <div className="absolute bottom-[15%] left-[20%] animate-float-medium">
              <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 border border-[#E5E7EB]">
                <Lock className="h-4 w-4 text-[#6D28D9]" />
                <span className="text-xs font-medium">End-to-End Encrypted</span>
              </div>
            </div>

            <div className="absolute bottom-[30%] right-[15%] animate-float-slow">
              <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 border border-[#E5E7EB]">
                <Fingerprint className="h-4 w-4 text-[#EC4899]" />
                <span className="text-xs font-medium">Verified Identity</span>
              </div>
            </div>

            {/* New dating-themed floating elements */}
            <div className="absolute top-[15%] right-[25%] animate-float-medium">
              <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 border border-[#E5E7EB]">
                <HeartPulse className="h-4 w-4 text-[#EC4899]" />
                <span className="text-xs font-medium">95% Match</span>
              </div>
            </div>

            <div className="absolute bottom-[45%] left-[35%] animate-float">
              <div className="flex items-center gap-2 bg-white rounded-full shadow-lg px-4 py-2 border border-[#E5E7EB]">
                <Flame className="h-4 w-4 text-[#F97316]" />
                <span className="text-xs font-medium">Popular Profile</span>
              </div>
            </div>

            <div className="absolute top-[50%] left-[15%] animate-float-slow">
              <div className="bg-white rounded-full shadow-lg p-2 border border-[#E5E7EB]">
                <Gift className="h-5 w-5 text-[#EC4899]" />
              </div>
            </div>

            <div className="absolute top-[40%] right-[30%] animate-float-medium">
              <div className="bg-white rounded-full shadow-lg p-2 border border-[#E5E7EB]">
                <Crown className="h-5 w-5 text-[#F59E0B]" />
              </div>
            </div>

            {/* Central element */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <Heart className="h-10 w-10 text-[#EC4899]" />
                    <div className="absolute -top-1 -right-1">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                        <Sparkles className="h-4 w-4 text-[#F59E0B] relative" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 350" fill="none">
              <path d="M120 120 L200 175" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="5 3" />
              <path d="M280 140 L200 175" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="5 3" />
              <path d="M120 250 L200 175" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="5 3" />
              <path d="M280 230 L200 175" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="5 3" />
              <path d="M180 80 L200 175" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="5 3" />
              <path d="M240 280 L200 175" stroke="url(#gradient1)" strokeWidth="1" strokeDasharray="5 3" />

              {/* Animated heart pulse along the connection lines */}
              <circle r="3" fill="#EC4899">
                <animateMotion path="M120 120 L200 175" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#6D28D9">
                <animateMotion path="M280 140 L200 175" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#EC4899">
                <animateMotion path="M120 250 L200 175" dur="3.5s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#EC4899">
                <animateMotion path="M120 250 L200 175" dur="3.5s" repeatCount="indefinite" />
              </circle>

              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6D28D9" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>

            {/* Floating hearts */}
            <div className="absolute top-[10%] right-[10%] animate-float-slow opacity-20">
              <Heart className="h-6 w-6 text-[#EC4899]" />
            </div>
            <div className="absolute bottom-[20%] right-[30%] animate-float opacity-20">
              <Heart className="h-4 w-4 text-[#EC4899]" />
            </div>
            <div className="absolute top-[30%] left-[30%] animate-float-medium opacity-20">
              <Heart className="h-5 w-5 text-[#EC4899]" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}