"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  AlertCircleIcon,
  InfoIcon,
  CheckCircle2Icon,
  ArrowLeftIcon,
  LockIcon,
  UnlockIcon,
  Star,
  Shield,
} from "lucide-react"
import type { ProfileData } from "../profile-creation-flow"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface MintNFTStepProps {
  profileData: ProfileData
  didId: string
  onMintSuccess: (tokenId: string, txHash: string) => void
  onEdit: () => void
}

export default function MintNFTStep({ profileData, didId, onMintSuccess, onEdit }: MintNFTStepProps) {
  const [error, setError] = useState<string | null>(null)
  const [isMinting, setIsMinting] = useState(false)
  const [mintProgress, setMintProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("summary")
  const [rotateY, setRotateY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showParticles, setShowParticles] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nftCardRef = useRef<HTMLDivElement>(null)
  const [nftHovered, setNftHovered] = useState(false)
  const [mintingStage, setMintingStage] = useState<string | null>(null)
  const [cardAnimationFrame, setCardAnimationFrame] = useState(0)

  // Handle 3D rotation effect for NFT card
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    if (nftCardRef.current && nftHovered) {
      const rect = nftCardRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const rotateX = (y - 0.5) * 20 // -10 to 10 degrees
      const rotateY = (x - 0.5) * 20 // -10 to 10 degrees

      nftCardRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`
    }
  }

  // Reset card rotation when not hovering
  const handleMouseLeave = () => {
    if (nftCardRef.current) {
      nftCardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
    setNftHovered(false)
  }

  // Animate card border
  useEffect(() => {
    const animateCard = () => {
      setCardAnimationFrame((prev) => (prev + 1) % 360)
      requestAnimationFrame(animateCard)
    }

    const animation = requestAnimationFrame(animateCard)
    return () => cancelAnimationFrame(animation)
  }, [])

  const handleMint = async () => {
    setIsMinting(true)
    setError(null)
    setMintProgress(0)
    setShowParticles(true)
    setMintingStage("preparing")

    try {
      // Simulate minting process with progress updates
      await new Promise<void>((resolve) => {
        let progress = 0
        const interval = setInterval(() => {
          progress += 5
          setMintProgress(progress)

          if (progress === 25) {
            setMintingStage("metadata")
          } else if (progress === 50) {
            setMintingStage("minting")
          } else if (progress === 75) {
            setMintingStage("finalizing")
          }

          if (progress >= 100) {
            clearInterval(interval)
            resolve()
          }
        }, 250)
      })

      // Generate random token ID and transaction hash
      const tokenId = Math.floor(Math.random() * 1000000).toString()
      const txHash = "0x" + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join("")

      // Wait a moment before proceeding to next step
      setTimeout(() => {
        onMintSuccess(tokenId, txHash)
      }, 2000)
    } catch (err) {
      setError("Failed to mint NFT. Please try again.")
      setIsMinting(false)
      setShowParticles(false)
    }
  }

  // Particle effect for minting animation
  useEffect(() => {
    if (!showParticles || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const particles: {
      x: number
      y: number
      size: number
      color: string
      speedX: number
      speedY: number
      gravity: number
      life: number
      maxLife: number
    }[] = []

    const createParticle = () => {
      const x = canvas.width / 2
      const y = canvas.height / 2

      particles.push({
        x,
        y,
        size: Math.random() * 5 + 1,
        color: `hsl(${Math.random() * 60 + 280}, 100%, ${Math.random() * 30 + 60}%)`,
        speedX: (Math.random() - 0.5) * 8,
        speedY: (Math.random() - 0.5) * 8,
        gravity: 0.05,
        life: 0,
        maxLife: Math.random() * 100 + 50,
      })
    }

    const animate = () => {
      if (!showParticles) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Create new particles
      if (particles.length < 200 && Math.random() > 0.5) {
        createParticle()
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.speedX
        p.y += p.speedY
        p.speedY += p.gravity
        p.life++

        // Fade out as life increases
        const opacity = 1 - p.life / p.maxLife

        ctx.fillStyle =
          p.color +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        // Remove dead particles
        if (p.life >= p.maxLife) {
          particles.splice(i, 1)
          i--
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      // Cleanup
    }
  }, [showParticles])

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
          Mint Your Profile as an NFT
        </CardTitle>
        <CardDescription className="text-lg mt-2">
          Review your profile and create your NFT on the Cheqd protocol
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 relative overflow-hidden" ref={containerRef} onMouseMove={handleMouseMove}>
        {/* Particle canvas for minting animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{ opacity: showParticles ? 1 : 0, transition: "opacity 0.5s ease" }}
        />

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-5 rounded-xl border border-purple-100 shadow-sm flex items-start space-x-3">
          <InfoIcon className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">
              Once minted, your profile becomes tamper-proof on the Cheqd protocol. You'll own your profile as an NFT in
              your wallet. Sensitive data is stored securely off-chain via Verida.
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="summary" value={activeTab} onValueChange={setActiveTab} className="relative z-20">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-purple-100 to-pink-100 p-1 rounded-xl">
            <TabsTrigger
              value="summary"
              className={`rounded-lg transition-all duration-300 ${
                activeTab === "summary"
                  ? "bg-white shadow-md text-purple-700 font-medium"
                  : "bg-transparent text-purple-600/70"
              }`}
            >
              Profile Summary
            </TabsTrigger>
            <TabsTrigger
              value="data"
              className={`rounded-lg transition-all duration-300 ${
                activeTab === "data"
                  ? "bg-white shadow-md text-purple-700 font-medium"
                  : "bg-transparent text-purple-600/70"
              }`}
            >
              Data Storage
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className="pt-6 relative">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Enhanced 3D NFT Card Preview */}
              <div className="w-full md:w-1/2">
                <div
                  ref={nftCardRef}
                  className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-300 ease-out"
                  style={{
                    transformStyle: "preserve-3d",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(138, 43, 226, 0.2)",
                  }}
                  onMouseEnter={() => setNftHovered(true)}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Animated border */}
                  <div
                    className="absolute -inset-0.5 rounded-2xl z-0"
                    style={{
                      background: `linear-gradient(${cardAnimationFrame}deg, rgba(138, 43, 226, 0.8), rgba(233, 30, 99, 0.8), rgba(156, 39, 176, 0.8), rgba(138, 43, 226, 0.8))`,
                      backgroundSize: "400% 400%",
                      animation: "gradient 3s ease infinite",
                    }}
                  ></div>

                  {/* Card background with enhanced holographic effect */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"></div>

                  {/* Holographic pattern */}
                  <div
                    className="absolute inset-0 z-20 opacity-40"
                    style={{
                      backgroundImage: `
                      linear-gradient(125deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0) 60%),
                      radial-gradient(circle at 40% 60%, rgba(255,0,255,0.5), transparent 50%),
                      radial-gradient(circle at 60% 30%, rgba(0,255,255,0.5), transparent 50%)
                    `,
                      backgroundSize: "200% 200%, 100% 100%, 100% 100%",
                      backgroundPosition: `${mousePosition.x / 5}% ${mousePosition.y / 5}%`,
                      transitionProperty: "background-position",
                      transitionDuration: "0.1s",
                      transitionTimingFunction: "ease-out",
                    }}
                  ></div>

                  {/* Premium card texture */}
                  <div
                    className="absolute inset-0 z-30 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E")`,
                      backgroundSize: "100px 100px",
                    }}
                  ></div>

                  {/* Premium card content */}
                  <div className="absolute inset-0 p-6 flex flex-col z-40" style={{ transform: "translateZ(20px)" }}>
                    {/* NFT Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                      <Star className="h-4 w-4 text-white" />
                      <span className="text-white text-xs font-bold tracking-wider">NFT PROFILE</span>
                    </div>

                    {/* Profile header */}
                    <div className="flex items-center gap-4 mt-8 mb-4">
                      <div className="h-20 w-20 rounded-full overflow-hidden border-2 border-white/80 shadow-lg">
                        {profileData.photos.length > 0 ? (
                          <img
                            src={profileData.photos[profileData.primaryPhotoIndex] || "/placeholder.svg"}
                            alt="Primary profile photo"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              {profileData.displayName ? profileData.displayName.charAt(0).toUpperCase() : "?"}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-white drop-shadow-md">
                          {profileData.displayName || "Your Name"}
                        </h3>
                        <p className="text-white/90">
                          {profileData.age} • {profileData.location || "No location"}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-white/30 my-3" />

                    {/* Bio */}
                    <div className="mb-4">
                      <h4 className="text-white/90 font-medium mb-1 text-sm">Bio</h4>
                      <p className="text-white/80 text-sm line-clamp-3 bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                        {profileData.bio || "No bio provided"}
                      </p>
                    </div>

                    {/* Interests */}
                    <div className="mb-4">
                      <h4 className="text-white/90 font-medium mb-1 text-sm">Interests</h4>
                      <div className="flex flex-wrap gap-2">
                        {profileData.interests.map((interest) => (
                          <div
                            key={interest}
                            className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm"
                          >
                            {interest}
                          </div>
                        ))}
                        {profileData.interests.length === 0 && (
                          <p className="text-white/50 text-xs italic">No interests added</p>
                        )}
                      </div>
                    </div>

                    {/* Security Badge */}
                    <div className="mt-auto flex justify-between items-end">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-white/80" />
                        <span className="text-white/90 text-xs">Secured by Cheqd</span>
                      </div>

                      <div className="bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
                        <div className="text-xs text-white/90 font-mono">
                          {didId.substring(0, 6)}...{didId.substring(didId.length - 4)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced shine effect */}
                  <div
                    className="absolute inset-0 z-50 opacity-0 transition-opacity duration-300"
                    style={{
                      opacity: nftHovered ? 0.2 : 0,
                      transform: `rotate(${mousePosition.x / 5}deg)`,
                      backgroundImage: "linear-gradient(to tr, transparent, white, transparent)",
                    }}
                  ></div>
                </div>
              </div>

              {/* Profile photos and details */}
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <h4 className="font-medium mb-2 text-purple-700">Your Photos</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {profileData.photos.map((photo, index) => (
                      <div
                        key={index}
                        className={`aspect-square rounded-md overflow-hidden ${
                          index === profileData.primaryPhotoIndex ? "ring-2 ring-pink-500" : ""
                        }`}
                      >
                        <img
                          src={photo || "/placeholder.svg"}
                          alt={`Profile photo ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {profileData.photos.length === 0 && (
                      <div className="col-span-3 bg-gray-100 rounded-md p-4 text-center text-gray-500">
                        No photos added
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-purple-700">Profile Details</h4>
                  <div className="bg-purple-50 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">Display Name:</span>
                      <span className="text-sm font-medium">{profileData.displayName || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">Age:</span>
                      <span className="text-sm font-medium">{profileData.age || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">Location:</span>
                      <span className="text-sm font-medium">{profileData.location || "Not set"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-purple-700">Relationship Goal:</span>
                      <span className="text-sm font-medium">{profileData.relationshipGoals || "Not set"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200/50 to-pink-200/50 rounded-3xl blur-lg opacity-50"></div>
                <div className="relative bg-white p-6 rounded-2xl border border-purple-100 shadow-md">
                  <h4 className="font-medium text-center mb-6 text-purple-700">On-Chain Data (Public)</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-sm">Public Information</h5>
                      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 flex items-center justify-center">
                        <UnlockIcon className="h-3 w-3 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { name: "Display Name", value: profileData.displayName || "Not set" },
                        {
                          name: "DID Reference",
                          value: `${didId.substring(0, 8)}...${didId.substring(didId.length - 4)}`,
                        },
                        {
                          name: "Interests (Categories)",
                          value:
                            profileData.interests.length > 0 ? `${profileData.interests.length} interests` : "None",
                        },
                        {
                          name: "Photo References (Hashed)",
                          value: profileData.photos.length > 0 ? `${profileData.photos.length} photos` : "None",
                        },
                      ].map((item, index) => (
                        <div key={index} className="relative group overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                          <div className="relative flex items-center justify-between p-3 bg-amber-50 rounded-lg z-10">
                            <span className="text-sm">{item.name}</span>
                            <span className="text-xs font-mono bg-white/80 px-2 py-0.5 rounded">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200/50 to-pink-200/50 rounded-3xl blur-lg opacity-50"></div>
                <div className="relative bg-white p-6 rounded-2xl border border-purple-100 shadow-md">
                  <h4 className="font-medium text-center mb-6 text-purple-700">Off-Chain Data (Private)</h4>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-sm">Private Information</h5>
                      <div className="h-6 w-6 rounded-full bg-gradient-to-r from-green-400 to-green-500 flex items-center justify-center">
                        <LockIcon className="h-3 w-3 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        { name: "Age", value: profileData.age || "Not set" },
                        { name: "Location", value: profileData.location || "Not set" },
                        {
                          name: "Detailed Bio",
                          value: profileData.bio ? `${profileData.bio.length} characters` : "None",
                        },
                        {
                          name: "Photo Files",
                          value: profileData.photos.length > 0 ? `${profileData.photos.length} photos` : "None",
                        },
                        { name: "Relationship Preferences", value: profileData.relationshipGoals || "Not set" },
                      ].map((item, index) => (
                        <div key={index} className="relative group overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-green-200 rounded-lg transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                          <div className="relative flex items-center justify-between p-3 bg-green-50 rounded-lg z-10">
                            <span className="text-sm">{item.name}</span>
                            <span className="text-xs font-mono bg-white/80 px-2 py-0.5 rounded">{item.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground mt-2">
                      Private data is encrypted and stored via Verida. You control who can access it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {isMinting && (
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-200/50 to-pink-200/50 rounded-3xl blur-lg opacity-50"></div>
            <div className="relative bg-white p-6 rounded-2xl border border-purple-100 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-purple-700">Minting your NFT profile</h4>
                <span className="text-sm font-medium text-pink-600">{mintProgress}%</span>
              </div>

              <div className="relative h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${mintProgress}%` }}
                ></div>

                {/* Animated glow effect */}
                <div
                  className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white to-transparent opacity-70 animate-pulse"
                  style={{
                    left: `${mintProgress - 10}%`,
                    animation: "pulse 1.5s infinite",
                    display: mintProgress > 0 ? "block" : "none",
                  }}
                ></div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-2">
                {[
                  { stage: "preparing", label: "Preparing Data", icon: "📋" },
                  { stage: "metadata", label: "Creating Metadata", icon: "🔗" },
                  { stage: "minting", label: "Minting on Cheqd", icon: "🔨" },
                  { stage: "finalizing", label: "Finalizing", icon: "✨" },
                ].map((step, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col items-center p-3 rounded-lg ${
                      mintingStage === step.stage
                        ? "bg-gradient-to-br from-purple-100 to-pink-100"
                        : mintingStage &&
                            index < ["preparing", "metadata", "minting", "finalizing"].indexOf(mintingStage) + 1
                          ? "bg-gradient-to-br from-purple-50 to-pink-50 opacity-70"
                          : "bg-gray-50 opacity-50"
                    }`}
                  >
                    <div className={`text-2xl mb-1 ${mintingStage === step.stage ? "animate-bounce" : ""}`}>
                      {step.icon}
                    </div>
                    <span className="text-xs text-center font-medium">{step.label}</span>

                    {mintingStage === step.stage && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {mintProgress === 100 && (
          <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
            <CheckCircle2Icon className="h-5 w-5 text-green-600" />
            <p className="text-green-600 font-medium">NFT successfully minted! Proceeding to confirmation...</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-3 relative z-20">
        {!isMinting && mintProgress < 100 && (
          <>
            <Button
              onClick={handleMint}
              className="w-full relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] rounded-xl py-5"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative">Mint My NFT Profile</span>
            </Button>
            <Button
              variant="outline"
              onClick={onEdit}
              className="w-full border-purple-300 hover:border-pink-400 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              <span>Edit Profile First</span>
            </Button>
          </>
        )}

        {isMinting && mintProgress < 100 && (
          <Button disabled className="w-full bg-gradient-to-r from-purple-600/70 to-pink-600/70 rounded-xl py-5">
            <div className="flex items-center">
              <span className="mr-2">Minting in progress...</span>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          </Button>
        )}
      </CardFooter>
    </>
  )
}

