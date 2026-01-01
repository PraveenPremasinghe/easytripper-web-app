"use client";

import { motion } from "framer-motion";
import { VehicleCard } from "@/components/sections/VehicleCard";
import { Vehicle } from "@/lib/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function VehiclesGrid({ vehicles }: { vehicles: Vehicle[] }) {
  return (
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
  );
}

