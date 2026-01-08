import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Custom Sri Lanka Tours - Private Tours & Personalized Itineraries",
  description: "Create your perfect custom Sri Lanka tour with private chauffeur service. Personalized itineraries tailored to your interests, budget, and travel dates. Luxury vehicles, expert guides, and unforgettable experiences. Design your custom tour today.",
  keywords: [
    "custom Sri Lanka tours",
    "private tours Sri Lanka",
    "personalized Sri Lanka tours",
    "Sri Lanka travel itinerary",
    "luxury Sri Lanka tours",
    "custom tour Sri Lanka",
  ],
  path: "/tours",
});

export default function ToursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
