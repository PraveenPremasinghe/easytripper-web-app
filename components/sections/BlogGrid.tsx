"use client";

import { motion } from "framer-motion";
import { BlogCard } from "@/components/sections/BlogCard";
import { BlogPost } from "@/lib/types";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </motion.div>
  );
}

