import { destinations, tours, testimonials, faqs } from "@/lib/data";
import { SITE_URL, TARGET_COUNTRIES } from "@/lib/seo";

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${SITE_URL}/#organization`,
    name: "Easy Tripper",
    alternateName: "Easy Tripper Sri Lanka Tours",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/images/logo.png`,
      width: 200,
      height: 200
    },
    description: "Custom Sri Lanka tours with private chauffeur service. Expert local guide offering personalized tours tailored to your preferences, cultural experiences, wildlife safaris, and luxury transportation services. Serving travelers from India, Switzerland, Netherlands, Germany, and Sweden.",
    telephone: "+94756433267",
    email: "hello@easytripper.lk",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressLocality: "Sri Lanka",
      addressRegion: "Central Province"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "7.8731",
      longitude: "80.7718"
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Sri Lanka"
      },
      ...TARGET_COUNTRIES.map(country => ({
        "@type": "Country",
        name: country.name
      }))
    ],
    priceRange: "$$",
    image: `${SITE_URL}/images/og-image.jpg`,
    foundingDate: "2020",
    founder: {
      "@type": "Person",
      name: "Jagath Premasinghe"
    },
    sameAs: [
      // Add social media links when available
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "5000+",
      bestRating: "5",
      worstRating: "1"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Sri Lanka Tour Packages",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Custom Tours",
          itemListElement: []
        },
        {
          "@type": "OfferCatalog",
          name: "Private Chauffeur Services",
          itemListElement: []
        }
      ]
    },
    serviceType: [
      "Tour Guide Services",
      "Private Chauffeur Services",
      "Custom Tour Planning",
      "Airport Transfer",
      "Vehicle Rental"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Easy Tripper - Sri Lanka Tour Guide",
    description: "Professional tour guide and vehicle service in Sri Lanka. Expert local guide offering personalized tours, cultural experiences, wildlife safaris, and transportation services across the island. Serving international travelers from India, Switzerland, Netherlands, Germany, and Sweden.",
    url: SITE_URL,
    telephone: "+94756433267",
    email: "hello@easytripper.lk",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressLocality: "Sri Lanka",
      addressRegion: "Central Province"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "7.8731",
      longitude: "80.7718"
    },
    areaServed: [
      {
        "@type": "Country",
        name: "Sri Lanka"
      },
      ...TARGET_COUNTRIES.map(country => ({
        "@type": "Country",
        name: country.name
      }))
    ],
    priceRange: "$$",
    image: `${SITE_URL}/images/og-image.jpg`,
    openingHours: "Mo-Su 00:00-23:59",
    currenciesAccepted: "USD, EUR, LKR, INR, CHF, SEK",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    sameAs: []
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

export function TouristTripSchemas() {
  const tripSchemas = tours.map((tour) => ({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    provider: {
      "@type": "TravelAgency",
      name: "Easy Tripper",
      url: SITE_URL
    },
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
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE_URL}/tours`,
      validFrom: new Date().toISOString()
    },
    duration: tour.duration,
    touristType: tour.category,
    destination: tour.destinations.map((dest) => ({
      "@type": "Place",
      name: dest,
      address: {
        "@type": "PostalAddress",
        addressCountry: "LK"
      }
    })),
    image: tour.image,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "100+",
      bestRating: "5",
      worstRating: "1"
    }
  }));

  return (
    <>
      {tripSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
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
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
