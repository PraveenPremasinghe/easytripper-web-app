"use client";

import { motion } from "framer-motion";
import { Award, Star, Globe, Shield, Users, Heart } from "lucide-react";

const badges = [
  {
    icon: Award,
    title: "TripAdvisor Certified",
    description: "Top-rated guide",
  },
  {
    icon: Star,
    title: "4.9/5 Rating",
    description: "From 500+ reviews",
  },
  {
    icon: Globe,
    title: "Worldwide Travelers",
    description: "From 50+ countries",
  },
  {
    icon: Shield,
    title: "Licensed & Insured",
    description: "Fully certified",
  },
  {
    icon: Users,
    title: "15+ Years Experience",
    description: "Expert local guide",
  },
  {
    icon: Heart,
    title: "100% Satisfaction",
    description: "Money-back guarantee",
  },
];

export function TrustBadges() {
  return (
    <section className="py-20 bg-muted/20 dark:bg-slate-800/30 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have experienced Sri Lanka with us
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-card p-8 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {badge.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {badge.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

