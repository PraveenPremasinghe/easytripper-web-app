import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Contact Us - Create Your Custom Sri Lanka Tour | Easy Tripper",
  description: "Contact Easy Tripper to create your custom Sri Lanka tour. Get instant quotes, personalize your itinerary, and speak with our expert tour guides. WhatsApp, email, or call us 24/7.",
  keywords: [
    "contact Sri Lanka tour guide",
    "book custom Sri Lanka tour",
    "Sri Lanka tour inquiry",
    "custom tour Sri Lanka",
  ],
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

