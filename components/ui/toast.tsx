"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
  onClose?: () => void;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ id, title, description, variant = "default", onClose, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-6 pr-8 shadow-lg transition-all",
          {
            "border-border bg-card text-card-foreground": variant === "default",
            "border-success/50 bg-success/10 text-success-foreground": variant === "success",
            "border-destructive/50 bg-destructive/10 text-destructive-foreground": variant === "error",
            "border-accent/50 bg-accent/10 text-accent-foreground": variant === "warning",
          }
        )}
        {...props}
      >
        <div className="grid gap-1">
          {title && (
            <div className="text-sm font-semibold">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90">{description}</div>
          )}
        </div>
        <button
          onClick={onClose}
          className={cn(
            "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
            {
              "text-success-foreground/50 hover:text-success-foreground": variant === "success",
              "text-destructive-foreground/50 hover:text-destructive-foreground": variant === "error",
              "text-accent-foreground/50 hover:text-accent-foreground": variant === "warning",
            }
          )}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
Toast.displayName = "Toast";

export { Toast };
