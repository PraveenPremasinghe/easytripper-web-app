"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  MapPin,
  DollarSign,
  Clock,
  Heart,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Reliable & Trusted",
    description:
      "10+ years of experience with hundreds of satisfied travelers. Licensed and insured professional guide.",
  },
  {
    icon: MapPin,
    title: "Local Expertise",
    description:
      "Born and raised in Sri Lanka with deep knowledge of hidden gems, local culture, and the best routes.",
  },
  {
    icon: DollarSign,
    title: "Fair Pricing",
    description:
      "Transparent, competitive rates with no hidden fees. Customized packages to fit your budget.",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description:
      "Available throughout your journey. Emergency assistance and flexible itinerary adjustments.",
  },
  {
    icon: Heart,
    title: "Personalized Service",
    description:
      "Tailored itineraries based on your interests, pace, and preferences. Your trip, your way.",
  },
  {
    icon: Users,
    title: "Small Groups",
    description:
      "Intimate group sizes ensure personalized attention and authentic local experiences.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl md:text-5xl">
            Why Choose Us
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Experience Sri Lanka with confidence and comfort
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div key={feature.title} variants={itemVariants}>
                <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

