import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-white border border-primary hover:bg-primary/90 hover:border-primary/90 active:bg-primary-dark active:border-primary-dark",
        destructive:
          "bg-destructive text-white border border-destructive hover:bg-destructive/90 hover:border-destructive/90 active:bg-destructive/80 active:border-destructive/80 focus-visible:ring-destructive/50",
        outline:
          "border border-primary bg-transparent text-primary hover:bg-primary hover:text-white active:bg-primary/90 active:border-primary",
        secondary:
          "bg-muted text-foreground border border-border hover:bg-muted/80 hover:border-border/80 active:bg-muted/70",
        ghost:
          "border border-transparent bg-transparent text-primary hover:bg-primary/10 hover:border-primary/20 active:bg-primary/20",
        link: 
          "border-0 bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5 text-xs",
        lg: "h-11 rounded-md px-6 has-[>svg]:px-4 text-base",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
