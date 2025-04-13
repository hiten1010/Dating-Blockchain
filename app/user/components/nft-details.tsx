"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon, RefreshCwIcon, Hexagon, Copy, CheckCircle2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data - would be fetched from your API
const nftData = {
  tokenId: "1234567",
  contractAddress: "0x1234...5678",
  mintDate: "2023-05-15T14:30:00Z",
  lastUpdated: "2023-08-22T09:15:00Z",
  explorerUrl: "https://explorer.cheqd.io/tx/1234567890",
}

export default function NftDetails() {
  const [copied, setCopied] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopied(field)
    setTimeout(() => setCopied(null), 2000)
  }

  const MotionHexagon = motion(Hexagon)

  return (
    <div className="backdrop-blur-sm bg-white/80 rounded-2xl border border-indigo-100 p-6 relative overflow-hidden shadow-md">
      <div className="absolute -top-20 -right-20 opacity-10 pointer-events-none">
        <MotionHexagon
          className="h-64 w-64 text-indigo-500"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <Hexagon className="h-6 w-6 text-indigo-600 fill-indigo-100" />
          <h2 className="text-xl font-semibold text-slate-800">Your NFT Profile Details</h2>
        </div>

        <p className="text-slate-600 mb-6">Information about your on-chain profile NFT</p>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-200 mb-8">
                <p className="text-sm text-slate-700">
                  This NFT is proof of ownership over your dating profile. Updates to your on-chain data require a
                  blockchain transaction.
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-white border border-indigo-200 text-slate-700">
              <p className="max-w-xs">
                Your profile NFT contains cryptographic proof of your identity and profile ownership.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            className="backdrop-blur-sm bg-white/90 rounded-xl border border-indigo-100 p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-medium text-indigo-700 mb-3">NFT Token ID</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/50 to-blue-200/50 rounded-md blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <code className="relative block w-full rounded-md bg-white px-3 py-2 font-mono text-sm text-slate-700 overflow-hidden text-ellipsis">
                  {nftData.tokenId}
                </code>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600"
                onClick={() => copyToClipboard(nftData.tokenId, "tokenId")}
              >
                {copied === "tokenId" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Badge className="bg-gradient-to-r from-green-400 to-emerald-400 text-white border-0">Active</Badge>
            </div>
          </motion.div>

          <motion.div
            className="backdrop-blur-sm bg-white/90 rounded-xl border border-indigo-100 p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-medium text-indigo-700 mb-3">Contract Address</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/50 to-blue-200/50 rounded-md blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <code className="relative block w-full rounded-md bg-white px-3 py-2 font-mono text-sm text-slate-700 overflow-hidden text-ellipsis">
                  {nftData.contractAddress}
                </code>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-indigo-50 hover:bg-indigo-100 text-indigo-600"
                onClick={() => copyToClipboard(nftData.contractAddress, "contractAddress")}
              >
                {copied === "contractAddress" ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="backdrop-blur-sm bg-white/90 rounded-xl border border-indigo-100 p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-medium text-indigo-700 mb-2">Mint Date</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <p className="text-slate-700">{formatDate(nftData.mintDate)}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="backdrop-blur-sm bg-white/90 rounded-xl border border-indigo-100 p-4 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-sm font-medium text-indigo-700 mb-2">Last Updated</h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <p className="text-slate-700">{formatDate(nftData.lastUpdated)}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white border-indigo-200 hover:bg-indigo-50 text-indigo-700"
          >
            <ExternalLinkIcon className="h-4 w-4" />
            View on Explorer
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white border-indigo-200 hover:bg-indigo-50 text-indigo-700"
          >
            <RefreshCwIcon className="h-4 w-4" />
            Refresh Metadata
          </Button>
        </div>
      </div>
    </div>
  )
}

