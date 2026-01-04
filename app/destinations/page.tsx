"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Destination } from "@/lib/types";

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch("/api/firebase/destinations");
      const { success, data } = await res.json();
      if (success) {
        setDestinations(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-5xl md:text-6xl">
            All Destinations
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Discover the diverse beauty of Sri Lanka across all regions
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading destinations...</p>
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No destinations available yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination, index) => (
            <motion.div
              key={destination.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-neutral-200 dark:border-neutral-800">
              <Link href={`/destinations/${destination.slug}`}>
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <Badge className="absolute right-4 top-4 bg-white/90 text-neutral-900">
                    {destination.region}
                  </Badge>
                </div>
                <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-primary transition-colors">
                    {destination.name}
                  </h3>
                    <p className="mb-4 text-neutral-600 dark:text-neutral-400 line-clamp-2">
                    {destination.excerpt}
                  </p>
                  <div className="flex items-center text-primary group-hover:underline">
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Link>
            </Card>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
