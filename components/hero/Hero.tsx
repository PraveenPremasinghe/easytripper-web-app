"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, MapPin, Award, Users, Calendar } from "lucide-react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageRef.current,
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
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden -mt-[97px] pt-[97px]">
      {/* Full Background Image - Extends behind TopBar, Header, and Hero Only */}
      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Sri Lanka"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20 lg:py-0">
          {/* Content Section */}
          <div ref={contentRef} className="flex flex-col justify-center space-y-8 lg:space-y-10 order-2 lg:order-1">
            {/* Tagline */}
            <p
              ref={taglineRef}
              className="text-base md:text-lg text-white/90 font-semibold uppercase tracking-wider"
            >
              Your Trusted Guide to Sri Lanka
            </p>

            {/* Main Heading */}
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight"
            >
              Your Home, Your Journey,
              <br />
              <span className="text-accent">Your Hospitality Haven</span>
            </h1>

            {/* Subheading */}
            <p
              ref={subheadingRef}
              className="text-lg md:text-xl text-white/90 max-w-xl leading-relaxed"
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
                className="group border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50"
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
              className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20"
            >
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="text-2xl md:text-3xl font-bold text-white">15+</span>
                </div>
                <p className="text-sm text-white/80">Years Experience</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-5 w-5 text-accent" />
                  <span className="text-2xl md:text-3xl font-bold text-white">5000+</span>
                </div>
                <p className="text-sm text-white/80">Happy Travelers</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span className="text-2xl md:text-3xl font-bold text-white">1000+</span>
                </div>
                <p className="text-sm text-white/80">Tours Completed</p>
              </div>
            </div>
          </div>

          {/* Guide Image Section */}
          <div ref={imageRef} className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl">
              {/* Main Guide Image */}
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
                alt="Jagath Premasinghe - Your Trusted Guide"
                fill
                className="object-cover"
                priority
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Badge/Info Card */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                        alt="Jagath"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-sm md:text-base">Jagath Premasinghe</h3>
                      <p className="text-xs md:text-sm text-muted-foreground">Professional Tour Guide</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4 text-accent" />
                      <span className="text-xs font-semibold text-foreground">15+ Years</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-6 right-6 w-16 h-16 bg-primary/10 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-primary/20">
                <Award className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-4 -left-4 hidden lg:block">
              <div className="bg-white rounded-xl p-4 shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">5000+</p>
                    <p className="text-xs text-muted-foreground">Happy Travelers</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 hidden lg:block">
              <div className="bg-white rounded-xl p-4 shadow-xl border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">1000+</p>
                    <p className="text-xs text-muted-foreground">Tours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
