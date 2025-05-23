"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import Image from "next/image"
import { FileUp, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface FileUploadProps {
  onFileUpload: (file: File) => void
  onFileRemove: () => void
  accept?: Record<string, string[]>
  maxSize?: number
  preview?: boolean
  file?: File | null
  previewUrl?: string | null
  uploading?: boolean
  progress?: number
  className?: string
}

export function FileUpload({
  onFileUpload,
  onFileRemove,
  accept = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif"],
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  preview = true,
  file = null,
  previewUrl = null,
  uploading = false,
  progress = 0,
  className = "",
}: FileUploadProps) {
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null)
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0])
      }
    },
    [onFileUpload],
  )

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: 1,
    disabled: uploading,
  })

  // Handle file rejection errors
  if (fileRejections.length > 0) {
    const rejection = fileRejections[0]
    if (rejection.errors[0].code === "file-too-large") {
      setError(`File is too large. Max size is ${maxSize / 1024 / 1024}MB.`)
    } else if (rejection.errors[0].code === "file-invalid-type") {
      setError("File type not accepted.")
    } else {
      setError(rejection.errors[0].message)
    }
  }

  return (
    <div className={className}>
      {(file || previewUrl) && preview ? (
        <div className="relative mb-4">
          {uploading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-10">
              <p className="mb-2 text-sm font-medium">Uploading...</p>
              <Progress value={progress} className="w-3/4 h-2" />
            </div>
          )}
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={previewUrl || URL.createObjectURL(file)}
              alt="File preview"
              fill
              className="object-contain rounded-md"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
              onClick={onFileRemove}
              disabled={uploading}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
          } ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input {...getInputProps()} />
          <div className="py-8">
            <FileUp className="h-12 w-12 mx-auto text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {isDragActive ? "Drop the file here" : "Drag & drop a file here, or click to select"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {Object.keys(accept)
                .map((key) => key.replace("/*", ""))
                .join(", ")}{" "}
              (Max {maxSize / 1024 / 1024}MB)
            </p>
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
