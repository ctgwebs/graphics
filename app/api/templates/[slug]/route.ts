import { NextResponse } from "next/server"
import clientPromise from "@/lib/db"
import type { Template } from "@/lib/models"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    const client = await clientPromise
    const db = client.db()

    // Get template
    const template = await db.collection<Template>("templates").findOne({ slug })

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    // Increment view count
    await db.collection<Template>("templates").updateOne({ slug }, { $inc: { viewCount: 1 } })

    return NextResponse.json({
      ...template,
      _id: template._id?.toString(),
    })
  } catch (error) {
    console.error("Error fetching template:", error)
    return NextResponse.json({ error: "Failed to fetch template" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const data = await request.json()

    const client = await clientPromise
    const db = client.db()

    // Check if template exists
    const template = await db.collection<Template>("templates").findOne({ slug })

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    // Update template
    const updatedTemplate = {
      ...data,
      updatedAt: new Date(),
    }

    await db.collection<Template>("templates").updateOne({ slug }, { $set: updatedTemplate })

    return NextResponse.json({
      ...template,
      ...updatedTemplate,
      _id: template._id?.toString(),
    })
  } catch (error) {
    console.error("Error updating template:", error)
    return NextResponse.json({ error: "Failed to update template" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    const client = await clientPromise
    const db = client.db()

    // Check if template exists
    const template = await db.collection<Template>("templates").findOne({ slug })

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    // Delete template
    await db.collection<Template>("templates").deleteOne({ slug })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting template:", error)
    return NextResponse.json({ error: "Failed to delete template" }, { status: 500 })
  }
}
