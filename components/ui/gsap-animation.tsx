"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface GSAPAnimationProps {
  children: ReactNode;
  animation?: "fadeInUp" | "fadeIn" | "slideIn" | "scaleIn";
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  trigger?: boolean;
  className?: string;
}

export function GSAPAnimation({
  children,
  animation = "fadeInUp",
  direction = "left",
  delay = 0,
  duration = 1,
  trigger = true,
  className = "",
}: GSAPAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    let anim: gsap.core.Tween;

    if (trigger) {
      // Use ScrollTrigger for scroll-based animations
      anim = gsap.fromTo(
        element,
        {
          opacity: 0,
          y: animation === "fadeInUp" ? 50 : 0,
          x: animation === "slideIn" ? (direction === "left" ? -100 : 100) : 0,
          scale: animation === "scaleIn" ? 0.8 : 1,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    } else {
      // Immediate animation
      anim = gsap.fromTo(
        element,
        {
          opacity: 0,
          y: animation === "fadeInUp" ? 50 : 0,
          x: animation === "slideIn" ? (direction === "left" ? -100 : 100) : 0,
          scale: animation === "scaleIn" ? 0.8 : 1,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
        }
      );
    }

    return () => {
      anim?.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animation, direction, delay, duration, trigger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

