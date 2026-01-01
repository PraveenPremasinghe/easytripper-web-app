"use client";

import { motion } from "framer-motion";

export function VehiclesHero() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Vehicles & Transport
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
            Travel in comfort and safety with our professional fleet of vehicles. 
            From compact cars to luxury vehicles and safari jeeps—we have the perfect 
            transport solution for your Sri Lanka adventure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

