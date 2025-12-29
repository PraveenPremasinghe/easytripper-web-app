"use client";

import { motion } from "framer-motion";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import Image from "next/image";

// Country flag emoji mapping
const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "Australia": "🇦🇺",
  "United Kingdom": "🇬🇧",
  "Spain": "🇪🇸",
  "Canada": "🇨🇦",
  "New Zealand": "🇳🇿",
};

export function Testimonials() {
  // Calculate aggregate rating
  const aggregateRating =
    testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  // Prepare items for infinite moving cards
  const testimonialItems = testimonials.map((testimonial) => ({
    quote: testimonial.comment,
    name: testimonial.name,
    title: `${testimonial.country} ${countryFlags[testimonial.country] || ""}`,
    rating: testimonial.rating,
    avatar: testimonial.avatar,
  }));

  return (
    <section id="testimonials" className="py-20 bg-background dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            What Our Travelers Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Trusted by travelers from around the world
          </p>

          {/* Aggregate Rating */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(aggregateRating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold text-foreground">
              {aggregateRating.toFixed(1)} / 5.0
            </span>
            <span className="text-sm text-muted-foreground">
              ({testimonials.length} reviews)
            </span>
          </div>
        </motion.div>

        {/* Infinite Moving Cards */}
        <div className="relative">
          <InfiniteMovingCards
            items={testimonialItems}
            direction="left"
            speed="normal"
            pauseOnHover={true}
            className="[&_.scroller]:bg-slate-100 dark:[&_.scroller]:bg-slate-800"
          />
        </div>

        {/* Additional Testimonials Grid (for SEO and accessibility) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.slice(0, 3).map((testimonial) => (
            <div
              key={testimonial.id}
              className="rounded-lg border border-border bg-card p-6 shadow-sm"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="mb-4 italic text-muted-foreground line-clamp-3">
                &quot;{testimonial.comment}&quot;
              </p>
              <div className="flex items-center gap-3 border-t pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.country} {countryFlags[testimonial.country] || ""}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
