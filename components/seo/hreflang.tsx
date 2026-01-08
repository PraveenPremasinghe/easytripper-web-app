/**
 * Hreflang Tags Component for International SEO
 * Helps Google understand which countries/languages your content targets
 */

import { generateHreflangTags } from "@/lib/seo";

interface HreflangProps {
  path?: string;
}

export function HreflangTags({ path = "" }: HreflangProps) {
  const tags = generateHreflangTags(path);

  return (
    <>
      {tags.map((tag) => (
        <link
          key={tag.hreflang}
          rel="alternate"
          hrefLang={tag.hreflang}
          href={tag.href}
        />
      ))}
    </>
  );
}
