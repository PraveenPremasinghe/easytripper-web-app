"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [pathname, isMobileMenuOpen]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed inset-x-0 top-[41px] z-50 w-full transition-all duration-300",
        "bg-white border-b border-neutral-200"
      )}
    >
      <nav className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-12 sm:h-14 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-10 flex items-center space-x-2 transition-opacity hover:opacity-80 cursor-pointer"
          >
            <span className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors duration-300">
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
                    "relative px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-lg cursor-pointer",
                    "text-neutral-700 hover:text-primary hover:bg-primary/10",
                    isActive && "text-primary font-semibold bg-primary/10"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-lg bg-primary/10"
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
            <Button
              asChild
              size="sm"
              className="hidden md:flex transition-all duration-200 text-xs sm:text-sm"
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
                        "block px-4 py-2.5 text-base font-medium rounded-lg transition-colors mx-2 cursor-pointer",
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
