"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

const categories = [
  { id: "all", name: "All Categories" },
  { id: "banners", name: "Banners" },
  { id: "flyers", name: "Flyers" },
  { id: "posters", name: "Posters" },
  { id: "social-media", name: "Social Media" },
  { id: "business-cards", name: "Business Cards" },
  { id: "invitations", name: "Invitations" },
  { id: "brochures", name: "Brochures" },
  { id: "logos", name: "Logos" },
  { id: "mockups", name: "Mockups" },
  { id: "illustrations", name: "Illustrations" },
  { id: "backgrounds", name: "Backgrounds" },
  { id: "certificates", name: "Certificates" },
]

export function CategoryFilter() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-2 p-1">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-1"
          >
            {selectedCategory === category.id && <Check className="h-3.5 w-3.5" />}
            {category.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
