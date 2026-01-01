"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Hobby",
    price: "$99",
    period: "/month",
    description: "Perfect for solo travelers and small groups",
    features: [
      "Access to basic analytics reports",
      "Up to 10,000 data points per month",
      "Email support",
      "Community forum access",
      "Cancel anytime",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Promise",
    price: "$299",
    period: "/month",
    description: "Most popular choice for families and groups",
    features: [
      "Access to basic analytics reports",
      "Up to 10,000 data points per month",
      "Email support",
      "Community forum access",
      "Cancel anytime",
      "Access to basic analytics reports",
      "Up to 10,000 data points per month",
      "Email support",
      "Community forum access",
      "Cancel anytime",
    ],
    popular: true,
    cta: "Get Started",
  },
  {
    name: "Pro",
    price: "$199",
    period: "/month",
    description: "For serious travelers and tour operators",
    features: [
      "Access to basic analytics reports",
      "Up to 10,000 data points per month",
      "Email support",
      "Community forum access",
      "Cancel anytime",
    ],
    popular: false,
    cta: "Get Started",
  },
];

export function ModernPricing() {
  return (
    <section className="py-20 bg-gradient-to-b from-background via-slate-50 to-background dark:from-slate-900 dark:via-slate-800 dark:to-background">
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
              Pricing
            </span>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold text-foreground sm:text-5xl md:text-6xl font-serif">
            Simple Pricing for Everyone
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Here, we are going to make the middle one much more attractive than the rest of the pricing tiers so you buy what we want you to buy
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-primary to-accent text-white px-4 py-1">
                    Featured
                  </Badge>
                </div>
              )}
              <Card
                className={`h-full transition-all duration-300 hover:shadow-2xl ${
                  plan.popular
                    ? "border-2 border-primary shadow-xl bg-gradient-to-br from-primary/5 to-accent/5"
                    : "border border-border hover:border-primary/30"
                }`}
              >
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <CardDescription className="text-base">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button
                    asChild
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        : ""
                    }`}
                  >
                    <Link href="/contact">{plan.cta}</Link>
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

