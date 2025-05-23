import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { NextAuthSessionProvider } from "@/components/providers/session-provider"
import { GoogleAnalytics } from "@/components/analytics/google-analytics"
import { FacebookPixel } from "@/components/analytics/facebook-pixel"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Design Templates - Free & Premium Design Resources",
    template: "%s | Design Templates",
  },
  description:
    "Download free and premium editable vector design templates for your next project. Banners, flyers, posters, and more.",
  keywords: ["design templates", "free templates", "vector graphics", "banners", "flyers", "posters", "graphic design"],
  authors: [{ name: "Design Templates" }],
  creator: "Design Templates",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://designtemplates.com",
    title: "Design Templates - Free & Premium Design Resources",
    description:
      "Download free and premium editable vector design templates for your next project. Banners, flyers, posters, and more.",
    siteName: "Design Templates",
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Templates - Free & Premium Design Resources",
    description:
      "Download free and premium editable vector design templates for your next project. Banners, flyers, posters, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextAuthSessionProvider>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
              <Suspense>
                <main className="flex-1">{children}</main>
              </Suspense>
              <SiteFooter />
            </div>
            <Toaster />
          </NextAuthSessionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <GoogleAnalytics />
        <FacebookPixel />
      </body>
    </html>
  )
}
