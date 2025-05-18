"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle } from "lucide-react"
import { isLeapWalletInstalled, connectLeap, formatAddress, disconnectLeap } from "@/utils/wallet"

const NavigationWalletButton = () => {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)

  const connectLeapWallet = async () => {
    setIsConnecting(true)
    setError(null)
    setShowError(false)

    try {
      if (!isLeapWalletInstalled()) {
        // Open a new tab with the Leap wallet website if not installed
        window.open("https://www.leapwallet.io/", "_blank")
        throw new Error("Leap wallet not installed. Redirecting to download page.")
      }

      const address = await connectLeap()
      
      if (address) {
        setWalletAddress(address)
        // Store address in local storage to persist across sessions
        localStorage.setItem("walletAddress", address)
      } else {
        throw new Error("No accounts found in Leap wallet. Please make sure you have created an account.")
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet.")
      setShowError(true)
      console.error("Wallet connection error:", err)
      
      // Auto-hide error after 5 seconds
      setTimeout(() => {
        setShowError(false)
      }, 5000)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      if (isLeapWalletInstalled()) {
        await disconnectLeap()
      }
      setWalletAddress("")
      localStorage.removeItem("walletAddress")
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  // Check for a stored address on component mount
  useEffect(() => {
    const storedAddress = localStorage.getItem("walletAddress")
    if (storedAddress) {
      setWalletAddress(storedAddress)
    }
  }, [])

  // For desktop
  const desktopButton = walletAddress ? (
    <Button
      variant="outline"
      onClick={disconnectWallet}
      className="hidden md:flex border-[#6D28D9] bg-gradient-to-r from-[#6D28D9]/10 to-[#EC4899]/10 text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white"
    >
      <span className="flex items-center gap-2">
        {formatAddress(walletAddress)}
        <LogOut className="h-4 w-4" />
      </span>
    </Button>
  ) : (
    <>
      <Button
        variant="outline"
        onClick={connectLeapWallet}
        disabled={isConnecting}
        className="hidden md:flex border-[#6D28D9] text-[#6D28D9] hover:bg-[#6D28D9] hover:text-white relative"
      >
        <span className="flex items-center gap-2">
          {isConnecting ? "Connecting..." : "Connect Wallet"}
          <Wallet className="h-4 w-4" />
        </span>
      </Button>
      {showError && (
        <div className="absolute top-full mt-2 right-0 bg-red-50 border border-red-200 text-red-600 text-xs p-2 rounded-md shadow-sm z-50 w-64">
          <div className="flex items-start gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        </div>
      )}
    </>
  )

  // For mobile
  const mobileButton = walletAddress ? (
    <Button
      onClick={disconnectWallet}
      className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 w-full"
    >
      <span className="flex items-center gap-2">
        {formatAddress(walletAddress)}
        <LogOut className="h-4 w-4" />
      </span>
    </Button>
  ) : (
    <>
      <Button
        onClick={connectLeapWallet}
        disabled={isConnecting}
        className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90 w-full"
      >
        <span className="flex items-center gap-2">
          {isConnecting ? "Connecting..." : "Connect Wallet"}
          <Wallet className="h-4 w-4" />
        </span>
      </Button>
      {showError && (
        <div className="mt-2 bg-red-50 border border-red-200 text-red-600 text-xs p-2 rounded-md shadow-sm">
          <div className="flex items-start gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        </div>
      )}
    </>
  )

  return {
    desktopButton,
    mobileButton,
    isConnected: !!walletAddress,
    address: walletAddress,
    error,
  }
}

export default NavigationWalletButton 