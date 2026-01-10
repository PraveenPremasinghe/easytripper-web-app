"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Users, MapPin, Check, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ItineraryTimeline } from "@/components/sections/ItineraryTimeline";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import type { Tour } from "@/lib/types";
import { Loader } from "@/components/ui/loader";

// Note: Metadata export doesn't work with "use client" - will need to create separate metadata file
// For now, adding structured data and breadcrumbs

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/firebase/tours");
      const { success, data } = await res.json();
      if (success) {
        setTours(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", ...Array.from(new Set(tours.map((t) => t.category)))];

  const filteredTours =
    selectedCategory === "All"
      ? tours
      : tours.filter((tour) => tour.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 md:py-20 md:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Custom Tours", url: "/tours" }]} />
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800">
            Custom Sri Lanka Tours
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600">
            Create your perfect custom tour tailored to your interests, budget, and travel dates. 
            Every tour is personalized to give you the best Sri Lanka experience.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 flex justify-center"
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 bg-neutral-100">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category} 
                  className="rounded-full data-[state=active]:bg-white"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Tours Grid */}
        {loading ? (
          <div className="text-center py-12">
            <Loader size="md" text="Loading tours..." />
          </div>
        ) : filteredTours.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tours available yet.</p>
          </div>
        ) : (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 lg:grid-cols-2"
          >
            {filteredTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-neutral-200">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2 bg-white/90 text-neutral-900">{tour.category}</Badge>
                  <h3 className="text-2xl font-bold text-white">{tour.name}</h3>
                </div>
              </div>

              <CardContent className="p-6">
                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{tour.duration}</span>
                  </div>
                  {tour.groupSize && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      <span>{tour.groupSize}</span>
                    </div>
                  )}
                  {tour.difficulty && (
                      <Badge variant="secondary" className="text-xs">
                        {tour.difficulty}
                      </Badge>
                  )}
                </div>

                  <p className="mb-4 text-neutral-700">{tour.description}</p>

                <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-neutral-800">
                      Highlights:
                    </h4>
                    <ul className="space-y-1">
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-neutral-900">
                      {tour.price}
                    </span>
                  {tour.priceNote && (
                      <span className="text-sm text-neutral-600">
                        {tour.priceNote}
                      </span>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {tour.destinations.slice(0, 4).map((dest) => (
                      <Badge
                        key={dest}
                        variant="outline"
                        className="text-xs border-neutral-300"
                      >
                      <MapPin className="mr-1 h-3 w-3" />
                      {dest}
                    </Badge>
                  ))}
                  {tour.destinations.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{tour.destinations.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[95vh] overflow-hidden flex flex-col p-0">
                      <DialogHeader className="sr-only">
                        <DialogTitle>{tour.name}</DialogTitle>
                        <DialogDescription>{tour.description}</DialogDescription>
                      </DialogHeader>
                      {/* Tour Image Header */}
                      <div className="relative h-64 w-full overflow-hidden">
                        <Image
                          src={tour.image}
                          alt={tour.name}
                          fill
                          className="object-cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <div className="flex flex-wrap items-center gap-3 mb-3">
                            <Badge className="bg-white/90 text-neutral-900">{tour.category}</Badge>
                            {tour.difficulty && (
                              <Badge variant="secondary" className="bg-white/90">{tour.difficulty}</Badge>
                            )}
                            <div className="flex items-center gap-2 text-white text-sm">
                              <Calendar className="h-4 w-4" />
                              <span>{tour.duration}</span>
                            </div>
                            {tour.groupSize && (
                              <div className="flex items-center gap-2 text-white text-sm">
                                <Users className="h-4 w-4" />
                                <span>{tour.groupSize}</span>
                              </div>
                            )}
                          </div>
                          <h2 className="text-3xl font-bold text-white mb-2">{tour.name}</h2>
                          <p className="text-white/90 text-base">
                            {tour.description}
                          </p>
                        </div>
                      </div>

                      {/* Scrollable Content */}
                      <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                          {/* Price Section */}
                          <div className="flex items-baseline gap-3 pb-4 border-b">
                            <span className="text-4xl font-bold text-neutral-900">
                              {tour.price}
                            </span>
                            {tour.priceNote && (
                              <span className="text-sm text-neutral-600">
                                {tour.priceNote}
                              </span>
                            )}
                          </div>

                          {/* Highlights Section */}
                          {tour.highlights && tour.highlights.length > 0 && (
                            <div>
                              <h3 className="mb-3 text-xl font-semibold text-neutral-800">
                                Tour Highlights
                              </h3>
                              <ul className="grid gap-2 sm:grid-cols-2">
                                {tour.highlights.map((highlight, idx) => (
                                  <li key={idx} className="flex items-start gap-2 text-sm text-neutral-700">
                                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Destinations Section */}
                          {tour.destinations && tour.destinations.length > 0 && (
                            <div>
                              <h3 className="mb-3 text-xl font-semibold text-neutral-800">
                                Destinations
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {tour.destinations.map((dest) => (
                                  <Badge
                                    key={dest}
                                    variant="outline"
                                    className="text-sm border-neutral-300"
                                  >
                                    <MapPin className="mr-1 h-3 w-3" />
                                    {dest}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Itinerary Section */}
                          {tour.itinerary && tour.itinerary.length > 0 && (
                            <div>
                              <h3 className="mb-4 text-xl font-semibold text-neutral-800">
                                Detailed Itinerary
                              </h3>
                              <ItineraryTimeline itinerary={tour.itinerary} />
                            </div>
                          )}

                          {/* Includes & Excludes */}
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h3 className="mb-3 text-lg font-semibold text-neutral-800">
                                What&apos;s Included
                              </h3>
                              <ul className="space-y-2">
                                {tour.includes.map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2 text-sm text-neutral-700"
                                  >
                                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            {tour.excludes && tour.excludes.length > 0 && (
                              <div>
                                <h3 className="mb-3 text-lg font-semibold text-neutral-800">
                                  What&apos;s Not Included
                                </h3>
                                <ul className="space-y-2">
                                  {tour.excludes.map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2 text-sm text-neutral-700"
                                    >
                                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                      <span>{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>

                          {/* Best Time to Visit */}
                          {tour.bestTime && (
                            <div className="p-4 bg-neutral-50 rounded-lg">
                              <h3 className="mb-2 text-lg font-semibold text-neutral-800">
                                Best Time to Visit
                              </h3>
                              <p className="text-neutral-600">{tour.bestTime}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Fixed Footer with Action Buttons */}
                      <div className="border-t p-6 bg-white">
                        <div className="flex gap-3">
                          <Button asChild className="flex-1 group/btn" size="lg">
                            <Link href="/contact">
                              Book This Tour
                              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="flex-1" size="lg">
                            <Link href="/contact">Customize Tour</Link>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                    <Button asChild className="flex-1 group/btn">
                    <Link href="/contact">
                      Book Now
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            </motion.div>
            ))}
          </motion.div>
        )}

        {/* Custom Tour CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-neutral-50 to-neutral-100 border-neutral-200">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-800">
                Don&apos;t see what you&apos;re looking for?
              </h2>
              <p className="mb-6 text-lg text-neutral-600">
                We can create a completely customized itinerary based on your interests, 
                budget, and travel dates.
              </p>
              <Button asChild size="lg" className="group/btn">
                <Link href="/contact">
                  Request Custom Tour
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
