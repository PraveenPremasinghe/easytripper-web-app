"use client";

import Image from "next/image";
import { useState } from "react";

interface GuideImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function GuideImage({ src, alt, className = "" }: GuideImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-6xl">
        👋
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
