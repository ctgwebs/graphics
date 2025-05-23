import type { MetadataRoute } from "next"
import clientPromise from "@/lib/db"
import type { Template, Category } from "@/lib/models"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://designtemplates.com"

  try {
    const client = await clientPromise
    const db = client.db()

    // Get all published templates
    const templates = await db
      .collection<Template>("templates")
      .find({ status: "published" })
      .project({ slug: 1, updatedAt: 1 })
      .toArray()

    // Get all categories
    const categories = await db.collection<Category>("categories").find({}).project({ slug: 1, updatedAt: 1 }).toArray()

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
      },
      {
        url: `${baseUrl}/templates`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.5,
      },
      {
        url: `${baseUrl}/pricing`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      },
    ]

    // Template pages
    const templatePages = templates.map((template) => ({
      url: `${baseUrl}/templates/${template.slug}`,
      lastModified: template.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

    // Category pages
    const categoryPages = categories.map((category) => ({
      url: `${baseUrl}/templates?category=${category.slug}`,
      lastModified: category.updatedAt || new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    return [...staticPages, ...templatePages, ...categoryPages]
  } catch (error) {
    console.error("Error generating sitemap:", error)

    // Return basic sitemap if database is unavailable
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}/templates`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ]
  }
}
