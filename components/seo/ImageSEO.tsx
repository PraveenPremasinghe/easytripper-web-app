import Image from "next/image";
import { SITE_URL } from "@/lib/seo";

interface ImageSEOProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  title?: string;
  caption?: string;
}

/**
 * SEO-Optimized Image Component
 * Automatically handles:
 * - Lazy loading
 * - Proper alt text
 * - Responsive sizes
 * - WebP/AVIF optimization
 * - Proper aspect ratios
 */
export function ImageSEO({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  title,
  caption,
}: ImageSEOProps) {
  // Ensure alt text is provided for SEO
  if (!alt || alt.trim() === "") {
    console.warn("ImageSEO: alt text is required for SEO");
  }

  // Generate full URL if relative
  const imageSrc = src.startsWith("http") ? src : `${SITE_URL}${src}`;

  return (
    <figure className={className}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        quality={85}
        className="rounded-lg"
        title={title || alt}
        // Add structured data for images
        itemProp="image"
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-muted-foreground text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Generate image schema for structured data
 */
export function generateImageSchema({
  url,
  caption,
  width = 1200,
  height = 630,
}: {
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;

  return {
    "@type": "ImageObject",
    url: fullUrl,
    width: width,
    height: height,
    ...(caption && { caption: caption }),
  };
}
