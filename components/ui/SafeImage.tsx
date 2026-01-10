"use client";

import { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  [key: string]: unknown;
}

export function SafeImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  ...props
}: SafeImageProps) {
  const [imgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={className}
        style={{
          width: fill ? "100%" : width,
          height: fill ? "100%" : height,
          backgroundColor: "#e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#94a3b8",
        }}
      >
        <span>Image not found</span>
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        loading="lazy"
        className={className}
        onError={() => {
          setHasError(true);
        }}
        {...props}
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={className}
      onError={() => {
        setHasError(true);
      }}
      {...props}
    />
  );
}

