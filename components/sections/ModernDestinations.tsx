"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { destinations } from "@/lib/data";
import { AnimatedCard } from "@/components/ui/animated-card";

export function ModernDestinations() {
  return (
    <section className="py-20 bg-muted/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Sri Lanka&apos;s Top Destinations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From ancient cities to pristine beaches, discover the best of the Pearl of the Indian Ocean
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((destination, index) => (
            <motion.div
              key={destination.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AnimatedCard>
                <Card className="group overflow-hidden border border-border hover:border-primary/50 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground border-0 shadow-lg">
                    {destination.region}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {destination.excerpt}
                  </p>
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-primary hover:underline group/link"
                  >
                    Learn more
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                  </CardContent>
                </Card>
              </AnimatedCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/destinations"
            className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-hover shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            View all destinations
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

