"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle, ExternalLink } from "lucide-react"
import { isLeapWalletInstalled, connectLeap, formatAddress, COSMOS_CHAIN_ID } from "@/utils/wallet"

const ConnectButton = () => {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connectLeapWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Check if Leap wallet is installed
      if (!isLeapWalletInstalled()) {
        throw new Error("Leap wallet not found. Please install the Leap wallet extension.")
      }

      // Connect using our utility function
      const address = await connectLeap()
      
      if (address) {
        setWalletAddress(address)
        // Store address in session storage to maintain connection state
        sessionStorage.setItem("walletAddress", address)
        localStorage.setItem("walletAddress", address) // Also store in localStorage for cross-page persistence
      } else {
        throw new Error("No accounts found in Leap wallet. Please make sure you have created an account.")
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet.")
      console.error("Wallet connection error:", err)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    try {
      if (isLeapWalletInstalled()) {
        // Use the correct signature for disconnect
        await window.leap.disconnect(COSMOS_CHAIN_ID);
      }
      setWalletAddress("")
      // Clear stored address
      sessionStorage.removeItem("walletAddress")
      localStorage.removeItem("walletAddress")
    } catch (error) {
      console.error("Error disconnecting wallet:", error)
    }
  }

  // Check if the user was previously connected
  useEffect(() => {
    const storedAddress = sessionStorage.getItem("walletAddress") || localStorage.getItem("walletAddress")
    if (storedAddress) {
      setWalletAddress(storedAddress)
    }
  }, [])

  return (
    <div className="flex flex-col items-center">
      {walletAddress ? (
        <Button 
          onClick={disconnectWallet}
          className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90"
        >
          <span className="flex items-center gap-2">
            {formatAddress(walletAddress)}
            <LogOut className="h-4 w-4" />
          </span>
        </Button>
      ) : (
        <Button
          onClick={connectLeapWallet}
          disabled={isConnecting}
          className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90"
        >
          <span className="flex items-center gap-2">
            {isConnecting ? "Connecting..." : "Connect Wallet"}
            <Wallet className="h-4 w-4" />
          </span>
        </Button>
      )}
      
      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md shadow-sm w-full max-w-md">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">{error}</p>
              <p className="mt-1 text-xs">
                Make sure you have the Leap wallet extension installed and have created an account for one of the supported Cosmos networks.
              </p>
              <a 
                href="https://www.leapwallet.io/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center text-xs text-[#6D28D9] hover:underline"
              >
                Get Leap Wallet
                <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConnectButton 