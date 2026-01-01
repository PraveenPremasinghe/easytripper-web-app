"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Waves, Mountain, Camera, BookOpen } from "lucide-react";

const travelStories = [
  {
    title: "Beach Holidays",
    description: "Discover Sri Lanka's Golden Coast",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
    href: "/experiences/beach",
  },
  {
    title: "Back Packing",
    description: "Rough It Out In Ceylon",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    href: "/experiences/backpacking",
  },
  {
    title: "History and Culture",
    description: "Rich History And Richer Culture",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    href: "/experiences/culture",
  },
  {
    title: "Misty Mountains",
    description: "Rolling hills of tea and jungle",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    href: "/experiences/mountains",
  },
  {
    title: "Safaris",
    description: "The Wild Side Of Sri Lanka",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
    href: "/experiences/safari",
  },
];

export function TravelStories() {
  return (
    <section className="py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Travel Stories
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelStories.map((story, index) => {
            const Icon = story.icon;
            return (
              <motion.div
                key={story.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-500"
              >
                <Link href={story.href} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className="p-3 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {story.description}
                    </p>
                    <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                      <span>Find out more</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
