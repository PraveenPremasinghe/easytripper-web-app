"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { fileToWebP } from "@/lib/utils-admin";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  required?: boolean;
  className?: string;
  maxImages?: number;
}

export function MultiImageUpload({ 
  value = [], 
  onChange, 
  label = "Images", 
  required = false,
  className,
  maxImages = 10
}: MultiImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>(value || []);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Sync previews with value prop
  useEffect(() => {
    setPreviews(value || []);
  }, [value]);

  const handleFiles = useCallback(async (files: FileList) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length === 0) {
      alert('Please select image files');
      return;
    }

    if (previews.length + imageFiles.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsUploading(true);
    try {
      const newImages: string[] = [];
      // Convert each image to WebP format for better compression
      for (const file of imageFiles) {
        const webpBase64 = await fileToWebP(file, 0.85, 1920, 1920); // 85% quality, max 1920px
        newImages.push(webpBase64);
      }
      const updatedImages = [...previews, ...newImages];
      onChange(updatedImages);
      setPreviews(updatedImages);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  }, [previews, onChange, maxImages]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFiles(files);
      // Reset input to allow selecting the same files again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await handleFiles(files);
    }
  }, [handleFiles]);

  const handleRemove = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    onChange(updated);
    setPreviews(updated);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>
        {label} {required && <span className="text-destructive">*</span>}
        {previews.length > 0 && (
          <span className="text-muted-foreground ml-2">({previews.length}/{maxImages})</span>
        )}
      </Label>
      
      <div
        ref={dropZoneRef}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative w-full border-2 border-dashed rounded-lg transition-all cursor-pointer",
          isDragging 
            ? "border-primary bg-primary/10 scale-[1.02]" 
            : "border-border hover:border-primary/50 bg-muted/30",
          previews.length > 0 && "border-solid p-4"
        )}
      >
        {previews.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-muted">
                <img
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => handleRemove(index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white hover:bg-red-700 border-0 h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {previews.length < maxImages && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className={cn(
                  "aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors",
                  isDragging 
                    ? "border-primary bg-primary/10" 
                    : "border-border hover:border-primary/50 bg-muted/30"
                )}
              >
                {isUploading ? (
                  <>
                    <Loader size="md" className="mb-2" />
                    <p className="text-xs text-muted-foreground">Uploading...</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-xs text-muted-foreground text-center px-2">Add More</p>
                  </>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
            {isUploading ? (
              <>
                <Loader size="lg" className="mb-4" />
                <p className="text-sm font-medium text-foreground">Uploading...</p>
              </>
            ) : (
              <>
                <div className={cn(
                  "p-4 rounded-full mb-4 transition-colors",
                  isDragging ? "bg-primary/20" : "bg-muted"
                )}>
                  <ImageIcon className={cn(
                    "h-10 w-10 transition-colors",
                    isDragging ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  {isDragging ? "Drop images here" : "Drag & drop images here"}
                </p>
                <p className="text-xs text-muted-foreground mb-4">or</p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Browse Files
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      {/* File input always available, not conditionally rendered */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
        onClick={(e) => {
          // Reset input to allow selecting the same files again
          (e.target as HTMLInputElement).value = '';
        }}
      />
    </div>
  );
}

