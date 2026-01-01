"use client";

import { Phone, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function TopBar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const shouldUseLightBackground = !isHomePage;

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      shouldUseLightBackground
        ? "bg-neutral-50 dark:bg-neutral-950 border-b border-neutral-200 dark:border-neutral-800"
        : "bg-black/20 backdrop-blur-lg border-b border-white/10"
    )}>
      <div className="mx-auto max-w-7xl px-4 py-2.5 md:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-2 text-sm md:flex-row">
          <div className="flex items-center gap-6">
            <Link
              href="tel:+94771234567"
              className={cn(
                "flex items-center gap-2 transition-all duration-200 hover:scale-105 font-medium",
                shouldUseLightBackground
                  ? "text-neutral-700 dark:text-neutral-300 hover:text-foreground"
                  : "text-white/95 hover:text-white"
              )}
              aria-label="Call us"
            >
              <Phone className="h-4 w-4" />
              <span>+94 77 123 4567</span>
            </Link>
            <Link
              href="mailto:info@easytripper.lk"
              className={cn(
                "flex items-center gap-2 transition-all duration-200 hover:scale-105 font-medium",
                shouldUseLightBackground
                  ? "text-neutral-700 dark:text-neutral-300 hover:text-foreground"
                  : "text-white/95 hover:text-white"
              )}
              aria-label="Email us"
            >
              <Mail className="h-4 w-4" />
              <span>info@easytripper.lk</span>
            </Link>
          </div>
          <div className={cn(
            "font-semibold tracking-wide",
            shouldUseLightBackground
              ? "text-neutral-700 dark:text-neutral-300"
              : "text-white/95"
          )}>
            Your trusted guide to Sri Lanka
          </div>
        </div>
      </div>
    </div>
  );
}
