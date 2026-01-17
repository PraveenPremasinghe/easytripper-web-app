import { SITE_URL } from "@/lib/seo";

interface ArticleSchemaProps {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: {
    name: string;
    url?: string;
  };
  publisher?: {
    name: string;
    logo?: string;
  };
  articleBody?: string;
  keywords?: string[];
  url?: string;
}

/**
 * Article Schema for Blog Posts
 * Helps Google understand blog content and display rich snippets
 */
export function ArticleSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  publisher,
  articleBody,
  keywords,
  url,
}: ArticleSchemaProps) {
  const fullImageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const fullUrl = url || (typeof window !== "undefined" ? window.location.href : SITE_URL);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: headline,
    description: description,
    image: {
      "@type": "ImageObject",
      url: fullImageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: publisher?.name || "Easy Tripper",
      logo: {
        "@type": "ImageObject",
        url: publisher?.logo || `${SITE_URL}/images/logo.png`,
        width: 200,
        height: 200,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    ...(articleBody && { articleBody: articleBody }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

/**
 * BlogPosting Schema (more specific than Article)
 */
export function BlogPostingSchema({
  headline,
  description,
  image,
  datePublished,
  dateModified,
  author,
  articleBody,
  keywords,
  url,
}: ArticleSchemaProps) {
  const fullImageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const fullUrl = url || (typeof window !== "undefined" ? window.location.href : SITE_URL);

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: headline,
    description: description,
    image: {
      "@type": "ImageObject",
      url: fullImageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: author.name,
      ...(author.url && { url: author.url }),
    },
    publisher: {
      "@type": "Organization",
      name: "Easy Tripper",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
        width: 200,
        height: 200,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": fullUrl,
    },
    ...(articleBody && { articleBody: articleBody }),
    ...(keywords && keywords.length > 0 && { keywords: keywords.join(", ") }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
