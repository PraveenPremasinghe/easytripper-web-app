import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easytripper.lk";
  const now = new Date();

  // Core pages with high priority
  const routes = [
    { path: "", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/destinations", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/tours", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/vehicles", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/plan-your-trip", priority: 0.9, changeFreq: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFreq: "weekly" as const },
    { path: "/stories", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/travel-tips", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/contact", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/privacy", priority: 0.5, changeFreq: "yearly" as const },
    { path: "/terms", priority: 0.5, changeFreq: "yearly" as const },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFreq,
    priority: route.priority,
    alternates: {
      languages: {
        en: `${baseUrl}${route.path}`,
        "en-IN": `${baseUrl}${route.path}`,
        "en-CH": `${baseUrl}${route.path}`,
        "en-NL": `${baseUrl}${route.path}`,
        "en-DE": `${baseUrl}${route.path}`,
        "en-SE": `${baseUrl}${route.path}`,
      },
    },
  }));

  // Fetch destinations and blog posts from Firebase
  let destinationRoutes: MetadataRoute.Sitemap = [];
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const [destinationsRes, blogRes] = await Promise.all([
      fetch(`${baseUrl}/api/firebase/destinations`, { 
        next: { revalidate: 3600 } 
      }).catch(() => null),
      fetch(`${baseUrl}/api/firebase/blog`, { 
        next: { revalidate: 3600 } 
      }).catch(() => null),
    ]);

    if (destinationsRes) {
      const { success, data: destinations } = await destinationsRes.json();
      if (success && Array.isArray(destinations)) {
        destinationRoutes = destinations.map((dest: { slug: string; updatedAt?: string }) => ({
          url: `${baseUrl}/destinations/${dest.slug}`,
          lastModified: dest.updatedAt ? new Date(dest.updatedAt) : now,
          changeFrequency: "monthly" as const,
          priority: 0.7,
          alternates: {
            languages: {
              en: `${baseUrl}/destinations/${dest.slug}`,
            },
          },
        }));
      }
    }

    if (blogRes) {
      const { success, data: blogPosts } = await blogRes.json();
      if (success && Array.isArray(blogPosts)) {
        blogRoutes = blogPosts.map((post: { slug: string; publishedAt?: string; updatedAt?: string }) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.updatedAt 
            ? new Date(post.updatedAt) 
            : post.publishedAt 
            ? new Date(post.publishedAt) 
            : now,
          changeFrequency: "monthly" as const,
          priority: 0.6,
          alternates: {
            languages: {
              en: `${baseUrl}/blog/${post.slug}`,
            },
          },
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching data for sitemap:", error);
  }

  return [...routes, ...destinationRoutes, ...blogRoutes];
}
