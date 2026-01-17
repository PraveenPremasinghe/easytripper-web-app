"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * SEO Head Component
 * Dynamically updates meta tags and structured data based on page
 * Use this for client-side SEO updates
 */
interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export function SEOHead({
  title,
  description,
  keywords,
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: SEOHeadProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", description);
    }

    // Update Open Graph tags
    const updateOGTag = (property: string, content: string) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    if (title) updateOGTag("og:title", title);
    if (description) updateOGTag("og:description", description);
    if (image) updateOGTag("og:image", image);
    updateOGTag("og:type", type);
    updateOGTag("og:url", window.location.href);

    if (publishedTime) updateOGTag("article:published_time", publishedTime);
    if (modifiedTime) updateOGTag("article:modified_time", modifiedTime);
    if (author) updateOGTag("article:author", author);

    // Update Twitter Card tags
    const updateTwitterTag = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    if (title) updateTwitterTag("twitter:title", title);
    if (description) updateTwitterTag("twitter:description", description);
    if (image) updateTwitterTag("twitter:image", image);

    // Update keywords
    if (keywords && keywords.length > 0) {
      let keywordsTag = document.querySelector('meta[name="keywords"]');
      if (!keywordsTag) {
        keywordsTag = document.createElement("meta");
        keywordsTag.setAttribute("name", "keywords");
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.setAttribute("content", keywords.join(", "));
    }
  }, [pathname, title, description, keywords, image, type, publishedTime, modifiedTime, author]);

  return null;
}
