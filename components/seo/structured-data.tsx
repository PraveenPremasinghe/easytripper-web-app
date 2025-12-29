import { destinations, tours, testimonials, faqs } from "@/lib/data";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Easy Tripper - Sri Lanka Tour Guide",
    description: "Professional tour guide and vehicle service in Sri Lanka. Expert local guide offering personalized tours, cultural experiences, wildlife safaris, and transportation services across the island.",
    url: "https://easytripper.lk",
    telephone: "+94-XXX-XXXXXXX", // Update with actual phone
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressLocality: "Sri Lanka"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "7.8731",
      longitude: "80.7718"
    },
    areaServed: {
      "@type": "Country",
      name: "Sri Lanka"
    },
    priceRange: "$$",
    image: "https://easytripper.lk/images/og-image.jpg",
    sameAs: [
      // Add social media links
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TouristTripSchemas() {
  const tripSchemas = tours.map((tour) => ({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.itinerary.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item
      }))
    },
    offers: {
      "@type": "Offer",
      price: tour.price,
      priceCurrency: "USD"
    },
    duration: tour.duration,
    touristType: tour.category,
    destination: tour.destinations.map((dest) => ({
      "@type": "Place",
      name: dest
    }))
  }));

  return (
    <>
      {tripSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function DestinationSchemas() {
  const destinationSchemas = destinations.map((dest) => ({
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: dest.name,
    description: dest.description || dest.excerpt,
    image: dest.image,
    address: {
      "@type": "PostalAddress",
      addressRegion: dest.region,
      addressCountry: "LK"
    },
    touristType: "All",
    containsPlace: dest.highlights.map((highlight) => ({
      "@type": "TouristAttraction",
      name: highlight
    }))
  }));

  return (
    <>
      {destinationSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
