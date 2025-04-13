'use client'

import { motion } from 'framer-motion'
import { Shield, Lock, Fingerprint, Key, UserCircle } from 'lucide-react'

export function SecuritySection() {
  return (
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
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {[
                {
                  title: "Self-Sovereign Identity",
                  description:
                    "Your identity remains fully under your control with zero-knowledge proofs for verification without exposure.",
                  icon: <Fingerprint className="h-6 w-6 text-white" />,
                  color: "from-[#6D28D9] to-[#8B5CF6]",
                },
                {
                  title: "End-to-End Encryption",
                  description:
                    "All communications are secured with state-of-the-art encryption that not even we can access.",
                  icon: <Lock className="h-6 w-6 text-white" />,
                  color: "from-[#EC4899] to-[#F472B6]",
                },
                {
                  title: "Blockchain Verification",
                  description:
                    "Profile authenticity and interactions are verified through immutable blockchain records.",
                  icon: <Shield className="h-6 w-6 text-white" />,
                  color: "from-[#6D28D9] to-[#EC4899]",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#1F2937] mb-1">{item.title}</h3>
                    <p className="text-[#6B7280]">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent"></div>
    </section>
  )
}