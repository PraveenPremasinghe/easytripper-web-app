"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { ImagesSlider } from "@/components/ui/images-slider";

const heroImages = [
  "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=1920&h=1080&fit=crop", // Yala Leopard
  "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop", // Sigiriya
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop", // Beach
  "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop", // Train
];

const words = ["Explore", "Discover", "Experience", "Adventure"];

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background">
      <ImagesSlider className="h-[90vh]" images={heroImages}>
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8 flex items-center justify-center gap-3"
            >
              <Badge className="rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white hover:bg-white/20 border-white/20 border backdrop-blur-md tracking-wide uppercase shadow-xl">
                <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
                World-Class Local Guide
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl font-serif drop-shadow-2xl">
                <span className="block relative h-16 sm:h-20 md:h-24 lg:h-32 mb-2">
                  {words.map((word, index) => (
                    <span
                      key={word}
                      className={`
                        absolute left-0 right-0 transition-all duration-700 ease-in-out
                        ${
                          index === currentWord
                            ? "opacity-100 translate-y-0 blur-0 scale-100"
                            : "opacity-0 translate-y-12 blur-md scale-90 pointer-events-none"
                        }
                      `}
                    >
                      {word}
                    </span>
                  ))}
                </span>
                <span className="block text-primary-foreground drop-shadow-lg italic">
                  Sri Lanka
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-white/90 sm:text-xl md:text-2xl font-light tracking-wide leading-relaxed drop-shadow-md">
                Your exclusive gateway to the pearl of the Indian Ocean.
                Customized luxury tours, private fleet, and unforgettable memories.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            >
              <Button asChild size="lg" className="h-14 px-10 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl hover:scale-105 transition-all duration-300 w-full sm:w-auto border-0">
                <Link href="/plan-your-trip">
                  Plan Your Trip
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white hover:scale-105 transition-all duration-300 w-full sm:w-auto">
                <Link href="/destinations">Explore Destinations</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </ImagesSlider>
    </section>
  );
}
