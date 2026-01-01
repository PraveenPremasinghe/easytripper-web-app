"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Zap, Crown, Flame } from "lucide-react";

const tourCategories = [
  {
    title: "Amazing",
    description: "Discover the wonders of Sri Lanka",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    href: "/tours?category=amazing",
    color: "emerald",
  },
  {
    title: "Daring",
    description: "Adventure awaits the brave",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    href: "/tours?category=daring",
    color: "amber",
  },
  {
    title: "Indulging",
    description: "Luxury experiences for the discerning",
    icon: Crown,
    image: "https://images.unsplash.com/photo-1551632811-561732d7e6d0?w=800&h=600&fit=crop",
    href: "/tours?category=indulging",
    color: "purple",
  },
  {
    title: "Thrilling",
    description: "Heart-pounding adventures",
    icon: Flame,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop",
    href: "/tours?category=thrilling",
    color: "red",
  },
];

export function TourCategories() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Sri Lanka with Easy Tripper
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tourCategories.map((category, index) => {
            const Icon = category.icon;
            const colorClasses = {
              emerald: "from-emerald-500 to-teal-500",
              amber: "from-amber-500 to-orange-500",
              purple: "from-purple-500 to-pink-500",
              red: "from-red-500 to-rose-500",
            };
            
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.03 }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                <Link href={category.href} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[category.color as keyof typeof colorClasses]}/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="absolute top-4 left-4">
                      <div className={`p-3 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 text-primary`} />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {category.description}
                    </p>
                    <div className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                      <span>View more Tours</span>
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

