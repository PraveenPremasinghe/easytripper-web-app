"use client";

import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

export function BlogHero() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="mb-4 flex justify-center">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Travel Blog & Guides
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Expert insights, comprehensive guides, and insider tips to help you discover 
            the best of Sri Lanka. From ancient heritage sites to wildlife encounters, 
            we share everything you need to plan an unforgettable journey.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

