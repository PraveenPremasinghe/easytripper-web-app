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
  const fullTitle = `${title} | ${SITE_NAME}`;

  // Add country-specific keywords
  const countryKeywords: string[] = [];
  targetCountries.forEach((countryCode) => {
    const countryKey = countryCode as keyof typeof COUNTRY_KEYWORDS;
    if (COUNTRY_KEYWORDS[countryKey]) {
      countryKeywords.push(...COUNTRY_KEYWORDS[countryKey]);
    }
  });

  const hreflangTags = generateHreflangTags(path);

  return {
    title: fullTitle,
    description,
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
