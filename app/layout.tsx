import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import DatingNavbar from "./components/dating-navbar"
import MainWrapper from "./components/main-wrapper"

export const metadata = {
  title: "DecentralMatch - Discover Love on the Decentralized Frontier",
  description:
    "A revolutionary dating platform powered by blockchain technology, decentralized identities, and AI-powered matchmaking.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="min-h-screen">
            <DatingNavbar />
            <MainWrapper>{children}</MainWrapper>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}