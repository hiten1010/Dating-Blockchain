'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Check, UserCircle, Fingerprint, Shield, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Feature {
  title: string
  icon: React.ElementType
  description: string
  details: string[]
}

export function FeaturesSection() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null)

  const features: Feature[] = [
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

  return (
    <section
      id="features"
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1F2937]">
            Revolutionary Features for a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
              Secure Dating Experience
            </span>
          </h2>
          <p className="text-xl text-[#4B5563]">
            Our platform combines blockchain security, decentralized identity, and AI to create a dating experience unlike any other.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isExpanded = expandedFeature === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative group rounded-2xl overflow-hidden transition-all duration-300",
                  isExpanded ? "bg-white shadow-xl" : "bg-white/50 hover:bg-white hover:shadow-lg",
                )}
                onClick={() => setExpandedFeature(isExpanded ? null : index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#6D28D9]/5 to-[#EC4899]/5 opacity-100 group-hover:opacity-100"></div>
                <div className="absolute inset-0 bg-pattern opacity-5 rounded-2xl"></div>

                <div className="relative p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center",
                        isExpanded
                          ? "bg-gradient-to-br from-[#6D28D9] to-[#EC4899] text-white"
                          : "bg-gradient-to-br from-[#6D28D9]/10 to-[#EC4899]/10 text-[#6D28D9]",
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1F2937] mb-2 flex items-center justify-between">
                        {feature.title}
                        <ChevronRight
                          className={cn(
                            "h-5 w-5 text-[#6D28D9] transition-transform",
                            isExpanded ? "rotate-90" : "group-hover:translate-x-1",
                          )}
                        />
                      </h3>
                      <p className="text-[#4B5563]">{feature.description}</p>

                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-2"
                        >
                          {feature.details.map((detail, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#6D28D9]/10 flex items-center justify-center mt-0.5">
                                <Check className="h-3 w-3 text-[#6D28D9]" />
                              </div>
                              <span className="text-sm text-[#4B5563]">{detail}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}