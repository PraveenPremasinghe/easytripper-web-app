"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Destination } from "@/lib/types";
import { useState, useEffect } from "react";

interface DestinationQuickViewProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onWishlistToggle?: (destination: Destination) => void;
}

export function DestinationQuickView({
  destination,
  isOpen,
  onClose,
  onWishlistToggle,
}: DestinationQuickViewProps) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (destination) {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setIsInWishlist(wishlist.some((d: Destination) => d.slug === destination.slug));
    }
  }, [destination]);

  if (!destination) return null;

  const handleWishlistToggle = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const index = wishlist.findIndex((d: Destination) => d.slug === destination.slug);
    
    if (index > -1) {
      wishlist.splice(index, 1);
      setIsInWishlist(false);
    } else {
      wishlist.push(destination);
      setIsInWishlist(true);
    }
    
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    onWishlistToggle?.(destination);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
            <Image
              src={destination.image}
              alt={destination.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <Badge className="bg-primary/90 backdrop-blur-sm">
                {destination.region}
              </Badge>
              <Button
                variant="outline"
                size="icon"
                onClick={handleWishlistToggle}
                className="bg-background/80 backdrop-blur-sm"
              >
                <Heart
                  className={`h-4 w-4 ${
                    isInWishlist ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            </div>
          </div>
          <DialogTitle className="text-3xl">{destination.name}</DialogTitle>
          <DialogDescription className="text-base">
            {destination.excerpt}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {destination.description && (
            <div>
              <h3 className="text-xl font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{destination.description}</p>
            </div>
          )}

          {destination.highlights && destination.highlights.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Highlights</h3>
              <ul className="grid gap-2 sm:grid-cols-2">
                {destination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            {destination.bestTime && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Best Time</p>
                  <p className="text-sm text-muted-foreground">{destination.bestTime}</p>
                </div>
              </div>
            )}
            {destination.duration && (
              <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold text-sm">Duration</p>
                  <p className="text-sm text-muted-foreground">{destination.duration}</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link href={`/destinations/${destination.slug}`}>
                View Full Details
              </Link>
            </Button>
            <Button variant="outline" onClick={handleWishlistToggle}>
              <Heart
                className={`h-4 w-4 mr-2 ${
                  isInWishlist ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
