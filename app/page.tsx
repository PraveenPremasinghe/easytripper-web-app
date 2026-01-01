import { Hero } from "@/components/hero/Hero";
import { AboutSriLanka } from "@/components/sections/AboutSriLanka";
import { JourneyTypes } from "@/components/sections/JourneyTypes";
import { TourCategories } from "@/components/sections/TourCategories";
import { DestinationShowcase } from "@/components/sections/DestinationShowcase";
import { KeyExperiences } from "@/components/sections/KeyExperiences";
import { TravelStories } from "@/components/sections/TravelStories";
import { ToursShowcase } from "@/components/sections/ToursShowcase";
import { StatsSection } from "@/components/sections/StatsSection";
import { ModernTestimonials } from "@/components/sections/ModernTestimonials";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { LocalBusinessSchema, TouristTripSchemas, FAQSchema } from "@/components/seo/structured-data";

export default function Home() {
  return (
    <>
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
      <ModernTestimonials />
      <NewsletterSection />
      <FinalCTA />
    </>
  );
}
