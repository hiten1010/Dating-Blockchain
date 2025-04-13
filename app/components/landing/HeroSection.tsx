"use client"

import { motion } from "framer-motion"
import { Heart, Shield, ArrowRight, Wallet, UserCircle, Lock, Fingerprint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef, RefObject } from "react"

interface HeroSectionProps {
  sectionRef: (el: HTMLElement | null) => void
}

export default function HeroSection({ sectionRef }: HeroSectionProps) {
  const sponsors = [
    {
      name: "Cheqd",
      logo: "/placeholder.svg?height=60&width=120",
      tagline: "Ensuring blockchain integrity.",
      letter: "C",
    },
    {
      name: "Verida",
      logo: "/placeholder.svg?height=60&width=120",
      tagline: "Empowering decentralized identities.",
      letter: "V",
    },
    {
      name: "Sprite",
      logo: "/placeholder.svg?height=60&width=120",
      tagline: "Securing your every transaction.",
      letter: "S",
    },
  ]

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 border border-[#6D28D9]/30 text-sm font-medium text-[#EC4899] mb-6">
                <Shield className="h-3.5 w-3.5 mr-2" />
                Secure. Private. Decentralized.
              </div>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-[#1F2937]">
                Discover Love on the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                  Decentralized Frontier
                </span>
              </h1>

              <p className="text-xl text-[#4B5563] mb-8 max-w-xl">
                Powered by the security of Cheqd, the trust of Verida, and the innovation of Sprite.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 group relative overflow-hidden rounded-xl"
                >
                  <span className="absolute inset-0 bg-pattern opacity-20"></span>
                  <span className="relative flex items-center">
                    Join the Revolution
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#6D28D9]/30 text-[#6D28D9] hover:bg-[#6D28D9]/10 rounded-xl"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#EC4899] flex items-center justify-center text-xs text-white font-medium border-2 border-white"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <span>
                  Join <span className="text-[#EC4899] font-medium">2,500+</span> early adopters
                </span>
              </div>
            </motion.div>
          </div>

          <div>
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
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-[#F9F5FF] p-1 rounded-full">
                              <div className="h-3 w-3" />
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
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-[#F9F5FF] p-1 rounded-full">
                              <div className="h-3 w-3" />
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

                    {/* Central element */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24">
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-full opacity-20 animate-pulse"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative">
                            <Heart className="h-10 w-10 text-[#EC4899]" />
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

                      {/* Animated heart pulse along the connection lines */}
                      <circle r="3" fill="#EC4899">
                        <animateMotion path="M120 120 L200 175" dur="3s" repeatCount="indefinite" />
                      </circle>
                      <circle r="3" fill="#6D28D9">
                        <animateMotion path="M280 140 L200 175" dur="4s" repeatCount="indefinite" />
                      </circle>

                      <defs>
                        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6D28D9" />
                          <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="container mx-auto px-4 md:px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2 text-[#1F2937]">Powered By Industry Leaders</h2>
            <p className="text-[#6B7280]">
              Our platform is built on the foundations of trusted blockchain technology partners, ensuring security,
              privacy, and innovation.
            </p>
          </div>

          <div className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E5E7EB] shadow-lg">
            <div className="absolute inset-0 bg-pattern opacity-5 rounded-2xl"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 rounded-2xl blur-sm"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {sponsors.map((sponsor, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9]/20 to-[#EC4899]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="relative bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 h-full hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 flex items-center justify-center text-3xl font-bold text-[#6D28D9] relative overflow-hidden">
                        <div className="absolute inset-0 bg-pattern opacity-10"></div>
                        <span className="relative z-10">{sponsor.letter}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#1F2937]">{sponsor.name}</h3>
                      </div>
                    </div>
                    <p className="text-[#6B7280]">{sponsor.tagline}</p>

                    <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#6B7280]">Trusted Partner</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-6 bg-gradient-to-t from-[#6D28D9] to-[#EC4899] rounded-full mx-0.5"
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                className="border-[#6D28D9]/30 text-[#6D28D9] hover:bg-[#6D28D9]/10 rounded-xl"
              >
                <span className="flex items-center">
                  Learn About Our Partners
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent"></div>
    </section>
  )
} 