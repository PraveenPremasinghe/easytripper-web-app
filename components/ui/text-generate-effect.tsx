"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const wordsArray = words.split(" ");
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      transition: {
        duration: duration,
        delay: i * 0.1,
      },
    }));
  }, [controls, duration]);

  return (
    <div className={cn("font-bold relative", className)}>
      <motion.div className="my-4">
        <div className="leading-relaxed">
          {wordsArray.map((word, idx) => {
            return (
              <motion.span
                key={word + idx}
                initial={{ opacity: 0 }}
                animate={controls}
                custom={idx}
                className="opacity-0"
              >
                {word}{" "}
              </motion.span>
            );
          })}
        </div>
      </motion.div>

      {filter && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center dark:from-black dark:to-transparent z-40" />
      )}
    </div>
  );
};
