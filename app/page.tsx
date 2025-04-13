"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useScroll } from "framer-motion"
import {
  Shield,
  Lock,
  Fingerprint,
  Zap,
  Heart,
  ArrowRight,
  ChevronRight,
  Menu,
  X,
  Check,
  Wallet,
  Key,
  UserCircle,
  MessageSquare,
  Sparkles,
} from "lucide-react"
// Add these new imports at the top with the other imports
import {
  HeartHandshake,
  HeartPulse,
  Flame,
  SparklesIcon,
  Gem,
  Gift,
  Crown,
  Glasses,
  Coffee,
  Wine,
  Utensils,
  Music,
  Camera,
  Laugh,
  Palette,
  Bike,
  Plane,
  Clock,
  MapPin,
  Tag,
  Podcast,
  Film,
  PercentCircle,
  ThumbsUp,
  ThumbsDown,
  Syringe,
  Verified,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export default function LandingPage() {
  const isMobile = useMobile()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(0)
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)
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

  // Add cursor trail effect
  useEffect(() => {
    const createCursorTrail = (e: MouseEvent) => {
      const trail = document.createElement('div');
      trail.className = 'cursor-trail';
      trail.style.left = `${e.pageX}px`;
      trail.style.top = `${e.pageY}px`;
      document.body.appendChild(trail);
      
      setTimeout(() => {
        trail.style.opacity = '0';
        setTimeout(() => {
          document.body.removeChild(trail);
        }, 500);
      }, 500);
    };

    window.addEventListener('mousemove', createCursorTrail);
    
    return () => {
      window.removeEventListener('mousemove', createCursorTrail);
    };
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Technology", href: "#technology" },
    { name: "Features", href: "#features" },
    { name: "Journey", href: "#journey" },
    { name: "Partners", href: "#partners" },
  ]

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

  const features = [
    {
      title: "NFT Profile Ownership",
      icon: UserCircle,
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
      icon: Fingerprint,
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
      icon: Shield,
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
      icon: Sparkles,
      description: "Our advanced AI analyzes compatibility while preserving your privacy and data sovereignty.",
      details: [
        "Privacy-preserving algorithms",
        "Value-based matching",
        "Continuous learning from feedback",
        "Transparent matching criteria",
      ],
    },
  ]

  const journeySteps = [
    {
      step: 1,
      title: "Connect Your Wallet",
      description: "Link your digital wallet to establish your secure, decentralized identity.",
      icon: Wallet,
    },
    {
      step: 2,
      title: "Create Your NFT Profile",
      description: "Mint your dating profile as a unique NFT that you fully own and control.",
      icon: UserCircle,
    },
    {
      step: 3,
      title: "Verify Your Identity",
      description: "Complete verification through Verida's decentralized identity framework.",
      icon: Key,
    },
    {
      step: 4,
      title: "Discover Matches",
      description: "Our AI finds compatible matches while preserving your privacy.",
      icon: Sparkles,
    },
    {
      step: 5,
      title: "Connect Securely",
      description: "Engage in end-to-end encrypted conversations secured by Sprite.",
      icon: MessageSquare,
    },
  ]

  // Loading screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-[#F9F5FF] to-[#FFF0F5] flex items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 border-t-2 border-b-2 border-[#6D28D9] rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-r-2 border-l-2 border-[#EC4899] rounded-full animate-spin animate-delay-150"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="h-10 w-10 text-[#EC4899]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#4B5563]">DecentralMatch</h2>
          <p className="text-[#EC4899] mt-2">Initializing secure environment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F5FF] text-[#1F2937] overflow-hidden bg-hearts-pattern">
      {/* Animated background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[#F9F5FF]"></div>
        <div className="bg-love-pattern"></div>
        <div className="bg-hearts-pattern absolute inset-0 opacity-50"></div>

        {/* Wave paths */}
        <div className="wave-path wave-path-top"></div>
        <div className="wave-path wave-path-bottom"></div>

        {/* Animated cursor elements */}
        <div className="path-container">
          {/* Flowing elegant hearts - keep these */}
          <div className="absolute top-[15%] animate-flowing">
            <div className="elegant-heart glow scale-150"></div>
          </div>
          <div className="absolute top-[35%] animate-flowing-slow">
            <div className="elegant-heart glow scale-100"></div>
          </div>
          <div className="absolute top-[55%] animate-flowing">
            <div className="elegant-heart glow scale-125"></div>
          </div>
          <div className="absolute top-[75%] animate-flowing-slow">
            <div className="elegant-heart glow scale-75"></div>
          </div>

          {/* Flowing outlined hearts - keep these */}
          <div className="absolute top-[25%] animate-flowing-reverse">
            <div className="outlined-heart glow-purple scale-150"></div>
          </div>
          <div className="absolute top-[45%] animate-flowing-reverse">
            <div className="outlined-heart glow-purple scale-100"></div>
          </div>
          <div className="absolute top-[65%] animate-flowing-reverse">
            <div className="outlined-heart glow-purple scale-125"></div>
          </div>

          {/* Barbie pink cursors - new elements */}
          <div className="cursor-element style-1" style={{ top: '10%', left: '20%' }}></div>
          <div className="cursor-element style-2" style={{ top: '30%', right: '15%' }}></div>
          <div className="cursor-element style-3" style={{ top: '50%', left: '30%' }}></div>
          <div className="cursor-element style-4" style={{ top: '70%', right: '25%' }}></div>
          <div className="cursor-element style-1 pulse" style={{ top: '15%', right: '30%' }}></div>
          <div className="cursor-element style-2 pulse" style={{ top: '45%', left: '15%' }}></div>
          <div className="cursor-element style-3 pulse" style={{ top: '65%', left: '40%' }}></div>
          <div className="cursor-element style-4 pulse" style={{ top: '25%', left: '35%' }}></div>
          <div className="cursor-element style-1" style={{ top: '85%', right: '10%' }}></div>
          <div className="cursor-element style-2" style={{ top: '5%', left: '45%' }}></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-[#F0ABFC] to-[#818CF8] opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#6D28D9] to-[#EC4899] opacity-10 blur-3xl"></div>

          {/* Floating shapes */}
          <div className="absolute top-[20%] left-[10%] w-16 h-16 bg-[#F0ABFC] opacity-20 rounded-full animate-float-slow"></div>
          <div className="absolute top-[40%] right-[15%] w-24 h-24 bg-[#818CF8] opacity-20 rounded-blob animate-float"></div>
          <div className="absolute bottom-[30%] left-[20%] w-20 h-20 bg-[#EC4899] opacity-20 rounded-blob-2 animate-float-medium"></div>

          {/* Barbie Pink Cursor Elements */}
          <div className="cursor-element style-1" style={{ top: '12%', right: '20%' }}></div>
          <div className="cursor-element style-2" style={{ top: '55%', left: '12%' }}></div>
          <div className="cursor-element style-3" style={{ top: '32%', left: '45%' }}></div>
          <div className="cursor-element style-4" style={{ bottom: '25%', right: '25%' }}></div>
          <div className="cursor-element style-1 pulse" style={{ top: '75%', right: '15%' }}></div>

          {/* Varied Heart Styles */}
          <div className="absolute top-[28%] left-[8%] scale-150 animate-float-diagonal-reverse">
            <div className="elegant-heart glow"></div>
          </div>

          <div className="absolute top-[48%] right-[6%] scale-200 animate-float-slow">
            <div className="outlined-heart glow-purple"></div>
          </div>

          <div className="absolute bottom-[18%] left-[15%] scale-150 animate-float-diagonal">
            <div className="elegant-heart glow"></div>
          </div>

          <div className="absolute top-[68%] right-[18%] scale-125 animate-float-diagonal-reverse">
            <div className="outlined-heart glow-purple"></div>
          </div>

          <div className="absolute top-[82%] left-[28%] scale-175 animate-wave">
            <div className="elegant-heart glow"></div>
          </div>

          {/* Decorative patterns */}
          <div className="absolute inset-0 bg-pattern opacity-[0.03]"></div>
        </div>
      </div>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrollY > 50 ? "bg-white/90 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] rounded-xl flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute inset-0 bg-pattern opacity-30"></div>
                <Heart className="h-5 w-5 text-white relative z-10" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#1F2937]">DecentralMatch</span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-[#EC4899]",
                    activeSection === index ? "text-[#EC4899]" : "text-[#4B5563]",
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="hidden md:flex border-[#6D28D9] text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>

              <button
                className="md:hidden text-[#4B5563] hover:text-[#1F2937]"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 bg-white/98 md:hidden pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center justify-start h-full gap-6 p-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-xl font-medium py-2 border-b-2 w-full text-center",
                    activeSection === index ? "text-[#EC4899] border-[#EC4899]" : "text-[#4B5563] border-transparent",
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" })
                    setMobileMenuOpen(false)
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <Button className="mt-4 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 w-full">
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Hero Section */}
        <section
          id="home"
          ref={(el) => (sectionsRef.current[0] = el)}
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
                                    <SparklesIcon className="h-4 w-4 text-[#F59E0B] relative" />
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
          {/* DNA Compatibility Visualization */}
<div className="mt-20">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
  >
    <div className="relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#E5E7EB] shadow-lg">
      <div className="absolute inset-0 bg-pattern opacity-5 rounded-2xl"></div>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 rounded-2xl blur-sm"></div>
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-2 text-[#1F2937]">DNA Compatibility Visualization</h3>
          <p className="text-[#6B7280]">Our innovative algorithm analyzes compatibility at the deepest level</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative h-[300px] w-[200px]">
              {/* DNA Helix Animation */}
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="absolute">
                    <div 
                      className="dna-step" 
                      style={{ 
                        top: `${i * 10}px`, 
                        transform: `rotateY(${i % 2 ? 180 : 0}deg)`,
                        animation: `dna-rotate 3s ease-in-out infinite ${i * 0.15}s` 
                      }}
                    ></div>
                  </div>
                ))}
                
                {/* Animated matching indicators */}
                <div className="absolute top-[50px] left-[5px] sparkle-effect">
                  <div className="bg-[#EC4899] text-white text-xs px-2 py-1 rounded-full">Interests</div>
                </div>
                <div className="absolute top-[120px] right-[5px] sparkle-effect" style={{ animationDelay: "1s" }}>
                  <div className="bg-[#6D28D9] text-white text-xs px-2 py-1 rounded-full">Values</div>
                </div>
                <div className="absolute top-[190px] left-[5px] sparkle-effect" style={{ animationDelay: "2s" }}>
                  <div className="bg-[#EC4899] text-white text-xs px-2 py-1 rounded-full">Goals</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-[#1F2937]">Your Perfect Match is Based On:</h4>
              
              {[
                { label: "Shared Interests", percentage: 92, color: "#EC4899" },
                { label: "Core Values", percentage: 85, color: "#6D28D9" },
                { label: "Life Goals", percentage: 78, color: "#EC4899" },
                { label: "Communication Style", percentage: 88, color: "#6D28D9" },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-[#4B5563]">{item.label}</span>
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-medium" style={{ color: item.color }}>{item.percentage}%</span>
                      <Heart className="h-3 w-3 text-[#EC4899]" fill="#EC4899" />
                    </div>
                  </div>
                  <div className="compatibility-meter">
                    <div 
                      className="compatibility-meter-fill" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i} 
                        className="compatibility-meter-bubble"
                        style={{
                          width: `${Math.random() * 10 + 5}px`,
                          height: `${Math.random() * 10 + 5}px`,
                          left: `${(item.percentage / 100) * Math.random() * 80 + 10}%`,
                          top: `${Math.random() * 70 + 15}%`,
                          animationDelay: `${i * 0.5}s`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="mt-6 pt-4 border-t border-dashed border-[#E5E7EB]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] flex items-center justify-center">
                      <HeartPulse className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-[#1F2937]">Overall Compatibility</div>
                      <div className="text-xs text-[#6B7280]">Based on 28 compatibility factors</div>
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                    87%
                  </div>
                </div>
                
                {/* Heart Rate Line */}
                <div className="mt-3 heart-rate-line"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent"></div>
        </section>

        <section className="py-16 relative bg-[#F9F5FF]/50">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 border border-[#6D28D9]/30 text-sm font-medium text-[#EC4899] mb-6">
                  <HeartHandshake className="h-3.5 w-3.5 mr-2" />
                  Perfect Matches
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1F2937]">
                  Find Your{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                    Perfect Match
                  </span>
                </h2>

                <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
                  Our AI-powered matching algorithm finds compatible partners based on shared values, interests, and
                  preferences.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Shared Interests",
                  icon: <Glasses className="h-6 w-6 text-[#EC4899]" />,
                  description: "Connect with people who share your passions and hobbies.",
                  interests: ["Travel", "Music", "Cooking", "Fitness", "Art", "Reading"],
                },
                {
                  title: "Value-Based Matching",
                  icon: <Gem className="h-6 w-6 text-[#6D28D9]" />,
                  description: "Find partners who align with your core values and life goals.",
                  values: ["Family", "Career", "Adventure", "Spirituality", "Growth", "Community"],
                },
                {
                  title: "Compatibility Scoring",
                  icon: <HeartPulse className="h-6 w-6 text-[#EC4899]" />,
                  description: "Our algorithm calculates compatibility scores based on multiple factors.",
                  factors: ["Communication Style", "Life Goals", "Personality", "Habits", "Love Language"],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9]/20 to-[#EC4899]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <div className="relative bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 h-full hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-[#1F2937]">{item.title}</h3>
                      <p className="text-[#6B7280] mb-4">{item.description}</p>

                      <div className="flex flex-wrap justify-center gap-2 mt-auto">
                        {item.interests &&
                          item.interests.map((interest, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F9F5FF] text-[#6D28D9]"
                            >
                              {interest}
                            </span>
                          ))}
                        {item.values &&
                          item.values.map((value, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F0ABFC]/20 text-[#9D174D]"
                            >
                              {value}
                            </span>
                          ))}
                        {item.factors &&
                          item.factors.map((factor, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#818CF8]/20 text-[#3730A3]"
                            >
                              {factor}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>
        </section>

        <section className="py-20 relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 border border-[#6D28D9]/30 text-sm font-medium text-[#EC4899] mb-6">
                  <Heart className="h-3.5 w-3.5 mr-2" />
                  Love Stories
                </div>

                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1F2937]">
                  Real{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                    Success Stories
                  </span>
                </h2>

                <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
                  Discover how our decentralized platform has helped people find meaningful connections and lasting
                  relationships.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
  {[
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
  ].map((story, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="polaroid-frame" style={{ "--rotation": story.rotation }}>
        <div className="relative bg-white rounded-lg overflow-hidden h-full hover:shadow-md transition-shadow">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] flex items-center justify-center text-white text-xl font-bold">
                  {story.couple
                    .split(" & ")
                    .map((name) => name[0])
                    .join("&")}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white to-transparent h-12"></div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <h3 className="text-xl font-bold text-[#1F2937]">{story.couple}</h3>
              <div className="text-[#EC4899]">
                <Verified className="h-4 w-4" fill="#EC4899" />
              </div>
            </div>
            
            <div className="love-letter p-3 mb-4">
              <p className="love-text text-[#6B7280] italic">"{story.story}"</p>
            </div>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {story.tags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#F9F5FF] text-[#6D28D9]"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-[#6B7280]">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {story.location}
              </span>
              <span className="flex items-center">
                <HeartPulse className="h-3.5 w-3.5 mr-1 text-[#EC4899]" />
                {story.time}
              </span>
            </div>
            
            <div className="mt-4 pt-3 border-t border-[#E5E7EB]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="emoji-reaction rounded-full bg-[#F9F5FF] p-1">
                    <ThumbsUp className="h-4 w-4 text-[#6D28D9]" />
                  </div>
                  <span className="text-xs text-[#6B7280]">128</span>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6D28D9] to-[#EC4899] flex items-center justify-center text-[10px] text-white font-medium border-2 border-white"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  
                  <div className="gooey-button bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white text-xs px-3 py-1 rounded-full">
                    Share Story
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>

{/* Add an Interactive Dating Swipe Cards Section */}
<div className="mt-16 mb-12">
  <div className="text-center mb-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 border border-[#6D28D9]/30 text-sm font-medium text-[#EC4899] mb-6">
        <Flame className="h-3.5 w-3.5 mr-2" />
        Interactive Demo
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#1F2937]">
        Experience Our{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
          Matching System
        </span>
      </h3>

      <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
        Try our intuitive swipe interface to see how our matching system works.
      </p>
    </motion.div>
  </div>

  <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
    <div className="swipe-card-container">
      <div className="swipe-card glass-card p-5">
        <div className="flex flex-col h-full">
          <div className="relative h-48 rounded-lg overflow-hidden mb-4">
            <img 
              src="/placeholder.svg?height=300&width=300" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5">
              <Verified className="h-5 w-5 text-[#4BB543]" />
            </div>
            <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-full px-2.5 py-1 text-xs text-white">
              94% Match
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xl font-bold">Alex, 28</h4>
              <div className="flex items-center gap-1 text-xs">
                <MapPin className="h-3 w-3 text-[#EC4899]" />
                <span>2 miles away</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">Blockchain developer and coffee enthusiast. Looking for someone to explore the city with!</p>
            
            <div className="flex flex-wrap gap-1 mb-4">
              {["Coffee", "Tech", "Hiking", "Art"].map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#F9F5FF] text-[#6D28D9]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-auto flex justify-between">
            <button className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border border-[#E5E7EB]">
              <ThumbsDown className="h-6 w-6 text-gray-400" />
            </button>
            
            <div className="flex flex-col items-center justify-center">
              <PercentCircle className="h-6 w-6 text-[#EC4899]" />
              <span className="text-xs font-medium text-[#EC4899]">94%</span>
            </div>
            
            <button className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center border border-[#E5E7EB]">
              <Heart className="h-6 w-6 text-[#EC4899]" />
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div className="max-w-sm">
      <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
        <h4 className="text-lg font-bold mb-4 text-[#1F2937]">How Our Matching Works</h4>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F9F5FF] flex items-center justify-center flex-shrink-0">
              <SparklesIcon className="h-4 w-4 text-[#6D28D9]" />
            </div>
            <div>
              <p className="text-sm text-[#4B5563]">Our AI analyzes 28+ compatibility factors including values, interests, and goals.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F9F5FF] flex items-center justify-center flex-shrink-0">
              <Shield className="h-4 w-4 text-[#6D28D9]" />
            </div>
            <div>
              <p className="text-sm text-[#4B5563]">All profiles are verified using our decentralized identity system for added security.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F9F5FF] flex items-center justify-center flex-shrink-0">
              <HeartPulse className="h-4 w-4 text-[#6D28D9]" />
            </div>
            <div>
              <p className="text-sm text-[#4B5563]">Compatibility scores are calculated in real-time as your preferences evolve.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#F9F5FF] flex items-center justify-center flex-shrink-0">
              <Syringe className="h-4 w-4 text-[#6D28D9]" />
            </div>
            <div>
              <p className="text-sm text-[#4B5563]">Optional health verification allows sharing of vaccination status through our secure system.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
          <Button className="w-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl gooey-button">
            <span className="flex items-center justify-center">
              Try The Demo
              <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>

            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl">
                <span className="flex items-center">
                  Share Your Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>
        </section>

        {/* Technology Section */}
        <section
          id="technology"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="py-20 md:py-32 relative bg-white"
        >
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
                  <Zap className="h-3.5 w-3.5 mr-2" />
                  Revolutionary Technology
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
                  Blockchain-Powered{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                    Dating Revolution
                  </span>
                </h2>

                <p className="text-xl text-[#4B5563]">
                  Our platform combines cutting-edge blockchain technology, decentralized identities, and AI-powered
                  matchmaking to create a secure and authentic dating experience.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative group"
                    onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9]/20 to-[#EC4899]/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <div className="relative bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 h-full hover:shadow-md transition-shadow">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-6 w-6 text-[#EC4899]" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 text-[#1F2937]">{feature.title}</h3>
                          <p className="text-[#6B7280]">{feature.description}</p>

                          <AnimatePresence>
                            {expandedFeature === index && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-4 pt-4 border-t border-[#E5E7EB]"
                              >
                                <h4 className="font-medium mb-2 text-[#EC4899]">Key Benefits:</h4>
                                <ul className="space-y-2">
                                  {feature.details.map((detail, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <Check className="h-4 w-4 text-[#6D28D9] flex-shrink-0 mt-0.5" />
                                      <span className="text-[#4B5563]">{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          <div className="mt-4">
                            <button className="text-[#EC4899] text-sm font-medium hover:text-[#EC4899]/80 transition-colors flex items-center">
                              {expandedFeature === index ? "Show less" : "Learn more"}
                              <ChevronRight
                                className={`ml-1 h-4 w-4 transition-transform ${expandedFeature === index ? "rotate-90" : ""}`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="mt-16 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6D28D9]/30 to-[#EC4899]/30 rounded-xl blur-lg opacity-75"></div>
                <div className="relative bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 overflow-hidden">
                  <div className="absolute inset-0 bg-pattern opacity-5"></div>

                  <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-full md:w-1/2">
                      <div className="aspect-video relative bg-[#F9F5FF] rounded-xl overflow-hidden border border-[#E5E7EB]">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6D28D9]/20 to-[#EC4899]/20 flex items-center justify-center">
                            <svg
                              className="w-8 h-8 text-[#EC4899]"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>

                        {/* Blockchain visualization overlay */}
                        <div className="absolute inset-0 bg-[#F9F5FF]/60 backdrop-blur-sm pointer-events-none">
                          <div className="blockchain-visualization-light">
                            <div className="blockchain-block-light block-1"></div>
                            <div className="blockchain-block-light block-2"></div>
                            <div className="blockchain-block-light block-3"></div>
                            <div className="blockchain-block-light block-4"></div>
                            <div className="blockchain-connection-light connection-1-2"></div>
                            <div className="blockchain-connection-light connection-2-3"></div>
                            <div className="blockchain-connection-light connection-3-4"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-4 text-[#1F2937]">How Our Technology Works</h3>
                      <p className="text-[#4B5563] mb-6">
                        Our platform uses zero-knowledge proofs, decentralized identifiers, and verifiable credentials
                        to create a secure dating environment where your data remains under your control at all times.
                      </p>

                      <div className="space-y-4">
                        {[
                          "Self-sovereign identity management",
                          "Decentralized data storage",
                          "Cryptographic verification",
                          "Privacy-preserving AI",
                        ].map((item, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-[#6D28D9]/20 to-[#EC4899]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-[#EC4899]" />
                            </div>
                            <span className="text-[#4B5563]">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <Button className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl">
                          <span className="flex items-center">
                            Read Whitepaper
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

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="py-20 md:py-32 relative bg-[#F9F5FF]"
        >
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 border border-[#6D28D9]/30 text-sm font-medium text-[#EC4899] mb-6">
                  <Sparkles className="h-3.5 w-3.5 mr-2" />
                  Unique Features
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
                  Your Profile as a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                    Unique NFT
                  </span>
                </h2>

                <p className="text-xl text-[#4B5563]">
                  Take full ownership of your dating profile with our revolutionary NFT-based approach, ensuring your
                  data sovereignty and authenticity.
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

                  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        title: "Profile Ownership",
                        icon: <UserCircle className="h-8 w-8 text-[#EC4899]" />,
                        description:
                          "Your profile is minted as an NFT that you fully own and control, ensuring complete data sovereignty.",
                      },
                      {
                        title: "Verifiable Credentials",
                        icon: <Shield className="h-8 w-8 text-[#6D28D9]" />,
                        description:
                          "Build trust through verified credentials without exposing sensitive personal information.",
                      },
                      {
                        title: "Secure Connections",
                        icon: <Lock className="h-8 w-8 text-[#8B5CF6]" />,
                        description: "All interactions are end-to-end encrypted and secured by blockchain technology.",
                      },
                    ].map((item, index) => (
                      <div key={index} className="relative">
                        <div className="flex flex-col items-center text-center">
                          <div className="w-16 h-16 rounded-xl bg-[#F9F5FF] flex items-center justify-center mb-4">
                            {item.icon}
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-[#1F2937]">{item.title}</h3>
                          <p className="text-[#6B7280]">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2 text-[#1F2937]">Ready to Own Your Dating Experience?</h3>
                        <p className="text-[#6B7280]">
                          Join the revolution and take control of your digital dating identity.
                        </p>
                      </div>
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl"
                      >
                        <span className="flex items-center">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent"></div>
        </section>

        <section className="py-20 md:py-32 relative bg-white">
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
                  <Utensils className="h-3.5 w-3.5 mr-2" />
                  Date Inspiration
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
                  Discover Perfect{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                    Date Ideas
                  </span>
                </h2>

                <p className="text-xl text-[#4B5563]">
                  Get personalized date suggestions based on shared interests and preferences, all while maintaining
                  your privacy.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {[
    {
      title: "Coffee Date",
      icon: <Coffee className="h-8 w-8 text-white" />,
      description: "Start with a casual coffee meetup in a cozy café. Perfect for first introductions.",
      color: "from-[#FB923C] to-[#EA580C]",
      price: "$$",
      duration: "1-2 hours",
      attributes: ["Casual", "Conversation", "Relaxed"]
    },
    {
      title: "Fine Dining",
      icon: <Wine className="h-8 w-8 text-white" />,
      description: "Enjoy an elegant dinner at a top-rated restaurant. Ideal for special occasions.",
      color: "from-[#F9A8D4] to-[#BE185D]",
      price: "$$$$",
      duration: "2-3 hours",
      attributes: ["Romantic", "Upscale", "Intimate"]
    },
    {
      title: "Art Gallery",
      icon: <Palette className="h-8 w-8 text-white" />,
      description: "Explore local art exhibitions and discuss your impressions of various pieces.",
      color: "from-[#A5B4FC] to-[#4338CA]",
      price: "$$",
      duration: "1-3 hours",
      attributes: ["Cultural", "Inspiring", "Interactive"]
    },
    {
      title: "Comedy Show",
      icon: <Laugh className="h-8 w-8 text-white" />,
      description: "Share laughs at a stand-up comedy performance. Great for breaking the ice.",
      color: "from-[#BEF264] to-[#65A30D]",
      price: "$$$",
      duration: "2 hours",
      attributes: ["Fun", "Entertaining", "Shared Experience"]
    },
  ].map((item, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group flip-card"
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div className="relative bg-white shadow-sm border border-[#E5E7EB] h-full">
            <div className={`h-32 bg-gradient-to-r ${item.color} flex items-center justify-center relative`}>
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">{item.icon}</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-[#1F2937]">{item.title}</h3>
              <p className="text-[#6B7280] mb-4">{item.description}</p>
              
              <div className="flex items-center justify-between text-sm text-[#6B7280]">
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{item.price}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{item.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flip-card-back">
          <div className={`bg-gradient-to-br ${item.color} h-full p-6 text-white`}>
            <h3 className="text-xl font-bold mb-4">Why It Works</h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm">Perfect for discovering shared interests</p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm">Creates memorable shared experiences</p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <p className="text-sm">83% of our successful couples started here</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {item.attributes.map((attr, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white"
                  >
                    {attr}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6">
              <button className="w-full py-2 bg-white text-sm font-medium rounded-lg" style={{ color: `var(--tw-gradient-to)` }}>
                Save Idea
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ))}
</div>

{/* Add a complementary music taste visualization section */}
<div className="mt-12 text-center">
  <div className="inline-block">
    <h3 className="text-xl font-bold mb-6 text-[#1F2937]">Finding Your Perfect Date Based On Music Taste</h3>
    
    <div className="flex items-end justify-center h-20 gap-1 mb-4">
      {[...Array(10)].map((_, i) => (
        <div 
          key={i} 
          className="music-bar"
          style={{ 
            animationDelay: `${i * 0.1}s`,
            height: `${Math.random() * 15 + 5}px`
          }}
        ></div>
      ))}
    </div>
    
    <div className="flex items-center justify-center gap-4">
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F5FF] text-[#6D28D9] text-sm">
        <Podcast className="h-4 w-4" />
        <span>Shared Playlist Generation</span>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#F9F5FF] text-[#6D28D9] text-sm">
        <Film className="h-4 w-4" />
        <span>Concert Date Planning</span>
      </div>
    </div>
  </div>
  
  <Button className="mt-8 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl gooey-button">
    <span className="flex items-center">
      Explore More Date Ideas
      <ArrowRight className="ml-2 h-4 w-4" />
    </span>
  </Button>
</div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>
        </section>

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
        <section id="journey" ref={(el) => (sectionsRef.current[3] = el)} className="py-20 md:py-32 relative bg-white">
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
                  <ArrowRight className="h-3.5 w-3.5 mr-2" />
                  Your Journey
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
                  From Wallet to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                    Meaningful Connection
                  </span>
                </h2>

                <p className="text-xl text-[#4B5563]">
                  Our streamlined process makes it easy to get started with decentralized dating, from connecting your
                  wallet to finding your perfect match.
                </p>
              </motion.div>
            </div>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#6D28D9] to-[#EC4899] md:-translate-x-px"></div>

              <div className="space-y-12 relative">
                {journeySteps.map((step, index) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-start gap-8`}
                    >
                      <div className="flex items-center gap-4 md:w-1/2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] flex items-center justify-center flex-shrink-0 z-10">
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="md:hidden">
                          <span className="text-sm text-[#EC4899] font-medium">Step {step.step}</span>
                          <h3 className="text-xl font-bold text-[#1F2937]">{step.title}</h3>
                        </div>
                      </div>

                      <div className="pl-14 md:pl-0 md:w-1/2">
                        <div className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6">
                          <div className="hidden md:block mb-2">
                            <span className="text-sm text-[#EC4899] font-medium">Step {step.step}</span>
                            <h3 className="text-xl font-bold text-[#1F2937]">{step.title}</h3>
                          </div>
                          <p className="text-[#6B7280]">{step.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl"
              >
                <span className="flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>
        </section>

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
          ref={(el) => (sectionsRef.current[4] = el)}
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
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl"
                          >
                            <span className="flex items-center">
                              <Wallet className="mr-2 h-5 w-5" />
                              Connect Wallet
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
                              <Button className="w-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 rounded-xl">
                                Join Waitlist
                              </Button>
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

        <section className="py-16 bg-gradient-to-r from-[#6D28D9]/5 to-[#EC4899]/5">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { count: "10,000+", label: "Active Users", icon: <UserCircle className="h-6 w-6 text-[#6D28D9]" /> },
                {
                  count: "2,500+",
                  label: "Successful Matches",
                  icon: <HeartHandshake className="h-6 w-6 text-[#EC4899]" />,
                },
                { count: "500+", label: "Relationships", icon: <Heart className="h-6 w-6 text-[#EC4899]" /> },
                { count: "50+", label: "Engagements", icon: <Gift className="h-6 w-6 text-[#6D28D9]" /> },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1F2937]">{item.count}</h3>
                  <p className="text-[#6B7280]">{item.label}</p>
                </motion.div>
              ))}
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

