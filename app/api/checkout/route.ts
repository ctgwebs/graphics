import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import stripe from "@/lib/stripe"
import clientPromise from "@/lib/db"
import type { Template } from "@/lib/models"

export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { templateId, templateSlug } = await request.json()

    if (!templateId && !templateSlug) {
      return NextResponse.json({ error: "Template ID or slug is required" }, { status: 400 })
    }

    // Get template details from database
    const client = await clientPromise
    const db = client.db()

    let template: Template | null = null

    if (templateId) {
      template = await db.collection<Template>("templates").findOne({ _id: templateId })
    } else if (templateSlug) {
      template = await db.collection<Template>("templates").findOne({ slug: templateSlug })
    }

    if (!template) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 })
    }

    if (!template.isPremium) {
      return NextResponse.json({ error: "Template is not premium" }, { status: 400 })
    }

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: template.title,
              description: template.description,
              images: [template.imageUrl],
            },
            unit_amount: Math.round((template.price || 0) * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/templates/${template.slug}?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/templates/${template.slug}?canceled=true`,
      metadata: {
        templateId: template._id?.toString() || "",
        userId: session.user.id,
      },
    })

    return NextResponse.json({ checkoutUrl: checkoutSession.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
