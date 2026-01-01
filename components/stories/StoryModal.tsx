"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import type { Story } from "@/lib/types";

interface StoryModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

export function StoryModal({ story, isOpen, onClose }: StoryModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (story) {
      setCurrentImageIndex(0);
    }
  }, [story]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !story) return;
      
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, story, currentImageIndex]);

  if (!story) return null;

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % story.gallery.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + story.gallery.length) % story.gallery.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="!w-full !max-w-full p-0 bg-black/98 border-none overflow-hidden"
      >
        <div className="relative flex flex-col h-full">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/90 via-black/70 to-transparent p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {story.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
                  {story.title}
                </h2>
                <p className="text-white/90 text-base md:text-lg mb-3">{story.excerpt}</p>
                {story.date && (
                  <div className="flex items-center gap-2 text-white/80">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{story.date}</span>
                  </div>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all hover:scale-110 flex-shrink-0"
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Main Image Display */}
          <div className="relative flex-1 min-h-[400px] md:min-h-[500px] lg:min-h-[600px] mt-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={story.gallery[currentImageIndex]}
                  alt={`${story.title} - Image ${currentImageIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {story.gallery.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image Counter */}
            {story.gallery.length > 1 && (
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white text-sm">
                {currentImageIndex + 1} / {story.gallery.length}
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {story.gallery.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 border-t border-white/10">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {story.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`
                      relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all
                      ${
                        index === currentImageIndex
                          ? "border-white scale-110 shadow-lg"
                          : "border-white/30 hover:border-white/60 opacity-70 hover:opacity-100"
                      }
                    `}
                  >
                    <Image
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-white/10" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
