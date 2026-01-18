import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { AboutSriLanka } from "@/components/sections/AboutSriLanka";
import { JourneyTypes } from "@/components/sections/JourneyTypes";
import { TourCategories } from "@/components/sections/TourCategories";
import { DestinationShowcase } from "@/components/sections/DestinationShowcase";
import { KeyExperiences } from "@/components/sections/KeyExperiences";
import { VehiclesShowcase } from "@/components/sections/VehiclesShowcase";
import { TravelStories } from "@/components/sections/TravelStories";
import { ToursShowcase } from "@/components/sections/ToursShowcase";
import { StatsSection } from "@/components/sections/StatsSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { OrganizationSchema, LocalBusinessSchema, TouristTripSchemas, FAQSchema } from "@/components/seo/structured-data";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { WebSiteSchema } from "@/components/seo/WebSiteSchema";
import { generatePageMetadata, SITE_URL, TARGET_COUNTRIES } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
  title: "Custom Sri Lanka Tours with Private Chauffeur",
  description: "Custom Sri Lanka tours with private chauffeur service. Personalized itineraries, luxury vehicles, and expert English-speaking guides. Serving travelers from India, Switzerland, Netherlands, Germany, and Sweden. Create your perfect tour today.",
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
    "Sri Lanka tour packages",
  ],
  path: "",
  image: "/images/og-image.jpg",
  targetCountries: TARGET_COUNTRIES.map((c) => c.code),
});

export default function Home() {
  return (
    <>
      <WebSiteSchema />
      <OrganizationSchema />
      <LocalBusinessSchema />
      <ServiceSchema />
      <TouristTripSchemas />
      <FAQSchema />
      <Hero />
      <AboutSriLanka />
      <StatsSection />
      <JourneyTypes />
      <TourCategories />
      <DestinationShowcase />
      <KeyExperiences />
      <VehiclesShowcase />
      <TravelStories />
      <ToursShowcase />
      <Testimonials />
      <NewsletterSection />
      <FinalCTA />
    </>
  );
}
