import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemplateGrid } from "@/components/template-grid"
import { CategoryCard } from "@/components/category-card"
import { SearchBar } from "@/components/search-bar"
import { FeaturedTemplate } from "@/components/featured-template"
import { LoadingTemplates } from "@/components/loading-templates"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <Badge variant="outline" className="mb-2">
                  Over 10,000+ Templates
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Download Free & Premium Design Templates
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Access thousands of high-quality editable vector designs for your next project. Banners, flyers,
                  posters, and more.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <SearchBar />
                <Button asChild>
                  <Link href="/templates">
                    Browse All <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 md:gap-8">
                <div className="grid gap-4 md:gap-8">
                  <Image
                    alt="Template Preview 1"
                    className="aspect-[3/4] overflow-hidden rounded-xl object-cover"
                    height="400"
                    src="/placeholder.svg?height=400&width=300"
                    width="300"
                  />
                  <Image
                    alt="Template Preview 2"
                    className="aspect-[3/4] overflow-hidden rounded-xl object-cover"
                    height="400"
                    src="/placeholder.svg?height=400&width=300"
                    width="300"
                  />
                </div>
                <div className="grid gap-4 md:gap-8">
                  <Image
                    alt="Template Preview 3"
                    className="aspect-[3/4] overflow-hidden rounded-xl object-cover"
                    height="400"
                    src="/placeholder.svg?height=400&width=300"
                    width="300"
                  />
                  <Image
                    alt="Template Preview 4"
                    className="aspect-[3/4] overflow-hidden rounded-xl object-cover"
                    height="400"
                    src="/placeholder.svg?height=400&width=300"
                    width="300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Templates</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Discover our most popular and trending design templates
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeaturedTemplate
              title="Summer Sale Banner"
              category="Banner"
              imageUrl="/placeholder.svg?height=600&width=400"
              downloadCount={1250}
              viewCount={4500}
              isPremium={false}
              slug="summer-sale-banner"
            />
            <FeaturedTemplate
              title="Business Conference Flyer"
              category="Flyer"
              imageUrl="/placeholder.svg?height=600&width=400"
              downloadCount={980}
              viewCount={3200}
              isPremium={true}
              slug="business-conference-flyer"
            />
            <FeaturedTemplate
              title="Wedding Invitation"
              category="Invitation"
              imageUrl="/placeholder.svg?height=600&width=400"
              downloadCount={1540}
              viewCount={5100}
              isPremium={false}
              slug="wedding-invitation"
            />
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/templates">
                View All Templates <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Browse by Category</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">
                Find the perfect template for your specific needs
              </p>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <CategoryCard title="Banners" count={245} icon="Banner" slug="banners" />
            <CategoryCard title="Flyers" count={189} icon="Flyer" slug="flyers" />
            <CategoryCard title="Posters" count={167} icon="Poster" slug="posters" />
            <CategoryCard title="Social Media" count={312} icon="Social" slug="social-media" />
            <CategoryCard title="Business Cards" count={98} icon="Card" slug="business-cards" />
            <CategoryCard title="Invitations" count={124} icon="Invitation" slug="invitations" />
            <CategoryCard title="Brochures" count={87} icon="Brochure" slug="brochures" />
            <CategoryCard title="Logos" count={156} icon="Logo" slug="logos" />
            <CategoryCard title="Mockups" count={203} icon="Mockup" slug="mockups" />
            <CategoryCard title="Illustrations" count={178} icon="Illustration" slug="illustrations" />
            <CategoryCard title="Backgrounds" count={221} icon="Background" slug="backgrounds" />
            <CategoryCard title="Certificates" count={64} icon="Certificate" slug="certificates" />
          </div>
        </div>
      </section>

      {/* Recent Uploads */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Recently Added</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">Check out our latest design templates</p>
            </div>
          </div>
          <Tabs defaultValue="all" className="mt-8">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="free">Free</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="mt-6">
              <Suspense fallback={<LoadingTemplates />}>
                <TemplateGrid type="all" limit={12} />
              </Suspense>
            </TabsContent>
            <TabsContent value="free" className="mt-6">
              <Suspense fallback={<LoadingTemplates />}>
                <TemplateGrid type="free" limit={12} />
              </Suspense>
            </TabsContent>
            <TabsContent value="premium" className="mt-6">
              <Suspense fallback={<LoadingTemplates />}>
                <TemplateGrid type="premium" limit={12} />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-12 md:py-24 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Stay Updated</h2>
                <p className="max-w-[600px] md:text-xl">
                  Subscribe to our newsletter to get notified about new templates and exclusive offers.
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-4">
              <form className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-primary-foreground text-primary"
                  required
                />
                <Button type="submit" variant="secondary">
                  Subscribe
                </Button>
              </form>
              <p className="text-sm text-primary-foreground/80">We respect your privacy. Unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
