import { NextResponse } from "next/server"
import { hash } from "bcrypt"
import clientPromise from "@/lib/db"
import type { User } from "@/lib/models"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate request
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db()

    // Check if user already exists
    const existingUser = await db.collection<User>("users").findOne({ email })

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create new user
    const user: Omit<User, "_id"> = {
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role
      downloads: [],
      favorites: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<User>("users").insertOne(user as any)

    return NextResponse.json({
      id: result.insertedId.toString(),
      name,
      email,
      role: "user",
    })
  } catch (error) {
    console.error("Error registering user:", error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
}
