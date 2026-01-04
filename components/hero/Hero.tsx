"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MapPin, Award, Users, Calendar } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import type { Destination } from "@/lib/types";

// Destination Card Component for Marquee
const DestinationCard = ({
  image,
  name,
  region,
}: {
  image: string;
  name: string;
  region: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-80 w-60 sm:h-96 sm:w-72 md:h-[28rem] md:w-80 lg:h-[32rem] lg:w-96 cursor-pointer overflow-hidden rounded-xl border shadow-none",
        "border-gray-950/[.1] ]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "group transition-all duration-300 hover:scale-105"
      )}
    >
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <figcaption className="text-sm font-semibold text-white mb-1">
            {name}
          </figcaption>
          <p className="text-xs text-white/80">{region}</p>
        </div>
      </div>
    </figure>
  );
};

// Marquee 3D Component
const Marquee3D = ({ destinations }: { destinations: Destination[] }) => {
  // Duplicate destinations to ensure we have enough for 5 rows (at least 3-4 items per row)
  const duplicatedDestinations = [...destinations, ...destinations, ...destinations];

  // Create rows for 3D Marquee - ensure each row has at least 3 items
  const itemsPerRow = Math.max(3, Math.ceil(duplicatedDestinations.length / 5));
  const firstRow = duplicatedDestinations.slice(0, itemsPerRow);
  const secondRow = duplicatedDestinations.slice(itemsPerRow, itemsPerRow * 2);
  const thirdRow = duplicatedDestinations.slice(itemsPerRow * 2, itemsPerRow * 3);
  const fourthRow = duplicatedDestinations.slice(itemsPerRow * 3, itemsPerRow * 4);
  const fifthRow = duplicatedDestinations.slice(itemsPerRow * 4, itemsPerRow * 5);

  return (
    <div className="relative flex h-full w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:20s]">
          {firstRow.map((destination) => (
            <DestinationCard key={destination.slug} image={destination.image} name={destination.name} region={destination.region} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {secondRow.map((destination) => (
            <DestinationCard key={destination.slug} image={destination.image} name={destination.name} region={destination.region} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {thirdRow.map((destination) => (
            <DestinationCard key={destination.slug} image={destination.image} name={destination.name} region={destination.region} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:20s]" vertical>
          {fourthRow.map((destination) => (
            <DestinationCard key={destination.slug} image={destination.image} name={destination.name} region={destination.region} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]" vertical>
          {fifthRow.map((destination) => (
            <DestinationCard key={destination.slug} image={destination.image} name={destination.name} region={destination.region} />
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const res = await fetch("/api/firebase/destinations");
      const { success, data } = await res.json();
      if (success && Array.isArray(data)) {
        setDestinations(data);
      }
    } catch (error) {
      console.error("Failed to fetch destinations:", error);
    }
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Content animation
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contentRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Marquee animation
      if (marqueeRef.current) {
        gsap.fromTo(
          marqueeRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: marqueeRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Text animations
      const tl = gsap.timeline();

      if (taglineRef.current) {
        tl.fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.2
        );
      }

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          0.4
        );
      }

      if (subheadingRef.current) {
        tl.fromTo(
          subheadingRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.6
        );
      }

      if (buttonsRef.current) {
        const buttons = buttonsRef.current.children;
        tl.fromTo(
          buttons,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          0.8
        );
      }

      if (statsRef.current) {
        const stats = statsRef.current.children;
        gsap.fromTo(
          stats,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: statsRef.current,
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
    <section ref={sectionRef} className="relative  w-full overflow-hidden -mt-[97px] pt-[97px] bg-gradient-to-br from-background via-slate-50 to-background dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="relative z-10  mx-auto h-screen">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-20 lg:py-0">
          {/* Left Content Section */}
          <div ref={contentRef} className="flex flex-col justify-center space-y-8 lg:space-y-10 order-2 lg:order-1 px-20 ">
            {/* Tagline */}
           

            {/* Main Heading */}
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight"
            >
              Your Home, Your Journey,
              <br />
              <span className="text-primary">Your Hospitality Haven</span>
            </h1>

            {/* Subheading */}
            <p
              ref={subheadingRef}
              className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              Paradise. Where else do you find perfect beaches, ancient history, vibrant culture, 
              exotic cuisine and exciting wilderness in one tiny island? Come, let&apos;s explore Sri Lanka.
            </p>

            {/* CTA Buttons */}
            <div
              ref={buttonsRef}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                size="lg"
                className="group"
              >
                <Link href="/plan-your-trip">
                  Plan Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group"
              >
                <Link href="/destinations">
                  <MapPin className="mr-2 h-5 w-5" />
                  Explore Destinations
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">15+</span>
                </div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-5 w-5 text-primary" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">5000+</span>
                </div>
                <p className="text-sm text-muted-foreground">Happy Travelers</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-2xl md:text-3xl font-bold text-foreground">1000+</span>
                </div>
                <p className="text-sm text-muted-foreground">Tours Completed</p>
              </div>
            </div>
          </div>

          {/* Right Marquee 3D Section */}
          <div ref={marqueeRef} className="relative order-1 lg:order-2 h-[90vh] overflow-hidden">
            {destinations.length > 0 ? (
              <Marquee3D destinations={destinations} />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
                  <p className="text-muted-foreground">Loading destinations...</p>
                </div>
              </div>
            )}
            {/* Fade Gradients - All Sides - Subtle */}
            {/* <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-50 via-slate-50/50 to-transparent z-20 dark:from-slate-900 dark:via-slate-900/50"></div> */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-50 via-slate-50/50 to-transparent z-20 dark:from-slate-900 dark:via-slate-900/50"></div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-slate-50 via-slate-50/50 to-transparent z-20 dark:from-slate-900 dark:via-slate-900/50"></div>
            {/* <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-slate-50 via-slate-50/50 to-transparent z-20 dark:from-slate-900 dark:via-slate-900/50"></div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
