"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { SearchBar } from "@/components/search-bar"
import { UserAccountNav } from "@/components/auth/user-account-nav"

export function SiteHeader() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Check if current path is admin
  const isAdminPage = pathname?.startsWith("/admin")

  if (isAdminPage) return null

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"
      }`}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
                  Home
                </Link>
                <Link href="/templates" className="text-lg font-medium transition-colors hover:text-primary">
                  Templates
                </Link>
                <Link href="/categories" className="text-lg font-medium transition-colors hover:text-primary">
                  Categories
                </Link>
                <Link href="/pricing" className="text-lg font-medium transition-colors hover:text-primary">
                  Pricing
                </Link>
                <Link href="/contact" className="text-lg font-medium transition-colors hover:text-primary">
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">DesignTemplates</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className={`font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-foreground/60"
              }`}
            >
              Home
            </Link>
            <Link
              href="/templates"
              className={`font-medium transition-colors hover:text-primary ${
                pathname?.startsWith("/templates") ? "text-primary" : "text-foreground/60"
              }`}
            >
              Templates
            </Link>
            <Link
              href="/categories"
              className={`font-medium transition-colors hover:text-primary ${
                pathname?.startsWith("/categories") ? "text-primary" : "text-foreground/60"
              }`}
            >
              Categories
            </Link>
            <Link
              href="/pricing"
              className={`font-medium transition-colors hover:text-primary ${
                pathname?.startsWith("/pricing") ? "text-primary" : "text-foreground/60"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-colors hover:text-primary ${
                pathname?.startsWith("/contact") ? "text-primary" : "text-foreground/60"
              }`}
            >
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isSearchOpen ? (
            <div className="relative w-full max-w-[300px]">
              <SearchBar onClose={() => setIsSearchOpen(false)} />
            </div>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}

          <ThemeToggle />

          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Button>

          <UserAccountNav />

          <Button className="hidden md:flex" asChild>
            <Link href="/register">Sign Up</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
