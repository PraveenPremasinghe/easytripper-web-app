"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { topTravelPlaces } from "@/lib/data";

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
    <>
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#FAF8F3]">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
            alt="Sri Lanka landscape"
            fill
            className="object-cover opacity-10"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center justify-center gap-3"
            >
              <Badge className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white shadow-lg">
                Expert Guide
              </Badge>
              <span className="text-sm text-[#57534E]">
                Personalized travel experiences in Sri Lanka
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-[#1C1917] sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block relative h-16 sm:h-20 md:h-24 lg:h-28">
                  {words.map((word, index) => (
                    <span
                      key={word}
                      className={`
                        absolute left-0 right-0 transition-all duration-500
                        ${
                          index === currentWord
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-4 pointer-events-none"
                        }
                      `}
                    >
                      {word}
                    </span>
                  ))}
                </span>
                <span className="block text-primary">Sri Lanka</span>
              </h1>
              <div className="relative inline-block">
                <span className="relative z-10 block text-2xl font-semibold text-[#1C1917] sm:text-3xl md:text-4xl">
                  Unforgettable Adventures Await!
                </span>
                <span className="absolute bottom-2 left-0 right-0 h-1.5 bg-accent/40 -skew-x-12 rounded-full" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-4 max-w-2xl text-lg text-[#57534E] sm:text-xl"
            >
              Dive into a world of culture, nature, and adventure with our collection of
              incredible Sri Lankan experiences!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mb-10 max-w-2xl text-lg text-[#57534E]"
            >
              From ancient temples to pristine beaches, from wildlife safaris to tea
              plantations
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button asChild size="lg" className="group rounded-full bg-accent px-8 py-6 text-base font-semibold hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all">
                <Link href="/contact">
                  Plan Your Trip
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-base">
                <Link href="/destinations">Explore Destinations</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

     
    </>
  );
}

