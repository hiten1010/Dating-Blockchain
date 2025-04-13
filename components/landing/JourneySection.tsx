'use client'

import { motion } from 'framer-motion'
import { Wallet, UserCircle, Key, Sparkles, MessageSquare } from 'lucide-react'

interface JourneyStep {
  step: number
  title: string
  description: string
  icon: React.ElementType
}

export function JourneySection() {
  const journeySteps: JourneyStep[] = [
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

  return (
    <section
      id="journey"
      className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#F9F5FF] to-white"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1F2937]">
            Your Journey to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
              Secure Connections
            </span>
          </h2>
          <p className="text-xl text-[#4B5563]">
            A simple, secure process to find meaningful connections while maintaining complete control of your data.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#6D28D9] to-[#EC4899] hidden md:block"></div>

          <div className="space-y-12 md:space-y-0 relative">
            {journeySteps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`md:flex items-center ${isEven ? '' : 'md:flex-row-reverse'} md:gap-8`}
                  >
                    <div className="md:w-1/2 flex md:justify-end mb-6 md:mb-0">
                      <div className={`text-center ${isEven ? 'md:text-right' : 'md:text-left'} md:max-w-sm`}>
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white text-xl font-bold mb-4">
                          {step.step}
                        </div>
                        <h3 className="text-xl font-semibold text-[#1F2937] mb-2">{step.title}</h3>
                        <p className="text-[#4B5563]">{step.description}</p>
                      </div>
                    </div>

                    <div className="hidden md:flex items-center justify-center relative z-10">
                      <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-4 border-white">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#6D28D9]/10 to-[#EC4899]/10 flex items-center justify-center">
                          <Icon className="h-8 w-8 text-[#6D28D9]" />
                        </div>
                      </div>
                    </div>

                    <div className="md:w-1/2 md:flex md:justify-start">
                      <div className="md:hidden flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6D28D9]/10 to-[#EC4899]/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-[#6D28D9]" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#1F2937]">{step.title}</h3>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}