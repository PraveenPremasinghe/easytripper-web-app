import { absoluteUrl, siteConfig } from "@/lib/site";
import type { FAQ, Tour, Vehicle } from "@/lib/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.country,
    },
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/destinations")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  } as const;
}

export function breadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

export function faqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  } as const;
}

export function toursItemListJsonLd(tours: Tour[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    itemListElement: tours.map((t, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TouristTrip",
        name: t.name,
        description: t.description,
        image: t.image,
        touristType: t.category,
        itinerary: t.itinerary,
        provider: {
          "@type": "TravelAgency",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        offers: {
          "@type": "Offer",
          price: t.price.replace(/[^\d.]/g, "") || undefined,
          priceCurrency: "USD",
          url: absoluteUrl("/tours"),
          availability: "https://schema.org/InStock",
        },
      },
    })),
  } as const;
}

export function vehiclesItemListJsonLd(vehicles: Vehicle[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: vehicles.map((v, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Vehicle",
        name: v.name,
        image: v.image,
        category: v.category,
        description: `${v.passengers}. Luggage: ${v.luggage}. Ideal for: ${v.idealFor.join(", ")}.`,
      },
    })),
  } as const;
}

