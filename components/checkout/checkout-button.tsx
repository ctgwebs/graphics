"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Download, Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface CheckoutButtonProps {
  templateId: string
  templateSlug: string
  isPremium: boolean
  price?: number
}

export function CheckoutButton({ templateId, templateSlug, isPremium, price }: CheckoutButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)

    try {
      if (isPremium) {
        if (!session) {
          // Redirect to login if not authenticated
          router.push(`/login?redirect=/templates/${templateSlug}`)
          return
        }

        // Create checkout session
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            templateSlug,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to create checkout session")
        }

        // Redirect to Stripe checkout
        window.location.href = data.checkoutUrl
      } else {
        // For free templates, download directly
        const response = await fetch(`/api/templates/${templateSlug}/download`)
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || "Failed to download template")
        }

        // Trigger download
        window.location.href = data.downloadUrl
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process request",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button className="w-full" size="lg" onClick={handleDownload} disabled={isLoading}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <Download className={`${isLoading ? "hidden" : "mr-2"} h-4 w-4`} />
      {isPremium
        ? isLoading
          ? "Processing..."
          : `Purchase & Download ${price ? `($${price})` : ""}`
        : isLoading
          ? "Downloading..."
          : "Download Now"}
    </Button>
  )
}
