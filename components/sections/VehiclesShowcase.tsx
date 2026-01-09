"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VehiclesGrid } from "@/components/sections/VehiclesGrid";
import type { Vehicle } from "@/lib/types";

export function VehiclesShowcase() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/firebase/vehicles");
      const { success, data } = await res.json();
      if (success) {
        // Get latest 6 vehicles
        const latestVehicles = (data || []).slice(0, 6);
        setVehicles(latestVehicles);
      }
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Vehicle Fleet
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Travel in comfort and style with our modern, well-maintained vehicles. 
            From luxury sedans to spacious SUVs, we have the perfect vehicle for your journey.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading vehicles...</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No vehicles available yet.</p>
            <Link 
              href="/vehicles" 
              className="text-primary hover:underline mt-4 inline-block"
            >
              View all vehicles
            </Link>
          </div>
        ) : (
          <>
            <VehiclesGrid vehicles={vehicles} />
            {vehicles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-center mt-12"
              >
                <Button asChild size="lg" variant="outline" className="group">
                  <Link href="/vehicles">
                    View All Vehicles
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
