import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl active:scale-[0.97] rounded-lg",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 shadow-lg hover:shadow-xl active:scale-[0.97] rounded-lg",
        outline:
          "border-2 border-primary bg-transparent hover:bg-primary/10 hover:border-primary-hover text-primary shadow-sm hover:shadow-md active:scale-[0.97] rounded-lg",
        secondary:
          "bg-muted text-muted-foreground hover:bg-muted/80 shadow-sm hover:shadow-md active:scale-[0.97] rounded-lg",
        ghost: "hover:bg-muted hover:text-foreground rounded-lg",
        link: "text-primary underline-offset-4 hover:underline rounded-lg",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm rounded-lg",
        sm: "h-9 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-lg px-10 text-base",
        icon: "h-11 w-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

