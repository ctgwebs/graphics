import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Download, Eye, Heart, Share2, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { TemplateGrid } from "@/components/template-grid"
import { LoadingTemplates } from "@/components/loading-templates"
import { FavoriteButton } from "@/components/template/favorite-button"
import { CheckoutButton } from "@/components/checkout/checkout-button"

// This would normally come from a database
const getTemplateData = async (slug: string) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return {
    id: "1",
    title: "Business Conference Flyer",
    slug: "business-conference-flyer",
    description:
      "A professional flyer template perfect for business conferences, seminars, and corporate events. Fully editable with Adobe Illustrator and Photoshop.",
    imageUrl: "/placeholder.svg?height=800&width=600",
    category: "Flyer",
    tags: ["business", "conference", "corporate", "event", "professional"],
    downloadCount: 980,
    viewCount: 3200,
    likeCount: 450,
    isPremium: true,
    price: 12.99,
    fileFormat: ["AI", "PSD", "PDF"],
    dimensions: "8.5 x 11 inches",
    dpi: 300,
    createdAt: "2023-10-15",
    updatedAt: "2023-11-02",
    author: "DesignStudio",
    relatedTemplates: ["summer-sale-banner", "corporate-business-card", "annual-report-template"],
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const template = await getTemplateData(params.slug)

  return {
    title: `${template.title} - Download Template`,
    description: template.description,
    openGraph: {
      title: `${template.title} - Download Template`,
      description: template.description,
      images: [{ url: template.imageUrl }],
    },
  }
}

export default async function TemplatePage({ params }: { params: { slug: string } }) {
  const template = await getTemplateData(params.slug)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="mb-6">
        <Link href="/templates" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Template Preview */}
        <div className="flex flex-col space-y-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border">
            <Image
              src={template.imageUrl || "/placeholder.svg"}
              alt={template.title}
              fill
              className="object-cover"
              priority
            />
            {template.isPremium && (
              <Badge className="absolute top-4 right-4" variant="secondary">
                Premium
              </Badge>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-muted-foreground">
                <Eye className="mr-1 h-4 w-4" />
                <span>{template.viewCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Download className="mr-1 h-4 w-4" />
                <span>{template.downloadCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Heart className="mr-1 h-4 w-4" />
                <span>{template.likeCount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FavoriteButton templateSlug={template.slug} />
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Template Details */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{template.title}</h1>
            <p className="mt-2 text-muted-foreground">
              By{" "}
              <Link href="#" className="text-primary hover:underline">
                {template.author}
              </Link>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium">Description</h3>
            <p className="mt-2 text-muted-foreground">{template.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium">Category</h3>
              <p className="mt-1 text-muted-foreground">{template.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">File Format</h3>
              <p className="mt-1 text-muted-foreground">{template.fileFormat.join(", ")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Dimensions</h3>
              <p className="mt-1 text-muted-foreground">{template.dimensions}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Resolution</h3>
              <p className="mt-1 text-muted-foreground">{template.dpi} DPI</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium">Tags</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <CheckoutButton
            templateId={template.id}
            templateSlug={template.slug}
            isPremium={template.isPremium}
            price={template.price}
          />
        </div>
      </div>

      {/* Related Templates */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Templates</h2>
        <Suspense fallback={<LoadingTemplates />}>
          <TemplateGrid type="related" limit={4} />
        </Suspense>
      </div>
    </div>
  )
}
