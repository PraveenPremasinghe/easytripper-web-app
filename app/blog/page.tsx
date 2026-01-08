import type { Metadata } from "next";
import { BlogHero } from "@/components/sections/BlogHero";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogPageClient } from "./client";
import { generatePageMetadata, TARGET_COUNTRIES } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Sri Lanka Travel Blog & Guides | Expert Travel Tips",
  description: "Comprehensive travel guides, destination insights, and expert tips for exploring Sri Lanka. From cultural heritage to wildlife safaris, discover everything you need to plan your perfect trip. Expert advice for travelers from India, Switzerland, Netherlands, Germany, and Sweden.",
  keywords: [
    "Sri Lanka travel blog",
    "Sri Lanka travel guides",
    "Sri Lanka travel tips",
    "Sri Lanka destinations",
    "travel guide Sri Lanka",
    "Sri Lanka blog",
    "best time to visit Sri Lanka",
    "Sri Lanka itinerary",
    "Sri Lanka travel cost",
    "Sri Lanka travel information",
    "Sri Lanka travel advice",
  ],
  path: "/blog",
  image: "/images/og-image.jpg",
  targetCountries: TARGET_COUNTRIES.map((c) => c.code),
});

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <BlogHero />

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <BlogPageClient />
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 md:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Why Read Our Sri Lanka Travel Blog?
            </h2>
            <p className="text-muted-foreground mb-4">
              Our travel blog is written by local expert guides who have spent years exploring 
              every corner of Sri Lanka. We provide authentic, first-hand insights that go beyond 
              typical tourist information.
            </p>
            <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
              What You&apos;ll Find Here
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Destination Guides:</strong> In-depth information about Sri Lanka&apos;s top destinations, from UNESCO World Heritage Sites to hidden gems</li>
              <li><strong className="text-foreground">Travel Tips:</strong> Practical advice on everything from visa requirements to cultural etiquette</li>
              <li><strong className="text-foreground">Wildlife Guides:</strong> Expert information about national parks, safaris, and wildlife encounters</li>
              <li><strong className="text-foreground">Cultural Insights:</strong> Learn about Sri Lankan culture, traditions, and local customs</li>
              <li><strong className="text-foreground">Food Guides:</strong> Discover the best local dishes and where to find authentic Sri Lankan cuisine</li>
              <li><strong className="text-foreground">Seasonal Advice:</strong> Know the best times to visit different regions based on weather and events</li>
            </ul>
            <p className="text-muted-foreground mt-6">
              Whether you&apos;re planning your first trip to Sri Lanka or looking to explore new 
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
            <Button
              asChild
              size="lg"
            >
              <Link href="/contact">
                Plan Your Trip
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 hover:text-white"
            >
              <Link href="/tours">
                View Custom Tours
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
