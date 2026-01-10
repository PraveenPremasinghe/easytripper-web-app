"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Vehicle } from "@/lib/types";
import { Users, Wind, CheckCircle2 } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-primary/20">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={vehicle.image}
            alt={`${vehicle.name} - ${vehicle.type} for ${vehicle.passengers} passengers`}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute top-4 right-4">
            <Badge className="bg-primary text-white shadow-lg">
              {vehicle.type}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="mb-2 text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-200">
            {vehicle.name}
          </h3>
          <p className="mb-4 text-muted-foreground line-clamp-2">
            {vehicle.description}
          </p>

          {/* Key Features */}
          <div className="mb-4 flex flex-wrap gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              <span>{vehicle.passengers} passengers</span>
            </div>
            {vehicle.airConditioned && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Wind className="h-4 w-4 text-primary" />
                <span>AC</span>
              </div>
            )}
          </div>

          {/* Ideal For */}
          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold text-foreground">Ideal for:</p>
            <div className="flex flex-wrap gap-2">
              {vehicle.idealFor.map((item, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs"
                >
                  {item}
                </Badge>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="mb-4">
            <p className="mb-2 text-sm font-semibold text-foreground">Features:</p>
            <ul className="space-y-1">
              {vehicle.features.slice(0, 4).map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {vehicle.priceRange && (
            <div className="pt-4 border-t">
              <p className="text-sm font-medium text-primary">{vehicle.priceRange}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
