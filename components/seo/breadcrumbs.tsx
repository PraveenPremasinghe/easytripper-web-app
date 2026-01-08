"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "./structured-data";
import { getCanonicalUrl } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Always include home as first item
  const breadcrumbItems = [
    { name: "Home", url: "/" },
    ...items,
  ];

  // Generate full URLs for schema
  const schemaItems = breadcrumbItems.map((item) => ({
    name: item.name,
    url: getCanonicalUrl(item.url),
  }));

  return (
    <>
      <BreadcrumbSchema items={schemaItems} />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center space-x-2 text-sm text-muted-foreground mb-6"
      >
        <ol className="flex items-center space-x-2">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <li key={item.url} className="flex items-center">
                {index === 0 ? (
                  <Link
                    href={item.url}
                    className="flex items-center hover:text-primary transition-colors"
                    aria-label="Home"
                  >
                    <Home className="h-4 w-4" />
                  </Link>
                ) : (
                  <>
                    <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
                    {isLast ? (
                      <span className="font-medium text-foreground" aria-current="page">
                        {item.name}
                      </span>
                    ) : (
                      <Link
                        href={item.url}
                        className="hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

