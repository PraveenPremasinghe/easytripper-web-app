"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const formattedTestimonials = testimonials.map((t) => ({
    quote: t.comment,
    name: t.name,
    title: t.country,
    rating: t.rating,
    tripRoute: t.tripRoute
  }));

  return (
    <div id="testimonials" className="py-24 rounded-md flex flex-col antialiased bg-slate-50 dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
        <div className="text-center mb-12 px-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl font-serif mb-4">
                Voices of Our Travelers
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-600">
                Don&apos;t just take our word for it. Hear from those who have experienced the magic of Sri Lanka with us.
            </p>
        </div>
      <InfiniteMovingCards
        items={formattedTestimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}
