"use client";

import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "Australia": "🇦🇺",
  "United Kingdom": "🇬🇧",
  "Spain": "🇪🇸",
  "Canada": "🇨🇦",
  "New Zealand": "🇳🇿",
};

export function ModernTestimonials() {
  const aggregateRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  const testimonialItems = testimonials.map((testimonial) => ({
    quote: testimonial.comment,
    name: testimonial.name,
    title: `${testimonial.country} ${countryFlags[testimonial.country] || ""}`,
    rating: testimonial.rating,
  }));

  return (
    <section className="py-20 bg-background dark:bg-slate-900 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            People Love Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Easy Tripper is loved by thousands of people across the world, be part of the community and join us.
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted border border-border shadow-sm">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(aggregateRating)
                      ? "fill-accent text-accent"
                      : "text-neutral-300 dark:text-neutral-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-xl font-bold text-foreground">
              {aggregateRating.toFixed(1)} / 5.0
            </span>
            <span className="text-sm text-muted-foreground">
              ({testimonials.length} reviews)
            </span>
          </div>
        </motion.div>

        <div className="relative">
          <InfiniteMovingCards
            items={testimonialItems}
            direction="left"
            speed="normal"
            pauseOnHover={true}
          />
        </div>
      </div>
    </section>
  );
}

