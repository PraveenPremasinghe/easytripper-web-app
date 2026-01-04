"use client";

import { useEffect, useState } from "react";
import { BlogGrid } from "@/components/sections/BlogGrid";
import type { BlogPost } from "@/lib/types";

export function BlogPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/firebase/blog");
      const { success, data } = await res.json();
      if (success) {
        setPosts(data || []);
      }
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-12"><p className="text-muted-foreground">Loading blog posts...</p></div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-12"><p className="text-muted-foreground">No blog posts available yet.</p></div>;
  }

  return <BlogGrid posts={posts} />;
}

