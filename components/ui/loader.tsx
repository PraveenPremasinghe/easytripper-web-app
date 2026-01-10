"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoaderProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  variant?: "default" | "dots" | "pulse" | "spinner";
}

const sizeMap = {
  sm: "h-6 w-6",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

// Modern Spinner Loader
export function Loader({ className, size = "md", text, variant = "spinner" }: LoaderProps) {
  if (variant === "dots") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-3 w-3 rounded-full bg-primary"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base font-semibold text-primary"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === "pulse") {
    return (
      <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
        <motion.div
          className={cn(
            "rounded-full bg-primary",
            sizeMap[size]
          )}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {text && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-base font-semibold text-primary"
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Default Spinner (Modern and Beautiful)
  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className="relative">
        {/* Outer rotating ring with primary colors */}
        <motion.div
          className={cn(
            "rounded-full",
            sizeMap[size]
          )}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
            WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), white calc(100% - 6px))",
            mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), white calc(100% - 6px))",
          }}
        />
        {/* Inner pulsing circle with primary color */}
        <motion.div
          className={cn(
            "absolute inset-2 rounded-full bg-primary/30",
            "flex items-center justify-center"
          )}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div 
            className={cn("h-1/3 w-1/3 rounded-full bg-primary")}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
      {text && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base font-semibold text-foreground"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Full Page Loader with Overlay
export function PageLoader({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-6 p-8 rounded-2xl bg-card/90 backdrop-blur-md shadow-2xl border border-primary/20"
      >
        {/* Modern Animated Loader - Larger */}
        <div className="relative">
          {/* Outer rotating gradient ring - Larger */}
          <motion.div
            className="h-28 w-28 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)))",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 8px), white calc(100% - 8px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 8px), white calc(100% - 8px))",
            }}
          />
          {/* Middle pulsing ring */}
          <motion.div
            className="absolute inset-4 rounded-full border-4 border-primary/40"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Inner pulsing dot with primary color */}
          <motion.div
            className="absolute inset-8 rounded-full bg-primary"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        
        {/* Loading Text with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <motion.p
            className="text-xl font-bold text-primary mb-3"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {text}
          </motion.p>
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="h-2 w-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

// Inline Spinner (for buttons and small spaces) - Larger
export function Spinner({ size = "sm", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const spinnerSize = size === "sm" ? "h-5 w-5" : size === "md" ? "h-6 w-6" : "h-8 w-8";
  return (
    <motion.div
      className={cn("relative", className)}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div
        className={cn(
          "rounded-full border-3 border-primary/30 border-t-primary",
          spinnerSize
        )}
        style={{
          borderWidth: "3px",
        }}
      />
    </motion.div>
  );
}