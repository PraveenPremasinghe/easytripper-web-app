import { SITE_URL } from "@/lib/seo";

/**
 * Service Schema for SEO
 * Represents tour guide and chauffeur services
 */
export function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Tour Guide and Chauffeur Services",
    provider: {
      "@type": "TravelAgency",
      name: "Easy Tripper",
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sri Lanka Tour Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Tour Guide Service",
            description: "Expert English-speaking tour guide for personalized Sri Lanka tours",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Chauffeur Service",
            description: "Professional chauffeur with luxury vehicles for airport transfers and tours",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Tour Planning",
            description: "Personalized itinerary planning based on your preferences and interests",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airport Transfer Service",
            description: "Reliable airport pickup and drop-off service",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "5000+",
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
