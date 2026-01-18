/**
 * SEO Utilities for Easy Tripper
 * Professional SEO implementation for international targeting
 * Optimized for: India, Switzerland, Netherlands, Germany, Sweden
 * Domain: easytripper.lk
 */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://easytripper.lk";
export const SITE_NAME = "Easy Tripper - Custom Sri Lanka Tours";

/**
 * Target countries for SEO with comprehensive metadata
 */
export const TARGET_COUNTRIES = [
  { 
    code: "IN", 
    name: "India", 
    locale: "en_IN",
    currency: "INR",
    timezone: "Asia/Kolkata",
    searchVolume: "high",
    keywords: [
      "Sri Lanka tour packages from India",
      "Sri Lanka travel guide for Indians",
      "Sri Lanka visa for Indians",
      "cheap Sri Lanka tours from India",
      "Sri Lanka holiday packages India",
      "Sri Lanka tour operator India",
      "best Sri Lanka tours from India",
      "Sri Lanka travel agent India",
    ]
  },
  { 
    code: "CH", 
    name: "Switzerland", 
    locale: "en_CH",
    currency: "CHF",
    timezone: "Europe/Zurich",
    searchVolume: "medium",
    keywords: [
      "Sri Lanka tours from Switzerland",
      "Sri Lanka travel guide Switzerland",
      "luxury Sri Lanka tours Swiss",
      "Sri Lanka holiday packages Switzerland",
      "private Sri Lanka guide Swiss",
      "Sri Lanka Reisen Schweiz",
      "Sri Lanka Rundreise Schweiz",
    ]
  },
  { 
    code: "NL", 
    name: "Netherlands", 
    locale: "en_NL",
    currency: "EUR",
    timezone: "Europe/Amsterdam",
    searchVolume: "medium",
    keywords: [
      "Sri Lanka tours from Netherlands",
      "Sri Lanka travel guide Dutch",
      "Sri Lanka holiday packages Netherlands",
      "private Sri Lanka tours Dutch",
      "Sri Lanka vakantie",
      "Sri Lanka reizen Nederland",
      "Sri Lanka reisgids",
    ]
  },
  { 
    code: "DE", 
    name: "Germany", 
    locale: "en_DE",
    currency: "EUR",
    timezone: "Europe/Berlin",
    searchVolume: "high",
    keywords: [
      "Sri Lanka Reisen",
      "Sri Lanka Reiseführer",
      "Sri Lanka Rundreise",
      "Sri Lanka Privatführer",
      "Sri Lanka Reiseangebote",
      "Sri Lanka Reiseveranstalter",
      "Sri Lanka Individualreise",
      "Sri Lanka Luxusreisen",
    ]
  },
  { 
    code: "SE", 
    name: "Sweden", 
    locale: "en_SE",
    currency: "SEK",
    timezone: "Europe/Stockholm",
    searchVolume: "medium",
    keywords: [
      "Sri Lanka resor från Sverige",
      "Sri Lanka resguide",
      "Sri Lanka paketresor",
      "privat guide Sri Lanka",
      "Sri Lanka semester",
      "Sri Lanka resa",
      "Sri Lanka resor",
    ]
  },
] as const;

/**
 * Country-specific keywords for target markets (legacy - use TARGET_COUNTRIES[].keywords instead)
 */
export const COUNTRY_KEYWORDS = {
  IN: TARGET_COUNTRIES.find(c => c.code === "IN")?.keywords || [],
  CH: TARGET_COUNTRIES.find(c => c.code === "CH")?.keywords || [],
  NL: TARGET_COUNTRIES.find(c => c.code === "NL")?.keywords || [],
  DE: TARGET_COUNTRIES.find(c => c.code === "DE")?.keywords || [],
  SE: TARGET_COUNTRIES.find(c => c.code === "SE")?.keywords || [],
};

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Generate hreflang tags for international SEO
 * Properly formatted for HTML head and metadata
 */
export function generateHreflangTags(path: string = ""): Array<{ hreflang: string; href: string }> {
  const basePath = path.startsWith("/") ? path : `/${path}`;
  const fullUrl = `${SITE_URL}${basePath}`;
  
  const tags = [
    { hreflang: "x-default", href: fullUrl },
    { hreflang: "en", href: fullUrl },
    { hreflang: "en-LK", href: fullUrl }, // Sri Lanka English
  ];

  // Add country-specific hreflang tags
  TARGET_COUNTRIES.forEach((country) => {
    tags.push({
      hreflang: country.locale,
      href: fullUrl,
    });
    // Also add country code only for broader targeting
    tags.push({
      hreflang: country.code.toLowerCase(),
      href: fullUrl,
    });
  });

  return tags;
}

/**
 * Generate hreflang link tags for HTML head
 */
export function generateHreflangLinkTags(path: string = ""): Array<{ rel: string; hreflang: string; href: string }> {
  return generateHreflangTags(path).map(tag => ({
    rel: "alternate",
    hreflang: tag.hreflang,
    href: tag.href,
  }));
}

/**
 * Generate page metadata for SEO with international targeting
 */
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  path = "",
  image = "/images/og-image.jpg",
  targetCountries = TARGET_COUNTRIES.map((c) => c.code),
}: {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
  targetCountries?: string[];
}) {
  const canonical = getCanonicalUrl(path);
  // Optimize title length (max 60 chars for SEO)
  const optimizedTitle = generateTitleTag(title, undefined, 60);
  const fullTitle = `${optimizedTitle} | Easy Tripper`;

  // Add country-specific keywords
  const countryKeywords: string[] = [];
  targetCountries.forEach((countryCode) => {
    const countryKey = countryCode as keyof typeof COUNTRY_KEYWORDS;
    if (COUNTRY_KEYWORDS[countryKey]) {
      countryKeywords.push(...COUNTRY_KEYWORDS[countryKey]);
    }
  });

  const hreflangTags = generateHreflangTags(path);

  // Optimize description length (150-220 chars for SEO)
  const optimizedDescription = generateMetaDescription(description, 220);
  
  return {
    title: fullTitle,
    description: optimizedDescription,
    keywords: [
      ...keywords,
      ...countryKeywords,
      "Sri Lanka tours",
      "Sri Lanka travel",
      "private tour guide Sri Lanka",
      "Sri Lanka tour packages",
      "Sri Lanka travel guide",
      "custom Sri Lanka tours",
    ],
    alternates: {
      canonical,
      languages: Object.fromEntries(
        hreflangTags.map((tag) => [tag.hreflang, tag.href])
      ),
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
      alternateLocale: TARGET_COUNTRIES.map((c) => c.locale),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.startsWith("http") ? image : `${SITE_URL}${image}`],
    },
    other: {
      "geo.region": "LK",
      "geo.placename": "Sri Lanka",
      "geo.position": "7.8731;80.7718",
      "ICBM": "7.8731, 80.7718",
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
  "Sri Lanka tour packages",
  "Sri Lanka travel guide",
  "private tours Sri Lanka",
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
  "Sri Lanka holiday packages",
  "Sri Lanka vacation",
  "Sri Lanka travel agent",
];

/**
 * International SEO keywords - comprehensive list
 */
export const INTERNATIONAL_KEYWORDS = [
  // Country-specific
  "Sri Lanka tours from India",
  "Sri Lanka tours from Switzerland",
  "Sri Lanka tours from Netherlands",
  "Sri Lanka tours from Germany",
  "Sri Lanka tours from Sweden",
  // General international
  "Sri Lanka travel packages",
  "Sri Lanka private guide",
  "Sri Lanka custom tours",
  "Sri Lanka luxury tours",
  "Sri Lanka cultural tours",
  "Sri Lanka wildlife tours",
  "Sri Lanka beach tours",
  "Sri Lanka hill country tours",
  // Long-tail keywords
  "private tour guide Sri Lanka English speaking",
  "Sri Lanka tour operator with chauffeur",
  "customized Sri Lanka itinerary",
  "Sri Lanka travel planner",
  "Sri Lanka vacation packages",
  "Sri Lanka holiday planner",
  "personalized Sri Lanka travel",
  "Sri Lanka expert guide",
  // Service-specific
  "Sri Lanka airport transfer service",
  "Sri Lanka chauffeur driver",
  "Sri Lanka private vehicle rental",
  "luxury travel Sri Lanka",
  "premium Sri Lanka tours",
];

/**
 * Semantic SEO keywords - topic clusters
 */
export const SEMANTIC_KEYWORDS = {
  tourTypes: [
    "cultural tours Sri Lanka",
    "wildlife safaris Sri Lanka",
    "beach holidays Sri Lanka",
    "hill country tours Sri Lanka",
    "heritage tours Sri Lanka",
    "adventure tours Sri Lanka",
    "honeymoon packages Sri Lanka",
    "family tours Sri Lanka",
  ],
  services: [
    "private chauffeur Sri Lanka",
    "airport pickup Sri Lanka",
    "tour guide services Sri Lanka",
    "custom itinerary planning",
    "luxury vehicle rental Sri Lanka",
    "English speaking guide",
  ],
  destinations: [
    "Kandy tours",
    "Sigiriya tours",
    "Ella tours",
    "Galle tours",
    "Yala National Park",
    "Udawalawe National Park",
    "Nuwara Eliya tours",
    "Anuradhapura tours",
    "Polonnaruwa tours",
  ],
};

/**
 * Generate optimized meta description
 * Ensures proper length (150-160 characters) and includes keywords
 */
export function generateMetaDescription(
  description: string,
  maxLength: number = 160
): string {
  if (description.length <= maxLength) return description;
  
  // Try to cut at sentence boundary
  const sentences = description.match(/[^.!?]+[.!?]+/g) || [];
  let result = "";
  
  for (const sentence of sentences) {
    if ((result + sentence).length <= maxLength) {
      result += sentence;
    } else {
      break;
    }
  }
  
  // If no sentences fit, cut at word boundary
  if (!result) {
    const words = description.split(" ");
    result = words[0];
    for (let i = 1; i < words.length; i++) {
      if ((result + " " + words[i]).length <= maxLength - 3) {
        result += " " + words[i];
      } else {
        break;
      }
    }
    result += "...";
  }
  
  return result.trim();
}

/**
 * Generate optimized title tag
 * Ensures proper length (50-60 characters) and includes primary keyword
 */
export function generateTitleTag(
  title: string,
  primaryKeyword?: string,
  maxLength: number = 60
): string {
  let optimizedTitle = title;
  
  // Add primary keyword if not present and space allows
  if (primaryKeyword && !title.toLowerCase().includes(primaryKeyword.toLowerCase())) {
    const withKeyword = `${title} - ${primaryKeyword}`;
    if (withKeyword.length <= maxLength) {
      optimizedTitle = withKeyword;
    }
  }
  
  // Truncate if too long
  if (optimizedTitle.length > maxLength) {
    optimizedTitle = optimizedTitle.substring(0, maxLength - 3) + "...";
  }
  
  return optimizedTitle;
}

/**
 * Generate keyword-rich URL slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens
}

/**
 * Extract keywords from text for SEO analysis
 */
export function extractKeywords(text: string, minLength: number = 3): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length >= minLength);
  
  // Count word frequency
  const frequency: Record<string, number> = {};
  words.forEach((word) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return top keywords
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([word]) => word);
}

/**
 * Generate structured data for WebSite with search action
 */
export function generateWebSiteSchema(searchUrl?: string) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: searchUrl
      ? {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: searchUrl,
          },
          "query-input": "required name=search_term_string",
        }
      : undefined,
  };
  
  if (!searchUrl) {
    delete schema.potentialAction;
  }
  
  return schema;
}

/**
 * Generate ItemList schema for collections (tours, destinations, etc.)
 */
export function generateItemListSchema({
  name,
  description,
  items,
  itemType = "TouristTrip",
}: {
  name: string;
  description: string;
  items: Array<{
    name: string;
    url: string;
    description?: string;
    image?: string;
  }>;
  itemType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: name,
    description: description,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": itemType,
        name: item.name,
        url: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
        ...(item.description && { description: item.description }),
        ...(item.image && {
          image: item.image.startsWith("http") ? item.image : `${SITE_URL}${item.image}`,
        }),
      },
    })),
  };
}

/**
 * Generate HowTo schema for step-by-step guides
 */
export function generateHowToSchema({
  name,
  description,
  steps,
  totalTime,
  image,
}: {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
  totalTime?: string; // ISO 8601 duration (e.g., "PT2H30M")
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: name,
    description: description,
    ...(image && {
      image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    }),
    ...(totalTime && { totalTime: totalTime }),
    step: steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && {
        image: step.image.startsWith("http") ? step.image : `${SITE_URL}${step.image}`,
      }),
    })),
  };
}

/**
 * Generate Event schema for tour events or special occasions
 */
export function generateEventSchema({
  name,
  description,
  startDate,
  endDate,
  location,
  image,
  offers,
}: {
  name: string;
  description: string;
  startDate: string; // ISO 8601 date
  endDate?: string;
  location: {
    name: string;
    address?: string;
  };
  image?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: name,
    description: description,
    startDate: startDate,
    ...(endDate && { endDate: endDate }),
    location: {
      "@type": "Place",
      name: location.name,
      ...(location.address && { address: location.address }),
    },
    ...(image && {
      image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
    }),
    ...(offers && {
      offers: {
        "@type": "Offer",
        price: offers.price,
        priceCurrency: offers.priceCurrency,
        availability: offers.availability,
        url: offers.url.startsWith("http") ? offers.url : `${SITE_URL}${offers.url}`,
      },
    }),
  };
}
