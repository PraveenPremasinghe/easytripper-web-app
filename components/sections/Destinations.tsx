"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Eye } from "lucide-react";
import { destinations } from "@/lib/data";
import { Destination } from "@/lib/types";
import { DestinationQuickView } from "./DestinationQuickView";
import { toast } from "@/components/ui/toaster";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const regions = ["All", ...Array.from(new Set(destinations.map((d) => d.region)))];

export function Destinations() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [quickViewDestination, setQuickViewDestination] = useState<Destination | null>(null);
  const [wishlist, setWishlist] = useState<Destination[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const filteredDestinations =
    selectedRegion === "All"
      ? destinations.slice(0, 9)
      : destinations.filter((d) => d.region === selectedRegion).slice(0, 9);

  const isInWishlist = (destination: Destination) => {
    return wishlist.some((d) => d.slug === destination.slug);
  };

  const handleWishlistToggle = (destination: Destination) => {
    const updated = isInWishlist(destination)
      ? wishlist.filter((d) => d.slug !== destination.slug)
      : [...wishlist, destination];
    
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    
    toast.success(
      isInWishlist(destination) ? "Removed from wishlist" : "Added to wishlist",
      destination.name
    );
  };

  return (
    <section id="destinations" className="py-20 bg-gradient-to-b from-slate-50 via-background to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
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
              Destinations
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl font-serif">
            Explore Sri Lanka&apos;s Top Destinations
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            From ancient cities to pristine beaches, discover the best of the Pearl of the Indian Ocean
          </p>
        </motion.div>

        {/* Region Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <Tabs value={selectedRegion} onValueChange={setSelectedRegion} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2">
              {regions.map((region) => (
                <TabsTrigger key={region} value={region} className="rounded-full">
                  {region}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          key={selectedRegion}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filteredDestinations.map((destination) => (
            <motion.div key={destination.slug} variants={itemVariants}>
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] border border-border/50 hover:border-primary/30 relative bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <Badge className="absolute right-4 top-4 bg-primary/90 backdrop-blur-sm">
                    {destination.region}
                  </Badge>
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={(e) => {
                        e.preventDefault();
                        setQuickViewDestination(destination);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="bg-background/80 backdrop-blur-sm hover:bg-background"
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlistToggle(destination);
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isInWishlist(destination)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                    {destination.name}
                  </h3>
                  <p className="mb-4 text-muted-foreground line-clamp-2">
                    {destination.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/destinations/${destination.slug}`}
                      className="flex items-center text-primary group-hover:underline transition-all duration-200"
                    >
                      <span className="text-sm font-semibold">Learn more</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-2" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/destinations"
            className="inline-flex items-center text-lg font-medium text-primary hover:underline"
          >
            View all destinations
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>

      <DestinationQuickView
        destination={quickViewDestination}
        isOpen={!!quickViewDestination}
        onClose={() => setQuickViewDestination(null)}
        onWishlistToggle={handleWishlistToggle}
      />
    </section>
  );
}

