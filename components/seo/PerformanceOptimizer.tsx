"use client";

import { useEffect } from "react";

/**
 * Performance Optimizer Component
 * Implements various performance optimizations to reduce DOM size and improve loading
 */
export function PerformanceOptimizer() {
  useEffect(() => {
    // Lazy load images that are below the fold
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute("data-src");
              observer.unobserve(img);
            }
          }
        });
      });

      // Observe all images with data-src attribute
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });

      return () => {
        imageObserver.disconnect();
      };
    }
  }, []);

  // Optimize font loading
  useEffect(() => {
    if ("fonts" in document) {
      document.fonts.ready.then(() => {
        document.documentElement.classList.add("fonts-loaded");
      });
    }
  }, []);

  return null;
}
