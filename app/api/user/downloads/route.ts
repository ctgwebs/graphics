import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"
import { stringToObjectId } from "@/lib/db"
import type { User, Template } from "@/lib/models"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    // Get user data with downloads
    const user = await db.collection<User>("users").findOne({ _id: stringToObjectId(session.user.id) })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (!user.downloads || user.downloads.length === 0) {
      return NextResponse.json([])
    }

    // Get template details for each download
    const templateIds = user.downloads.map((download) => stringToObjectId(download.templateId.toString()))
    const templates = await db
      .collection<Template>("templates")
      .find({ _id: { $in: templateIds } })
      .toArray()

    // Combine download data with template details
    const downloadsWithDetails = user.downloads.map((download) => {
      const template = templates.find((t) => t._id?.toString() === download.templateId.toString())
      return {
        ...template,
        _id: template?._id?.toString(),
        downloadedAt: download.downloadedAt.toISOString(),
      }
    })

    return NextResponse.json(downloadsWithDetails)
  } catch (error) {
    console.error("Error fetching user downloads:", error)
    return NextResponse.json({ error: "Failed to fetch downloads" }, { status: 500 })
  }
}
