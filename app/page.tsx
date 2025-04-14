"use client"

import { useState, useEffect, useRef } from "react"
import { useScroll, motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"
import { Shield,SparklesIcon, Lock, Fingerprint, Sparkles, Wallet, Key, MessageSquare, UserCircle, Heart, Check, Gift, Utensils, Coffee, Wine, Palette, Laugh, Tag, Clock, Podcast, Film, Flame, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Import components from landing directory
import Header from "@/components/landing/Header"
import Background from "@/components/landing/Background"
import LoadingScreen from "@/components/landing/LoadingScreen"
import HeroSection from "@/components/landing/HeroSection"
import SponsorsSection from "@/components/landing/SponsorsSection"
import TechnologySection from "@/components/landing/TechnologySection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import JourneySection from "@/components/landing/JourneySection"
import StoriesSection from "@/components/landing/StoriesSection"
import InteractiveDemo from "@/components/landing/InteractiveDemo"
import DateIdeasSection from "@/components/landing/DateIdeasSection"
import MatchmakingSection from "@/components/landing/MatchmakingSection"
import DNACompatibility from "@/components/landing/DNACompatibility"
import { SectionRefsProvider } from "@/components/landing/AppStateSectionRefs"

export default function LandingPage() {
  const isMobile = useMobile()
  const [activeSection, setActiveSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const { scrollYProgress } = useScroll()

  // Handle mouse movement for interactive elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Handle section detection on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      setScrollY(scrollPosition)

      sectionsRef.current.forEach((section, index) => {
        if (!section) return

        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (
          scrollPosition >= sectionTop - windowHeight / 2 &&
          scrollPosition < sectionTop + sectionHeight - windowHeight / 2
        ) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Technology", href: "#technology" },
    { name: "Features", href: "#features" },
    { name: "Journey", href: "#journey" },
    { name: "Partners", href: "#partners" },
  ]

  // Define sponsors for Partners section
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
  ];

  // Define features for TechnologySection
  const features = [
    {
      title: "NFT Profile Ownership",
      icon: <UserCircle className="h-6 w-6 text-[#EC4899]" />,
      description: "Your dating profile is transformed into a unique NFT that you fully own and control.",
      details: [
        "Complete ownership of your profile data",
        "Transferable across platforms",
        "Verifiable authenticity",
        "Immutable profile history",
      ],
    },
    {
      title: "Decentralized Identity",
      icon: <Fingerprint className="h-6 w-6 text-[#EC4899]" />,
      description: "Powered by Verida, your identity remains secure, private, and fully under your control.",
      details: [
        "Self-sovereign identity",
        "Selective disclosure of information",
        "Zero-knowledge proofs",
        "Cross-platform verification",
      ],
    },
    {
      title: "Secure Transactions",
      icon: <Shield className="h-6 w-6 text-[#EC4899]" />,
      description: "Every interaction is secured by Sprite's cutting-edge blockchain technology.",
      details: [
        "End-to-end encryption",
        "Tamper-proof messaging",
        "Secure payment channels",
        "Transparent activity logs",
      ],
    },
    {
      title: "AI-Powered Matching",
      icon: <Sparkles className="h-6 w-6 text-[#EC4899]" />,
      description: "Our advanced AI analyzes compatibility while preserving your privacy and data sovereignty.",
      details: [
        "Privacy-preserving algorithms",
        "Value-based matching",
        "Continuous learning from feedback",
        "Transparent matching criteria",
      ],
    },
  ]

  // Define journey steps for JourneySection
  const journeySteps = [
    {
      step: 1,
      title: "Connect Your Wallet",
      description: "Link your digital wallet to establish your secure, decentralized identity.",
      icon: <Wallet className="h-5 w-5 text-white" />,
    },
    {
      step: 2,
      title: "Create Your NFT Profile",
      description: "Mint your dating profile as a unique NFT that you fully own and control.",
      icon: <UserCircle className="h-5 w-5 text-white" />,
    },
    {
      step: 3,
      title: "Verify Your Identity",
      description: "Complete verification through Verida's decentralized identity framework.",
      icon: <Key className="h-5 w-5 text-white" />,
    },
    {
      step: 4,
      title: "Discover Matches",
      description: "Our AI finds compatible matches while preserving your privacy.",
      icon: <Sparkles className="h-5 w-5 text-white" />,
    },
    {
      step: 5,
      title: "Connect Securely",
      description: "Engage in end-to-end encrypted conversations secured by Sprite.",
      icon: <MessageSquare className="h-5 w-5 text-white" />,
    },
  ]

  // Define stories for StoriesSection
  const stories = [
    {
      couple: "Sarah & Michael",
      image: "/placeholder.svg?height=300&width=300",
      story:
        "We matched based on our shared love for blockchain technology. Six months later, we're building our first dApp together!",
      location: "New York, USA",
      time: "Together for 6 months",
      rotation: "-3deg",
      tags: ["Tech", "Blockchain", "Startups"]
    },
    {
      couple: "Aisha & David",
      image: "/placeholder.svg?height=300&width=300",
      story:
        "The privacy features gave me confidence to be myself. We connected instantly and are now planning our wedding!",
      location: "London, UK",
      time: "Engaged after 1 year",
      rotation: "2deg",
      tags: ["Privacy", "Travel", "Art"]
    },
    {
      couple: "Carlos & Jun",
      image: "/placeholder.svg?height=300&width=300",
      story:
        "We were matched based on our values and interests. The AI knew we were perfect for each other before we did!",
      location: "Singapore",
      time: "Together for 8 months",
      rotation: "-2deg",
      tags: ["AI", "Gaming", "Food"]
    },
  ]

  // Callback to register section refs - fixed to handle void return type properly
  const sectionRefCallback = (index: number) => (el: HTMLElement | null) => {
    sectionsRef.current[index] = el
    // Return void to satisfy the LegacyRef typing requirements
    return undefined 
  }

  // Loading screen
  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-[#F9F5FF] text-[#1F2937] overflow-hidden bg-hearts-pattern">
      {/* Animated background */}
      <Background />

      {/* Header */}
      <Header activeSection={activeSection} scrollY={scrollY} navItems={navItems} />

      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection sectionRef={sectionRefCallback(0)} />

        {/* Technology Section */}
        <TechnologySection sectionRef={sectionRefCallback(1)} features={features} />

        

        {/* Features Section */}
        <FeaturesSection sectionRef={sectionRefCallback(2)} />


        <section className="py-20 md:py-32 relative bg-[#F9F5FF]">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 border border-[#6D28D9]/30 text-sm font-medium text-[#EC4899] mb-6">
                  <Flame className="h-3.5 w-3.5 mr-2" />
                  Interactive Experience
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
                  Find Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                    Perfect Match
                  </span>
                </h2>

                <p className="text-xl text-[#4B5563]">
                  Try our interactive compatibility calculator to see how our AI-powered matching works.
                </p>
              </motion.div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9]/30 to-[#EC4899]/30 rounded-xl blur-lg opacity-75"></div>
                <div className="relative bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-8 overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-5"></div>

                  <div className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      <div>
                        <h3 className="text-2xl font-bold mb-6 text-[#1F2937]">Your Preferences</h3>

                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-[#4B5563] mb-2">
                              What are your top interests?
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {["Travel", "Music", "Food", "Art", "Sports", "Technology", "Reading", "Movies"].map(
                                (interest, i) => (
                                  <label
                                    key={i}
                                    className="flex items-center gap-2 cursor-pointer bg-[#F9F5FF] hover:bg-[#F9F5FF]/80 transition-colors px-3 py-1.5 rounded-md border border-[#E5E7EB]"
                                  >
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-4 h-4 rounded border border-[#D1D5DB] peer-checked:bg-gradient-to-r from-[#6D28D9] to-[#EC4899] peer-checked:border-transparent flex items-center justify-center">
                                      <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                                    </div>
                                    <span className="text-sm">{interest}</span>
                                  </label>
                                ),
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#4B5563] mb-2">
                              What values matter most to you?
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                              {["Family", "Career", "Adventure", "Spirituality", "Growth", "Community"].map(
                                (value, i) => (
                                  <div key={i} className="relative">
                                    <input
                                      type="range"
                                      min="0"
                                      max="100"
                                      defaultValue="50"
                                      className="w-full h-2 bg-[#F9F5FF] rounded-lg appearance-none cursor-pointer"
                                    />
                                    <span className="block text-xs text-[#6B7280] mt-1">{value}</span>
                                  </div>
                                ),
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#4B5563] mb-2">
                              What are you looking for?
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {["Casual Dating", "Serious Relationship", "Friendship", "Marriage"].map((type, i) => (
                                <label
                                  key={i}
                                  className="flex items-center gap-2 cursor-pointer bg-[#F9F5FF] hover:bg-[#F9F5FF]/80 transition-colors px-3 py-1.5 rounded-md border border-[#E5E7EB]"
                                >
                                  <input type="radio" name="relationship-type" className="sr-only peer" />
                                  <div className="w-4 h-4 rounded-full border border-[#D1D5DB] peer-checked:bg-gradient-to-r from-[#6D28D9] to-[#EC4899] peer-checked:border-transparent"></div>
                                  <span className="text-sm">{type}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <h3 className="text-2xl font-bold mb-6 text-[#1F2937]">Your Compatibility Results</h3>

                        <div className="flex-1 bg-[#F9F5FF] rounded-xl p-6 relative overflow-hidden">
                          <div className="absolute inset-0 bg-pattern opacity-5"></div>

                          <div className="relative z-10">
                            <div className="flex justify-center mb-8">
                              <div className="relative">
                                <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center">
                                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] flex items-center justify-center text-white text-3xl font-bold">
                                    87%
                                  </div>
                                </div>
                                <div className="absolute -top-2 -right-2">
                                  <div className="relative">
                                    <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                                    <SparklesIcon className="h-6 w-6 text-[#F59E0B] relative" />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <h4 className="text-lg font-bold text-center mb-4 text-[#1F2937]">
                              Excellent Match Potential!
                            </h4>

                            <div className="space-y-3">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="font-medium text-[#6B7280]">Shared Interests</span>
                                  <span className="font-medium text-[#6D28D9]">92%</span>
                                </div>
                                <div className="h-2 bg-white rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-full w-[92%]"></div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="font-medium text-[#6B7280]">Value Alignment</span>
                                  <span className="font-medium text-[#6D28D9]">85%</span>
                                </div>
                                <div className="h-2 bg-white rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-full w-[85%]"></div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="font-medium text-[#6B7280]">Relationship Goals</span>
                                  <span className="font-medium text-[#6D28D9]">78%</span>
                                </div>
                                <div className="h-2 bg-white rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-full w-[78%]"></div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 p-4 bg-white rounded-lg border border-[#E5E7EB]">
                              <p className="text-sm text-[#4B5563]">
                                Based on your preferences, our AI would match you with profiles that share your love for
                                music, art, and technology, with strong family values and a desire for meaningful
                                connections.
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button className="mt-6 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl">
                          <span className="flex items-center">
                            Find Real Matches
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent"></div>
        </section>
        {/* Journey Section */}
        <JourneySection sectionRef={sectionRefCallback(3)} journeySteps={journeySteps} />

        {/* Sponsors Section */}
        <SponsorsSection sectionRef={sectionRefCallback(4)} />

        {/* Stories Section */}
        <StoriesSection stories={stories} />

        {/* Interactive Demo Section */}
        <InteractiveDemo />

        {/* Date Ideas Section */}
        <DateIdeasSection />

        {/* Matchmaking Section */}
        <MatchmakingSection />

        {/* DNA Compatibility Section */}
        <DNACompatibility />

        <section className="py-20 md:py-32 relative bg-white overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 border border-[#6D28D9]/30 text-sm font-medium text-[#EC4899] mb-6">
                  <Shield className="h-3.5 w-3.5 mr-2" />
                  Privacy & Security
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
                  Your Love Life,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                    Your Control
                  </span>
                </h2>

                <p className="text-xl text-[#4B5563]">
                  We've reimagined dating privacy and security from the ground up, putting you in complete control.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#6D28D9]/20 to-[#EC4899]/20 rounded-blob-3 blur-lg"></div>
                  <div className="relative bg-white rounded-xl shadow-xl overflow-hidden p-6">
                    <div className="absolute inset-0 bg-pattern opacity-5"></div>

                    <div className="relative aspect-square">
                      {/* Interactive security visualization */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          {/* Outer security ring */}
                          <div className="absolute inset-0 border-4 border-dashed border-[#6D28D9]/30 rounded-full animate-spin-slow"></div>

                          {/* Middle security ring */}
                          <div className="absolute inset-4 border-4 border-dashed border-[#EC4899]/30 rounded-full animate-spin-reverse-slow"></div>

                          {/* Inner security ring */}
                          <div className="absolute inset-8 border-4 border-dashed border-[#6D28D9]/30 rounded-full animate-spin-slow"></div>

                          {/* Center profile */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] p-1">
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                <UserCircle className="h-12 w-12 text-[#6D28D9]" />
                              </div>
                            </div>
                          </div>

                          {/* Security icons */}
                          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-white rounded-full p-2 shadow-md">
                              <Lock className="h-5 w-5 text-[#6D28D9]" />
                            </div>
                          </div>

                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                            <div className="bg-white rounded-full p-2 shadow-md">
                              <Shield className="h-5 w-5 text-[#EC4899]" />
                            </div>
                          </div>

                          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="bg-white rounded-full p-2 shadow-md">
                              <Fingerprint className="h-5 w-5 text-[#6D28D9]" />
                            </div>
                          </div>

                          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                            <div className="bg-white rounded-full p-2 shadow-md">
                              <Key className="h-5 w-5 text-[#EC4899]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="space-y-8">
                  {[
                    {
                      title: "Zero-Knowledge Privacy",
                      icon: <Lock className="h-6 w-6 text-white" />,
                      description:
                        "Share only what you want. Our zero-knowledge proofs let you verify attributes without revealing sensitive data.",
                    },
                    {
                      title: "Self-Sovereign Identity",
                      icon: <UserCircle className="h-6 w-6 text-white" />,
                      description:
                        "Your identity belongs to you alone. Control exactly what information is shared with potential matches.",
                    },
                    {
                      title: "End-to-End Encryption",
                      icon: <Shield className="h-6 w-6 text-white" />,
                      description:
                        "All messages and interactions are fully encrypted. Only you and your match can read your conversations.",
                    },
                    {
                      title: "Revocable Permissions",
                      icon: <Key className="h-6 w-6 text-white" />,
                      description:
                        "Change your mind? Revoke access to your data at any time with our blockchain-based permission system.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#EC4899] flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 text-[#1F2937]">{item.title}</h3>
                        <p className="text-[#6B7280]">{item.description}</p>
                      </div>
                    </div>
                  ))}

                  <Button className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl">
                    <span className="flex items-center">
                      Learn About Our Security
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>
        </section>
        {/* Partners Section */}
        <section
          id="partners"
          ref={sectionRefCallback(4)}
          className="py-20 md:py-32 relative bg-[#F9F5FF]"
        >
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="relative max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-xl blur-lg opacity-75"></div>
                <div className="relative bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-8 md:p-12 overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-5"></div>

                  <div className="relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="text-center lg:text-left">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
                          Ready to Redefine Your Dating Experience?
                        </h2>
                        <p className="text-xl text-[#4B5563] mb-8">
                          Join us in pioneering a new era of digital relationships, where privacy, security, and
                          authenticity are built into the foundation.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
                          <Link href="/onboarding">
                            <Button
                              size="lg"
                              className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl"
                            >
                              <span className="flex items-center">
                                <Wallet className="mr-2 h-5 w-5" />
                                Connect Wallet
                              </span>
                            </Button>
                          </Link>

                          <Button
                            size="lg"
                            variant="outline"
                            className="border-[#6D28D9]/30 text-[#6D28D9] hover:bg-[#6D28D9]/10 rounded-xl"
                          >
                            Learn More
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                          {sponsors.map((sponsor, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#F9F5FF] border border-[#E5E7EB]"
                            >
                              <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#6D28D9]/20 to-[#EC4899]/20 flex items-center justify-center">
                                <span className="text-xs font-bold">{sponsor.letter}</span>
                              </div>
                              <span className="text-sm font-medium">{sponsor.name}</span>
                            </div>
                          ))}
                        </div>

                        {/* Testimonial */}
                        <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
                          <div className="relative">
                            <div className="absolute -left-4 top-0 text-4xl text-[#EC4899] opacity-50">"</div>
                            <p className="text-[#4B5563] italic pl-6">
                              DecentralMatch helped me find my soulmate! The security features gave me confidence, and
                              the AI matching was spot-on. We're celebrating our 6-month anniversary next week!
                            </p>
                            <div className="flex items-center gap-3 mt-4 pl-6 justify-center lg:justify-start">
                              <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] flex items-center justify-center text-white font-bold">
                                  AT
                                </div>
                                <div className="absolute -right-1 -bottom-1 bg-white rounded-full p-0.5">
                                  <Heart className="h-4 w-4 text-[#EC4899]" />
                                </div>
                              </div>
                              <div>
                                <p className="font-medium text-[#1F2937]">Alex T.</p>
                                <p className="text-sm text-[#6B7280]">Found love 6 months ago</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="relative">
                          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9]/20 to-[#EC4899]/20 rounded-xl blur-lg opacity-75"></div>
                          <div className="relative bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-8">
                            <h3 className="text-xl font-bold mb-6 text-center text-[#1F2937]">Join the Waitlist</h3>
                            <div className="space-y-4">
                              <div>
                                <label htmlFor="name" className="block text-sm font-medium text-[#4B5563] mb-1">
                                  Name
                                </label>
                                <Input
                                  id="name"
                                  type="text"
                                  placeholder="Your name"
                                  className="bg-[#F9F5FF] border-[#E5E7EB] text-[#1F2937] placeholder:text-[#9CA3AF]"
                                />
                              </div>
                              <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#4B5563] mb-1">
                                  Email
                                </label>
                                <Input
                                  id="email"
                                  type="email"
                                  placeholder="Your email"
                                  className="bg-[#F9F5FF] border-[#E5E7EB] text-[#1F2937] placeholder:text-[#9CA3AF]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-[#4B5563] mb-1">Interests</label>
                                <div className="flex flex-wrap gap-2">
                                  {["Security", "Privacy", "AI Matching", "Blockchain"].map((interest, i) => (
                                    <label
                                      key={i}
                                      className="flex items-center gap-2 cursor-pointer bg-[#F9F5FF] hover:bg-[#F9F5FF]/80 transition-colors px-3 py-1.5 rounded-md border border-[#E5E7EB]"
                                    >
                                      <input type="checkbox" className="sr-only peer" />
                                      <div className="w-4 h-4 rounded border border-[#D1D5DB] peer-checked:bg-gradient-to-r from-[#6D28D9] to-[#EC4899] peer-checked:border-transparent flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                                      </div>
                                      <span className="text-sm">{interest}</span>
                                    </label>
                                  ))}
                                </div>
                              </div>
                              <Link href="/onboarding">
                                <Button className="w-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl">
                                  Join Waitlist
                                </Button>
                              </Link>
                              <p className="text-xs text-[#9CA3AF] text-center">
                                We respect your privacy and will never share your information.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>


      </main>

      <footer className="relative z-10 border-t border-[#E5E7EB] bg-white">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="relative w-8 h-8 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-lg flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-30"></div>
                  <Heart className="h-5 w-5 text-white relative z-10" />
                </div>
                <span className="font-bold text-xl tracking-tight text-[#1F2937]">DecentralMatch</span>
              </Link>
              <p className="text-sm text-[#6B7280]">
                Pioneering the future of decentralized dating with blockchain security and AI innovation.
              </p>
              <div className="flex space-x-4">
                {[
                  <svg
                    key="twitter"
                    className="h-5 w-5 text-[#6B7280] hover:text-[#EC4899] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>,
                  <svg
                    key="github"
                    className="h-5 w-5 text-[#6B7280] hover:text-[#EC4899] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419
-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    ></path>
                  </svg>,
                  <svg
                    key="discord"
                    className="h-5 w-5 text-[#6B7280] hover:text-[#EC4899] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.1087 0a.0739.0739 0 01.0785.0105c.1202.099.246.1971.3728.2914a.077.077 0 01-.0066.1277c-.598.3428-1.2195.6447-1.8723.8923a.076.076 0 00-.0416.1057c.3529.699.7644 1.3638 1.226 1.9942a.076.076 0 00.0842.0276c1.961-.6066 3.9495-1.5218 6.0023-3.0294a.077.077 0 00.0313-.0561c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0276z"></path>
                  </svg>,
                ].map((icon) => (
                  <a key={icon.key} href="#" className="hover:opacity-75 transition-opacity">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

