"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle, ExternalLink } from "lucide-react"
import { isLeapWalletInstalled, connectLeap, formatAddress, disconnectLeap } from "@/utils/wallet"

const NavigationWalletButton = () => {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showError, setShowError] = useState(false)
  const [showAccountInfo, setShowAccountInfo] = useState(false)

  // Helper function to detect if another wallet like MetaMask is installed
  const isOtherWalletInstalled = (): boolean => {
    return window.ethereum !== undefined && 
           typeof window.ethereum === 'object' && 
           (
             ('isMetaMask' in window.ethereum) || 
             !('isLeap' in window.ethereum)
           );
  }

  const connectLeapWallet = async () => {
    setIsConnecting(true)
    setError(null)
    setShowError(false)
    setShowAccountInfo(false)

    try {
      // Check for other wallet extensions that might interfere
      if (isOtherWalletInstalled() && !isLeapWalletInstalled()) {
        throw new Error("Another wallet extension detected. Please install Leap wallet or disable other wallet extensions.");
      }
      
      if (!isLeapWalletInstalled()) {
        // Open a new tab with the Leap wallet website if not installed
        window.open("https://www.leapwallet.io/", "_blank")
        throw new Error("Leap wallet not installed. Please install it and reload this page.")
      }

      try {
        const address = await connectLeap()
        
        if (address) {
          setWalletAddress(address)
          // Store address in local storage to persist across sessions
          localStorage.setItem("walletAddress", address)
        } else {
          throw new Error("No accounts found in Leap wallet. Please create an account for Unichain Sepolia.")
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        if (errorMessage.includes("No accounts") || errorMessage.includes("account for Unichain")) {
          setShowAccountInfo(true);
          throw new Error("No Unichain Sepolia account found. Please add this network to your wallet.");
        } else {
          throw error;
        }
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet.")
      setShowError(true)
      console.error("Wallet connection error:", err)
      
      // Auto-hide simple errors after 5 seconds, but keep account creation info visible
      if (!showAccountInfo) {
        setTimeout(() => {
          setShowError(false)
        }, 5000)
      }
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
        <div className="absolute top-full mt-2 right-0 bg-red-50 border border-red-200 text-red-600 text-xs p-2 rounded-md shadow-sm z-50 w-72">
          <div className="flex items-start gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{error}</p>
              
              {showAccountInfo && (
                <div className="mt-2 text-xs">
                  <p>To add Unichain Sepolia:</p>
                  <ol className="pl-4 mt-1 list-decimal">
                    <li>Open Leap wallet</li>
                    <li>Click &quot;+&quot; → &quot;Connect to EVM chains&quot;</li>
                    <li>Add custom network: ID 1301, RPC https://sepolia.unichain.org</li>
                  </ol>
                  <button onClick={connectLeapWallet} className="mt-1 text-blue-600 hover:underline">Try Again</button>
                </div>
              )}
            </div>
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
            <div>
              <p className="font-medium">{error}</p>
              
              {showAccountInfo && (
                <div className="mt-2 text-xs">
                  <p>To add Unichain Sepolia:</p>
                  <ol className="pl-4 mt-1 list-decimal">
                    <li>Open Leap wallet</li>
                    <li>Click &quot;+&quot; → &quot;Connect to EVM chains&quot;</li>
                    <li>Add custom network: ID 1301, RPC https://sepolia.unichain.org</li>
                  </ol>
                  <button onClick={connectLeapWallet} className="mt-1 text-blue-600 hover:underline">Try Again</button>
                </div>
              )}
            </div>
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