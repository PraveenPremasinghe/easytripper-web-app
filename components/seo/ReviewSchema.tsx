import { SITE_URL } from "@/lib/seo";

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
  authorImage?: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
  itemReviewed?: {
    "@type": string;
    name: string;
    description?: string;
    image?: string;
  };
}

/**
 * Review Schema for SEO
 * Displays star ratings in Google search results
 * Improves click-through rates significantly
 */
export function ReviewSchema({ reviews, itemReviewed }: ReviewSchemaProps) {
  if (!reviews || reviews.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: itemReviewed || {
      "@type": "TravelAgency",
      name: "Easy Tripper",
      description: "Custom Sri Lanka tours with private chauffeur service",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
        ...(review.authorImage && {
          image: review.authorImage.startsWith("http")
            ? review.authorImage
            : `${SITE_URL}${review.authorImage}`,
        }),
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished || new Date().toISOString(),
    })),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: (
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      ).toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

/**
 * Single Review Schema (for individual reviews)
 */
export function SingleReviewSchema({
  author,
  rating,
  reviewBody,
  datePublished,
  itemReviewed,
}: {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished?: string;
  itemReviewed?: {
    "@type": string;
    name: string;
  };
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: reviewBody,
    datePublished: datePublished || new Date().toISOString(),
    itemReviewed: itemReviewed || {
      "@type": "TravelAgency",
      name: "Easy Tripper",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
