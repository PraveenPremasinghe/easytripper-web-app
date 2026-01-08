import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Plan Your Trip - Custom Sri Lanka Itinerary Builder | Easy Tripper",
  description: "Create your perfect custom Sri Lanka tour itinerary. Design your personalized tour with our interactive trip planner. Choose destinations, activities, and duration. Get instant quotes for your custom tour.",
  keywords: [
    "Sri Lanka travel itinerary",
    "custom Sri Lanka tours",
    "plan Sri Lanka trip",
    "Sri Lanka itinerary builder",
  ],
  path: "/plan-your-trip",
});

export default function PlanYourTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

