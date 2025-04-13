'use client'

import { motion } from 'framer-motion'
import { Shield } from 'lucide-react'

interface Sponsor {
  name: string
  logo: string
  tagline: string
  letter: string
}

export function PartnersSection() {
  const sponsors: Sponsor[] = [
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
      id="partners"
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
              <Shield className="h-3.5 w-3.5 mr-2" />
              Trusted Partners
            </div>

            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#1F2937]">
              Powered by{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6D28D9] to-[#EC4899]">
                Industry Leaders
              </span>
            </h2>

            <p className="text-xl text-[#4B5563]">
              Our platform is built on partnerships with the most trusted names in blockchain and decentralized identity.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm border border-[#E5E7EB] p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-[#6D28D9]">{sponsor.letter}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#1F2937]">{sponsor.name}</h3>
                <p className="text-[#6B7280] mb-4">{sponsor.tagline}</p>
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#6D28D9]/30 to-transparent mb-4"></div>
                <p className="text-sm text-[#4B5563]">
                  Powering secure and private connections since 2021
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>
    </section>
  )
}