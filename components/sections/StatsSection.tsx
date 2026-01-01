"use client";

import { useEffect, useRef } from "react";
import { Award, Users, Building2, Car } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const features = [
  {
    title: "Over 15 Years In Business",
    icon: Building2,
  },
  {
    title: "Best Guides",
    icon: Users,
  },
  {
    title: "Our Own Fleet of Vehicles",
    icon: Car,
  },
  {
    title: "Specialist Teams",
    icon: Award,
  },
];

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      if (headingRef.current) {
        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
          0
        );
      }

      if (subheadingRef.current) {
        tl.fromTo(
          subheadingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.2
        );
      }

      if (textRef.current) {
        tl.fromTo(
          textRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.4
        );
      }

      if (featuresRef.current) {
        const featureItems = featuresRef.current.children;
        tl.fromTo(
          featureItems,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          0.6
        );
      }

      if (buttonRef.current) {
        tl.fromTo(
          buttonRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" },
          1
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="text-center mb-20">
          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Welcome to Easy Tripper
          </h2>
          <h3 ref={subheadingRef} className="text-3xl md:text-4xl font-bold text-primary mb-6">
            The Home of Sri Lankan Hospitality
          </h3>
          <p ref={textRef} className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            Paradise. Where else do you find perfect beaches, ancient history, vibrant culture, 
            exotic cuisine and exciting wilderness in one tiny island? Come, let&apos;s explore Sri Lanka.
          </p>
          <div ref={featuresRef} className="flex flex-wrap justify-center gap-6 mb-12">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-lg bg-muted border border-border"
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-semibold text-foreground">{feature.title}</span>
                </div>
              );
            })}
          </div>
          <div ref={buttonRef}>
            <Button asChild size="lg">
              <Link href="/about">
                Learn More About us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
