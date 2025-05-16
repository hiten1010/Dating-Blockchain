"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeaderProps {
  activeSection: number
  scrollY: number
  navItems: { name: string; href: string }[]
}

export default function Header({ activeSection, scrollY, navItems }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrollY > 50 ? "bg-white/90 backdrop-blur-md py-3 shadow-sm" : "bg-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10">
                <img src="/logo2.svg" alt="VeraLove Logo" className="w-full h-full" />
              </div>
              <span className="font-bold text-xl tracking-tight text-[#1F2937]">VeraLove</span>
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
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:flex border-[#6D28D9] text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white"
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </Link>

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
              <Link href="/onboarding">
                <Button className="mt-4 bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 w-full">
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 