import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShareButton } from "./ShareButton";
import type { BlogPost } from "@/lib/types";
import { SITE_URL, generatePageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 3600; // Revalidate every hour

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/firebase/blog`, { next: { revalidate: 3600 } });
    const { success, data } = await res.json();
    if (success && Array.isArray(data)) {
      return data.find((post: BlogPost) => post.slug === slug) || null;
    }
    return null;
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const title = `${post.title} | Easy Tripper - Sri Lanka Travel Blog`;
  const description = post.excerpt || `Read about ${post.title} on Easy Tripper's Sri Lanka travel blog. Expert travel guides and tips for travelers from India, Switzerland, Netherlands, Germany, and Sweden.`;

  return {
    ...generatePageMetadata({
      title: post.title,
      description,
      keywords: [
        ...(post.seoKeywords || post.tags || []),
        "Sri Lanka travel blog",
        "Sri Lanka travel guide",
        "Sri Lanka travel tips",
        "Sri Lanka travel information",
      ],
      path: `/blog/${slug}`,
      image: post.image,
    }),
    openGraph: {
      title: post.title,
      description: post.excerpt || description,
      url: `${SITE_URL}/blog/${slug}`,
      siteName: "Easy Tripper",
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author || "Jagath Premasinghe"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const publishedDate = new Date(post.publishedAt);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Image */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="mb-4 inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
            <Badge className="mb-4 bg-white/90 text-neutral-900">
              {post.category}
            </Badge>
            <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {publishedDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <span>By {post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="mx-auto max-w-4xl px-4 py-12 md:px-6 lg:px-8">
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          <div className="blog-content whitespace-pre-line text-foreground leading-relaxed">
            {post.content.split('\n\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph.split('\n').map((line, lineIndex, array) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < array.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-12 border-t pt-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Share this article</h3>
              <p className="text-sm text-muted-foreground">
                Help others discover this content
              </p>
            </div>
            <div className="flex gap-2">
              <ShareButton post={post} />
            </div>
          </div>
        </div>

        {/* Back to Blog */}
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Posts
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}

