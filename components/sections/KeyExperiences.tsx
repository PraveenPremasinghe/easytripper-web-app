"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Waves, Mountain, Camera, BookOpen, Utensils, Backpack, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Beach Holidays",
    description: "Discover Sri Lanka's Golden Coast",
    icon: Waves,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop",
    href: "/experiences/beach",
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Misty Mountains",
    description: "Rolling hills of tea and jungle",
    icon: Mountain,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    href: "/experiences/mountains",
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Safaris",
    description: "The Wild Side Of Sri Lanka",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&h=400&fit=crop",
    href: "/experiences/safari",
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "History and Culture",
    description: "Rich History And Richer Culture",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    href: "/experiences/culture",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Foodie Travel",
    description: "Savor authentic Sri Lankan cuisine",
    icon: Utensils,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop",
    href: "/experiences/food",
    color: "from-rose-500 to-red-500",
  },
  {
    title: "Back Packing",
    description: "Rough It Out In Ceylon",
    icon: Backpack,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
    href: "/experiences/backpacking",
    color: "from-green-500 to-emerald-500",
  },
];

export function KeyExperiences() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Things to do in Sri Lanka
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We want to share Sri Lanka&apos;s extraordinarily diverse and authentic story with the rest of the world. 
            Discover the many thousands of different ways in which you can fall in love with our home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => {
            const Icon = experience.icon;
            return (
              <motion.div
                key={experience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <Link href={experience.href} className="block">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    <div className="absolute top-4 left-4">
                      <div className={`p-3 rounded-xl bg-white/90 backdrop-blur-sm ${experience.color.replace('from-', 'text-').replace('to-', '')} shadow-lg`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {experience.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {experience.description}
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

