'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Wallet } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  activeSection: number
  navItems: { name: string; href: string }[]
}

export function MobileMenu({ mobileMenuOpen, setMobileMenuOpen, activeSection, navItems }: MobileMenuProps) {
  return (
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
  )
}