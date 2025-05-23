"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, FileUp, Grid, Home, LogOut, Settings, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-64 border-r bg-muted/40 h-screen flex flex-col">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Admin</span>
        </Link>
      </div>

      <Separator />

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <Button variant={isActive("/admin/dashboard") ? "default" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin/dashboard">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button variant={isActive("/admin/upload") ? "default" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin/upload">
              <FileUp className="mr-2 h-4 w-4" />
              Upload Template
            </Link>
          </Button>
          <Button variant={isActive("/admin/templates") ? "default" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin/templates">
              <Grid className="mr-2 h-4 w-4" />
              Templates
            </Link>
          </Button>
          <Button variant={isActive("/admin/orders") ? "default" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin/orders">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </Link>
          </Button>
          <Button variant={isActive("/admin/users") ? "default" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin/users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </Link>
          </Button>
          <Button variant={isActive("/admin/analytics") ? "default" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin/analytics">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Link>
          </Button>
          <Button variant={isActive("/admin/settings") ? "default" : "ghost"} className="w-full justify-start" asChild>
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Link>
        </Button>
      </div>
    </div>
  )
}
