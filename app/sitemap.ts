import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easytripper.lk";

  const routes = [
    { path: "", priority: 1.0, changeFreq: "weekly" },
    { path: "/destinations", priority: 0.9, changeFreq: "weekly" },
    { path: "/tours", priority: 0.9, changeFreq: "weekly" },
    { path: "/vehicles", priority: 0.8, changeFreq: "monthly" },
    { path: "/plan-your-trip", priority: 0.9, changeFreq: "monthly" },
    { path: "/blog", priority: 0.8, changeFreq: "weekly" },
    { path: "/stories", priority: 0.7, changeFreq: "monthly" },
    { path: "/travel-tips", priority: 0.7, changeFreq: "monthly" },
    { path: "/contact", priority: 0.8, changeFreq: "monthly" },
  ].map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFreq as "weekly" | "monthly",
    priority: route.priority,
  }));

  // Fetch destinations and blog posts from Firebase
  let destinationRoutes: MetadataRoute.Sitemap = [];
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const [destinationsRes, blogRes] = await Promise.all([
      fetch(`${baseUrl}/api/firebase/destinations`).catch(() => null),
      fetch(`${baseUrl}/api/firebase/blog`).catch(() => null),
    ]);

    if (destinationsRes) {
      const { success, data: destinations } = await destinationsRes.json();
      if (success && Array.isArray(destinations)) {
        destinationRoutes = destinations.map((dest: { slug: string }) => ({
          url: `${baseUrl}/destinations/${dest.slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }));
      }
    }

    if (blogRes) {
      const { success, data: blogPosts } = await blogRes.json();
      if (success && Array.isArray(blogPosts)) {
        blogRoutes = blogPosts.map((post: { slug: string; publishedAt?: string }) => ({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        }));
      }
    }
  } catch (error) {
    console.error("Error fetching data for sitemap:", error);
  }

  return [...routes, ...destinationRoutes, ...blogRoutes];
}
