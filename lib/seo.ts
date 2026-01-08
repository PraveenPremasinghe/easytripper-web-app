/**
 * SEO Utilities for Easy Tripper
 * Helper functions for canonical URLs, meta tags, and SEO optimization
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://easytripper.lk";
export const SITE_NAME = "Easy Tripper - Custom Sri Lanka Tours";

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Generate page metadata for SEO
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image = "/images/og-image.jpg",
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
}) {
  const canonical = getCanonicalUrl(path);
  const fullTitle = `${title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      ...keywords,
      "Sri Lanka tours",
      "Sri Lanka travel",
      "private tour guide Sri Lanka",
    ],
    alternates: {
      canonical,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: image.startsWith("http") ? image : `${SITE_URL}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
    },
  };
}

/**
 * Primary SEO keywords for the site
 */
export const PRIMARY_KEYWORDS = [
  "custom Sri Lanka tours",
  "Sri Lanka private tour guide",
  "Sri Lanka travel itinerary",
  "Sri Lanka airport pickup",
  "luxury Sri Lanka tours",
  "Sri Lanka chauffeur service",
  "personalized Sri Lanka tours",
];

/**
 * Secondary keywords
 */
export const SECONDARY_KEYWORDS = [
  "private tours Sri Lanka",
  "custom tour Sri Lanka",
  "Sri Lanka tour operator",
  "English speaking guide Sri Lanka",
  "Sri Lanka travel guide",
  "Ceylon tours",
  "tailored Sri Lanka tours",
];

