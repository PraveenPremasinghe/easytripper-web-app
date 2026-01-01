"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users, MapPin, ArrowRight, Check } from "lucide-react";
import { tours } from "@/lib/data";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function ToursShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Grid items animation
      if (gridRef.current) {
        const items = gridRef.current.children;
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 50,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Link animation
      if (linkRef.current) {
        gsap.fromTo(
          linkRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: linkRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div ref={headerRef} className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Tours & Packages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Carefully crafted itineraries to help you experience the best of Sri Lanka
          </p>
        </div>

        <div ref={gridRef} className="grid gap-8 lg:grid-cols-2">
          {tours.slice(0, 4).map((tour) => (
            <div key={tour.id}>
              <Card className="group overflow-hidden border border-border hover:border-primary/50 bg-card hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="mb-2 bg-primary text-primary-foreground border-0 shadow-lg">{tour.category}</Badge>
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

                  <p className="mb-4 text-neutral-700 dark:text-neutral-300 line-clamp-2">
                    {tour.description}
                  </p>

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
                    {tour.destinations.slice(0, 3).map((dest) => (
                      <Badge
                        key={dest}
                        variant="outline"
                        className="text-xs border-neutral-300 dark:border-neutral-700"
                      >
                        <MapPin className="mr-1 h-3 w-3" />
                        {dest}
                      </Badge>
                    ))}
                    {tour.destinations.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{tour.destinations.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <Button
                    asChild
                    className="w-full group/btn shadow-lg hover:shadow-xl"
                  >
                    <Link href="/tours">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div ref={linkRef} className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/tours">
              View All Tours
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

