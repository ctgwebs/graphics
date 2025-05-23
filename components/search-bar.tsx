"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchBarProps {
  onClose?: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Mock suggestions - in a real app, this would come from an API
  useEffect(() => {
    if (query.length > 1) {
      // Simulate API call for suggestions
      const mockSuggestions = [
        "Business flyer",
        "Wedding invitation",
        "Social media post",
        "Resume template",
        "Business card",
        "Banner design",
        "Poster template",
      ].filter((item) => item.toLowerCase().includes(query.toLowerCase()))

      setSuggestions(mockSuggestions.slice(0, 5))
    } else {
      setSuggestions([])
    }
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/templates?search=${encodeURIComponent(query.trim())}`)
      if (onClose) onClose()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    router.push(`/templates?search=${encodeURIComponent(suggestion)}`)
    if (onClose) onClose()
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search templates..."
          className="pl-8 pr-10"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-9 w-9"
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </form>

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-10 mt-1 overflow-hidden rounded-md border bg-background shadow-md">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <button
                  className="flex w-full items-center px-4 py-2 text-left text-sm hover:bg-muted"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search className="mr-2 h-4 w-4 text-muted-foreground" />
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
