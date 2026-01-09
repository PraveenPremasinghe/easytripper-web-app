import { SITE_URL } from "@/lib/seo";

/**
 * Person Schema for Jagath Premasinghe
 * Enhances SEO with structured data about the tour guide
 */
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Jagath Premasinghe",
    alternateName: "Jagath Premasinghe Tour Guide",
    jobTitle: "Professional Tour Guide & Cultural Ambassador",
    description: "Certified professional tour guide in Sri Lanka with 10+ years of experience. Expert in cultural heritage tours, wildlife safaris, and personalized travel experiences across Sri Lanka.",
    url: `${SITE_URL}/about`,
    image: `${SITE_URL}/images/guide/jagath-premasinghe.jpg`,
    email: "hello@easytripper.lk",
    telephone: "+94756433267",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LK",
      addressLocality: "Sri Lanka",
      addressRegion: "Central Province"
    },
    knowsLanguage: [
      {
        "@type": "Language",
        name: "English"
      },
      {
        "@type": "Language",
        name: "Sinhala"
      },
      {
        "@type": "Language",
        name: "Tamil"
      },
      {
        "@type": "Language",
        name: "French"
      },
      {
        "@type": "Language",
        name: "German"
      }
    ],
    worksFor: {
      "@type": "TravelAgency",
      name: "Easy Tripper",
      url: SITE_URL
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Tour Guide Certification Program"
    },
    award: "Certified Professional Tour Guide",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "5000+",
      bestRating: "5",
      worstRating: "1"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
