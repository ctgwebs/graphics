import Link from "next/link"
import Image from "next/image"
import { Download, Eye, Heart } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// This would normally come from a database
const getTemplates = async (type: string, limit: number) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  const allTemplates = [
    {
      id: "1",
      title: "Business Conference Flyer",
      slug: "business-conference-flyer",
      category: "Flyer",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 980,
      viewCount: 3200,
      likeCount: 450,
      isPremium: true,
    },
    {
      id: "2",
      title: "Summer Sale Banner",
      slug: "summer-sale-banner",
      category: "Banner",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 1250,
      viewCount: 4500,
      likeCount: 620,
      isPremium: false,
    },
    {
      id: "3",
      title: "Wedding Invitation",
      slug: "wedding-invitation",
      category: "Invitation",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 1540,
      viewCount: 5100,
      likeCount: 780,
      isPremium: false,
    },
    {
      id: "4",
      title: "Corporate Business Card",
      slug: "corporate-business-card",
      category: "Business Card",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 890,
      viewCount: 2800,
      likeCount: 320,
      isPremium: true,
    },
    {
      id: "5",
      title: "Christmas Party Poster",
      slug: "christmas-party-poster",
      category: "Poster",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 750,
      viewCount: 2100,
      likeCount: 280,
      isPremium: false,
    },
    {
      id: "6",
      title: "Restaurant Menu Template",
      slug: "restaurant-menu-template",
      category: "Menu",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 680,
      viewCount: 1900,
      likeCount: 210,
      isPremium: true,
    },
    {
      id: "7",
      title: "Social Media Post Bundle",
      slug: "social-media-post-bundle",
      category: "Social Media",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 1120,
      viewCount: 3600,
      likeCount: 540,
      isPremium: true,
    },
    {
      id: "8",
      title: "Resume Template",
      slug: "resume-template",
      category: "Resume",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 2100,
      viewCount: 6200,
      likeCount: 950,
      isPremium: false,
    },
    {
      id: "9",
      title: "Birthday Invitation",
      slug: "birthday-invitation",
      category: "Invitation",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 870,
      viewCount: 2400,
      likeCount: 310,
      isPremium: false,
    },
    {
      id: "10",
      title: "Product Catalog",
      slug: "product-catalog",
      category: "Catalog",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 560,
      viewCount: 1800,
      likeCount: 190,
      isPremium: true,
    },
    {
      id: "11",
      title: "Real Estate Flyer",
      slug: "real-estate-flyer",
      category: "Flyer",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 920,
      viewCount: 3100,
      likeCount: 420,
      isPremium: false,
    },
    {
      id: "12",
      title: "Photography Portfolio",
      slug: "photography-portfolio",
      category: "Portfolio",
      imageUrl: "/placeholder.svg?height=600&width=400",
      downloadCount: 780,
      viewCount: 2500,
      likeCount: 360,
      isPremium: true,
    },
  ]

  let filteredTemplates = allTemplates

  if (type === "free") {
    filteredTemplates = allTemplates.filter((template) => !template.isPremium)
  } else if (type === "premium") {
    filteredTemplates = allTemplates.filter((template) => template.isPremium)
  } else if (type === "related") {
    // For related templates, we'd normally use some algorithm
    // Here we'll just return a random subset
    filteredTemplates = [...allTemplates].sort(() => 0.5 - Math.random())
  }

  return filteredTemplates.slice(0, limit)
}

export async function TemplateGrid({ type = "all", limit = 12 }: { type: string; limit: number }) {
  const templates = await getTemplates(type, limit)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {templates.map((template) => (
        <Link key={template.id} href={`/templates/${template.slug}`} className="group">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardContent className="p-0">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={template.imageUrl || "/placeholder.svg"}
                  alt={template.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                {template.isPremium && (
                  <Badge className="absolute top-2 right-2" variant="secondary">
                    Premium
                  </Badge>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium truncate group-hover:text-primary transition-colors">{template.title}</h3>
                <p className="text-sm text-muted-foreground">{template.category}</p>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Download className="mr-1 h-3 w-3" />
                      <span>{template.downloadCount}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="mr-1 h-3 w-3" />
                      <span>{template.viewCount}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Heart className="mr-1 h-3 w-3" />
                    <span>{template.likeCount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
