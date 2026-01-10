"use client";

import { useEffect, useState } from "react";
import { VehiclesGrid } from "@/components/sections/VehiclesGrid";
import type { Vehicle } from "@/lib/types";
import { Loader } from "@/components/ui/loader";

export function VehiclesPageClient() {
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
        setVehicles(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12"><Loader size="md" text="Loading vehicles..." /></div>;
  }

  if (vehicles.length === 0) {
    return <div className="text-center py-12"><p className="text-muted-foreground">No vehicles available yet.</p></div>;
  }

  return <VehiclesGrid vehicles={vehicles} />;
}

