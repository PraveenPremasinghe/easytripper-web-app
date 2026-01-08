import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Private Chauffeur Service & Vehicle Fleet | Easy Tripper",
  description: "Luxury vehicle fleet for private chauffeur service in Sri Lanka. Premium cars, SUVs, and vans with English-speaking drivers. Airport pickup, day tours, and multi-day trips available.",
  keywords: [
    "Sri Lanka chauffeur service",
    "Sri Lanka airport pickup",
    "private driver Sri Lanka",
    "luxury vehicles Sri Lanka",
    "Sri Lanka car rental with driver",
  ],
  path: "/vehicles",
});

export default function VehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

