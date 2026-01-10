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
        ? "bg-primary border-b border-neutral-200"
        : "bg-black/90 backdrop-blur-lg border-b border-white/10"
    )}>
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5">
        <div className="flex flex-col items-center justify-between gap-2 text-xs sm:text-sm md:flex-row">
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center md:justify-start">
            <Link
              href="tel:+94756433267"
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 transition-all duration-200 hover:scale-105 font-medium whitespace-nowrap",
                shouldUseLightBackground
                  ? "text-white hover:text-foreground"
                  : "text-white/95 hover:text-white"
              )}
              aria-label="Call us"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">+94 75 643 3267</span>
            </Link>
            <Link
              href="mailto:hello@easytripper.lk"
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 transition-all duration-200 hover:scale-105 font-medium whitespace-nowrap",
                shouldUseLightBackground
                  ? "text-white hover:text-foreground"
                  : "text-white/95 hover:text-white"
              )}
              aria-label="Email us"
            >
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm hidden sm:inline">hello@easytripper.lk</span>
              <span className="text-xs sm:text-sm sm:hidden">Email</span>
            </Link>
          </div>
          <div className={cn(
            "font-semibold tracking-wide text-center md:text-left",
            shouldUseLightBackground
              ? "text-white"
              : "text-white/95",
            "text-[10px] sm:text-xs md:text-sm"
          )}>
            Your trusted guide to Sri Lanka
          </div>
        </div>
      </div>
    </div>
  );
}
