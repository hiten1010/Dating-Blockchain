"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WalletIcon, AlertCircleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ConnectWalletStepProps {
  onWalletConnected: (address: string) => void
}

export default function ConnectWalletStep({ onWalletConnected }: ConnectWalletStepProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const connectWallet = async () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate a random wallet address for demo purposes
      const randomAddress = "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join("")
      setWalletAddress(randomAddress)

      // Wait a moment before proceeding to next step
      setTimeout(() => {
        onWalletConnected(randomAddress)
      }, 1000)
    } catch (err) {
      setError("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setWalletAddress(null)
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
        <CardDescription>Connect your wallet to proceed to profile setup</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-purple-50 p-6 rounded-lg flex items-start space-x-3">
          <InfoIcon className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">
              Your wallet will allow you to sign transactions and eventually mint your NFT profile on the Cheqd
              protocol.
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {walletAddress ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2 bg-green-50 p-4 rounded-lg w-full">
              <CheckCircle2Icon className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Wallet Connected</p>
                <p className="text-sm text-muted-foreground">
                  {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={disconnectWallet}>
              Disconnect Wallet
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center">
              <WalletIcon className="h-10 w-10 text-purple-600" />
            </div>
            <p className="text-center text-muted-foreground">Select a compatible wallet to connect with our platform</p>
          </div>
        )}

        {!walletAddress && (
          <div className="grid grid-cols-2 gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center space-x-2 h-16"
                    onClick={connectWallet}
                    disabled={isConnecting}
                  >
                    <img src="/placeholder.svg?height=24&width=24" alt="MetaMask" className="h-6 w-6" />
                    <span>MetaMask</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connect with MetaMask wallet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center justify-center space-x-2 h-16"
                    onClick={connectWallet}
                    disabled={isConnecting}
                  >
                    <img src="/placeholder.svg?height=24&width=24" alt="WalletConnect" className="h-6 w-6" />
                    <span>WalletConnect</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Connect with WalletConnect</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!walletAddress && (
          <Button
            onClick={connectWallet}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isConnecting}
          >
            {isConnecting ? (
              <div className="flex items-center">
                <span className="mr-2">Connecting...</span>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              "Connect Wallet"
            )}
          </Button>
        )}

        {walletAddress && (
          <Button
            onClick={() => onWalletConnected(walletAddress)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Continue
          </Button>
        )}
      </CardFooter>
    </>
  )
}

