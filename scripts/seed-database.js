import { MongoClient } from "mongodb"
import { hash } from "bcrypt"

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/design-templates"

async function seedDatabase() {
  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Clear existing data
    await db.collection("templates").deleteMany({})
    await db.collection("users").deleteMany({})
    await db.collection("categories").deleteMany({})
    console.log("Cleared existing data")

    // Create admin user
    const hashedPassword = await hash("admin123", 12)
    const adminUser = {
      name: "Admin User",
      email: "admin@designtemplates.com",
      password: hashedPassword,
      role: "admin",
      downloads: [],
      favorites: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const userResult = await db.collection("users").insertOne(adminUser)
    console.log("Created admin user:", userResult.insertedId)

    // Create categories
    const categories = [
      { name: "Banners", slug: "banners", count: 0, order: 1 },
      { name: "Flyers", slug: "flyers", count: 0, order: 2 },
      { name: "Posters", slug: "posters", count: 0, order: 3 },
      { name: "Social Media", slug: "social-media", count: 0, order: 4 },
      { name: "Business Cards", slug: "business-cards", count: 0, order: 5 },
      { name: "Invitations", slug: "invitations", count: 0, order: 6 },
      { name: "Brochures", slug: "brochures", count: 0, order: 7 },
      { name: "Logos", slug: "logos", count: 0, order: 8 },
      { name: "Mockups", slug: "mockups", count: 0, order: 9 },
      { name: "Illustrations", slug: "illustrations", count: 0, order: 10 },
      { name: "Backgrounds", slug: "backgrounds", count: 0, order: 11 },
      { name: "Certificates", slug: "certificates", count: 0, order: 12 },
    ].map((cat) => ({
      ...cat,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    await db.collection("categories").insertMany(categories)
    console.log("Created categories")

    // Create sample templates
    const templates = [
      {
        title: "Business Conference Flyer",
        slug: "business-conference-flyer",
        description:
          "A professional flyer template perfect for business conferences, seminars, and corporate events. Fully editable with Adobe Illustrator and Photoshop.",
        category: "Flyer",
        tags: ["business", "conference", "corporate", "event", "professional"],
        imageUrl: "/placeholder.svg?height=800&width=600",
        fileUrl: "/files/business-conference-flyer.zip",
        fileFormats: ["AI", "PSD", "PDF"],
        dimensions: "8.5 x 11 inches",
        dpi: 300,
        isPremium: true,
        price: 12.99,
        downloadCount: 980,
        viewCount: 3200,
        likeCount: 450,
        status: "published",
        author: "DesignStudio",
      },
      {
        title: "Summer Sale Banner",
        slug: "summer-sale-banner",
        description:
          "Eye-catching summer sale banner template perfect for retail stores, online shops, and promotional campaigns.",
        category: "Banner",
        tags: ["summer", "sale", "retail", "promotion", "colorful"],
        imageUrl: "/placeholder.svg?height=800&width=600",
        fileUrl: "/files/summer-sale-banner.zip",
        fileFormats: ["AI", "PSD", "JPG"],
        dimensions: "1920 x 1080 pixels",
        dpi: 300,
        isPremium: false,
        downloadCount: 1250,
        viewCount: 4500,
        likeCount: 620,
        status: "published",
        author: "CreativeTeam",
      },
      {
        title: "Wedding Invitation",
        slug: "wedding-invitation",
        description:
          "Elegant wedding invitation template with beautiful typography and floral elements. Perfect for romantic weddings.",
        category: "Invitation",
        tags: ["wedding", "invitation", "elegant", "floral", "romantic"],
        imageUrl: "/placeholder.svg?height=800&width=600",
        fileUrl: "/files/wedding-invitation.zip",
        fileFormats: ["AI", "PSD", "PDF"],
        dimensions: "5 x 7 inches",
        dpi: 300,
        isPremium: false,
        downloadCount: 1540,
        viewCount: 5100,
        likeCount: 780,
        status: "published",
        author: "WeddingDesigns",
      },
      {
        title: "Corporate Business Card",
        slug: "corporate-business-card",
        description:
          "Clean and professional business card template suitable for any corporate environment. Includes front and back designs.",
        category: "Business Card",
        tags: ["business card", "corporate", "professional", "clean", "minimal"],
        imageUrl: "/placeholder.svg?height=800&width=600",
        fileUrl: "/files/corporate-business-card.zip",
        fileFormats: ["AI", "PSD", "PDF"],
        dimensions: "3.5 x 2 inches",
        dpi: 300,
        isPremium: true,
        price: 8.99,
        downloadCount: 890,
        viewCount: 2800,
        likeCount: 320,
        status: "published",
        author: "CorpDesigns",
      },
      {
        title: "Christmas Party Poster",
        slug: "christmas-party-poster",
        description:
          "Festive Christmas party poster template with holiday elements and cheerful colors. Perfect for holiday events.",
        category: "Poster",
        tags: ["christmas", "party", "holiday", "festive", "celebration"],
        imageUrl: "/placeholder.svg?height=800&width=600",
        fileUrl: "/files/christmas-party-poster.zip",
        fileFormats: ["AI", "PSD", "JPG"],
        dimensions: "18 x 24 inches",
        dpi: 300,
        isPremium: false,
        downloadCount: 750,
        viewCount: 2100,
        likeCount: 280,
        status: "published",
        author: "HolidayDesigns",
      },
    ].map((template) => ({
      ...template,
      createdAt: new Date(),
      updatedAt: new Date(),
    }))

    await db.collection("templates").insertMany(templates)
    console.log("Created sample templates")

    // Update category counts
    for (const category of categories) {
      const count = await db.collection("templates").countDocuments({ category: category.name })
      await db.collection("categories").updateOne({ slug: category.slug }, { $set: { count } })
    }
    console.log("Updated category counts")

    console.log("Database seeded successfully!")
    console.log("Admin login: admin@designtemplates.com / admin123")
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
