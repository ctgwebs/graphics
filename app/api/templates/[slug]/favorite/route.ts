import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"
import { stringToObjectId } from "@/lib/db"
import type { Template, User } from "@/lib/models"

export async function POST(request: Request, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const slug = params.slug

    const client = await clientPromise
    const db = client.db()

    // Get template
    const template = await db.collection<Template>("templates").findOne({ slug })

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    const userId = stringToObjectId(session.user.id)
    const templateId = template._id!

    // Check if already favorited
    const user = await db.collection<User>("users").findOne({
      _id: userId,
      favorites: templateId,
    })

    if (user) {
      // Remove from favorites
      await db.collection<User>("users").updateOne({ _id: userId }, { $pull: { favorites: templateId } })

      return NextResponse.json({ favorited: false })
    } else {
      // Add to favorites
      await db.collection<User>("users").updateOne({ _id: userId }, { $addToSet: { favorites: templateId } })

      return NextResponse.json({ favorited: true })
    }
  } catch (error) {
    console.error("Error toggling favorite:", error)
    return NextResponse.json({ error: "Failed to toggle favorite" }, { status: 500 })
  }
}

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ favorited: false })
    }

    const slug = params.slug

    const client = await clientPromise
    const db = client.db()

    // Get template
    const template = await db.collection<Template>("templates").findOne({ slug })

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    const userId = stringToObjectId(session.user.id)
    const templateId = template._id!

    // Check if favorited
    const user = await db.collection<User>("users").findOne({
      _id: userId,
      favorites: templateId,
    })

    return NextResponse.json({ favorited: !!user })
  } catch (error) {
    console.error("Error checking favorite status:", error)
    return NextResponse.json({ error: "Failed to check favorite status" }, { status: 500 })
  }
}
