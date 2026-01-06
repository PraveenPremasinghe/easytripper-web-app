"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  className,
  title,
  description,
  header,
  icon,
  href,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-2xl transition-all duration-300 shadow-lg p-6 bg-white/90 backdrop-blur-sm border border-border hover:border-primary/50 justify-between flex flex-col space-y-4 hover:-translate-y-1",
        className
      )}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        {title && (
          <div className="font-sans font-bold text-lg text-foreground mb-2 mt-2 group-hover/bento:text-primary transition-colors">
            {title}
          </div>
        )}
        {description && (
          <div className="font-sans font-normal text-muted-foreground text-sm leading-relaxed">
            {description}
          </div>
        )}
      </div>
    </motion.div>
  );
};

