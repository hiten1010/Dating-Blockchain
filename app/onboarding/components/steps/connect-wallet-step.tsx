"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { WalletIcon, AlertCircleIcon, CheckCircle2Icon, InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useVeridaClient } from "@/app/lib/clientside-verida"
import { HeartLoader } from "@/components/ui/heart-loader"

interface ConnectWalletStepProps {
  onWalletConnected: (address: string) => void
}

export default function ConnectWalletStep({ onWalletConnected }: ConnectWalletStepProps) {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const { client, isLoading, error: clientError } = useVeridaClient();

  useEffect(() => {
    if (clientError) {
      setError("Failed to initialize Verida client. Please try again.");
    }
  }, [clientError]);

  useEffect(() => {
    // Check if already connected
    if (client && client.isConnected()) {
      const did = client.getDid();
      if (did) {
        setWalletAddress(did);
      }
    }
  }, [client]);

  const connectVeridaWallet = async () => {
    if (!client) {
      setError("Verida client not available. Please reload the page.");
      return;
    }

    setIsConnecting(true)
    setError(null)

    try {
      // Connect to Verida network
      const success = await client.connect();
      
      if (success) {
        const did = client.getDid();
        if (did) {
          setWalletAddress(did);
          
          // Wait a moment before proceeding to next step
          setTimeout(() => {
            onWalletConnected(did);
          }, 1000);
        } else {
          setError("Connected to Verida but couldn't retrieve DID");
        }
      } else {
        setError("Failed to connect to Verida network");
      }
    } catch (err) {
      console.error("Verida connection error:", err);
      setError("Failed to connect wallet. Please try again.");
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    if (client) {
      client.disconnect();
      setWalletAddress(null);
    }
  }

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Connect Your Wallet</CardTitle>
        <CardDescription>Connect your Verida wallet to create your decentralized profile</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-purple-50 p-6 rounded-lg flex items-start space-x-3">
          <InfoIcon className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">
              Your Verida wallet allows you to securely store your profile data in an encrypted, decentralized database 
              that only you control. You'll be asked to scan a QR code with the Verida mobile app.
            </p>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isLoading && (
          <div className="flex flex-col items-center space-y-4">
            <HeartLoader size="lg" showText text="Loading Verida client..." />
          </div>
        )}

        {!isLoading && walletAddress ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2 bg-green-50 p-4 rounded-lg w-full">
              <CheckCircle2Icon className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium">Verida Wallet Connected</p>
                <p className="text-sm text-muted-foreground">
                  {walletAddress.substring(0, 12)}...{walletAddress.substring(walletAddress.length - 8)}
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={disconnectWallet}>
              Disconnect Wallet
            </Button>
          </div>
        ) : !isLoading && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-20 w-20 rounded-full bg-purple-100 flex items-center justify-center">
              <WalletIcon className="h-10 w-10 text-purple-600" />
            </div>
            <p className="text-center text-muted-foreground">Connect your Verida wallet to securely manage your data</p>
          </div>
        )}

        {!isLoading && !walletAddress && (
          <div className="grid grid-cols-1 gap-4">
            <Button
              variant="outline"
              className="flex items-center justify-center space-x-2 h-16"
              onClick={connectVeridaWallet}
              disabled={isConnecting || !client}
            >
              <img src="/placeholder.svg?height=24&width=24" alt="Verida" className="h-6 w-6" />
              <span>Verida Wallet</span>
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isLoading && !walletAddress && (
          <Button
            onClick={connectVeridaWallet}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            disabled={isConnecting || !client}
          >
            {isConnecting ? (
              <div className="flex items-center justify-center">
                <HeartLoader size="sm" />
                <span className="ml-2">Connecting...</span>
              </div>
            ) : (
              "Connect Verida Wallet"
            )}
          </Button>
        )}

        {!isLoading && walletAddress && (
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

