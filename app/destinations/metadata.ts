import type { Metadata } from "next";
import { generatePageMetadata, SITE_URL, TARGET_COUNTRIES } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Sri Lanka Destinations - Top Places to Visit & Travel Guide",
  description: "Explore the best destinations in Sri Lanka. From UNESCO World Heritage Sites to pristine beaches, ancient cities to wildlife sanctuaries. Comprehensive travel guides for Kandy, Sigiriya, Galle, Ella, Yala, and more. Perfect for travelers from India, Switzerland, Netherlands, Germany, and Sweden.",
  keywords: [
    "Sri Lanka destinations",
    "places to visit Sri Lanka",
    "Sri Lanka tourist attractions",
    "best places Sri Lanka",
    "Kandy Sri Lanka",
    "Sigiriya",
    "Galle",
    "Ella",
    "Yala National Park",
    "Nuwara Eliya",
    "Anuradhapura",
    "Polonnaruwa",
  ],
  path: "/destinations",
  image: "/images/og-image.jpg",
  targetCountries: TARGET_COUNTRIES.map((c) => c.code),
});
