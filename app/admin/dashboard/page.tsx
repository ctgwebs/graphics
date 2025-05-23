"use client"

import { useState } from "react"
import Image from "next/image"
import { BarChart3, Download, Eye, FileUp, Grid, ListFilter, Plus, Search, Settings, Trash2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminSidebar } from "@/components/admin-sidebar"

// Mock data for templates
const templates = [
  {
    id: "1",
    title: "Business Conference Flyer",
    category: "Flyer",
    status: "published",
    isPremium: true,
    downloads: 980,
    views: 3200,
    createdAt: "2023-10-15",
  },
  {
    id: "2",
    title: "Summer Sale Banner",
    category: "Banner",
    status: "published",
    isPremium: false,
    downloads: 1250,
    views: 4500,
    createdAt: "2023-09-22",
  },
  {
    id: "3",
    title: "Wedding Invitation",
    category: "Invitation",
    status: "published",
    isPremium: false,
    downloads: 1540,
    views: 5100,
    createdAt: "2023-11-05",
  },
  {
    id: "4",
    title: "Corporate Business Card",
    category: "Business Card",
    status: "draft",
    isPremium: true,
    downloads: 0,
    views: 0,
    createdAt: "2023-11-10",
  },
  {
    id: "5",
    title: "Christmas Party Poster",
    category: "Poster",
    status: "published",
    isPremium: false,
    downloads: 750,
    views: 2100,
    createdAt: "2023-11-08",
  },
]

export default function AdminDashboardPage() {
  const [view, setView] = useState<"grid" | "list">("list")

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Template
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
              <FileUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,254</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45,678</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">189,345</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12,345</div>
              <p className="text-xs text-muted-foreground">+5% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Templates Management */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Templates</CardTitle>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setView("grid")}
                  className={view === "grid" ? "bg-muted" : ""}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setView("list")}
                  className={view === "list" ? "bg-muted" : ""}
                >
                  <ListFilter className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardDescription>Manage your templates, track downloads and views.</CardDescription>
            <div className="flex items-center space-x-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search templates..." className="pl-8" />
              </div>
              <Button variant="outline" size="sm">
                <ListFilter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
                <TabsTrigger value="free">Free</TabsTrigger>
              </TabsList>

              {view === "list" ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Downloads</TableHead>
                      <TableHead className="text-right">Views</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.title}</TableCell>
                        <TableCell>{template.category}</TableCell>
                        <TableCell>
                          <Badge variant={template.status === "published" ? "default" : "outline"}>
                            {template.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={template.isPremium ? "secondary" : "outline"}>
                            {template.isPremium ? "Premium" : "Free"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">{template.downloads.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{template.views.toLocaleString()}</TableCell>
                        <TableCell className="text-right">{template.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <span className="sr-only">Open menu</span>
                                <Settings className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>View</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id}>
                      <CardContent className="p-0">
                        <div className="relative aspect-[3/4] w-full">
                          <Image
                            src="/placeholder.svg?height=400&width=300"
                            alt={template.title}
                            fill
                            className="object-cover rounded-t-lg"
                          />
                          <Badge
                            className="absolute top-2 right-2"
                            variant={template.isPremium ? "secondary" : "outline"}
                          >
                            {template.isPremium ? "Premium" : "Free"}
                          </Badge>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium truncate">{template.title}</h3>
                          <p className="text-sm text-muted-foreground">{template.category}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge variant={template.status === "published" ? "default" : "outline"}>
                              {template.status}
                            </Badge>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Download className="mr-1 h-3 w-3" />
                                <span>{template.downloads}</span>
                              </div>
                              <div className="flex items-center">
                                <Eye className="mr-1 h-3 w-3" />
                                <span>{template.views}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </Tabs>
          </CardContent>
        </Card>

        {/* Analytics Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
            <CardDescription>View your template performance metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <div className="flex flex-col items-center text-center">
                <BarChart3 className="h-16 w-16 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">Analytics Chart</h3>
                <p className="text-sm text-muted-foreground max-w-[300px]">
                  This is where your analytics chart would be displayed, showing downloads, views, and user engagement
                  over time.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
