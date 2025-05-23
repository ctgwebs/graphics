import { NextResponse } from "next/server"
import clientPromise from "@/lib/db"

export async function GET() {
  try {
    // Check database connection
    const client = await clientPromise
    await client.db().admin().ping()

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
    })
  } catch (error) {
    console.error("Health check failed:", error)

    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
