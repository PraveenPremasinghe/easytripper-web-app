import type { Metadata } from "next";
import { generatePageMetadata, SITE_URL, TARGET_COUNTRIES } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Sri Lanka Tour Packages - Private Tours & Custom Itineraries",
  description: "Discover our comprehensive range of Sri Lanka tour packages. From cultural heritage tours to wildlife safaris, beach holidays to hill country adventures. Customizable private tours with expert guides. Perfect for travelers from India, Switzerland, Netherlands, Germany, and Sweden.",
  keywords: [
    "Sri Lanka tour packages",
    "private tours Sri Lanka",
    "custom tours Sri Lanka",
    "Sri Lanka travel packages",
    "Sri Lanka holiday packages",
    "Sri Lanka vacation packages",
    "luxury Sri Lanka tours",
    "cultural tours Sri Lanka",
    "wildlife safaris Sri Lanka",
    "beach holidays Sri Lanka",
  ],
  path: "/tours",
  image: "/images/og-image.jpg",
  targetCountries: TARGET_COUNTRIES.map((c) => c.code),
});
