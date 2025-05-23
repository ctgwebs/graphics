import { LaunchChecklist } from "@/components/launch/launch-checklist"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ExternalLink, Rocket } from "lucide-react"

export default function LaunchPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Rocket className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Launch Your Website</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your design templates website is ready for launch! Complete the checklist below to ensure everything is
            properly configured.
          </p>
        </div>

        <LaunchChecklist />

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Quick Start Commands</CardTitle>
              <CardDescription>Essential commands for deployment and setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Deploy to Vercel:</h4>
                <code className="block p-2 bg-muted rounded text-sm">
                  git push origin main
                  <br /># Automatic deployment via Vercel
                </code>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Seed Database:</h4>
                <code className="block p-2 bg-muted rounded text-sm">npm run seed</code>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Health Check:</h4>
                <code className="block p-2 bg-muted rounded text-sm">curl https://your-domain.com/api/health</code>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Links</CardTitle>
              <CardDescription>Essential services and dashboards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="https://vercel.com/dashboard" target="_blank">
                  Vercel Dashboard
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="https://dashboard.stripe.com" target="_blank">
                  Stripe Dashboard
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="https://cloud.mongodb.com" target="_blank">
                  MongoDB Atlas
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="https://analytics.google.com" target="_blank">
                  Google Analytics
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link href="https://search.google.com/search-console" target="_blank">
                  Search Console
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Post-Launch Recommendations</CardTitle>
            <CardDescription>Steps to take after your website is live</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-medium">Content Strategy:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Upload 20-50 initial templates</li>
                  <li>• Create diverse categories</li>
                  <li>• Mix free and premium content</li>
                  <li>• Regular content updates</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Marketing:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Social media presence</li>
                  <li>• SEO optimization</li>
                  <li>• Email marketing</li>
                  <li>• Community building</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Monitoring:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Analytics tracking</li>
                  <li>• Performance monitoring</li>
                  <li>• User feedback</li>
                  <li>• Revenue tracking</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Growth:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• User acquisition</li>
                  <li>• Premium conversions</li>
                  <li>• Feature expansion</li>
                  <li>• Partnership opportunities</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
