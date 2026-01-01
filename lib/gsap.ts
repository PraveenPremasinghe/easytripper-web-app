import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

// Utility functions for common animations
export const fadeInUp = (element: HTMLElement | string, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    }
  );
};

export const fadeIn = (element: HTMLElement | string, delay = 0) => {
  return gsap.fromTo(
    element,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1,
      delay,
      ease: "power2.out",
    }
  );
};

export const slideIn = (
  element: HTMLElement | string,
  direction: "left" | "right" | "up" | "down" = "left",
  delay = 0
) => {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: -100 },
    down: { x: 0, y: 100 },
  };

  return gsap.fromTo(
    element,
    {
      opacity: 0,
      ...directions[direction],
    },
    {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    }
  );
};

export const scaleIn = (element: HTMLElement | string, delay = 0) => {
  return gsap.fromTo(
    element,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      delay,
      ease: "back.out(1.7)",
    }
  );
};

export const staggerFadeIn = (
  elements: HTMLElement[] | string,
  delay = 0.1
) => {
  return gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: delay,
      ease: "power2.out",
    }
  );
};

export const parallaxScroll = (
  element: HTMLElement | string,
  speed = 0.5
) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
};

