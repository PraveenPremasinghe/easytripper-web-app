import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Sri Lanka Destinations - Top Places to Visit | Easy Tripper",
  description: "Discover the best destinations in Sri Lanka. From ancient cities to pristine beaches, wildlife safaris to tea plantations. Plan your perfect Sri Lanka itinerary with our destination guide.",
  keywords: [
    "Sri Lanka destinations",
    "places to visit Sri Lanka",
    "Sri Lanka tourist attractions",
    "Sigiriya",
    "Ella",
    "Yala National Park",
    "Galle",
    "Nuwara Eliya",
  ],
  path: "/destinations",
});

export default function DestinationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

