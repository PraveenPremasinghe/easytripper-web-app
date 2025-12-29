import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, MapPin, Check, X } from "lucide-react";
import { tours } from "@/lib/data";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tours & Packages",
  description: "Discover our curated tour packages for exploring Sri Lanka - from cultural adventures to beach getaways",
};

export default function ToursPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-white">
      <JsonLd
        id="ld-breadcrumb-tours"
        data={breadcrumbJsonLd([
          { name: "Home", url: absoluteUrl("/") },
          { name: "Tours", url: absoluteUrl("/tours") },
        ])}
      />
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-900 sm:text-5xl md:text-6xl">
            Tours & Packages
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600">
            Carefully crafted itineraries to help you experience the best of Sri Lanka. 
            All tours can be customized to your preferences.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {tours.map((tour) => (
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
                <div className="mb-4 flex flex-wrap gap-4 text-sm text-slate-600">
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

                <p className="mb-4 text-slate-700">{tour.description}</p>

                <div className="mb-4">
                  <h4 className="mb-2 font-semibold text-slate-900">Highlights:</h4>
                  <ul className="space-y-1 text-sm text-slate-600">
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
                    <span className="text-sm text-slate-500">{tour.priceNote}</span>
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
                          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
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
                          <h3 className="mb-2 text-xl font-semibold">Itinerary</h3>
                          <ul className="space-y-2">
                            {tour.itinerary.map((day, index) => (
                              <li key={index} className="flex items-start gap-3 text-slate-700">
                                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                                  {index + 1}
                                </span>
                                <span>{day}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div>
                            <h3 className="mb-2 text-xl font-semibold">Includes</h3>
                            <ul className="space-y-1">
                              {tour.includes.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {tour.excludes && tour.excludes.length > 0 && (
                            <div>
                              <h3 className="mb-2 text-xl font-semibold">Excludes</h3>
                              <ul className="space-y-1">
                                {tour.excludes.map((item, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-600" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="mb-2 text-xl font-semibold">Best Time to Visit</h3>
                          <p className="text-slate-700">{tour.bestTime}</p>
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
          <Card className="bg-gradient-to-r from-emerald-50 to-amber-50">
            <CardContent className="p-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-slate-900">
                Don&apos;t see what you&apos;re looking for?
              </h2>
              <p className="mb-6 text-lg text-slate-600">
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

