"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/lib/types";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { format } from "date-fns";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const publishedDate = new Date(post.publishedAt);

  return (
    <motion.div variants={itemVariants}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 hover:border-primary/20">
        <Link href={`/blog/${post.slug}`}>
          <div className="relative aspect-video overflow-hidden bg-muted">
            <Image
              src={post.image}
              alt={post.title}
              fill
              loading="lazy"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary text-white shadow-lg">
                {post.category}
              </Badge>
            </div>
          </div>
          <CardContent className="p-6">
            <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.publishedAt}>
                  {format(publishedDate, "MMM d, yyyy")}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
            <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
              {post.title}
            </h3>
            <p className="mb-4 text-muted-foreground line-clamp-3">
              {post.excerpt}
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
              Read more
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </CardContent>
        </Link>
      </Card>
    </motion.div>
  );
}
