import { NextResponse } from "next/server"
import clientPromise from "@/lib/db"
import type { Template } from "@/lib/models"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const type = searchParams.get("type") // free, premium, all
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const skip = (page - 1) * limit

    const client = await clientPromise
    const db = client.db()

    // Build query
    const query: any = { status: "published" }

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    if (type === "free") {
      query.isPremium = false
    } else if (type === "premium") {
      query.isPremium = true
    }

    // Get templates
    const templates = await db
      .collection<Template>("templates")
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()

    // Get total count for pagination
    const total = await db.collection<Template>("templates").countDocuments(query)

    return NextResponse.json({
      templates: templates.map((template) => ({
        ...template,
        _id: template._id?.toString(),
      })),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching templates:", error)
    return NextResponse.json({ error: "Failed to fetch templates" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate request
    if (!data.title || !data.category) {
      return NextResponse.json({ error: "Title and category are required" }, { status: 400 })
    }

    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-")

    const client = await clientPromise
    const db = client.db()

    // Check if slug already exists
    const existingTemplate = await db.collection<Template>("templates").findOne({ slug })

    if (existingTemplate) {
      return NextResponse.json({ error: "A template with this title already exists" }, { status: 400 })
    }

    // Create new template
    const template: Omit<Template, "_id"> = {
      title: data.title,
      slug,
      description: data.description || "",
      category: data.category,
      tags: data.tags || [],
      imageUrl: data.imageUrl || "",
      fileUrl: data.fileUrl || "",
      fileFormats: data.fileFormats || [],
      dimensions: data.dimensions,
      dpi: data.dpi,
      isPremium: data.isPremium || false,
      price: data.price,
      downloadCount: 0,
      viewCount: 0,
      likeCount: 0,
      status: data.status || "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
      author: data.author || "Admin",
    }

    const result = await db.collection<Template>("templates").insertOne(template as any)

    return NextResponse.json({
      _id: result.insertedId.toString(),
      ...template,
    })
  } catch (error) {
    console.error("Error creating template:", error)
    return NextResponse.json({ error: "Failed to create template" }, { status: 500 })
  }
}
