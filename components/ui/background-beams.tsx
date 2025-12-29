"use client";

import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 h-full w-full overflow-hidden",
        className
      )}
    >
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
      <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,rgba(13,148,136,0.1),transparent)]" />
    </div>
  );
};
