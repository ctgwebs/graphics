import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react"

import { Button } from "@/components/ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-muted">
      <div className="container px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="space-y-4 md:col-span-2">
            <Link href="/" className="inline-block">
              <span className="font-bold text-xl">DesignTemplates</span>
            </Link>
            <p className="text-muted-foreground max-w-xs">
              Download free and premium editable vector design templates for your next project. Banners, flyers,
              posters, and more.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Templates</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/templates?category=banners"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Banners
                </Link>
              </li>
              <li>
                <Link
                  href="/templates?category=flyers"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Flyers
                </Link>
              </li>
              <li>
                <Link
                  href="/templates?category=posters"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Posters
                </Link>
              </li>
              <li>
                <Link
                  href="/templates?category=social-media"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Social Media
                </Link>
              </li>
              <li>
                <Link
                  href="/templates?category=business-cards"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Business Cards
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
                  View All
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium text-lg">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/license" className="text-muted-foreground hover:text-foreground transition-colors">
                  License
                </Link>
              </li>
              <li>
                <Link href="/copyright" className="text-muted-foreground hover:text-foreground transition-colors">
                  Copyright
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} DesignTemplates. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
