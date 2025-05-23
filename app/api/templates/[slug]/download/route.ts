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

    // Check if premium and handle payment verification
    if (template.isPremium) {
      const { searchParams } = new URL(request.url)
      const paymentId = searchParams.get("paymentId")

      // In a real app, verify payment here
      if (!paymentId) {
        return NextResponse.json({ error: "Payment required for premium templates" }, { status: 402 })
      }

      // Verify payment (mock)
      // In a real app, verify with payment provider
    }

    // Increment download count
    await db.collection<Template>("templates").updateOne({ slug }, { $inc: { downloadCount: 1 } })

    // In a real app, you would generate a signed URL or serve the file
    // For this example, we'll just return the file URL
    return NextResponse.json({
      downloadUrl: template.fileUrl,
      message: "Download started",
    })
  } catch (error) {
    console.error("Error downloading template:", error)
    return NextResponse.json({ error: "Failed to download template" }, { status: 500 })
  }
}
