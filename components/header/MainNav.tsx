"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Home, MapPin, Route, Car, BookOpen, BookMarked, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { name: "Home", link: "/", icon: Home },
  { name: "Destinations", link: "/destinations", icon: MapPin },
  { name: "Tours", link: "/tours", icon: Route },
  { name: "Vehicles", link: "/vehicles", icon: Car },
  { name: "Blog", link: "/blog", icon: BookOpen },
  { name: "Stories", link: "/stories", icon: BookMarked },
  { name: "Travel Tips", link: "/travel-tips", icon: Lightbulb },
];

export function MainNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed inset-x-0 top-[50px] sm:top-[40px] z-[50] w-full transition-all duration-300",
        "bg-white border-b border-neutral-200"
      )}
    >
      <nav className="relative mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
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
            <button
              type="button"
              className="lg:hidden relative z-[60] p-2 rounded-md hover:bg-primary/10 active:bg-primary/20 transition-colors touch-manipulation"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu - Shadcn Sheet (Outside nav for proper portal rendering) */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent 
          side="left" 
          className="!w-[85vw] sm:!w-[400px] !max-w-[400px] p-0 bg-white"
        >
          <SheetHeader className="px-6 pt-6 pb-4 border-b">
            <div className="flex items-center justify-between">
              <div>
                <SheetTitle className="text-2xl font-bold text-foreground">Easy Tripper</SheetTitle>
                <SheetDescription className="text-sm text-muted-foreground mt-1">
                  Your trusted guide to Sri Lanka
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
          
          <div className="flex flex-col h-[calc(100vh-120px)] overflow-y-auto">
            {/* Navigation Items */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.link || 
                  (item.link !== "/" && pathname.startsWith(item.link));
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group",
                      "text-base font-medium",
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-foreground hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 transition-colors",
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
                    )} />
                    <span className="flex-1">{item.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="mobileActiveIndicator"
                        className="h-2 w-2 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            <Separator className="my-4" />

            {/* CTA Button */}
            <div className="px-4 pb-6">
              <Button
                asChild
                className="w-full h-12 text-base font-semibold"
                size="lg"
              >
                <Link href="/plan-your-trip" onClick={() => setIsMobileMenuOpen(false)}>
                  Plan Your Trip
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="px-4 pb-6 space-y-3">
              <Separator />
              <div className="space-y-2">
                <a
                  href="tel:+94756433267"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <span className="font-medium">Call:</span>
                  <span>+94 75 643 3267</span>
                </a>
                <a
                  href="mailto:hello@easytripper.lk"
                  className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  <span className="font-medium">Email:</span>
                  <span className="truncate">hello@easytripper.lk</span>
                </a>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
}
