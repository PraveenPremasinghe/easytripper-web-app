import type { Metadata } from "next";
import { vehicles } from "@/lib/data";
import { VehicleCard } from "@/components/sections/VehicleCard";
import { motion } from "framer-motion";
import { Car, Users, Wind, Shield, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Vehicles & Transport Options | Professional Tour Guide Services in Sri Lanka",
  description: "Choose from our fleet of comfortable, air-conditioned vehicles including sedans, vans, luxury cars, and 4x4 safari jeeps. Professional drivers and guides for safe, comfortable travel across Sri Lanka.",
  keywords: [
    "Sri Lanka vehicle rental",
    "tour guide transport",
    "safari jeep Sri Lanka",
    "luxury travel Sri Lanka",
    "private driver Sri Lanka",
    "air-conditioned vehicles Sri Lanka"
  ],
  openGraph: {
    title: "Vehicles & Transport Options | Easy Tripper",
    description: "Professional vehicle fleet for touring Sri Lanka. Sedans, vans, luxury cars, and 4x4 safari jeeps with experienced drivers.",
    type: "website",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function VehiclesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
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

      {/* Trust Indicators */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Safe & Insured</h3>
              <p className="text-xs text-muted-foreground">All vehicles fully insured</p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                <Wind className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Air-Conditioned</h3>
              <p className="text-xs text-muted-foreground">Comfort in tropical climate</p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Professional Drivers</h3>
              <p className="text-xs text-muted-foreground">Experienced & licensed</p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex justify-center">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Island-Wide</h3>
              <p className="text-xs text-muted-foreground">Coverage across Sri Lanka</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-deep text-white">
        <div className="mx-auto max-w-4xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to Book Your Vehicle?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Contact us to discuss your transportation needs and get a customized quote 
            for your Sri Lanka tour. All vehicles come with professional drivers and 
            comprehensive insurance.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-white hover:bg-accent/90 shadow-lg hover:shadow-xl transition-all"
            >
              Get a Quote
            </a>
            <a
              href="/tours"
              className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
            >
              View Tour Packages
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
