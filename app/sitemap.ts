import type { MetadataRoute } from "next";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { destinations } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/destinations"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    { url: absoluteUrl("/tours"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    {
      url: absoluteUrl("/vehicles"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/plan-your-trip"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: absoluteUrl("/stories"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    {
      url: absoluteUrl("/travel-tips"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
  ];

  const destinationRoutes: MetadataRoute.Sitemap = destinations.map((d) => ({
    url: absoluteUrl(`/destinations/${d.slug}`),
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...destinationRoutes];
}

