"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, LogOut, AlertCircle, ExternalLink } from "lucide-react"

import {
  isLeapWalletInstalled,
  connectLeap,
  formatAddress,
  disconnectLeap
} from "@/utils/wallet"

/* ---------- component ---------- */
export default function ConnectButton() {
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showAccountCreationInfo, setShowAccountCreationInfo] = useState(false)

  /* Detect if MetaMask is likely installed */
  const isMetaMaskLikelyInstalled = (): boolean => {
    return window.ethereum !== undefined && 
           typeof window.ethereum === 'object' && 
           'isMetaMask' in window.ethereum;
  }

  /* Connect wallet */
  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)
    setShowAccountCreationInfo(false)

    try {
      // Check if MetaMask is likely installed but Leap is not
      if (isMetaMaskLikelyInstalled() && !isLeapWalletInstalled()) {
        throw new Error("Another wallet extension (likely MetaMask) detected. Please install Leap wallet or disable other wallet extensions for this site.");
      }
      
      if (!isLeapWalletInstalled()) {
        throw new Error("Leap wallet extension not detected. Please install it to continue.");
      }

      // Connect to Unichain Sepolia
      try {
        console.log("Connecting to Leap wallet");
        const address = await connectLeap();
        console.log("Connected successfully:", address);
        
        if (address) {
          setWalletAddress(address)
          sessionStorage.setItem("walletAddress", address)
          localStorage.setItem("walletAddress", address)
        } else {
          throw new Error("No accounts returned from the wallet.");
        }
      } catch (error) {
        console.warn("Connection failed:", error);
        
        const errorMessage = error instanceof Error ? error.message : String(error);
        
        if (errorMessage.includes("No accounts") || errorMessage.includes("account for Unichain")) {
          setShowAccountCreationInfo(true);
          throw new Error("No Unichain Sepolia account found in your Leap wallet. Please create an account first.");
        } else if (errorMessage.includes("provider")) {
          throw new Error("Could not connect to Leap wallet. Make sure it's installed and enabled for this site.");
        } else {
          throw error;
        }
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Failed to connect wallet";
      setError(errorMessage);
      console.error(e);
    } finally {
      setIsConnecting(false)
    }
  }

  /* Disconnect wallet */
  const disconnectWallet = async () => {
    try {
      if (isLeapWalletInstalled()) {
        await disconnectLeap()
      }
    } finally {
      setWalletAddress("")
      sessionStorage.removeItem("walletAddress")
      localStorage.removeItem("walletAddress")
    }
  }

  /* Restore on refresh */
  useEffect(() => {
    const stored = sessionStorage.getItem("walletAddress") || localStorage.getItem("walletAddress")
    if (stored) setWalletAddress(stored)
  }, [])

  /* ---------- UI ---------- */
  return (
    <div className="flex flex-col items-center">
      {walletAddress ? (
        <Button onClick={disconnectWallet} className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90">
          <span className="flex items-center gap-2">
            {formatAddress(walletAddress)}
            <LogOut className="h-4 w-4" />
          </span>
        </Button>
      ) : (
        <Button onClick={connectWallet} disabled={isConnecting} className="bg-gradient-to-r from-[#6D28D9] to-[#EC4899] text-white hover:opacity-90">
          <span className="flex items-center gap-2">
            {isConnecting ? "Connecting…" : "Connect Wallet"}
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
              
              {showAccountCreationInfo && (
                <div className="mt-3 p-3 bg-white rounded-md border border-gray-200">
                  <h4 className="text-gray-800 font-medium">How to create a Unichain Sepolia account:</h4>
                  <ol className="mt-2 text-xs text-gray-700 space-y-1.5 list-decimal pl-4">
                    <li>Open your Leap wallet extension</li>
                    <li>Click on the &quot;+&quot; icon or &quot;Add a new account&quot;</li>
                    <li>Select &quot;Connect to EVM chains&quot;</li>
                    <li>Click on &quot;Add custom network&quot;</li>
                    <li>Enter the following details:
                      <ul className="pl-4 mt-1 list-disc">
                        <li>Network Name: <span className="font-mono bg-gray-100 px-1 rounded">Unichain Sepolia</span></li>
                        <li>Chain ID: <span className="font-mono bg-gray-100 px-1 rounded">1301</span></li>
                        <li>Symbol: <span className="font-mono bg-gray-100 px-1 rounded">ETH</span></li>
                        <li>RPC URL: <span className="font-mono bg-gray-100 px-1 rounded text-xs">https://sepolia.unichain.org</span></li>
                        <li>Block Explorer: <span className="font-mono bg-gray-100 px-1 rounded text-xs">https://sepolia.uniscan.xyz</span></li>
                      </ul>
                    </li>
                    <li>Click &quot;Save&quot; and create or import a wallet</li>
                    <li>Return to this page and click &quot;Connect Wallet&quot; again</li>
                  </ol>
                </div>
              )}
              
              <div className="mt-2 flex flex-wrap gap-2">
                <a
                  href="https://www.leapwallet.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-[#6D28D9] hover:underline"
                >
                  Get Leap Wallet
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
                <button
                  onClick={connectWallet}
                  className="inline-flex items-center text-xs text-[#6D28D9] hover:underline"
                >
                  Try Again
                  <ExternalLink className="ml-1 h-3 w-3 rotate-45" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
