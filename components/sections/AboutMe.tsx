"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Languages, MapPin } from "lucide-react";
import Link from "next/link";

export function AboutMe() {
  return (
    <section id="about-me" className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            About Your Guide
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Meet Jagath Premasinghe, your expert local guide
          </p>
        </motion.div>

        <div className="flex justify-center">
          <Card className="max-w-4xl overflow-hidden shadow-xl">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Image */}
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&facepad=2"
                  alt="Jagath Premasinghe"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <CardContent className="flex flex-col justify-center p-8">
                <h3 className="mb-2 text-2xl font-bold text-foreground">
                  Jagath Premasinghe
                </h3>
                <p className="mb-6 text-muted-foreground">
                  Professional Tour Guide & Travel Consultant
                </p>

                <p className="mb-6 leading-relaxed text-muted-foreground">
                  With over 10 years of experience guiding travelers through Sri Lanka,
                  I&apos;m passionate about sharing the beauty, culture, and hidden gems of
                  my homeland. I specialize in creating personalized itineraries that
                  combine must-see attractions with authentic local experiences.
                </p>

                <p className="mb-6 leading-relaxed text-muted-foreground">
                  Whether you&apos;re interested in ancient history, wildlife safaris, beach
                  relaxation, or mountain adventures, I&apos;ll ensure your journey is
                  unforgettable. My goal is to make you feel like a local, not just a
                  tourist.
                </p>

                {/* Badges */}
                <div className="mb-6 flex flex-wrap gap-3">
                  <Badge variant="default" className="gap-2 px-4 py-2">
                    <Award className="h-4 w-4" />
                    10+ Years Experience
                  </Badge>
                  <Badge variant="default" className="gap-2 px-4 py-2">
                    <Languages className="h-4 w-4" />
                    English & Sinhala
                  </Badge>
                  <Badge variant="default" className="gap-2 px-4 py-2">
                    <MapPin className="h-4 w-4" />
                    Island-wide Tours
                  </Badge>
                </div>

                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

