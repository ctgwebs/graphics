import Link from "next/link"
import {
  FileImage,
  FileText,
  ImageIcon,
  Layout,
  Mail,
  CreditCard,
  FileType,
  Layers,
  Palette,
  Award,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  title: string
  count: number
  icon: string
  slug: string
}

export function CategoryCard({ title, count, icon, slug }: CategoryCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "Banner":
        return <Layout className="h-8 w-8" />
      case "Flyer":
        return <FileText className="h-8 w-8" />
      case "Poster":
        return <FileImage className="h-8 w-8" />
      case "Social":
        return <Layers className="h-8 w-8" />
      case "Card":
        return <CreditCard className="h-8 w-8" />
      case "Invitation":
        return <Mail className="h-8 w-8" />
      case "Brochure":
        return <FileType className="h-8 w-8" />
      case "Logo":
        return <Award className="h-8 w-8" />
      case "Mockup":
        return <Layers className="h-8 w-8" />
      case "Illustration":
        return <Palette className="h-8 w-8" />
      case "Background":
        return <ImageIcon className="h-8 w-8" />
      case "Certificate":
        return <Award className="h-8 w-8" />
      default:
        return <FileImage className="h-8 w-8" />
    }
  }

  return (
    <Link href={`/templates?category=${slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md hover:border-primary/50">
        <CardContent className="p-6 flex flex-col items-center text-center">
          <div className="mb-3 text-primary">{getIcon()}</div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{count} templates</p>
        </CardContent>
      </Card>
    </Link>
  )
}
