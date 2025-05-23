"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { FileUp, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { AdminSidebar } from "@/components/admin-sidebar"

export default function AdminUploadPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [fileFormats, setFileFormats] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]
      const reader = new FileReader()

      reader.onload = () => {
        setPreviewImage(reader.result as string)
      }

      reader.readAsDataURL(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1,
  })

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const toggleFileFormat = (format: string) => {
    if (fileFormats.includes(format)) {
      setFileFormats(fileFormats.filter((f) => f !== format))
    } else {
      setFileFormats([...fileFormats, format])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Template uploaded!",
      description: "Your template has been successfully uploaded.",
    })

    setIsSubmitting(false)
    // Reset form
    setPreviewImage(null)
    setTags([])
    setFileFormats([])
    e.currentTarget.reset()
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />

      <div className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Upload Template</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-8 md:grid-cols-3">
            {/* Template Preview */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Template Preview</CardTitle>
                <CardDescription>Upload a preview image of your template</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                  }`}
                >
                  <input {...getInputProps()} />
                  {previewImage ? (
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={previewImage || "/placeholder.svg"}
                        alt="Template preview"
                        fill
                        className="object-contain rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={(e) => {
                          e.stopPropagation()
                          setPreviewImage(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <FileUp className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {isDragActive ? "Drop the file here" : "Drag & drop an image here, or click to select"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Supports: JPG, PNG, GIF (Max 5MB)</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Preview Settings</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button type="button" variant="outline" size="sm">
                        Crop Image
                      </Button>
                      <Button type="button" variant="outline" size="sm">
                        Adjust
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Template Files</h3>
                    <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer">
                      <FileUp className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Upload template source files</p>
                      <p className="mt-1 text-xs text-muted-foreground">Supports: AI, PSD, PDF, etc. (Max 50MB)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Template Details */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Template Details</CardTitle>
                <CardDescription>Provide information about your template</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <Input id="title" placeholder="Enter template title" required />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe your template in detail..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="banner">Banner</SelectItem>
                        <SelectItem value="flyer">Flyer</SelectItem>
                        <SelectItem value="poster">Poster</SelectItem>
                        <SelectItem value="social-media">Social Media</SelectItem>
                        <SelectItem value="business-card">Business Card</SelectItem>
                        <SelectItem value="invitation">Invitation</SelectItem>
                        <SelectItem value="brochure">Brochure</SelectItem>
                        <SelectItem value="logo">Logo</SelectItem>
                        <SelectItem value="mockup">Mockup</SelectItem>
                        <SelectItem value="illustration">Illustration</SelectItem>
                        <SelectItem value="background">Background</SelectItem>
                        <SelectItem value="certificate">Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="type" className="text-sm font-medium">
                      Type
                    </label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="free">Free</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 hover:bg-transparent"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {tag}</span>
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={addTag} disabled={!tagInput.trim()}>
                      <Plus className="h-4 w-4" />
                      <span className="sr-only">Add tag</span>
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Press Enter or click the plus button to add a tag</p>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">File Specifications</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="dimensions" className="text-sm font-medium">
                        Dimensions
                      </label>
                      <Input id="dimensions" placeholder="e.g., 1920x1080px" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="dpi" className="text-sm font-medium">
                        Resolution (DPI)
                      </label>
                      <Input id="dpi" placeholder="e.g., 300" type="number" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">File Formats</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {["AI", "PSD", "PDF", "JPG", "PNG", "SVG", "EPS"].map((format) => (
                        <div key={format} className="flex items-center space-x-2">
                          <Checkbox
                            id={`format-${format}`}
                            checked={fileFormats.includes(format)}
                            onCheckedChange={() => toggleFileFormat(format)}
                          />
                          <label
                            htmlFor={`format-${format}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {format}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Pricing (for Premium Templates)</h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium">
                        Price ($)
                      </label>
                      <Input id="price" placeholder="e.g., 12.99" type="number" step="0.01" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="discount" className="text-sm font-medium">
                        Discount (%)
                      </label>
                      <Input id="discount" placeholder="e.g., 20" type="number" />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Uploading..." : "Upload Template"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
