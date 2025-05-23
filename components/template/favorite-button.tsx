"use client"

import { useState, useEffect } from "react"
import { Heart } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface FavoriteButtonProps {
  templateSlug: string
  className?: string
}

export function FavoriteButton({ templateSlug, className }: FavoriteButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [isFavorited, setIsFavorited] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session) {
      checkFavoriteStatus()
    }
  }, [session, templateSlug])

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`/api/templates/${templateSlug}/favorite`)
      const data = await response.json()
      setIsFavorited(data.favorited)
    } catch (error) {
      console.error("Error checking favorite status:", error)
    }
  }

  const toggleFavorite = async () => {
    if (!session) {
      router.push(`/login?redirect=/templates/${templateSlug}`)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`/api/templates/${templateSlug}/favorite`, {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to toggle favorite")
      }

      setIsFavorited(data.favorited)

      toast({
        title: data.favorited ? "Added to favorites" : "Removed from favorites",
        description: data.favorited ? "Template saved to your favorites" : "Template removed from your favorites",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update favorite",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleFavorite}
      disabled={isLoading}
      className={className}
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`h-4 w-4 ${isFavorited ? "fill-current text-red-500" : ""}`} />
    </Button>
  )
}
