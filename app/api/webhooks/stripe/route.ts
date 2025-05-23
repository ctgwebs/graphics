import { NextResponse } from "next/server"
import { headers } from "next/headers"
import stripe from "@/lib/stripe"
import clientPromise from "@/lib/db"
import type { Order } from "@/lib/models"

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = headers().get("stripe-signature") || ""

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error("Missing STRIPE_WEBHOOK_SECRET environment variable")
    }

    // Verify webhook signature
    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (err) {
      console.error(`Webhook signature verification failed:`, err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object

      // Get metadata from session
      const templateId = session.metadata?.templateId
      const userId = session.metadata?.userId

      if (!templateId || !userId) {
        console.error("Missing metadata in Stripe session")
        return NextResponse.json({ error: "Missing metadata" }, { status: 400 })
      }

      // Record the order in the database
      const client = await clientPromise
      const db = client.db()

      const order: Omit<Order, "_id"> = {
        userId,
        templateId,
        amount: session.amount_total ? session.amount_total / 100 : 0, // Convert from cents
        paymentId: session.id,
        status: "completed",
        createdAt: new Date(),
      }

      await db.collection<Order>("orders").insertOne(order as any)

      // Update template download count
      await db.collection("templates").updateOne({ _id: templateId }, { $inc: { downloadCount: 1 } })

      // Add to user's downloads
      await db.collection("users").updateOne(
        { _id: userId },
        {
          $push: {
            downloads: {
              templateId,
              downloadedAt: new Date(),
            },
          },
        },
      )
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 })
  }
}

// Disable body parsing, we need the raw body for signature verification
export const config = {
  api: {
    bodyParser: false,
  },
}
