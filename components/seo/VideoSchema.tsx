import { SITE_URL } from "@/lib/seo";

interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string; // ISO 8601 format (e.g., "PT5M33S" for 5 minutes 33 seconds)
  contentUrl?: string; // Direct video URL
  embedUrl?: string; // Embed URL (YouTube, Vimeo, etc.)
  publisher?: {
    name: string;
    logo?: string;
  };
}

/**
 * Video Schema for SEO
 * Helps videos appear in Google search results with rich snippets
 * Use for YouTube videos, Vimeo, or self-hosted videos
 */
export function VideoSchema({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  publisher,
}: VideoSchemaProps) {
  const fullThumbnailUrl = thumbnailUrl.startsWith("http")
    ? thumbnailUrl
    : `${SITE_URL}${thumbnailUrl}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: name,
    description: description,
    thumbnailUrl: fullThumbnailUrl,
    uploadDate: uploadDate,
    ...(duration && { duration: duration }),
    ...(contentUrl && { contentUrl: contentUrl }),
    ...(embedUrl && { embedUrl: embedUrl }),
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}

/**
 * YouTube Video Schema Helper
 * Converts YouTube URL to proper schema format
 */
export function YouTubeVideoSchema({
  youtubeUrl,
  name,
  description,
  uploadDate,
  duration,
}: {
  youtubeUrl: string;
  name: string;
  description: string;
  uploadDate: string;
  duration?: string;
}) {
  // Extract video ID from YouTube URL
  const videoIdMatch = youtubeUrl.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  const videoId = videoIdMatch ? videoIdMatch[1] : "";

  if (!videoId) {
    console.warn("Invalid YouTube URL:", youtubeUrl);
    return null;
  }

  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <VideoSchema
      name={name}
      description={description}
      thumbnailUrl={thumbnailUrl}
      uploadDate={uploadDate}
      duration={duration}
      embedUrl={embedUrl}
      contentUrl={youtubeUrl}
    />
  );
}
