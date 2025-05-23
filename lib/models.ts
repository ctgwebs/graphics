import type { ObjectId } from "mongodb"

// Template model
export interface Template {
  _id?: ObjectId
  title: string
  slug: string
  description: string
  category: string
  tags: string[]
  imageUrl: string
  fileUrl: string
  fileFormats: string[]
  dimensions?: string
  dpi?: number
  isPremium: boolean
  price?: number
  downloadCount: number
  viewCount: number
  likeCount: number
  status: "draft" | "published" | "archived"
  createdAt: Date
  updatedAt: Date
  author: string
}

// User model
export interface User {
  _id?: ObjectId
  name: string
  email: string
  password: string // Hashed
  role: "user" | "admin"
  avatar?: string
  downloads: {
    templateId: ObjectId
    downloadedAt: Date
  }[]
  favorites: ObjectId[]
  createdAt: Date
  updatedAt: Date
}

// Order model
export interface Order {
  _id?: ObjectId
  userId: ObjectId
  templateId: ObjectId
  amount: number
  paymentId: string
  status: "pending" | "completed" | "failed"
  createdAt: Date
}

// Category model
export interface Category {
  _id?: ObjectId
  name: string
  slug: string
  description?: string
  imageUrl?: string
  count: number
  order: number
  createdAt: Date
  updatedAt: Date
}
