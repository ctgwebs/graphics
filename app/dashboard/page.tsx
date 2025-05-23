"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, Heart, Calendar, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface UserStats {
  totalDownloads: number
  favoriteTemplates: number
  premiumPurchases: number
  accountCreated: string
}

interface DownloadedTemplate {
  id: string
  title: string
  slug: string
  category: string
  imageUrl: string
  downloadedAt: string
  isPremium: boolean
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<UserStats | null>(null)
  const [downloads, setDownloads] = useState<DownloadedTemplate[]>([])
  const [favorites, setFavorites] = useState<DownloadedTemplate[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/login")
      return
    }

    // Fetch user data
    fetchUserData()
  }, [session, status, router])

  const fetchUserData = async () => {
    try {
      // Mock data - in a real app, this would come from your API
      setStats({
        totalDownloads: 24,
        favoriteTemplates: 8,
        premiumPurchases: 3,
        accountCreated: "2023-10-15",
      })

      setDownloads([
        {
          id: "1",
          title: "Business Conference Flyer",
          slug: "business-conference-flyer",
          category: "Flyer",
          imageUrl: "/placeholder.svg?height=400&width=300",
          downloadedAt: "2023-11-10",
          isPremium: true,
        },
        {
          id: "2",
          title: "Summer Sale Banner",
          slug: "summer-sale-banner",
          category: "Banner",
          imageUrl: "/placeholder.svg?height=400&width=300",
          downloadedAt: "2023-11-08",
          isPremium: false,
        },
        {
          id: "3",
          title: "Wedding Invitation",
          slug: "wedding-invitation",
          category: "Invitation",
          imageUrl: "/placeholder.svg?height=400&width=300",
          downloadedAt: "2023-11-05",
          isPremium: false,
        },
      ])

      setFavorites([
        {
          id: "4",
          title: "Corporate Business Card",
          slug: "corporate-business-card",
          category: "Business Card",
          imageUrl: "/placeholder.svg?height=400&width=300",
          downloadedAt: "2023-11-01",
          isPremium: true,
        },
        {
          id: "5",
          title: "Christmas Party Poster",
          slug: "christmas-party-poster",
          category: "Poster",
          imageUrl: "/placeholder.svg?height=400&width=300",
          downloadedAt: "2023-10-28",
          isPremium: false,
        },
      ])
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="container px-4 py-8 md:px-6 md:py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-8">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">Welcome back, {session.user?.name}!</h1>
          <p className="text-muted-foreground">Manage your downloads, favorites, and account settings.</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDownloads}</div>
                <p className="text-xs text-muted-foreground">Templates downloaded</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Favorites</CardTitle>
                <Heart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.favoriteTemplates}</div>
                <p className="text-xs text-muted-foreground">Saved templates</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Premium Purchases</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.premiumPurchases}</div>
                <p className="text-xs text-muted-foreground">Premium templates</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Date(stats.accountCreated).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </div>
                <p className="text-xs text-muted-foreground">Account created</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Content Tabs */}
        <Tabs defaultValue="downloads" className="space-y-6">
          <TabsList>
            <TabsTrigger value="downloads">My Downloads</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="downloads" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Downloaded Templates</CardTitle>
                <CardDescription>Templates you've downloaded and can access anytime.</CardDescription>
              </CardHeader>
              <CardContent>
                {downloads.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {downloads.map((template) => (
                      <Link key={template.id} href={`/templates/${template.slug}`} className="group">
                        <Card className="overflow-hidden transition-all hover:shadow-md">
                          <CardContent className="p-0">
                            <div className="relative aspect-[3/4] w-full">
                              <Image
                                src={template.imageUrl || "/placeholder.svg"}
                                alt={template.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                              {template.isPremium && (
                                <Badge className="absolute top-2 right-2" variant="secondary">
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                                {template.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{template.category}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Downloaded on {new Date(template.downloadedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Download className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No downloads yet</h3>
                    <p className="text-muted-foreground">Start browsing our templates to download your first one.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/templates">Browse Templates</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Favorite Templates</CardTitle>
                <CardDescription>Templates you've saved for later.</CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {favorites.map((template) => (
                      <Link key={template.id} href={`/templates/${template.slug}`} className="group">
                        <Card className="overflow-hidden transition-all hover:shadow-md">
                          <CardContent className="p-0">
                            <div className="relative aspect-[3/4] w-full">
                              <Image
                                src={template.imageUrl || "/placeholder.svg"}
                                alt={template.title}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                              {template.isPremium && (
                                <Badge className="absolute top-2 right-2" variant="secondary">
                                  Premium
                                </Badge>
                              )}
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                                {template.title}
                              </h3>
                              <p className="text-sm text-muted-foreground">{template.category}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No favorites yet</h3>
                    <p className="text-muted-foreground">Save templates you like to access them quickly later.</p>
                    <Button className="mt-4" asChild>
                      <Link href="/templates">Browse Templates</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>Manage your account details and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <p className="text-muted-foreground">{session.user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-muted-foreground">{session.user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Account Type</label>
                    <p className="text-muted-foreground capitalize">{session.user?.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Member Since</label>
                    <p className="text-muted-foreground">
                      {stats && new Date(stats.accountCreated).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Account Actions</h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline">Edit Profile</Button>
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">Download Data</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
