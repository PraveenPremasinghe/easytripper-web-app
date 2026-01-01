"use client";

import { motion } from "framer-motion";
import { StatisticsCounter } from "@/components/ui/statistics-counter";
import { TrendingUp, Users, MapPin, Award } from "lucide-react";

const stats = [
  {
    value: 19.4,
    suffix: "%",
    label: "Cheaper than competitors",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-500",
  },
  {
    value: 40,
    suffix: "%",
    label: "Less load consumption",
    icon: TrendingUp,
    color: "from-blue-500 to-cyan-500",
  },
  {
    value: 32,
    suffix: "%",
    label: "Times nobody picks up your calls",
    icon: Users,
    color: "from-purple-500 to-pink-500",
  },
  {
    value: 94.32,
    suffix: "%",
    label: "Uptime guaranteed",
    icon: Award,
    color: "from-amber-500 to-orange-500",
  },
];

export function ModernStats() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-background to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl font-serif">
            Scale with NO issues
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Easy Tripper can handle load times upto 99.99% of the times, the rest of the times GOD is against us.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-8 border border-border shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  <Icon className="h-7 w-7" />
                </div>

                {/* Value */}
                <div className="mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    <StatisticsCounter value={stat.value} suffix={stat.suffix} />
                  </span>
                </div>

                {/* Label */}
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>

                {/* Decorative Element */}
                <div className={`absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br ${stat.color} opacity-5 blur-2xl`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

