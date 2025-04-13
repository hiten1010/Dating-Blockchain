import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2Icon, ArrowRightIcon, InfoIcon } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface SuccessStepProps {
  walletAddress: string
}

export default function SuccessStep({ walletAddress }: SuccessStepProps) {
  return (
    <>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2Icon className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <CardTitle className="text-2xl">Wallet Connected — Let's Set Up Your Profile Next</CardTitle>
        <CardDescription>
          Your wallet is now linked. In the Profile Creation step, you'll create a Decentralized Identity (DID) and mint
          your NFT-based profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-purple-50 p-6 rounded-lg flex items-start space-x-3">
          <InfoIcon className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">
              Creating your DID happens in the next step. You'll learn how your data remains secure and private with
              Verida, and how your NFT profile is minted on Cheqd.
            </p>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="font-medium mb-3">Your Onboarding Summary</h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="text-muted-foreground">Wallet:</span>
              </div>
              <div className="font-mono text-sm">
                {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="text-muted-foreground">DID Status:</span>
              </div>
              <div className="text-sm">
                <span className="text-amber-600">Pending Creation</span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="text-muted-foreground">Next Step:</span>
              </div>
              <div className="text-sm font-medium">Profile Creation</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-medium mb-2">What's Next?</h3>
          <p className="text-sm text-muted-foreground">You'll now proceed to create your profile, where you'll:</p>
          <ul className="text-sm text-muted-foreground list-disc list-inside text-left mt-2 space-y-1">
            <li>Set up your Decentralized Identity (DID)</li>
            <li>Create your dating profile</li>
            <li>Mint your profile as an NFT</li>
            <li>Control what data you share and with whom</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
          <span className="mr-2">Go to Profile Creation</span>
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </>
  )
}

