"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoCard } from "@/components/ui/bento-grid";
import {
  Shield,
  MapPin,
  DollarSign,
  Clock,
  Heart,
  Users,
  Globe,
  Award,
} from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: Shield,
    title: "Reliable & Trusted",
    description:
      "10+ years of experience with hundreds of satisfied travelers. Licensed and insured professional guide.",
    className: "md:col-span-2",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      </div>
    ),
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Born and raised in Sri Lanka with deep knowledge of hidden gems, local culture, and the best routes.",
    className: "md:col-span-1",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
          alt="Sri Lanka"
          fill
          className="object-cover opacity-20"
        />
      </div>
    ),
  },
  {
    icon: DollarSign,
    title: "Fair Pricing",
    description:
      "Transparent, competitive rates with no hidden fees. Customized tours to fit your budget.",
    className: "md:col-span-1",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      </div>
    ),
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Available throughout your journey. Emergency assistance and flexible itinerary adjustments.",
    className: "md:col-span-2",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    ),
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description:
      "Tailored itineraries based on your interests, pace, and preferences. Your trip, your way.",
    className: "md:col-span-1",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-pink-500/20 to-pink-500/5 relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
          alt="Personalized"
          fill
          className="object-cover opacity-20"
        />
      </div>
    ),
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Intimate group sizes ensure personalized attention and authentic local experiences.",
    className: "md:col-span-1",
    header: (
      <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      </div>
    ),
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 bg-gradient-to-b from-background to-slate-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Why Choose Us
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl font-serif">
            Features so good you&apos;ll Love us
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Packed with everything you need for an unforgettable Sri Lanka adventure
          </p>
        </motion.div>

        <BentoGrid className="max-w-7xl mx-auto">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <BentoCard
                key={feature.title}
                className={feature.className}
                title={feature.title}
                description={feature.description}
                header={feature.header}
                icon={
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary border border-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                }
              />
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}

