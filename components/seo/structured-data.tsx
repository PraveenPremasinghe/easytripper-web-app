import { destinations, tours, testimonials, faqs } from "@/lib/data";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": "https://easytripper.lk/#organization",
    name: "Easy Tripper",
    alternateName: "Easy Tripper Sri Lanka Tours",
    url: "https://easytripper.lk",
    logo: "https://easytripper.lk/images/logo.png",
    description: "Custom Sri Lanka tours with private chauffeur service. Expert local guide offering personalized tours tailored to your preferences, cultural experiences, wildlife safaris, and luxury transportation services.",
    telephone: "+94756433267",
    email: "info@easytripper.lk",
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
      // Add social media links when available
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "5000+"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Easy Tripper - Sri Lanka Tour Guide",
    description: "Professional tour guide and vehicle service in Sri Lanka. Expert local guide offering personalized tours, cultural experiences, wildlife safaris, and transportation services across the island.",
    url: "https://easytripper.lk",
    telephone: "+94756433267",
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
    sameAs: []
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

export function FAQSchema({ faqs: customFaqs }: { faqs?: Array<{ q: string; a: string }> }) {
  const faqData = customFaqs || faqs;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((faq) => ({
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
      item: item.url.startsWith("http") ? item.url : `https://easytripper.lk${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
