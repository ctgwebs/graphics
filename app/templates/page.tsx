import { Suspense } from "react"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TemplateGrid } from "@/components/template-grid"
import { LoadingTemplates } from "@/components/loading-templates"
import { SearchBar } from "@/components/search-bar"
import { CategoryFilter } from "@/components/category-filter"

export const metadata = {
  title: "Browse Templates - Free & Premium Design Resources",
  description:
    "Browse and download thousands of high-quality editable vector designs for your next project. Banners, flyers, posters, and more.",
}

export default function TemplatesPage() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">Browse Templates</h1>
        <p className="text-muted-foreground">
          Find the perfect template for your next project from our collection of high-quality designs
        </p>
      </div>

      <div className="mt-8 flex flex-col space-y-6">
        {/* Search and Filters */}
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="w-full md:w-1/2">
            <SearchBar />
          </div>
          <div className="flex items-center space-x-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="downloads">Most Downloads</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>

        {/* Category Filter */}
        <CategoryFilter />

        {/* Templates Grid */}
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            <Suspense fallback={<LoadingTemplates />}>
              <TemplateGrid type="all" limit={24} />
            </Suspense>
          </TabsContent>
          <TabsContent value="free" className="mt-6">
            <Suspense fallback={<LoadingTemplates />}>
              <TemplateGrid type="free" limit={24} />
            </Suspense>
          </TabsContent>
          <TabsContent value="premium" className="mt-6">
            <Suspense fallback={<LoadingTemplates />}>
              <TemplateGrid type="premium" limit={24} />
            </Suspense>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            <Button variant="outline" disabled>
              Previous
            </Button>
            <Button variant="outline">1</Button>
            <Button variant="outline">2</Button>
            <Button variant="outline">3</Button>
            <Button variant="outline">Next</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
