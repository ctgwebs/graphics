"use client"

import { useState } from "react"
import { Check, Circle, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface ChecklistItem {
  id: string
  title: string
  description: string
  completed: boolean
  link?: string
}

export function LaunchChecklist() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([
    {
      id: "deploy",
      title: "Deploy to Vercel",
      description: "Deploy your website to production",
      completed: false,
      link: "https://vercel.com/dashboard",
    },
    {
      id: "domain",
      title: "Configure Custom Domain",
      description: "Set up your custom domain (optional)",
      completed: false,
    },
    {
      id: "seed",
      title: "Seed Database",
      description: "Run npm run seed to populate initial data",
      completed: false,
    },
    {
      id: "stripe",
      title: "Configure Stripe Webhooks",
      description: "Set up webhook endpoint for payment processing",
      completed: false,
      link: "https://dashboard.stripe.com/webhooks",
    },
    {
      id: "admin",
      title: "Test Admin Access",
      description: "Login with admin@designtemplates.com / admin123",
      completed: false,
    },
    {
      id: "templates",
      title: "Upload Initial Templates",
      description: "Add your first design templates",
      completed: false,
    },
    {
      id: "analytics",
      title: "Verify Analytics",
      description: "Check Google Analytics and Facebook Pixel",
      completed: false,
    },
    {
      id: "seo",
      title: "Submit to Search Engines",
      description: "Submit sitemap to Google Search Console",
      completed: false,
      link: "https://search.google.com/search-console",
    },
    {
      id: "social",
      title: "Set Up Social Media",
      description: "Create social media accounts and profiles",
      completed: false,
    },
    {
      id: "backup",
      title: "Configure Backups",
      description: "Set up automated database backups",
      completed: false,
    },
  ])

  const toggleItem = (id: string) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)))
  }

  const completedCount = checklist.filter((item) => item.completed).length
  const totalCount = checklist.length
  const progressPercentage = (completedCount / totalCount) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Circle className="h-5 w-5" />
          Launch Checklist
        </CardTitle>
        <CardDescription>Complete these steps to launch your design templates website</CardDescription>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {completedCount} of {totalCount} completed ({Math.round(progressPercentage)}%)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg border">
            <Checkbox
              id={item.id}
              checked={item.completed}
              onCheckedChange={() => toggleItem(item.id)}
              className="mt-1"
            />
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={item.id}
                  className={`font-medium cursor-pointer ${item.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {item.title}
                </label>
                {item.link && (
                  <Button variant="ghost" size="sm" asChild>
                    <a href={item.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
              <p className={`text-sm ${item.completed ? "text-muted-foreground" : "text-muted-foreground"}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}

        {completedCount === totalCount && (
          <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-600" />
              <h3 className="font-medium text-green-800 dark:text-green-200">
                🎉 Congratulations! Your website is ready to launch!
              </h3>
            </div>
            <p className="mt-2 text-sm text-green-700 dark:text-green-300">
              All checklist items completed. Your design templates website is now live and ready for customers!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
