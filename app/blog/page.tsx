import type { Metadata } from "next";
import { blogPosts } from "@/lib/data";
import { BlogCard } from "@/components/sections/BlogCard";
import { motion } from "framer-motion";
import { BookOpen, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Travel Blog & Guides | Expert Sri Lanka Travel Tips & Destination Guides",
  description: "Comprehensive travel guides, destination insights, and expert tips for exploring Sri Lanka. From cultural heritage to wildlife safaris, discover everything you need to plan your perfect trip.",
  keywords: [
    "Sri Lanka travel blog",
    "Sri Lanka travel guides",
    "Sri Lanka travel tips",
    "Sri Lanka destinations",
    "travel guide Sri Lanka",
    "Sri Lanka blog"
  ],
  openGraph: {
    title: "Travel Blog & Guides | Easy Tripper",
    description: "Expert travel guides and tips for exploring Sri Lanka",
    type: "website",
  },
};

const categories = ["All", "Travel Guide", "Destination", "Culture", "Wildlife", "Food", "Tips"] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
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

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Why Read Our Sri Lanka Travel Blog?
            </h2>
            <p className="text-muted-foreground mb-4">
              Our travel blog is written by local expert guides who have spent years exploring 
              every corner of Sri Lanka. We provide authentic, first-hand insights that go beyond 
              typical tourist information.
            </p>
            <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              What You'll Find Here
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Destination Guides:</strong> In-depth information about Sri Lanka's top destinations, from UNESCO World Heritage Sites to hidden gems</li>
              <li><strong className="text-foreground">Travel Tips:</strong> Practical advice on everything from visa requirements to cultural etiquette</li>
              <li><strong className="text-foreground">Wildlife Guides:</strong> Expert information about national parks, safaris, and wildlife encounters</li>
              <li><strong className="text-foreground">Cultural Insights:</strong> Learn about Sri Lankan culture, traditions, and local customs</li>
              <li><strong className="text-foreground">Food Guides:</strong> Discover the best local dishes and where to find authentic Sri Lankan cuisine</li>
              <li><strong className="text-foreground">Seasonal Advice:</strong> Know the best times to visit different regions based on weather and events</li>
            </ul>
            <p className="text-muted-foreground mt-6">
              Whether you're planning your first trip to Sri Lanka or looking to explore new 
              destinations on the island, our blog provides the knowledge and inspiration you 
              need for an unforgettable travel experience.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-deep text-white">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to Experience Sri Lanka?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Let us help you create a customized itinerary based on our expert knowledge 
            and local insights. Contact us to start planning your perfect Sri Lanka adventure.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-white hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
            >
              Plan Your Trip
            </Link>
            <Link
              href="/tours"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              View Tour Packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
