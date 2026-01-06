"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import { MapPin, Calendar, Users, Shield, Heart, Globe } from "lucide-react";
import Image from "next/image";

const features = [
  {
    title: "Local Expertise",
    description: "Born and raised in Sri Lanka with deep knowledge of hidden gems, local culture, and the best routes.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden border border-primary/20">
        <Image
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
          alt="Sri Lanka"
          fill
          className="object-cover opacity-20"
        />
      </div>
    ),
    icon: <MapPin className="h-5 w-5 text-primary" />,
    className: "md:col-span-2",
  },
  {
    title: "Personalized Service",
    description: "Tailored itineraries based on your interests, pace, and preferences. Your trip, your way.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 relative overflow-hidden border border-accent/20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      </div>
    ),
    icon: <Heart className="h-5 w-5 text-accent" />,
    className: "md:col-span-1",
  },
  {
    title: "24/7 Support",
    description: "Available throughout your journey. Emergency assistance and flexible itinerary adjustments.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden border border-primary/20">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      </div>
    ),
    icon: <Shield className="h-5 w-5 text-primary" />,
    className: "md:col-span-1",
  },
  {
    title: "Small Groups",
    description: "Intimate group sizes ensure personalized attention and authentic local experiences.",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 relative overflow-hidden border border-accent/20">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Group"
          fill
          className="object-cover opacity-20"
        />
      </div>
    ),
    icon: <Users className="h-5 w-5 text-accent" />,
    className: "md:col-span-2",
  },
];

export function FeaturesShowcase() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Features so good you&apos;ll Love us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Packed with everything you need for an unforgettable Sri Lanka adventure
          </p>
        </motion.div>
        <BentoGrid className="max-w-7xl mx-auto">
          {features.map((feature, i) => (
            <BentoCard
              key={i}
              title={feature.title}
              description={feature.description}
              header={feature.header}
              icon={feature.icon}
              className={feature.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

