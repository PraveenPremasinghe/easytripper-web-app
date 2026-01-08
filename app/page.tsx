import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { AboutSriLanka } from "@/components/sections/AboutSriLanka";
import { JourneyTypes } from "@/components/sections/JourneyTypes";
import { TourCategories } from "@/components/sections/TourCategories";
import { DestinationShowcase } from "@/components/sections/DestinationShowcase";
import { KeyExperiences } from "@/components/sections/KeyExperiences";
import { TravelStories } from "@/components/sections/TravelStories";
import { ToursShowcase } from "@/components/sections/ToursShowcase";
import { StatsSection } from "@/components/sections/StatsSection";
import { GuideProfile } from "@/components/sections/GuideProfile";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { OrganizationSchema, LocalBusinessSchema, TouristTripSchemas, FAQSchema } from "@/components/seo/structured-data";

export const metadata: Metadata = {
  title: "Custom Sri Lanka Tours with Private Chauffeur | Easy Tripper",
  description: "Custom Sri Lanka tours tailored to your preferences. Private chauffeur service, personalized itineraries, luxury vehicles, and expert English-speaking guides. Create your perfect custom tour today. Airport pickup available.",
  keywords: [
    "custom Sri Lanka tours",
    "Sri Lanka private tour guide",
    "Sri Lanka travel itinerary",
    "Sri Lanka airport pickup",
    "luxury Sri Lanka tours",
    "Sri Lanka chauffeur service",
    "private tours Sri Lanka",
    "personalized Sri Lanka tours",
    "custom tour Sri Lanka",
  ],
  alternates: {
    canonical: "https://easytripper.lk",
  },
  openGraph: {
    title: "Custom Sri Lanka Tours with Private Chauffeur",
    description: "Custom Sri Lanka tours tailored to your preferences. Private chauffeur service, personalized itineraries, luxury vehicles, and expert English-speaking guides.",
    url: "https://easytripper.lk",
    siteName: "Easy Tripper",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Custom Sri Lanka Tours",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Sri Lanka Tours with Private Chauffeur",
    description: "Custom Sri Lanka tours tailored to your preferences. Personalized itineraries and expert guides.",
    images: ["/images/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <LocalBusinessSchema />
      <TouristTripSchemas />
      <FAQSchema />
      <Hero />
      <AboutSriLanka />
      <StatsSection />
      <JourneyTypes />
      <TourCategories />
      <DestinationShowcase />
      <KeyExperiences />
      <TravelStories />
      <ToursShowcase />
      <Testimonials />
      <NewsletterSection />
      <FinalCTA />
    </>
  );
}
