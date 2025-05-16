"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart, MessageCircle, Sparkles, User, Settings, Bell, Search, ChevronDown, LogOut } from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function DatingNavbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [notifications, setNotifications] = useState(3) // Dummy notification count
  const [imageError, setImageError] = useState(false)

  // Moving the useEffect hook before the early return to avoid the hooks error
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Pages where navbar should not appear
  const excludedPages = ["/", "/profile", "/onboarding", "/ai-twin"]
  
  // If current path is in excluded pages, don't render the navbar
  if (excludedPages.some(page => pathname === page || pathname.startsWith(`${page}/`))) {
    return null
  }

  const isActive = (path: string) => pathname === path

  // For demo purposes - would connect to your authentication system
  const user = {
    name: "Jamie",
    image: "https://i.pravatar.cc/150?img=32",
    premium: true
  }

  const mainNavItems = [
    { href: "/explore", label: "Explore", icon: Heart },
    { href: "/chats", label: "Messages", icon: MessageCircle, notifications: 2 },
    { href: "/create-twin", label: "AI Twin", icon: Sparkles },
    { href: "/user", label: "Profile", icon: User },
  ]

  // Render user avatar with fallback
  const renderUserAvatar = (size: number) => {
    if (imageError) {
      return (
        <div className={`h-${size} w-${size} rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm`}>
          {user.name.charAt(0)}
        </div>
      )
    }
    
    return (
      <Image 
        src={user.image} 
        alt="Profile" 
        width={size * 4} 
        height={size * 4}
        className={`rounded-full border-2 ${user.premium ? 'border-amber-400' : 'border-transparent'}`}
        onError={() => setImageError(true)}
      />
    )
  }

  return (
    <>
      {/* Main Navbar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? 'py-2 bg-white/90 shadow-md backdrop-blur-md' : 'py-4 bg-transparent'}`}>
        
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 mr-2">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full blur opacity-70"></div>
                <div className="relative h-10 w-10 bg-white rounded-full flex items-center justify-center">
                  <Heart className="h-5 w-5 text-pink-500 fill-pink-500" />
                </div>
              </div>
              <span className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-rose-600 
                ${isScrolled ? 'opacity-100' : 'opacity-100'}`}>
                VeraLove
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {mainNavItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.href)
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative group px-4 py-2 rounded-full flex items-center transition-all duration-300
                      ${active 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-md' 
                        : 'hover:bg-white/80 text-gray-700'
                      }`}
                  >
                    <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-gray-600'} mr-2`} />
                    <span className="font-medium">{item.label}</span>
                    
                    {/* Notification badge */}
                    {item.notifications && (
                      <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                        {item.notifications}
                      </span>
                    )}
                  </Link>
                )
              })}
              
              
              {/* Notifications */}
              <button className="relative p-2 rounded-full hover:bg-white/80 text-gray-700 transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {notifications}
                  </span>
                )}
              </button>
              
              {/* User Profile */}
              <div className="relative">
                <button 
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 pr-3 rounded-full hover:bg-white/80 transition-colors"
                >
                  <div className="relative h-8 w-8">
                    {renderUserAvatar(8)}
                    {user.premium && (
                      <div className="absolute -bottom-1 -right-1 bg-amber-400 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                        ✓
                      </div>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>
                
                <AnimatePresence>
                  {profileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl py-2 border border-gray-100"
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">Connected via Verida</p>
                      </div>
                      
                      <Link href="/user" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="h-4 w-4" />
                        Your Profile
                      </Link>
                      
                      <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      
                      <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-gray-50">
                        <LogOut className="h-4 w-4" />
                        Disconnect Wallet
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Mobile Navigation - Bottom Bar */}
            <div className="md:hidden">
              <button className="relative p-2 rounded-full hover:bg-white/80 text-gray-700 transition-colors">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-rose-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-5 h-16">
          {mainNavItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex flex-col items-center justify-center"
              >
                <div className={`flex flex-col items-center justify-center transition-all duration-300
                  ${active ? 'text-pink-600 scale-110' : 'text-gray-500'}`}
                >
                  {active && (
                    <div className="absolute -top-2.5 h-1 w-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500" />
                  )}
                  
                  <Icon className={`h-6 w-6 ${active ? 'text-pink-600' : 'text-gray-500'}`} />
                  <span className={`text-xs mt-1 ${active ? 'font-medium text-pink-600' : 'text-gray-500'}`}>
                    {item.label}
                  </span>
                  
                  {/* Notification badge */}
                  {item.notifications && (
                    <span className="absolute top-0 right-1/4 bg-blue-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full shadow-sm">
                      {item.notifications}
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
          
          {/* Menu button for settings etc */}
          <div className="relative flex flex-col items-center justify-center">
            <button 
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex flex-col items-center justify-center text-gray-500"
            >
              <div className="relative h-6 w-6 mb-1">
                {renderUserAvatar(6)}
              </div>
              <span className="text-xs">More</span>
            </button>
            
            <AnimatePresence>
              {profileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-16 right-0 w-48 bg-white rounded-2xl shadow-xl py-2 border border-gray-100"
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">Connected via Verida</p>
                  </div>
                  
                  <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                  
                  <Link href="/search" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    <Search className="h-4 w-4" />
                    Search
                  </Link>
                  
                  <button className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-600 hover:bg-gray-50">
                    <LogOut className="h-4 w-4" />
                    Disconnect
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  )
} 