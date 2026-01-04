import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      data-pause-on-hover={pauseOnHover}
      className={cn(
        "group flex overflow-hidden [--duration:40s] [--gap:1rem] w-full",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 [gap:var(--gap)]",
              !vertical && "flex-row",
              vertical && "flex-col",
              !vertical && !reverse && "animate-marquee",
              !vertical && reverse && "animate-marquee-reverse",
              vertical && "animate-marquee-vertical"
            )}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

