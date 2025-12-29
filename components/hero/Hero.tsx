"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { AuroraBackground } from "@/components/aceternity/AuroraBackground";

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
      <AuroraBackground>
        <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 flex items-center justify-center gap-3"
            >
              <Badge className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary hover:bg-primary/20 border-primary/20 border backdrop-blur-sm tracking-wide uppercase">
                <Star className="w-3 h-3 mr-1.5 fill-primary" />
                Sri Lanka private tours for international travelers
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-serif">
                <span className="block relative h-12 sm:h-16 md:h-20 lg:h-24 mb-1">
                  {words.map((word, index) => (
                    <span
                      key={word}
                      className={`
                        absolute left-0 right-0 transition-all duration-500
                        ${
                          index === currentWord
                            ? "opacity-100 translate-y-0 blur-0"
                            : "opacity-0 translate-y-8 blur-sm pointer-events-none"
                        }
                      `}
                    >
                      {word}
                    </span>
                  ))}
                </span>
                <span className="block text-primary drop-shadow-sm italic">Sri Lanka</span>
              </h1>
              <div className="relative inline-block mt-2">
                <span className="relative z-10 block text-xl font-medium text-muted-foreground sm:text-2xl md:text-3xl font-sans tracking-tight">
                  Unforgettable Adventures Await
                </span>
                <span className="absolute bottom-1 left-0 right-0 h-2 bg-accent/20 -skew-x-12 rounded-full -z-10" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-10 max-w-xl text-base text-muted-foreground sm:text-lg leading-relaxed font-sans"
            >
              Land in Colombo (CMB) and travel Sri Lanka in comfort—culture, tea country, safaris, and beaches.
              We design custom routes and provide the right vehicle for your trip.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
            >
              <Button asChild size="lg" className="h-12 px-8 text-base rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300 w-full sm:w-auto">
                <Link href="/plan-your-trip">
                  Plan Your Trip
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base rounded-full border-2 hover:bg-muted/50 transition-all duration-300 w-full sm:w-auto">
                <Link href="/destinations">Explore Destinations</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </AuroraBackground>

     
    </>
  );
}

