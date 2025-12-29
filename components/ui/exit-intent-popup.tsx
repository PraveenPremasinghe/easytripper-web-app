"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ExitIntentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown]);

  if (!showPopup) return null;

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative mx-4 w-full max-w-md rounded-2xl bg-background p-8 shadow-2xl"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="rounded-full bg-primary/10 p-4">
                  <Percent className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="mb-2 text-2xl font-bold text-foreground">
                Special Offer!
              </h3>
              <p className="mb-6 text-muted-foreground">
                Get <span className="font-bold text-primary">10% off</span> your
                first booking when you plan your trip today!
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild className="flex-1" size="lg">
                  <Link href="/contact">Claim Offer</Link>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowPopup(false)}
                  className="flex-1"
                >
                  Maybe Later
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Offer valid for new customers only. Terms apply.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
