"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SkeletonLoader({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "card" | "text" | "circle";
}) {
  const baseClasses = "bg-neutral-200 rounded";
  
  const variantClasses = {
    default: "h-4 w-full",
    card: "h-48 w-full",
    text: "h-4 w-3/4",
    circle: "h-12 w-12 rounded-full",
  };

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-neutral-200 p-6 space-y-4">
      <SkeletonLoader variant="circle" />
      <SkeletonLoader variant="text" />
      <SkeletonLoader variant="default" />
      <SkeletonLoader variant="default" className="w-2/3" />
    </div>
  );
}

