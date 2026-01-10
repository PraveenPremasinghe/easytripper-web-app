"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Loader } from "@/components/ui/loader";
import { fileToWebP } from "@/lib/utils-admin";
import { cn } from "@/lib/utils";

interface DragDropImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  className?: string;
}

export function DragDropImageUpload({ 
  value, 
  onChange, 
  label = "Image", 
  required = false,
  className 
}: DragDropImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Sync preview with value prop
  useEffect(() => {
    setPreview(value || null);
  }, [value]);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setIsUploading(true);
    try {
      // Convert image to WebP format for better compression and faster loading
      // WebP provides 30-50% smaller file sizes while maintaining quality
      const webpBase64 = await fileToWebP(file, 0.85, 1920, 1920); // 85% quality, max 1920px
      onChange(webpBase64);
      setPreview(webpBase64);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFile(file);
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

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFile(file);
    }
  }, [handleFile]);

  const handleRemove = () => {
    onChange('');
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
      
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
          preview && "border-solid"
        )}
      >
        {preview ? (
          <div className="relative w-full h-64 rounded-lg overflow-hidden bg-muted group">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white hover:bg-red-700 border-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
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
                  {isDragging ? "Drop image here" : "Drag & drop image here"}
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

