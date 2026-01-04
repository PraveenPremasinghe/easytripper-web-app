"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquarePlus } from "lucide-react";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import { FeedbackForm } from "./FeedbackForm";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/toaster";
import type { Testimonial } from "@/lib/types";

// Country flag emoji mapping
const countryFlags: Record<string, string> = {
  "United States": "🇺🇸",
  "Australia": "🇦🇺",
  "United Kingdom": "🇬🇧",
  "Spain": "🇪🇸",
  "Canada": "🇨🇦",
  "New Zealand": "🇳🇿",
};

// Modern Review Card Component with rating
const ReviewCard = ({
  name,
  username,
  body,
  rating,
}: {
  name: string;
  username: string;
  body: string;
  rating?: number;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-100 flex-shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 p-6 mx-4",
        "transition-all duration-300   hover:scale-[1.02]",
        // light styles - very visible background with strong contrast
        "border-gray-300 bg-white  ",
        // dark styles - very visible background with strong contrast  
        "dark:border-gray-600 dark:bg-gray-900 dark:hover:bg-gray-800"
      )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col gap-1">
              <figcaption className="text-base font-semibold text-foreground dark:text-white">
                {name}
              </figcaption>
              <p className="text-sm font-medium text-muted-foreground dark:text-gray-300">
                {username}
              </p>
            </div>
            {rating && (
              <div className="flex items-center gap-0.5 flex-shrink-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4 transition-colors",
                      i < rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 dark:text-gray-600"
                    )}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <blockquote className="text-sm leading-relaxed text-foreground dark:text-gray-200 line-clamp-4">
          {body}
        </blockquote>
      </div>
    </figure>
  );
};

export function Testimonials() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch testimonials from Firebase
  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch("/api/firebase/testimonials");
      const { success, data } = await res.json();
      if (success) {
        setTestimonials(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch testimonials:", error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate aggregate rating
  const aggregateRating =
    testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 0;

  // Transform testimonials to match Magic UI pattern
  const reviews = testimonials.map((testimonial) => {
    const flag = countryFlags[testimonial.country] || "";
    return {
      name: testimonial.name,
      username: flag ? `${testimonial.country} ${flag}` : testimonial.country,
      body: testimonial.comment,
      id: testimonial.id,
      rating: testimonial.rating,
    };
  });

  // Split reviews into two rows for dual marquee
  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  // Handle feedback submission
  const handleFeedbackSubmit = async (data: {
    name: string;
    country: string;
    comment: string;
    rating: number;
  }) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/firebase/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Thank you!", "Your feedback has been submitted successfully.");
        await fetchTestimonials(); // Refresh testimonials
        setIsFeedbackOpen(false);
      } else {
        toast.error("Error", result.error || "Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("Error", "Failed to submit feedback. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-background via-slate-50 to-background dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto  px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Testimonials
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl font-serif">
            People Love Us
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8">
            Easy Tripper is loved by thousands of people across the world, be part of the community and join us.
          </p>

          {/* Aggregate Rating */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm">
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
              <span className="text-xl font-bold text-foreground">
                {aggregateRating > 0 ? aggregateRating.toFixed(1) : "0.0"} / 5.0
              </span>
              <span className="text-sm text-muted-foreground">
                ({testimonials.length} {testimonials.length === 1 ? "review" : "reviews"})
              </span>
            </div>
            <Button
              onClick={() => setIsFeedbackOpen(true)}
              className="gap-2"
              size="lg"
            >
              <MessageSquarePlus className="h-5 w-5" />
              Add Your Feedback
            </Button>
          </motion.div>
        </motion.div>

        {/* Magic UI Marquee - Two Rows with improved spacing */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No testimonials yet. Be the first to share your experience!</p>
            <Button onClick={() => setIsFeedbackOpen(true)} className="gap-2">
              <MessageSquarePlus className="h-5 w-5" />
              Add Your Feedback
            </Button>
          </div>
        ) : reviews.length > 0 && (
          <div className="relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-lg py-4">
            {/* First Row - Left to Right */}
            <div className="relative w-full">
              <Marquee pauseOnHover className="[--duration:20s]   p-5">
                {firstRow.map((review) => (
                  <ReviewCard
                    key={`first-${review.id}`}
                    name={review.name}
                    username={review.username}
                    body={review.body}
                    rating={review.rating}
                  />
                ))}
              </Marquee>
            </div>
            
            {/* Second Row - Right to Left */}
            <div className="relative w-full">
              <Marquee reverse pauseOnHover className="[--duration:20s]   p-5">
                {secondRow.map((review) => (
                  <ReviewCard
                    key={`second-${review.id}`}
                    name={review.name}
                    username={review.username}
                    body={review.body}
                    rating={review.rating}
                  />
                ))}
              </Marquee>
            </div>
            
            {/* Left fade - covers both rows */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/4 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent z-20 dark:from-slate-900 dark:via-slate-900/90"></div>
            {/* Right fade - covers both rows */}
            <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent z-20 dark:from-slate-900 dark:via-slate-900/90"></div>
          </div>
        )}
      

        {/* Feedback Form Dialog */}
        <FeedbackForm
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          onSubmit={handleFeedbackSubmit}
          isSubmitting={submitting}
        />
      </div>
    </section>
  );
}
