"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

/**
 * Adapted from Aceternity UI "Aurora Background".
 * Use this as the ONE Aceternity component in the project.
 */
export function AuroraBackground({
  children,
  className,
  contentClassName,
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-background",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-60 blur-3xl">
          <div
            className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 30% 30%, rgba(13,148,136,0.45), transparent 55%), radial-gradient(circle at 70% 30%, rgba(245,158,11,0.35), transparent 55%), radial-gradient(circle at 40% 75%, rgba(20,184,166,0.28), transparent 55%)",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={cn("relative z-10 w-full", contentClassName)}
      >
        {children}
      </motion.div>
    </div>
  );
}

