"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar, Users, Star, Award } from "lucide-react";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { StatisticsCounter } from "@/components/ui/statistics-counter";

const words = ["Explore", "Discover", "Experience", "Adventure"];

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop"
          alt="Sri Lanka landscape - Ancient temples, tea plantations, and pristine beaches"
          fill
          className="object-cover opacity-20 dark:opacity-10"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/60 to-background dark:via-background/80 dark:to-background" />
      </div>

      {/* Background Beams */}
      <BackgroundBeams />

      {/* Spotlight Effect */}
      <div
        className="absolute inset-0 z-[1] opacity-30 dark:opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(13, 148, 136, 0.15), transparent 50%)`,
        }}
      />
      <Spotlight
        className="top-40 left-1/2 -translate-x-1/2 md:left-1/2"
        fill="rgba(13, 148, 136, 0.1)"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 md:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Badge className="rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-white shadow-lg hover:shadow-xl transition-shadow">
              Expert Local Guide
            </Badge>
            <span className="text-sm text-muted-foreground">
              Personalized travel experiences across Sri Lanka
            </span>
          </motion.div>

          {/* Main Headline - SEO Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6"
          >
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif">
              <span className="block relative h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32">
                {words.map((word, index) => (
                  <span
                    key={word}
                    className={`
                      absolute left-0 right-0 transition-all duration-700 ease-in-out
                      ${
                        index === currentWord
                          ? "opacity-100 translate-y-0 scale-100"
                          : "opacity-0 translate-y-8 scale-95 pointer-events-none"
                      }
                    `}
                  >
                    {word}
                  </span>
                ))}
              </span>
              <span className="block text-primary mt-2 font-serif">Sri Lanka</span>
            </h1>
            <div className="relative inline-block mt-4">
              <span className="relative z-10 block text-xl font-semibold text-foreground sm:text-2xl md:text-3xl lg:text-4xl">
                Explore Sri Lanka with a Local Expert
              </span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-2 left-0 h-2 bg-accent/40 -skew-x-12 rounded-full"
              />
            </div>
          </motion.div>

          {/* SEO-Optimized Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-4 max-w-3xl text-base text-muted-foreground sm:text-lg md:text-xl"
          >
            Discover the Pearl of the Indian Ocean with personalized tours led by experienced local guides. 
            From UNESCO World Heritage Sites to pristine beaches, wildlife safaris to tea plantations—experience 
            authentic Sri Lankan culture, history, and natural beauty.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-10 max-w-2xl text-sm text-muted-foreground sm:text-base"
          >
            Trusted by travelers from Europe, UK, USA, Australia, and the Middle East
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="group rounded-full bg-accent px-8 py-6 text-base font-semibold hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              <Link href="/plan-your-trip">
                Plan Your Sri Lanka Trip
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-base border-2 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              <Link href="/destinations">Explore Destinations</Link>
            </Button>
          </motion.div>

          {/* Statistics Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4 max-w-3xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                <StatisticsCounter value={500} suffix="+" />
              </div>
              <p className="text-sm text-muted-foreground">Happy Tourists</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                <StatisticsCounter value={100} suffix="+" />
              </div>
              <p className="text-sm text-muted-foreground">Tours Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                <StatisticsCounter value={15} suffix="+" />
              </div>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                <StatisticsCounter value={50} suffix="+" />
              </div>
              <p className="text-sm text-muted-foreground">Destinations</p>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">TripAdvisor Certified</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-semibold">Google 5 Stars</span>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Island-wide coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>Private & group tours</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Flexible itineraries</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
