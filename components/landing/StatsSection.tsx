'use client'

import { motion } from 'framer-motion'
import { UserCircle, Heart, Gift, HeartHandshake } from 'lucide-react'

interface Stat {
  count: string
  label: string
  icon: React.ReactNode
}

export function StatsSection() {
  const stats: Stat[] = [
    { count: "10,000+", label: "Active Users", icon: <UserCircle className="h-6 w-6 text-[#6D28D9]" /> },
    {
      count: "2,500+",
      label: "Successful Matches",
      icon: <HeartHandshake className="h-6 w-6 text-[#EC4899]" />,
    },
    { count: "500+", label: "Relationships", icon: <Heart className="h-6 w-6 text-[#EC4899]" /> },
    { count: "50+", label: "Engagements", icon: <Gift className="h-6 w-6 text-[#6D28D9]" /> },
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-[#6D28D9]/5 to-[#EC4899]/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((item, index) => (
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
  )
}