"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ItineraryTimelineProps {
  itinerary: string[];
  className?: string;
}

export function ItineraryTimeline({ itinerary, className }: ItineraryTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary/20" />
      <div className="space-y-6">
        {itinerary.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative flex gap-4"
          >
            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-lg">
              {index + 1}
            </div>
            <div className="flex-1 pt-1">
              <div className="rounded-lg border border-border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-foreground leading-relaxed">{day}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
