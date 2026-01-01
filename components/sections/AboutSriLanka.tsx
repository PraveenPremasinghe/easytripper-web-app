"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function AboutSriLanka() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left side animation
      if (leftRef.current) {
        gsap.fromTo(
          leftRef.current,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leftRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Right side animation
      if (rightRef.current) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        if (titleRef.current) {
          tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            0
          );
        }

        if (headingRef.current) {
          tl.fromTo(
            headingRef.current,
            { opacity: 0, y: 20 },
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

        if (linkRef.current) {
          tl.fromTo(
            linkRef.current,
            { opacity: 0, scale: 0.9 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
            0.6
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Slogan */}
          <div ref={leftRef} className="space-y-2">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-[-0.02em]">
              Discover
              <br />
              <span className="text-primary">Extraordinary</span>
              <br />
              <span className="text-primary">Sri Lanka</span>
          </h2>
          </div>

          {/* Right Side - About Sri Lanka Content */}
          <div ref={rightRef} className="space-y-8">
            <div className="space-y-4">
              <h3 ref={titleRef} className="text-2xl md:text-3xl font-bold text-foreground leading-tight tracking-tight">
                A Tropical Paradise Awaits
              </h3>
              
              <p ref={headingRef} className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                Discover <span className="text-primary font-semibold">&quot;The Pearl of the Indian Ocean&quot;</span> with expert local guides
              </p>
                  </div>
            
            <p ref={textRef} className="text-base md:text-lg text-muted-foreground leading-[1.8] font-normal max-w-2xl">
              From pristine golden beaches to misty mountain peaks, ancient temples to wildlife safaris, Sri Lanka offers an 
              extraordinary journey through diverse landscapes and rich cultural heritage. Experience authentic Sri Lankan 
              hospitality as you explore UNESCO World Heritage sites, tea plantations, and vibrant local markets. Whether 
              you seek adventure, relaxation, or cultural immersion, our personalized tours ensure an unforgettable experience 
              in this captivating island nation.
            </p>

            <Link
              ref={linkRef}
              href="/about"
              className="inline-flex items-center gap-3 text-primary font-semibold text-base hover:gap-4 transition-all group mt-4"
            >
              ABOUT US
              <div className="w-7 h-7 rounded-full border-2 border-primary flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-colors">
                <ArrowRight className="h-4 w-4 text-primary group-hover:text-white transition-colors" />
              </div>
            </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
