"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Calendar, Users, MapPin, Check, X } from "lucide-react";
import { tours } from "@/lib/data";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ItineraryTimeline } from "@/components/sections/ItineraryTimeline";
import { motion } from "framer-motion";

export default function ToursPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(tours.map((t) => t.category)))];

  const filteredTours =
    selectedCategory === "All"
      ? tours
      : tours.filter((tour) => tour.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-5xl md:text-6xl">
            Tours & Packages
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Carefully crafted itineraries to help you experience the best of Sri Lanka. 
            All tours can be customized to your preferences.
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
            <TabsList className="flex flex-wrap justify-center gap-2 bg-neutral-100 dark:bg-neutral-900">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category} 
                  className="rounded-full data-[state=active]:bg-white dark:data-[state=active]:bg-neutral-800"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Tours Grid */}
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
              <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-neutral-200 dark:border-neutral-800">
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
                  <div className="mb-4 flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
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

                  <p className="mb-4 text-neutral-700 dark:text-neutral-300">{tour.description}</p>

                <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                      Highlights:
                    </h4>
                    <ul className="space-y-1">
                      {tour.highlights.slice(0, 3).map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                          <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
                      {tour.price}
                    </span>
                  {tour.priceNote && (
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {tour.priceNote}
                      </span>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {tour.destinations.slice(0, 4).map((dest) => (
                      <Badge
                        key={dest}
                        variant="outline"
                        className="text-xs border-neutral-300 dark:border-neutral-700"
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
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-3xl">{tour.name}</DialogTitle>
                        <DialogDescription>{tour.description}</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                            <div className="flex flex-wrap gap-4 text-sm text-neutral-600 dark:text-neutral-400">
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
                              <Badge variant="secondary">{tour.difficulty}</Badge>
                            )}
                            <Badge>{tour.category}</Badge>
                          </div>
                        </div>

                        <div>
                            <h3 className="mb-4 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                              Itinerary
                            </h3>
                          <ItineraryTimeline itinerary={tour.itinerary} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                              <h3 className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                                Includes
                              </h3>
                            <ul className="space-y-1">
                              {tour.includes.map((item, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                                  >
                                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {tour.excludes && tour.excludes.length > 0 && (
                            <div>
                                <h3 className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                                  Excludes
                                </h3>
                              <ul className="space-y-1">
                                {tour.excludes.map((item, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300"
                                    >
                                      <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div>
                            <h3 className="mb-2 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                              Best Time to Visit
                            </h3>
                            <p className="text-neutral-600 dark:text-neutral-400">{tour.bestTime}</p>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button asChild className="flex-1 group/btn">
                            <Link href="/contact">
                              Book This Tour
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="flex-1">
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

        {/* Custom Tour CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border-neutral-200 dark:border-neutral-800">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-neutral-800 dark:text-neutral-200">
                Don&apos;t see what you&apos;re looking for?
              </h2>
              <p className="mb-6 text-lg text-neutral-600 dark:text-neutral-400">
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
