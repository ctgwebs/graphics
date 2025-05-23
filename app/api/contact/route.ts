import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate request
    if (!data.email || !data.message) {
      return NextResponse.json({ error: "Email and message are required" }, { status: 400 })
    }

    // In a real app, you would send an email or store in database
    console.log("Contact form submission:", data)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    })
  } catch (error) {
    console.error("Error sending contact form:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
