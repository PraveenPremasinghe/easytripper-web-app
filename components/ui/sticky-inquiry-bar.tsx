"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function StickyInquiryBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t shadow-lg sm:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 bg-white">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Plan Your Trip
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Get a free quote today
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild size="sm">
                  <Link href="/contact">Inquire</Link>
                </Button>
                <button
                  onClick={() => setIsDismissed(true)}
                  className="rounded-full p-1 text-muted-foreground hover:bg-muted"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
