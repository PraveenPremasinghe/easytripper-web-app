import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://easytripper.lk";

  const routes = [
    "",
    "/destinations",
    "/tours",
    "/vehicles",
    "/blog",
    "/stories",
    "/travel-tips",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
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
