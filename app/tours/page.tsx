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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl">
            Tours & Packages
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Carefully crafted itineraries to help you experience the best of Sri Lanka. 
            All tours can be customized to your preferences.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="rounded-full">
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
          {filteredTours.map((tour) => (
            <Card
              key={tour.id}
              className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="mb-2">{tour.category}</Badge>
                  <h3 className="text-2xl font-bold text-white">{tour.name}</h3>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                </div>

                <p className="mb-4 text-foreground">{tour.description}</p>

                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-foreground">Highlights:</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {tour.highlights.slice(0, 3).map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-4 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">{tour.price}</span>
                  {tour.priceNote && (
                    <span className="text-sm text-muted-foreground">{tour.priceNote}</span>
                  )}
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {tour.destinations.slice(0, 4).map((dest) => (
                    <Badge key={dest} variant="outline" className="text-xs">
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
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                          <h3 className="mb-4 text-xl font-semibold text-foreground">Itinerary</h3>
                          <ItineraryTimeline itinerary={tour.itinerary} />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h3 className="mb-2 text-xl font-semibold text-foreground">Includes</h3>
                            <ul className="space-y-1">
                              {tour.includes.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {tour.excludes && tour.excludes.length > 0 && (
                            <div>
                              <h3 className="mb-2 text-xl font-semibold text-foreground">Excludes</h3>
                              <ul className="space-y-1">
                                {tour.excludes.map((item, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="mb-2 text-xl font-semibold text-foreground">Best Time to Visit</h3>
                          <p className="text-muted-foreground">{tour.bestTime}</p>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Button asChild className="flex-1">
                            <Link href="/contact">
                              Book This Tour
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                          <Button asChild variant="outline" className="flex-1">
                            <Link href="/contact">Customize Tour</Link>
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button asChild className="flex-1">
                    <Link href="/contact">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Tour CTA */}
        <div className="mt-12">
          <Card className="bg-gradient-to-r from-primary/10 via-background to-accent/10">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-foreground">
                Don&apos;t see what you&apos;re looking for?
              </h2>
              <p className="mb-6 text-lg text-muted-foreground">
                We can create a completely customized itinerary based on your interests, 
                budget, and travel dates.
              </p>
              <Button asChild size="lg">
                <Link href="/contact">
                  Request Custom Tour
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

