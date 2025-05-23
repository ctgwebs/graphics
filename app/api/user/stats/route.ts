import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import clientPromise from "@/lib/db"
import { stringToObjectId } from "@/lib/db"
import type { User, Order } from "@/lib/models"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()

    // Get user data
    const user = await db.collection<User>("users").findOne({ _id: stringToObjectId(session.user.id) })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get user's orders (premium purchases)
    const orders = await db
      .collection<Order>("orders")
      .find({ userId: stringToObjectId(session.user.id), status: "completed" })
      .toArray()

    // Calculate stats
    const stats = {
      totalDownloads: user.downloads?.length || 0,
      favoriteTemplates: user.favorites?.length || 0,
      premiumPurchases: orders.length,
      accountCreated: user.createdAt.toISOString(),
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching user stats:", error)
    return NextResponse.json({ error: "Failed to fetch user stats" }, { status: 500 })
  }
}
