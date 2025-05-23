import Link from "next/link"
import Image from "next/image"
import { Download, Eye } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface FeaturedTemplateProps {
  title: string
  category: string
  imageUrl: string
  downloadCount: number
  viewCount: number
  isPremium: boolean
  slug: string
}

export function FeaturedTemplate({
  title,
  category,
  imageUrl,
  downloadCount,
  viewCount,
  isPremium,
  slug,
}: FeaturedTemplateProps) {
  return (
    <Link href={`/templates/${slug}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardContent className="p-0">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            {isPremium && (
              <Badge className="absolute top-2 right-2" variant="secondary">
                Premium
              </Badge>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-medium truncate group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground">{category}</p>
            <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Download className="mr-1 h-3 w-3" />
                <span>{downloadCount.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <Eye className="mr-1 h-3 w-3" />
                <span>{viewCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
