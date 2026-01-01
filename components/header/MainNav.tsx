"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", link: "/" },
  { name: "Destinations", link: "/destinations" },
  { name: "Tours", link: "/tours" },
  { name: "Vehicles", link: "/vehicles" },
  { name: "Blog", link: "/blog" },
  { name: "Stories", link: "/stories" },
  { name: "Travel Tips", link: "/travel-tips" },
];

export function MainNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Determine header styling based on page and scroll
  const shouldUseLightBackground = isScrolled || !isHomePage;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed inset-x-0 top-[41px] z-50 w-full transition-all duration-300",
        shouldUseLightBackground
          ? "bg-neutral-100 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800"
          : "bg-black/20 border-b border-white/10"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <span className={cn(
              "text-xl font-bold tracking-tight transition-colors duration-300",
              shouldUseLightBackground 
                ? "text-foreground" 
                : "text-white drop-shadow-lg"
            )}>
              Easy Tripper
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-1 lg:flex-1 lg:justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.link || 
                (item.link !== "/" && pathname.startsWith(item.link));
              
              return (
                <Link
                  key={item.name}
                  href={item.link}
                  className={cn(
                    "relative px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-lg",
                    shouldUseLightBackground
                      ? "text-neutral-700 dark:text-neutral-300 hover:text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800"
                      : "text-white/95 hover:text-white hover:bg-white/15",
                    isActive && shouldUseLightBackground
                      ? "text-foreground font-semibold bg-neutral-200 dark:bg-neutral-800"
                      : isActive && !shouldUseLightBackground
                      ? "text-white font-semibold bg-white/25 shadow-sm"
                      : ""
                  )}
                >
                  {isActive && !shouldUseLightBackground && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-lg bg-white/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && shouldUseLightBackground && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-lg bg-neutral-200 dark:bg-neutral-800"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Icon - Only show on non-home pages or when scrolled */}
            {shouldUseLightBackground && (
              <button
                className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Search"
              >
                <Search className={cn(
                  "h-5 w-5 transition-colors",
                  shouldUseLightBackground 
                    ? "text-neutral-700 dark:text-neutral-300" 
                    : "text-white"
                )} />
              </button>
            )}
            
            <ThemeToggle />
            
            <Button
              asChild
              size="sm"
              className={cn(
                "hidden sm:flex transition-all duration-200",
                !shouldUseLightBackground && "bg-white/25 text-white border border-white/40 hover:bg-white/35 hover:border-white/50 shadow-lg hover:shadow-xl"
              )}
            >
              <Link href="/plan-your-trip">
                Plan Your Trip
              </Link>
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden lg:hidden border-t border-border/40"
            >
              <div className="py-4 space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.link || 
                    (item.link !== "/" && pathname.startsWith(item.link));
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.link}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block px-4 py-2.5 text-base font-medium rounded-lg transition-colors mx-2",
                        isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="px-6 pt-4">
                  <Button
                    asChild
                    className="w-full"
                  >
                    <Link href="/plan-your-trip">
                      Plan Your Trip
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
