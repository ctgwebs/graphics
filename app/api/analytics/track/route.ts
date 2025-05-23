import { NextResponse } from "next/server"
import clientPromise from "@/lib/db"

export async function POST(request: Request) {
  try {
    const { event, templateId, userId, metadata } = await request.json()

    const client = await clientPromise
    const db = client.db()

    // Store analytics event
    const analyticsEvent = {
      event,
      templateId,
      userId,
      metadata,
      timestamp: new Date(),
      userAgent: request.headers.get("user-agent"),
      ip: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip"),
    }

    await db.collection("analytics").insertOne(analyticsEvent)

    // Update template stats based on event type
    if (event === "view" && templateId) {
      await db.collection("templates").updateOne({ _id: templateId }, { $inc: { viewCount: 1 } })
    } else if (event === "download" && templateId) {
      await db.collection("templates").updateOne({ _id: templateId }, { $inc: { downloadCount: 1 } })
    } else if (event === "like" && templateId) {
      await db.collection("templates").updateOne({ _id: templateId }, { $inc: { likeCount: 1 } })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error tracking analytics:", error)
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 })
  }
}
