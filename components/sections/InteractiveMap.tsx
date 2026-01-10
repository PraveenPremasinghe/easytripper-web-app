"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import type { Destination } from "@/lib/types";
import { Loader } from "@/components/ui/loader";

export function InteractiveMap() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredDestination, setHoveredDestination] = useState<string | null>(null);

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

  const popularDestinations = destinations.slice(0, 6);

  return (
    <section className="py-20 bg-muted/20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Explore Sri Lanka on the Map
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click on any destination to learn more about what makes it special
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <Loader size="md" text="Loading destinations..." />
          </div>
        ) : popularDestinations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No destinations available yet.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map Preview */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden bg-muted border border-border shadow-lg"
            >
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop')] bg-cover bg-center opacity-30" />
              <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
              
              {/* Interactive Points */}
              {popularDestinations.map((dest, index) => {
              const positions = [
                { top: "20%", left: "30%" },
                { top: "40%", left: "50%" },
                { top: "60%", left: "35%" },
                { top: "70%", left: "60%" },
                { top: "50%", left: "70%" },
                { top: "30%", left: "80%" },
              ];
              
              const isHovered = hoveredDestination === dest.slug;
              
              return (
                <motion.div
                  key={dest.slug}
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1.2 : 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="absolute cursor-pointer group"
                  style={positions[index]}
                  onMouseEnter={() => setHoveredDestination(dest.slug)}
                  onMouseLeave={() => setHoveredDestination(null)}
                >
                  <div className="relative">
                    <motion.div
                      animate={{
                        scale: isHovered ? [1, 1.5, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-primary/30"
                    />
                    <div className="relative w-4 h-4 rounded-full bg-primary border-2 border-white shadow-lg" />
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-lg bg-white text-neutral-900 text-sm font-medium shadow-lg border border-neutral-200"
                      >
                        {dest.name}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Destination List */}
          <div className="space-y-4">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={destination.slug}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredDestination(destination.slug)}
                onMouseLeave={() => setHoveredDestination(null)}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border border-border hover:border-primary/50 bg-card cursor-pointer hover:-translate-y-1">
                  <Link href={`/destinations/${destination.slug}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <MapPin className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                              {destination.name}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {destination.region}
                            </Badge>
                          </div>
                          <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                            {destination.excerpt}
                          </p>
                          <div className="flex items-center text-sm font-semibold text-primary hover:underline transition-all">
                            <span>Explore</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

