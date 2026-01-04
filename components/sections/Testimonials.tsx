"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquarePlus } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Marquee } from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import { FeedbackForm } from "./FeedbackForm";
import { cn } from "@/lib/utils";

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

interface UserFeedback {
  id: string;
  name: string;
  country: string;
  comment: string;
  rating: number;
  timestamp: number;
}

export function Testimonials() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [userFeedbacks, setUserFeedbacks] = useState<UserFeedback[]>([]);

  // Load user feedbacks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("userFeedbacks");
    if (stored) {
      try {
        setUserFeedbacks(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading feedbacks:", e);
      }
    }
  }, []);

  // Combine original testimonials with user feedbacks
  const allTestimonials = [
    ...testimonials,
    ...userFeedbacks.map((fb) => ({
      id: fb.id,
      name: fb.name,
      country: fb.country,
      comment: fb.comment,
      rating: fb.rating,
    })),
  ];

  // Calculate aggregate rating
  const aggregateRating =
    allTestimonials.reduce((sum, t) => sum + t.rating, 0) / allTestimonials.length;

  // Transform testimonials to match Magic UI pattern
  const reviews = allTestimonials.map((testimonial) => {
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
  const handleFeedbackSubmit = (data: {
    name: string;
    country: string;
    comment: string;
    rating: number;
  }) => {
    const newFeedback: UserFeedback = {
      id: `user-${Date.now()}`,
      name: data.name,
      country: data.country,
      comment: data.comment,
      rating: data.rating,
      timestamp: Date.now(),
    };

    const updatedFeedbacks = [...userFeedbacks, newFeedback];
    setUserFeedbacks(updatedFeedbacks);
    localStorage.setItem("userFeedbacks", JSON.stringify(updatedFeedbacks));
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
                {aggregateRating.toFixed(1)} / 5.0
              </span>
              <span className="text-sm text-muted-foreground">
                ({allTestimonials.length} reviews)
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
     
        {reviews.length > 0 && (
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
        />
      </div>
    </section>
  );
}
